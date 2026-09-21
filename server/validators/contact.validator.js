import { body } from 'express-validator'

export const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Subject must not exceed 255 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
]
