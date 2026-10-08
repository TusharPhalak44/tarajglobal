import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const db = await mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'tarajglobal',
  port:     process.env.DB_PORT     || 3306,
  multipleStatements: true,
})

try {
  const sqlPath = path.join(__dirname, '002_create_footer_management_tables.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  await db.query(sql)
  console.log('✅ Footer tables created successfully.')
} catch (err) {
  console.error('❌ Footer tables creation failed:', err.message)
} finally {
  await db.end()
}
