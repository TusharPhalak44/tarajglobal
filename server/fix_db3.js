import mysql from 'mysql2/promise'
import 'dotenv/config'

async function fixDB() {
  const db = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'db',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME     || 'tarajglobal'
  })

  try {
    console.log('1. Fixing seo_metadata entity_id column type...')
    await db.execute('ALTER TABLE seo_metadata MODIFY COLUMN entity_id VARCHAR(255)')
    console.log('✅ seo_metadata fixed')

    console.log('2. Adding missing columns to footer_settings...')
    try {
      await db.execute('ALTER TABLE footer_settings ADD COLUMN cert_image_url VARCHAR(500) DEFAULT NULL')
      await db.execute('ALTER TABLE footer_settings ADD COLUMN is_cert_image_visible TINYINT(1) DEFAULT 1')
      console.log('✅ footer_settings columns added')
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ footer_settings columns already exist')
      } else {
        throw e
      }
    }

    console.log('3. Creating page_views table...')
    await db.execute(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_url VARCHAR(500),
        referrer VARCHAR(500),
        user_agent VARCHAR(500),
        session_id VARCHAR(255),
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    console.log('✅ page_views table created')
    
  } catch (err) {
    console.error('❌ Failed:', err.message)
  } finally {
    await db.end()
  }
}

fixDB()
