/**
 * Create media table
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
    CREATE TABLE IF NOT EXISTS media (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      original_name VARCHAR(255) NOT NULL,
      mime_type VARCHAR(100) NOT NULL,
      file_size BIGINT NOT NULL,
      file_path VARCHAR(500) NOT NULL,
      file_url VARCHAR(500) NOT NULL,
      alt_text TEXT,
      caption TEXT,
      description TEXT,
      status ENUM('active', 'deleted') DEFAULT 'active',
      uploaded_by INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_status (status),
      INDEX idx_mime_type (mime_type),
      INDEX idx_uploaded_by (uploaded_by)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ Media table created successfully.')
} catch (err) {
  console.error('❌ Failed to create media table:', err.message)
} finally {
  await db.end()
}
