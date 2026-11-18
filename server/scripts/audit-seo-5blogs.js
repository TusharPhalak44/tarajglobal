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

function parseMeta(html) {
  const getTag = (re) => {
    const m = html.match(re)
    return m ? m[1] : null
  }
  const countMatches = (re) => (html.match(re) || []).length

  return {
    title: getTag(/<title>([^<]*)<\/title>/i),
    titleCount: countMatches(/<title>/gi),
    description: getTag(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),
    descCount: countMatches(/<meta[^>]*name=["']description["']/gi),
    canonical: getTag(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i),
    canonicalCount: countMatches(/<link[^>]*rel=["']canonical["']/gi),
    keywords: getTag(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i),
    ogTitle: getTag(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i),
    ogDesc: getTag(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i),
    ogImage: getTag(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i),
    ogUrl: getTag(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i),
    ogCount: countMatches(/<meta[^>]*property=["']og:title["']/gi),
    twitterTitle: getTag(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["']/i),
    twitterDesc: getTag(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']*)["']/i),
    twitterImage: getTag(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["']/i),
    twitterCount: countMatches(/<meta[^>]*name=["']twitter:title["']/gi),
    robots: getTag(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i),
    robotsCount: countMatches(/<meta[^>]*name=["']robots["']/gi),
    hasJsonLd: html.includes('application/ld+json'),
    hasDevScripts: html.includes('@vite/client') || html.includes('/src/main.jsx'),
    hasHomepageLeak: html.includes('Tech-Powered B2B Demand Generation & AI Lead Gen')
  }
}

const blogs = [
  'tgstechinfo',
  'b2b-pipeline-foundation-playbook',
  'how-to-build-an-ideal-customer-profile',
  'icp-vs-buyer-persona-vs-buying-committee',
  'add-a-strong-lead-qualification-process'
]

async function runAudit() {
  console.log('======================================================================')
  console.log('AUDIT: 5 PUBLISHED BLOGS TESTED ON BOTH PORT 3001 AND PORT 5001')
  console.log('======================================================================\n')

  const ports = [3001, 5001]
  const report = []

  for (const slug of blogs) {
    console.log(`======================================================================`)
    console.log(`BLOG SLUG: /blog/${slug}`)
    console.log(`======================================================================`)

    for (const port of ports) {
      const url = `http://localhost:${port}/blog/${slug}`
      const res = await get(url)
      if (res.error) {
        console.error(`Port ${port}: Connection error: ${res.error}`)
        continue
      }

      const meta = parseMeta(res.body)
      console.log(`[Port ${port}] Status: ${res.status}`)
      console.log(`  Title (${meta.titleCount}x):       ${meta.title}`)
      console.log(`  Desc (${meta.descCount}x):        ${meta.description}`)
      console.log(`  Canonical (${meta.canonicalCount}x):   ${meta.canonical}`)
      console.log(`  Keywords:         ${meta.keywords || '(none)'}`)
      console.log(`  OG Title (${meta.ogCount}x):    ${meta.ogTitle}`)
      console.log(`  OG Image:         ${meta.ogImage}`)
      console.log(`  Twitter Title:    ${meta.twitterTitle}`)
      console.log(`  Robots (${meta.robotsCount}x):      ${meta.robots}`)
      console.log(`  Schema JSON-LD:   ${meta.hasJsonLd ? 'YES' : 'NO'}`)
      console.log(`  Homepage Leak?    ${meta.hasHomepageLeak ? 'YES (FAIL)' : 'NO (PASS)'}`)

      const passed =
        res.status === 200 &&
        meta.titleCount === 1 &&
        meta.descCount === 1 &&
        meta.canonicalCount === 1 &&
        meta.ogCount === 1 &&
        meta.twitterCount === 1 &&
        !meta.hasHomepageLeak &&
        meta.canonical === `https://tarajglobal.com/blog/${slug}`

      console.log(`  -> RESULT:        ${passed ? '✅ PASS' : '❌ FAIL'}\n`)
      report.push({ slug, port, passed, meta })
    }
  }

  // Check homepage on both ports
  console.log(`======================================================================`)
  console.log(`HOMEPAGE ISOLATION CHECK (/)`)
  console.log(`======================================================================`)
  for (const port of ports) {
    const url = `http://localhost:${port}/`
    const res = await get(url)
    const meta = parseMeta(res.body)
    console.log(`[Port ${port}] Homepage Title: ${meta.title}`)
    console.log(`[Port ${port}] Homepage Canonical: ${meta.canonical}`)
    const homeOk = res.status === 200 && meta.title?.includes('Tech-Powered B2B Demand Generation')
    console.log(`[Port ${port}] Result: ${homeOk ? '✅ PASS' : '❌ FAIL'}\n`)
  }

  process.exit(0)
}

runAudit().catch(console.error)
