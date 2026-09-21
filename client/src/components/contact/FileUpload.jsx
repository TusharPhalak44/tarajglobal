import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, File } from 'lucide-react'

const FileUpload = ({ label, name, onChange, accept, maxSize, error }) => {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (uploadedFile) => {
    if (maxSize && uploadedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }
    setFile(uploadedFile)
    onChange(uploadedFile)
  }

  const removeFile = () => {
    setFile(null)
    onChange(null)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <File className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeFile}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="text-red-500" size={20} />
            </motion.button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your file here, or{' '}
              <label className="text-primary cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  className="hidden"
                  name={name}
                  onChange={handleChange}
                  accept={accept}
                />
              </label>
            </p>
            <p className="text-xs text-gray-400">
              Max file size: {maxSize}MB
            </p>
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default FileUpload
