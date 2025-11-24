const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require('axios');
const zlib = require('zlib');

const privateKey = fs.readFileSync('/Users/johnostler/Downloads/AuthKey_DBBXBW8938.p8', 'utf8');
const token = jwt.sign({ aud: 'appstoreconnect-v1' }, privateKey, {
  algorithm: 'ES256',
  expiresIn: '20m',
  issuer: '69a6de93-b806-47e3-e053-5b8c7c11a4d1',
  header: { alg: 'ES256', kid: 'DBBXBW8938', typ: 'JWT' },
});

const baseUrl = 'https://api.appstoreconnect.apple.com/v1';
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const reportDate = yesterday.toISOString().split('T')[0];

console.log('Fetching sales report for:', reportDate, '\n');

axios.get(`${baseUrl}/salesReports`, {
  headers: { Authorization: `Bearer ${token}`, Accept: 'application/a-gzip' },
  params: {
    'filter[frequency]': 'DAILY',
    'filter[reportSubType]': 'SUMMARY',
    'filter[reportType]': 'SALES',
    'filter[vendorNumber]': '93009133',
    'filter[reportDate]': reportDate
  },
  responseType: 'arraybuffer'
}).then(res => {
  console.log('✅ Got sales report! Size:', res.data.length, 'bytes\n');
  
  const data = zlib.gunzipSync(res.data).toString();
  const lines = data.split('\n').filter(l => l.trim());
  
  console.log('Report has', lines.length, 'lines');
  console.log('\nHeader:', lines[0].split('\t').slice(0, 12).join(' | '));
  
  let totalUnits = 0;
  let totalRevenue = 0;
  const appData = {};
  
  lines.slice(1).forEach(line => {
    const cols = line.split('\t');
    const sku = cols[2];
    const productType = cols[6];
    const units = parseInt(cols[7]) || 0;
    const revenue = parseFloat(cols[9]) || 0;
    
    if (!appData[sku]) appData[sku] = { units: 0, revenue: 0, type: productType };
    appData[sku].units += units;
    appData[sku].revenue += revenue;
    
    totalUnits += units;
    totalRevenue += revenue;
  });
  
  console.log('\n📊 Sales Summary for', reportDate);
  console.log('Total Units:', totalUnits);
  console.log('Total Revenue: $' + totalRevenue.toFixed(2));
  
  console.log('\nBy Product:');
  Object.keys(appData).forEach(sku => {
    const d = appData[sku];
    console.log(`  ${sku} (${d.type}): ${d.units} units, $${d.revenue.toFixed(2)}`);
  });
  
}).catch(err => {
  console.error('❌ Error:', err.response?.status, err.message);
  if (err.response?.data) {
    try {
      console.error(JSON.parse(err.response.data.toString()));
    } catch(e) {}
  }
});
