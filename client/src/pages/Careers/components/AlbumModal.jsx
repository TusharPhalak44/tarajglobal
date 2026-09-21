import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
  ArrowLeft,
  Camera
} from 'lucide-react'

export const AlbumModal = ({ album, onClose }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const scrollContainerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startYRef = useRef(0)
  const startScrollTopRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const lastWheelTimeRef = useRef(0)

  // Reset internal states when active album changes
  useEffect(() => {
    setSelectedPhotoIndex(null)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [album?.id])

  if (!album) return null

  const photos = album.photos || []
  const filteredPhotos = photos

  // Mouse wheel scrolling anywhere in the modal
  const handleModalWheel = (e) => {
    // If fullscreen lightbox is open, scroll through photos in lightbox
    if (selectedPhotoIndex !== null) {
      const now = Date.now()
      if (now - lastWheelTimeRef.current > 180) {
        lastWheelTimeRef.current = now
        if (e.deltaY > 15) {
          setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)
        } else if (e.deltaY < -15) {
          setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
        }
      }
      return
    }

    // When in gallery grid view, scroll the photo gallery smoothly with mouse wheel
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'auto'
      })
    }
  }

  // Mouse drag / swipe to scroll
  const handleMouseDown = (e) => {
    if (selectedPhotoIndex !== null) return
    if (e.button !== 0) return // Only primary left-click
    isDraggingRef.current = true
    hasDraggedRef.current = false
    startYRef.current = e.clientY
    startScrollTopRef.current = scrollContainerRef.current ? scrollContainerRef.current.scrollTop : 0
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return
    const deltaY = e.clientY - startYRef.current
    if (Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true
    }
    scrollContainerRef.current.scrollTop = startScrollTopRef.current - deltaY
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    setTimeout(() => {
      hasDraggedRef.current = false
    }, 60)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPhotoIndex !== null) {
          setSelectedPhotoIndex(null)
        } else {
          onClose()
        }
      }
      if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowRight') {
          setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)
        }
        if (e.key === 'ArrowLeft') {
          setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
        }
      } else {
        // Grid keyboard scrolling
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ top: 220, behavior: 'smooth' })
        }
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ top: -220, behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex, filteredPhotos, onClose])

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow || 'unset'
    }
  }, [])

  const currentPhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null

  return (
    <>
      {/* Ensure scrollbar is invisible across all browsers while mouse wheel scrolling works 100% */}
      <style>{`
        .hide-modal-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .hide-modal-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999] bg-[#07090E]/95 backdrop-blur-2xl flex flex-col overflow-hidden text-white select-none"
        onClick={onClose}
        onWheel={handleModalWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* ── TOP STICKY HEADER ── */}
        <div
          className="shrink-0 z-20 px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl flex items-center justify-between gap-4 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: Back Button & Active Album Title */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium transition-all hover:scale-102 cursor-pointer border border-white/15 shrink-0 shadow-sm"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back to Careers</span>
            </button>

            <div className="h-5 w-[1px] bg-white/20 hidden sm:block shrink-0" />

            <div className="min-w-0 flex items-center gap-2.5">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shrink-0"
                style={{
                  backgroundColor: `${album.color || '#00A6FF'}20`,
                  color: album.color || '#00A6FF',
                  border: `1px solid ${album.color || '#00A6FF'}40`
                }}
              >
                {album.category || album.tag}
              </span>

              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight truncate">
                {album.title}
              </h2>
            </div>
          </div>

          {/* Right: Photo Counter & Close Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Photo Counter Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
              <Camera size={13} style={{ color: album.color || '#00A6FF' }} />
              <span className="font-bold text-white">{filteredPhotos.length}</span>
              <span className="text-white/60">Photos</span>
            </div>

            {/* Close Modal Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              aria-label="Close album"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── SCROLLABLE ALBUM BODY (FULL WIDTH SCROLL CONTAINER FOR MOUSE WHEEL & DRAG) ── */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          className="flex-1 w-full overflow-y-auto overflow-x-hidden hide-modal-scrollbar cursor-default focus:outline-none"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* ── PHOTO GALLERY GRID (ALL 20-25 PHOTOS VISIBLE) ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5">
              {filteredPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id || idx}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.025, 0.25) }}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 hover:border-white/35 shadow-md hover:shadow-2xl transition-all duration-300 aspect-[4/3] flex flex-col justify-end select-none"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Don't open lightbox if the user was dragging to scroll
                    if (hasDraggedRef.current) return
                    setSelectedPhotoIndex(idx)
                  }}
                >
                  {/* Photo Image */}
                  <img
                    src={photo.src}
                    alt={photo.title || 'Album photo'}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 pointer-events-none select-none"
                    onError={(e) => {
                      e.target.src = album.cover || '/pk2.jpeg'
                    }}
                  />

                  {/* Base Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Photo Number Badge & Zoom Icon */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-white/75 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-xs border border-white/10 group-hover:text-[#00A6FF] transition-colors">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>

                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-md">
                      <Maximize2 size={11} />
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="relative z-10 p-2.5 sm:p-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 pointer-events-none">
                    {photo.tag && (
                      <span
                        className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${album.color || '#00A6FF'}25`,
                          color: album.color || '#00A6FF'
                        }}
                      >
                        {photo.tag}
                      </span>
                    )}
                    <h3 className="text-xs sm:text-[13px] font-semibold text-white truncate drop-shadow-sm leading-snug">
                      {photo.title}
                    </h3>
                    {photo.caption && (
                      <p className="text-[10px] sm:text-[11px] text-white/70 line-clamp-1 mt-0.5 font-normal">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HIGH-RESOLUTION FULLSCREEN LIGHTBOX (MOUSE WHEEL NAVIGATES NEXT / PREV) ── */}
        <AnimatePresence>
          {currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-5 lg:p-6"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              {/* Top Lightbox Bar */}
              <div
                className="flex items-center justify-between gap-4 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase shrink-0"
                    style={{
                      backgroundColor: `${album.color || '#00A6FF'}20`,
                      color: album.color || '#00A6FF',
                      border: `1px solid ${album.color || '#00A6FF'}40`
                    }}
                  >
                    {currentPhoto.tag || album.category}
                  </span>
                  <span className="text-xs font-mono text-white/70 truncate">
                    Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Return to Grid */}
                  <button
                    type="button"
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-all hover:scale-102 cursor-pointer"
                  >
                    <Grid size={13} />
                    <span className="hidden sm:inline">Grid View</span>
                  </button>

                  {/* Close Lightbox */}
                  <button
                    type="button"
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                    aria-label="Close photo"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Main Center Image Stage */}
              <div
                className="relative flex-1 flex items-center justify-center my-3 sm:my-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous Arrow */}
                {filteredPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPhotoIndex(
                        (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                      )
                    }}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer shadow-2xl"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Active High-Res Photo */}
                <motion.div
                  key={currentPhoto.id || selectedPhotoIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[66vh] max-w-full flex items-center justify-center"
                >
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.title || 'Album photo'}
                    draggable={false}
                    className="max-h-[66vh] max-w-full w-auto object-contain rounded-xl shadow-2xl select-none"
                    onError={(e) => {
                      e.target.src = album.cover || '/pk2.jpeg'
                    }}
                  />
                </motion.div>

                {/* Next Arrow */}
                {filteredPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPhotoIndex(
                        (selectedPhotoIndex + 1) % filteredPhotos.length
                      )
                    }}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer shadow-2xl"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Bottom Caption & Thumbnail Filmstrip */}
              <div
                className="z-20 bg-black/70 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 max-w-4xl mx-auto w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-white truncate">
                      {currentPhoto.title}
                    </h4>
                    {currentPhoto.caption && (
                      <p className="text-xs text-white/70 line-clamp-1 font-normal mt-0.5">
                        {currentPhoto.caption}
                      </p>
                    )}
                  </div>
                  {currentPhoto.date && (
                    <span className="text-[11px] font-mono text-white/50 shrink-0">
                      {currentPhoto.date}
                    </span>
                  )}
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 hide-modal-scrollbar">
                  {filteredPhotos.map((thumb, tIdx) => {
                    const isActive = tIdx === selectedPhotoIndex
                    return (
                      <button
                        key={thumb.id || tIdx}
                        type="button"
                        onClick={() => setSelectedPhotoIndex(tIdx)}
                        className={`relative shrink-0 w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'scale-105 shadow-md'
                            : 'opacity-50 hover:opacity-100 border-transparent'
                        }`}
                        style={{
                          borderColor: isActive ? (album.color || '#00A6FF') : 'transparent'
                        }}
                      >
                        <img
                          src={thumb.src}
                          alt={thumb.title || 'Thumbnail'}
                          draggable={false}
                          className="w-full h-full object-cover select-none"
                          onError={(e) => {
                            e.target.src = album.cover || '/pk2.jpeg'
                          }}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
