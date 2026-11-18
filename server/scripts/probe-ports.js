import http from 'http'

function get(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = ''
      res.on('data', (c) => (data += c))
      res.on('end', () =>
        resolve({ url, status: res.statusCode, headers: res.headers, body: data })
      )
    }).on('error', (err) => resolve({ url, error: err.message }))
  })
}

async function probe() {
  for (const url of [
    'http://localhost:3001/',
    'http://localhost:3001/blog/tgstechinfo',
    'http://localhost:3001/blog/b2b-pipeline-foundation-playbook',
    'http://localhost:5001/',
    'http://localhost:5001/blog/tgstechinfo',
    'http://localhost:5001/blog/b2b-pipeline-foundation-playbook',
  ]) {
    const res = await get(url)
    console.log('----------------------------------------------------')
    console.log('URL:', url)
    if (res.error) {
      console.log('ERROR:', res.error)
      continue
    }
    console.log('Status:', res.status)
    const titleMatch = res.body.match(/<title>([^<]*)<\/title>/i)
    const canonicalMatch = res.body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
    const descMatch = res.body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
    console.log('Title:', titleMatch ? titleMatch[1] : null)
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : null)
    console.log('Description:', descMatch ? descMatch[1] : null)
  }
}

probe().then(() => process.exit(0))
