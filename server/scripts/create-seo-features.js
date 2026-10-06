import mysql from 'mysql2/promise';
import 'dotenv/config';

async function run() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'tarajglobal',
    multipleStatements: true,
  });

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS seo_redirects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        old_url VARCHAR(500) NOT NULL UNIQUE,
        new_url VARCHAR(500) NOT NULL,
        redirect_type INT DEFAULT 301,
        status ENUM('active', 'inactive') DEFAULT 'active',
        hits INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_old_url (old_url)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS seo_404_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(500) NOT NULL UNIQUE,
        hits INT DEFAULT 1,
        referrer VARCHAR(500),
        first_detected TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_detected TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_url (url)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS seo_global_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tables created');
  } catch(e) {
    console.error(e);
  } finally {
    db.end();
  }
}
run();
