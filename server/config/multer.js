import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import 'dotenv/config'

import fs from 'fs'

// Map MIME types to safe extensions - never trust user-supplied filename
const MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/images'
    
    if (file.mimetype.startsWith('image/')) {
      uploadPath = 'uploads/images'
    } else if (file.mimetype.includes('pdf') || file.mimetype.includes('document')) {
      uploadPath = 'uploads/documents'
    } else {
      uploadPath = 'uploads/temp'
    }
    
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Derive extension from MIME type only — never from originalname (path traversal risk)
    const ext = MIME_TO_EXT[file.mimetype] || 'bin'
    const safeName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`
    cb(null, safeName)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'), false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
})

export default upload
