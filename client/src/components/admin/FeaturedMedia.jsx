import React, { useState, useRef, useEffect } from 'react'
import { Upload, X, FileText, Image as ImageIcon, Video, File, Link, ChevronDown, ExternalLink, Play } from 'lucide-react'
import { adminAPI } from '@api'
import { parseVideoInfo, parsePdfInfo, isPdfUrl, resolveMediaUrl } from '@utils/mediaHelper'

const detectMediaType = (url) => {
  if (!url || typeof url !== 'string') return 'image'
  const trimmed = url.trim()
  if (parseVideoInfo(trimmed)) return 'video'
  if (isPdfUrl(trimmed)) return 'pdf'
  const clean = trimmed.split('?')[0].split('#')[0].toLowerCase()
  if (/\.(mp4|webm|mov|ogg|m4v)$/i.test(clean)) return 'video'
  if (clean.endsWith('.pdf')) return 'pdf'
  return 'image'
}

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const FeaturedMedia = ({ value, onChange, disabled = false }) => {
  const [activeTab, setActiveTab] = useState('upload')
  const [mediaType, setMediaType] = useState('image') // image, video, pdf
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(value || '')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const fileInputRef = useRef(null)

  // Sync internal state when external `value` prop changes (e.g. when editing blog)
  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreviewUrl(value)
      const detected = detectMediaType(value)
      setMediaType(detected)

      if (value.startsWith('http://') || value.startsWith('https://')) {
        setActiveTab('url')
      } else {
        setActiveTab('upload')
      }

      const clean = value.split('?')[0].split('#')[0]
      const rawName = clean.split('/').pop() || ''
      setFileName(decodeURIComponent(rawName))
    } else if (!value) {
      setPreviewUrl('')
      setFileName('')
      setFileSize('')
    }
  }, [value])

  const getAcceptedTypes = () => {
    switch (mediaType) {
      case 'image':
        return 'image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml'
      case 'video':
        return 'video/mp4,video/webm,video/quicktime,video/ogg'
      case 'pdf':
        return 'application/pdf'
      default:
        return 'image/*,video/*,application/pdf'
    }
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Auto-align media type to selected file type
    let targetType = mediaType
    if (file.type.startsWith('video/')) {
      targetType = 'video'
      setMediaType('video')
    } else if (file.type === 'application/pdf') {
      targetType = 'pdf'
      setMediaType('pdf')
    } else if (file.type.startsWith('image/')) {
      targetType = 'image'
      setMediaType('image')
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB limit')
      return
    }

    setFileName(file.name)
    setFileSize(formatFileSize(file.size))

    // Local instant preview
    if (targetType === 'image') {
      const reader = new FileReader()
      reader.onload = (ev) => setPreviewUrl(ev.target.result)
      reader.readAsDataURL(file)
    } else if (targetType === 'video') {
      const objUrl = URL.createObjectURL(file)
      setPreviewUrl(objUrl)
    }

    // Upload to server
    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await adminAPI.uploadMedia(formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          }
        }
      })

      const uploadedUrl = response.data?.data?.url
      if (uploadedUrl) {
        setPreviewUrl(uploadedUrl)
        onChange(uploadedUrl)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert(error.response?.data?.message || 'Failed to upload file. Please try again.')
      setPreviewUrl(value || '')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setPreviewUrl(url)
    onChange(url)

    if (url.trim()) {
      const detected = detectMediaType(url)
      if (detected !== mediaType) {
        setMediaType(detected)
      }
      const clean = url.split('?')[0].split('#')[0]
      const rawName = clean.split('/').pop() || ''
      setFileName(decodeURIComponent(rawName))
    }
  }

  const handleMediaTypeChange = (newType) => {
    setMediaType(newType)
    // Only clear if no current preview or user explicitly changing types
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

    const videoInfo = parseVideoInfo(previewUrl)
    const pdfInfo = parsePdfInfo(previewUrl)
    const resolvedUrl = resolveMediaUrl(previewUrl)

    // 1. Video Preview (YouTube, Vimeo, or Direct MP4/WebM)
    if (mediaType === 'video' || videoInfo) {
      if (videoInfo && videoInfo.type !== 'direct') {
        return (
          <div className="space-y-2">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md border border-border">
              <iframe
                src={videoInfo.embedUrl}
                title="Video Preview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between text-xs text-text-muted px-1">
              <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                <Play size={13} /> {videoInfo.type.toUpperCase()} Video Active
              </span>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open in Tab</span> <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )
      }

      // Direct video file (.mp4, .webm, or uploaded media)
      return (
        <div className="space-y-2">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md border border-border">
            <video
              src={resolvedUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            >
              Your browser does not support playing this video.
            </video>
          </div>
          <div className="flex items-center justify-between text-xs text-text-muted px-1">
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <Play size={13} /> Video Ready
            </span>
            <a
              href={resolvedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 font-medium"
            >
              <span>Direct Link</span> <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )
    }

    // 2. PDF Preview
    if (mediaType === 'pdf' || pdfInfo || isPdfUrl(previewUrl)) {
      return (
        <div className="w-full rounded-xl bg-surface border border-border shadow-md overflow-hidden">
          <div className="p-3 bg-background/80 border-b border-border flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-text-primary truncate block max-w-xs">
                  {fileName || pdfInfo?.fileName || 'PDF Document'}
                </span>
                <span className="text-[10px] text-text-muted font-mono">
                  Interactive PDF Playbook
                </span>
              </div>
            </div>
            <a
              href={resolvedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors shadow-xs"
            >
              <ExternalLink size={13} />
              <span>Open PDF</span>
            </a>
          </div>
          <div className="w-full h-64 bg-slate-900">
            <iframe
              src={`${resolvedUrl}#view=FitH`}
              title="PDF Preview"
              className="w-full h-full border-0 bg-white dark:bg-slate-900"
            />
          </div>
        </div>
      )
    }

    // 3. Image Preview
    return (
      <div className="relative rounded-xl overflow-hidden border border-border bg-background">
        <img
          src={resolvedUrl}
          alt="Preview"
          className="w-full h-52 object-contain bg-background"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop&q=80'
          }}
        />
      </div>
    )
  }

  const getPlaceholder = () => {
    if (mediaType === 'video') return 'https://youtu.be/... or https://www.youtube.com/watch?v=... or .mp4 URL'
    if (mediaType === 'pdf') return 'https://example.com/document.pdf or /uploads/media/document.pdf'
    return 'https://images.unsplash.com/... or https://example.com/image.jpg'
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-secondary mb-2">Featured Media</label>

      {/* Media Type Selector */}
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-text-secondary font-medium">Media Type:</label>
        <div className="relative">
          <select
            value={mediaType}
            onChange={(e) => handleMediaTypeChange(e.target.value)}
            className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-10 text-text-primary focus:outline-none focus:border-primary cursor-pointer font-medium text-sm"
            disabled={disabled || uploading}
          >
            <option value="image">Image (JPG, PNG, WEBP, SVG)</option>
            <option value="video">Video (YouTube, Vimeo, MP4)</option>
            <option value="pdf">PDF Document (Playbook / Whitepaper)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'upload'
              ? 'bg-primary text-white shadow-xs'
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'url'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface border border-border text-text-primary hover:bg-surface/80'
          }`}
          disabled={disabled}
        >
          <Link className="w-4 h-4" />
          Use URL (Web / YouTube / PDF)
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          {!previewUrl ? (
            <div
              onClick={() => !disabled && fileInputRef.current?.click()}
              className={`border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary bg-surface/30 hover:bg-surface/60'
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
              <p className="text-text-primary font-medium mb-1">
                Upload {mediaType === 'image' ? 'Image' : mediaType === 'video' ? 'Video' : 'PDF Document'}
              </p>
              <p className="text-text-secondary text-sm mb-3">
                Click to browse or drag & drop file here
              </p>
              <p className="text-text-muted text-xs">
                {mediaType === 'image'
                  ? 'JPG, PNG, WEBP, GIF, SVG'
                  : mediaType === 'video'
                  ? 'MP4, WEBM, MOV (Max 50MB)'
                  : 'PDF Document (Max 50MB)'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {renderPreview()}
              <div className="flex items-center justify-between p-3 bg-surface rounded-xl border border-border">
                <div className="min-w-0 pr-2">
                  <p className="text-sm font-medium text-text-primary truncate">{fileName || 'Attached file'}</p>
                  {fileSize && <p className="text-xs text-text-muted">{fileSize}</p>}
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer"
                  title="Remove media"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {uploading && (
            <div className="space-y-2 p-3 bg-surface rounded-xl border border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary font-medium">Uploading to server...</span>
                <span className="text-primary font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2 overflow-hidden">
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
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="url"
              value={previewUrl}
              onChange={handleUrlChange}
              placeholder={getPlaceholder()}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
              disabled={disabled}
            />
          </div>

          {previewUrl && (
            <div className="space-y-4">
              {renderPreview()}
              <button
                type="button"
                onClick={handleRemove}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-surface border border-border rounded-xl text-xs font-semibold text-error hover:bg-error/10 transition-colors cursor-pointer"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
                Remove Media
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FeaturedMedia
