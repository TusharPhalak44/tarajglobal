/**
 * Admin Seeder
 * Run with: node database/seeders/admin.seeder.js
 *
 * Creates the default admin account:
 *   Email:    admin@tarajglobal.com
 *   Password: Admin@123
 */

import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const db = await mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'tarajglobal',
  port:     process.env.DB_PORT     || 3306,
})

const ADMIN_NAME     = 'Admin'
const ADMIN_EMAIL    = 'admin@tarajglobal.com'
const ADMIN_PASSWORD = 'Admin@123'

try {
  // Check if admin already exists
  const [rows] = await db.execute(
    'SELECT id FROM users WHERE email = ?',
    [ADMIN_EMAIL]
  )

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12)

  if (rows.length > 0) {
    // Update existing admin password
    await db.execute(
      'UPDATE users SET password = ?, role = ? WHERE email = ?',
      [hashedPassword, 'admin', ADMIN_EMAIL]
    )
    console.log('✅ Admin password updated successfully.')
  } else {
    // Insert new admin
    await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [ADMIN_NAME, ADMIN_EMAIL, hashedPassword, 'admin']
    )
    console.log('✅ Admin user created successfully.')
  }

  console.log('')
  console.log('─────────────────────────────────')
  console.log('  Admin Credentials')
  console.log('─────────────────────────────────')
  console.log(`  Email    : ${ADMIN_EMAIL}`)
  console.log(`  Password : ${ADMIN_PASSWORD}`)
  console.log('─────────────────────────────────')
  console.log('')
} catch (err) {
  console.error('❌ Seeder failed:', err.message)
} finally {
  await db.end()
}
