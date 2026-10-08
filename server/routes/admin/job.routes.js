import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// Helper to ensure careers table has all required columns
const ensureCareersColumns = async () => {
  try {
    const [columns] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'careers'
    `)
    const colNames = columns.map(c => c.COLUMN_NAME)

    if (!colNames.includes('slug')) {
      await db.execute('ALTER TABLE careers ADD COLUMN slug VARCHAR(255) NULL').catch(() => {})
    }
    if (!colNames.includes('department')) {
      await db.execute('ALTER TABLE careers ADD COLUMN department VARCHAR(255) NULL').catch(() => {})
    }
    if (!colNames.includes('experience')) {
      await db.execute('ALTER TABLE careers ADD COLUMN experience VARCHAR(255) NULL').catch(() => {})
    }
    if (!colNames.includes('salary')) {
      await db.execute('ALTER TABLE careers ADD COLUMN salary VARCHAR(255) NULL').catch(() => {})
    }
    if (!colNames.includes('status')) {
      await db.execute("ALTER TABLE careers ADD COLUMN status ENUM('draft', 'published', 'archived', 'active') DEFAULT 'published'").catch(() => {})
    }
  } catch (err) {
    console.warn('ensureCareersColumns error:', err.message)
  }
}

// @route   GET /api/admin/jobs
// @desc    Get all jobs
// @access  Private
router.get('/', checkPermission('job.view'), async (req, res) => {
  try {
    await ensureCareersColumns()

    const { status, search, page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit
    
    let whereClause = 'WHERE 1=1'
    const params = []
    
    if (status && status !== 'all') {
      whereClause += ' AND (j.status = ? OR (j.status = "active" AND ? = "published"))'
      params.push(status, status)
    }

    if (search && search.trim()) {
      whereClause += ' AND (j.title LIKE ? OR j.description LIKE ? OR j.requirements LIKE ? OR j.location LIKE ? OR j.type LIKE ?)'
      const searchTerm = `%${search.trim()}%`
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm)
    }
    
    const [jobs] = await db.query(`
      SELECT j.*,
        (SELECT COUNT(*) FROM job_applications ja WHERE ja.job_title = j.title OR ja.job_title = CAST(j.id AS CHAR)) as application_count
      FROM careers j
      ${whereClause}
      ORDER BY j.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), offset])
    
    const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM careers j ${whereClause}`, params)
    
    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0]?.total || 0,
          totalPages: Math.ceil((countResult[0]?.total || 0) / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get admin jobs error:', error)
    res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
})

// @route   GET /api/admin/jobs/:id
// @desc    Get job by ID
// @access  Private
router.get('/:id', checkPermission('job.view'), async (req, res) => {
  try {
    const { id } = req.params
    
    const [jobs] = await db.execute(`
      SELECT j.*
      FROM careers j
      WHERE j.id = ?
    `, [id])
    
    if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    
    res.json({ success: true, data: jobs[0] })
  } catch (error) {
    console.error('Get job by ID error:', error)
    res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
})

// @route   POST /api/admin/jobs
// @desc    Create job
// @access  Private
router.post('/', [
  checkPermission('job.create'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required')
], validate, async (req, res) => {
  try {
    const { title, description, requirements, location, type, salary, department, experience, status } = req.body
    
    await ensureCareersColumns()

    const [columns] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'careers'
    `)
    const colNames = columns.map(c => c.COLUMN_NAME)

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const insertCols = ['title', 'description']
    const insertVals = [title, description]
    const placeholders = ['?', '?']

    if (colNames.includes('slug')) {
      insertCols.push('slug')
      insertVals.push(slug)
      placeholders.push('?')
    }
    if (requirements !== undefined && colNames.includes('requirements')) {
      insertCols.push('requirements')
      insertVals.push(requirements)
      placeholders.push('?')
    }
    if (location !== undefined && colNames.includes('location')) {
      insertCols.push('location')
      insertVals.push(location)
      placeholders.push('?')
    }
    if (type !== undefined && colNames.includes('type')) {
      insertCols.push('type')
      insertVals.push(type || 'full-time')
      placeholders.push('?')
    }
    if (department !== undefined && colNames.includes('department')) {
      insertCols.push('department')
      insertVals.push(department)
      placeholders.push('?')
    }
    if (experience !== undefined && colNames.includes('experience')) {
      insertCols.push('experience')
      insertVals.push(experience)
      placeholders.push('?')
    }
    if (salary !== undefined && colNames.includes('salary')) {
      insertCols.push('salary')
      insertVals.push(salary)
      placeholders.push('?')
    }
    if (colNames.includes('status')) {
      insertCols.push('status')
      insertVals.push(status || 'published')
      placeholders.push('?')
    }

    const query = `INSERT INTO careers (${insertCols.join(', ')}) VALUES (${placeholders.join(', ')})`
    const [result] = await db.execute(query, insertVals)
    
    res.status(201).json({ 
      success: true, 
      message: 'Job position created successfully',
      data: { id: result.insertId, slug } 
    })
  } catch (error) {
    console.error('Create job error:', error)
    res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
})

