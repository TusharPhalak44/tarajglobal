import multer from 'multer'
import path from 'path'
import 'dotenv/config'

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
    
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
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
