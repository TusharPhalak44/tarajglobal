/**
 * Create categories table
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
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      image VARCHAR(255),
      seo_title VARCHAR(255),
      seo_description TEXT,
      status ENUM('active', 'inactive') DEFAULT 'active',
      post_count INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ Categories table created successfully.')
} catch (err) {
  console.error('❌ Failed to create categories table:', err.message)
} finally {
  await db.end()
}
