import mysql from 'mysql2/promise'
import 'dotenv/config'

async function fixSettings() {
  const db = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'db',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME     || 'tarajglobal'
  })

  try {
    try {
      await db.query('ALTER TABLE settings ADD COLUMN description TEXT')
      console.log('✅ Added description column to settings table')
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ description column already exists')
      } else {
        throw e
      }
    }
  } catch (err) {
    console.error('❌ Failed:', err.message)
  } finally {
    await db.end()
  }
}

fixSettings()
