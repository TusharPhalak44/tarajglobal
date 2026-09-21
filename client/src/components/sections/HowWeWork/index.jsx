import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  Search, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react'
import { AnimatedSectionBackground, SectionLaserDivider } from '@components/animations'
import { RevenueProcessVisual } from './StageVisuals'
import { gsap, ScrollTrigger } from '../../../animations/gsap'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useTheme } from '@context/ThemeContext'

export const HowWeWork = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStage, setActiveStage] = useState(0)
  const [lineProgressPct, setLineProgressPct] = useState(20)
  const sectionRef = useRef(null)
  const desktopPinRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const stages = [
    {
      num: '01',
      title: 'DEFINE',
      label: 'Strategy & ICP Mapping',
      desc: 'Audit TAM, calibrate ideal customer attributes, and establish revenue benchmarks.',
      icon: Target,
      color: '#0066CC',
      glow: 'rgba(0,102,204,0.4)',
    },
    {
      num: '02',
      title: 'IDENTIFY',
      label: 'Decision-Maker Intelligence',
      desc: 'Discover active buying committees using live intent signals and direct B2B data.',
      icon: Search,
      color: '#00A6FF',
      glow: 'rgba(0,166,255,0.4)',
    },
    {
      num: '03',
      title: 'ENGAGE',
      label: 'Multi-Channel Cadence',
      desc: 'Deploy personalized outbound sequences and content syndication to buying committees.',
      icon: Zap,
      color: '#10B981',
      glow: 'rgba(16,185,129,0.4)',
    },
    {
      num: '04',
      title: 'QUALIFY',
      label: 'Intent & BANT Scoring',
      desc: 'Evaluate prospects against Budget, Authority, Need, and Timeline parameters.',
      icon: TrendingUp,
      color: '#FF6D00',
      glow: 'rgba(255,109,0,0.4)',
    },
    {
      num: '05',
      title: 'CONVERT',
      label: 'Closed-Loop Revenue',
      desc: 'Deliver confirmed executive discovery appointments directly into sales calendars.',
      icon: CheckCircle2,
      color: '#00E5FF',
      glow: 'rgba(0,229,255,0.4)',
    },
  ]

  const activeStageRef = useRef(0)
  const progressLineRef = useRef(null)

  // GSAP ScrollTrigger Pinned Storytelling on Desktop
  // As user scrolls vertically DOWN, the timeline moves HORIZONTALLY (Left -> Right)
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop || prefersReducedMotion || !sectionRef.current || !desktopPinRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: desktopPinRef.current,
        start: 'top top+=65px',
        end: '+=1600px', // ~350vh scroll distance
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          const pct = Math.min(Math.max(p * 100, 10), 100)
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${pct}%`
          }

          // Update stage ONLY when changing between 0-4
          const currentStage = Math.min(Math.floor(p * stages.length), stages.length - 1)
          if (currentStage !== activeStageRef.current) {
            activeStageRef.current = currentStage
            setActiveStage(currentStage)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [stages.length, prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative py-10 lg:py-12 overflow-hidden"
      style={{
        position: 'relative',
        zIndex: 1,
      }}
      aria-label="How We Work — From Targeting to Revenue"
    >
      <AnimatedSectionBackground accent="cyan" />

      <div ref={desktopPinRef} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between">
        
        {/* ── 1. LEFT-ALIGNED EDITORIAL HEADER ───────────────────────── */}
        <div className="max-w-3xl mb-4 lg:mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2 shadow-xs">
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">
              HOW WE WORK
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight leading-[1.14] mb-2">
            From Targeting{' '}
            <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
              to Revenue.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
            Every campaign follows a structured, data-driven revenue growth process designed to move the right prospects from initial targeting to qualified sales opportunities.
          </p>
        </div>

        {/* ── 2. HORIZONTAL TIMELINE PROGRESSION (LEFT → RIGHT) ──────── */}
        <div className="relative w-full mb-4 lg:mb-5">
          
          {/* Desktop & Tablet: Fixed Horizontal Row (Same Axis) */}
          <div className="hidden md:block relative pt-2 pb-1">
            
            {/* Background Inactive Base Line */}
            <div className="absolute top-[28px] left-6 right-6 h-1 bg-black/10 dark:bg-white/10 rounded-full z-0" />

            {/* Active Physical Progress Line Growing Left -> Right */}
            <div
              ref={progressLineRef}
              className="absolute top-[28px] left-6 h-1 bg-gradient-to-r from-primary via-[#00A6FF] to-cta rounded-full z-0 transition-all duration-300 shadow-[0_0_14px_rgba(0,166,255,0.6)]"
              style={{
                width: `${Math.max(lineProgressPct, ((activeStage + 1) / stages.length) * 100 - 4)}%`,
              }}
            />

            {/* 5 Stages Grid strictly on the SAME HORIZONTAL ROW */}
            <div className="grid grid-cols-5 gap-2 lg:gap-4 relative z-10">
              {stages.map((st, idx) => {
                const isActive = activeStage === idx
                const isCompleted = activeStage > idx
                const StageIcon = st.icon

                return (
                  <button
                    key={st.num}
                    onClick={() => setActiveStage(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-hidden transition-all duration-300"
                  >
                    {/* Node Circle on the line */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.12 : 1,
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-400 mb-2 ${
                        isActive
                          ? 'border-2 bg-surface dark:bg-[#0A0E18] text-white shadow-xl ring-2'
                          : isCompleted
                          ? 'border-2 bg-surface dark:bg-[#0A0E18] text-primary opacity-100 shadow-sm'
                          : 'border bg-surface/80 dark:bg-white/5 border-border/80 dark:border-white/10 text-text-muted opacity-45 group-hover:opacity-75'
                      }`}
                      style={{
                        borderColor: (isActive || isCompleted) ? st.color : undefined,
                        ringColor: isActive ? st.color : undefined,
                        boxShadow: isActive ? `0 0 20px ${st.glow}` : isCompleted ? `0 0 10px ${st.glow}` : undefined,
                      }}
                    >
                      <StageIcon size={17} style={{ color: st.color }} />
                    </motion.div>

                    {/* Stage Number & Title */}
                    <div className="space-y-0.5 w-full px-1">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`text-[10px] font-mono font-bold tracking-wider ${
                          isActive ? 'text-primary' : 'text-text-muted'
                        }`}>
                          {st.num}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-extrabold tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-text-primary' : 'text-text-muted/70'
                        }`}>
                          {st.title}
                        </h4>
                      </div>

                      {/* Sub-label & Description */}
                      <p className={`text-[10px] font-semibold transition-opacity duration-300 line-clamp-1 ${
                        isActive ? 'text-text-primary opacity-100' : 'text-text-muted opacity-50'
                      }`}>
                        {st.label}
                      </p>

                      <p className={`text-[9px] leading-relaxed transition-all duration-300 line-clamp-1 ${
                        isActive ? 'text-text-secondary opacity-100' : 'text-text-muted/60 opacity-40'
                      }`}>
                        {st.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Mobile (<768px): Horizontal Scrollable / Snap Row (Never Stacked) ── */}
          <div className="md:hidden">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-text-muted mb-2 px-1">
              <span>PROCESS PROGRESSION (LEFT → RIGHT)</span>
              <span className="text-primary flex items-center gap-0.5">
                Swipe <ArrowRight size={12} />
              </span>
            </div>

            <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-3 pb-4 pt-2 -mx-4 px-4 no-scrollbar">
              {stages.map((st, idx) => {
                const isActive = activeStage === idx
                const StageIcon = st.icon

                return (
                  <div
                    key={st.num}
                    onClick={() => setActiveStage(idx)}
                    className={`shrink-0 w-[78vw] snap-center p-4 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-surface dark:bg-[#0A0E18] border-primary shadow-lg ring-1 ring-primary/40'
                        : 'bg-surface/80 dark:bg-white/5 border-border/80 dark:border-white/10 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                          style={{ backgroundColor: st.color }}
                        >
                          <StageIcon size={16} />
                        </div>
                        <span className="text-xs font-mono font-bold text-text-primary">
                          {st.num} • {st.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-primary/10 text-primary">
                        Stage 0{idx + 1}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-text-primary mb-1">
                      {st.label}
                    </h5>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* ── 3. CENTRAL REVENUE PROCESS VISUAL (Full Width Card Placed Below Timeline) ── */}
        <div className="w-full">
          <RevenueProcessVisual activeStage={activeStage} />
        </div>

      </div>

      {/* ── Bottom Laser Divider ────────────────────────────────────────── */}
      <SectionLaserDivider variant="cyan" position="bottom" />
    </section>
  )
}

export default HowWeWork
