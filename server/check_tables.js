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
    const [rows] = await db.execute("SHOW TABLES LIKE 'career_events'")
    console.log('career_events:', rows.length > 0 ? 'Exists' : 'Missing')
    const [rows2] = await db.execute("SHOW TABLES LIKE 'career_event_photos'")
    console.log('career_event_photos:', rows2.length > 0 ? 'Exists' : 'Missing')
  } catch (err) {
    console.error('❌ Failed:', err.message)
  } finally {
    await db.end()
  }
}

check()
