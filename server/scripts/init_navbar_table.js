import db from '../config/db.js'

async function init() {
  try {
    console.log('Creating navbar_items table if not exists...')
    await db.execute(`
      CREATE TABLE IF NOT EXISTS navbar_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(50) DEFAULT 'navbar',
        label VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        parent_id INT DEFAULT NULL,
        display_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_section (section),
        INDEX idx_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    const [existing] = await db.execute('SELECT COUNT(*) as count FROM navbar_items')
    if (existing[0].count === 0) {
      await db.execute(`
        INSERT INTO navbar_items (section, label, url, parent_id, display_order, is_active) VALUES
        ('header', 'info@tarajglobal.com', 'mailto:info@tarajglobal.com', NULL, 1, 1),
        ('header', '+1-234-567-8900', 'tel:+1-234-567-8900', NULL, 2, 1),
        ('header', '🚀 B2B Pipeline Acceleration', '/contact', NULL, 3, 1),
        ('navbar', 'Home', '/', NULL, 1, 1),
        ('navbar', 'About Us', '/about', NULL, 2, 1),
        ('navbar', 'Services', '/services', NULL, 3, 1),
        ('navbar', 'Industries', '/industries', NULL, 4, 1),
        ('navbar', 'Career', '/careers', NULL, 5, 1),
        ('navbar', 'Blogs', '/blog', NULL, 6, 1),
        ('navbar', 'Contact Us', '/contact', NULL, 7, 1)
      `)
      console.log('Seeded default navbar_items successfully')
    } else {
      console.log(`navbar_items already has ${existing[0].count} rows`)
    }

    const [logoSetting] = await db.execute("SELECT * FROM settings WHERE key_name = 'cms_logo_url'")
    if (logoSetting.length === 0) {
      await db.execute("INSERT INTO settings (key_name, value, description) VALUES ('cms_logo_url', '/middle.png', 'Website company logo URL')")
      console.log('Inserted default cms_logo_url')
    } else {
      console.log('cms_logo_url already set:', logoSetting[0].value)
    }

    const [all] = await db.execute('SELECT * FROM navbar_items ORDER BY section, display_order')
    console.log('Current navbar items in DB:', all)
    process.exit(0)
  } catch (err) {
    console.error('Init error:', err)
    process.exit(1)
  }
}

init()
