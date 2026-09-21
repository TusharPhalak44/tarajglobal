import express from 'express'
import { checkPermission } from '../../middleware/permission.middleware.js'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/leads
// @desc    Get all leads
// @access  Private
router.get('/', checkPermission('analytics.view'), async (req, res) => {
  try {
    const { status, assigned_to, search, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit
    
    let whereClause = 'WHERE 1=1'
    const params = []
    
    if (status) {
      whereClause += ' AND c.status = ?'
      params.push(status)
    }
    
    if (assigned_to) {
      whereClause += ' AND c.assigned_to = ?'
      params.push(assigned_to)
    }
    
    if (search) {
      whereClause += ' AND (c.name LIKE ? OR c.email LIKE ? OR c.company LIKE ?)'
      params.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }
    
    const [leads] = await db.execute(`
      SELECT c.*, u.name as assigned_to_name
      FROM contacts c
      LEFT JOIN users u ON c.assigned_to = u.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), offset])
    
    const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM contacts c ${whereClause}`, params)
    
    res.json({
      success: true,
      data: {
        leads,
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

// @route   PATCH /api/admin/leads/:id/status
// @desc    Update lead status
// @access  Private
router.patch('/:id/status', checkPermission('analytics.view'), async (req, res) => {
  try {
    const { status, assigned_to } = req.body
    
    await db.execute(
      'UPDATE contacts SET status = COALESCE(?, status), assigned_to = COALESCE(?, assigned_to) WHERE id = ?',
      [status, assigned_to, req.params.id]
    )
    
    res.json({ success: true, message: 'Lead updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