// @route   PUT /api/admin/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', [
  checkPermission('job.edit'),
  body('title').optional().trim().notEmpty()
], validate, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, requirements, location, type, salary, department, experience, status } = req.body
    
    await ensureCareersColumns()

    const [columns] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'careers'
    `)
    const colNames = columns.map(c => c.COLUMN_NAME)

    const updates = []
    const values = []
    
    if (title !== undefined && colNames.includes('title')) { 
      updates.push('title = ?')
      values.push(title)
      if (colNames.includes('slug')) {
        updates.push('slug = ?')
        values.push(title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
      }
    }
    if (description !== undefined && colNames.includes('description')) { updates.push('description = ?'); values.push(description) }
    if (requirements !== undefined && colNames.includes('requirements')) { updates.push('requirements = ?'); values.push(requirements) }
    if (location !== undefined && colNames.includes('location')) { updates.push('location = ?'); values.push(location) }
    if (type !== undefined && colNames.includes('type')) { updates.push('type = ?'); values.push(type) }
    if (department !== undefined && colNames.includes('department')) { updates.push('department = ?'); values.push(department) }
    if (experience !== undefined && colNames.includes('experience')) { updates.push('experience = ?'); values.push(experience) }
    if (salary !== undefined && colNames.includes('salary')) { updates.push('salary = ?'); values.push(salary) }
    if (status !== undefined && colNames.includes('status')) { updates.push('status = ?'); values.push(status) }
    
    if (updates.length > 0) {
      values.push(id)
      await db.execute(
        `UPDATE careers SET ${updates.join(', ')} WHERE id = ?`,
        values
      )
    }
    
    res.json({ success: true, message: 'Job updated successfully' })
  } catch (error) {
    console.error('Update job error:', error)
    res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
})

// @route   DELETE /api/admin/jobs/:id
// @desc    Delete job
// @access  Private
router.delete('/:id', checkPermission('job.delete'), async (req, res) => {
  try {
    await db.execute('DELETE FROM careers WHERE id = ?', [req.params.id])
    res.json({ success: true, message: 'Job deleted successfully' })
  } catch (error) {
    console.error('Delete job error:', error)
    res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
})

// @route   PATCH /api/admin/jobs/:id/status
// @desc    Update job status
// @access  Private
router.patch('/:id/status', [
  checkPermission('job.publish'),
  body('status').notEmpty().withMessage('Status is required')
], validate, async (req, res) => {
  try {
    const { status } = req.body
    
    await ensureCareersColumns()
    await db.execute(
      'UPDATE careers SET status = ? WHERE id = ?',
      [status, req.params.id]
    )
    
    res.json({ success: true, message: 'Job status updated successfully' })
  } catch (error) {
    console.error('Update job status error:', error)
    res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
})

export default router
