import express from 'express'
import { body } from 'express-validator'
import rateLimit from 'express-rate-limit'
import { validate } from '../middleware/validation.middleware.js'
import { authenticate } from '../middleware/auth.middleware.js'
import * as authController from '../controllers/auth.controller.js'

// Brute-force protection: max 10 login attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' }
})

const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again in 15 minutes.' }
})

const router = express.Router()

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', sensitiveLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character')
], validate, authController.register)

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginLimiter, [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], validate, authController.login)

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authenticate, authController.logout)

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', sensitiveLimiter, authController.refreshToken)

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, authController.getMe)

import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Multer storage for avatars
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/avatars'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname).toLowerCase())
  }
})

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true)
    }
    cb(new Error('Only image files (JPG, PNG, WebP, GIF) are allowed for avatars'))
  }
})

// @route   POST /api/auth/me/avatar
// @desc    Upload profile avatar for current user
// @access  Private
router.post('/me/avatar', authenticate, (req, res, next) => {
  avatarUpload.fields([{ name: 'file', maxCount: 1 }, { name: 'avatar', maxCount: 1 }])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message })
    }
    if (req.files) {
      req.file = req.files['file']?.[0] || req.files['avatar']?.[0]
    }
    next()
  })
}, authController.uploadAvatar)

// @route   PUT /api/auth/me
// @desc    Update current user profile
// @access  Private
router.put('/me', [
  authenticate,
  body('name').optional().trim().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('avatar').optional(),
  body('phone').optional().trim(),
  body('department').optional().trim()
], validate, authController.updateProfile)

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', sensitiveLimiter, [
  body('email').isEmail().withMessage('Valid email is required')
], validate, authController.forgotPassword)

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', sensitiveLimiter, [
  body('token').notEmpty().withMessage('Token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validate, authController.resetPassword)

// @route   POST /api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', [
  authenticate,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character')
], validate, authController.changePassword)

export default router
