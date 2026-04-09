const https = require('https');

function fetchJS(url) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.byitcorp.com',
      port: 443,
      path: url,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', () => resolve(''));
    req.setTimeout(15000, () => { req.destroy(); resolve(''); });
    req.end();
  });
}

async function main() {
  const chunks = [
    '/_next/static/chunks/main-app-5518523dddf30468.js',
    '/_next/static/chunks/6042-cd9ffb136154f3d5.js',
    '/_next/static/chunks/6766-43efc5147ac2a907.js',
    '/_next/static/chunks/5472-aef7a4d5c38404da.js',
    '/_next/static/chunks/2808-bb10c918ba583462.js',
  ];

  const patterns = [
    /["']\/(?:api\/)?[a-z-]+\/?["']/g,
    /fetch\(["'][^"']+["']/g,
    /axios\.[a-z]+\(["'][^"']+["']/g,
    /["']https?:\/\/[^"']+["']/g,
  ];

  for (const chunk of chunks) {
    console.log(`\nAnalyzing: ${chunk}`);
    const content = await fetchJS(chunk);
    
    if (content) {
      for (const pattern of patterns) {
        const matches = content.match(pattern);
        if (matches) {
          console.log(`  Found matches:`, [...new Set(matches)].slice(0, 10));
        }
      }
    }
  }
}

main();
