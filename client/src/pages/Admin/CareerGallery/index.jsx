import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  Loader2, 
  X,
  UploadCloud,
  Eye,
  Images,
  Edit2
} from 'lucide-react'
import { api } from '@api/index'
import SEO from '@components/common/SEO'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function CareerGalleryAdmin() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [viewingPhotosEvent, setViewingPhotosEvent] = useState(null)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' })

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
      if (res.data.success) {
        setEvents(res.data.data)
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
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setSelectedFiles(prev => [...prev, ...files])
    
    // Create preview URLs
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
        title: event.title,
        category: event.category,
        tag: event.tag,
        quarter: event.quarter,
        description: event.desc,
        color: event.color
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
    if (!formData.title) {
      return showToast('Title is required', 'error')
    }

    try {
      setIsSubmitting(true)

      let eventId = selectedEvent?.id

      // 1. Create Event if new, else Update
      if (!selectedEvent) {
        const createRes = await api.post('/career-gallery', formData)
        eventId = createRes.data.data.id
      } else {
        await api.put(`/career-gallery/${eventId}`, formData)
      }
      
      // 2. Upload Photos if any
      if (selectedFiles.length > 0) {
        const formDataToUpload = new FormData()
        selectedFiles.forEach(file => {
          formDataToUpload.append('files', file)
        })

        const uploadRes = await api.post('/upload/multiple', formDataToUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        if (uploadRes.data.success) {
          const uploadedPaths = uploadRes.data.files.map(f => f.path.replace(/\\/g, '/'))
          
          // Format for API
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

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event and all its photos?')) return

    try {
      setLoading(true)
      await api.delete(`/career-gallery/${id}`)
      showToast('Event deleted successfully', 'success')
      fetchEvents()
    } catch (error) {
      console.error('Delete error:', error)
      showToast('Failed to delete event', 'error')
      setLoading(false)
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
      
      // Update the photo in the current viewingPhotosEvent to reflect changes immediately
      setViewingPhotosEvent(prev => ({
        ...prev,
        photos: prev.photos.map(p => p.id === editingPhoto.id ? editingPhoto : p)
      }))
      
      setEditingPhoto(null)
      fetchEvents() // refresh background grid
    } catch (error) {
      console.error('Photo update error:', error)
      showToast('Failed to update photo', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return
    try {
      await api.delete(`/career-gallery/photos/${photoId}`)
      showToast('Photo deleted successfully', 'success')
      
      // Update local state
      setViewingPhotosEvent(prev => ({
        ...prev,
        photos: prev.photos.filter(p => p.id !== photoId)
      }))
      fetchEvents()
    } catch (error) {
      console.error('Photo delete error:', error)
      showToast('Failed to delete photo', 'error')
    }
  }

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto custom-scrollbar">
      <SEO title="Career Gallery | Admin Dashboard" noIndex />
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(128,128,128,0.1);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(128,128,128,0.3);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(128,128,128,0.5);
        }
      `}</style>
      
      {/* Toast Notification */}
      {toastMessage.text && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl animate-fade-in text-sm font-medium border ${
          toastMessage.type === 'error'
            ? 'bg-red-600 text-white border-red-500/30'
            : 'bg-primary text-white border-white/20'
        }`}>
          {toastMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-white" />
          )}
          {toastMessage.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Career Gallery</h1>
          <p className="text-text-secondary mt-1">Manage events and photos for the Careers page gallery</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Create Event
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-xl border border-border">
          <ImageIcon className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-text-secondary">No gallery events found</h3>
          <p className="text-text-muted mt-2">Create your first event to showcase on the Careers page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-surface rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all group"
            >
              <div className="aspect-video relative overflow-hidden bg-black/5">
                <img 
                  src={event.cover} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.src = '/pk2.jpeg' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setViewingPhotosEvent(event)}
                    className="p-1.5 bg-white/10 backdrop-blur rounded-md text-white hover:bg-primary transition-colors"
                    title="View All Photos"
                  >
                    <Images size={16} />
                  </button>
                  <button 
                    onClick={() => openModal(event)}
                    className="p-1.5 bg-white/10 backdrop-blur rounded-md text-white hover:bg-primary transition-colors"
                    title="Edit Event"
                  >
                    <Plus size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1.5 bg-white/10 backdrop-blur rounded-md text-white hover:bg-error transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur rounded-md text-white text-xs font-mono">
                  <ImageIcon size={12} />
                  <span>{event.photoCount}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-primary">{event.num}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-xs text-text-muted uppercase tracking-wider">{event.category}</span>
                </div>
                <h3 className="font-bold text-text-primary mb-1 truncate" title={event.title}>{event.title}</h3>
                <p className="text-sm text-text-secondary line-clamp-2">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold text-text-primary">
                  {selectedEvent ? 'Edit Event' : 'Create Gallery Event'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <form id="event-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-sm font-medium text-text-secondary">Event Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Q1 Annual Gala"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-secondary">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g. RnR, Office Life"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-secondary">Theme Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          name="color"
                          value={formData.color}
                          onChange={handleInputChange}
                          className="h-10 w-10 p-1 bg-background border border-border rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.color}
                          readOnly
                          className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-secondary">Tag</label>
                      <input
                        type="text"
                        name="tag"
                        value={formData.tag}
                        onChange={handleInputChange}
                        placeholder="e.g. Celebration"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-secondary">Quarter / Date Info</label>
                      <input
                        type="text"
                        name="quarter"
                        value={formData.quarter}
                        onChange={handleInputChange}
                        placeholder="e.g. Q1 2026"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-sm font-medium text-text-secondary">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-text-secondary flex items-center justify-between">
                      <span>Upload Photos</span>
                      <span className="text-xs text-text-muted">{selectedFiles.length} selected</span>
                    </label>
                    
                    <div className="relative border-2 border-dashed border-border rounded-xl p-8 hover:border-primary/50 transition-colors bg-background text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <UploadCloud className="w-10 h-10 text-text-muted mx-auto mb-3" />
                      <p className="text-text-primary font-medium">Click or drag images to upload</p>
                      <p className="text-sm text-text-muted mt-1">Supports JPG, PNG, WEBP (Max 5MB each)</p>
                    </div>

                    {previewUrls.length > 0 && (
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mt-4">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border bg-background/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-lg text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="event-form"
                  disabled={isSubmitting || (selectedEvent && selectedFiles.length === 0)}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {selectedEvent ? 'Save Changes' : 'Create Event'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Photos Modal */}
      <AnimatePresence>
        {viewingPhotosEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingPhotosEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-background/50">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    {viewingPhotosEvent.title}
                  </h2>
                  <p className="text-text-secondary mt-1 flex items-center gap-2 text-sm">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono font-bold text-xs">
                      {viewingPhotosEvent.category}
                    </span>
                    <span>{viewingPhotosEvent.photos?.length || 0} Photos</span>
                  </p>
                </div>
                <button
                  onClick={() => setViewingPhotosEvent(null)}
                  className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
                {viewingPhotosEvent.photos && viewingPhotosEvent.photos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {viewingPhotosEvent.photos.map((photo, index) => (
                      <div key={photo.id || index} className="group relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-black/5">
                        <img 
                          src={photo.src} 
                          alt={photo.title || `Photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setEditingPhoto(photo) }}
                            className="p-1.5 bg-white/20 backdrop-blur rounded-md text-white hover:bg-primary transition-colors"
                            title="Edit Photo"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeletePhoto(photo.id) }}
                            className="p-1.5 bg-white/20 backdrop-blur rounded-md text-white hover:bg-error transition-colors"
                            title="Delete Photo"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {photo.title && (
                            <h4 className="text-white text-xs font-bold line-clamp-1 mb-0.5">{photo.title}</h4>
                          )}
                          {photo.caption && (
                            <p className="text-white/80 text-[10px] line-clamp-2 leading-tight">{photo.caption}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Images className="w-16 h-16 text-text-muted opacity-30 mb-4" />
                    <h3 className="text-lg font-medium text-text-secondary">No Photos Uploaded</h3>
                    <p className="text-sm text-text-muted mt-1">This event doesn't have any photos yet.</p>
                    <button 
                      onClick={() => {
                        const evt = viewingPhotosEvent
                        setViewingPhotosEvent(null)
                        openModal(evt)
                      }}
                      className="mt-6 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors"
                    >
                      Add Photos Now
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Photo Modal */}
      <AnimatePresence>
        {editingPhoto && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingPhoto(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="text-lg font-bold text-text-primary">Edit Photo Details</h2>
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/5 mb-5">
                  <img src={editingPhoto.src} alt="Editing preview" className="w-full h-full object-contain" />
                </div>
                
                <form id="photo-form" onSubmit={handleUpdatePhoto} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-secondary">Title (Optional)</label>
                    <input
                      type="text"
                      value={editingPhoto.title || ''}
                      onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})}
                      placeholder="e.g. CEO Keynote"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-secondary">Caption (Optional)</label>
                    <textarea
                      value={editingPhoto.caption || ''}
                      onChange={(e) => setEditingPhoto({...editingPhoto, caption: e.target.value})}
                      rows="2"
                      placeholder="e.g. Giving an inspiring speech..."
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-secondary">Tag (Optional)</label>
                    <input
                      type="text"
                      value={editingPhoto.tag || ''}
                      onChange={(e) => setEditingPhoto({...editingPhoto, tag: e.target.value})}
                      placeholder="e.g. Highlight"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </form>
              </div>

              <div className="p-5 border-t border-border bg-background/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 rounded-lg text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="photo-form"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  Save Photo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
