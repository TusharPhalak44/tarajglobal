/**
 * CMS Migration runner
 * Runs the CMS schema migration against the database
 * Usage: node server/database/migrations/run-cms.js
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
  database: process.env.DB_NAME     || 'tarajglobal',
  multipleStatements: true,
})

try {
  const sqlPath = path.join(__dirname, '../../../database/migrations/001_create_cms_tables.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  await db.query(sql)
  console.log('✅ CMS migration ran successfully.')
} catch (err) {
  console.error('❌ CMS migration failed:', err.message)
} finally {
  await db.end()
}
