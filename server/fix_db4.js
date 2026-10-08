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
      CREATE TABLE IF NOT EXISTS seo_global_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ seo_global_settings table created')
    
    // Check for seo_404_logs and seo_redirects as well just in case!
    await db.execute(`
      CREATE TABLE IF NOT EXISTS seo_redirects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        old_url VARCHAR(500) NOT NULL,
        new_url VARCHAR(500) NOT NULL,
        type ENUM('301', '302') DEFAULT '301',
        status ENUM('active', 'inactive') DEFAULT 'active',
        hits INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ seo_redirects table created')
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS seo_404_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(500) NOT NULL,
        referrer VARCHAR(500),
        hits INT DEFAULT 1,
        last_detected TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved TINYINT(1) DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ seo_404_logs table created')
    
  } catch (err) {
    console.error('❌ Failed:', err.message)
  } finally {
    await db.end()
  }
}

check()
