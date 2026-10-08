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
    const [rows] = await db.execute("SELECT * FROM navbar_items WHERE section='header' AND is_active=1")
    console.log(rows)
  } catch (err) {
    console.error('❌ Failed:', err.message)
  } finally {
    await db.end()
  }
}

check()
