import 'dotenv/config'
import http from 'http'
import app from '../app.js'
import db from '../config/db.js'
import { invalidateBlogCache } from '../services/blogSeoRenderer.js'

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        })
      })
    }).on('error', reject)
  })
}

function extractMeta(html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i)
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i)
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i)
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i)
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i)
  const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i)
  const twTitleMatch = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["']/i)
  const twDescMatch = html.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']*)["']/i)
  const twImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["']/i)
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i)

  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    keywords: keywordsMatch ? keywordsMatch[1] : null,
    ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
    ogDesc: ogDescMatch ? ogDescMatch[1] : null,
    ogImage: ogImageMatch ? ogImageMatch[1] : null,
    ogUrl: ogUrlMatch ? ogUrlMatch[1] : null,
    twitterTitle: twTitleMatch ? twTitleMatch[1] : null,
    twitterDesc: twDescMatch ? twDescMatch[1] : null,
    twitterImage: twImageMatch ? twImageMatch[1] : null,
    robots: robotsMatch ? robotsMatch[1] : null
  }
}

async function runTests() {
  console.log('=====================================================')
  console.log('🚀 STARTING COMPREHENSIVE LIVE HTTP SEO SUITE')
  console.log('=====================================================')

  const server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  const port = server.address().port
  const baseUrl = `http://127.0.0.1:${port}`
  console.log(`📡 Live test server started on ${baseUrl}\n`)

  const testBlogs = [
    'tgstechinfo',
    'b2b-pipeline-foundation-playbook',
    'how-to-build-an-ideal-customer-profile',
    'icp-vs-buyer-persona-vs-buying-committee',
    'add-a-strong-lead-qualification-process'
  ]

  let passedAll = true

  // 1. Test 5 Published Blogs
  for (let i = 0; i < testBlogs.length; i++) {
    const slug = testBlogs[i]
    console.log(`-----------------------------------------------------`)
    console.log(`Blog ${i + 1}: /blog/${slug}`)
    console.log(`-----------------------------------------------------`)

    const res = await get(`${baseUrl}/blog/${slug}`)
    if (res.statusCode !== 200) {
      console.error(`❌ HTTP Status expected 200, got ${res.statusCode}`)
      passedAll = false
      continue
    }

    const meta = extractMeta(res.body)
    console.log(`HTTP Status:        ${res.statusCode}`)
    console.log(`Title:              ${meta.title}`)
    console.log(`Meta Description:   ${meta.description}`)
    console.log(`Canonical URL:      ${meta.canonical}`)
    console.log(`Meta Keywords:      ${meta.keywords || '(none)'}`)
    console.log(`OG Title:           ${meta.ogTitle}`)
    console.log(`OG Description:     ${meta.ogDesc}`)
    console.log(`OG Image:           ${meta.ogImage}`)
    console.log(`OG URL:             ${meta.ogUrl}`)
    console.log(`Twitter Title:      ${meta.twitterTitle}`)
    console.log(`Twitter Description:${meta.twitterDesc}`)
    console.log(`Twitter Image:      ${meta.twitterImage}`)
    console.log(`Robots:             ${meta.robots}`)

    // Verification checks
    const hasHomepageTitle = meta.title && meta.title.includes('B2B Go-To-Market & Revenue Growth Firm | Taraj Global')
    const hasHomepageCanonical = meta.canonical === 'https://tarajglobal.com/' || meta.canonical === 'https://tarajglobal.com'
    const hasCorrectCanonical = meta.canonical === `https://tarajglobal.com/blog/${slug}`

    if (hasHomepageTitle) {
      console.error(`❌ LEAK: Homepage title found on blog route!`)
      passedAll = false
    } else {
      console.log(`✅ Title is blog-specific (no homepage leak)`)
    }

    if (hasHomepageCanonical) {
      console.error(`❌ LEAK: Homepage canonical URL found on blog route!`)
      passedAll = false
    } else if (!hasCorrectCanonical) {
      console.error(`❌ Canonical URL incorrect: expected https://tarajglobal.com/blog/${slug}, got ${meta.canonical}`)
      passedAll = false
    } else {
      console.log(`✅ Canonical URL matches blog URL exactly: ${meta.canonical}`)
    }

    if (!meta.ogTitle || !meta.twitterTitle) {
      console.error(`❌ Missing OG or Twitter title`)
      passedAll = false
    } else {
      console.log(`✅ OG and Twitter titles present`)
    }
  }

  // 2. Test Non-existent / Missing Blog Route (404 + noindex)
  console.log(`\n-----------------------------------------------------`)
  console.log(`Blog: /blog/non-existent-test-slug-404`)
  console.log(`-----------------------------------------------------`)
  const missingRes = await get(`${baseUrl}/blog/non-existent-test-slug-404`)
  const missingMeta = extractMeta(missingRes.body)
  console.log(`HTTP Status:        ${missingRes.statusCode} (Expected 404)`)
  console.log(`Title:              ${missingMeta.title}`)
  console.log(`Robots:             ${missingMeta.robots}`)
  if (missingRes.statusCode === 404 && missingMeta.robots === 'noindex, nofollow') {
    console.log(`✅ Non-existent blog properly returns 404 with noindex, nofollow`)
  } else {
    console.error(`❌ Expected 404 and noindex, got ${missingRes.statusCode} / ${missingMeta.robots}`)
    passedAll = false
  }

  // 3. Test Dynamic Cache Invalidation
  console.log(`\n-----------------------------------------------------`)
  console.log(`Testing Dynamic Cache Invalidation on Update`)
  console.log(`-----------------------------------------------------`)
  const testSlug = 'tgstechinfo'
  const [[originalRow]] = await db.query(`SELECT seo_title FROM blogs WHERE slug = ?`, [testSlug])
  const originalSeoTitle = originalRow ? originalRow.seo_title : null

  // Fetch to warm cache
  const beforeRes = await get(`${baseUrl}/blog/${testSlug}`)
  const beforeMeta = extractMeta(beforeRes.body)
  console.log(`Cached title before update: ${beforeMeta.title}`)

  // Direct update in DB
  const testSeoTitle = 'Updated Dynamic SEO Title ' + Date.now()
  await db.query(
    `UPDATE blogs SET seo_title = ? WHERE slug = ?`,
    [testSeoTitle, testSlug]
  )
  // Invalidate cache
  invalidateBlogCache(testSlug)
  console.log(`Cache invalidated for ${testSlug}`)

  // Fetch again
  const afterRes = await get(`${baseUrl}/blog/${testSlug}`)
  const afterMeta = extractMeta(afterRes.body)
  console.log(`Rendered title after update: ${afterMeta.title}`)

  if (afterMeta.title && afterMeta.title.includes(testSeoTitle)) {
    console.log(`✅ Cache invalidation verified! HTML immediately reflected updated database field.`)
  } else {
    console.error(`❌ Cache invalidation failed! Expected title to contain ${testSeoTitle}, got ${afterMeta.title}`)
    passedAll = false
  }

  // Restore original seo_title
  await db.query(
    `UPDATE blogs SET seo_title = ? WHERE slug = ?`,
    [originalSeoTitle, testSlug]
  )
  invalidateBlogCache(testSlug)
  console.log(`Restored original blog state.`)

  // 4. Test Sitemap XML
  console.log(`\n-----------------------------------------------------`)
  console.log(`Testing /api/seo/sitemap.xml`)
  console.log(`-----------------------------------------------------`)
  const sitemapRes = await get(`${baseUrl}/api/seo/sitemap.xml`)
  if (sitemapRes.statusCode === 200 && sitemapRes.headers['content-type']?.includes('xml')) {
    const blogUrlFound = sitemapRes.body.includes('https://tarajglobal.com/blog/tgstechinfo')
    console.log(`Sitemap status: 200 XML`)
    console.log(`Contains published blog URL: ${blogUrlFound ? '✅ YES' : '❌ NO'}`)
    if (!blogUrlFound) passedAll = false
  } else {
    console.error(`❌ Sitemap returned status ${sitemapRes.statusCode}`)
    passedAll = false
  }

  // 5. Check Homepage HTML
  console.log(`\n-----------------------------------------------------`)
  console.log(`Testing Homepage Route: /`)
  console.log(`-----------------------------------------------------`)
  const homeRes = await get(`${baseUrl}/`)
  const homeMeta = extractMeta(homeRes.body)
  console.log(`Homepage Title:     ${homeMeta.title}`)
  console.log(`Homepage Canonical: ${homeMeta.canonical}`)
  if (homeMeta.canonical === 'https://tarajglobal.com/') {
    console.log(`✅ Homepage metadata is intact and canonical points to root.`)
  } else {
    console.log(`Note: Homepage served via static file handler / dist.`)
  }

  server.close()
  await db.end()

  console.log(`\n=====================================================`)
  if (passedAll) {
    console.log(`🎉 ALL LIVE HTTP SEO SUITE TESTS PASSED!`)
  } else {
    console.log(`❌ SOME TESTS FAILED. CHECK LOGS ABOVE.`)
  }
  console.log(`=====================================================`)

  process.exit(passedAll ? 0 : 1)
}

runTests().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
