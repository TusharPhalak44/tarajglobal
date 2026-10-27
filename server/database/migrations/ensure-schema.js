import db from '../../config/db.js'

export const ensureSchema = async () => {
  try {
    console.log('🔄 Checking and ensuring database schema integrity...')

    // 1. Create blog_revisions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS blog_revisions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_id INT NOT NULL,
        version INT NOT NULL,
        title VARCHAR(500) NOT NULL,
        content LONGTEXT,
        excerpt TEXT,
        featured_image VARCHAR(500),
        seo_title VARCHAR(500),
        seo_description TEXT,
        seo_keywords VARCHAR(500),
        canonical_url VARCHAR(500),
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        change_notes TEXT,
        INDEX idx_blog (blog_id),
        INDEX idx_version (blog_id, version),
        INDEX idx_created_by (created_by)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 2. Helper to check and add missing columns
    const addColumnIfMissing = async (table, column, definition) => {
      try {
        const [rows] = await db.execute(`
          SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = ? AND COLUMN_NAME = ?
        `, [table, column])
        if (rows.length === 0) {
          await db.execute(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`)
          console.log(`  ➕ Added column ${column} to table ${table}`)
        }
      } catch (err) {
        console.warn(`  ⚠️ Could not check/add ${column} to ${table}:`, err.message)
      }
    }

    // 3. Ensure columns on blogs
    await addColumnIfMissing('blogs', 'created_by', 'INT NULL')
    await addColumnIfMissing('blogs', 'updated_by', 'INT NULL')
    await addColumnIfMissing('blogs', 'published_at', 'TIMESTAMP NULL')
    await addColumnIfMissing('blogs', 'published_by', 'INT NULL')
    await addColumnIfMissing('blogs', 'view_count', 'INT DEFAULT 0')
    await addColumnIfMissing('blogs', 'reading_time', 'INT DEFAULT 1')
    await addColumnIfMissing('blogs', 'seo_score', 'INT DEFAULT 0')
    await addColumnIfMissing('blogs', 'seo_analysis', 'LONGTEXT')

    // 4. Ensure columns on authors
    await addColumnIfMissing('authors', 'user_id', 'INT NULL')
    await addColumnIfMissing('authors', 'status', "ENUM('active','inactive') DEFAULT 'active'")
    await addColumnIfMissing('authors', 'linkedin_url', 'VARCHAR(500) NULL')
    await addColumnIfMissing('authors', 'email', 'VARCHAR(255) NULL')
    await addColumnIfMissing('authors', 'twitter_url', 'VARCHAR(500) NULL')
    await addColumnIfMissing('authors', 'github_url', 'VARCHAR(500) NULL')

    // 5. Ensure columns on settings
    await addColumnIfMissing('settings', 'updated_by', 'INT NULL')

    // 6. Ensure columns on job_applications
    await addColumnIfMissing('job_applications', 'job_id', 'INT NULL')
    await addColumnIfMissing('job_applications', 'notes', 'TEXT NULL')
    await addColumnIfMissing('job_applications', 'cta_button', 'VARCHAR(150) NULL')
    await addColumnIfMissing('job_applications', 'cta_section', 'VARCHAR(150) NULL')
    await addColumnIfMissing('job_applications', 'source_page', 'VARCHAR(255) NULL')
    await addColumnIfMissing('job_applications', 'utm_campaign', 'VARCHAR(150) NULL')
    await addColumnIfMissing('job_applications', 'utm_source', 'VARCHAR(100) NULL')

    // 7. Ensure columns on careers
    await addColumnIfMissing('careers', 'department', 'VARCHAR(255) NULL')
    await addColumnIfMissing('careers', 'experience', 'VARCHAR(255) NULL')
    await addColumnIfMissing('careers', 'status', "VARCHAR(50) DEFAULT 'published'")

    // 7b. Ensure CTA & UTM attribution columns on contacts table
    await addColumnIfMissing('contacts', 'cta_button', 'VARCHAR(150) NULL')
    await addColumnIfMissing('contacts', 'cta_section', 'VARCHAR(150) NULL')
    await addColumnIfMissing('contacts', 'source_page', 'VARCHAR(255) NULL')
    await addColumnIfMissing('contacts', 'utm_campaign', 'VARCHAR(150) NULL')
    await addColumnIfMissing('contacts', 'utm_source', 'VARCHAR(100) NULL')
    await addColumnIfMissing('contacts', 'utm_medium', 'VARCHAR(100) NULL')
    await addColumnIfMissing('contacts', 'utm_content', 'VARCHAR(150) NULL')
    await addColumnIfMissing('contacts', 'utm_term', 'VARCHAR(150) NULL')

    // 7c. Ensure CTA attribution columns on meetings table
    await addColumnIfMissing('meetings', 'cta_button', 'VARCHAR(150) NULL')
    await addColumnIfMissing('meetings', 'cta_section', 'VARCHAR(150) NULL')
    await addColumnIfMissing('meetings', 'source_page', 'VARCHAR(255) NULL')
    await addColumnIfMissing('meetings', 'utm_campaign', 'VARCHAR(150) NULL')
    await addColumnIfMissing('meetings', 'utm_source', 'VARCHAR(100) NULL')

    // 7d. Ensure CTA attribution columns on chat_sessions table
    await addColumnIfMissing('chat_sessions', 'cta_button', 'VARCHAR(150) NULL')
    await addColumnIfMissing('chat_sessions', 'cta_section', 'VARCHAR(150) NULL')
    await addColumnIfMissing('chat_sessions', 'source_page', 'VARCHAR(255) NULL')
    await addColumnIfMissing('chat_sessions', 'utm_campaign', 'VARCHAR(150) NULL')
    await addColumnIfMissing('chat_sessions', 'utm_source', 'VARCHAR(100) NULL')

    // 8. Ensure application_notes table
    await db.query(`
      CREATE TABLE IF NOT EXISTS application_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        added_by INT NULL,
        note TEXT NOT NULL,
        note_type ENUM('internal', 'interview') DEFAULT 'internal',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_application (application_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 9. Ensure application_status_history table
    await db.query(`
      CREATE TABLE IF NOT EXISTS application_status_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        old_status VARCHAR(50),
        new_status VARCHAR(50) NOT NULL,
        changed_by INT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_app_history (application_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 10. Ensure lead_notes table
    await db.query(`
      CREATE TABLE IF NOT EXISTS lead_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        added_by INT NULL,
        note TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_lead (lead_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 11. Ensure lead_activity table
    await db.query(`
      CREATE TABLE IF NOT EXISTS lead_activity (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        action VARCHAR(50) NOT NULL,
        performed_by INT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_lead_act (lead_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 12. Ensure chat_sessions and chat_messages exist
    await db.query(`
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
    `)

    await db.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(64) NOT NULL,
        sender_type ENUM('user', 'bot', 'admin') NOT NULL,
        sender_name VARCHAR(100) DEFAULT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_session_created (session_id, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 13. Ensure page_views table
    await db.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_url VARCHAR(500) NOT NULL,
        referrer VARCHAR(500) NULL,
        user_agent TEXT NULL,
        session_id VARCHAR(100) NULL,
        ip_address VARCHAR(45) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_page_url (page_url(255)),
        INDEX idx_session (session_id),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 14. Ensure cookie_consents table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cookie_consents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(100) UNIQUE,
        ip_address VARCHAR(45) NULL,
        necessary TINYINT(1) DEFAULT 1,
        analytics TINYINT(1) DEFAULT 0,
        functional TINYINT(1) DEFAULT 0,
        marketing TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_session_consent (session_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 15. Ensure cta_clicks table for UTM attribution
    await db.query(`
      CREATE TABLE IF NOT EXISTS cta_clicks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_url VARCHAR(255) NOT NULL,
        page_title VARCHAR(255) NULL,
        section_id VARCHAR(100) NULL,
        section_name VARCHAR(150) NULL,
        cta_text VARCHAR(150) NULL,
        destination_url VARCHAR(500) NULL,
        utm_source VARCHAR(100) NULL,
        utm_medium VARCHAR(100) NULL,
        utm_campaign VARCHAR(150) NULL,
        utm_term VARCHAR(150) NULL,
        utm_content VARCHAR(150) NULL,
        session_id VARCHAR(100) NULL,
        ip_address VARCHAR(45) NULL,
        user_agent TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_cta_page (page_url),
        INDEX idx_cta_section (section_id),
        INDEX idx_cta_created (created_at),
        INDEX idx_cta_utm_campaign (utm_campaign),
        INDEX idx_cta_utm_source (utm_source)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    console.log('✅ Database schema integrity verification completed successfully!')
  } catch (error) {
    console.error('❌ Schema integrity check failed:', error.message)
    throw error
  }
}

export default ensureSchema
