/**
 * Create users table
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
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('super_admin', 'admin', 'editor', 'hr_recruiter', 'content_manager', 'user') DEFAULT 'user',
      status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
      last_login_at TIMESTAMP NULL,
      failed_login_attempts INT DEFAULT 0,
      locked_until TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_role (role),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ Users table created successfully.')
} catch (err) {
  console.error('❌ Failed to create users table:', err.message)
} finally {
  await db.end()
}
