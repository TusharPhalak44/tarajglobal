-- ============================================
-- FOOTER MANAGEMENT SYSTEM MIGRATION
-- ============================================

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS footer_contact_items;
DROP TABLE IF EXISTS footer_offices;
DROP TABLE IF EXISTS footer_links;
DROP TABLE IF EXISTS footer_sections;
DROP TABLE IF EXISTS footer_settings;
DROP TABLE IF EXISTS footer_social_links;

-- ============================================
-- 1. FOOTER SETTINGS TABLE
-- Stores company information, logo, description
-- ============================================
CREATE TABLE footer_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL DEFAULT 'TaRaj Global',
  company_description TEXT,
  short_description VARCHAR(500),
  logo_url VARCHAR(500),
  is_logo_visible TINYINT(1) DEFAULT 1,
  is_description_visible TINYINT(1) DEFAULT 1,
  copyright_text VARCHAR(500) DEFAULT 'Copyright © {year} Taraj Global. All Rights Reserved.',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default settings
INSERT INTO footer_settings (company_name, company_description, short_description, logo_url) VALUES
('TaRaj Global', 
 'TaRaj Global is an ISO 9001:2015 (Quality) and ISO 27001:2022 (Data Security) certified B2B demand generation and technology marketing agency delivering performance-driven solutions.',
 'ISO certified B2B demand generation and technology marketing agency.',
 '/logo img.png');

-- ============================================
-- 2. FOOTER SECTIONS TABLE
-- Manages footer sections (columns)
-- ============================================
CREATE TABLE footer_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  section_type ENUM('links', 'contact', 'offices', 'custom') NOT NULL DEFAULT 'links',
  is_visible TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sort_order (sort_order),
  INDEX idx_is_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default sections
INSERT INTO footer_sections (title, section_type, is_visible, sort_order) VALUES
('Useful Links', 'links', 1, 1),
('Company', 'links', 1, 2),
('Contact Us', 'contact', 1, 3);

-- ============================================
-- 3. FOOTER LINKS TABLE
-- Manages links within footer sections
-- ============================================
CREATE TABLE footer_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_id INT NOT NULL,
  label VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  link_type ENUM('internal', 'external', 'custom_action') NOT NULL DEFAULT 'internal',
  target ENUM('_self', '_blank') DEFAULT '_self',
  custom_action VARCHAR(100),
  is_visible TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES footer_sections(id) ON DELETE CASCADE,
  INDEX idx_section_id (section_id),
  INDEX idx_sort_order (sort_order),
  INDEX idx_is_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default links for Useful Links section
INSERT INTO footer_links (section_id, label, url, link_type, target, is_visible, sort_order) VALUES
(1, 'Home', '/', 'internal', '_self', 1, 1),
(1, 'About Us', '/about', 'internal', '_self', 1, 2),
(1, 'Services', '/services', 'internal', '_self', 1, 3),
(1, 'Careers', '/careers', 'internal', '_self', 1, 4),
(1, 'Blogs', '/blog', 'internal', '_self', 1, 5),
(1, 'Contact Us', '/contact', 'internal', '_self', 1, 6);

-- Insert default links for Company section
INSERT INTO footer_links (section_id, label, url, link_type, target, is_visible, sort_order) VALUES
(2, 'Privacy Policy', '/privacy', 'internal', '_self', 1, 1),
(2, 'Terms & Conditions', '/terms', 'internal', '_self', 1, 2),
(2, 'Cookies Policy', '/cookies', 'internal', '_self', 1, 3),
(2, 'Cookie Settings', '', 'custom_action', '_self', 1, 4);

-- ============================================
-- 4. FOOTER OFFICES TABLE
-- Manages multiple office locations
-- ============================================
CREATE TABLE footer_offices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  map_url VARCHAR(500),
  phone VARCHAR(50),
  email VARCHAR(255),
  icon VARCHAR(100) DEFAULT 'MapPin',
  is_visible TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sort_order (sort_order),
  INDEX idx_is_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default offices
INSERT INTO footer_offices (name, address_line_1, address_line_2, city, state, country, postal_code, map_url, phone, icon, is_visible, sort_order) VALUES
('India Office',
 'The Space Business Complex',
 'Office No. 512 to 517, Grant Rd, Kharadi',
 'Pune',
 'Maharashtra',
 'India',
 '411014',
 'https://www.google.com/maps/dir/?api=1&destination=The+Space+Business+Complex,+Office+No+512+to+517,+Grant+Rd,+Kharadi,+Pune,+Maharashtra+411014',
 '+91 96655-99442',
 'MapPin',
 1, 1),
('USA Office',
 '762, Fulton St',
 '',
 'San Francisco',
 'California',
 'USA',
 '94115',
 'https://www.google.com/maps/dir/?api=1&destination=762,+Fulton+St,+San+Francisco,+California+94115',
 '+1 346-487-8307',
 'Building2',
 1, 2);

-- ============================================
-- 5. FOOTER CONTACT ITEMS TABLE
-- Manages individual contact information items
-- ============================================
CREATE TABLE footer_contact_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('address', 'phone', 'email', 'whatsapp', 'custom') NOT NULL DEFAULT 'custom',
  label VARCHAR(255),
  value VARCHAR(500),
  action_url VARCHAR(500),
  icon VARCHAR(100) DEFAULT 'Mail',
  is_visible TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_sort_order (sort_order),
  INDEX idx_is_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default contact items
INSERT INTO footer_contact_items (type, label, value, action_url, icon, is_visible, sort_order) VALUES
('email', 'Email', 'info@tarajglobal.com', 'mailto:info@tarajglobal.com', 'Mail', 1, 1);

-- ============================================
-- 6. FOOTER SOCIAL LINKS TABLE (Updated)
-- Manages social media links
-- ============================================
CREATE TABLE footer_social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  icon VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  is_visible TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sort_order (sort_order),
  INDEX idx_is_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default social links
INSERT INTO footer_social_links (platform, icon, url, is_visible, sort_order) VALUES
('LinkedIn', 'bi-linkedin', 'https://www.linkedin.com/company/taraj-global/', 1, 1),
('Twitter', 'bi-twitter-x', 'https://twitter.com/tarajglobal', 0, 2),
('Facebook', 'bi-facebook', 'https://facebook.com/tarajglobal', 0, 3),
('Instagram', 'bi-instagram', 'https://instagram.com/tarajglobal', 0, 4);
