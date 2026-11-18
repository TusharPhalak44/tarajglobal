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

function parseHtml(html) {
  const getTag = (re) => {
    const m = html.match(re)
    return m ? m[1] : null
  }
  return {
    title: getTag(/<title>([^<]*)<\/title>/i),
    description: getTag(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),
    canonical: getTag(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i),
    keywords: getTag(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i),
    ogTitle: getTag(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i),
    ogDesc: getTag(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i),
    ogImage: getTag(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i),
    ogUrl: getTag(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i),
    twitterTitle: getTag(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["']/i),
    twitterDesc: getTag(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']*)["']/i),
    twitterImage: getTag(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["']/i),
    robots: getTag(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i),
    hasJsonLd: html.includes('application/ld+json'),
    scripts: (html.match(/<script[^>]*src=["']([^"']*)["']/gi) || []).map(s => s.match(/src=["']([^"']*)["']/i)[1])
  }
}

async function verify() {
  console.log('====================================================================')
  console.log('🚀 DETAILED VERIFICATION ON FRONTEND PORT 3001 AND BACKEND 5001')
  console.log('====================================================================\n')

  const urls = [
    'http://localhost:3001/blog/tgstechinfo',
    'http://localhost:3001/blog/b2b-pipeline-foundation-playbook',
    'http://localhost:5001/blog/tgstechinfo',
    'http://localhost:5001/blog/b2b-pipeline-foundation-playbook',
    'http://localhost:3001/blog/non-existent-test-slug-404',
    'http://localhost:3001/'
  ]

  let allPassed = true

  for (const u of urls) {
    console.log(`--------------------------------------------------------------------`)
    console.log(`TARGET: ${u}`)
    console.log(`--------------------------------------------------------------------`)
    const res = await get(u)
    if (res.error) {
      console.error(`❌ Network error: ${res.error}`)
      allPassed = false
      continue
    }

    const meta = parseHtml(res.body)
    console.log(`HTTP Status:        ${res.status}`)
    console.log(`Title:              ${meta.title}`)
    console.log(`Description:        ${meta.description}`)
    console.log(`Canonical URL:      ${meta.canonical}`)
    console.log(`OG Title:           ${meta.ogTitle}`)
    console.log(`OG Description:     ${meta.ogDesc}`)
    console.log(`OG Image:           ${meta.ogImage}`)
    console.log(`OG URL:             ${meta.ogUrl}`)
    console.log(`Twitter Title:      ${meta.twitterTitle}`)
    console.log(`Twitter Description:${meta.twitterDesc}`)
    console.log(`Robots:             ${meta.robots}`)
    console.log(`Schema JSON-LD:     ${meta.hasJsonLd ? '✅ Present' : '❌ Absent'}`)
    console.log(`Script tags:        ${JSON.stringify(meta.scripts)}`)

    if (u.includes('tgstechinfo')) {
      const ok = meta.title?.includes('How B2B Companies Can Build a Predictable') &&
                 meta.canonical === 'https://tarajglobal.com/blog/tgstechinfo'
      if (ok) console.log(`✅ VERIFIED: Blog 1 has correct unique metadata and canonical!`)
      else { console.error(`❌ FAILED: Blog 1 metadata mismatch`); allPassed = false }
    } else if (u.includes('b2b-pipeline-foundation-playbook')) {
      const ok = meta.title?.includes('B2B Pipeline Foundation: ICP') &&
                 meta.canonical === 'https://tarajglobal.com/blog/b2b-pipeline-foundation-playbook'
      if (ok) console.log(`✅ VERIFIED: Blog 2 has correct unique metadata and canonical!`)
      else { console.error(`❌ FAILED: Blog 2 metadata mismatch`); allPassed = false }
    } else if (u.includes('non-existent')) {
      const ok = res.status === 404 && meta.robots === 'noindex, nofollow'
      if (ok) console.log(`✅ VERIFIED: Missing blog returns 404 with noindex!`)
      else { console.error(`❌ FAILED: Expected 404 + noindex, got ${res.status}`); allPassed = false }
    } else if (u === 'http://localhost:3001/') {
      const ok = res.status === 200 && meta.title?.includes('Tech-Powered B2B Demand Generation')
      if (ok) console.log(`✅ VERIFIED: Homepage metadata intact!`)
      else { console.error(`❌ FAILED: Homepage metadata corrupted`); allPassed = false }
    }
  }

  // Also check that any asset referenced by the page doesn't 404 on port 3001
  console.log(`\n--------------------------------------------------------------------`)
  console.log(`ASSET ACCESSIBILITY CHECK ON PORT 3001`)
  console.log(`--------------------------------------------------------------------`)
  const blogRes = await get('http://localhost:3001/blog/tgstechinfo')
  const meta = parseHtml(blogRes.body)
  for (const src of meta.scripts) {
    if (src.startsWith('http://') || src.startsWith('https://')) {
      console.log(`Script ${src} -> External script (skipped)`)
      continue
    }
    const assetUrl = `http://localhost:3001${src}`
    const assetRes = await get(assetUrl)
    console.log(`Script ${src} -> HTTP ${assetRes.status}`)
    if (assetRes.status >= 400) {
      console.error(`❌ Asset failed to load: ${src} (${assetRes.status})`)
      allPassed = false
    } else {
      console.log(`✅ Asset loads successfully: ${src}`)
    }
  }

  console.log(`\n====================================================================`)
  if (allPassed) {
    console.log(`🎉 ALL FRONTEND PORT 3001 & BACKEND 5001 VERIFICATION CHECKS PASSED!`)
  } else {
    console.log(`❌ SOME CHECKS FAILED`)
  }
  console.log(`====================================================================`)
  process.exit(allPassed ? 0 : 1)
}

verify().catch(console.error)
