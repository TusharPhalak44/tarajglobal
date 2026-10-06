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
    
    const domain = process.env.CLIENT_URL || 'https://tarajglobal.com';
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
export const getSitemapXml = async (req, res) => {
  try {
    const domain = process.env.CLIENT_URL || 'https://tarajglobal.com';
    
    // Fetch static pages with their SEO data
    const [staticPages] = await db.execute(`
      SELECT entity_id, updated_at, robots FROM seo_metadata WHERE entity_type = 'page'
    `);

    // Fetch published blogs
    const [blogs] = await db.execute(`
      SELECT id, slug, updated_at FROM blogs WHERE status = 'published'
    `);
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    const staticRoutes = ['home', 'about', 'services', 'contact', 'careers', 'blog', 'content-syndication', 'bant-lead-generation', 'mql-services', 'hql-services', 'sql-services', 'b2b-appointment-setting', 'b2b-email-marketing', 'demandflow-bridge', 'abm', 'webinar-services', 'lead-nurturing', 'demand-generation', 'b2b-list-building', 'database-cleansing', 'privacy', 'terms', 'cookies'];
    
    for (const route of staticRoutes) {
      // Find if we have SEO data for this route
      const seo = staticPages.find(p => p.entity_id === route);
      if (seo && seo.robots && seo.robots.includes('noindex')) continue;

      const path = route === 'home' ? '' : `/${route}`;
      const url = `${domain}${path}`;
      
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${(seo ? new Date(seo.updated_at) : new Date()).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${route === 'home' ? 'daily' : 'weekly'}</changefreq>\n`;
      xml += `    <priority>${route === 'home' ? '1.0' : '0.8'}</priority>\n`;
      xml += '  </url>\n';
    }

    // Blogs
    for (const blog of blogs) {
      // check blog specific SEO
      const [blogSeo] = await db.execute('SELECT robots FROM seo_metadata WHERE entity_type = "blog" AND entity_id = ?', [blog.id]);
      if (blogSeo.length > 0 && blogSeo[0].robots && blogSeo[0].robots.includes('noindex')) continue;

      const url = `${domain}/blog/${blog.slug}`;
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${new Date(blog.updated_at).toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
}
