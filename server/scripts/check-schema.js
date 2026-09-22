/**
 * Check current careers table schema
 */

import mysql from 'mysql2/promise'
import 'dotenv/config'

const db = await mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  port:     process.env.DB_PORT     || 3306,
  database: process.env.DB_NAME     || 'tarajglobal',
})

try {
  const [columns] = await db.query('DESCRIBE careers')
  console.log('Current careers table columns:')
  columns.forEach(col => {
    console.log(`  ${col.Field} - ${col.Type} - ${col.Null} - ${col.Default}`)
  })
} catch (err) {
  console.error('Error:', err.message)
} finally {
  await db.end()
}
