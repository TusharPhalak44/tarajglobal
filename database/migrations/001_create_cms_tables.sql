-- CMS Database Schema Migration
-- Version: 001
-- Description: Create tables for CMS functionality including roles, permissions, blog workflow, media library, job applications, leads, notifications, and audit logs

USE tarajglobal;

-- ============================================
-- ROLES & PERMISSIONS
-- ============================================

-- Update users table to support new roles
ALTER TABLE users 
MODIFY COLUMN role ENUM('super_admin', 'admin', 'editor', 'hr_recruiter', 'content_manager', 'user') DEFAULT 'user',
ADD COLUMN status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
ADD COLUMN last_login_at TIMESTAMP NULL,
ADD COLUMN last_login_ip VARCHAR(45) NULL,
ADD COLUMN failed_login_attempts INT DEFAULT 0,
ADD COLUMN locked_until TIMESTAMP NULL;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default roles
INSERT INTO roles (name, display_name, description) VALUES
('super_admin', 'Super Admin', 'Full access to all system features'),
('admin', 'Admin', 'Manage content, jobs, users, media, analytics'),
('editor', 'Editor', 'Create/edit/publish blogs'),
('hr_recruiter', 'HR/Recruiter', 'Manage jobs and applications'),
('content_manager', 'Content Manager', 'Manage blogs, categories, tags, authors and media')
ON DUPLICATE KEY UPDATE name=name;

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(150) NOT NULL,
  module VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default permissions
INSERT INTO permissions (name, display_name, module, description) VALUES
-- Blog permissions
('blog.create', 'Create Blogs', 'blog', 'Create new blog posts'),
('blog.edit', 'Edit Blogs', 'blog', 'Edit existing blog posts'),
('blog.delete', 'Delete Blogs', 'blog', 'Delete blog posts'),
('blog.publish', 'Publish Blogs', 'blog', 'Publish blog posts'),
('blog.approve', 'Approve Blogs', 'blog', 'Approve blog posts for publishing'),
('blog.archive', 'Archive Blogs', 'blog', 'Archive blog posts'),
-- Job permissions
('job.create', 'Create Jobs', 'job', 'Create new job postings'),
('job.edit', 'Edit Jobs', 'job', 'Edit existing job postings'),
('job.delete', 'Delete Jobs', 'job', 'Delete job postings'),
('job.publish', 'Publish Jobs', 'job', 'Publish job postings'),
('job.close', 'Close Jobs', 'job', 'Close job postings'),
('job.manage_applications', 'Manage Applications', 'job', 'View and manage job applications'),
-- User permissions
('user.create', 'Create Users', 'user', 'Create new admin users'),
('user.edit', 'Edit Users', 'user', 'Edit existing users'),
('user.delete', 'Delete Users', 'user', 'Delete users'),
('user.assign_roles', 'Assign Roles', 'user', 'Assign roles to users'),
-- Media permissions
('media.upload', 'Upload Media', 'media', 'Upload media files'),
('media.delete', 'Delete Media', 'media', 'Delete media files'),
-- Analytics permissions
('analytics.view', 'View Analytics', 'analytics', 'View analytics and reports'),
-- Settings permissions
('settings.manage', 'Manage Settings', 'settings', 'Manage system settings')
ON DUPLICATE KEY UPDATE name=name;

