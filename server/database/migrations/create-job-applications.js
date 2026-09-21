import db from '../../config/db.js'

export async function up() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        job_title VARCHAR(255) NOT NULL,
        resume_path VARCHAR(500) NOT NULL,
        status ENUM('applied', 'screening', 'shortlisted', 'interview', 'selected', 'rejected') DEFAULT 'applied',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_email (email),
        INDEX idx_applied_at (applied_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    console.log('✅ job_applications table created successfully')
  } catch (error) {
    console.error('❌ Error creating job_applications table:', error)
    throw error
  }
}

export async function down() {
  try {
    await db.execute('DROP TABLE IF EXISTS job_applications')
    console.log('✅ job_applications table dropped successfully')
  } catch (error) {
    console.error('❌ Error dropping job_applications table:', error)
    throw error
  }
}
