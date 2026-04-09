const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeAllUnits() {
  console.log('Starting scraper...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  const allUnits = [];
  let pageNum = 1;
  let hasMorePages = true;
  
  try {
    // Try different possible URLs for properties listing
    const possibleUrls = [
      'https://www.byitcorp.com/ar/properties',
      'https://www.byitcorp.com/en/properties', 
      'https://www.byitcorp.com/properties',
      'https://www.byitcorp.com/ar/search',
      'https://www.byitcorp.com/ar/compounds',
      'https://www.byitcorp.com/ar/separates'
    ];
    
    for (const url of possibleUrls) {
      try {
        console.log(`Trying: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(3000);
        
        // Look for property cards or listings
        const propertyCards = await page.$$('[data-testid*="property"], [class*="property"], [class*="unit"], [class*="card"], .property-card, .unit-card, [class*="listing"]');
        
        if (propertyCards.length > 0) {
          console.log(`Found ${propertyCards.length} properties at ${url}`);
          
          for (const card of propertyCards) {
            try {
              const unit = await extractUnitData(card);
              if (unit && unit.title) {
                allUnits.push(unit);
              }
            } catch (e) {
              console.log('Error extracting unit:', e.message);
            }
          }
          break;
        }
      } catch (e) {
        console.log(`Failed: ${url} - ${e.message}`);
      }
    }
    
    // If no properties found, try main page and look for links
    if (allUnits.length === 0) {
      console.log('Trying main page...');
      await page.goto('https://www.byitcorp.com/ar', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(5000);
      
      // Take screenshot to debug
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
      console.log('Screenshot saved');
      
      // Check for property links
      const links = await page.$$eval('a[href*="property"], a[href*="unit"], a[href*="project"]', links => 
        links.map(l => ({ href: l.href, text: l.textContent.trim() }))
      );
      console.log('Found links:', links.slice(0, 10));
      
      // Try to find any API calls in network
      const responses = [];
      page.on('response', async response => {
        const url = response.url();
        if (url.includes('api') || url.includes('properties') || url.includes('units') || url.includes('data')) {
          try {
            const body = await response.text();
            responses.push({ url, body: body.substring(0, 500) });
          } catch (e) {}
        }
      });
      
      await page.waitForTimeout(10000);
      console.log('Network responses:', responses.slice(0, 5));
    }
    
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
  }
  
  // Save results
  fs.writeFileSync('scraped_units.json', JSON.stringify(allUnits, null, 2));
  console.log(`Scraped ${allUnits.length} units total`);
  console.log('Results saved to scraped_units.json');
  
  return allUnits;
}

async function extractUnitData(card) {
  try {
    const title = await card.$eval('[class*="title"], h1, h2, h3, [class*="name"]', el => el.textContent.trim()).catch(() => null);
    const price = await card.$eval('[class*="price"], [data-testid*="price"]', el => {
      const text = el.textContent.trim();
      const match = text.match(/[\d,]+/);
      return match ? parseInt(match[0].replace(/,/g, '')) : null;
    }).catch(() => null);
    const location = await card.$eval('[class*="location"], [class*="address"]', el => el.textContent.trim()).catch(() => null);
    const type = await card.$eval('[class*="type"], [class*="property-type"]', el => el.textContent.trim()).catch(() => null);
    
    return {
      title,
      price,
      location,
      type,
      rooms: null,
      bedrooms: null,
      bathrooms: null,
      size: null,
      description: null,
      images: []
    };
  } catch (e) {
    return null;
  }
}

scrapeAllUnits().catch(console.error);
