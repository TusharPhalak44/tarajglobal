import mysql from 'mysql2/promise'
import 'dotenv/config'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tarajglobal',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
})

// Log database connection details
console.log('=== DATABASE CONNECTION ===')
console.log('Host:', process.env.DB_HOST || 'localhost')
console.log('User:', process.env.DB_USER || 'root')
console.log('Database:', process.env.DB_NAME || 'tarajglobal')
console.log('Port:', process.env.DB_PORT || 3306)

// Test connection
pool.getConnection().then(connection => {
  console.log('✅ Database connected successfully')
  connection.release()
}).catch(err => {
  console.error('❌ Database connection failed:', err)
})

export default pool
