import db from '../../config/db.js'

const runChatMigration = async () => {
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

    await db.query(createSessionsTable)
    await db.query(createMessagesTable)
    console.log('✅ Chat tables migration completed successfully!')
  } catch (error) {
    console.error('❌ Chat migration failed:', error.message)
    throw error
  }
}

export default runChatMigration

// Run immediately if executed directly
if (process.argv[1]?.endsWith('run-chat.js')) {
  runChatMigration()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
