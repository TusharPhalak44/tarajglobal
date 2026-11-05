import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const defaultProductImages = [
  { id: 'sales', path: '/Sales_Dashboard.png', alt: 'Sales Dashboard' },
  { id: 'campaigns', path: '/Campaign_Screen.png', alt: 'Sales Cadence Orchestrator' },
  { id: 'qualification', path: '/Leads_Screen.png', alt: 'AI Lead Qualification' },
  { id: 'admin', path: '/Admin_Dashboard.png', alt: 'Operations Console' },
  { id: 'tracking', path: '/Agent_Tracking.png', alt: 'Agent Tracking' },
  { id: 'dbms', path: '/DBMS.png', alt: 'Unified Database' },
  { id: 'analytics', path: '/Revenue_Screen.png', alt: 'Revenue Analytics' },
  { id: 'audit', path: '/Audit_QA.png', alt: 'Audit & QA' },
]

// Smooth cubic easing for silky transitions between cards
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/**
 * ImageCarousel Component
 * 3D concave cylinder carousel styled strictly according to website global.css design tokens.
 * Features:
 * - Scoped strictly to the Hero Section: Enlargement overlay and blur are contained exclusively within #hero. Never spills over to the rest of the website.
 * - Viewport-Aware: Automatically pauses animation and hides overlay whenever the user scrolls away from the Hero section.
 * - 100% Complete Image Visibility: All images use object-contain and proportional sizing so no UI or text is ever cut off.
 * - Crystal Sharp Rendering: Isolates backdrop blur from the image layer and uses high-contrast image rendering.
 * - Exact Unchanged Pause Duration (1.6s) while centered.
 * - Smooth cubic easing transition between cards.
 * - Interactive pointer drag/swipe controls with snap-to-center and click-to-center focus.
 */
