import express from 'express'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Private
router.get('/dashboard', checkPermission('analytics.view'), async (req, res) => {
  try {
    // Blog stats
    let blogStats = { total_blogs: 0, published_blogs: 0, draft_blogs: 0, scheduled_blogs: 0, total_views: 0 }
    try {
      const [result] = await db.execute(`
        SELECT
          COUNT(*) as total_blogs,
          COALESCE(SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END), 0) as published_blogs,
          COALESCE(SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END), 0) as draft_blogs,
          COALESCE(SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END), 0) as scheduled_blogs,
          COALESCE(SUM(views), 0) as total_views
        FROM blogs
      `)
      if (result[0]) {
        blogStats = {
          total_blogs: Number(result[0].total_blogs || 0),
          published_blogs: Number(result[0].published_blogs || 0),
          draft_blogs: Number(result[0].draft_blogs || 0),
          scheduled_blogs: Number(result[0].scheduled_blogs || 0),
          total_views: Number(result[0].total_views || 0)
        }
      }
    } catch (e) { console.log('Blogs table error:', e.message) }

    // Job stats
    let jobStats = { total_jobs: 0, draft_jobs: 0, current_jobs: 0, active_jobs: 0, published_jobs: 0, archived_jobs: 0 }
    try {
      const [result] = await db.execute(`
        SELECT
          COUNT(*) as total_jobs,
          COALESCE(SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END), 0) as draft_jobs,
          COALESCE(SUM(CASE WHEN status IN ('published', 'active') THEN 1 ELSE 0 END), 0) as active_jobs,
          COALESCE(SUM(CASE WHEN status IN ('published', 'active') THEN 1 ELSE 0 END), 0) as current_jobs,
          COALESCE(SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END), 0) as published_jobs,
          COALESCE(SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END), 0) as archived_jobs
        FROM careers
      `)
      if (result[0]) {
        jobStats = {
          total_jobs: Number(result[0].total_jobs || 0),
          draft_jobs: Number(result[0].draft_jobs || 0),
          active_jobs: Number(result[0].active_jobs || 0),
          current_jobs: Number(result[0].current_jobs || 0),
          published_jobs: Number(result[0].published_jobs || 0),
          archived_jobs: Number(result[0].archived_jobs || 0)
        }
      }
    } catch (e) { 
      console.log('Careers table error:', e.message)
      // Fallback if status column doesn't exist
      const [fallback] = await db.execute(`SELECT COUNT(*) as total_jobs FROM careers`)
      const count = Number(fallback[0]?.total_jobs || 0)
      jobStats = { total_jobs: count, draft_jobs: 0, current_jobs: count, active_jobs: count, published_jobs: count, archived_jobs: 0 }
    }

    // Application stats
    let applicationStats = { total_applications: 0, new_applications: 0, today_applications: 0 }
    try {
      const [result] = await db.execute(`
        SELECT
          COUNT(*) as total_applications,
          COALESCE(SUM(CASE WHEN status = 'applied' THEN 1 ELSE 0 END), 0) as new_applications,
          COALESCE(SUM(CASE WHEN DATE(applied_at) = CURDATE() THEN 1 ELSE 0 END), 0) as today_applications
        FROM job_applications
      `)
      if (result[0]) {
        applicationStats = {
          total_applications: Number(result[0].total_applications || 0),
          new_applications: Number(result[0].new_applications || 0),
          today_applications: Number(result[0].today_applications || 0)
        }
      }
    } catch (e) { console.log('Job applications table error:', e.message) }

    // Content stats
    let contentStats = { total_authors: 0, total_categories: 0, total_tags: 0, total_media: 0 }
    try {
      const [result] = await db.execute(`
        SELECT
          (SELECT COUNT(*) FROM authors) as total_authors,
          (SELECT COUNT(*) FROM categories) as total_categories,
          (SELECT COUNT(*) FROM tags) as total_tags,
          (SELECT COUNT(*) FROM media) as total_media
      `)
      if (result[0]) {
        contentStats = {
          total_authors: Number(result[0].total_authors || 0),
          total_categories: Number(result[0].total_categories || 0),
          total_tags: Number(result[0].total_tags || 0),
          total_media: Number(result[0].total_media || 0)
        }
      }
    } catch (e) { 
      console.log('Content stats error:', e.message)
      // Fallback queries for individual tables
      try {
        const [authors] = await db.execute('SELECT COUNT(*) as count FROM authors')
        const [categories] = await db.execute('SELECT COUNT(*) as count FROM categories')
        const [media] = await db.execute('SELECT COUNT(*) as count FROM media')
        contentStats = {
          total_authors: Number(authors[0]?.count || 0),
          total_categories: Number(categories[0]?.count || 0),
          total_tags: 0,
          total_media: Number(media[0]?.count || 0)
        }
      } catch (fallbackError) {
        console.log('Content stats fallback error:', fallbackError.message)
      }
    }

    // Lead stats
    let leadStats = { total_leads: 0, new_leads: 0, contacted_leads: 0, qualified_leads: 0, converted_leads: 0 }
    try {
      const [result] = await db.execute(`
        SELECT
          COUNT(*) as total_leads,
          COALESCE(SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END), 0) as new_leads,
          COALESCE(SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END), 0) as contacted_leads,
          COALESCE(SUM(CASE WHEN status = 'qualified' THEN 1 ELSE 0 END), 0) as qualified_leads,
          COALESCE(SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END), 0) as converted_leads
        FROM contacts
      `)
      if (result[0]) {
        leadStats = {
          total_leads: Number(result[0].total_leads || 0),
          new_leads: Number(result[0].new_leads || 0),
          contacted_leads: Number(result[0].contacted_leads || 0),
          qualified_leads: Number(result[0].qualified_leads || 0),
          converted_leads: Number(result[0].converted_leads || 0)
        }
      }
    } catch (e) { console.log('Contacts table error:', e.message) }

    // Recent activity
    let recentActivity = []
    try {
      const [result] = await db.execute(`
        SELECT al.*, u.name as user_name
        FROM audit_logs al
        LEFT JOIN users u ON al.user_id = u.id
        ORDER BY al.created_at DESC
        LIMIT 10
      `)
      recentActivity = result
    } catch (e) { console.log('Audit logs table error:', e.message) }

    // Popular blogs
    let popularBlogs = []
    try {
      const [result] = await db.execute(`
        SELECT id, title, status, COALESCE(views, 0) as view_count
        FROM blogs
        WHERE status = 'published'
        ORDER BY views DESC, created_at DESC
        LIMIT 5
      `)
      popularBlogs = result.map(blog => ({
        ...blog,
        view_count: Number(blog.view_count || 0)
      }))
    } catch (e) { console.log('Popular blogs error:', e.message) }

    // Popular categories
    let popularCategories = []
    try {
      const [result] = await db.execute(`
        SELECT id, name, 0 as post_count
        FROM categories
        ORDER BY name ASC
        LIMIT 5
      `)
      popularCategories = result
    } catch (e) { console.log('Popular categories error:', e.message) }

    // Blog trends (last 30 days)
    let blogTrend = []
    try {
      const [result] = await db.execute(`
        SELECT
          DATE(created_at) as date,
          COUNT(*) as count
        FROM blogs
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `)
      blogTrend = result
    } catch (e) { console.log('Blog trends error:', e.message) }

    // Application trends (last 30 days)
    let applicationTrend = []
    try {
      const [result] = await db.execute(`
        SELECT
          DATE(applied_at) as date,
          COUNT(*) as count
        FROM job_applications
        WHERE applied_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY DATE(applied_at)
        ORDER BY date ASC
      `)
      applicationTrend = result
    } catch (e) { console.log('Application trends error:', e.message) }

    res.json({
      success: true,
      data: {
        blogs: blogStats,
        jobs: jobStats,
        applications: applicationStats,
        content: contentStats,
        leads: leadStats,
        recent_activity: recentActivity,
        popular_blogs: popularBlogs,
        popular_categories: popularCategories,
        blog_trend: blogTrend,
        application_trend: applicationTrend
      }
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/admin/analytics/blog-trends
// @desc    Get blog publishing trends
// @access  Private
router.get('/blog-trends', checkPermission('analytics.view'), async (req, res) => {
  try {
    const { days = 30 } = req.query
    
    const [trends] = await db.execute(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM blogs
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `, [parseInt(days)])
    
    res.json({ success: true, data: trends })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/admin/analytics/application-trends
// @desc    Get job application trends
// @access  Private
router.get('/application-trends', checkPermission('analytics.view'), async (req, res) => {
  try {
    const { days = 30 } = req.query
    
    const [trends] = await db.execute(`
      SELECT 
        DATE(applied_at) as date,
        COUNT(*) as count
      FROM job_applications
      WHERE applied_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY DATE(applied_at)
      ORDER BY date ASC
    `, [parseInt(days)])
    
    res.json({ success: true, data: trends })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
