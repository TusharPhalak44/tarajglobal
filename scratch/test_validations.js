const axios = require('axios');

async function testValidations() {
  const api = axios.create({ baseURL: 'http://localhost:5000/api/admin', validateStatus: () => true });
  
  console.log('=== TEST FAILURES ===');
  
  // 1. Empty title
  let res = await api.post('/blogs', { title: '', content: 'x', category_id: 1 });
  console.log('Empty Title:', res.status, res.data);
  
  // 3. Duplicate slug
  // first create one
  await api.post('/blogs', { title: 'Dup Test', slug: 'dup-test-123', content: 'x', category_id: 1 });
  // then create duplicate
  res = await api.post('/blogs', { title: 'Dup Test 2', slug: 'dup-test-123', content: 'x', category_id: 1 });
  console.log('Duplicate Slug:', res.status, res.data);
  
  // 13. Invalid scheduled date
  // We handle this via UI mostly, but let's test if the backend accepts it
  res = await api.post('/blogs', { title: 'Date Test', slug: 'date-test', content: 'x', category_id: 1, status: 'scheduled', scheduled_at: 'invalid-date' });
  console.log('Invalid Date:', res.status, res.data);
}

testValidations();
