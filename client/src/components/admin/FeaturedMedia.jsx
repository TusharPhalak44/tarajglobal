import React, { useState, useRef } from 'react'
import { Upload, X, FileText, Image as ImageIcon, Video, File, Link, ChevronDown } from 'lucide-react'
import { adminAPI } from '@api'

const FeaturedMedia = ({ value, onChange, disabled = false }) => {
  const [activeTab, setActiveTab] = useState('upload')
  const [mediaType, setMediaType] = useState('image') // image, video, pdf
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(value || '')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const fileInputRef = useRef(null)

  const getMediaTypeFromUrl = (url) => {
    if (!url) return 'image'
    const extension = url.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(extension)) return 'image'
    if (['mp4', 'webm', 'mov'].includes(extension)) return 'video'
    if (extension === 'pdf') return 'pdf'
    return 'image'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getAcceptedTypes = () => {
    switch (mediaType) {
      case 'image':
        return 'image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml'
      case 'video':
        return 'video/mp4,video/webm,video/quicktime'
      case 'pdf':
        return 'application/pdf'
      default:
        return ''
    }
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type based on selected media type
    const allowedTypes = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
      video: ['video/mp4', 'video/webm', 'video/quicktime'],
      pdf: ['application/pdf']
    }

    if (!allowedTypes[mediaType].includes(file.type)) {
      const typeNames = {
        image: 'JPG, PNG, WEBP, GIF, SVG',
        video: 'MP4, WEBM, MOV',
        pdf: 'PDF'
      }
      alert(`Invalid file type for ${mediaType}. Allowed: ${typeNames[mediaType]}`)
      return
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB limit')
      return
    }

    setFileName(file.name)
    setFileSize(formatFileSize(file.size))

    // Create preview for images
    if (mediaType === 'image') {
      const reader = new FileReader()
      reader.onload = (e) => setPreviewUrl(e.target.result)
      reader.readAsDataURL(file)
    }

    // Upload file
    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await adminAPI.uploadMedia(formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress)
        }
      })

      const uploadedUrl = response.data.data.url
      setPreviewUrl(uploadedUrl)
      onChange(uploadedUrl)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload file. Please try again.')
      setPreviewUrl('')
      setMediaType('image')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setPreviewUrl(url)
    onChange(url)
  }

  const handleMediaTypeChange = (newType) => {
    setMediaType(newType)
    setPreviewUrl('')
    setFileName('')
    setFileSize('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    setPreviewUrl('')
    setFileName('')
    setFileSize('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const renderPreview = () => {
    if (!previewUrl) return null

    if (mediaType === 'image') {
      return (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-48 object-contain rounded-lg bg-background"
        />
      )
    }

    if (mediaType === 'video') {
      return (
        <video
          src={previewUrl}
          controls
          className="w-full h-48 rounded-lg bg-background"
        />
      )
    }

    if (mediaType === 'pdf') {
      return (
        <div className="w-full h-48 flex items-center justify-center rounded-lg bg-background border border-border">
          <div className="text-center">
            <File className="w-12 h-12 text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-secondary">PDF Document</p>
            <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
              Open PDF
            </a>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-secondary mb-2">Featured Media</label>
      
      {/* Media Type Selector */}
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-text-secondary">Media Type:</label>
        <div className="relative">
          <select
            value={mediaType}
            onChange={(e) => handleMediaTypeChange(e.target.value)}
            className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-10 text-text-primary focus:outline-none focus:border-primary cursor-pointer"
            disabled={disabled || uploading}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'upload'
              ? 'bg-primary text-white'
              : 'bg-surface border border-border text-text-primary hover:bg-surface/80'
          }`}
          disabled={disabled}
        >
          <Upload className="w-4 h-4" />
          Upload from Device
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'url'
              ? 'bg-primary text-white'
              : 'bg-surface border border-border text-text-primary hover:bg-surface/80'
          }`}
          disabled={disabled}
        >
          <Link className="w-4 h-4" />
          Use URL
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          {!previewUrl ? (
            <div
              onClick={() => !disabled && fileInputRef.current?.click()}
              className={`border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={getAcceptedTypes()}
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled}
              />
              <Upload className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-primary font-medium mb-2">
                Upload {mediaType === 'image' ? 'Image' : mediaType === 'video' ? 'Video' : 'PDF'}
              </p>
              <p className="text-text-secondary text-sm mb-4">
                Drag & Drop or Browse
              </p>
              <p className="text-text-muted text-xs">
                {mediaType === 'image' ? 'JPG, PNG, WEBP, GIF, SVG' : mediaType === 'video' ? 'MP4, WEBM, MOV' : 'PDF'} (Max 50MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {renderPreview()}
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium text-text-primary">{fileName || 'Uploaded file'}</p>
                  {fileSize && <p className="text-xs text-text-muted">{fileSize}</p>}
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Uploading...</span>
                <span className="text-text-primary">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* URL Tab */}
      {activeTab === 'url' && (
        <div className="space-y-4">
          <div className="relative">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="url"
              value={previewUrl}
              onChange={handleUrlChange}
              placeholder={`https://example.com/${mediaType}.${mediaType === 'pdf' ? 'pdf' : mediaType === 'video' ? 'mp4' : 'jpg'}`}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              disabled={disabled}
            />
          </div>

          {previewUrl && (
            <div className="space-y-4">
              {renderPreview()}
              <button
                type="button"
                onClick={handleRemove}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
                Remove URL
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FeaturedMedia
