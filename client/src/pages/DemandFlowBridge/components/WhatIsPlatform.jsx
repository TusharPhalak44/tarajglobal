import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Users,
  Target,
  TrendingUp,
  Briefcase,
  UserCheck,
  CreditCard,
  Cog,
  BarChart3,
  Layers,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── 8 SCATTERED ARCHITECTURE MODULES ───────────────────────────────────────
// Snug scattered cluster with organic multi-depth arrangement.
// Strictly user-provided content.
const SCATTERED_MODULES = [
  {
    id: 'crm',
    title: 'CRM',
    badge: 'RELATIONSHIPS',
    label: 'Core Module',
    desc: 'Centralize contacts, account hierarchies, communication history, and buyer touchpoints in one record.',
    icon: Users,
    // Top-Left (Foreground Layer)
    baseX: -260,
    baseY: -145,
    zDepth: 55,
    cardWidth: 'clamp(180px, 21vw, 210px)',
    minHeight: '118px',
  },
  {
    id: 'lead-management',
    title: 'Lead Management',
    badge: 'QUALIFICATION',
    label: 'Core Module',
    desc: 'Track leads from intake and ICP scoring through BANT qualification to sales handoff.',
    icon: Target,
    // Top-Center (Midground Layer)
    baseX: -10,
    baseY: -185,
    zDepth: 25,
    cardWidth: 'clamp(170px, 20vw, 200px)',
    minHeight: '114px',
  },
  {
    id: 'sales-management',
    title: 'Sales Management',
    badge: 'PIPELINE VELOCITY',
    label: 'Core Module',
    desc: 'Manage pipelines, SDR cadence pacing, deal stages, and conversion forecasting in real time.',
    icon: TrendingUp,
    // Top-Right (Foreground Layer)
    baseX: 265,
    baseY: -148,
    zDepth: 60,
    cardWidth: 'clamp(185px, 21vw, 215px)',
    minHeight: '120px',
  },
  {
    id: 'client-management',
    title: 'Client Management',
    badge: 'DELIVERY & SLAS',
    label: 'Core Module',
    desc: 'Coordinate client workspaces, deliverable milestones, communication logs, and SLA tracking.',
    icon: Briefcase,
    // Middle-Right (Background Layer - Tucked under Top-Right & Bottom-Right)
    baseX: 295,
    baseY: 10,
    zDepth: 12,
    cardWidth: 'clamp(160px, 18vw, 185px)',
    minHeight: '108px',
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    badge: 'BUSINESS INTEL',
    label: 'Core Module',
    desc: 'Turn operational and revenue telemetry into executive dashboards.',
    icon: BarChart3,
    // Bottom-Right (Foreground Layer)
    baseX: 250,
    baseY: 168,
    zDepth: 50,
    cardWidth: 'clamp(180px, 21vw, 210px)',
    minHeight: '118px',
  },
  {
    id: 'hrms',
    title: 'HRMS',
    badge: 'ORGANIZATION',
    label: 'Extended Module',
    desc: 'Manage team structures, roles, and administrative workflows on the same platform.',
    icon: UserCheck,
    // Bottom-Center (Midground Layer)
    baseX: 15,
    baseY: 192,
    zDepth: 20,
    cardWidth: 'clamp(170px, 20vw, 200px)',
    minHeight: '114px',
  },
  {
    id: 'payroll',
    title: 'Payroll',
    badge: 'COMPENSATION',
    label: 'Extended Module',
    desc: 'Run compensation cycles and incentive reconciliation linked to pipeline milestones.',
    icon: CreditCard,
    // Bottom-Left (Foreground Layer)
    baseX: -255,
    baseY: 160,
    zDepth: 45,
    cardWidth: 'clamp(180px, 21vw, 210px)',
    minHeight: '118px',
  },
  {
    id: 'operations',
    title: 'Operations',
    badge: 'WORKFLOW ENGINE',
    label: 'Extended Module',
    desc: 'Route tasks, allocate accounts, and manage cross-team handoffs and capacity.',
    icon: Cog,
    // Middle-Left (Background Layer - Tucked under Top-Left & Bottom-Left)
    baseX: -295,
    baseY: 12,
    zDepth: 15,
    cardWidth: 'clamp(160px, 18vw, 185px)',
    minHeight: '108px',
  },
]

