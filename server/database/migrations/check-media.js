/**
 * Check media table schema and data
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
  // Check if table exists
  const [tables] = await db.query(`
    SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'media'
  `)
  
  if (tables.length === 0) {
    console.log('❌ Media table does not exist')
  } else {
    console.log('✅ Media table exists')
    
    // Check columns
    const [columns] = await db.query('DESCRIBE media')
    console.log('\nMedia table columns:')
    columns.forEach(col => {
      console.log(`  ${col.Field} - ${col.Type} - ${col.Null} - ${col.Default}`)
    })
    
    // Check data count
    const [count] = await db.query('SELECT COUNT(*) as total FROM media')
    console.log(`\nTotal media records: ${count[0].total}`)
    
    // Show sample data
    if (count[0].total > 0) {
      const [rows] = await db.query('SELECT * FROM media LIMIT 5')
      console.log('\nSample media records:')
      console.log(JSON.stringify(rows, null, 2))
    }
  }
} catch (err) {
  console.error('❌ Error:', err.message)
} finally {
  await db.end()
}
