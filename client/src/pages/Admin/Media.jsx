import React, { useEffect, useState } from 'react'
import { 
  Upload, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Download,
  Image as ImageIcon,
  FileText,
  Video,
  Grid,
  List,
  Eye,
  Copy,
  X,
  CheckCircle
} from 'lucide-react'
import { adminAPI } from '@api'

const Media = () => {
  console.log('Media component rendering')
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ type: '', search: '' })
  const [activeMenu, setActiveMenu] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    console.log('Media component mounted, fetching media')
    fetchMedia()
  }, [filters, pagination.page])

  const fetchMedia = async () => {
    try {
      setLoading(true)
      console.log('Fetching media with filters:', filters)
      const response = await adminAPI.getMedia({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      console.log('Media API response:', response)
      console.log('Response data:', response.data)
      const mediaData = response.data?.data?.media || response.data?.media || response.data || []
      const paginationData = response.data?.data?.pagination || response.data?.pagination || pagination
      console.log('Media data:', mediaData)
      console.log('Pagination data:', paginationData)
      console.log('Is media array?', Array.isArray(mediaData))
      setMedia(Array.isArray(mediaData) ? mediaData : [])
      setPagination(paginationData)
    } catch (error) {
      console.error('Failed to fetch media:', error)
      console.error('Error response:', error.response)
      console.error('Error message:', error.message)
      setMessage({ type: 'error', text: `Failed to load media: ${error.message}` })
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
      setMedia([])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files
    if (files.length === 0) return

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        await adminAPI.uploadMedia(formData)
        fetchMedia()
        setMessage({ type: 'success', text: 'File uploaded successfully' })
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      } catch (error) {
        console.error('Failed to upload file:', error)
        setMessage({ type: 'error', text: 'Failed to upload file' })
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      }
    }
  }

  const handleView = (item) => {
    const fullUrl = item.file_url.startsWith('http') ? item.file_url : `http://localhost:5000${item.file_url}`
    window.open(fullUrl, '_blank')
  }

  const handleCopyLink = (item) => {
    const fullUrl = item.file_url.startsWith('http') ? item.file_url : `http://localhost:5000${item.file_url}`
    navigator.clipboard.writeText(fullUrl).then(() => {
      setMessage({ type: 'success', text: 'Link copied to clipboard' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    })
  }

  const handleDownload = async (item) => {
    try {
      const fullUrl = item.file_url.startsWith('http') ? item.file_url : `http://localhost:5000${item.file_url}`
      console.log('Downloading from:', fullUrl)
      
      const response = await fetch(fullUrl)
      if (!response.ok) {
        throw new Error('Failed to download file')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = item.original_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      setMessage({ type: 'success', text: 'File downloaded successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Failed to download file:', error)
      setMessage({ type: 'error', text: 'Failed to download file' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }
  }

  const getFileUrl = (item) => {
    return item.file_url.startsWith('http') ? item.file_url : `http://localhost:5000${item.file_url}`
  }

  const handleDelete = async (item) => {
    try {
      console.log('Deleting media item:', item.id, item.original_name)
      await adminAPI.deleteMedia(item.id)
      setDeleteConfirm(null)
      setActiveMenu(null)
      fetchMedia()
      setMessage({ type: 'success', text: 'Media deleted successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Failed to delete media:', error)
      console.error('Error response:', error.response)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete media'
      setMessage({ type: 'error', text: `Failed to delete media: ${errorMessage}` })
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    }
  }

  const isImage = (mimeType) => mimeType?.startsWith('image/')

  if (loading) {
    console.log('Media component: showing loading state')
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-muted">Loading media...</div>
      </div>
    )
  }

  console.log('Media component: rendering with', media.length, 'items')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Media Library</h1>
          <p className="text-text-secondary">Manage your media files</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors ${viewMode === 'list' ? 'border-primary' : ''}`}
          >
            <List className={`w-5 h-5`} />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors ${viewMode === 'grid' ? 'border-primary' : ''}`}
          >
            <Grid className={`w-5 h-5`} />
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            Upload
            <input type="file" multiple onChange={handleFileUpload} className="hidden" accept="image/*,video/*,.pdf" />
          </label>
        </div>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-error/10 border border-error/30 text-error'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search media..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="application/pdf">PDFs</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Media Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div key={item.id} className="group relative bg-surface rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
              <div className="aspect-square bg-background flex items-center justify-center overflow-hidden">
                {isImage(item.mime_type) ? (
                  <img 
                    src={getFileUrl(item)} 
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover"
                  />
                ) : item.mime_type?.startsWith('video/') ? (
                  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-primary">
                    <Video className="w-8 h-8" />
                    <span className="text-[10px] mt-1 text-slate-400 font-mono font-bold">VIDEO</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-red-500/10 flex flex-col items-center justify-center text-red-500">
                    <FileText className="w-8 h-8 text-red-500" />
                    <span className="text-[10px] mt-1 text-red-400 font-mono font-bold">PDF</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => handleDownload(item)}
                  className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setDeleteConfirm(item)}
                  className="p-2 bg-error/20 rounded-lg text-error hover:bg-error/30 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="p-2">
                <p className="text-xs text-text-primary truncate">{item.original_name}</p>
                <p className="text-xs text-text-muted">{(item.file_size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">File</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Uploaded</th>
                  <th className="w-12 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {media.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {isImage(item.mime_type) ? (
                          <img 
                            src={getFileUrl(item)} 
                            alt={item.alt_text || item.original_name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        ) : item.mime_type?.startsWith('video/') ? (
                          <div className="w-12 h-12 rounded bg-slate-900 flex items-center justify-center text-primary">
                            <Video className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                            <FileText className="w-6 h-6 text-red-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-text-primary truncate max-w-xs">{item.original_name}</p>
                          {item.alt_text && <p className="text-sm text-text-muted truncate max-w-xs">{item.alt_text}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{item.mime_type}</td>
                    <td className="px-6 py-4 text-text-secondary">{(item.file_size / 1024).toFixed(1)} KB</td>
                    <td className="px-6 py-4 text-text-secondary">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveMenu(activeMenu === item.id ? null : item.id)
                          }}
                          className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        {activeMenu === item.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveMenu(null)}
                            />
                            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-20">
                              <button 
                                onClick={() => { handleView(item); setActiveMenu(null) }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button 
                                onClick={() => { handleCopyLink(item); setActiveMenu(null) }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                              >
                                <Copy className="w-4 h-4" />
                                Copy Link
                              </button>
                              <button 
                                onClick={() => { handleDownload(item); setActiveMenu(null) }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                              <button 
                                onClick={() => { setDeleteConfirm(item); setActiveMenu(null) }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-error hover:bg-error/10 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {media.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ImageIcon className="w-16 h-16 text-text-muted mb-4" />
          <p className="text-text-secondary mb-2">No media found</p>
          <p className="text-text-muted text-sm">Upload files to get started</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} files
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/80 transition-colors"
            >
              Previous
            </button>
            <span className="text-text-primary">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/80 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">Delete Media</h3>
              <p className="text-text-secondary mb-4">
                Are you sure you want to delete "{deleteConfirm.original_name}"? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Media