/**
 * WhatIsPlatform Component
 * Organic Scattered 3D Cluster with ultra-modern borderless glassmorphism:
 * - Central Platform Hub with a borderless, luminous pearl glass aura (no traditional solid white box).
 * - Modal with borderless modern dark glassmorphism and ambient cyan lighting (no harsh borders or dividing lines).
 * - 8 modules scattered snugly with natural overlapping layers.
 * - Strictly user-provided content.
 */
const WhatIsPlatform = () => {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)

  // Interactive Expansion State: expanded by default
  const [isExpanded, setIsExpanded] = useState(true)
  // Lightbox inspection modal
  const [inspectedCard, setInspectedCard] = useState(null)

  // Smooth Springs for Cursor Parallax 3D Tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 120, mass: 0.6 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const stageRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3.5, -3.5])
  const stageRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5])

  const handlePointerMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    },
    [prefersReducedMotion, mouseX, mouseY]
  )

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Responsive scale factor for snug scattered positions
  const [scatterScale, setScatterScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w >= 1280) {
        setScatterScale(1)
      } else if (w >= 1024) {
        setScatterScale(0.88)
      } else if (w >= 768) {
        setScatterScale(0.72)
      } else {
        setScatterScale(0.5)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Keyboard Escape listener to exit inspection mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setInspectedCard(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev)
    if (inspectedCard) setInspectedCard(null)
  }

  return (
    <section
      id="overview"
      className="relative w-full py-10 sm:py-14 lg:py-16 bg-[#040711] text-text-primary font-sans overflow-hidden select-none flex flex-col items-center justify-center border-t border-b border-border/40"
      aria-label="What is DemandFlow Bridge - Unified Architecture"
    >
      {/* ─── BACKGROUND AMBIENCE (UNIFIED BRAND BLUE ONLY) ────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft Blue Ambient Aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700"
          style={{
            background: isExpanded
              ? 'radial-gradient(circle, rgba(0,166,255,0.2) 0%, rgba(0,166,255,0.05) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0,166,255,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Micro Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ─── TOP SECTION HEADER ─────────────────────────────────────────── */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 text-center mb-3 sm:mb-5 pointer-events-auto">
        <div className="inline-flex items-center font-sans font-bold tracking-[0.16em] uppercase text-primary">

          <span> UNIFIED CRM ARCHITECTURE </span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight leading-tight text-white mb-2">
          One CRM Platform. {''}
          <span className="text-primary">
            Every Function  Connected.

          </span>
        </h2>

        <p className="text-xs sm:text-[13px] font-sans text-slate-300 leading-relaxed max-w-xl mx-auto font-normal">
          Instead of juggling fragmented software and isolated spreadsheets, DemandFlow Bridge unifies the functions behind B2B demand delivery in one synchronized CRM.

        </p>
      </div>

      {/* ─── 3D PARALLAX SCATTERED STAGE (TIGHTENED SPACING) ─────────────── */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full max-w-6xl h-[500px] sm:h-[540px] lg:h-[580px] flex items-center justify-center cursor-default overflow-visible"
        style={{
          perspective: 1200,
        }}
      >
        {/* ─── 3D TILTING CONTAINER (CURSOR PARALLAX) ─────────────────────── */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: stageRotateX,
            rotateY: stageRotateY,
          }}
        >
          {/* ─── 1. CENTRAL PLATFORM CORE (LUMINOUS BORDERLESS GLASS AURA) ──── */}
          <div
            className="absolute top-1/2 left-1/2 z-40 will-change-transform"
            style={{
              transform: 'translate3d(-50%, -50%, 0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={handleToggleExpand}
              className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isExpanded
                ? 'bg-gradient-to-br from-white/95 via-[#F1F6FD]/90 to-[#E4EFFF]/85 backdrop-blur-xl border border-white/40 shadow-[0_0_45px_rgba(0,166,255,0.35),0_20px_40px_rgba(0,0,0,0.4)] scale-100'
                : 'bg-gradient-to-br from-white/95 via-[#F1F6FD]/90 to-[#E4EFFF]/85 backdrop-blur-xl border border-white/40 shadow-[0_0_30px_rgba(0,166,255,0.25),0_15px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_55px_rgba(0,166,255,0.5)] hover:scale-105'
                }`}
              style={{
                width: 'clamp(205px, 27vw, 235px)',
                minHeight: '128px',
              }}
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'Collapse' : 'Deploy'} Platform Modules`}
            >
              {/* Top Cyan Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--primary)]" />

              {/* Eyebrow: Normal Text without borders */}
              <div className="relative mb-2 flex items-center gap-1.5 text-[9.5px] font-sans font-bold tracking-wider text-primary uppercase">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                <span>ONE PLATFORM</span>
              </div>

              {/* Platform Title */}
              <h3 className="relative text-sm sm:text-base font-heading font-extrabold text-slate-900 tracking-tight leading-tight mb-0.5">
                DemandFlow Bridge
              </h3>

              <span className="text-[10px] font-sans text-slate-600 font-semibold mb-2.5">
                Unified Architecture Hub
              </span>

              {/* Interactive State Button Pill */}
              <div className="relative px-3.5 py-1 rounded-full bg-gradient-to-r from-primary to-[#008EDC] text-white flex items-center gap-1.5 text-[10px] font-sans font-bold transition-all shadow-[0_0_15px_rgba(0,166,255,0.4)] group-hover:shadow-[0_0_20px_rgba(0,166,255,0.6)]">
                <span>{isExpanded ? '8 Active Modules' : 'Click to Deploy Modules'}</span>
                <ChevronRight
                  className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'
                    }`}
                />
              </div>
            </button>
          </div>

          {/* ─── 2. 8 SNUG SCATTERED MODULES (REDUCED SPACING, NO CAPSULES) ── */}
          {SCATTERED_MODULES.map((mod, index) => {
            const Icon = mod.icon

            const targetX = Math.round(mod.baseX * scatterScale)
            const targetY = Math.round(mod.baseY * scatterScale)

            const floatDuration = 4.2 + (index % 4) * 0.4
            const floatDelay = index * 0.15

            return (
              <motion.div
                key={mod.id}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={
                  isExpanded
                    ? {
                      x: targetX,
                      y: targetY,
                      scale: 1,
                      opacity: 1,
                    }
                    : {
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 0,
                    }
                }
                transition={{
                  type: 'spring',
                  stiffness: 105,
                  damping: 17,
                  mass: 0.85,
                  delay: isExpanded ? index * 0.035 : (SCATTERED_MODULES.length - index) * 0.02,
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transformStyle: 'preserve-3d',
                  translateZ: `${mod.zDepth}px`,
                  zIndex: 20 + Math.round(mod.zDepth / 2),
                }}
                className="will-change-transform"
              >
                {/* Fixed center offset wrapper */}
                <div
                  style={{
                    transform: 'translate3d(-50%, -50%, 0)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Subtle levitation bobbing */}
                  <motion.div
                    animate={
                      isExpanded && !prefersReducedMotion
                        ? {
                          y: [0, (index % 2 === 0 ? -3.5 : -2), 2.5, 0],
                        }
                        : {}
                    }
                    transition={{
                      duration: floatDuration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: floatDelay,
                    }}
                    className="will-change-transform"
                  >
                    {/* The Scattered Card: Curvilinear, High-Contrast Overlap */}
                    <div
                      onClick={() => setInspectedCard(mod)}
                      className="group relative rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 bg-gradient-to-br from-[#0F182B] via-[#0C1424] to-[#080E1A] border border-slate-700/80 hover:border-primary transition-all duration-200 cursor-pointer overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.6)] hover:shadow-[0_22px_48px_rgba(0,166,255,0.35)] hover:scale-105 hover:z-50"
                      style={{
                        width: mod.cardWidth,
                        minHeight: mod.minHeight,
                      }}
                    >
                      {/* Top Solid Vibrant Brand Blue Accent Bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-primary shadow-[0_0_8px_var(--primary)]" />

                      {/* Header Row: Icon Dock + Clean Borderless Category Text + Inspect Cue */}
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          {/* Glowing Icon Dock */}
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border border-primary/50 bg-[#080E1B] text-primary shadow-[0_0_8px_rgba(0,166,255,0.25)] transition-transform duration-200 group-hover:scale-105">
                            <Icon className="w-3.5 h-3.5" />
                          </div>

                          {/* Normal Category Text (No Capsule / No Border) */}
                          <span className="text-[9px] font-sans font-bold tracking-wider uppercase text-primary truncate max-w-[105px]">
                            {mod.badge}
                          </span>
                        </div>

                        {/* Inspect Cue Icon */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-primary">
                          <Maximize2 className="w-2.5 h-2.5" />
                        </div>
                      </div>

                      {/* Title: Exact Module Name */}
                      <h4 className="text-[12px] sm:text-[13px] font-heading font-bold text-white group-hover:text-primary transition-colors tracking-tight leading-snug line-clamp-1 mb-1">
                        {mod.title}
                      </h4>

                      {/* Description: Strictly User-Provided Text */}
                      <p className="text-[9.5px] sm:text-[10px] font-sans text-slate-300 leading-snug font-normal line-clamp-2 mb-1.5">
                        {mod.desc}
                      </p>

                      {/* Footer: User's Label as Normal Borderless Text */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[8.5px] sm:text-[9px] font-sans">
                        <span className="text-primary font-medium truncate">
                          {mod.label}
                        </span>
                        <span className="text-slate-400 group-hover:text-primary transition-colors shrink-0">
                          Inspect →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* ─── 3. FOCUSED SERVICE INSPECTION MODAL (ATTRACTIVE BORDERLESS GLASS) ─── */}
      <AnimatePresence>
        {inspectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 select-text">
            {/* Backdrop Blur with Click-to-Dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setInspectedCard(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Inspection Window: Borderless, Attractive Frosted Glass with Cyan Aura */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F1B33]/95 via-[#0A1224]/95 to-[#060B16]/95 border-t border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,166,255,0.2)] flex flex-col backdrop-blur-2xl"
            >
              {/* Ambient Inner Cyan Glow */}
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

              {/* Window Header: Seamless, Borderless, Clean */}
              <div className="w-full pt-5 px-6 sm:px-7 flex items-center justify-between select-none relative z-10">
                <span className="text-xs sm:text-sm font-sans font-semibold text-white tracking-wide">
                  {inspectedCard.badge} • {inspectedCard.title}
                </span>

                <div className="flex items-center gap-3">
                  {/* Normal Text (No Capsule / No Border) */}
                  <span className="text-xs font-sans font-medium text-primary tracking-wide">
                    {inspectedCard.label}
                  </span>

                  <button
                    type="button"
                    onClick={() => setInspectedCard(null)}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close inspection window"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Window Body: Strictly User Content */}
              <div className="p-6 sm:p-7 space-y-4 relative z-10">
                <div className="flex items-start gap-4">
                  {/* Glowing Icon Dock */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-primary/25 to-primary/5 text-primary shadow-[0_0_20px_rgba(0,166,255,0.3)]">
                    {React.createElement(inspectedCard.icon, { className: 'w-6 h-6' })}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
                      {inspectedCard.badge} • {inspectedCard.title}
                    </h3>
                    <span className="text-xs font-sans font-medium text-primary">
                      {inspectedCard.label}
                    </span>
                  </div>
                </div>

                {/* Description: Strictly User-Provided Text */}
                <p className="text-sm font-sans text-slate-200 leading-relaxed font-normal pt-2">
                  {inspectedCard.desc}
                </p>
              </div>

              {/* Window Footer Actions: Seamless, No Harsh Divider Line */}
              <div className="pb-5 px-6 sm:px-7 flex items-center justify-between relative z-10">
                <span className="text-xs font-sans text-slate-400 font-medium">
                  DemandFlow Bridge Unified Platform
                </span>
                <button
                  type="button"
                  onClick={() => setInspectedCard(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-[#008EDC] text-[#050811] font-sans font-bold text-xs hover:shadow-[0_0_20px_rgba(0,166,255,0.45)] transition-all cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WhatIsPlatform