import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/jobs
// @desc    Get all jobs
// @access  Private
router.get('/', checkPermission('job.create'), async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit
    
    let whereClause = 'WHERE 1=1'
    const params = []
    
    if (status && status !== 'all') {
      whereClause += ' AND j.status = ?'
      params.push(status)
    }

    if (search && search.trim()) {
      whereClause += ' AND (j.title LIKE ? OR j.description LIKE ? OR j.requirements LIKE ? OR j.location LIKE ? OR j.type LIKE ?)'
      const searchTerm = `%${search.trim()}%`
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm)
    }
    
    const [jobs] = await db.execute(`
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
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/admin/jobs/:id
// @desc    Get job by ID
// @access  Private
router.get('/:id', checkPermission('job.create'), async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message })
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
    const { title, description, requirements, location, type, salary, status } = req.body
    
    // Check if status column exists in careers table
    const [columns] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'careers' AND COLUMN_NAME = 'status'
    `)
    
    // Add status column if it doesn't exist
    if (columns.length === 0) {
      try {
        await db.execute(`ALTER TABLE careers ADD COLUMN status ENUM('draft', 'published', 'archived') DEFAULT 'draft'`)
        console.log('Added status column to careers table')
      } catch (alterError) {
        console.log('Could not add status column:', alterError.message)
      }
    } else {
      // Check if status column has old enum values and update
      try {
        const [columnInfo] = await db.execute(`
          SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'careers' AND COLUMN_NAME = 'status'
        `)
        
        if (columnInfo.length > 0 && (columnInfo[0].COLUMN_TYPE.includes('active') || columnInfo[0].COLUMN_TYPE.includes('open'))) {
          console.log('Updating status column enum to draft, published, archived')
          // Update existing rows to use new status values
          await db.execute(`
            UPDATE careers 
            SET status = CASE 
              WHEN status IN ('active', 'open') THEN 'published'
              WHEN status IN ('closed') THEN 'archived'
              ELSE status
            END
          `)
          
          // Modify the column to use new enum
          await db.execute(`
            ALTER TABLE careers 
            MODIFY COLUMN status ENUM('draft', 'published', 'archived') DEFAULT 'draft'
          `)
          console.log('Status column enum updated successfully')
        }
      } catch (alterError) {
        console.log('Could not update status column:', alterError.message)
      }
    }
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const [result] = await db.execute(
      `INSERT INTO careers (title, slug, description, requirements, location, type, salary, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, description, requirements, location, type || 'full-time', salary, status || 'draft']
    )
    
    res.status(201).json({ success: true, data: { id: result.insertId, slug } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/admin/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', [
  checkPermission('job.edit'),
  body('title').optional().trim().notEmpty(),
  body('status').optional().custom((value) => {
    if (value === undefined || value === null || value === '') return true;
    if (!['draft', 'published', 'archived'].includes(value)) {
      throw new Error('Invalid status value');
    }
    return true;
  })
], validate, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, requirements, location, type, salary, status } = req.body
    
    // Build update query dynamically
    const updates = []
    const values = []
    
    if (title !== undefined) { 
      updates.push('title = ?')
      values.push(title)
      updates.push('slug = ?')
      values.push(title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    }
    if (description !== undefined) { updates.push('description = ?'); values.push(description) }
    if (requirements !== undefined) { updates.push('requirements = ?'); values.push(requirements) }
    if (location !== undefined) { updates.push('location = ?'); values.push(location) }
    if (type !== undefined) { updates.push('type = ?'); values.push(type) }
    if (salary !== undefined) { updates.push('salary = ?'); values.push(salary) }
    
    // Always include status if provided in request
    if (status !== undefined) { 
      updates.push('status = ?'); 
      values.push(status)
    }
    
    values.push(id)
    
    await db.execute(
      `UPDATE careers SET ${updates.join(', ')} WHERE id = ?`,
      values
    )
    
    res.json({ success: true, message: 'Job updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
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
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PATCH /api/admin/jobs/:id/status
// @desc    Update job status
// @access  Private
router.patch('/:id/status', [
  checkPermission('job.publish'),
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
], validate, async (req, res) => {
  try {
    const { status } = req.body
    
    await db.execute(
      'UPDATE careers SET status = ? WHERE id = ?',
      [status, req.params.id]
    )
    
    res.json({ success: true, message: 'Job status updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
