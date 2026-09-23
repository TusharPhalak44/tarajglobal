/**
 * Create seo_metadata table
 */

import mysql from 'mysql2/promise'
import 'dotenv/config'

const db = await mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  port:     process.env.DB_PORT     || 3306,
  database: process.env.DB_NAME     || 'tarajglobal',
  multipleStatements: true,
})

try {
  await db.query(`
    CREATE TABLE IF NOT EXISTS seo_metadata (
      id INT AUTO_INCREMENT PRIMARY KEY,
      entity_type VARCHAR(50) NOT NULL,
      entity_id VARCHAR(255) NOT NULL,
      meta_title VARCHAR(255),
      meta_description TEXT,
      meta_keywords VARCHAR(500),
      canonical_url VARCHAR(500),
      og_title VARCHAR(255),
      og_description TEXT,
      og_image VARCHAR(500),
      twitter_title VARCHAR(255),
      twitter_description TEXT,
      twitter_image VARCHAR(500),
      robots VARCHAR(255),
      structured_data JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_entity (entity_type, entity_id),
      INDEX idx_entity_type (entity_type),
      INDEX idx_entity_id (entity_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ SEO metadata table created successfully.')
} catch (err) {
  console.error('❌ Failed to create seo_metadata table:', err.message)
} finally {
  await db.end()
}
