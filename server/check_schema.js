import mysql from 'mysql2/promise'
import 'dotenv/config'

async function check() {
  const db = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'db',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME     || 'tarajglobal'
  })

  try {
    const [rows] = await db.execute("DESCRIBE seo_metadata")
    console.log('seo_metadata table:', rows)
    const [rows2] = await db.execute("DESCRIBE footer_settings")
    console.log('footer_settings table:', rows2)
  } catch (err) {
    console.error('❌ Failed:', err.message)
  } finally {
    await db.end()
  }
}

check()
