import db from '../config/db.js'

/**
 * Get SEO metadata for any entity (public route)
 * GET /api/seo/metadata/:entityType/:entityId
 */
export const getSEOData = async (req, res) => {
  try {
    const { entityType, entityId } = req.params

    const [seoData] = await db.execute(
      'SELECT * FROM seo_metadata WHERE entity_type = ? AND entity_id = ?',
      [entityType, entityId]
    )

    const [globalSettings] = await db.execute('SELECT * FROM seo_global_settings');
    const globalDefaults = {};
    globalSettings.forEach(s => globalDefaults[s.setting_key] = s.setting_value);

    if (seoData.length === 0) {
      return res.json({ success: true, data: null, global: globalDefaults })
    }

    res.json({ success: true, data: seoData[0], global: globalDefaults })
  } catch (error) {
    console.error('Error fetching SEO data:', error)
    res.status(500).json({ success: false, message: 'Server error fetching SEO data' })
  }
}

/**
 * Check if a URL has a redirect
 * GET /api/seo/redirects/check?url=...
 */
export const checkRedirect = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json({ success: true, redirect: null });

    // Normalize URL
    const normalizedUrl = url.replace(/\/+$/, '') || '/';
    
    // Exact match
    const [rows] = await db.execute(
      'SELECT * FROM seo_redirects WHERE old_url = ? AND status = "active"',
      [normalizedUrl]
    );

    if (rows.length > 0) {
      // Increment hits asynchronously
      db.execute('UPDATE seo_redirects SET hits = hits + 1 WHERE id = ?', [rows[0].id]).catch(console.error);
      return res.json({ success: true, redirect: rows[0] });
    }

    res.json({ success: true, redirect: null });
  } catch (error) {
    console.error('Error checking redirect:', error);
    res.status(500).json({ success: false, message: 'Error checking redirect' });
  }
}

/**
 * Log a 404 hit
 * POST /api/seo/404
 */
export const log404 = async (req, res) => {
  try {
    const { url, referrer } = req.body;
    if (!url) return res.status(400).json({ success: false, message: 'URL required' });

    const [existing] = await db.execute('SELECT id FROM seo_404_logs WHERE url = ?', [url]);
    
    if (existing.length > 0) {
      await db.execute('UPDATE seo_404_logs SET hits = hits + 1, last_detected = NOW() WHERE id = ?', [existing[0].id]);
    } else {
      await db.execute('INSERT INTO seo_404_logs (url, referrer) VALUES (?, ?)', [url, referrer || null]);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error logging 404:', error);
    res.status(500).json({ success: false });
  }
}

/**
 * Get Robots.txt
 * GET /api/seo/robots.txt
 */
export const getRobotsTxt = async (req, res) => {
  try {
    const [settings] = await db.execute('SELECT setting_value FROM seo_global_settings WHERE setting_key = "robots_txt"');
    let content = settings.length > 0 ? settings[0].setting_value : 'User-agent: *\nAllow: /';
    
    const domain = (process.env.SITE_URL || 'https://tarajglobal.com').replace(/\/$/, '');
    if (!content.includes('Sitemap:')) {
      content += `\n\nSitemap: ${domain}/sitemap.xml`;
    }

    res.header('Content-Type', 'text/plain');
    res.send(content);
  } catch (error) {
    res.header('Content-Type', 'text/plain');
    res.send('User-agent: *\nAllow: /');
  }
}

/**
 * Get Sitemap.xml
 * GET /api/seo/sitemap.xml
 */
const SERVICE_ROUTES = ['sql-services', 'hql-services', 'mql-services', 'bant-lead-generation', 'b2b-appointment-setting', 'b2b-email-marketing', 'abm', 'content-syndication', 'demand-generation', 'webinar-services', 'lead-nurturing', 'b2b-list-building', 'database-cleansing', 'demandflow-bridge']
const CORE_ROUTES = ['home', 'services', 'contact', 'about', 'blog', 'careers']
const LEGAL_ROUTES = ['privacy', 'terms', 'cookies']

const routePriority = (route) => {
  if (route === 'home') return '1.0'
  if (route === 'services' || route === 'contact' || SERVICE_ROUTES.includes(route)) return '0.9'
  if (LEGAL_ROUTES.includes(route)) return '0.3'
  return '0.7'
}

const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]))

const urlEntry = (loc, lastmod, changefreq, priority) =>
  `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`

const isoDate = (value) => {
  const d = value ? new Date(value) : new Date()
  return (isNaN(d) ? new Date() : d).toISOString().split('T')[0]
}

export const getSitemapXml = async (req, res) => {
  const domain = (process.env.SITE_URL || 'https://tarajglobal.com').replace(/\/$/, '')
  let staticPages = []
  let blogs = []

  try {
    ;[staticPages] = await db.execute(`SELECT entity_id, updated_at, robots FROM seo_metadata WHERE entity_type = 'page'`)
    ;[blogs] = await db.execute(`
      SELECT b.slug, b.updated_at
      FROM blogs b
      LEFT JOIN seo_metadata s ON s.entity_type = 'blog' AND s.entity_id = b.id
      WHERE b.status = 'published' AND (s.robots IS NULL OR s.robots NOT LIKE '%noindex%')
      ORDER BY b.updated_at DESC
    `)
  } catch (error) {
    // Still serve the static routes so crawlers never get an error page.
    console.error('Sitemap DB error:', error.message)
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const route of [...CORE_ROUTES, ...SERVICE_ROUTES, ...LEGAL_ROUTES]) {
    const seo = staticPages.find((p) => p.entity_id === route)
    if (seo?.robots?.includes('noindex')) continue
    const path = route === 'home' ? '/' : `/${route}`
    xml += urlEntry(`${domain}${path}`, isoDate(seo?.updated_at), route === 'home' || route === 'blog' ? 'daily' : 'weekly', routePriority(route))
  }

  for (const blog of blogs) {
    if (!blog.slug) continue
    xml += urlEntry(`${domain}/blog/${blog.slug}`, isoDate(blog.updated_at), 'monthly', '0.6')
  }

  xml += '</urlset>'
  res.header('Content-Type', 'application/xml')
  res.header('Cache-Control', 'public, max-age=3600')
  res.send(xml)
}
