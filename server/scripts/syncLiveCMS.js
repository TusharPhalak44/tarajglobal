import https from 'https'
import db from '../config/db.js'

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

export async function syncLiveCMS() {
  console.log('🔄 Checking for latest published posts from Live CMS (tarajglobal.com)...')
  try {
    // 1. Fetch live categories
    try {
      const catRes = await fetchJson('https://tarajglobal.com/api/categories')
      const liveCats = catRes?.data || []
      for (const cat of liveCats) {
        if (!cat.id || !cat.name) continue
        await db.execute(
          `INSERT INTO categories (id, name, slug, description) 
           VALUES (?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE name = VALUES(name), slug = VALUES(slug), description = VALUES(description)`,
          [cat.id, cat.name, cat.slug, cat.description || null]
        )
      }
    } catch (catErr) {
      console.warn('Notice: categories sync note:', catErr.message)
    }

    // 2. Fetch live authors
    try {
      const authRes = await fetchJson('https://tarajglobal.com/api/authors')
      const liveAuthors = authRes?.data || []
      for (const a of liveAuthors) {
        if (!a.id || !a.name) continue
        await db.execute(
          `INSERT INTO authors (id, user_id, name, slug, bio, profile_photo, designation) 
           VALUES (?, ?, ?, ?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE name = VALUES(name), slug = VALUES(slug), profile_photo = VALUES(profile_photo), designation = VALUES(designation)`,
          [a.id, a.user_id || 1, a.name, a.slug, a.bio || null, a.profile_photo || null, a.designation || null]
        )
      }
    } catch (authErr) {
      console.warn('Notice: authors sync note:', authErr.message)
    }

    // 3. Fetch live blogs
    const blogRes = await fetchJson('https://tarajglobal.com/api/blog?limit=100')
    const liveBlogs = blogRes?.data || []
    let syncedBlogCount = 0

    for (const b of liveBlogs) {
      if (!b.slug || !b.title) continue

      // Preserve exact dates from live CMS
      const publishedAt = b.published_at ? new Date(b.published_at) : (b.created_at ? new Date(b.created_at) : new Date())
      const createdAt = b.created_at ? new Date(b.created_at) : publishedAt
      const updatedAt = b.updated_at ? new Date(b.updated_at) : publishedAt

      await db.execute(
        `INSERT INTO blogs (
          id, title, slug, content, excerpt, image, featured_image,
          author_id, category_id, status, reading_time, published_at,
          created_at, updated_at, seo_title, seo_description, seo_keywords,
          canonical_url, view_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          content = VALUES(content),
          excerpt = VALUES(excerpt),
          image = VALUES(image),
          featured_image = VALUES(featured_image),
          author_id = VALUES(author_id),
          category_id = VALUES(category_id),
          status = VALUES(status),
          reading_time = VALUES(reading_time),
          published_at = VALUES(published_at),
          created_at = VALUES(created_at),
          updated_at = VALUES(updated_at),
          seo_title = VALUES(seo_title),
          seo_description = VALUES(seo_description),
          seo_keywords = VALUES(seo_keywords),
          canonical_url = VALUES(canonical_url),
          view_count = VALUES(view_count)`,
        [
          b.id,
          b.title,
          b.slug,
          b.content,
          b.excerpt || '',
          b.image || b.featured_image || null,
          b.featured_image || b.image || null,
          b.author_id || null,
          b.category_id || null,
          b.status || 'published',
          b.reading_time || null,
          publishedAt,
          createdAt,
          updatedAt,
          b.seo_title || b.title,
          b.seo_description || b.excerpt || null,
          b.seo_keywords || null,
          b.canonical_url || null,
          b.view_count || 0
        ]
      )
      syncedBlogCount++
    }

    // 4. Fetch live career gallery albums
    try {
      const galRes = await fetchJson('https://tarajglobal.com/api/career-gallery')
      const liveGal = galRes?.data || []
      for (const item of liveGal) {
        if (!item.id || !item.title) continue
        await db.execute(
          `INSERT INTO career_gallery (id, num, title, tag, image, count, description)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = VALUES(title), tag = VALUES(tag), image = VALUES(image), count = VALUES(count), description = VALUES(description)`,
          [item.id, item.num || '01', item.title, item.tag || null, item.image || null, item.count || '20+ Photos', item.description || null]
        )
      }
    } catch (galErr) {
      console.warn('Notice: gallery sync note:', galErr.message)
    }

    // 5. Clean up bogus mock careers in local database so clean fallback or live jobs show
    try {
      await db.execute(
        `DELETE FROM careers WHERE title IN ('MM', 'fgbvf', 'dcrfc', 'ddddddddddddddddd', 'drtgss')`
      )
    } catch (delErr) {
      // ignore
    }

    // 6. Fetch live jobs if any exist
    try {
      const jobRes = await fetchJson('https://tarajglobal.com/api/jobs')
      const liveJobs = jobRes?.data || []
      for (const j of liveJobs) {
        if (!j.title) continue
        await db.execute(
          `INSERT INTO careers (id, title, slug, department, location, type, experience, description, requirements, status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = VALUES(title), department = VALUES(department), location = VALUES(location), status = VALUES(status)`,
          [
            j.id,
            j.title,
            j.slug || j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            j.department || 'Operations',
            j.location || 'Pune, India',
            j.type || 'Full-Time',
            j.experience || '1-3 Years',
            j.description || '',
            typeof j.requirements === 'string' ? j.requirements : JSON.stringify(j.requirements || []),
            j.status || 'published',
            j.created_at ? new Date(j.created_at) : new Date(),
            j.updated_at ? new Date(j.updated_at) : new Date()
          ]
        )
      }
    } catch (jobErr) {
      console.warn('Notice: jobs sync note:', jobErr.message)
    }

    console.log(`✅ Live CMS sync complete: ${syncedBlogCount} blogs synchronized without altering dates or metadata.`)
  } catch (err) {
    console.warn('⚠️  Live CMS sync warning:', err.message)
  }
}

if (process.argv[1]?.includes('syncLiveCMS.js')) {
  syncLiveCMS()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
}
