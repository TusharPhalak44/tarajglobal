import db from '../../config/db.js'
import { ROUTES, SITE_URL, DEFAULT_IMAGE } from '../../../client/scripts/route-meta.mjs'

export const seedSeoMetadata = async () => {
  try {
    console.log('🔄 Checking and seeding default SEO metadata for all website pages...')

    const routeToEntityId = (route) => {
      if (route === '/') return 'home'
      return route.replace(/^\//, '').replace(/\/+$/, '')
    }

    let inserted = 0
    let skipped = 0

    for (const [route, meta] of Object.entries(ROUTES)) {
      const entityId = routeToEntityId(route)
      const canonical = `${SITE_URL}${route === '/' ? '/' : route}`
      const image = meta.image || DEFAULT_IMAGE

      // Check if already exists in seo_metadata
      const [existing] = await db.execute(
        'SELECT id, meta_title FROM seo_metadata WHERE entity_type = "page" AND entity_id = ?',
        [entityId]
      )

      if (existing.length === 0) {
        await db.execute(`
          INSERT INTO seo_metadata (
            entity_type, entity_id, meta_title, meta_description, meta_keywords,
            canonical_url, og_title, og_description, og_image,
            twitter_title, twitter_description, twitter_image, robots
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          'page',
          entityId,
          meta.title,
          meta.description,
          meta.keywords || '',
          canonical,
          meta.title,
          meta.description,
          image,
          meta.title,
          meta.description,
          image,
          'index, follow, max-image-preview:large'
        ])
        inserted++
      } else {
        skipped++
      }
    }

    console.log(`✅ SEO metadata seeding completed: ${inserted} new page records inserted, ${skipped} existing records preserved.`)
  } catch (error) {
    console.error('❌ SEO metadata seeding failed:', error.message)
  }
}

export default seedSeoMetadata
