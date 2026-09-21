/**
 * Migration: Create clients table and insert default client-section settings
 * Run: node --input-type=module server/database/migrations/create_clients_table.js
 */
import db from '../../config/db.js'

export const up = async () => {
  console.log('Creating clients table...')

  // Create clients table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS clients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      logo_path VARCHAR(500) NOT NULL,
      website_url VARCHAR(500) NULL,
      display_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ clients table created')

  // Check if already seeded
  const [rows] = await db.execute('SELECT COUNT(*) as count FROM clients')
  if (rows[0].count > 0) {
    console.log('ℹ️  Clients already seeded, skipping seed.')
  } else {
    await db.execute(`
      INSERT INTO clients (client_name, logo_path, website_url, display_order, is_active) VALUES
      ('Mitel', '/mitel.png', NULL, 1, 1),
      ('Vonage', '/Vonage.png', NULL, 2, 1),
      ('RingCentral', '/ringcentral.png', NULL, 3, 1),
      ('AVAYA', '/Avaya.webp', NULL, 4, 1),
      ('Microsoft', '/micro.png', NULL, 5, 1),
      ('Oracle', '/ora.png', NULL, 6, 1)
    `)
    console.log('✅ Default 6 clients seeded')
  }

  // Insert client section settings into settings table (if not exist)
  const sectionSettings = [
    ['cms_clients_eyebrow', 'GLOBAL PARTNERSHIPS', 'Eyebrow badge text for clients section'],
    ['cms_clients_title_white', 'TRUSTED BY', 'White part of clients section title'],
    ['cms_clients_title_gradient', 'LEADING B2B BRANDS', 'Gradient part of clients section title'],
    ['cms_clients_subtitle', 'Building demand with the technology ecosystem trusted by modern enterprises.', 'Supporting subtitle for clients section'],
    ['cms_clients_visible', '1', 'Whether the clients section is visible on homepage'],
  ]

  for (const [key, value, description] of sectionSettings) {
    const [existing] = await db.execute('SELECT id FROM settings WHERE key_name = ?', [key])
    if (existing.length === 0) {
      await db.execute(
        'INSERT INTO settings (key_name, value, description) VALUES (?, ?, ?)',
        [key, value, description]
      )
      console.log(`✅ Setting inserted: ${key}`)
    } else {
      console.log(`ℹ️  Setting already exists: ${key}`)
    }
  }

  console.log('🎉 Migration complete!')
}

// Run migration
up()
  .then(() => process.exit(0))
  .catch(err => { console.error('❌ Migration failed:', err); process.exit(1) })
