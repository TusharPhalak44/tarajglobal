import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
    color: '#F97316'
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
        color: event.color || '#F97316'
      })
    } else {
      setSelectedEvent(null)
      setFormData({
        title: '',
        category: '',
        tag: '',
        quarter: '',
        description: '',
        color: '#F97316'
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
    <div className="admin-page-container relative min-h-screen bg-[#F8FAFC] dark:bg-[#07090E] overflow-hidden">
      <SEO title="Career Gallery | Admin Dashboard" noIndex />



      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 sm:mb-10 bg-white/60 dark:bg-[#121622]/60 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none mt-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F97316]/10 to-[#EA580C]/10 border border-[#F97316]/20 mb-4">
              <Sparkles size={14} className="text-[#F97316]" />
              <span className="text-xs font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#EA580C] uppercase tracking-widest">
                Culture & Career Gallery
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Event <span className="font-light italic text-slate-400 dark:text-slate-500">Albums</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium max-w-xl">
              Curate the visual narrative of Taraj Global's culture, summits, and milestones.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-2xl font-bold text-sm shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus size={20} className="relative z-10" />
            <span className="relative z-10">Create New Album</span>
          </motion.button>
        </motion.div>

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
        <div className="mt-8">
          <LoadingSkeleton type="grid" count={4} />
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          title="No Gallery Events Found"
          description="Create your first team event or celebration to showcase your company culture on the careers page."
          actionLabel="Create Event"
          onAction={() => openModal()}
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 relative z-10 mt-8"
        >
          {events.map((event, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={event.id} 
              className="group flex flex-col bg-white/70 dark:bg-[#121622]/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-[2rem] overflow-hidden hover:border-[#F97316]/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] hover:-translate-y-2"
            >
              <div 
                className="relative h-56 sm:h-64 w-full bg-slate-100 dark:bg-[#07090E] overflow-hidden"
              >
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-10"
                  style={{ background: `linear-gradient(to top right, ${event.color || '#F97316'}, transparent)` }}
                />
                
                <img 
                  src={event.cover || (event.photos && event.photos[0] ? event.photos[0].src : '/pk2.jpeg')} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = '/pk2.jpeg' }}
                />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-20">
                  <button 
                    onClick={() => openModal(event)}
                    className="p-2.5 rounded-xl bg-white/20 dark:bg-black/40 backdrop-blur-md text-slate-900 dark:text-white hover:bg-white dark:hover:bg-[#F97316] transition-colors shadow-lg"
                    title="Edit Event"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm({ open: true, type: 'event', id: event.id, title: event.title })}
                    className="p-2.5 rounded-xl bg-white/20 dark:bg-black/40 backdrop-blur-md text-slate-900 dark:text-white hover:bg-rose-500 dark:hover:bg-rose-500 hover:text-white transition-colors shadow-lg"
                    title="Delete Event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                  <span className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-black/60 backdrop-blur-md text-slate-900 dark:text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm border border-white/20">
                    <ImageIcon size={14} className="text-[#F97316]" />
                    <span>{event.photoCount || event.photos?.length || 0} Assets</span>
                  </span>
                  {event.quarter && (
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 dark:bg-white/10 backdrop-blur-md text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm border border-white/10">
                      {event.quarter}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {event.category && (
                      <span 
                        className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md border"
                        style={{ 
                          color: event.color || '#F97316', 
                          borderColor: `${event.color}40` || '#F9731640',
                          backgroundColor: `${event.color}10` || '#F9731610' 
                        }}
                      >
                        {event.category}
                      </span>
                    )}
                    {event.tag && (
                      <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
                        #{event.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight leading-snug mb-2 group-hover:text-[#F97316] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {event.desc || event.description || 'No description provided.'}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
                  <button
                    onClick={() => setViewingPhotosEvent(event)}
                    className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#F97316]/10 hover:text-[#F97316] dark:hover:bg-[#F97316]/20 dark:hover:text-[#F97316] text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Manage Album Photos</span>
                    <Images size={16} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Create / Edit Event Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-4xl bg-white/90 dark:bg-[#121622]/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-black/50 border border-slate-200/50 dark:border-white/10 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 sm:px-8 sm:py-6 border-b border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-black/20">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedEvent ? 'Edit Gallery Event' : 'Create New Event Album'}
                </h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Configure event details and visual assets.</p>
              </div>
              <button onClick={closeModal} className="p-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-slate-900 dark:hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form id="event-form" onSubmit={handleSubmit} className="p-6 sm:px-8 sm:py-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Annual Revenue Acceleration Summit"
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Category Taxonomy
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. RnR, Team Life, Hackathon"
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Theme Accent Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <div className="relative w-14 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/10 cursor-pointer">
                      <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="absolute inset-[-10px] w-20 h-20 cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.color}
                      readOnly
                      className="flex-1 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white font-mono uppercase focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Search Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    placeholder="e.g. Celebration, Leadership"
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Quarter / Milestone Date
                  </label>
                  <input
                    type="text"
                    name="quarter"
                    value={formData.quarter}
                    onChange={handleInputChange}
                    placeholder="e.g. Q1 2026"
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 font-mono focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all shadow-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Event Narrative / Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all shadow-sm custom-scrollbar"
                    placeholder="Highlight the accomplishments, activities, and team members involved in this event..."
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Upload Photos to Event Album
                  </label>
                  <span className="text-xs font-mono text-[#F97316] font-bold bg-[#F97316]/10 px-2.5 py-1 rounded-md border border-[#F97316]/20">
                    {selectedFiles.length} files selected
                  </span>
                </div>
                
                <div className="relative group overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-[#F97316] dark:hover:border-[#F97316] rounded-[2rem] p-8 transition-all duration-300 bg-slate-50/50 dark:bg-white/5 text-center cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <UploadCloud className="w-10 h-10 text-[#F97316] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-slate-900 dark:text-white text-base font-bold relative z-10">Click or drop high-res event photos here</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium relative z-10">PNG, JPG, WEBP (Max 5MB each)</p>
                </div>

                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group shadow-sm bg-slate-100 dark:bg-black/20">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-rose-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-lg"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
            
            <div className="p-6 sm:px-8 sm:py-6 border-t border-slate-200/50 dark:border-white/10 bg-slate-50/50 dark:bg-black/20 flex justify-end gap-3 mt-auto">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-3 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="event-form"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    {selectedEvent ? 'Save Changes' : 'Publish Event'}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Premium View Photos Modal */}
      {viewingPhotosEvent && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-[1400px] max-h-[90vh] bg-white/80 dark:bg-[#121622]/90 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-black/50 border border-slate-200/50 dark:border-white/10 flex flex-col overflow-hidden relative"
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:px-8 sm:py-6 border-b border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-black/20">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto pr-10 sm:pr-0">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: `${viewingPhotosEvent.color || '#F97316'}20`, color: viewingPhotosEvent.color || '#F97316' }}
                >
                  <Images size={20} className="sm:hidden" />
                  <Images size={24} className="hidden sm:block" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                    {viewingPhotosEvent.title}
                  </h2>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5 flex-wrap">
                    <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                      {viewingPhotosEvent.category || 'General'}
                    </span>
                    <span className="text-[12px] sm:text-[13px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shrink-0">
                      <ImageIcon size={14} />
                      {viewingPhotosEvent.photos?.length || 0} Assets
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingPhotosEvent(null)}
                className="absolute top-4 right-4 sm:static p-2.5 sm:p-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Photos Grid */}
            <div className="p-4 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
              {viewingPhotosEvent.photos && viewingPhotosEvent.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {viewingPhotosEvent.photos.map((photo, index) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      key={photo.id || index} 
                      className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/40 shadow-sm hover:shadow-xl hover:border-[#F97316]/50 transition-all duration-300"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title || `Photo ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingPhoto(photo) }}
                          className="p-2.5 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-xl text-white hover:bg-[#F97316] shadow-lg transition-colors"
                          title="Edit Details"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteConfirm({ open: true, type: 'photo', id: photo.id, title: photo.title || `Photo #${index + 1}` })
                          }}
                          className="p-2.5 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-xl text-white hover:bg-rose-500 shadow-lg transition-colors"
                          title="Delete Photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                        {photo.title && (
                          <h4 className="text-white text-sm font-bold truncate drop-shadow-md">{photo.title}</h4>
                        )}
                        {photo.caption && (
                          <p className="text-white/80 text-[11px] line-clamp-2 mt-1 leading-snug drop-shadow-md">{photo.caption}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Album is Empty"
                  description="Upload breathtaking event photographs to showcase this moment."
                  actionLabel="Upload Photos"
                  onAction={() => {
                    const evt = viewingPhotosEvent
                    setViewingPhotosEvent(null)
                    openModal(evt)
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Edit Single Photo Modal */}
      {editingPhoto && createPortal(
        <div className="admin-modal-backdrop" style={{ zIndex: 110 }}>
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
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && createPortal(
        <ConfirmModal
          isOpen={deleteConfirm.open}
          title={deleteConfirm.type === 'event' ? 'Delete Gallery Event' : 'Delete Photo'}
          message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          variant="danger"
          onConfirm={executeDelete}
          onCancel={() => setDeleteConfirm({ open: false, type: 'event', id: null, title: '' })}
        />,
        document.body
      )}
      </div>
    </div>
  )
}
