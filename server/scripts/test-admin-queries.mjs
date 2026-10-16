import mysql from 'mysql2/promise'
import 'dotenv/config'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'tarajglobal',
})

async function testAll() {
  const tests = [
    // Analytics
    { name: 'Analytics: Blogs stats', sql: `SELECT COUNT(*) as total_blogs, SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_blogs, SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_blogs FROM blogs` },
    { name: 'Analytics: Careers stats', sql: `SELECT COUNT(*) as total_jobs, SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_jobs, SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as current_jobs FROM careers` },
    { name: 'Analytics: Job applications stats', sql: `SELECT COUNT(*) as total_applications, SUM(CASE WHEN status = 'applied' THEN 1 ELSE 0 END) as new_applications FROM job_applications` },
    { name: 'Analytics: Traffic page_views', sql: `SELECT COUNT(*) as total FROM page_views` },

    // Blogs
    { name: 'Blogs: list query with joins', sql: `SELECT b.*, c.name as category_name, a.name as author_name FROM blogs b LEFT JOIN categories c ON b.category_id = c.id LEFT JOIN authors a ON b.author_id = a.id ORDER BY b.created_at DESC LIMIT 10` },
    { name: 'Blogs: tags query', sql: `SELECT t.*, bt.blog_id FROM tags t JOIN blog_tags bt ON t.id = bt.tag_id LIMIT 10` },
    { name: 'Blogs: revisions query', sql: `SELECT * FROM blog_revisions LIMIT 5` },

    // Categories
    { name: 'Categories: list', sql: `SELECT c.*, COUNT(b.id) as blog_count FROM categories c LEFT JOIN blogs b ON c.id = b.category_id GROUP BY c.id` },

    // Tags
    { name: 'Tags: list', sql: `SELECT t.*, COUNT(bt.blog_id) as blog_count FROM tags t LEFT JOIN blog_tags bt ON t.id = bt.tag_id GROUP BY t.id` },

    // Authors
    { name: 'Authors: list', sql: `SELECT a.*, COUNT(b.id) as blog_count FROM authors a LEFT JOIN blogs b ON a.id = b.author_id GROUP BY a.id` },

    // Jobs / Careers
    { name: 'Jobs: list', sql: `SELECT c.*, COUNT(ja.id) as application_count FROM careers c LEFT JOIN job_applications ja ON c.id = ja.job_id GROUP BY c.id LIMIT 10` },

    // Applications
    { name: 'Applications: list', sql: `SELECT ja.*, c.title as job_title FROM job_applications ja LEFT JOIN careers c ON ja.job_id = c.id LIMIT 10` },

    // Users & Roles & Permissions
    { name: 'Users: list', sql: `SELECT u.id, u.name, u.email, u.role, u.status, u.created_at FROM users u LIMIT 10` },
    { name: 'Roles: list', sql: `SELECT * FROM roles LIMIT 10` },
    { name: 'Permissions: list', sql: `SELECT * FROM permissions LIMIT 10` },
    { name: 'Role Permissions: list', sql: `SELECT * FROM role_permissions LIMIT 10` },

    // Leads / Contacts
    { name: 'Leads: list', sql: `SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10` },

    // Media
    { name: 'Media: list', sql: `SELECT * FROM media ORDER BY created_at DESC LIMIT 10` },

    // Notifications
    { name: 'Notifications: list', sql: `SELECT * FROM notifications ORDER BY created_at DESC LIMIT 10` },

    // Audit Logs
    { name: 'Audit Logs: list', sql: `SELECT al.*, u.name as user_name FROM audit_logs al LEFT JOIN users u ON al.user_id = u.id ORDER BY al.created_at DESC LIMIT 10` },

    // Settings
    { name: 'Settings: list', sql: `SELECT * FROM settings LIMIT 10` },

    // SEO
    { name: 'SEO: metadata', sql: `SELECT * FROM seo_metadata LIMIT 10` },
    { name: 'SEO: redirects', sql: `SELECT * FROM seo_redirects LIMIT 10` },
    { name: 'SEO: 404 logs', sql: `SELECT * FROM seo_404_logs LIMIT 10` },
    { name: 'SEO: global settings', sql: `SELECT * FROM seo_global_settings LIMIT 10` },

    // CMS Navbar
    { name: 'CMS: navbar_items', sql: `SELECT * FROM navbar_items ORDER BY display_order ASC` },
    { name: 'CMS: clients', sql: `SELECT * FROM clients ORDER BY display_order ASC` },

    // Footer
    { name: 'Footer: settings', sql: `SELECT * FROM footer_settings LIMIT 1` },
    { name: 'Footer: sections', sql: `SELECT * FROM footer_sections ORDER BY sort_order ASC` },
    { name: 'Footer: links', sql: `SELECT * FROM footer_links ORDER BY sort_order ASC` },
    { name: 'Footer: offices', sql: `SELECT * FROM footer_offices ORDER BY sort_order ASC` },
    { name: 'Footer: contact_items', sql: `SELECT * FROM footer_contact_items ORDER BY sort_order ASC` },
    { name: 'Footer: social_links', sql: `SELECT * FROM footer_social_links ORDER BY sort_order ASC` },

    // Career Gallery
    { name: 'Gallery: events', sql: `SELECT * FROM career_events ORDER BY created_at DESC` },
    { name: 'Gallery: photos', sql: `SELECT * FROM career_event_photos ORDER BY created_at ASC` },

    // Chat
    { name: 'Chat: sessions', sql: `SELECT * FROM chat_sessions ORDER BY created_at DESC LIMIT 10` },
    { name: 'Chat: messages', sql: `SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT 10` },
  ]

  let passed = 0
  let failed = 0

  for (const t of tests) {
    try {
      await pool.query(t.sql)
      console.log(`✅ PASS: ${t.name}`)
      passed++
    } catch (err) {
      console.error(`❌ FAIL: ${t.name} -> ${err.message}`)
      failed++
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${tests.length} tests.`)
  await pool.end()
}

testAll()
