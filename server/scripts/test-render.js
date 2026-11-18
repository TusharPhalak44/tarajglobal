import { renderBlogHtml } from '../services/blogSeoRenderer.js'

async function run() {
  const slugs = [
    'tgstechinfo',
    'b2b-pipeline-foundation-playbook',
    'how-to-build-an-ideal-customer-profile',
    'icp-vs-buyer-persona-vs-buying-committee',
    'add-a-strong-lead-qualification-process'
  ]

  for (const slug of slugs) {
    console.log(`\n========================================`)
    console.log(`Testing Blog Slug: ${slug}`)
    const result = await renderBlogHtml(slug)
    console.log(`HTTP Status: ${result.statusCode}`)
    if (result.statusCode === 200) {
      const titleMatch = result.html.match(/<title>(.*?)<\/title>/)
      const descMatch = result.html.match(/<meta data-prerender name="description" content="(.*?)"/)
      const canonMatch = result.html.match(/<link data-prerender rel="canonical" href="(.*?)"/)
      const robotsMatch = result.html.match(/<meta data-prerender name="robots" content="(.*?)"/)
      const ogTitleMatch = result.html.match(/<meta data-prerender property="og:title" content="(.*?)"/)
      const ogDescMatch = result.html.match(/<meta data-prerender property="og:description" content="(.*?)"/)
      const ogUrlMatch = result.html.match(/<meta data-prerender property="og:url" content="(.*?)"/)
      const ogImageMatch = result.html.match(/<meta data-prerender property="og:image" content="(.*?)"/)
      const twitterTitleMatch = result.html.match(/<meta data-prerender name="twitter:title" content="(.*?)"/)
      const twitterImageMatch = result.html.match(/<meta data-prerender name="twitter:image" content="(.*?)"/)

      console.log(`Title: ${titleMatch ? titleMatch[1] : 'NOT FOUND'}`)
      console.log(`Description: ${descMatch ? descMatch[1] : 'NOT FOUND'}`)
      console.log(`Canonical: ${canonMatch ? canonMatch[1] : 'NOT FOUND'}`)
      console.log(`Robots: ${robotsMatch ? robotsMatch[1] : 'NOT FOUND'}`)
      console.log(`OG Title: ${ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND'}`)
      console.log(`OG Description: ${ogDescMatch ? ogDescMatch[1] : 'NOT FOUND'}`)
      console.log(`OG URL: ${ogUrlMatch ? ogUrlMatch[1] : 'NOT FOUND'}`)
      console.log(`OG Image: ${ogImageMatch ? ogImageMatch[1] : 'NOT FOUND'}`)
      console.log(`Twitter Title: ${twitterTitleMatch ? twitterTitleMatch[1] : 'NOT FOUND'}`)
      console.log(`Twitter Image: ${twitterImageMatch ? twitterImageMatch[1] : 'NOT FOUND'}`)

      // Verify that homepage metadata is NOT present!
      const hasHomepageTitle = result.html.includes('Tech-Powered B2B Demand Generation & AI Lead Gen | TaRaj Global')
      const hasHomepageCanonical = result.html.includes('rel="canonical" href="https://tarajglobal.com/"')
      console.log(`Homepage Title leaked? ${hasHomepageTitle ? 'YES (FAIL)' : 'NO (PASS)'}`)
      console.log(`Homepage Canonical leaked? ${hasHomepageCanonical ? 'YES (FAIL)' : 'NO (PASS)'}`)
    }
  }

  // Also test 404
  console.log(`\n========================================`)
  console.log(`Testing Non-Existent Blog Slug: nonexistent-slug-12345`)
  const notFoundResult = await renderBlogHtml('nonexistent-slug-12345')
  console.log(`HTTP Status: ${notFoundResult.statusCode} (Expected: 404)`)
  const nfTitle = notFoundResult.html.match(/<title>(.*?)<\/title>/)
  const nfRobots = notFoundResult.html.match(/<meta data-prerender name="robots" content="(.*?)"/)
  console.log(`404 Title: ${nfTitle ? nfTitle[1] : 'NOT FOUND'}`)
  console.log(`404 Robots: ${nfRobots ? nfRobots[1] : 'NOT FOUND'}`)

  process.exit(0)
}

run().catch((err) => {
  console.error('Test run failed:', err)
  process.exit(1)
})
