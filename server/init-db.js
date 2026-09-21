import mysql from 'mysql2/promise'
import 'dotenv/config'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

async function initDatabase() {
  try {
    console.log('=== INITIALIZING DATABASE ===')
    
    // Create database if it doesn't exist
    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'tarajglobal'}\``)
    console.log('✅ Database created or already exists')
    
    // Use the database
    await pool.query(`USE \`${process.env.DB_NAME || 'tarajglobal'}\``)
    console.log('✅ Using database')
    
    // Disable foreign key checks to allow dropping tables
    await pool.query(`SET FOREIGN_KEY_CHECKS = 0`)
    
    // Drop existing tables if they exist (to ensure clean schema)
    await pool.query(`DROP TABLE IF EXISTS blogs`)
    await pool.query(`DROP TABLE IF EXISTS authors`)
    await pool.query(`DROP TABLE IF EXISTS categories`)
    console.log('✅ Dropped existing tables')
    
    // Re-enable foreign key checks
    await pool.query(`SET FOREIGN_KEY_CHECKS = 1`)
    
    // Create categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Categories table created')
    
    // Create authors table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        profile_photo VARCHAR(500),
        designation VARCHAR(255),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Authors table created')
    
    // Create blogs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        content LONGTEXT NOT NULL,
        excerpt TEXT,
        image VARCHAR(500),
        author_id INT,
        category_id INT,
        slug VARCHAR(255) NOT NULL UNIQUE,
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `)
    console.log('✅ Blogs table created')
    
    // Insert sample data
    await pool.query(`
      INSERT IGNORE INTO categories (name, slug, description) VALUES 
      ('Lead Generation', 'lead-generation', 'Tips and strategies for effective B2B lead generation'),
      ('Digital Marketing', 'digital-marketing', 'Latest trends in digital marketing'),
      ('Sales Tips', 'sales-tips', 'Sales strategies and best practices'),
      ('Industry News', 'industry-news', 'Latest news and updates in the industry')
    `)
    console.log('✅ Sample categories inserted')
    
    await pool.query(`
      INSERT IGNORE INTO authors (name, slug, profile_photo, designation, bio) VALUES 
      ('John Smith', 'john-smith', '/images/author1.jpg', 'Marketing Director', 'Expert in B2B marketing with 10+ years of experience'),
      ('Jane Doe', 'jane-doe', '/images/author2.jpg', 'Sales Lead', 'Specialist in sales strategies and lead generation')
    `)
    console.log('✅ Sample authors inserted')
    
    await pool.query(`
      INSERT IGNORE INTO blogs (title, content, excerpt, image, author_id, category_id, slug, status) VALUES 
      ('10 Proven B2B Lead Generation Strategies', 'In this comprehensive guide, we explore the most effective B2B lead generation strategies that can help your business grow...', 'Discover the top strategies for generating high-quality B2B leads', '/images/blog1.jpg', 1, 1, '10-proven-b2b-lead-generation-strategies', 'published'),
      ('The Future of Digital Marketing in 2024', 'Digital marketing is constantly evolving. Here is what you need to know to stay ahead...', 'Stay ahead with these digital marketing trends', '/images/blog2.jpg', 2, 2, 'future-of-digital-marketing-2024', 'published'),
      ('How to Close More Deals: Sales Tips from Experts', 'Learn from industry experts about the best sales techniques...', 'Expert sales tips to boost your conversion rates', '/images/blog3.jpg', 2, 3, 'how-to-close-more-deals-sales-tips', 'published')
    `)
    console.log('✅ Sample blog posts inserted')
    
    console.log('=== DATABASE INITIALIZATION COMPLETE ===')
    console.log('You can now restart your server and the blog API should work!')
    
    await pool.end()
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

initDatabase()