-- Create role_permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_role_permission (role_id, permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assign permissions to roles
-- Super Admin gets all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'super_admin';

-- Admin permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'admin' AND p.module IN ('blog', 'job', 'user', 'media', 'analytics', 'settings');

-- Editor permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'editor' AND p.name IN ('blog.create', 'blog.edit', 'blog.publish');

-- HR/Recruiter permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'hr_recruiter' AND p.module IN ('job');

-- Content Manager permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'content_manager' AND p.module IN ('blog', 'media');

-- ============================================
-- BLOG CMS
-- ============================================

-- Update blogs table for CMS functionality
ALTER TABLE blogs
ADD COLUMN slug VARCHAR(255) UNIQUE,
ADD COLUMN excerpt TEXT,
ADD COLUMN featured_image VARCHAR(255),
ADD COLUMN author_id INT,
ADD COLUMN category_id INT,
ADD COLUMN status ENUM('draft', 'in_review', 'approved', 'scheduled', 'published', 'archived') DEFAULT 'draft',
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN reading_time INT,
ADD COLUMN published_at TIMESTAMP NULL,
ADD COLUMN scheduled_at TIMESTAMP NULL,
ADD COLUMN seo_title VARCHAR(255),
ADD COLUMN seo_description TEXT,
ADD COLUMN seo_keywords TEXT,
ADD COLUMN canonical_url VARCHAR(500),
ADD COLUMN og_image VARCHAR(255),
ADD COLUMN og_title VARCHAR(255),
ADD COLUMN og_description TEXT,
ADD COLUMN seo_score INT DEFAULT 0,
ADD COLUMN seo_analysis JSON,
ADD COLUMN created_by INT,
ADD COLUMN updated_by INT,
ADD COLUMN published_by INT,
ADD COLUMN view_count INT DEFAULT 0,
ADD INDEX idx_status (status),
ADD INDEX idx_category (category_id),
ADD INDEX idx_author (author_id),
ADD INDEX idx_published_at (published_at);

-- Create blog_revisions table
CREATE TABLE IF NOT EXISTS blog_revisions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blog_id INT NOT NULL,
  version INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image VARCHAR(255),
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  canonical_url VARCHAR(500),
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  change_notes TEXT,
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_blog (blog_id),
  INDEX idx_version (blog_id, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(255),
  seo_title VARCHAR(255),
  seo_description TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  post_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  post_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create blog_tags junction table
CREATE TABLE IF NOT EXISTS blog_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blog_id INT NOT NULL,
  tag_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE KEY unique_blog_tag (blog_id, tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE,
  profile_photo VARCHAR(255),
  designation VARCHAR(100),
  bio TEXT,
  linkedin_url VARCHAR(255),
  email VARCHAR(255),
  twitter_url VARCHAR(255),
  github_url VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- MEDIA LIBRARY
-- ============================================

-- Create media table
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
  uploaded_by INT NOT NULL,
  status ENUM('active', 'deleted') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_uploaded_by (uploaded_by),
  INDEX idx_mime_type (mime_type),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- JOB MANAGEMENT
-- ============================================

-- Update careers table for CMS functionality
ALTER TABLE careers
ADD COLUMN slug VARCHAR(255) UNIQUE,
ADD COLUMN department VARCHAR(100),
ADD COLUMN experience_level VARCHAR(50),
ADD COLUMN salary_range VARCHAR(100),
ADD COLUMN responsibilities TEXT,
ADD COLUMN requirements TEXT,
ADD COLUMN preferred_qualifications TEXT,
ADD COLUMN skills TEXT,
ADD COLUMN benefits TEXT,
ADD COLUMN application_deadline DATE,
ADD COLUMN number_of_openings INT DEFAULT 1,
ADD COLUMN status ENUM('draft', 'active', 'closed', 'archived') DEFAULT 'draft',
ADD COLUMN featured BOOLEAN DEFAULT FALSE,
ADD COLUMN seo_title VARCHAR(255),
ADD COLUMN seo_description TEXT,
ADD COLUMN created_by INT,
ADD COLUMN updated_by INT,
ADD COLUMN published_at TIMESTAMP NULL,
ADD COLUMN view_count INT DEFAULT 0,
ADD INDEX idx_status (status),
ADD INDEX idx_department (department),
ADD INDEX idx_published_at (published_at);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  resume_path VARCHAR(500),
  cover_letter TEXT,
  linkedin_url VARCHAR(255),
  portfolio_url VARCHAR(255),
  experience_years INT,
  expected_salary VARCHAR(100),
  status ENUM('applied', 'screening', 'shortlisted', 'interview', 'selected', 'rejected') DEFAULT 'applied',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES careers(id) ON DELETE CASCADE,
  INDEX idx_job (job_id),
  INDEX idx_status (status),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create application_notes table
CREATE TABLE IF NOT EXISTS application_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id INT NOT NULL,
  added_by INT NOT NULL,
  note TEXT NOT NULL,
  note_type ENUM('internal', 'interview') DEFAULT 'internal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE,
  FOREIGN KEY (added_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_application (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create application_status_history table
CREATE TABLE IF NOT EXISTS application_status_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id INT NOT NULL,
  old_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  changed_by INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_application (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- LEAD MANAGEMENT
-- ============================================

-- Update contacts table for lead management
ALTER TABLE contacts
ADD COLUMN company VARCHAR(255),
ADD COLUMN source VARCHAR(100),
ADD COLUMN status ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
ADD COLUMN assigned_to INT,
ADD COLUMN notes TEXT,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
ADD INDEX idx_status (status),
ADD INDEX idx_assigned_to (assigned_to),
ADD FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;

-- Create lead_notes table
CREATE TABLE IF NOT EXISTS lead_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT NOT NULL,
  added_by INT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (added_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_lead (lead_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create lead_activity table
CREATE TABLE IF NOT EXISTS lead_activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT NOT NULL,
  action VARCHAR(50) NOT NULL,
  performed_by INT NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_lead (lead_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- NOTIFICATIONS
-- ============================================

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_read (is_read),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- AUDIT LOGS
-- ============================================

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(50) NOT NULL,
  module VARCHAR(50) NOT NULL,
  record_id INT,
  record_type VARCHAR(50),
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_action (action),
  INDEX idx_module (module),
  INDEX idx_record (record_type, record_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SEO METADATA
-- ============================================

-- Create seo_metadata table
CREATE TABLE IF NOT EXISTS seo_metadata (
  id INT AUTO_INCREMENT PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url VARCHAR(500),
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(255),
  twitter_title VARCHAR(255),
  twitter_description TEXT,
  twitter_image VARCHAR(255),
  robots VARCHAR(255),
  structured_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_entity (entity_type, entity_id),
  INDEX idx_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ADDITIONAL SETTINGS
-- ============================================

-- Update settings table
ALTER TABLE settings
ADD COLUMN updated_by INT,
ADD FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

-- Insert default CMS settings
INSERT INTO settings (key_name, value) VALUES
('cms_blog_auto_publish', 'false'),
('cms_blog_require_approval', 'true'),
('cms_job_auto_publish', 'false'),
('cms_max_upload_size', '10485760'),
('cms_allowed_image_types', 'jpg,jpeg,png,webp,svg'),
('cms_allowed_document_types', 'pdf,doc,docx'),
('cms_site_name', 'Taraj Global'),
('cms_site_description', 'Transforming businesses through innovation'),
('cms_contact_email', 'info@tarajglobal.com'),
('cms_contact_phone', '+91 96655-99442'),
('cms_social_linkedin', ''),
('cms_social_twitter', ''),
('cms_social_facebook', '')
ON DUPLICATE KEY UPDATE key_name=key_name;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Blog indexes
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status_published ON blogs(status, published_at);

-- Job indexes
CREATE INDEX idx_careers_slug ON careers(slug);
CREATE INDEX idx_careers_status_active ON careers(status);

-- Media indexes
CREATE INDEX idx_media_filename ON media(filename);
CREATE INDEX idx_media_created ON media(created_at);

-- Notification indexes
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- Audit log indexes
CREATE INDEX idx_audit_logs_user_created ON audit_logs(user_id, created_at);

-- ============================================
-- WEBSITE CONTENT MANAGEMENT (HEADER/FOOTER/CLIENTS)
-- ============================================

-- Create navbar_items table
CREATE TABLE IF NOT EXISTS navbar_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section ENUM('header', 'navbar') DEFAULT 'navbar',
  label VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  parent_id INT DEFAULT NULL,
  display_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES navbar_items(id) ON DELETE CASCADE,
  INDEX idx_section (section),
  INDEX idx_display_order (display_order),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default navbar items
INSERT INTO navbar_items (section, label, url, parent_id, display_order, is_active) VALUES
('navbar', 'Home', '/', NULL, 1, 1),
('navbar', 'About Us', '/about', NULL, 2, 1),
('navbar', 'Services', '/services', NULL, 3, 1),
('navbar', 'Career', '/careers', NULL, 4, 1),
('navbar', 'Blogs', '/blog', NULL, 5, 1),
('navbar', 'Contact Us', '/contact', NULL, 6, 1)
ON DUPLICATE KEY UPDATE label=label;

-- Create footer_links table
CREATE TABLE IF NOT EXISTS footer_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_section (section),
  INDEX idx_display_order (display_order),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default footer links
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
ON DUPLICATE KEY UPDATE title=title;

-- Create footer_social_links table
CREATE TABLE IF NOT EXISTS footer_social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  icon VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_display_order (display_order),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default social links
INSERT INTO footer_social_links (platform, icon, url, display_order, is_active) VALUES
('LinkedIn', 'bi-linkedin', 'https://www.linkedin.com/company/taraj-global/', 1, 1)
ON DUPLICATE KEY UPDATE platform=platform;

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  logo_path VARCHAR(500) NOT NULL,
  website_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_display_order (display_order),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default clients
INSERT INTO clients (client_name, logo_path, website_url, display_order, is_active) VALUES
('Mitel', '/mitel.png', NULL, 1, 1),
('Vonage', '/Vonage.png', NULL, 2, 1),
('RingCentral', '/ringcentral.png', NULL, 3, 1),
('AVAYA', '/Avaya.webp', NULL, 4, 1),
('Microsoft', '/micro.png', NULL, 5, 1),
('Oracle', '/ora.png', NULL, 6, 1)
ON DUPLICATE KEY UPDATE client_name=client_name;

-- Add CMS permissions
INSERT INTO permissions (name, display_name, module, description) VALUES
('cms.edit', 'Edit Website Content', 'cms', 'Edit header, footer, and client content'),
('cms.delete', 'Delete Website Content', 'cms', 'Delete header, footer, and client content')
ON DUPLICATE KEY UPDATE name=name;

-- Assign CMS permissions to admin roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name IN ('super_admin', 'admin') AND p.module = 'cms'
ON DUPLICATE KEY UPDATE role_id=role_id;
