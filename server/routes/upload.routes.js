import express from 'express'
import { uploadSingle, uploadMultiple } from '../middleware/upload.middleware.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

// @route   POST /api/upload/single
// @desc    Upload a single file
// @access  Private/Admin
router.post('/single', authenticate, authorize('admin'), uploadSingle('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }
    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: req.file
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/upload/multiple
// @desc    Upload multiple files
// @access  Private/Admin
router.post('/multiple', authenticate, authorize('admin'), uploadMultiple('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' })
    }
    res.json({
      success: true,
      message: 'Files uploaded successfully',
      files: req.files
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
