/**
 * Create meetings table for booking system
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
    CREATE TABLE IF NOT EXISTS meetings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      booking_id VARCHAR(50) UNIQUE NOT NULL,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      meeting_date DATE NOT NULL,
      meeting_time VARCHAR(20) NOT NULL,
      time_zone VARCHAR(100) NOT NULL,
      meeting_type VARCHAR(50) DEFAULT 'Strategy Call',
      status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_booking_id (booking_id),
      INDEX idx_email (email),
      INDEX idx_meeting_date (meeting_date),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ Meetings table created successfully.')
} catch (err) {
  console.error('❌ Failed to create meetings table:', err.message)
} finally {
  await db.end()
}
