import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Sparkles,
  Layers,
  Network,
  Cpu,
  CheckCircle2,
  Workflow,
  Monitor,
  ShieldCheck,
  Rocket,
  ChevronRight,
  Compass,
} from 'lucide-react'

/**
 * 9 Operations Pipeline Milestones
 * Spans seamlessly from Section 1 (Hero) to Section 9 (Final CTA)
 */
const SECTIONS_CONFIG = [
  {
    id: 'hero',
    num: '01',
    name: 'Platform',
    label: 'B2B CRM Engine',
    desc: 'Demand operations unified',
    icon: Sparkles,
    color: '#00A6FF',
    accentColor: '#38BDF8',
  },
  {
    id: 'overview',
    num: '02',
    name: 'Architecture',
    label: 'Unified CRM Core',
    desc: 'One platform for all functions',
    icon: Layers,
    color: '#00D2FF',
    accentColor: '#67E8F9',
  },
  {
    id: 'ecosystem',
    num: '03',
    name: 'Ecosystem',
    label: 'Connected Topology',
    desc: '8 business operations synced',
    icon: Network,
    color: '#FF6D00',
    accentColor: '#FFA600',
  },
  {
    id: 'ai-intent-engine',
    num: '04',
    name: 'AI Engine',
    label: 'AI & Intent Signals',
    desc: 'Intent scoring & telemetry',
    icon: Cpu,
    color: '#00D2FF',
    accentColor: '#38BDF8',
  },
  {
    id: 'capabilities',
    num: '05',
    name: 'Capabilities',
    label: '7 Deep Modules',
    desc: 'Full-spectrum execution',
    icon: Layers,
    color: '#10B981',
    accentColor: '#34D399',
  },
  {
    id: 'technology-workflow',
    num: '06',
    name: 'Lifecycle',
    label: '5-Step Workflow',
    desc: 'Intake to SLA delivery',
    icon: Workflow,
    color: '#3B82F6',
    accentColor: '#60A5FA',
  },
  {
    id: 'showcase',
    num: '07',
    name: 'Console',
    label: 'Product Views',
    desc: 'Production application telemetry',
    icon: Monitor,
    color: '#00A6FF',
    accentColor: '#38BDF8',
  },
  {
    id: 'why-one-platform',
    num: '08',
    name: 'Advantage',
    label: 'Zero Redundancy',
    desc: 'Less switching, more control',
    icon: ShieldCheck,
    color: '#FF6D00',
    accentColor: '#FFA600',
  },
  {
    id: 'cta',
    num: '09',
    name: 'Launch',
    label: 'Operations Ready',
    desc: 'Deploy in minutes',
    icon: Rocket,
    color: '#00A6FF',
    accentColor: '#38BDF8',
  },
]

/**
 * DoodleScrollAnimation (V4 — The Cyber Flow Spine & Operations Rail)
 * ─────────────────────────────────────────────────────────────────────────────
 * A breathtaking, high-tech, and delightful scroll-flow system engineered
 * specifically for DemandFlow Bridge:
 *
 * 1. THE ILLUMINATED ENERGY SPINE:
 *    A luminous, multi-layered cyber-stream running gracefully down the margin,
 *    illuminating active sections with glowing photon waves.
 *
 * 2. THE QUANTUM TRAVELING CORE:
 *    A radiant glowing bead with expanding energy ripples, spinning micro-photons,
 *    and trailing comet stardust that glides along the scroll spine at 120 FPS.
 *
 * 3. INTERACTIVE OPERATIONS COMMAND RAIL:
 *    An ultra-sleek, floating glassmorphic stepper on the screen margin showing
 *    all 8 interconnected stages. Shows real-time progress percentage, active
 *    stage telemetry, and click-to-scroll smooth navigation.
 *
 * 4. AMBIENT SECTION TRANSITION PORTALS:
 *    Delightful holographic blueprint radar rings and glowing crosshair accents
 *    located in the spacious section transition margins—never overlapping content!
 */
