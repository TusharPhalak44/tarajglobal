import mysql from 'mysql2/promise'
import 'dotenv/config'

const runChatMigration = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'tarajglobal',
    port: process.env.DB_PORT || 3306,
    multipleStatements: true
  })

  try {
    const createSessionsTable = `
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id VARCHAR(64) PRIMARY KEY,
        session_token VARCHAR(128) NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        status ENUM('active', 'closed') DEFAULT 'active',
        last_admin_reply_at DATETIME DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `

    const createMessagesTable = `
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(64) NOT NULL,
        sender_type ENUM('user', 'bot', 'admin') NOT NULL,
        sender_name VARCHAR(100) DEFAULT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        INDEX idx_session_created (session_id, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `

    await connection.query(createSessionsTable)
    await connection.query(createMessagesTable)
    console.log('✅ Chat tables migration completed successfully!')
  } catch (error) {
    console.error('❌ Chat migration failed:', error.message)
  } finally {
    await connection.end()
  }
}

runChatMigration()
