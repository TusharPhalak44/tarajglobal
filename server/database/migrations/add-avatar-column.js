import mysql from 'mysql2/promise'
import 'dotenv/config'

const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'tarajglobal',
})

try {
  // Check if avatar column exists in users table
  const [columns] = await db.query(`
    SELECT COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'avatar'
  `, [process.env.DB_NAME || 'tarajglobal'])

  if (columns.length === 0) {
    await db.query(`
      ALTER TABLE users ADD COLUMN avatar VARCHAR(500) NULL AFTER role
    `)
    console.log('✅ Added avatar column to users table.')
  } else {
    console.log('ℹ️ Avatar column already exists in users table.')
  }
} catch (err) {
  console.error('❌ Migration error:', err.message)
} finally {
  await db.end()
}
