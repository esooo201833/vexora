const https = require('https');

// Try different API endpoints
const endpoints = [
  '/api/properties',
  '/api/units',
  '/api/projects',
  '/api/compounds',
  '/api/v1/properties',
  '/api/v1/units',
  '/api/data/properties',
  '/api/search',
];

async function tryEndpoint(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.byitcorp.com',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`${path}: Status ${res.statusCode}`);
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            console.log(`✓ SUCCESS: ${path}`);
            console.log(JSON.stringify(json, null, 2).substring(0, 500));
            resolve({ success: true, path, data: json });
          } catch (e) {
            resolve({ success: false, path, error: 'Not JSON' });
          }
        } else {
          resolve({ success: false, path, status: res.statusCode });
        }
      });
    });

    req.on('error', (e) => {
      resolve({ success: false, path, error: e.message });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ success: false, path, error: 'Timeout' });
    });

    req.end();
  });
}

async function main() {
  console.log('Testing API endpoints...\n');
  
  for (const endpoint of endpoints) {
    await tryEndpoint(endpoint);
    await new Promise(r => setTimeout(r, 500));
  }
}

main();
