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
          SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_blogs,
          SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_blogs,
          0 as scheduled_blogs,
          0 as total_views
        FROM blogs
      `)
      if (result[0]) blogStats = result[0]
    } catch (e) { console.log('Blogs table error:', e.message) }

    // Job stats
    let jobStats = { total_jobs: 0, draft_jobs: 0, current_jobs: 0 }
    try {
      const [result] = await db.execute(`
        SELECT
          COUNT(*) as total_jobs,
          SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_jobs,
          SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as current_jobs
        FROM careers
      `)
      if (result[0]) jobStats = result[0]
    } catch (e) { 
      console.log('Careers table error:', e.message)
      // Fallback if status column doesn't exist
      const [fallback] = await db.execute(`SELECT COUNT(*) as total_jobs FROM careers`)
      jobStats = { total_jobs: fallback[0]?.total_jobs || 0, draft_jobs: 0, current_jobs: fallback[0]?.total_jobs || 0 }
    }

    // Application stats
    let applicationStats = { total_applications: 0, new_applications: 0, today_applications: 0 }
    try {
      const [result] = await db.execute(`
        SELECT
          COUNT(*) as total_applications,
          SUM(CASE WHEN status = 'applied' THEN 1 ELSE 0 END) as new_applications,
          SUM(CASE WHEN DATE(applied_at) = CURDATE() THEN 1 ELSE 0 END) as today_applications
        FROM job_applications
      `)
      if (result[0]) applicationStats = result[0]
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
      if (result[0]) contentStats = result[0]
    } catch (e) { 
      console.log('Content stats error:', e.message)
      // Fallback queries for individual tables
      try {
        const [authors] = await db.execute('SELECT COUNT(*) as count FROM authors')
        const [categories] = await db.execute('SELECT COUNT(*) as count FROM categories')
        const [media] = await db.execute('SELECT COUNT(*) as count FROM media')
        contentStats = {
          total_authors: authors[0]?.count || 0,
          total_categories: categories[0]?.count || 0,
          total_tags: 0,
          total_media: media[0]?.count || 0
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
          SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_leads,
          SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted_leads,
          SUM(CASE WHEN status = 'qualified' THEN 1 ELSE 0 END) as qualified_leads,
          SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as converted_leads
        FROM contacts
      `)
      if (result[0]) leadStats = result[0]
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
        SELECT id, title, status
        FROM blogs
        WHERE status = 'published'
        ORDER BY created_at DESC
        LIMIT 5
      `)
      popularBlogs = result.map(blog => ({ ...blog, view_count: 0 }))
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

// @route   GET /api/admin/analytics/traffic
// @desc    Get traffic analytics (SEO)
// @access  Private
router.get('/traffic', checkPermission('analytics.view'), async (req, res) => {
  try {
    const { days = 30 } = req.query

    // 1. Overview metrics
    const [overviewResult] = await db.execute(`
      SELECT 
        COUNT(*) as total_views,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    `, [parseInt(days)])
    
    // 2. Top pages
    const [topPagesResult] = await db.execute(`
      SELECT 
        page_url,
        COUNT(*) as views,
        COUNT(DISTINCT session_id) as unique_views
      FROM page_views
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 10
    `, [parseInt(days)])
    
    // 3. Traffic sources (referrers)
    const [sourcesResult] = await db.execute(`
      SELECT 
        CASE 
          WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
          WHEN referrer LIKE '%google%' THEN 'Google'
          WHEN referrer LIKE '%bing%' THEN 'Bing'
          WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
          WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' THEN 'Twitter'
          WHEN referrer LIKE '%facebook%' THEN 'Facebook'
          ELSE 'Other Referrals'
        END as source,
        COUNT(*) as views
      FROM page_views
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY source
      ORDER BY views DESC
    `, [parseInt(days)])
    
    // 4. Recent Visitors (IPs and Sessions with total hit count)
    const [recentVisitors] = await db.execute(`
      SELECT 
        pv.ip_address,
        pv.session_id,
        pv.page_url,
        pv.created_at,
        (SELECT COUNT(*) FROM page_views WHERE session_id = pv.session_id) as total_visits
      FROM page_views pv
      WHERE pv.created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      ORDER BY pv.created_at DESC
      LIMIT 10
    `, [parseInt(days)])

    res.json({
      success: true,
      data: {
        overview: overviewResult[0] || { total_views: 0, unique_visitors: 0 },
        top_pages: topPagesResult,
        traffic_sources: sourcesResult,
        recent_visitors: recentVisitors
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
