import axios from 'axios';

async function testBackend() {
  const client = axios.create({
    baseURL: 'http://localhost:7002/api/v1',
    withCredentials: true,
  });

  try {
    const loginRes = await client.post('/auth/login', {
      email: 'admin@technosales.in',
      password: 'Admin@123',
      locationConsent: true,
      ipConsent: true,
    });

    const cookie = loginRes.headers['set-cookie'];
    console.log('Login success:', loginRes.data.isOk, 'User:', loginRes.data.data?.adminName);

    const prodsRes = await client.post('/products/search', {}, {
      headers: { Cookie: cookie },
    });

    console.log('Products API response structure:', Object.keys(prodsRes.data));
    const items = prodsRes.data.data?.[0]?.data || prodsRes.data.data || [];
    console.log(`Fetched ${items.length} products successfully!`);
    items.forEach((p, idx) => console.log(`  ${idx + 1}. [${p.brand}] ${p.name}`));
  } catch (err) {
    console.error('Test failed:', err.response?.data || err.message);
  }
}

testBackend();
