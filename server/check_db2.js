import mysql from 'mysql2/promise'
import 'dotenv/config'

async function check() {
  const db = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'db',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME     || 'tarajglobal'
  })

  try {
    await db.execute(`
        INSERT INTO navbar_items (section, label, url, parent_id, display_order, is_active) VALUES
        ('header', 'info@tarajglobal.com', 'mailto:info@tarajglobal.com', NULL, 1, 1),
        ('header', '+1-234-567-8900', 'tel:+1-234-567-8900', NULL, 2, 1),
        ('header', '🚀 B2B Pipeline Acceleration', '/contact', NULL, 3, 1)
    `)
    console.log('✅ Default header items inserted!')
  } catch (err) {
    console.error('❌ Failed:', err.message)
  } finally {
    await db.end()
  }
}

check()
