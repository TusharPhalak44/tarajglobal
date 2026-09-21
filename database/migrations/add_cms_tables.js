/**
 * Migration: Add CMS tables for Header, Footer, and Our Clients management
 * Date: 2026-08-28
 */

export const up = async (db) => {
  // Create navbar_items table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS navbar_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      parent_id INT DEFAULT NULL,
      display_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES navbar_items(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  // Create footer_links table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS footer_links (
      id INT AUTO_INCREMENT PRIMARY KEY,
      section VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      url VARCHAR(255),
      display_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  // Create footer_social_links table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS footer_social_links (
      id INT AUTO_INCREMENT PRIMARY KEY,
      platform VARCHAR(100) NOT NULL,
      icon VARCHAR(100) NOT NULL,
      url VARCHAR(255) NOT NULL,
      display_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  // Create clients table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS clients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      logo_path VARCHAR(500) NOT NULL,
      website_url VARCHAR(500),
      display_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  // Insert default navbar items
  await db.execute(`
    INSERT INTO navbar_items (label, url, parent_id, display_order, is_active) VALUES
    ('Home', '/', NULL, 1, 1),
    ('About Us', '/about', NULL, 2, 1),
    ('Services', '/services', NULL, 3, 1),
    ('Career', '/careers', NULL, 4, 1),
    ('Blogs', '/blog', NULL, 5, 1),
    ('Contact Us', '/contact', NULL, 6, 1)
  `)

  // Insert default footer links
  await db.execute(`
    INSERT INTO footer_links (section, title, url, display_order, is_active) VALUES
    ('Useful Links', 'Home', '/', 1, 1),
    ('Useful Links', 'About Us', '/about', 2, 1),
    ('Useful Links', 'Services', '/services', 3, 1),
    ('Useful Links', 'Careers', '/careers', 4, 1),
    ('Useful Links', 'Blogs', '/blog', 5, 1),
    ('Useful Links', 'Contact Us', '/contact', 6, 1),
    ('Company', 'Privacy Policy', '/privacy', 1, 1),
    ('Company', 'Terms & Conditions', '/terms', 2, 1),
    ('Company', 'Cookies Policy', '/cookies', 3, 1)
  `)

  // Insert default social links
  await db.execute(`
    INSERT INTO footer_social_links (platform, icon, url, display_order, is_active) VALUES
    ('LinkedIn', 'bi-linkedin', 'https://www.linkedin.com/company/taraj-global/', 1, 1)
  `)

  // Insert default clients
  await db.execute(`
    INSERT INTO clients (client_name, logo_path, website_url, display_order, is_active) VALUES
    ('Mitel', '/mitel.png', NULL, 1, 1),
    ('Vonage', '/Vonage.png', NULL, 2, 1),
    ('RingCentral', '/ringcentral.png', NULL, 3, 1),
    ('AVAYA', '/Avaya.webp', NULL, 4, 1),
    ('Microsoft', '/micro.png', NULL, 5, 1),
    ('Oracle', '/ora.png', NULL, 6, 1)
  `)
}

export const down = async (db) => {
  await db.execute('DROP TABLE IF EXISTS clients')
  await db.execute('DROP TABLE IF EXISTS footer_social_links')
  await db.execute('DROP TABLE IF EXISTS footer_links')
  await db.execute('DROP TABLE IF EXISTS navbar_items')
}