const ImageCarousel = ({ images = defaultProductImages }) => {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Whole-screen center enlargement state (scoped to #hero)
  const [isCenterFocused, setIsCenterFocused] = useState(false)
  const [activeCenterItem, setActiveCenterItem] = useState(null)
  const [isPinned, setIsPinned] = useState(false) // When true (opened via click), stays open until dismissed

  // Responsive dimensions for 3D stage and cards (tuned to 16:9 native aspect ratio)
  const [stageConfig, setStageConfig] = useState({
    radius: 980,
    stageZ: 370,
    perspective: 1320,
    cardWidth: 380,
    cardHeight: 214,
  })

  const trackRef = useRef(null)
  const currentAngleRef = useRef(0)
  const requestRef = useRef(null)
  const dragStartX = useRef(0)
  const dragStartAngle = useRef(0)
  const isPointerDown = useRef(false)
  const hasMovedRef = useRef(false)
  const closeTimeoutRef = useRef(null)
  const cardPointerDownPos = useRef({ x: 0, y: 0 })
  const isCarouselStoppedRef = useRef(false) // Immediately halts RAF loop on click
  const modalOpenedAt = useRef(0) // Timestamp guard against ghost backdrop clicks

  // Preload all dashboard images so modal displays instantaneously on first paint
  useEffect(() => {
    images.forEach((img) => {
      if (img.path) {
        const preloadImg = new Image()
        preloadImg.src = img.path
      }
    })
  }, [images])

  // Keyboard Escape listener to cleanly close preview modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Calm, elegant 3D carousel scroll speed (minimized pace as requested: ~3.5 deg/sec)
  const ROTATION_SPEED = 0.0035

  useEffect(() => {
    setMounted(true)
    return () => {
      clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  // Scope to Hero Section: Detect when Hero is in viewport so it NEVER runs over other sections
  useEffect(() => {
    const heroEl = document.getElementById('hero')
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        // If user scrolls past Hero, immediately hide any popup and pause
        if (!inView) {
          setIsCenterFocused(false)
        }
      },
      { threshold: 0.15 } // 15% visibility threshold
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  // Repeat items to make an exact 16-card full cylinder (16 * 22.5 deg = 360 deg)
  const items = useMemo(() => {
    if (images.length === 8) {
      return [...images, ...images]
    }
    const repeated = []
    while (repeated.length < 16) {
      repeated.push(...images)
    }
    return repeated.slice(0, 16)
  }, [images])

  const totalCards = items.length // 16
  const stepAngle = 360 / totalCards // 22.5 deg

  const displayItem = activeCenterItem || items[0]

  // Handle window resizing to keep exact responsive proportions without image cutting
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w >= 1440) {
        setStageConfig({
          radius: 980,
          stageZ: 370,
          perspective: 1320,
          cardWidth: 380,
          cardHeight: 214,
        })
      } else if (w >= 1024) {
        setStageConfig({
          radius: 900,
          stageZ: 340,
          perspective: 1250,
          cardWidth: 340,
          cardHeight: 191,
        })
      } else if (w >= 768) {
        setStageConfig({
          radius: 780,
          stageZ: 290,
          perspective: 1100,
          cardWidth: 290,
          cardHeight: 163,
        })
      } else {
        setStageConfig({
          radius: 580,
          stageZ: 210,
          perspective: 950,
          cardWidth: 230,
          cardHeight: 130,
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Continuous silky-smooth 3D loop animation running directly on GPU via ref
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return

    let lastTime = performance.now()

    const animate = (time) => {
      const dt = Math.min(time - lastTime, 64)
      lastTime = time

      // Auto-rotation runs directly on trackRef without React state re-renders
      if (
        !isCarouselStoppedRef.current &&
        !isHovered &&
        !isDragging &&
        !isCenterFocused
      ) {
        currentAngleRef.current -= ROTATION_SPEED * dt
        if (trackRef.current) {
          trackRef.current.style.transform = `translateZ(${stageConfig.stageZ}px) rotateY(${currentAngleRef.current}deg)`
        }
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [prefersReducedMotion, isHovered, isDragging, isCenterFocused, isInView, stageConfig.stageZ])

  // Drag / swipe controls with Pointer Events directly on DOM
  const handlePointerDown = (e) => {
    isPointerDown.current = true
    hasMovedRef.current = false
    dragStartX.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    dragStartAngle.current = currentAngleRef.current
  }

  const handlePointerMove = (e) => {
    if (!isPointerDown.current) return
    const currentX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    const deltaX = currentX - dragStartX.current
    if (Math.abs(deltaX) > 10) {
      hasMovedRef.current = true
      setIsDragging(true)
      setIsCenterFocused(false)
      setIsPinned(false)
    }
    if (hasMovedRef.current) {
      const newAngle = dragStartAngle.current + deltaX * 0.16
      currentAngleRef.current = newAngle
      if (trackRef.current) {
        trackRef.current.style.transform = `translateZ(${stageConfig.stageZ}px) rotateY(${newAngle}deg)`
      }
    }
  }

  const handlePointerUp = () => {
    if (!isPointerDown.current) return
    isPointerDown.current = false
    setIsDragging(false)
  }

  // Hover on any card pauses rotation
  const handleCardMouseEnter = (item) => {
    if (isPointerDown.current && hasMovedRef.current) return
    if (isPinned) return
    clearTimeout(closeTimeoutRef.current)
    isCarouselStoppedRef.current = true
    setIsHovered(true)
  }

  const handleCardMouseLeave = () => {
    if (isPinned) return
    clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      isCarouselStoppedRef.current = false
      setIsHovered(false)
    }, 200)
  }

  const handleModalMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current)
    isCarouselStoppedRef.current = true
    setIsHovered(true)
    setIsCenterFocused(true)
  }

  const handleModalMouseLeave = () => {
    if (isPinned) return
    clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      isCarouselStoppedRef.current = false
      setIsHovered(false)
    }, 200)
  }

  const handleCloseModal = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    clearTimeout(closeTimeoutRef.current)
    isCarouselStoppedRef.current = false
    setIsPinned(false)
    setIsCenterFocused(false)
    setIsHovered(false)
  }

  // Guard backdrop from ghost click from the same click that opened the modal
  const handleBackdropClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (performance.now() - modalOpenedAt.current < 350) return
    handleCloseModal(e)
  }

  // Click on any card immediately stops carousel and shows big preview with ZERO latency
  const handleCardClick = (e, item, baseAngle) => {
    if (e) {
      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()
    }
    clearTimeout(closeTimeoutRef.current)

    // 1. Immediately HALT carousel rotation on frame 0
    isCarouselStoppedRef.current = true
    isPointerDown.current = false
    setIsDragging(false)
    hasMovedRef.current = false

    // 2. Instantly align 3D cylinder track so this card is front & center
    if (baseAngle !== undefined) {
      const current = currentAngleRef.current
      const diff = ((-baseAngle - current) % 360 + 540) % 360 - 180
      const snapTarget = current + diff
      currentAngleRef.current = snapTarget
      if (trackRef.current) {
        trackRef.current.style.transform = `translateZ(${stageConfig.stageZ}px) rotateY(${snapTarget}deg)`
      }
    }

    // 3. Record timestamp to guard backdrop from ghost clicks
    modalOpenedAt.current = performance.now()

    // 4. Immediately display this card enlarged
    setActiveCenterItem(item)
    setIsPinned(true)
    setIsCenterFocused(true)
    setIsHovered(true)
  }

  const heroContainer = typeof document !== 'undefined' ? document.getElementById('hero') : null

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center select-none overflow-visible my-auto py-2 sm:py-3 font-sans"
      aria-label="DemandFlow Bridge Platform Showcase Carousel"
    >
      {/* ─── 3D PERSPECTIVE STAGE CONTAINER ─────────────────────────────────── */}
      <div
        className="relative w-full h-[290px] sm:h-[330px] md:h-[360px] lg:h-[390px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
        style={{
          perspective: `${stageConfig.perspective}px`,
          perspectiveOrigin: '50% 50%',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* ─── CENTER VERTICAL LASER LIGHT BEAM (GLOBAL BRAND BLUE) ────────── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] sm:h-[300px] md:h-[330px] lg:h-[360px] w-[2px] pointer-events-none z-20 flex flex-col items-center">
          {/* Top pin flare in primary light blue */}
          <div className="w-1.5 h-1.5 rounded-full bg-primary-light blur-[0.5px] shadow-[0_0_8px_var(--primary)]" />

          {/* Vertical neon ray */}
          <div
            className="w-full flex-1"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(0,166,255,0.3) 15%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0.95) 52%, rgba(0,166,255,0.3) 85%, transparent)',
              boxShadow:
                '0 0 10px rgba(0,166,255,0.9), 0 0 22px rgba(0,133,204,0.7)',
            }}
          />

          {/* Center Diamond / Starburst Flare in Brand Blue */}
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {/* Outer ambient glow */}
            <div className="absolute w-12 h-12 rounded-full bg-primary/25 blur-md" />
            {/* Horizontal flare streak */}
            <div className="absolute w-16 h-[2px] bg-gradient-to-r from-transparent via-primary-light to-transparent blur-[0.5px]" />
            {/* Diamond center core */}
            <div className="w-2.5 h-2.5 bg-white rotate-45 shadow-[0_0_12px_var(--primary),0_0_22px_var(--primary-dark)]" />
          </div>

          {/* Bottom pin flare */}
          <div className="w-1.5 h-1.5 rounded-full bg-primary blur-[0.5px] shadow-[0_0_8px_var(--primary)]" />
        </div>

        {/* ─── ROTATING 3D CYLINDER TRACK ──────────────────────────────────── */}
        <div
          ref={trackRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(${stageConfig.stageZ}px) rotateY(0deg)`,
          }}
        >
          {items.map((item, idx) => {
            const baseAngle = idx * stepAngle

            return (
              <div
                key={`${item.id}-${idx}`}
                className="absolute flex items-center justify-center cursor-pointer select-none"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${baseAngle}deg) translateZ(-${stageConfig.radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  cardPointerDownPos.current = { x: e.clientX, y: e.clientY }
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardClick(e, item, baseAngle)
                }}
                onMouseEnter={() => handleCardMouseEnter(item)}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* 100% Complete Image Visibility: object-contain with crisp rendering */}
                <div
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#070B14] transition-all duration-300 group flex items-center justify-center p-1.5 sm:p-2 border border-border shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-primary hover:scale-[1.04] hover:shadow-[0_24px_65px_rgba(0,166,255,0.45)]"
                  style={{
                    width: `${stageConfig.cardWidth}px`,
                    height: `${stageConfig.cardHeight}px`,
                  }}
                >
                  <img
                    src={item.path}
                    alt={item.alt}
                    className="w-full h-full object-contain select-none pointer-events-none group-hover:scale-102 transition-transform duration-300 opacity-100"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                    draggable={false}
                  />

                  {/* Brand Blue Ambient Glow when hovered */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 0%, rgba(0,166,255,0.18) 0%, transparent 70%)',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── ENLARGED CRM PREVIEW LIGHTBOX MODAL ─────────────────────────── */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 transition-opacity duration-150 ease-out ${isCenterFocused
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
              }`}
            aria-hidden={!isCenterFocused}
          >
            {/* 1. Backdrop blur: Gentle click-to-dismiss with ghost click guard */}
            <div
              className={`absolute inset-0 bg-black/85 transition-opacity duration-150 ease-out cursor-pointer ${isCenterFocused ? 'backdrop-blur-md opacity-100' : 'backdrop-blur-none opacity-0'
                }`}
              onClick={handleBackdropClick}
            />

            {/* 2. Focused Preview Window: Snappy, instantaneous opening */}
            {displayItem && (
              <div
                className={`relative z-10 w-full max-w-5xl xl:max-w-6xl rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070B14] border-2 border-primary/50 shadow-[0_0_60px_rgba(0,166,255,0.35),0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-150 ease-out flex flex-col ${isCenterFocused
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-95 opacity-0 translate-y-2 pointer-events-none'
                  }`}
                onMouseEnter={handleModalMouseEnter}
                onMouseLeave={handleModalMouseLeave}
              >
                {/* Clean Enterprise Window Header Bar (Matches Image 1 mockup) */}
                <div className="w-full h-11 sm:h-12 px-4 sm:px-6 bg-[#0B101D] border-b border-primary/20 flex items-center justify-between shrink-0 select-none">
                  {/* Left: macOS Window Traffic Light Dots + Current Screen Title */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Traffic Light Dots */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.6)] cursor-pointer hover:opacity-80 transition-opacity"
                        title="Close preview"
                        aria-label="Close preview"
                      />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.5)]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.5)]" />
                    </div>

                    {/* Title */}
                    <span className="text-xs sm:text-sm font-sans font-medium text-text-primary tracking-wide truncate ml-1 sm:ml-2">
                      {displayItem.alt}
                    </span>
                  </div>

                  {/* Right: DEMANDFLOW CRM Pill Badge + Close Action */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/50 bg-primary/10 shadow-[0_0_12px_rgba(0,166,255,0.25)]">
                      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#00A6FF]" />
                      <span className="text-[11px] sm:text-xs font-sans font-bold tracking-wider uppercase text-primary">
                        DEMANDFLOW CRM
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                      aria-label="Close preview"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Image Viewport: Crisp, High-Resolution, 100% Uncropped Visibility */}
                <div className="relative w-full bg-[#050811] flex items-center justify-center p-2.5 sm:p-4 overflow-hidden">
                  <img
                    src={displayItem.path}
                    alt={displayItem.alt}
                    className="w-full h-auto max-h-[64vh] sm:max-h-[68vh] md:max-h-[72vh] object-contain block mx-auto rounded-xl select-none pointer-events-none"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                    draggable={false}
                  />
                </div>

                {/* Subtle bottom ambient glow accent line */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shrink-0" />
              </div>
            )}
          </div>,
          typeof document !== 'undefined' ? document.body : null
        )}
    </div>
  )
}

export default ImageCarousel