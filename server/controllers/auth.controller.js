import bcrypt from 'bcrypt'
import db from '../config/db.js'
import User from '../models/User.js'
import { generateToken, generateRefreshToken, verifyRefreshToken, verifyToken } from '../utils/jwt.js'
import { blacklistToken } from '../utils/tokenBlacklist.js'
import slugify from 'slugify'
import fs from 'fs'
import path from 'path'
import { formatAuthorName } from '../utils/authorFormatter.js'

// Helper to save base64 avatar image to disk in uploads/avatars and return relative URL
export const saveAvatarIfBase64 = (avatarData) => {
  if (!avatarData || typeof avatarData !== 'string') return avatarData
  if (!avatarData.startsWith('data:image/')) return avatarData

  try {
    const uploadDir = 'uploads/avatars'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const matches = avatarData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) return avatarData

    const mimeType = matches[1]
    const base64Data = matches[2]
    const ext = mimeType.split('/')[1] || 'png'
    const cleanExt = ext === 'jpeg' ? 'jpg' : ext.split('+')[0]
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${cleanExt}`
    const filePath = path.join(uploadDir, filename)

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'))
    return `/uploads/avatars/${filename}`
  } catch (err) {
    console.error('Failed to save base64 avatar:', err)
    return avatarData
  }
}

// Helper to synchronize user profile information to their author record
export const syncAuthorForUser = async ({ userId, name, email, avatar, bio, linkedin_url, twitter_url }) => {
  try {
    const [existing] = await db.execute(
      'SELECT id, name FROM authors WHERE user_id = ? OR email = ?',
      [userId, email || '']
    )
    const rawName = name || (existing[0]?.name && !existing[0]?.name.includes('@') ? existing[0].name : null) || email || 'Author'
    const aName = formatAuthorName(rawName)
    if (existing.length > 0) {
      const authorId = existing[0].id
      await db.execute(
        `UPDATE authors SET 
          user_id = ?, 
          name = ?, 
          profile_photo = COALESCE(?, profile_photo), 
          bio = COALESCE(?, bio), 
          linkedin_url = COALESCE(?, linkedin_url), 
          twitter_url = COALESCE(?, twitter_url) 
         WHERE id = ?`,
        [
          userId,
          aName,
          avatar !== undefined ? avatar : null,
          bio !== undefined ? bio : null,
          linkedin_url !== undefined ? linkedin_url : null,
          twitter_url !== undefined ? twitter_url : null,
          authorId
        ]
      )
      return { id: authorId, name: aName }
    } else {
      let aSlug = slugify(aName, { lower: true, strict: true }) || 'author'
      const [slugCheck] = await db.execute('SELECT id FROM authors WHERE slug = ?', [aSlug])
      if (slugCheck.length > 0) {
        aSlug = `${aSlug}-${Date.now().toString().slice(-4)}`
      }
      const [ins] = await db.execute(
        `INSERT INTO authors (user_id, name, email, slug, profile_photo, bio, linkedin_url, twitter_url, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          aName,
          email || null,
          aSlug,
          avatar || null,
          bio || null,
          linkedin_url || null,
          twitter_url || null,
          'active'
        ]
      )
      return { id: ins.insertId, name: aName }
    }
  } catch (err) {
    console.error('Error syncing author for user:', err.message)
    return null
  }
}

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
    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ id: user.id })

    delete user.password

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Login failed' })
  }
}

// ── Register ───────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.ALLOW_PUBLIC_REGISTRATION === 'false') {
      return res.status(403).json({ success: false, message: 'Registration is disabled. Ask an administrator for an account.' })
    }

    const { name, email, password, role = 'user', bio = '', linkedin_url = '', twitter_url = '' } = req.body

    const existing = await User.findByEmail(email)
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered.' })
    }

    // Determine avatar: file upload or base64 data image or URL
    let avatarUrl = null
    if (req.file) {
      avatarUrl = `/uploads/avatars/${req.file.filename}`
    } else if (req.body.avatar) {
      avatarUrl = saveAvatarIfBase64(req.body.avatar)
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const effectiveRole = ['admin', 'super_admin', 'editor', 'user'].includes(role) ? role : 'user'

    const userId = await User.create({
      name,
      email,
      password: hashedPassword,
      role: effectiveRole,
      avatar: avatarUrl,
      bio: bio || null,
      linkedin_url: linkedin_url || null,
      twitter_url: twitter_url || null,
      status: 'active'
    })

    // Also sync with author record
    await syncAuthorForUser({
      userId,
      name,
      email,
      avatar: avatarUrl,
      bio,
      linkedin_url,
      twitter_url
    })

    const user = await User.findById(userId)
    delete user.password

    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ id: user.id })

    return res.status(201).json({
      success: true,
      message: 'Registered successfully',
      token,
      refreshToken,
      user
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
    const user = await User.findById(decoded.id)
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
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
    `)
    const colNames = columns.map(c => c.COLUMN_NAME)

    if (!colNames.includes('avatar')) {
      await db.execute('ALTER TABLE users ADD COLUMN avatar VARCHAR(500) NULL AFTER role').catch(() => { })
    }
    if (!colNames.includes('phone')) {
      await db.execute('ALTER TABLE users ADD COLUMN phone VARCHAR(50) NULL').catch(() => { })
    }
    if (!colNames.includes('department')) {
      await db.execute('ALTER TABLE users ADD COLUMN department VARCHAR(100) NULL').catch(() => { })
    }
    if (!colNames.includes('bio')) {
      await db.execute('ALTER TABLE users ADD COLUMN bio TEXT NULL').catch(() => { })
    }
    if (!colNames.includes('linkedin_url')) {
      await db.execute('ALTER TABLE users ADD COLUMN linkedin_url VARCHAR(500) NULL').catch(() => { })
    }
    if (!colNames.includes('twitter_url')) {
      await db.execute('ALTER TABLE users ADD COLUMN twitter_url VARCHAR(500) NULL').catch(() => { })
    }
  } catch (e) {
    console.warn('ensureProfileColumns error:', e.message)
  }
}

// ── Update Profile ─────────────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar, phone, department, bio, linkedin_url, twitter_url } = req.body
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
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
    `)
    const colNames = cols.map(c => c.COLUMN_NAME)

    // Process avatar if sent as base64
    const processedAvatar = avatar ? saveAvatarIfBase64(avatar) : avatar

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
    if (processedAvatar !== undefined && colNames.includes('avatar')) {
      updates.push('avatar = ?')
      values.push(processedAvatar)
    }
    if (phone !== undefined && colNames.includes('phone')) {
      updates.push('phone = ?')
      values.push(phone)
    }
    if (department !== undefined && colNames.includes('department')) {
      updates.push('department = ?')
      values.push(department)
    }
    if (bio !== undefined && colNames.includes('bio')) {
      updates.push('bio = ?')
      values.push(bio)
    }
    if (linkedin_url !== undefined && colNames.includes('linkedin_url')) {
      updates.push('linkedin_url = ?')
      values.push(linkedin_url)
    }
    if (twitter_url !== undefined && colNames.includes('twitter_url')) {
      updates.push('twitter_url = ?')
      values.push(twitter_url)
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

    // Also sync the author record in the authors table
    await syncAuthorForUser({
      userId,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      bio: updatedUser.bio,
      linkedin_url: updatedUser.linkedin_url,
      twitter_url: updatedUser.twitter_url
    })

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

    // Also sync avatar with author record in authors table
    await syncAuthorForUser({
      userId,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: fileUrl,
      bio: updatedUser.bio,
      linkedin_url: updatedUser.linkedin_url,
      twitter_url: updatedUser.twitter_url
    })

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
