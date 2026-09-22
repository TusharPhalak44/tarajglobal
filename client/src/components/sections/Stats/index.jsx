import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Building2, 
  Database, 
  Target, 
  Rocket, 
  Cpu
} from 'lucide-react'
import { AnimatedSectionBackground, SectionLaserDivider } from '@components/animations'
import { gsap, ScrollTrigger } from '@animations/gsap'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useTheme } from '@context/ThemeContext'

/**
 * EngineCounter
 * Premium single-trigger kinetic counter from 0 to target with smooth decelerating easing.
 */
const EngineCounter = ({ target, duration = 1800, delay = 0, shouldAnimate }) => {
  const [display, setDisplay] = useState(0)
  const hasRun = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(target)
      return
    }

    if (shouldAnimate && !hasRun.current) {
      hasRun.current = true
      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        // Decelerating exponential ease-out curve (fast start -> smooth natural landing)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setDisplay(Math.floor(ease * target))

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setDisplay(target)
        }
      }

      const timer = setTimeout(() => {
        requestAnimationFrame(step)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [shouldAnimate, target, duration, delay, prefersReducedMotion])

  return <span>{prefersReducedMotion ? target.toLocaleString() : display.toLocaleString()}</span>
}

export const Stats = () => {
  const sectionRef = useRef(null)
  const engineCanvasRef = useRef(null)
  const coreRef = useRef(null)
  const scannerRef = useRef(null)

  // Trigger when 25-35% of the section is visible in viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })
  const prefersReducedMotion = useReducedMotion()
  
  // Theme reactivity
  const themeContext = useTheme()
  const [isDarkState, setIsDarkState] = useState(true)

  useEffect(() => {
    const checkDark = () => {
      setIsDarkState(document.documentElement.classList.contains('dark'))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const isDark = themeContext?.theme ? themeContext.theme === 'dark' : isDarkState

  const [activeStage, setActiveStage] = useState(0)
  const activeStageRef = useRef(0)
  const [hoveredChamber, setHoveredChamber] = useState(null)

  // Desktop Mouse Parallax (Layers: Frame 3px, Channels 5px, Core 7px, Particles 8px)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || typeof window === 'undefined' || window.innerWidth < 1024) return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth - 0.5) * 2
    const y = (clientY / innerHeight - 0.5) * 2
    setMousePos({ x, y })
  }, [prefersReducedMotion])

  // 4 Vertical Input Chambers Config
  const chambers = [
    {
      id: 'chamber-01',
      index: '01',
      name: 'EXPERIENCE',
      label: 'Industries Served',
      metricNumber: 12,
      suffix: '+',
      metricTitle: 'INDUSTRIES SERVED',
      metricDesc: 'B2B SaaS, Cloud, Cybersecurity, FinTech, HealthTech & Enterprise Hardware.',
      icon: Building2,
      color: '#FF6D00',
      x: 100, // SVG coordinate
      y: 70,
      path: 'M 140,110 C 180,140 240,180 320,195',
      delay: 150,
      counterDelay: 0, // Starts immediately
    },
    {
      id: 'chamber-02',
      index: '02',
      name: 'DATA',
      label: 'Campaigns Delivered',
      metricNumber: 2100,
      suffix: '+',
      metricTitle: 'CAMPAIGNS DELIVERED',
      metricDesc: 'High-converting multi-channel demand generation and ABM initiatives.',
      icon: Database,
      color: '#00A6FF',
      x: 280,
      y: 40,
      path: 'M 300,90 C 320,130 350,165 370,190',
      delay: 350,
      counterDelay: 100, // +100ms stagger
    },
    {
      id: 'chamber-03',
      index: '03',
      name: 'TARGETING',
      label: 'Leads Monthly',
      metricNumber: 1500,
      suffix: '+',
      metricTitle: 'QUALIFIED LEADS GENERATED MONTHLY',
      metricDesc: 'Decision-maker matched opportunities delivered straight into sales pipelines.',
      icon: Target,
      color: '#A855F7',
      x: 520,
      y: 40,
      path: 'M 500,90 C 480,130 450,165 430,190',
      delay: 550,
      counterDelay: 200, // +200ms stagger
    },
    {
      id: 'chamber-04',
      index: '04',
      name: 'EXECUTION',
      label: 'Pipeline Multiplier',
      metricNumber: 16,
      suffix: '+',
      metricTitle: 'AVERAGE PIPELINE MULTIPLIER',
      metricDesc: 'Predictable pipeline acceleration measured across client multi-quarter cohorts.',
      icon: Rocket,
      color: '#EC4899',
      x: 700,
      y: 70,
      path: 'M 660,110 C 620,140 560,180 480,195',
      delay: 750,
      counterDelay: 300, // +300ms stagger
    },
  ]

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // 1. Core subtle breathing
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          scale: 1.03,
          boxShadow: isDark 
            ? '0 0 45px rgba(0, 166, 255, 0.45)' 
            : '0 10px 40px -5px rgba(0, 166, 255, 0.35)',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // 2. Vertical Scanner Beam movement on scroll
      if (scannerRef.current) {
        gsap.to(scannerRef.current, {
          top: '85%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        })
      }

      // 3. ScrollTrigger Stage Progression (0-25% -> 25-50% -> 50-75% -> 75-100%)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress
          const nextStage = Math.min(Math.floor(p * 4), 3)
          if (nextStage !== activeStageRef.current) {
            activeStageRef.current = nextStage
            setActiveStage(nextStage)
          }
        },
      })

      // 4. GSAP ScrollTrigger Count-up Animation for all stat cards
      const counterElements = sectionRef.current.querySelectorAll('.stat-counter-number')
      counterElements.forEach((el) => {
        const targetValue = parseFloat(el.getAttribute('data-value')) || 0
        const suffix = el.getAttribute('data-suffix') || ''
        const counterObj = { val: 0 }

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(counterObj, {
              val: targetValue,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                const formatted = Math.floor(counterObj.val).toLocaleString()
                el.innerText = `${formatted}${suffix}`
              },
              onComplete: () => {
                el.innerText = `${targetValue.toLocaleString()}${suffix}`
              },
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion, isDark])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFAFA] dark:bg-[#03060D] text-slate-900 dark:text-white select-none transition-colors duration-300"
      style={{
        position: 'relative',
        zIndex: 1,
      }}
      aria-label="Built on Experience. Focused on Outcomes. — The Growth Engine"
    >
      <AnimatedSectionBackground accent="blue" />

      {/* ── Background Grid & Architectural Guides ──────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            transform: `translate3d(${mousePos.x * 2}px, ${mousePos.y * 2}px, 0)`,
            transition: 'transform 0.4s ease-out',
          }}
        />
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute top-1/4 -left-24 w-[650px] h-[650px] rounded-full blur-[170px] bg-primary/5 dark:bg-primary/8" />
        <div className="absolute bottom-1/4 -right-24 w-[600px] h-[600px] rounded-full blur-[170px] bg-[#A855F7]/5 dark:bg-[#A855F7]/8" />
      </div>

      {/* ── Thin Vertical Scanner Beam ──────────────────────────────── */}
      <div
        ref={scannerRef}
        className="absolute left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent pointer-events-none z-10 opacity-70 shadow-[0_0_15px_rgba(0,229,255,0.7)] hidden lg:block"
        style={{ top: '15%' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ── HEADING & COPY (LEFT) + OUTCOME CORE DIAGRAM (RIGHT / OPPOSITE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (Span 5): Eyebrow, Heading, New Copy, & Live Engine Status */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow: BUSINESS OUTCOMES / 01 with extending line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[#FF6D00] uppercase">
                BUSINESS OUTCOMES / 01
              </span>
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-[#FF6D00] to-transparent opacity-80" />
            </motion.div>

            {/* Editorial Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-5 font-heading"
            >
              <span className="block">BUILT ON</span>
              <span className="block text-slate-800 dark:text-slate-100 mb-1">EXPERIENCE.</span>
              <span className="block text-slate-900 dark:text-white">FOCUSED ON</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#0088FF] to-cta font-black">
                OUTCOMES.
              </span>
            </motion.h2>

            {/* User-Requested Detailed Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl mb-6"
            >
              We work with the leading business firms globally to deliver what actually drives them providing consumer leads that increase their sales. We motivate consumers to embrace your business and build a long term relationship with you. We are experienced in creating digital experiences that generate high quality leads that increase the growth of any business.
            </motion.p>

            {/* Live Engine Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/10 dark:border-white/10 w-fit backdrop-blur-md shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
                GROWTH ENGINE
              </span>
              <span className="text-slate-400 dark:text-slate-600">//</span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                SYSTEM READY
              </span>
            </motion.div>
          </div>

          {/* Right Column (Span 7 / Directly Opposite): Outcome Core Diagram Canvas */}
          <div className="lg:col-span-7">
            {/* ── Mobile/Tablet Responsive Flow (< 1024px) ── */}
            <div className="block lg:hidden mt-2">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                {chambers.map((c) => {
                  const Icon = c.icon
                  return (
                    <div
                      key={`mobile-${c.id}`}
                      className="p-3 sm:p-4 rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all"
                      style={{
                        backgroundColor: isDark ? 'rgba(7, 11, 20, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                        borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center border"
                          style={{
                            backgroundColor: `${c.color}18`,
                            borderColor: `${c.color}40`,
                            color: c.color,
                          }}
                        >
                          <Icon size={14} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                          {c.index}
                        </span>
                      </div>

                      <div className="flex items-baseline my-1">
                        <span
                          className="stat-counter-number font-mono text-[20px] sm:text-[24px] font-bold leading-none tracking-tight"
                          style={{ color: c.color }}
                          data-value={c.metricNumber}
                          data-suffix={c.suffix}
                        >
                          {prefersReducedMotion ? `${c.metricNumber.toLocaleString()}${c.suffix}` : `0${c.suffix}`}
                        </span>
                      </div>

                      <span
                        className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase block leading-tight mb-1 text-slate-800 dark:text-slate-200"
                      >
                        {c.name}
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {c.label}
                      </p>

                      <div className="w-full h-1 bg-slate-900/10 dark:bg-white/10 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: '75%',
                            backgroundColor: c.color,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Outcome Core for Mobile */}
              <div className="mt-4 p-4 rounded-2xl flex flex-col items-center justify-center bg-white/95 dark:bg-[#070B14]/95 border border-primary/30 dark:border-primary/40 shadow-lg backdrop-blur-xl text-center">
                <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono font-bold tracking-widest text-primary">
                  <Cpu size={12} className="animate-pulse" />
                  <span>OUTCOME CORE // ENGINE ACTIVE</span>
                </div>
                <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white uppercase font-mono">
                  OUTCOME
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#00A6FF] uppercase mt-0.5 font-bold">
                  PIPELINE IMPACT
                </span>
                <div className="mt-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    CONVERSION ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Canvas (lg:block hidden) */}
            <div 
              ref={engineCanvasRef}
              className="hidden lg:block relative w-full h-[320px] sm:h-[360px] lg:h-[380px] xl:h-[400px] select-none"
              style={{
                transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0)`,
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              
              {/* SVG Energy Delivery Architecture (760x360) */}
              <svg viewBox="0 0 760 360" className="w-full h-full overflow-visible">
                <defs>
                  {chambers.map((c) => (
                    <linearGradient key={`grad-${c.id}`} id={`grad-${c.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={c.color} stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00A6FF" stopOpacity="0.4" />
                    </linearGradient>
                  ))}

                  {/* Chamber paths for animated energy particles */}
                  {chambers.map((c) => (
                    <path key={`path-def-${c.id}`} id={`channel-${c.id}`} d={c.path} fill="none" />
                  ))}
                </defs>

                {/* ── 1. Structural Energy Channel Guides ─────────────────── */}
                {chambers.map((c, idx) => {
                  const isActive = activeStage === idx || hoveredChamber === idx

                  return (
                    <g key={`track-${c.id}`}>
                      {/* Inactive Base Track */}
                      <path
                        d={c.path}
                        fill="none"
                        stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)'}
                        strokeWidth="1.5"
                        strokeDasharray="3 5"
                      />
                      {/* Illuminated Active Channel */}
                      <path
                        d={c.path}
                        fill="none"
                        stroke={`url(#grad-${c.id})`}
                        strokeWidth={isActive ? '2.5' : '1.5'}
                        opacity={isActive ? 1 : 0.4}
                        className="transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(0,166,255,0.4)]"
                      />
                    </g>
                  )
                })}

                {/* ── 2. Travelling Energy Photons into the Core ──────────── */}
                {!prefersReducedMotion && (
                  <>
                    {chambers.map((c, idx) => (
                      <circle
                        key={`photon-${c.id}`}
                        r="3.5"
                        fill={c.color}
                        filter={`drop-shadow(0 0 8px ${c.color})`}
                      >
                        <animateMotion
                          dur={`${3.8 + idx * 0.4}s`}
                          repeatCount="indefinite"
                          delay={`${idx * 0.9}s`}
                        >
                          <mpath href={`#channel-${c.id}`} />
                        </animateMotion>
                      </circle>
                    ))}
                  </>
                )}
              </svg>

              {/* ── 3. Four Vertical Input Chambers (Top Perimeter) ───────── */}
              {chambers.map((c, idx) => {
                const Icon = c.icon
                const isHovered = hoveredChamber === idx
                const isActive = activeStage === idx || isHovered
                const leftPct = (c.x / 760) * 100
                const topPct = (c.y / 360) * 100

                return (
                  <div
                    key={c.id}
                    className="absolute -translate-x-1/2 pointer-events-auto cursor-pointer transition-all duration-300"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      zIndex: 30,
                      transform: `translateX(-50%) translateY(${isHovered ? '-6px' : '0px'})`,
                    }}
                    onMouseEnter={() => setHoveredChamber(idx)}
                    onMouseLeave={() => setHoveredChamber(null)}
                  >
                    {/* Structural Input Chamber Box */}
                    <div
                      className="w-32 sm:w-36 lg:w-36 p-2.5 sm:p-3 rounded-xl border backdrop-blur-md flex flex-col transition-all duration-300"
                      style={{
                        backgroundColor: isDark
                          ? (isActive ? 'rgba(7, 11, 20, 0.95)' : 'rgba(7, 11, 20, 0.75)')
                          : (isActive ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.88)'),
                        borderColor: isActive 
                          ? c.color 
                          : (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'),
                        boxShadow: isActive 
                          ? (isDark ? `0 0 24px ${c.color}40` : `0 8px 24px -4px ${c.color}35`)
                          : (isDark ? 'none' : '0 4px 16px -4px rgba(0,0,0,0.06)'),
                      }}
                    >
                      {/* Top Bar: Icon + Index + Status Pip */}
                      <div className="flex items-center justify-between mb-1.5">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center border"
                          style={{
                            backgroundColor: `${c.color}18`,
                            borderColor: `${c.color}40`,
                            color: c.color,
                          }}
                        >
                          <Icon size={13} />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400">
                            {c.index}
                          </span>
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: isActive ? c.color : (isDark ? '#64748B' : '#94A3B8'),
                              boxShadow: isActive ? `0 0 6px ${c.color}` : 'none',
                            }}
                          />
                        </div>
                      </div>

                      {/* 1 & 2: Repositioned Number ABOVE Heading (20px, font-weight 600) */}
                      <div className="flex items-baseline my-0.5">
                        <span
                          className="stat-counter-number font-mono text-[18px] sm:text-[20px] font-semibold leading-none tracking-tight"
                          style={{ color: c.color }}
                          data-value={c.metricNumber}
                          data-suffix={c.suffix}
                        >
                          {prefersReducedMotion ? `${c.metricNumber.toLocaleString()}${c.suffix}` : `0${c.suffix}`}
                        </span>
                      </div>

                      {/* Chamber Heading */}
                      <span
                        className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase block leading-tight mb-1"
                        style={{ color: isActive ? c.color : (isDark ? '#F1F5F9' : '#1E293B') }}
                      >
                        {c.name}
                      </span>

                      {/* Energy Level Bar */}
                      <div className="w-full h-1 bg-slate-900/10 dark:bg-white/10 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: isActive ? '100%' : '35%',
                            backgroundColor: c.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* ── 4. Central Geometric Outcome Core (The Processing Unit) ─ */}
              <div
                ref={coreRef}
                className="absolute left-1/2 top-[58%] sm:top-[60%] -translate-x-1/2 -translate-y-1/2 w-40 sm:w-46 h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center bg-white/95 dark:bg-[#070B14]/95 border border-primary/30 dark:border-primary/40 shadow-[0_10px_35px_-5px_rgba(0,166,255,0.22)] dark:shadow-[0_0_40px_rgba(0,166,255,0.35)] backdrop-blur-xl z-20 pointer-events-auto cursor-default transition-all duration-300"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${mousePos.x * 7}px, ${mousePos.y * 7}px, 0)`,
                }}
              >
                {/* Hexagonal/Geometric Corner Accent Marks */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-primary/50 dark:border-primary/70" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-primary/50 dark:border-primary/70" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-primary/50 dark:border-primary/70" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-primary/50 dark:border-primary/70" />

                {/* Core Processing Telemetry */}
                <div className="flex items-center gap-1.5 mb-1 text-[8px] font-mono font-bold tracking-widest text-primary">
                  <Cpu size={11} className="animate-pulse" />
                  <span>OUTCOME CORE</span>
                </div>

                <span className="text-lg sm:text-xl font-black tracking-wider text-slate-900 dark:text-white uppercase font-mono">
                  OUTCOME
                </span>

                <span className="text-[8px] font-mono tracking-widest text-[#00A6FF] uppercase mt-0.5 font-bold">
                  PIPELINE IMPACT
                </span>

                {/* Live Throughput Badge */}
                <div className="mt-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[7px] sm:text-[8px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    CONVERSION ACTIVE
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ── Bottom Laser Divider ────────────────────────────────────────── */}
      <SectionLaserDivider variant="amber" position="bottom" />
    </section>
  )
}

export default Stats
