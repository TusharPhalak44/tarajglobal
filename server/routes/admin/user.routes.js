import express from 'express'
import { body } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission } from '../../middleware/permission.middleware.js'
import bcrypt from 'bcrypt'
import db from '../../config/db.js'

const router = express.Router()

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { role, status, search, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit
    
    let whereClause = 'WHERE 1=1'
    const params = []
    
    if (role) {
      whereClause += ' AND role = ?'
      params.push(role)
    }
    
    if (status) {
      whereClause += ' AND status = ?'
      params.push(status)
    }
    
    if (search) {
      whereClause += ' AND (name LIKE ? OR email LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    
    const [users] = await db.execute(`
      SELECT id, name, email, role, status, last_login_at, created_at
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), offset])
    
    const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM users ${whereClause}`, params)
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/admin/users
// @desc    Create user
// @access  Private
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['super_admin', 'admin', 'editor', 'hr_recruiter', 'content_manager', 'user']).withMessage('Invalid role'),
  body('status').optional().isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
], validate, async (req, res) => {
  try {
    const { name, email, password, role = 'user', status = 'active' } = req.body
    
    // Check if user exists
    const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'A user with this email address already exists' })
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create user
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, status]
    )
    
    res.status(201).json({ success: true, message: 'User created successfully', data: { id: result.insertId } })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['super_admin', 'admin', 'editor', 'hr_recruiter', 'content_manager', 'user']).withMessage('Invalid role'),
  body('status').optional().isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
], validate, async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, role, status } = req.body
    
    // Check if user exists
    const [userCheck] = await db.execute('SELECT id, role FROM users WHERE id = ?', [id])
    if (userCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Check duplicate email
    if (email) {
      const [duplicate] = await db.execute('SELECT id FROM users WHERE email = ? AND id != ?', [email, id])
      if (duplicate.length > 0) {
        return res.status(400).json({ success: false, message: 'A user with this email address already exists' })
      }
    }
    
    const updates = []
    const values = []

    if (name !== undefined) { updates.push('name = ?'); values.push(name) }
    if (email !== undefined) { updates.push('email = ?'); values.push(email) }
    if (role !== undefined) { updates.push('role = ?'); values.push(role) }
    if (status !== undefined) { updates.push('status = ?'); values.push(status) }

    if (updates.length > 0) {
      values.push(id)
      await db.execute(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values)
    }
    
    res.json({ success: true, message: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const targetId = parseInt(req.params.id)
    
    // Prevent self-deletion
    if (targetId === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' })
    }
    
    // Check if user exists
    const [existing] = await db.execute('SELECT id, role, name FROM users WHERE id = ?', [targetId])
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    
    // Protect last super_admin from deletion
    if (existing[0].role === 'super_admin') {
      const [superAdminCount] = await db.execute("SELECT COUNT(*) as count FROM users WHERE role = 'super_admin'")
      if (superAdminCount[0].count <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot delete the last super admin' })
      }
    }

    // Clean up dependent child records to prevent foreign key violations
    try {
      await db.execute('UPDATE media SET uploaded_by = NULL WHERE uploaded_by = ?', [targetId])
    } catch (e) {
      console.warn('Media cleanup notice:', e.message)
    }

    try {
      await db.execute('DELETE FROM notifications WHERE user_id = ?', [targetId])
    } catch (e) {
      console.warn('Notifications cleanup notice:', e.message)
    }

    try {
      await db.execute('DELETE FROM audit_logs WHERE user_id = ?', [targetId])
    } catch (e) {
      console.warn('Audit logs cleanup notice:', e.message)
    }
    
    await db.execute('DELETE FROM users WHERE id = ?', [targetId])
    res.json({ success: true, message: `User "${existing[0].name}" deleted successfully` })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PATCH /api/admin/users/:id/status
// @desc    Toggle user status
// @access  Private
router.patch('/:id/status', [
  body('status').isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
], validate, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    
    // Prevent self-deactivation
    if (parseInt(id) === req.user.id && status !== 'active') {
      return res.status(400).json({ success: false, message: 'You cannot deactivate your own account' })
    }
    
    // Check if user exists
    const [existing] = await db.execute('SELECT id, role FROM users WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    
    // Protect last super_admin from deactivation
    if (existing[0].role === 'super_admin' && status !== 'active') {
      const [superAdminCount] = await db.execute("SELECT COUNT(*) as count FROM users WHERE role = 'super_admin' AND status = 'active'")
      if (superAdminCount[0].count <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot deactivate the last active super admin' })
      }
    }
    
    await db.execute('UPDATE users SET status = ? WHERE id = ?', [status, id])
    
    res.json({ success: true, message: 'User status updated successfully' })
  } catch (error) {
    console.error('Error updating user status:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/admin/users/:id/reset-password
// @desc    Reset user password
// @access  Private
router.post('/:id/reset-password', [
  body('new_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validate, async (req, res) => {
  try {
    const { new_password } = req.body
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(new_password, salt)
    
    await db.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, req.params.id]
    )
    
    res.json({ success: true, message: 'Password reset successfully' })
  } catch (error) {
    console.error('Error resetting password:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
