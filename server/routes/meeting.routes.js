import express from 'express'
import rateLimit from 'express-rate-limit'
import {
  getAvailability,
  createMeeting,
  getMeetingById,
  getMeetingByBookingId
} from '../controllers/meeting.controller.js'

const router = express.Router()

// Dedicated rate limiter on booking endpoint to prevent spam & abuse
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 10 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many booking attempts from this IP. Please try again after a few minutes.'
  }
})

// @route   GET /api/meetings/availability
// @desc    Get available slots for a given date
// @access  Public
router.get('/availability', getAvailability)

// @route   POST /api/meetings
// @desc    Book a strategy call meeting
// @access  Public
router.post('/', bookingLimiter, createMeeting)

// @route   GET /api/meetings/booking/:bookingId
// @desc    Retrieve meeting details by Booking ID
// @access  Public
router.get('/booking/:bookingId', getMeetingByBookingId)

// @route   GET /api/meetings/:id
// @desc    Retrieve meeting details by ID
// @access  Public
router.get('/:id', getMeetingById)

export default router
