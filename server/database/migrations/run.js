/**
 * Migration runner
 * Runs the main SQL schema against the database
 * Usage: npm run migrate
 */

import mysql from 'mysql2/promise'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const db = await mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  port:     process.env.DB_PORT     || 3306,
  multipleStatements: true,
})

try {
  const sqlPath = path.join(__dirname, '../schema/tarajglobal.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  await db.query(sql)
  console.log('✅ Migrations ran successfully.')
} catch (err) {
  console.error('❌ Migration failed:', err.message)
} finally {
  await db.end()
}
