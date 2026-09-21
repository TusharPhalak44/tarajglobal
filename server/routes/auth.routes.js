import express from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validation.middleware.js'
import { authenticate } from '../middleware/auth.middleware.js'
import * as authController from '../controllers/auth.controller.js'

const router = express.Router()

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validate, authController.register)

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
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
router.post('/refresh', authController.refreshToken)

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, authController.getMe)

// @route   PUT /api/auth/me
// @desc    Update current user profile
// @access  Private
router.put('/me', [
  authenticate,
  body('name').optional().trim().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Valid email is required')
], validate, authController.updateProfile)

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required')
], validate, authController.forgotPassword)

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validate, authController.resetPassword)

// @route   POST /api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', [
  authenticate,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], validate, authController.changePassword)

export default router
