import bcrypt from 'bcrypt'
import db from '../config/db.js'
import User from '../models/User.js'
import { generateToken, generateRefreshToken, verifyRefreshToken, verifyToken } from '../utils/jwt.js'
import { blacklistToken } from '../utils/tokenBlacklist.js'

// ── Login ──────────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    // Check account status
    if (user.status && user.status !== 'active') {
      return res.status(403).json({ 
        success: false, 
        message: `Your account is ${user.status}. Please contact an administrator.` 
      })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    // Update last login timestamp
    try {
      await db.execute('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id])
    } catch (updateErr) {
      console.warn('Could not update last_login_at:', updateErr.message)
    }

    // Generate tokens
    const token        = generateToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ id: user.id })

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id:     user.id,
        name:   user.name,
        email:  user.email,
        role:   user.role,
        status: user.status || 'active',
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Login failed' })
  }
}

// ── Register ───────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.ALLOW_PUBLIC_REGISTRATION !== 'true') {
      return res.status(403).json({ success: false, message: 'Registration is disabled. Ask an administrator for an account.' })
    }

    const { name, email, password } = req.body

    const existing = await User.findByEmail(email)
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const userId = await User.create({ name, email, password: hashedPassword, role: 'user' })
    const user   = await User.findById(userId)

    const token        = generateToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ id: user.id })

    return res.status(201).json({
      success: true,
      message: 'Registered successfully',
      token,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Registration failed' })
  }
}

// ── Logout ─────────────────────────────────────────────────────────────────
export const logout = async (req, res) => {
  try {
    const token = req.token // set by authenticate middleware
    if (token) {
      const decoded = verifyToken(token)
      blacklistToken(token, decoded.exp) // invalidate until natural expiry
    }
    return res.json({ success: true, message: 'Logged out successfully' })
  } catch {
    return res.json({ success: true, message: 'Logged out successfully' })
  }
}

// ── Refresh Token ──────────────────────────────────────────────────────────
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' })
    }

    const decoded = verifyRefreshToken(refreshToken)
    const user    = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    return res.json({ success: true, token })
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid refresh token' })
  }
}

// ── Get Me ─────────────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [req.user.id])
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    const user = users[0]
    delete user.password
    return res.json({
      success: true,
      user
    })
  } catch (error) {
    console.error('getMe error:', error)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

// Helper to ensure profile columns exist in users table
const ensureProfileColumns = async () => {
  try {
    const [columns] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'users'
    `)
    const colNames = columns.map(c => c.COLUMN_NAME)

    if (!colNames.includes('avatar')) {
      await db.execute('ALTER TABLE users ADD COLUMN avatar VARCHAR(500) NULL AFTER role').catch(() => {})
    }
    if (!colNames.includes('phone')) {
      await db.execute('ALTER TABLE users ADD COLUMN phone VARCHAR(50) NULL').catch(() => {})
    }
    if (!colNames.includes('department')) {
      await db.execute('ALTER TABLE users ADD COLUMN department VARCHAR(100) NULL').catch(() => {})
    }
  } catch (e) {
    console.warn('ensureProfileColumns error:', e.message)
  }
}

// ── Update Profile ─────────────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar, phone, department } = req.body
    const userId = req.user.id

    // Check if user exists
    const [userRows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId])
    if (userRows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Check if email is already taken by another user
    if (email && email !== userRows[0].email) {
      const [existing] = await db.execute('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId])
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: 'Email already in use' })
      }
    }

    await ensureProfileColumns()

    const [cols] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'users'
    `)
    const colNames = cols.map(c => c.COLUMN_NAME)

    // Update user
    const updates = []
    const values = []

    if (name !== undefined && colNames.includes('name')) {
      updates.push('name = ?')
      values.push(name)
    }
    if (email !== undefined && colNames.includes('email')) {
      updates.push('email = ?')
      values.push(email)
    }
    if (avatar !== undefined && colNames.includes('avatar')) {
      updates.push('avatar = ?')
      values.push(avatar)
    }
    if (phone !== undefined && colNames.includes('phone')) {
      updates.push('phone = ?')
      values.push(phone)
    }
    if (department !== undefined && colNames.includes('department')) {
      updates.push('department = ?')
      values.push(department)
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' })
    }

    values.push(userId)
    await db.execute(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values)

    // Get updated user
    const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [userId])
    const updatedUser = users[0]
    delete updatedUser.password

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
}

// ── Upload Avatar ──────────────────────────────────────────────────────────
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const fileUrl = `/uploads/avatars/${req.file.filename}`
    const userId = req.user.id

    await ensureProfileColumns()

    await db.execute('UPDATE users SET avatar = ? WHERE id = ?', [fileUrl, userId])
    const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [userId])
    const updatedUser = users[0]
    delete updatedUser.password

    return res.json({
      success: true,
      message: 'Profile photo uploaded successfully',
      url: fileUrl,
      file_url: fileUrl,
      user: updatedUser
    })
  } catch (error) {
    console.error('Upload avatar error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
}

// ── Forgot Password ────────────────────────────────────────────────────────
export const forgotPassword = async (req, res) => {
  // Always return the same response to avoid user enumeration
  return res.json({
    success: true,
    message: 'If an account exists with this email, a password reset link will be sent.',
  })
}

// ── Reset Password ─────────────────────────────────────────────────────────
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    const { verifyToken } = await import('../utils/jwt.js')
    const decoded = verifyToken(token)

    const hashedPassword = await bcrypt.hash(password, 12)
    await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, decoded.id])

    return res.json({ success: true, message: 'Password reset successful' })
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid or expired token' })
  }
}

// ── Change Password ────────────────────────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user.id)

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id])

    return res.json({ success: true, message: 'Password changed successfully' })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}
