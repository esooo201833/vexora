const https = require('https');
const fs = require('fs');

const API_BASE = 'api.app.byitcorp.com';

function fetchAPI(endpoint) {
  return new Promise((resolve) => {
    const options = {
      hostname: API_BASE,
      port: 443,
      path: `/api/v1${endpoint}`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Origin': 'https://www.byitcorp.com',
        'Referer': 'https://www.byitcorp.com/'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✓ ${endpoint}: ${json.data ? (Array.isArray(json.data) ? json.data.length + ' items' : 'object') : 'no data'}`);
          resolve({ success: true, endpoint, data: json });
        } catch (e) {
          console.log(`✗ ${endpoint}: ${res.statusCode} - Not JSON`);
          resolve({ success: false, endpoint, status: res.statusCode });
        }
      });
    });

    req.on('error', (e) => {
      console.log(`✗ ${endpoint}: ${e.message}`);
      resolve({ success: false, endpoint, error: e.message });
    });

    req.setTimeout(15000, () => {
      req.destroy();
      console.log(`✗ ${endpoint}: Timeout`);
      resolve({ success: false, endpoint, error: 'Timeout' });
    });

    req.end();
  });
}

async function main() {
  console.log('Fetching all possible API endpoints...\n');
  
  // Try common API endpoints
  const endpoints = [
    '/properties',
    '/properties?page=1&limit=1000',
    '/units',
    '/units?page=1&limit=1000',
    '/projects',
    '/projects?page=1&limit=1000',
    '/compounds',
    '/compounds?page=1&limit=1000',
    '/listings',
    '/listings?page=1&limit=1000',
    '/developers',
    '/developers?page=1&limit=1000',
    '/cities',
    '/states',
    '/areas',
    '/types',
    '/property-types',
    '/unit-types',
    '/search',
    '/search?page=1&limit=1000',
    '/separate',
    '/separate?page=1&limit=1000',
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await fetchAPI(endpoint);
    results.push(result);
    await new Promise(r => setTimeout(r, 500));
  }
  
  // Save successful results
  const successful = results.filter(r => r.success);
  fs.writeFileSync('api_exploration.json', JSON.stringify(successful, null, 2));
  
  console.log(`\n\nFound ${successful.length} working endpoints`);
  console.log('Results saved to api_exploration.json');
  
  // If we found properties, fetch all of them with pagination
  const propertiesEndpoint = results.find(r => r.endpoint.includes('properties') && r.success);
  if (propertiesEndpoint) {
    console.log('\nFound properties endpoint! Fetching all data...');
    await fetchAllProperties();
  }
}

async function fetchAllProperties() {
  const allProperties = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore && page <= 50) {
    const result = await fetchAPI(`/properties?page=${page}&limit=100`);
    
    if (result.success && result.data.data && Array.isArray(result.data.data)) {
      const items = result.data.data;
      if (items.length === 0) {
        hasMore = false;
      } else {
        allProperties.push(...items);
        console.log(`Page ${page}: ${items.length} properties (Total: ${allProperties.length})`);
        page++;
      }
    } else {
      hasMore = false;
    }
    
    await new Promise(r => setTimeout(r, 300));
  }
  
  fs.writeFileSync('all_properties.json', JSON.stringify(allProperties, null, 2));
  console.log(`\nSaved ${allProperties.length} total properties to all_properties.json`);
  return allProperties;
}

main().catch(console.error);
