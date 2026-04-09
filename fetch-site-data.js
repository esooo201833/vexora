const https = require('https');

// Try to access the website and look for data patterns
async function fetchSiteData() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.byitcorp.com',
      port: 443,
      path: '/ar',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ar,en;q=0.9',
        'Cookie': ''
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('Response received, length:', data.length);
        
        // Try to find data patterns in the HTML
        const patterns = [
          /self\.__next_f\.push\(\[\d+,\s*"[\s\S]*?"\]\)/g,
          /"properties":\s*\[/g,
          /"units":\s*\[/g,
          /"projects":\s*\[/g,
          /\"title\":\s*\"[^\"]+\"/g,
          /\"price\":\s*\d+/g,
        ];
        
        for (const pattern of patterns) {
          const matches = data.match(pattern);
          if (matches && matches.length > 0) {
            console.log(`\nPattern found: ${pattern}`);
            console.log('Matches:', matches.slice(0, 3));
          }
        }
        
        resolve(data);
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

fetchSiteData()
  .then(() => console.log('\nDone'))
  .catch(err => console.error('Error:', err.message));
