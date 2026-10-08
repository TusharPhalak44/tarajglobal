import mysql from 'mysql2/promise';
import 'dotenv/config';

const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tarajglobal',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
});

async function run() {
  try {
    // 1. Create media table
    await db.query(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_size INT NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_url VARCHAR(500) NOT NULL,
        alt_text VARCHAR(255),
        caption TEXT,
        description TEXT,
        width INT,
        height INT,
        uploaded_by INT,
        status ENUM('active', 'deleted') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_uploaded_by (uploaded_by),
        INDEX idx_mime_type (mime_type),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ media table created');

    // 2. Add missing columns to blogs
    const cols = [
      "ADD COLUMN slug VARCHAR(255) UNIQUE",
      "ADD COLUMN featured_image VARCHAR(255)",
      "ADD COLUMN author_id INT",
      "ADD COLUMN category_id INT",
      "ADD COLUMN status ENUM('draft', 'in_review', 'approved', 'scheduled', 'published', 'archived') DEFAULT 'draft'",
      "ADD COLUMN featured BOOLEAN DEFAULT FALSE",
      "ADD COLUMN reading_time INT",
      "ADD COLUMN published_at TIMESTAMP NULL",
      "ADD COLUMN scheduled_at TIMESTAMP NULL",
      "ADD COLUMN seo_title VARCHAR(255)",
      "ADD COLUMN seo_description TEXT",
      "ADD COLUMN seo_keywords TEXT",
      "ADD COLUMN canonical_url VARCHAR(500)",
      "ADD COLUMN og_image VARCHAR(255)",
      "ADD COLUMN og_title VARCHAR(255)",
      "ADD COLUMN og_description TEXT",
      "ADD COLUMN seo_score INT DEFAULT 0",
      "ADD COLUMN seo_analysis JSON",
      "ADD COLUMN created_by INT",
      "ADD COLUMN updated_by INT",
      "ADD COLUMN published_by INT",
      "ADD COLUMN view_count INT DEFAULT 0"
    ];

    for (const col of cols) {
      try {
        await db.query(`ALTER TABLE blogs ${col}`);
        console.log(`✅ ${col}`);
      } catch (e) {
        if (e.code === 'ER_DUP_FIELDNAME') {
          console.log(`⏭️ Ignored: ${col} (already exists)`);
        } else {
          console.error(`❌ Failed: ${col} - ${e.message}`);
        }
      }
    }
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await db.end();
  }
}
run();
