import express from 'express'
import { checkPermission } from '../../middleware/permission.middleware.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import db from '../../config/db.js'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/media'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for videos
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|svg|gif|mp4|webm|mov|pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype.startsWith('image/') || 
                     file.mimetype.startsWith('video/') || 
                     file.mimetype === 'application/pdf'
    
    if (extname && mimetype) {
      return cb(null, true)
    }
    cb(new Error('Invalid file type. Allowed: JPG, PNG, WEBP, GIF, SVG, MP4, WEBM, MOV, PDF'))
  }
})

// @route   GET /api/admin/media
// @desc    Get all media
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { type, search, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit
    
    let whereClause = 'WHERE 1=1'
    const params = []
    
    if (type) {
      whereClause += ' AND mime_type LIKE ?'
      params.push(`${type}%`)
    }
    
    if (search) {
      whereClause += ' AND (filename LIKE ? OR original_name LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    
    const [media] = await db.execute(`
      SELECT m.*, u.name as uploaded_by_name
      FROM media m
      LEFT JOIN users u ON m.uploaded_by = u.id
      ${whereClause}
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), offset])
    
    const [countResult] = await db.execute(`
      SELECT COUNT(*) as total FROM media ${whereClause}
    `, params)
    
    res.json({
      success: true,
      data: {
        media,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get media error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   POST /api/admin/media/upload
// @desc    Upload media
// @access  Private
router.post('/upload', checkPermission('media.upload'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }
    
    const { filename, originalname, mimetype, size, path: filePath } = req.file
    const fileUrl = `/uploads/media/${filename}`
    
    // Check if status column exists
    const [columns] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'media' AND COLUMN_NAME = 'status'
    `)
    
    // Add status column if it doesn't exist
    if (columns.length === 0) {
      try {
        await db.execute(`ALTER TABLE media ADD COLUMN status ENUM('active', 'deleted') DEFAULT 'active'`)
        console.log('Added status column to media table')
      } catch (alterError) {
        console.log('Could not add status column:', alterError.message)
      }
    }
    
    const [result] = await db.execute(
      'INSERT INTO media (filename, original_name, mime_type, file_size, file_path, file_url, uploaded_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [filename, originalname, mimetype, size, filePath, fileUrl, req.user.id, 'active']
    )
    
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: { id: result.insertId, url: fileUrl }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   PUT /api/admin/media/:id
// @desc    Update media metadata
// @access  Private
router.put('/:id', checkPermission('media.upload'), async (req, res) => {
  try {
    const { alt_text, caption, description } = req.body
    
    await db.execute(
      'UPDATE media SET alt_text = COALESCE(?, alt_text), caption = COALESCE(?, caption), description = COALESCE(?, description) WHERE id = ?',
      [alt_text, caption, description, req.params.id]
    )
    
    res.json({ success: true, message: 'Media updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// @route   DELETE /api/admin/media/:id
// @desc    Delete media
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    console.log('Delete request for media id:', req.params.id)
    const [media] = await db.execute('SELECT * FROM media WHERE id = ?', [req.params.id])
    
    if (media.length === 0) {
      return res.status(404).json({ success: false, message: 'Media not found' })
    }
    
    const file = media[0]
    console.log('Media file path:', file.file_path)
    
    if (fs.existsSync(file.file_path)) {
      fs.unlinkSync(file.file_path)
      console.log('File deleted from disk')
    }
    
    await db.execute('DELETE FROM media WHERE id = ?', [req.params.id])
    console.log('Media deleted from database')
    
    res.json({ success: true, message: 'Media deleted successfully' })
  } catch (error) {
    console.error('Delete media error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
