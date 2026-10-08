import { validationResult } from 'express-validator'

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.error('Validation errors:', JSON.stringify(errors.array(), null, 2))
    const firstError = errors.array()[0]
    return res.status(400).json({
      success: false,
      message: firstError?.msg || 'Validation failed',
      errors: errors.array()
    })
  }
  next()
}
