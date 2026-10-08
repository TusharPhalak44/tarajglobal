import React, { useEffect, useState } from 'react'
import { 
  Upload, 
  Search, 
  Trash2, 
  Download, 
  Image as ImageIcon, 
  Grid, 
  List, 
  Copy, 
  X, 
  CheckCircle2, 
  FileVideo 
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import EmptyState from '@components/admin/EmptyState'
import ConfirmModal from '@components/admin/ConfirmModal'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Media = () => {
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ type: '', search: '' })
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [uploading, setUploading] = useState(false)
  const [previewItem, setPreviewItem] = useState(null)

  useEffect(() => {
    fetchMedia()
  }, [filters.type, pagination.page])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedia()
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.search])

  const fetchMedia = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getMedia({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      const mediaData = response.data?.data?.media || response.data?.media || response.data || []
      const paginationData = response.data?.data?.pagination || response.data?.pagination || pagination
      setMedia(Array.isArray(mediaData) ? mediaData : [])
      setPagination(paginationData)
    } catch (error) {
      console.error('Failed to fetch media:', error)
      setMessage({ type: 'error', text: 'Failed to load media assets.' })
      setMedia([])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        await adminAPI.uploadMedia(formData)
        setMessage({ type: 'success', text: `"${file.name}" uploaded successfully.` })
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      } catch (error) {
        console.error('Failed to upload file:', error)
        setMessage({ type: 'error', text: `Failed to upload "${file.name}"` })
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      }
    }
    setUploading(false)
    fetchMedia()
  }

  const handleCopyLink = (item) => {
    const fullUrl = item.file_url?.startsWith('http') ? item.file_url : `http://localhost:5001${item.file_url}`
    navigator.clipboard.writeText(fullUrl).then(() => {
      setMessage({ type: 'success', text: 'Asset URL copied.' })
      setTimeout(() => setMessage({ type: '', text: '' }), 2500)
    })
  }

  const handleDownload = async (item) => {
    try {
      const fullUrl = item.file_url?.startsWith('http') ? item.file_url : `http://localhost:5001${item.file_url}`
      const response = await fetch(fullUrl)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = item.original_name || 'asset'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      alert('Failed to download asset.')
    }
  }

  const handleDeleteMedia = async () => {
    if (!deleteConfirm) return
    try {
      await adminAPI.deleteMedia(deleteConfirm.id)
      if (previewItem?.id === deleteConfirm.id) {
        setPreviewItem(null)
      }
      setDeleteConfirm(null)
      fetchMedia()
      setMessage({ type: 'success', text: 'Asset deleted permanently.' })
      setTimeout(() => setMessage({ type: '', text: '' }), 2500)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete asset')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Vault"
        subtitle="Manage brand digital assets, photography, logos, and documents."
        breadcrumbs={[{ label: 'Media Vault' }]}
        onRefresh={fetchMedia}
        isRefreshing={loading}
        actions={
          <label className="admin-btn admin-btn-primary shadow-md cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Asset'}</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        }
      />

      {message.text && (
        <div className={`p-3.5 rounded-xl text-sm flex items-center justify-between shadow-sm ${
          message.type === 'success' 
            ? 'bg-[var(--admin-bg-surface)] text-[var(--admin-success)] border border-[var(--admin-success)]' 
            : 'bg-[var(--admin-bg-surface)] text-[var(--admin-danger)] border border-[var(--admin-danger)]'
        }`}>
          <div className="flex items-center gap-2 font-semibold">
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage({ type: '', text: '' })}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and View Mode Switcher */}
      <div className="admin-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search media files..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="admin-input pl-10 pr-8 w-full"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="admin-select min-w-[140px]"
          >
            <option value="">All Formats</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="pdf">Documents</option>
          </select>

          <div className="flex items-center p-1 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] font-bold' : 'text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]'
              }`}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] font-bold' : 'text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid / List */}
      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : media.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="Media library is empty"
          description="Upload marketing media, assets, or documents to populate your vault."
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => {
            const fullUrl = item.file_url?.startsWith('http') ? item.file_url : `http://localhost:5001${item.file_url}`
            const isVideo = item.file_type?.includes('video') || item.file_url?.endsWith('.mp4')

            return (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className="admin-card overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="aspect-square bg-[var(--admin-bg-elevated)] relative overflow-hidden flex items-center justify-center">
                  {isVideo ? (
                    <div className="flex flex-col items-center justify-center text-[var(--admin-text-muted)]">
                      <FileVideo className="w-5 h-5 mb-1 text-[var(--admin-primary)]" />
                      <span className="text-[12px] font-bold">Video</span>
                    </div>
                  ) : item.file_url ? (
                    <img
                      src={fullUrl}
                      alt={item.original_name || 'Media'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<div class="p-3 text-center text-sm text-[var(--admin-text-muted)]">Preview</div>'
                      }}
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-[var(--admin-text-muted)]" />
                  )}

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-background dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyLink(item)
                      }}
                      className="p-2 rounded-lg bg-[var(--admin-bg-surface)] text-[var(--admin-text-primary)] hover:text-[var(--admin-primary)] shadow-md transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteConfirm(item)
                      }}
                      className="p-2 rounded-lg bg-[var(--admin-bg-surface)] text-[var(--admin-danger)] hover:bg-[var(--admin-danger)] hover:text-text-primary dark:text-white shadow-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[var(--admin-bg-surface)] border-t border-[var(--admin-border-subtle)] flex items-center justify-between text-sm">
                  <p className="font-bold text-[var(--admin-text-primary)] truncate" title={item.original_name}>
                    {item.original_name || `Asset #${item.id}`}
                  </p>
                  <span className="text-[13px] font-medium text-[var(--admin-text-muted)] shrink-0">
                    {item.file_size ? `${Math.round(item.file_size / 1024)}KB` : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {media.map((item) => {
            const fullUrl = item.file_url?.startsWith('http') ? item.file_url : `http://localhost:5001${item.file_url}`

            return (
              <div 
                key={item.id} 
                onClick={() => setPreviewItem(item)}
                className="admin-card p-3 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={fullUrl}
                    alt=""
                    className="w-5 h-5 rounded-lg object-cover bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)] shrink-0"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-bold text-[var(--admin-text-primary)] truncate">
                      {item.original_name || `Asset #${item.id}`}
                    </p>
                    <p className="text-[13px] text-[var(--admin-text-muted)] truncate">
                      {item.file_type || 'image'} • {item.file_size ? `${Math.round(item.file_size / 1024)} KB` : '-'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleCopyLink(item)}
                    className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-primary)] transition-colors"
                    title="Copy Link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(item)}
                    className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item)}
                    className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background dark:bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="fixed inset-0" onClick={() => setPreviewItem(null)} />
          <div className="relative max-w-2xl w-full bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl p-6 z-10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--admin-border-subtle)]">
              <p className="text-base font-bold text-[var(--admin-text-primary)] truncate">
                {previewItem.original_name}
              </p>
              <button onClick={() => setPreviewItem(null)} className="p-1 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[50vh] flex items-center justify-center bg-[var(--admin-bg-elevated)] rounded-xl p-3 overflow-hidden border border-[var(--admin-border-subtle)]">
              <img
                src={previewItem.file_url?.startsWith('http') ? previewItem.file_url : `http://localhost:5001${previewItem.file_url}`}
                alt=""
                className="max-h-[45vh] object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--admin-border-subtle)] text-sm">
              <button
                onClick={() => handleCopyLink(previewItem)}
                className="admin-btn admin-btn-secondary h-8 px-3 text-sm"
              >
                <Copy className="w-4 h-4" />
                <span>Copy URL</span>
              </button>
              <button
                onClick={() => handleDownload(previewItem)}
                className="admin-btn admin-btn-primary h-8 px-3 text-sm shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteMedia}
        title="Delete Media Asset"
        message={`Permanently delete "${deleteConfirm?.original_name}"?`}
        confirmText="Delete Asset"
      />
    </div>
  )
}

export default Media
