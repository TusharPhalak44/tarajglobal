import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  Loader2, 
  X,
  UploadCloud,
  Images,
  Edit2,
  Calendar,
  Sparkles,
  Tag,
  Palette,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { api } from '@api/index'
import SEO from '@components/common/SEO'
import PageHeader from '@components/admin/PageHeader'
import EmptyState from '@components/admin/EmptyState'
import LoadingSkeleton from '@components/admin/LoadingSkeleton'
import ConfirmModal from '@components/admin/ConfirmModal'

export default function CareerGalleryAdmin() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [viewingPhotosEvent, setViewingPhotosEvent] = useState(null)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' })
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: 'event', id: null, title: '' })

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage({ text: '', type: 'success' }), 4000)
  }

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tag: '',
    quarter: '',
    description: '',
    color: '#00A6FF'
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await api.get('/career-gallery')
      if (res.data?.success) {
        setEvents(res.data.data || [])
      } else if (Array.isArray(res.data)) {
        setEvents(res.data)
      }
    } catch (error) {
      console.error('Error fetching gallery events:', error)
      showToast('Failed to load gallery events', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setSelectedFiles(prev => [...prev, ...files])
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviews])
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const openModal = (event = null) => {
    if (event) {
      setSelectedEvent(event)
      setFormData({
        title: event.title || '',
        category: event.category || '',
        tag: event.tag || '',
        quarter: event.quarter || '',
        description: event.desc || event.description || '',
        color: event.color || '#00A6FF'
      })
    } else {
      setSelectedEvent(null)
      setFormData({
        title: '',
        category: '',
        tag: '',
        quarter: '',
        description: '',
        color: '#00A6FF'
      })
    }
    setSelectedFiles([])
    setPreviewUrls([])
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
    setSelectedFiles([])
    setPreviewUrls([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title?.trim()) {
      return showToast('Event title is required', 'error')
    }

    try {
      setIsSubmitting(true)
      let eventId = selectedEvent?.id

      // 1. Create Event if new, else Update
      if (!selectedEvent) {
        const createRes = await api.post('/career-gallery', formData)
        eventId = createRes.data?.data?.id || createRes.data?.id
      } else {
        await api.put(`/career-gallery/${eventId}`, formData)
      }
      
      // 2. Upload Photos if any
      if (selectedFiles.length > 0 && eventId) {
        const formDataToUpload = new FormData()
        selectedFiles.forEach(file => {
          formDataToUpload.append('files', file)
        })

        const uploadRes = await api.post('/upload/multiple', formDataToUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        if (uploadRes.data?.success) {
          const uploadedPaths = uploadRes.data.files.map(f => f.path.replace(/\\/g, '/'))
          
          const photosToSave = uploadedPaths.map(path => ({
            src: `/${path}`,
            title: '',
            caption: '',
            tag: formData.tag,
            date: formData.quarter
          }))

          await api.post(`/career-gallery/${eventId}/photos`, { photos: photosToSave })
        }
      }

      showToast(selectedEvent ? 'Event updated successfully' : 'Event created successfully', 'success')
      closeModal()
      fetchEvents()
    } catch (error) {
      console.error('Submit error:', error)
      showToast(error.response?.data?.message || 'Failed to save event', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdatePhoto = async (e) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await api.put(`/career-gallery/photos/${editingPhoto.id}`, {
        title: editingPhoto.title,
        caption: editingPhoto.caption,
        tag: editingPhoto.tag
      })
      
      showToast('Photo updated successfully', 'success')
      
      setViewingPhotosEvent(prev => ({
        ...prev,
        photos: prev.photos.map(p => p.id === editingPhoto.id ? editingPhoto : p)
      }))
      
      setEditingPhoto(null)
      fetchEvents()
    } catch (error) {
      console.error('Photo update error:', error)
      showToast('Failed to update photo', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const executeDelete = async () => {
    if (!deleteConfirm.id) return
    try {
      if (deleteConfirm.type === 'event') {
        await api.delete(`/career-gallery/${deleteConfirm.id}`)
        showToast('Gallery event deleted successfully', 'success')
        fetchEvents()
      } else if (deleteConfirm.type === 'photo') {
        await api.delete(`/career-gallery/photos/${deleteConfirm.id}`)
        showToast('Photo deleted successfully', 'success')
        if (viewingPhotosEvent) {
          setViewingPhotosEvent(prev => ({
            ...prev,
            photos: prev.photos.filter(p => p.id !== deleteConfirm.id)
          }))
        }
        fetchEvents()
      }
      setDeleteConfirm({ open: false, type: 'event', id: null, title: '' })
    } catch (error) {
      console.error('Delete error:', error)
      showToast('Failed to delete item', 'error')
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <SEO title="Career Gallery | Admin Dashboard" noIndex />
      
      <PageHeader
        title="Career Gallery Engine"
        subtitle="Manage cultural events, office milestones, and team photos for the careers portal"
        badge="Media Hub"
        actions={[
          {
            label: 'Create Event',
            icon: Plus,
            onClick: () => openModal(),
            variant: 'primary'
          }
        ]}
      />

      {/* Toast Notification */}
      {toastMessage.text && (
        <div
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-base font-medium transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {toastMessage.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton type="card" count={4} />
      ) : events.length === 0 ? (
        <EmptyState
          title="No Gallery Events Found"
          description="Create your first team event or celebration to showcase your company culture on the careers page."
          actionLabel="Create Event"
          onAction={() => openModal()}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event.id}
              className="admin-card overflow-hidden group hover:border-primary/50 transition-all flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-background dark:bg-[#07090E]">
                <img 
                  src={event.cover} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = '/pk2.jpeg' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-80" />
                
                {/* Floating Quick Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button 
                    onClick={() => setViewingPhotosEvent(event)}
                    className="p-2 rounded-lg bg-background dark:bg-black/60 backdrop-blur text-white hover:bg-primary transition-colors"
                    title="View All Photos"
                  >
                    <Images className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal(event)}
                    className="p-2 rounded-lg bg-background dark:bg-black/60 backdrop-blur text-white hover:bg-primary transition-colors"
                    title="Edit Event"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm({ open: true, type: 'event', id: event.id, title: event.title })}
                    className="p-2 rounded-lg bg-background dark:bg-black/60 backdrop-blur text-white hover:bg-rose-500 transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-background dark:bg-black/70 backdrop-blur text-white text-sm font-mono font-bold flex items-center gap-2">
                    <ImageIcon className="w-3 h-3 text-primary" />
                    <span>{event.photoCount || event.photos?.length || 0} Assets</span>
                  </span>
                  {event.quarter && (
                    <span className="px-2 py-0.5 rounded-md bg-surface/90 dark:bg-white/10 backdrop-blur text-text-secondary text-[13px] font-mono">
                      {event.quarter}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {event.category && (
                      <span className="text-[12px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-primary/30 dark:bg-primary/10 text-primary border border-primary/20">
                        {event.category}
                      </span>
                    )}
                    {event.tag && (
                      <span className="text-[12px] font-mono text-text-muted">
                        #{event.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-text-primary text-base truncate" title={event.title}>
                    {event.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mt-1 leading-relaxed">
                    {event.desc || event.description || 'No description provided.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--admin-border)] flex items-center justify-between">
                  <button
                    onClick={() => setViewingPhotosEvent(event)}
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Photo Album</span>
                    <Images className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openModal(event)}
                    className="text-sm text-text-muted hover:text-text-primary"
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Event Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[var(--admin-border)]">
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  {selectedEvent ? 'Edit Gallery Event' : 'Create Gallery Event'}
                </h2>
                <p className="text-sm text-text-muted mt-0.5">Configure event title, category, theme, and photo reel</p>
              </div>
              <button onClick={closeModal} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form id="event-form" onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Annual Revenue Acceleration Summit"
                    className="admin-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Category Taxonomy
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. RnR, Team Life, Hackathon"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Theme Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="h-10 w-12 p-1 rounded-xl bg-[var(--admin-bg)] border border-[var(--admin-border)] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      readOnly
                      className="admin-input font-mono text-sm flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Search Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    placeholder="e.g. Celebration, Leadership"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Quarter / Milestone Date
                  </label>
                  <input
                    type="text"
                    name="quarter"
                    value={formData.quarter}
                    onChange={handleInputChange}
                    placeholder="e.g. Q1 2026"
                    className="admin-input font-mono text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Event Narrative / Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="admin-textarea text-sm"
                    placeholder="Highlight the accomplishments, activities, and team members involved in this event..."
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Upload Photos to Event Album
                  </label>
                  <span className="text-sm font-mono text-primary font-bold">{selectedFiles.length} files selected</span>
                </div>
                
                <div className="relative border-2 border-dashed border-[var(--admin-border)] hover:border-primary/50 rounded-2xl p-6 transition-colors bg-[var(--admin-bg)] text-center cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-text-primary text-base font-semibold">Click or drop high-res event photos here</p>
                  <p className="text-sm text-text-muted mt-1 font-mono">PNG, JPG, WEBP (Max 5MB each)</p>
                </div>

                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 mt-3">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--admin-border)] group bg-background dark:bg-black/10">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 p-1 bg-background dark:bg-black/70 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[var(--admin-bg)] border border-[var(--admin-border)] flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-btn-primary flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving Event...
                    </>
                  ) : (
                    <>
                      {selectedEvent ? 'Save Changes' : 'Publish Event'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Photos Modal */}
      {viewingPhotosEvent && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-5xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[var(--admin-border)]">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {viewingPhotosEvent.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-primary/30 dark:bg-primary/10 text-primary font-mono font-bold text-sm">
                    {viewingPhotosEvent.category || 'General'}
                  </span>
                  <span className="text-sm text-text-muted">
                    {viewingPhotosEvent.photos?.length || 0} Photos in Album
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewingPhotosEvent(null)}
                className="admin-btn-icon"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {viewingPhotosEvent.photos && viewingPhotosEvent.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                  {viewingPhotosEvent.photos.map((photo, index) => (
                    <div key={photo.id || index} className="group relative aspect-square rounded-xl overflow-hidden border border-[var(--admin-border)] bg-background dark:bg-[#07090E]">
                      <img 
                        src={photo.src} 
                        alt={photo.title || `Photo ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingPhoto(photo) }}
                          className="p-2 bg-background dark:bg-black/60 backdrop-blur rounded-md text-white hover:bg-primary transition-colors"
                          title="Edit Photo Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteConfirm({ open: true, type: 'photo', id: photo.id, title: photo.title || `Photo #${index + 1}` })
                          }}
                          className="p-2 bg-background dark:bg-black/60 backdrop-blur rounded-md text-white hover:bg-rose-500 transition-colors"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.title && (
                          <h4 className="text-text-primary dark:text-white text-sm font-bold line-clamp-1">{photo.title}</h4>
                        )}
                        {photo.caption && (
                          <p className="text-text-secondary dark:text-white/70 text-[12px] line-clamp-1">{photo.caption}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No Photos in Event Album"
                  description="Upload event photographs to make this album shine."
                  actionLabel="Add Photos"
                  onAction={() => {
                    const evt = viewingPhotosEvent
                    setViewingPhotosEvent(null)
                    openModal(evt)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Single Photo Modal */}
      {editingPhoto && (
        <div className="admin-modal-backdrop" style={{ zIndex: 60 }}>
          <div className="admin-modal-content max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-[var(--admin-border)]">
              <h3 className="text-base font-bold text-text-primary">Edit Photo Metadata</h3>
              <button onClick={() => setEditingPhoto(null)} className="admin-btn-icon">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-background dark:bg-black/10 border border-[var(--admin-border)]">
                <img src={editingPhoto.src} alt="Editing preview" className="w-full h-full object-contain" />
              </div>
              
              <form id="photo-form" onSubmit={handleUpdatePhoto} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.title || ''}
                    onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})}
                    placeholder="e.g. Leadership Keynote"
                    className="admin-input text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Caption
                  </label>
                  <textarea
                    value={editingPhoto.caption || ''}
                    onChange={(e) => setEditingPhoto({...editingPhoto, caption: e.target.value})}
                    rows={2}
                    placeholder="Brief description of the moment..."
                    className="admin-textarea text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.tag || ''}
                    onChange={(e) => setEditingPhoto({...editingPhoto, tag: e.target.value})}
                    placeholder="e.g. Keynote, Awards"
                    className="admin-input text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[var(--admin-border)]">
                  <button
                    type="button"
                    onClick={() => setEditingPhoto(null)}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="admin-btn-primary flex items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        title={deleteConfirm.type === 'event' ? 'Delete Gallery Event' : 'Delete Photo'}
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ open: false, type: 'event', id: null, title: '' })}
      />
    </div>
  )
}