const DoodleScrollAnimation = ({ containerRef }) => {
  const prefersReducedMotion = useReducedMotion()

  const [activeSectionIdx, setActiveSectionIdx] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)
  const [sectionTops, setSectionTops] = useState([])
  const [isRailExpanded, setIsRailExpanded] = useState(false)

  // Track global window scroll progress [0, 1]
  const { scrollYProgress } = useScroll()

  // Liquid-smooth spring interpolation for the traveling core
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001,
  })

  // Measure sections relative to document
  const measureSections = useCallback(() => {
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      7000
    )

    const measured = SECTIONS_CONFIG.map((sec, idx) => {
      const el = document.getElementById(sec.id)
      if (!el) {
        return {
          id: sec.id,
          top: (idx / (SECTIONS_CONFIG.length - 1)) * docHeight,
          ratio: idx / (SECTIONS_CONFIG.length - 1),
        }
      }
      const rect = el.getBoundingClientRect()
      const absTop = rect.top + window.scrollY
      return {
        id: sec.id,
        top: Math.max(0, absTop),
        ratio: Math.min(1, Math.max(0, absTop / (docHeight - window.innerHeight || 1))),
      }
    })

    setSectionTops(measured)
  }, [])

  useEffect(() => {
    measureSections()
    window.addEventListener('resize', measureSections)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      const currentPct = Math.min(100, Math.max(0, Math.round((scrollY / maxScroll) * 100)))
      setScrollPct(currentPct)

      // Determine active section based on current viewport midpoint
      const viewportMid = scrollY + window.innerHeight * 0.4
      let currentIdx = 0
      for (let i = 0; i < SECTIONS_CONFIG.length; i++) {
        const el = document.getElementById(SECTIONS_CONFIG[i].id)
        if (el) {
          const top = el.offsetTop
          if (viewportMid >= top) {
            currentIdx = i
          }
        }
      }
      setActiveSectionIdx(currentIdx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const t1 = setTimeout(measureSections, 400)
    const t2 = setTimeout(measureSections, 1500)

    return () => {
      window.removeEventListener('resize', measureSections)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [measureSections])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentSection = SECTIONS_CONFIG[activeSectionIdx] || SECTIONS_CONFIG[0]

  return (
    <>
      {/* ── 1. AMBIENT BACKGROUND GLOW STREAM (Fixed Right-Edge Cyber Spine) ── */}
      <div
        aria-hidden="true"
        className="fixed top-0 bottom-0 right-0 w-24 pointer-events-none select-none z-30 hidden lg:block overflow-hidden"
      >
        {/* Soft vertical ambient neon aura */}
        <div
          className="absolute top-0 bottom-0 right-3 w-1 opacity-40 blur-[2px] transition-colors duration-700"
          style={{
            background: `linear-gradient(180deg, #00A6FF 0%, ${currentSection.color} 50%, #FF6D00 100%)`,
          }}
        />

        {/* Crisp illuminated fiber-optic spine line */}
        <div className="absolute top-0 bottom-0 right-3.5 w-[2px] bg-white/[0.08]" />

        {/* Active glowing progress fill line */}
        <motion.div
          className="absolute top-0 right-3.5 w-[2.5px] origin-top rounded-full"
          style={{
            scaleY: smoothProgress,
            background: 'linear-gradient(180deg, #00A6FF 0%, #00D2FF 35%, #FF6D00 70%, #10B981 100%)',
            boxShadow: '0 0 12px rgba(0, 166, 255, 0.8), 0 0 24px rgba(0, 166, 255, 0.4)',
          }}
        />

        {/* Traveling Quantum Flow Core (glides dynamically with scroll) */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute right-1 w-6 h-6 -translate-y-1/2 flex items-center justify-center pointer-events-none"
            style={{
              top: `${scrollPct}%`,
              transition: 'top 0.1s linear',
            }}
          >
            {/* Outer pulse aura */}
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-60"
              style={{ background: currentSection.color }}
            />
            {/* Mid fiery halo */}
            <div
              className="absolute w-4 h-4 rounded-full blur-[2px]"
              style={{ background: currentSection.accentColor }}
            />
            {/* Bright diamond photon core */}
            <div className="relative w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#FFFFFF] border border-primary" />
          </motion.div>
        )}
      </div>

      {/* ── 2. FLOATING OPERATIONS COMMAND RAIL (Desktop Interactive Dock) ── */}
      <nav
        aria-label="Operations Pipeline Navigation"
        className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-40 hidden lg:flex flex-col items-end gap-2.5 select-none"
        onMouseEnter={() => setIsRailExpanded(true)}
        onMouseLeave={() => setIsRailExpanded(false)}
      >
        {/* Glassmorphic Stepper Card */}
        <div className="flex flex-col gap-2 p-2.5 rounded-2xl bg-[#060B16]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_16px_rgba(0,166,255,0.12)]">
          
          {/* Header Pill: Live Telemetry Status */}
          <div className="flex items-center justify-between gap-3 px-2 py-1 mb-1 border-b border-white/10 text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>FLOW</span>
            </div>
            <span className="text-white/60 font-mono font-bold">
              {scrollPct}%
            </span>
          </div>

          {/* 8 Connected Section Milestones */}
          {SECTIONS_CONFIG.map((sec, idx) => {
            const isActive = idx === activeSectionIdx
            const Icon = sec.icon
            const isPassed = idx < activeSectionIdx

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`group relative flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-300 cursor-pointer text-left ${
                  isActive
                    ? 'bg-primary/15 border border-primary/40 shadow-[0_0_12px_rgba(0,166,255,0.25)]'
                    : 'border border-transparent hover:bg-white/[0.06] hover:border-white/10'
                }`}
              >
                {/* Milestone Node Indicator */}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isActive
                      ? 'bg-primary text-white scale-110 shadow-[0_0_10px_#00A6FF]'
                      : isPassed
                      ? 'bg-white/10 text-emerald-400 border border-emerald-400/30'
                      : 'bg-white/5 text-white/40 border border-white/10 group-hover:text-primary group-hover:border-primary/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Expanded Label & Details (Smooth Width Expansion on Hover or when Active) */}
                <AnimatePresence>
                  {(isRailExpanded || isActive) && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap pr-2"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-white/40 font-bold">
                          {sec.num}
                        </span>
                        <span
                          className={`text-xs font-bold tracking-tight transition-colors ${
                            isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                          }`}
                        >
                          {sec.name}
                        </span>
                      </div>
                      <div className="text-[9px] font-mono text-text-secondary leading-tight line-clamp-1">
                        {sec.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Glowing Dot Accent */}
                {isActive && (
                  <motion.div
                    layoutId="activeRailDot"
                    className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_#00A6FF] shrink-0 ml-auto"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            )
          })}

          {/* Quick Scroll-To-Top / Bottom Quick Button */}
          <div className="pt-1 mt-1 border-t border-white/10 flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-[9px] font-mono text-white/50 hover:text-primary transition-colors cursor-pointer py-0.5 px-1 rounded hover:bg-white/5"
            >
              TOP ↑
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('cta')}
              className="text-[9px] font-mono text-cta font-bold hover:text-cta-hover transition-colors cursor-pointer py-0.5 px-1 rounded hover:bg-white/5"
            >
              CTA ↓
            </button>
          </div>

        </div>
      </nav>

      {/* ── 3. MOBILE FLOATING PIPELINE STATUS BAR (Screen < 1024px) ── */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden pointer-events-auto">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#060B16]/90 backdrop-blur-xl border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.8),0_0_12px_rgba(0,166,255,0.15)]">
          
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-[0_0_8px_rgba(0,166,255,0.3)]">
              {React.createElement(currentSection.icon, { className: 'w-3.5 h-3.5' })}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-primary font-bold">
                  {currentSection.num}
                </span>
                <span className="text-xs font-bold text-white truncate">
                  {currentSection.name}
                </span>
              </div>
              <div className="text-[9.5px] text-white/50 truncate font-mono">
                {currentSection.label}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-[10px] font-mono font-bold text-white/70">
              {scrollPct}%
            </div>

            {/* Quick Next Section Button */}
            {activeSectionIdx < SECTIONS_CONFIG.length - 1 ? (
              <button
                type="button"
                onClick={() => scrollToSection(SECTIONS_CONFIG[activeSectionIdx + 1].id)}
                className="px-2.5 py-1 rounded-lg bg-primary/20 border border-primary/40 text-primary text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
              >
                <span>NEXT</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => scrollToSection('hero')}
                className="px-2.5 py-1 rounded-lg bg-cta/20 border border-cta/40 text-cta text-[10px] font-mono font-bold cursor-pointer active:scale-95 transition-transform"
              >
                TOP ↑
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default DoodleScrollAnimation
