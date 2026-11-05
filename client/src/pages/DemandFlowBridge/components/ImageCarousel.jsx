import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'
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

/**
 * ImageCarousel Component
 * High-performance 3D concave cylinder carousel with instantaneous click-to-preview,
 * full hover responsiveness across ALL images, tactile active feedback, smooth glides,
 * and intuitive directional navigation controls.
 */
const ImageCarousel = ({ images = defaultProductImages }) => {
  const prefersReducedMotion = useReducedMotion()
  const isHoveredRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Lightbox preview modal state
  const [isCenterFocused, setIsCenterFocused] = useState(false)
  const [activeCenterItem, setActiveCenterItem] = useState(null)

  // Responsive dimensions for 3D stage and cards (tuned to 16:9 native aspect ratio)
  const [stageConfig, setStageConfig] = useState({
    radius: 980,
    stageZ: 370,
    perspective: 1320,
    cardWidth: 380,
    cardHeight: 214,
  })

  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const currentAngleRef = useRef(0)
  const requestRef = useRef(null)
  const stepAnimRef = useRef(null)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const dragStartAngle = useRef(0)
  const isPointerDown = useRef(false)
  const hasMovedRef = useRef(false)
  const isCarouselStoppedRef = useRef(false)
  const modalOpenedAt = useRef(0)

  // Preload all dashboard images so modal displays instantaneously on first paint
  useEffect(() => {
    images.forEach((img) => {
      if (img.path) {
        const preloadImg = new Image()
        preloadImg.src = img.path
      }
    })
  }, [images])

  // Smooth rotation pace (~3.5 deg/sec)
  const ROTATION_SPEED = 0.0035

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scope to Hero Section: Pause animation when Hero is scrolled out of view
  useEffect(() => {
    const heroEl = document.getElementById('hero')
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        if (!inView) {
          setIsCenterFocused(false)
        }
      },
      { threshold: 0.15 }
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

  /**
   * Updates card visibility and pointer-events dynamically based on angle.
   * - Cards outside the visible concave field of view (|relAngle| > 78 deg) are given
   *   visibility: 'hidden', pointerEvents: 'none', opacity: '0'.
   * - Cards inside the front field of view (|relAngle| <= 78 deg) are given
   *   visibility: 'visible', pointerEvents: 'auto', and smooth edge opacity falloff.
   */
  const updateCardVisibility = useCallback(
    (angle) => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translateZ(${stageConfig.stageZ}px) rotateY(${angle}deg)`
      }

      const total = items.length
      for (let i = 0; i < total; i++) {
        const cardEl = cardRefs.current[i]
        if (!cardEl) continue

        const baseAngle = i * stepAngle
        const relAngle = ((baseAngle + angle) % 360 + 540) % 360 - 180
        const absRelAngle = Math.abs(relAngle)

        if (absRelAngle > 78) {
          // Rear hemisphere: Non-blocking & hidden without destroying compositor layer
          cardEl.style.visibility = 'hidden'
          cardEl.style.pointerEvents = 'none'
          cardEl.style.opacity = '0'
          cardEl.setAttribute('aria-hidden', 'true')
        } else {
          // Front hemisphere: Interactive & fully visible
          cardEl.style.visibility = 'visible'
          cardEl.style.pointerEvents = 'auto'
          cardEl.setAttribute('aria-hidden', 'false')

          // Smooth edge falloff
          const opacity = absRelAngle <= 55 ? 1 : Math.max(0, (78 - absRelAngle) / 23)
          cardEl.style.opacity = opacity.toFixed(3)
        }
      }
    },
    [items.length, stepAngle, stageConfig.stageZ]
  )

  // Re-apply visibility updates whenever stageConfig changes or on any render reconciliation
  useEffect(() => {
    updateCardVisibility(currentAngleRef.current)
  })

  // Continuous smooth auto-rotation infinite loop
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return

    let lastTime = performance.now()

    const animate = (time) => {
      const dt = Math.min(time - lastTime, 64)
      lastTime = time

      if (
        !isCarouselStoppedRef.current &&
        !isHoveredRef.current &&
        !isDragging &&
        !isCenterFocused
      ) {
        currentAngleRef.current -= ROTATION_SPEED * dt
        // Seamless continuous loop normalization: wrap within 360 degrees
        if (currentAngleRef.current <= -360) {
          currentAngleRef.current += 360
        } else if (currentAngleRef.current >= 360) {
          currentAngleRef.current -= 360
        }
        updateCardVisibility(currentAngleRef.current)
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      if (stepAnimRef.current) cancelAnimationFrame(stepAnimRef.current)
    }
  }, [prefersReducedMotion, isDragging, isCenterFocused, isInView, updateCardVisibility])

  // Resume infinite loop if window or tab loses focus and returns
  useEffect(() => {
    const handleResumeLoop = () => {
      if (!isCenterFocused) {
        isHoveredRef.current = false
        isCarouselStoppedRef.current = false
      }
    }
    window.addEventListener('focus', handleResumeLoop)
    document.addEventListener('visibilitychange', handleResumeLoop)
    return () => {
      window.removeEventListener('focus', handleResumeLoop)
      document.removeEventListener('visibilitychange', handleResumeLoop)
    }
  }, [isCenterFocused])

  // Drag / swipe pointer controls
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return
    if (stepAnimRef.current) cancelAnimationFrame(stepAnimRef.current)
    isPointerDown.current = true
    hasMovedRef.current = false
    dragStartX.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    dragStartY.current = e.clientY || (e.touches && e.touches[0]?.clientY) || 0
    dragStartAngle.current = currentAngleRef.current
  }

  const handlePointerMove = (e) => {
    if (!isPointerDown.current) return
    const currentX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    const currentY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0
    const deltaX = currentX - dragStartX.current
    const deltaY = currentY - dragStartY.current

    if (Math.hypot(deltaX, deltaY) > 12) {
      hasMovedRef.current = true
      setIsDragging(true)
    }

    if (hasMovedRef.current) {
      const newAngle = dragStartAngle.current + deltaX * 0.16
      currentAngleRef.current = newAngle
      updateCardVisibility(newAngle)
    }
  }

  const handlePointerUp = () => {
    if (!isPointerDown.current) return
    isPointerDown.current = false
    setTimeout(() => {
      setIsDragging(false)
      hasMovedRef.current = false
      if (!isHoveredRef.current && !isCenterFocused) {
        isCarouselStoppedRef.current = false
      }
    }, 50)
  }

  // Hover pauses rotation smoothly with zero React re-render overhead
  const handleCardMouseEnter = () => {
    if (isDragging) return
    isCarouselStoppedRef.current = true
    isHoveredRef.current = true
  }

  const handleCardMouseLeave = () => {
    if (isCenterFocused) return
    isCarouselStoppedRef.current = false
    isHoveredRef.current = false
  }

  // Instantaneous modal opening with 0 latency
  const handleCardClick = (e, item) => {
    if (e) {
      e.stopPropagation()
    }
    if (hasMovedRef.current) return // User was dragging

    isCarouselStoppedRef.current = true
    isHoveredRef.current = true
    setActiveCenterItem(item)
    setIsCenterFocused(true)
    modalOpenedAt.current = performance.now()
  }

  // Close preview modal
  const handleCloseModal = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setIsCenterFocused(false)
    isCarouselStoppedRef.current = false
    isHoveredRef.current = false
  }

  // Guard against ghost backdrop clicks from opening event
  const handleBackdropClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (performance.now() - modalOpenedAt.current < 200) return
    handleCloseModal(e)
  }

  /**
   * Smooth Step Rotation for Carousel Arrows:
   * - Clicking RIGHT arrow button moves carousel from LEFT to RIGHT (direction = +1).
   * - Clicking LEFT arrow button moves carousel from RIGHT to LEFT (direction = -1).
   * Glides smoothly over 350ms with cubic ease-out in an infinite loop.
   */
  const handleStepRotate = (direction) => {
    if (stepAnimRef.current) cancelAnimationFrame(stepAnimRef.current)
    const startAngle = currentAngleRef.current
    const targetAngle = startAngle + direction * stepAngle
    const duration = 350
    const startTime = performance.now()

    const animateStep = (time) => {
      const elapsed = time - startTime
      const progress = Math.min(1, elapsed / duration)
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = startAngle + (targetAngle - startAngle) * ease
      currentAngleRef.current = current
      updateCardVisibility(current)

      if (progress < 1) {
        stepAnimRef.current = requestAnimationFrame(animateStep)
      } else {
        // Normalize angle to continuous 360 loop
        let finalAngle = targetAngle
        if (finalAngle <= -360) finalAngle += 360
        else if (finalAngle >= 360) finalAngle -= 360
        currentAngleRef.current = finalAngle
        updateCardVisibility(finalAngle)
        stepAnimRef.current = null
        if (!isHoveredRef.current && !isCenterFocused) {
          isCarouselStoppedRef.current = false
        }
      }
    }

    stepAnimRef.current = requestAnimationFrame(animateStep)
  }

  // Modal Next / Prev controls (Infinite Loop)
  const handleModalNext = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const currentIndex = images.findIndex((img) => img.id === activeCenterItem?.id)
    const nextIndex = (currentIndex + 1) % images.length
    setActiveCenterItem(images[nextIndex])
  }

  const handleModalPrev = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const currentIndex = images.findIndex((img) => img.id === activeCenterItem?.id)
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setActiveCenterItem(images[prevIndex])
  }

  // Keyboard navigation for modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isCenterFocused) return
      if (e.key === 'Escape') {
        handleCloseModal()
      } else if (e.key === 'ArrowRight') {
        handleModalNext()
      } else if (e.key === 'ArrowLeft') {
        handleModalPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCenterFocused, activeCenterItem])

  const displayItem = activeCenterItem || images[0]
  const currentImageIdx = images.findIndex((img) => img.id === displayItem?.id)

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center select-none overflow-visible my-auto py-2 sm:py-3 font-sans"
      aria-label="DemandFlow Bridge Platform Showcase Carousel"
    >
      {/* ─── 3D PERSPECTIVE STAGE CONTAINER ─────────────────────────────────── */}
      <div
        className="relative w-full h-[290px] sm:h-[330px] md:h-[360px] lg:h-[390px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          perspective: `${stageConfig.perspective}px`,
          perspectiveOrigin: '50% 50%',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseLeave={() => {
          if (!isCenterFocused) {
            isHoveredRef.current = false
            isCarouselStoppedRef.current = false
          }
        }}
      >
        {/* ─── STAGE NAVIGATION CONTROLS (LEFT & RIGHT CHEVRONS) ───────────── */}
        {/* Left Arrow: Moves carousel from right to left (direction = -1) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleStepRotate(-1)
          }}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#070B14]/90 border border-primary/40 hover:border-primary text-text-secondary hover:text-primary flex items-center justify-center transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(0,166,255,0.4)] hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Move carousel from right to left"
          title="Previous (Right to Left)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow: Moves carousel from left to right (direction = +1) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleStepRotate(1)
          }}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#070B14]/90 border border-primary/40 hover:border-primary text-text-secondary hover:text-primary flex items-center justify-center transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(0,166,255,0.4)] hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Move carousel from left to right"
          title="Next (Left to Right)"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* ─── CENTER VERTICAL LASER LIGHT BEAM (BRAND BLUE) ───────────────── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] sm:h-[300px] md:h-[330px] lg:h-[360px] w-[2px] pointer-events-none z-20 flex flex-col items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-light blur-[0.5px] shadow-[0_0_8px_var(--primary)]" />
          <div
            className="w-full flex-1"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(0,166,255,0.3) 15%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0.95) 52%, rgba(0,166,255,0.3) 85%, transparent)',
              boxShadow:
                '0 0 10px rgba(0,166,255,0.9), 0 0 22px rgba(0,133,204,0.7)',
            }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="absolute w-12 h-12 rounded-full bg-primary/25 blur-md" />
            <div className="absolute w-16 h-[2px] bg-gradient-to-r from-transparent via-primary-light to-transparent blur-[0.5px]" />
            <div className="w-2.5 h-2.5 bg-white rotate-45 shadow-[0_0_12px_var(--primary),0_0_22px_var(--primary-dark)]" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary blur-[0.5px] shadow-[0_0_8px_var(--primary)]" />
        </div>

        {/* ─── ROTATING 3D CYLINDER TRACK ──────────────────────────────────── */}
        <div
          ref={trackRef}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(${stageConfig.stageZ}px) rotateY(0deg)`,
          }}
        >
          {items.map((item, idx) => {
            const baseAngle = idx * stepAngle

            return (
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                key={`${item.id}-${idx}`}
                className="absolute flex items-center justify-center select-none group cursor-pointer focus:outline-none"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${stageConfig.cardWidth}px`,
                  height: `${stageConfig.cardHeight}px`,
                  marginTop: `-${stageConfig.cardHeight / 2}px`,
                  marginLeft: `-${stageConfig.cardWidth / 2}px`,
                  transformStyle: 'preserve-3d',
                  transformOrigin: '50% 50% 0',
                  transform: `rotateY(${baseAngle}deg) translateZ(-${stageConfig.radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                onClick={(e) => handleCardClick(e, item)}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(e, item)
                  }
                }}
              >
                {/* Card Container: Interactive Border, Glow & Tactile Scale */}
                <div
                  className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#070B14] p-1.5 sm:p-2 border border-border/80 shadow-[0_16px_40px_rgba(0,0,0,0.85)] group-hover:border-primary group-hover:shadow-[0_0_35px_rgba(0,166,255,0.55),0_20px_50px_rgba(0,0,0,0.95)] group-hover:scale-[1.04] group-active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer pointer-events-auto"
                >
                  {/* Dashboard Screenshot */}
                  <img
                    src={item.path}
                    alt={item.alt}
                    className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                    draggable={false}
                  />

                  {/* Brand Blue Ambient Glow when hovered */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 0%, rgba(0,166,255,0.22) 0%, transparent 70%)',
                    }}
                  />

                  {/* Interactive Hover Pill & Title Overlay (Available on ALL images) */}
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-between p-3 pointer-events-none">
                    {/* Top Tag: Screen Name */}
                    <div className="w-full flex items-center justify-between">
                      <span className="text-[11px] font-sans font-semibold text-white tracking-wide truncate bg-[#070B14]/90 px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                        {item.alt}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#00A6FF]" />
                    </div>

                    {/* Center "CLICK TO VIEW" Pill Button */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070B14]/95 border border-primary text-primary shadow-[0_0_18px_rgba(0,166,255,0.45)] transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-xs font-sans font-bold tracking-wider uppercase">
                        CLICK TO VIEW
                      </span>
                    </div>

                    {/* Bottom Platform Hint */}
                    <span className="text-[10px] font-sans text-text-secondary tracking-wide">
                      DemandFlow Bridge Platform
                    </span>
                  </div>
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
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 transition-opacity duration-150 ease-out ${
              isCenterFocused
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isCenterFocused}
          >
            {/* 1. Backdrop blur: Gentle click-to-dismiss */}
            <div
              className={`absolute inset-0 bg-black/85 transition-opacity duration-150 ease-out cursor-pointer ${
                isCenterFocused ? 'backdrop-blur-md opacity-100' : 'backdrop-blur-none opacity-0'
              }`}
              onClick={handleBackdropClick}
            />

            {/* 2. Focused Preview Window: Snappy, instantaneous opening */}
            {displayItem && (
              <div
                className={`relative z-10 w-full max-w-5xl xl:max-w-6xl rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070B14] border-2 border-primary/50 shadow-[0_0_60px_rgba(0,166,255,0.35),0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-150 ease-out flex flex-col ${
                  isCenterFocused
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-95 opacity-0 translate-y-2 pointer-events-none'
                }`}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Clean Enterprise Window Header Bar */}
                <div className="w-full h-11 sm:h-12 px-4 sm:px-6 bg-[#0B101D] border-b border-primary/20 flex items-center justify-between shrink-0 select-none">
                  {/* Left: macOS Window Traffic Light Dots + Current Screen Title */}
                  <div className="flex items-center gap-3 min-w-0">
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

                    <span className="text-xs sm:text-sm font-sans font-medium text-text-primary tracking-wide truncate ml-1 sm:ml-2">
                      {displayItem.alt}
                    </span>

                    <span className="hidden sm:inline-block text-[11px] font-sans font-normal text-text-secondary">
                      ({currentImageIdx + 1} of {images.length})
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
                <div className="relative w-full bg-[#050811] flex items-center justify-center p-2.5 sm:p-4 overflow-hidden group/modalview">
                  {/* Modal Previous Arrow */}
                  <button
                    type="button"
                    onClick={handleModalPrev}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-[#070B14]/85 hover:bg-primary/20 border border-white/10 hover:border-primary text-text-secondary hover:text-primary transition-all duration-200 z-20 cursor-pointer shadow-lg backdrop-blur-md hover:scale-110 active:scale-95"
                    aria-label="Previous screenshot"
                    title="Previous (Left Arrow)"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Modal Next Arrow */}
                  <button
                    type="button"
                    onClick={handleModalNext}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-[#070B14]/85 hover:bg-primary/20 border border-white/10 hover:border-primary text-text-secondary hover:text-primary transition-all duration-200 z-20 cursor-pointer shadow-lg backdrop-blur-md hover:scale-110 active:scale-95"
                    aria-label="Next screenshot"
                    title="Next (Right Arrow)"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <img
                    src={displayItem.path}
                    alt={displayItem.alt}
                    className="w-full h-auto max-h-[64vh] sm:max-h-[68vh] md:max-h-[72vh] object-contain block mx-auto rounded-xl select-none"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                    draggable={false}
                  />
                </div>

                {/* Bottom Footer Bar with Dot Thumbnails */}
                <div className="w-full h-10 px-4 bg-[#0B101D] border-t border-primary/10 flex items-center justify-between shrink-0 select-none">
                  <span className="text-[11px] font-sans text-text-secondary truncate">
                    Use <kbd className="px-1 py-0.5 rounded bg-white/10 text-text-primary text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-white/10 text-text-primary text-[10px]">→</kbd> to navigate, <kbd className="px-1 py-0.5 rounded bg-white/10 text-text-primary text-[10px]">ESC</kbd> to exit
                  </span>

                  {/* Navigation Dots */}
                  <div className="flex items-center gap-1.5">
                    {images.map((img, i) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setActiveCenterItem(img)}
                        className={`transition-all duration-200 rounded-full cursor-pointer ${
                          i === currentImageIdx
                            ? 'w-5 h-1.5 bg-primary shadow-[0_0_8px_#00A6FF]'
                            : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                        title={img.alt}
                        aria-label={`Jump to ${img.alt}`}
                      />
                    ))}
                  </div>
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
