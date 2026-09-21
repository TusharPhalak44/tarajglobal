import express from 'express'
import db from '../config/db.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/resumes'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    
    if (extname || mimetype) {
      return cb(null, true)
    }
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'))
  }
})

// @route   GET /api/jobs
// @desc    Get all active jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { location, type } = req.query
    
    let query = `
      SELECT j.*
      FROM careers j
      WHERE j.status = 'published'
    `
    const params = []
    
    if (location) {
      query += ' AND j.location = ?'
      params.push(location)
    }
    
    if (type) {
      query += ' AND j.type = ?'
      params.push(type)
    }
    
    query += ' ORDER BY j.created_at DESC'
    
    const [jobs] = await db.execute(query, params)
    
    res.json({ success: true, data: jobs })
  } catch (error) {
    console.error('Get jobs error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const [jobs] = await db.execute(`
      SELECT j.*
      FROM careers j
      WHERE j.id = ? AND j.status = 'published'
    `, [id])
    
    if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    
    res.json({ success: true, data: jobs[0] })
  } catch (error) {
    console.error('Get job by ID error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/public/job-application
// @desc    Submit job application
// @access  Public
router.post('/job-application', upload.single('resume'), async (req, res) => {
  try {
    const { first_name, last_name, email, phone, job_title } = req.body
    const resume_path = req.file ? req.file.path : null

    if (!first_name || !last_name || !email || !job_title) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    if (!resume_path) {
      return res.status(400).json({ success: false, message: 'Resume file is required' })
    }

    // Insert application into database
    const [result] = await db.execute(
      `INSERT INTO job_applications (first_name, last_name, email, phone, job_title, resume_path, status, applied_at) VALUES (?, ?, ?, ?, ?, ?, 'applied', NOW())`,
      [first_name, last_name, email, phone, job_title, resume_path]
    )

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { id: result.insertId }
    })
  } catch (error) {
    console.error('Job application error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
