import bcrypt from 'bcrypt'
import db from '../config/db.js'
import User from '../models/User.js'
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js'

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
    const { name, email, password, role } = req.body

    const existing = await User.findByEmail(email)
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const userId = await User.create({ name, email, password: hashedPassword, role: role || 'user' })
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
  return res.json({ success: true, message: 'Logged out successfully' })
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
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    return res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// ── Update Profile ─────────────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body
    const userId = req.user.id

    // Check if email is already taken by another user
    if (email) {
      const [existing] = await db.execute('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId])
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: 'Email already in use' })
      }
    }

    // Update user
    const updates = []
    const values = []

    if (name) {
      updates.push('name = ?')
      values.push(name)
    }
    if (email) {
      updates.push('email = ?')
      values.push(email)
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' })
    }

    values.push(userId)
    await db.execute(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values)

    // Get updated user
    const [users] = await db.execute('SELECT id, name, email, role FROM users WHERE id = ?', [userId])
    const updatedUser = users[0]

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return res.status(500).json({ success: false, message: error.message })
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
    return res.status(500).json({ success: false, message: error.message })
  }
}
