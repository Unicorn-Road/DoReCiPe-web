const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

function generateToken() {
  const issuerId = process.env.APPSTORE_ISSUER_ID;
  const keyId = process.env.APPSTORE_KEY_ID;
  const privateKey = process.env.APPSTORE_PRIVATE_KEY;

  if (!issuerId || !keyId || !privateKey) {
    throw new Error('Missing credentials');
  }

  // Remove quotes if present and replace escaped newlines
  let formattedKey = privateKey;
  if (formattedKey.startsWith('"')) {
    formattedKey = formattedKey.slice(1, -1);
  }
  formattedKey = formattedKey.replace(/\\n/g, '\n');

  return jwt.sign({}, formattedKey, {
    algorithm: 'ES256',
    expiresIn: '20m',
    issuer: issuerId,
    header: {
      alg: 'ES256',
      kid: keyId,
      typ: 'JWT',
    },
  });
}

async function testEndpoints() {
  const token = generateToken();
  const appId = '6745566524';
  const baseUrl = 'https://api.appstoreconnect.apple.com/v1';

  const endpoints = [
    // App Info
    { name: 'App Info', url: `${baseUrl}/apps/${appId}` },
    
    // Reviews
    { name: 'Customer Reviews', url: `${baseUrl}/apps/${appId}/customerReviews?limit=10` },
    
    // Analytics Reports
    { name: 'Analytics Reports', url: `${baseUrl}/analyticsReports` },
    { name: 'Analytics Reports (filtered)', url: `${baseUrl}/analyticsReports?filter[app]=${appId}` },
    
    // Sales Reports
    { name: 'Sales Reports', url: `${baseUrl}/salesReports` },
    { name: 'Sales Reports (filtered)', url: `${baseUrl}/salesReports?filter[reportType]=SALES&filter[frequency]=DAILY` },
    
    // App Store Versions
    { name: 'App Store Versions', url: `${baseUrl}/apps/${appId}/appStoreVersions` },
    
    // Metrics (Analytics API v2)
    { name: 'App Analytics', url: `${baseUrl}/apps/${appId}/perfPowerMetrics` },
    
    // Beta App Review Detail
    { name: 'Beta App Review Details', url: `${baseUrl}/apps/${appId}/betaAppReviewDetail` },
    
    // Gamecenter (if applicable)
    { name: 'Gamecenter Detail', url: `${baseUrl}/apps/${appId}/gameCenterDetail` },
  ];

  console.log('Testing App Store Connect API endpoints...\n');
  console.log('App ID:', appId);
  console.log('Key ID:', process.env.APPSTORE_KEY_ID);
  console.log('='.repeat(80) + '\n');

  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(endpoint.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(`✅ ${endpoint.name}`);
      console.log(`   URL: ${endpoint.url}`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Data keys:`, Object.keys(response.data).join(', '));
      if (response.data.data) {
        console.log(`   Records: ${Array.isArray(response.data.data) ? response.data.data.length : 'object'}`);
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          console.log(`   Sample:`, JSON.stringify(response.data.data[0], null, 2).substring(0, 200) + '...');
        }
      }
      console.log('');
    } catch (error) {
      console.log(`❌ ${endpoint.name}`);
      console.log(`   URL: ${endpoint.url}`);
      console.log(`   Status: ${error.response?.status || 'N/A'}`);
      console.log(`   Error: ${error.response?.data?.errors?.[0]?.title || error.message}`);
      if (error.response?.data?.errors?.[0]?.detail) {
        console.log(`   Detail: ${error.response.data.errors[0].detail}`);
      }
      console.log('');
    }
  }
}

testEndpoints().catch(console.error);
