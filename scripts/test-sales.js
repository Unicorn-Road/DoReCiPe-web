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

(async () => {
  // Try multiple dates (reports have 24-48 hour delay)
  for (let daysAgo = 2; daysAgo <= 10; daysAgo++) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const reportDate = date.toISOString().split('T')[0];
    
    console.log(`Trying ${reportDate}...`);
    
    try {
      const res = await axios.get(`${baseUrl}/salesReports`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/a-gzip' },
        params: {
          'filter[frequency]': 'DAILY',
          'filter[reportSubType]': 'SUMMARY',
          'filter[reportType]': 'SALES',
          'filter[vendorNumber]': '87619696',
          'filter[reportDate]': reportDate
        },
        responseType: 'arraybuffer'
      });
      
      console.log('✅ SUCCESS! Got sales report\n');
      console.log('Size:', res.data.length, 'bytes');
      
      const data = zlib.gunzipSync(res.data).toString();
      const lines = data.split('\n').filter(l => l.trim());
      
      console.log('Rows:', lines.length - 1);
      console.log('\nHeader:', lines[0].split('\t').slice(0, 12).join(' | '));
      
      let totalUnits = 0;
      let totalRevenue = 0;
      const byProduct = {};
      
      lines.slice(1).forEach(line => {
        const cols = line.split('\t');
        const sku = cols[2];
        const productType = cols[6];
        const units = parseInt(cols[7]) || 0;
        const revenue = parseFloat(cols[9]) || 0;
        
        if (!byProduct[sku]) byProduct[sku] = { units: 0, revenue: 0, type: productType };
        byProduct[sku].units += units;
        byProduct[sku].revenue += revenue;
        
        totalUnits += units;
        totalRevenue += revenue;
      });
      
      console.log('\n📊 Sales Summary for', reportDate);
      console.log('═'.repeat(50));
      console.log('Total Units:', totalUnits);
      console.log('Total Revenue: $' + totalRevenue.toFixed(2));
      console.log('\nBy Product:');
      Object.keys(byProduct).forEach(sku => {
        const p = byProduct[sku];
        console.log(`  ${sku} (${p.type}): ${p.units} units, $${p.revenue.toFixed(2)}`);
      });
      
      return; // Found data, stop searching
      
    } catch (err) {
      console.log(`  ❌ ${err.response?.status || 'error'}`);
    }
  }
  
  console.log('\n⚠️  No reports found in last 10 days');
  console.log('Reports typically have a 24-48 hour delay');
})();
