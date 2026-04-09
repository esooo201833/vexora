const axios = require('axios');
const cheerio = require('cheerio');

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'ar,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1'
};

async function scrapeWithAxios() {
  console.log('Starting axios scraper...\n');
  
  try {
    // Try to fetch the main page
    const response = await axios.get('https://www.byitcorp.com/ar', { headers, timeout: 30000 });
    const html = response.data;
    
    // Try to parse the Next.js data from the script tags
    const $ = cheerio.load(html);
    
    console.log('Page fetched successfully');
    console.log('Looking for data in script tags...\n');
    
    // Search for JSON data in script tags
    const scripts = $('script').toArray();
    console.log(`Found ${scripts.length} script tags`);
    
    let foundData = [];
    
    for (let i = 0; i < scripts.length; i++) {
      const script = $(scripts[i]);
      const content = script.html() || '';
      
      // Look for JSON data patterns
      if (content.includes('properties') || content.includes('units') || content.includes('projects')) {
        console.log(`Script ${i} contains property-related keywords`);
        
        // Try to extract JSON from the script
        try {
          const jsonMatches = content.match(/\{[\s\S]*?\}/g);
          if (jsonMatches) {
            for (const match of jsonMatches.slice(0, 5)) {
              try {
                const data = JSON.parse(match);
                if (data && (data.properties || data.units || data.projects || data.list)) {
                  console.log(`Found data structure in script ${i}:`, Object.keys(data));
                  foundData.push(data);
                }
              } catch (e) {}
            }
          }
        } catch (e) {}
      }
    }
    
    // Also try to find the actual content if rendered
    const bodyText = $('body').text();
    if (bodyText.includes('فيلا') || bodyText.includes('شقة') || bodyText.includes('Villa')) {
      console.log('\nBody contains property content');
    }
    
    console.log(`\nTotal data structures found: ${foundData.length}`);
    
    if (foundData.length > 0) {
      const fs = require('fs');
      fs.writeFileSync('found_data.json', JSON.stringify(foundData, null, 2));
      console.log('Data saved to found_data.json');
    }
    
    return foundData;
    
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

scrapeWithAxios();
