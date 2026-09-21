import upload from '../config/multer.js'

export const uploadSingle = (fieldName) => upload.single(fieldName)
export const uploadMultiple = (fieldName, maxCount) => upload.array(fieldName, maxCount)
export const uploadFields = (fields) => upload.fields(fields)
