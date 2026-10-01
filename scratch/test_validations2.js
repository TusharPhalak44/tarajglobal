async function testValidations() {
  console.log('=== TEST FAILURES ===');
  
  // 1. Empty title
  let res = await fetch('http://localhost:5000/api/admin/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '', content: 'x', category_id: 1 })
  });
  console.log('Empty Title:', res.status, await res.text());
  
  // 3. Duplicate slug
  // first create one
  await fetch('http://localhost:5000/api/admin/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Dup Test', slug: 'dup-test-1234', content: 'x', category_id: 1 })
  });
  // then create duplicate
  res = await fetch('http://localhost:5000/api/admin/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Dup Test 2', slug: 'dup-test-1234', content: 'x', category_id: 1 })
  });
  console.log('Duplicate Slug:', res.status, await res.text());
  
  // 13. Invalid scheduled date
  // We handle this via UI mostly, but let's test if the backend accepts it
  res = await fetch('http://localhost:5000/api/admin/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Date Test', slug: 'date-test-123', content: 'x', category_id: 1, status: 'scheduled', scheduled_at: 'invalid-date' })
  });
  console.log('Invalid Date:', res.status, await res.text());
}

testValidations();
