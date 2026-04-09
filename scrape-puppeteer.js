const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function scrapeWithPuppeteer() {
  console.log('Starting Puppeteer scraper...');
  console.log('Chrome path:', CHROME_PATH);
  
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Collect network responses
    const apiResponses = [];
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('api') || url.includes('properties') || url.includes('units') || url.includes('data')) {
        try {
          const contentType = response.headers()['content-type'] || '';
          if (contentType.includes('json')) {
            const json = await response.json();
            apiResponses.push({ url, data: json });
            console.log('API Response:', url);
          }
        } catch (e) {}
      }
    });
    
    // Try different URLs
    const urls = [
      'https://www.byitcorp.com/ar',
      'https://www.byitcorp.com/en',
      'https://www.byitcorp.com',
    ];
    
    for (const url of urls) {
      console.log(`\nTrying: ${url}`);
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        await page.waitForTimeout(5000);
        
        // Try to find property elements
        const properties = await page.$$eval('[class*="property"], [class*="unit"], [data-testid*="property"]', els => els.length);
        console.log(`Found ${properties} property elements`);
        
        // Look for any data in the page
        const pageContent = await page.content();
        if (pageContent.includes('property') || pageContent.includes('unit') || pageContent.includes('فيلا')) {
          console.log('Page contains property-related content');
        }
        
        // Try to click on "Properties" or similar links if they exist
        const links = await page.$$eval('a', links => 
          links.filter(l => 
            l.textContent.toLowerCase().includes('property') || 
            l.textContent.includes('عقارات') ||
            l.textContent.includes('search')
          ).map(l => ({ href: l.href, text: l.textContent.trim() }))
        );
        
        if (links.length > 0) {
          console.log('Found property links:', links.slice(0, 5));
        }
        
      } catch (e) {
        console.log(`Error with ${url}:`, e.message);
      }
    }
    
    // Save API responses
    if (apiResponses.length > 0) {
      fs.writeFileSync('api_responses.json', JSON.stringify(apiResponses, null, 2));
      console.log(`\nSaved ${apiResponses.length} API responses to api_responses.json`);
    } else {
      console.log('\nNo API responses captured');
    }
    
  } catch (error) {
    console.error('Error launching browser:', error.message);
  } finally {
    if (browser) await browser.close();
  }
}

scrapeWithPuppeteer().catch(console.error);
