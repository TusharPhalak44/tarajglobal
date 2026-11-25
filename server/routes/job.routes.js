import express from 'express'
import db from '../config/db.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import emailService from '../services/email.service.js'
import benchmarkService from '../services/benchmark.service.js'
import notificationHelper from '../helpers/notificationHelper.js'
import { formLimiter } from '../middleware/rateLimit.middleware.js'

const router = express.Router()

const RESUME_MIME_MAP = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
}

// Configure multer for file uploads with safe random naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/resumes'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = RESUME_MIME_MAP[file.mimetype] || 'pdf'
    const safeName = `resume-${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`
    cb(null, safeName)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '')
    const isExtValid = ['pdf', 'doc', 'docx'].includes(ext)
    const isMimeValid = Boolean(RESUME_MIME_MAP[file.mimetype])
    
    // Require BOTH valid extension and valid MIME type
    if (isExtValid && isMimeValid) {
      return cb(null, true)
    }
    cb(new Error('Only valid PDF, DOC, and DOCX files are allowed for resumes.'))
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
      WHERE (j.status = 'published' OR j.status = 'active' OR j.status IS NULL)
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
    res.status(500).json({ success: false, message: 'Internal server error' })
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
      WHERE j.id = ? AND (j.status = 'published' OR j.status = 'active' OR j.status IS NULL)
    `, [id])
    
    if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    
    res.json({ success: true, data: jobs[0] })
  } catch (error) {
    console.error('Get job by ID error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route   POST /api/public/job-application
// @desc    Submit job application
// @access  Public
router.post('/job-application', formLimiter, upload.single('resume'), async (req, res) => {
  try {
    const { first_name, last_name, email, phone, job_title, cta_button, cta_section, source_page, utm_campaign, utm_source } = req.body
    const resume_path = req.file ? req.file.path : null

    if (!first_name || !last_name || !email || !job_title) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    if (!resume_path) {
      return res.status(400).json({ success: false, message: 'Resume file is required' })
    }

    // Insert application into database with safe attribution fallback
    let result
    try {
      const [insertRes] = await db.execute(
        `INSERT INTO job_applications (first_name, last_name, email, phone, job_title, resume_path, status, cta_button, cta_section, source_page, utm_campaign, utm_source, applied_at)
         VALUES (?, ?, ?, ?, ?, ?, 'applied', ?, ?, ?, ?, ?, NOW())`,
        [first_name, last_name, email, phone || '', job_title, resume_path, cta_button || null, cta_section || null, source_page || null, utm_campaign || null, utm_source || null]
      )
      result = insertRes
    } catch (_) {
      const [fallbackRes] = await db.execute(
        `INSERT INTO job_applications (first_name, last_name, email, phone, job_title, resume_path, status, applied_at) VALUES (?, ?, ?, ?, ?, ?, 'applied', NOW())`,
        [first_name, last_name, email, phone, job_title, resume_path]
      )
      result = fallbackRes
    }

    // Notify admins and candidate about new application
    const application = { first_name, last_name, email, phone, resume_path, cta_button, cta_section, source_page }
    const job = { title: job_title }
    const adminEmail = process.env.CAREER_EMAIL || process.env.HR_EMAIL || 'hr@tarajglobal.com'
    
    // 1. Send in-app notification to admins
    try {
      await notificationHelper.notifyAdmins({
        title: '💼 New Job Application',
        message: `${first_name} ${last_name} applied for "${job_title}"${cta_button ? ` via "${cta_button}"` : ''} in ${cta_section || 'Careers'}`,
        type: 'recruitment',
        link: '/admin/applications'
      })
    } catch (inAppError) {
      console.error('Failed to create in-app notification:', inAppError.message)
    }

    // 2. Send email notification to Admin/Recruiter
    try {
      const adminMailRes = await emailService.sendNewApplicationNotification(application, job, adminEmail)
      console.log('Admin notification email result:', adminMailRes)
    } catch (adminEmailError) {
      console.error('Failed to send admin notification email:', adminEmailError.message)
    }

    // 3. Send confirmation email to Candidate
    try {
      const candidateMailRes = await emailService.sendCandidateApplicationConfirmation(application, job)
      console.log('Candidate confirmation email result:', candidateMailRes)
    } catch (candidateEmailError) {
      console.error('Failed to send candidate confirmation email:', candidateEmailError.message)
    }

    // 4. Synchronize applicant with Benchmark Email Recruitment list
    benchmarkService.syncLead({
      firstName: first_name,
      lastName: last_name,
      email,
      phone,
      jobTitle: job_title,
      source: 'Careers Application'
    }).catch(bErr => console.warn('[Benchmark] Candidate sync notice:', bErr.message))

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { id: result.insertId }
    })
  } catch (error) {
    console.error('Job application error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
