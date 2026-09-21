import { body } from 'express-validator'

export const blogValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be between 3 and 255 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ max: 500 })
    .withMessage('Excerpt must not exceed 500 characters'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
]
