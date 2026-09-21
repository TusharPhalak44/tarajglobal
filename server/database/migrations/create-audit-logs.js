/**
 * Create audit_logs table
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
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      action VARCHAR(50) NOT NULL,
      module VARCHAR(50) NOT NULL,
      entity_id INT,
      entity_type VARCHAR(50),
      old_values JSON,
      new_values JSON,
      ip_address VARCHAR(45),
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_user_id (user_id),
      INDEX idx_action (action),
      INDEX idx_module (module),
      INDEX idx_entity (entity_type, entity_id),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
  console.log('✅ Audit logs table created successfully.')
} catch (err) {
  console.error('❌ Failed to create audit_logs table:', err.message)
} finally {
  await db.end()
}
