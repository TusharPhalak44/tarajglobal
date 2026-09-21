/**
 * Create contacts table for leads
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
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      company VARCHAR(100),
      message TEXT,
      status ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
      assigned_to INT,
      source VARCHAR(100),
      page_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_status (status),
      INDEX idx_email (email),
      INDEX idx_assigned_to (assigned_to),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ Contacts table created successfully.')
} catch (err) {
  console.error('❌ Failed to create contacts table:', err.message)
} finally {
  await db.end()
}
