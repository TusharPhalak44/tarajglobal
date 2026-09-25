import 'dotenv/config'
import app from './app.js'
import db from './config/db.js'
import { verifySMTPConnection } from './services/email.service.js'

const PORT = process.env.PORT || 5000

// Test database connection
db.getConnection()
  .then((connection) => {
    console.log('✅ Database connected successfully')
    connection.release()
  })
  .catch((error) => {
    console.warn('⚠️  Database connection failed:', error.message)
    console.warn('⚠️  Server will continue running without database. Some features may not work.')
  })

// Safe SMTP diagnostics check on startup
verifySMTPConnection()
  .then((res) => {
    if (res.success) {
      console.log(`📧 SMTP verified: Connected & authenticated via ${res.safeConfig.host}:${res.safeConfig.port}`)
    } else if (res.configured === false) {
      console.log(`📧 SMTP status: Unconfigured / placeholder credentials detected (${res.safeConfig.host}:${res.safeConfig.port})`)
    } else {
      console.warn(`⚠️  SMTP verification failed: [${res.error?.code || 'ERROR'}] ${res.error?.message}`)
    }
  })
  .catch((err) => {
    console.warn('⚠️  SMTP verification check error:', err.message)
  })


// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Accessible at: http://localhost:${PORT}`)
  console.log(`📡 Network access: http://0.0.0.0:${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Terminating old instance...`)
    process.exit(1)
  } else {
    console.error('❌ Server error:', err)
  }
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message)
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message)
})
