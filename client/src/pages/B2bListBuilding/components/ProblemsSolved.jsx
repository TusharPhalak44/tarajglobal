import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wand2,
  FilterX,
  Focus,
  MailX,
  MessageSquareQuote,
  ShieldAlert,
  CheckCircle2,
  Workflow,
  Send,
  EyeOff,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── 5 Problem → Engine → Solution Transformation Pairs (B2B List Building) ───

const FLOW_ITEMS = [
  {
    id: 0,
    num: '01',
    category: 'TARGETING',
    engineLabel: 'ICP Engine',
    engineAction: 'Precision Filtering',
    problem: {
      title: 'Poor Audience Targeting',
      sub: 'Broad & Irrelevant Lists',
      icon: FilterX,
    },
    solution: {
      title: 'ICP Focused Targeting',
      sub: 'Verified Decision Makers',
      icon: Focus,
    },
    color: '#00A6FF', // Blue
    gradient: 'from-[#00A6FF] to-[#0070E0]',
  },
  {
    id: 1,
    num: '02',
    category: 'DATA ACCURACY',
    engineLabel: 'Validation Engine',
    engineAction: 'Zero Bounce Cleanse',
    problem: {
      title: 'Outdated Prospect Data',
      sub: 'Stale Records & High Bounce',
      icon: MailX,
    },
    solution: {
      title: 'Fresh Verified Contacts',
      sub: '100% Validated Inboxes',
      icon: MessageSquareQuote,
    },
    color: '#8B5CF6', // Purple
    gradient: 'from-[#8B5CF6] to-[#6D28D9]',
  },
  {
    id: 2,
    num: '03',
    category: 'DECISION MAKERS',
    engineLabel: 'Executive Verifier',
    engineAction: 'Senior Role Taxonomy',
    problem: {
      title: 'Missing Decision-Makers',
      sub: 'Gatekeepers & Generic Inboxes',
      icon: ShieldAlert,
    },
    solution: {
      title: 'Direct Executive Access',
      sub: 'Verified C-Level & VPs',
      icon: CheckCircle2,
    },
    color: '#10B981', // Emerald
    gradient: 'from-[#10B981] to-[#059669]',
  },
  {
    id: 3,
    num: '04',
    category: 'ENRICHMENT',
    engineLabel: 'Enrichment Hub',
    engineAction: 'Deep Account Profiling',
    problem: {
      title: 'Incomplete Contact Info',
      sub: 'Missing Direct Dials & Tech Data',
      icon: Workflow,
    },
    solution: {
      title: 'Enriched Contact Profiles',
      sub: 'Technographics & Direct Dials',
      icon: Send,
    },
    color: '#F59E0B', // Amber
    gradient: 'from-[#F59E0B] to-[#D97706]',
  },
  {
    id: 4,
    num: '05',
    category: 'EFFICIENCY',
    engineLabel: 'Delivery Engine',
    engineAction: 'Campaign-Ready Lists',
    problem: {
      title: 'Manual Research Drag',
      sub: 'Hours Lost on Prospecting',
      icon: EyeOff,
    },
    solution: {
      title: 'Campaign-Ready Delivery',
      sub: 'Instant Outreach Velocity',
      icon: BarChart3,
    },
    color: '#EC4899', // Pink
    gradient: 'from-[#EC4899] to-[#BE185D]',
  },
]

// ─── Timing Constants (Smooth, Measured & Slower Pace) ─────────────────────

const TIMING = {
  problemHighlight: 1000, // 1.0s: problem card highlight
  lineToCenter: 1400,     // 1.4s: smooth comet glide to center engine
  centerReaction: 1500,   // 1.5s: center transformation & shockwave
  lineToSolution: 1400,   // 1.4s: smooth glide to solution card
  solutionHold: 1500,     // 1.5s: solution card celebration & readout
  pauseBetween: 800,      // 0.8s: gentle pause before next item
}

const ProblemsSolved = () => {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const centerCircleRef = useRef(null)
  const problemRefs = useRef([])
  const solutionRefs = useRef([])

  const [activeStep, setActiveStep] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const [phase, setPhase] = useState('problem') // 'problem' | 'toCenter' | 'centerReact' | 'toSolution' | 'solution' | 'pause'
  const [isInView, setIsInView] = useState(false)
  const [paths, setPaths] = useState({ left: [], right: [] })

  // 1. Trigger when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 2. High-Precision Coordinate Math for S-Curves
  const updatePaths = useCallback(() => {
    if (!containerRef.current || !centerCircleRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const circleRect = centerCircleRef.current.getBoundingClientRect()

    const cx = circleRect.left + circleRect.width / 2 - containerRect.left
    const cy = circleRect.top + circleRect.height / 2 - containerRect.top
    const radius = circleRect.width / 2

    const newLeftPaths = []
    const newRightPaths = []

    FLOW_ITEMS.forEach((_, idx) => {
      const pEl = problemRefs.current[idx]
      const sEl = solutionRefs.current[idx]

      if (pEl && sEl) {
        const pRect = pEl.getBoundingClientRect()
        const sRect = sEl.getBoundingClientRect()

        // Problem Card Right Edge
        const pX = pRect.right - containerRect.left
        const pY = pRect.top + pRect.height / 2 - containerRect.top

        // Angle from center to Problem
        const angleLeft = Math.atan2(pY - cy, pX - cx)
        const rimLeftX = cx + radius * Math.cos(angleLeft)
        const rimLeftY = cy + radius * Math.sin(angleLeft)

        // S-Curve Control Points
        const deltaX_L = rimLeftX - pX
        const cp1x_L = pX + deltaX_L * 0.45
        const cp1y_L = pY
        const cp2x_L = pX + deltaX_L * 0.75
        const cp2y_L = rimLeftY

        newLeftPaths.push({
          d: `M ${pX} ${pY} C ${cp1x_L} ${cp1y_L}, ${cp2x_L} ${cp2y_L}, ${rimLeftX} ${rimLeftY}`,
          startX: pX,
          startY: pY,
          rimX: rimLeftX,
          rimY: rimLeftY,
        })

        // Solution Card Left Edge
        const sX = sRect.left - containerRect.left
        const sY = sRect.top + sRect.height / 2 - containerRect.top

        // Angle from center to Solution
        const angleRight = Math.atan2(sY - cy, sX - cx)
        const rimRightX = cx + radius * Math.cos(angleRight)
        const rimRightY = cy + radius * Math.sin(angleRight)

        // S-Curve Control Points
        const deltaX_R = sX - rimRightX
        const cp1x_R = rimRightX + deltaX_R * 0.25
        const cp1y_R = rimRightY
        const cp2x_R = rimRightX + deltaX_R * 0.55
        const cp2y_R = sY

        newRightPaths.push({
          d: `M ${rimRightX} ${rimRightY} C ${cp1x_R} ${cp1y_R}, ${cp2x_R} ${cp2y_R}, ${sX} ${sY}`,
          rimX: rimRightX,
          rimY: rimRightY,
          endX: sX,
          endY: sY,
        })
      }
    })

    setPaths({ left: newLeftPaths, right: newRightPaths })
  }, [])

  useEffect(() => {
    updatePaths()
    window.addEventListener('resize', updatePaths)
    const t = setTimeout(updatePaths, 300)
    return () => {
      window.removeEventListener('resize', updatePaths)
      clearTimeout(t)
    }
  }, [updatePaths])

  // 3. State Machine Storytelling Loop
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    let currentTimer = null

    const runSequence = () => {
      setPhase('problem')

      currentTimer = setTimeout(() => {
        setPhase('toCenter')

        currentTimer = setTimeout(() => {
          setPhase('centerReact')

          currentTimer = setTimeout(() => {
            setPhase('toSolution')

            currentTimer = setTimeout(() => {
              setPhase('solution')

              currentTimer = setTimeout(() => {
                setPhase('pause')

                currentTimer = setTimeout(() => {
                  setActiveStep((prev) => (prev + 1) % FLOW_ITEMS.length)
                  setCycleKey((k) => k + 1)
                }, TIMING.pauseBetween)
              }, TIMING.solutionHold)
            }, TIMING.lineToSolution)
          }, TIMING.centerReaction)
        }, TIMING.lineToCenter)
      }, TIMING.problemHighlight)
    }

    runSequence()

    return () => {
      if (currentTimer) clearTimeout(currentTimer)
    }
  }, [isInView, activeStep, cycleKey, prefersReducedMotion])

  const handleSelectStep = (idx) => {
    setActiveStep(idx)
    setCycleKey((k) => k + 1)
    setPhase('problem')
  }

  const currentItem = FLOW_ITEMS[activeStep]
  const isProblemActive = phase === 'problem' || phase === 'toCenter'
  const isLeftLineActive = phase === 'toCenter'
  const isCenterActive = phase === 'centerReact'
  const isRightLineActive = phase === 'toSolution'
  const isSolutionActive = phase === 'solution' || phase === 'toSolution'

  return (
    <section
      id="what-problems-b2b-list-building-solves"
      ref={sectionRef}
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-[#FAFCFF] dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Problems Does B2B List Building Solve"
    >
      {/* ── Soft Ambient Background Glow ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full blur-[120px] opacity-15 dark:opacity-20 pointer-events-none"
          animate={{
            background: `radial-gradient(circle, ${currentItem.color} 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── COMPACT SECTION HEADER ── */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur-md mb-2 shadow-xs">
            <Wand2 className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-primary dark:text-[#00d2ff] uppercase">
              Automated Transformation
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span>What Problems Does B2B </span>
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              List Building Solve?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mt-1.5 font-normal">
            From outdated records to missing decision-makers, we transform static contact bottlenecks into high-converting sales pipelines.
          </p>

          {/* ── Micro Step Indicator ── */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {FLOW_ITEMS.map((item, idx) => {
              const isCurrent = activeStep === idx

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`
                    w-7 h-7 rounded-full text-[11px] font-mono font-bold transition-all duration-300 cursor-pointer flex items-center justify-center border
                    ${isCurrent
                      ? 'border-primary text-white bg-primary shadow-md scale-115 z-10'
                      : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 hover:border-slate-300 scale-100'
                    }
                  `}
                  style={{
                    backgroundColor: isCurrent ? item.color : undefined,
                    borderColor: isCurrent ? item.color : undefined,
                  }}
                  title={item.category}
                >
                  {item.num}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── DESKTOP & TABLET VISUALIZATION (Screen >= 768px) ── */}
        <div
          ref={containerRef}
          className="hidden md:block relative min-h-[380px] lg:min-h-[400px] w-full"
        >
          {/* ── SVG S-Curves Connector Layer ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="line-glow-lb" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dynamic Arrowhead Markers */}
              {FLOW_ITEMS.map((item) => (
                <React.Fragment key={`arrow-lb-${item.id}`}>
                  <marker
                    id={`arrow-head-lb-${item.id}`}
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                  >
                    <path d="M 1 2 L 8 5 L 1 8 Z" fill={item.color} />
                  </marker>
                  <marker
                    id={`arrow-head-base-lb-${item.id}`}
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M 1 2 L 8 5 L 1 8 Z" fill={item.color} fillOpacity="0.4" />
                  </marker>
                </React.Fragment>
              ))}
            </defs>

            {/* Inactive Base Lines with Card Port Dots & Rim Port Dots */}
            {paths.left.map((p, i) => {
              const item = FLOW_ITEMS[i]
              const isCurr = activeStep === i

              return (
                <g key={`left-group-lb-${i}`}>
                  {/* Start Node Port Dot on card edge */}
                  <circle
                    cx={p.startX + 6}
                    cy={p.startY}
                    r="3.5"
                    fill="var(--background)"
                    stroke={item.color}
                    strokeWidth="1.8"
                  />
                  {/* Base Curved Connector Path */}
                  <path
                    d={p.d}
                    stroke={item.color}
                    strokeWidth={isCurr && isLeftLineActive ? 2.5 : 1.5}
                    strokeOpacity={isCurr && isLeftLineActive ? 1 : 0.25}
                    markerEnd={`url(#${isCurr && isLeftLineActive ? `arrow-head-lb-${item.id}` : `arrow-head-base-lb-${item.id}`})`}
                  />
                  {/* Animated Electric Pulse Flow on active line */}
                  {isCurr && isLeftLineActive && (
                    <path
                      d={p.d}
                      stroke={item.color}
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      strokeOpacity="0.85"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="24"
                        to="0"
                        dur="0.85s"
                        repeatCount="indefinite"
                      />
                    </path>
                  )}
                  {/* Rim Port Dot on circle left rim */}
                  <circle
                    cx={p.rimX}
                    cy={p.rimY}
                    r="3.5"
                    fill="var(--background)"
                    stroke={item.color}
                    strokeWidth="1.8"
                  />
                </g>
              )
            })}

            {paths.right.map((p, i) => {
              const item = FLOW_ITEMS[i]
              const isCurr = activeStep === i

              return (
                <g key={`right-group-lb-${i}`}>
                  {/* Rim Port Dot on circle right rim */}
                  <circle
                    cx={p.rimX}
                    cy={p.rimY}
                    r="3.5"
                    fill="var(--background)"
                    stroke={item.color}
                    strokeWidth="1.8"
                  />
                  {/* Base Curved Connector Path */}
                  <path
                    d={p.d}
                    stroke={item.color}
                    strokeWidth={isCurr && isRightLineActive ? 2.5 : 1.5}
                    strokeOpacity={isCurr && isRightLineActive ? 1 : 0.25}
                    markerEnd={`url(#${isCurr && isRightLineActive ? `arrow-head-lb-${item.id}` : `arrow-head-base-lb-${item.id}`})`}
                  />
                  {/* Animated Electric Pulse Flow on active line */}
                  {isCurr && isRightLineActive && (
                    <path
                      d={p.d}
                      stroke={item.color}
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      strokeOpacity="0.85"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="24"
                        to="0"
                        dur="0.85s"
                        repeatCount="indefinite"
                      />
                    </path>
                  )}
                  {/* End Node Port Dot on solution card edge */}
                  <circle
                    cx={p.endX - 6}
                    cy={p.endY}
                    r="3.5"
                    fill="var(--background)"
                    stroke={item.color}
                    strokeWidth="1.8"
                  />
                </g>
              )
            })}

            {/* ── Active Traveling Particle: Left to Center ── */}
            {paths.left[activeStep] && isLeftLineActive && !prefersReducedMotion && (
              <g>
                <animateMotion
                  key={`particle-left-lb-${activeStep}-${cycleKey}`}
                  path={paths.left[activeStep].d}
                  dur={`${TIMING.lineToCenter}ms`}
                  repeatCount="1"
                  fill="freeze"
                />
                {/* Outer halo */}
                <circle r="8.5" fill={currentItem.color} opacity="0.35" filter="url(#line-glow-lb)" />
                {/* Mid glow */}
                <circle r="5" fill={currentItem.color} opacity="0.9" />
                {/* Bright white core */}
                <circle r="2.8" fill="#ffffff" />
              </g>
            )}

            {/* ── Active Traveling Particle: Center to Right ── */}
            {paths.right[activeStep] && isRightLineActive && !prefersReducedMotion && (
              <g>
                <animateMotion
                  key={`particle-right-lb-${activeStep}-${cycleKey}`}
                  path={paths.right[activeStep].d}
                  dur={`${TIMING.lineToSolution}ms`}
                  repeatCount="1"
                  fill="freeze"
                />
                {/* Outer halo */}
                <circle r="8.5" fill={currentItem.color} opacity="0.35" filter="url(#line-glow-lb)" />
                {/* Mid glow */}
                <circle r="5" fill={currentItem.color} opacity="0.9" />
                {/* Bright white core */}
                <circle r="2.8" fill="#ffffff" />
              </g>
            )}
          </svg>

          {/* ── 3 Columns: Left Cards | Center Circle | Right Cards ── */}
          <div className="relative z-10 grid grid-cols-12 gap-2.5 lg:gap-3.5 items-center">

            {/* ── LEFT: 5 Compact Horizontal Problem Cards (4 cols) ── */}
            <div className="col-span-4 flex flex-col justify-between gap-2">
              {FLOW_ITEMS.map((item, idx) => {
                const isActive = activeStep === idx && isProblemActive
                const Icon = item.problem.icon

                return (
                  <div
                    key={`p-${item.id}`}
                    ref={(el) => (problemRefs.current[idx] = el)}
                    onClick={() => handleSelectStep(idx)}
                    className={`
                      relative flex items-center gap-2.5 p-2 lg:p-2.5 rounded-xl transition-all duration-300 cursor-pointer select-none border
                      ${isActive
                        ? 'bg-white dark:bg-[#0B1527] border-primary shadow-xl shadow-primary/25 scale-[1.06] -translate-x-1 ring-2 ring-primary/50 z-30'
                        : 'bg-white/80 dark:bg-[#0A1222]/80 border-slate-200/80 dark:border-white/10 hover:border-slate-300 shadow-xs scale-100 z-10'
                      }
                    `}
                    style={{
                      borderColor: isActive ? item.color : undefined,
                      boxShadow: isActive ? `0 12px 28px -4px ${item.color}40` : undefined,
                    }}
                  >
                    {/* Square Icon Badge */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs transition-transform duration-300 ${
                        isActive ? 'scale-110 shadow-md' : ''
                      }`}
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Text block */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] lg:text-[13px] font-bold text-slate-900 dark:text-white leading-tight truncate flex items-center justify-between">
                        <span>{item.problem.title}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full animate-ping shrink-0 ml-1" style={{ backgroundColor: item.color }} />
                        )}
                      </div>
                      <div className="text-[10px] lg:text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
                        {item.problem.sub}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── CENTER: Compact Glowing Circular Engine (~175px - 195px) (4 cols) ── */}
            <div className="col-span-4 flex flex-col items-center justify-center">
              {/* Top Pill Tag */}
              <motion.div
                animate={{
                  borderColor: isCenterActive ? currentItem.color : 'rgba(0,166,255,0.3)',
                  scale: isCenterActive ? 1.08 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="mb-2 px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary dark:text-[#00d2ff] font-mono text-[9.5px] font-bold uppercase tracking-wider shadow-xs"
              >
                AUTOMATE
              </motion.div>

              <div
                ref={centerCircleRef}
                className="relative w-[175px] h-[175px] lg:w-[195px] lg:h-[195px] rounded-full flex flex-col items-center justify-center p-3 text-center select-none"
              >
                {/* Outer Ambient Glow */}
                <motion.div
                  className="absolute -inset-3 rounded-full blur-[26px] opacity-40 pointer-events-none"
                  animate={{
                    background: `radial-gradient(circle, ${currentItem.color}70 0%, transparent 70%)`,
                    scale: isCenterActive ? [1, 1.18, 1] : 1,
                  }}
                  transition={{ duration: 1.2, repeat: isCenterActive ? Infinity : 0 }}
                />

                {/* Expanding Shockwave Ripple when active */}
                {isCenterActive && !prefersReducedMotion && (
                  <motion.div
                    key={`shockwave-lb-${activeStep}`}
                    className="absolute inset-0 rounded-full border-2 pointer-events-none"
                    style={{ borderColor: currentItem.color }}
                    initial={{ scale: 0.9, opacity: 0.9 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}

                {/* Outer Dashed Orbit Ring */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-dashed border-primary/40 dark:border-[#00d2ff]/40 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* Core Circular Body: Sleek Gradient Sphere */}
                <div
                  className={`
                    relative w-full h-full rounded-full flex flex-col items-center justify-center p-2.5 text-white
                    border-2 transition-all duration-300 shadow-xl backdrop-blur-md overflow-hidden
                    ${isCenterActive
                      ? 'border-white dark:border-[#00f0ff] shadow-[0_0_40px_rgba(0,166,255,0.6)] scale-[1.08] z-30'
                      : 'border-white/80 dark:border-white/20 shadow-md scale-100'
                    }
                  `}
                  style={{
                    background: 'linear-gradient(135deg, #0d214f 0%, #0c3875 50%, #0369a1 100%)',
                  }}
                >
                  {/* Subtle Inner Ring */}
                  <div className="absolute inset-1 rounded-full border border-white/15 pointer-events-none" />

                  {/* Dynamic Problem -> Solution Transformation Illustration */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`center-transform-lb-${activeStep}-${phase}`}
                      initial={{ opacity: 0, scale: 0.85, y: 3 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: -3 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 flex flex-col items-center justify-center w-full"
                    >
                      {/* Engine Category/Label Badge */}
                      <div className="flex items-center gap-1 mb-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: currentItem.color }}
                        />
                        <span className="text-[9px] lg:text-[9.5px] font-mono font-bold tracking-wider uppercase text-sky-200 truncate max-w-[130px]">
                          {currentItem.engineLabel}
                        </span>
                      </div>

                      {/* Visual Problem ➔ Solution Transformation Illustration */}
                      <div className="flex items-center justify-center gap-1.5 my-1">
                        {/* Problem Icon */}
                        <div
                          className={`
                            w-7 h-7 rounded-lg flex items-center justify-center text-white/90 border transition-all duration-300
                            ${phase === 'problem' || phase === 'toCenter'
                              ? 'bg-white/20 border-white/50 scale-110 shadow-xs'
                              : 'bg-white/10 border-white/20 opacity-70'
                            }
                          `}
                        >
                          <currentItem.problem.icon className="w-3.5 h-3.5" />
                        </div>

                        {/* Animated Arrow Connector */}
                        <div className="flex items-center text-sky-300">
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              isCenterActive ? 'translate-x-0.5 text-white scale-120' : 'opacity-60'
                            }`}
                          />
                        </div>

                        {/* Solution Icon */}
                        <div
                          className={`
                            w-7 h-7 rounded-lg flex items-center justify-center text-white border transition-all duration-300
                            ${phase === 'toSolution' || phase === 'solution'
                              ? 'scale-115 shadow-md border-white'
                              : 'border-white/20 opacity-80'
                            }
                          `}
                          style={{
                            backgroundColor:
                              phase === 'toSolution' || phase === 'solution'
                                ? currentItem.color
                                : 'rgba(255,255,255,0.15)',
                          }}
                        >
                          <currentItem.solution.icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Action Caption */}
                      <div className="text-[10px] lg:text-[10.5px] font-mono font-bold uppercase tracking-wider text-sky-200 text-center leading-tight mt-0.5 px-2">
                        {currentItem.engineAction}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── RIGHT: 5 Compact Horizontal Solution Cards (4 cols) ── */}
            <div className="col-span-4 flex flex-col justify-between gap-2">
              {FLOW_ITEMS.map((item, idx) => {
                const isActive = activeStep === idx && isSolutionActive
                const Icon = item.solution.icon

                return (
                  <div
                    key={`s-${item.id}`}
                    ref={(el) => (solutionRefs.current[idx] = el)}
                    onClick={() => handleSelectStep(idx)}
                    className={`
                      relative flex items-center gap-2.5 p-2 lg:p-2.5 rounded-xl transition-all duration-300 cursor-pointer select-none border
                      ${isActive
                        ? 'bg-white dark:bg-[#0B1527] border-primary shadow-xl shadow-primary/25 scale-[1.06] translate-x-1 ring-2 ring-primary/50 z-30'
                        : 'bg-white/80 dark:bg-[#0A1222]/80 border-slate-200/80 dark:border-white/10 hover:border-slate-300 shadow-xs scale-100 z-10'
                      }
                    `}
                    style={{
                      borderColor: isActive ? item.color : undefined,
                      boxShadow: isActive ? `0 12px 28px -4px ${item.color}40` : undefined,
                    }}
                  >
                    {/* Square Icon Badge */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs transition-transform duration-300 ${
                        isActive ? 'scale-110 shadow-md' : ''
                      }`}
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Text block */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] lg:text-[13px] font-bold text-slate-900 dark:text-white leading-tight truncate flex items-center justify-between">
                        <span>{item.solution.title}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full animate-ping shrink-0 ml-1" style={{ backgroundColor: item.color }} />
                        )}
                      </div>
                      <div className="text-[10px] lg:text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
                        {item.solution.sub}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        {/* ── MOBILE & COMPACT VISUALIZATION (Screen < 768px) ── */}
        <div className="md:hidden space-y-3 pt-2">
          {/* Active Problem Pill */}
          <div
            className={`flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0B1527] border shadow-sm transition-all duration-300 ${
              phase === 'problem' || phase === 'toCenter'
                ? 'scale-[1.04] shadow-md ring-2 ring-primary/40'
                : 'scale-100'
            }`}
            style={{ borderColor: currentItem.color }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: currentItem.color }}
            >
              <currentItem.problem.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{currentItem.problem.title}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{currentItem.problem.sub}</div>
            </div>
          </div>

          {/* Directional Arrow & Animated Engine Mini-Badge */}
          <div className="flex flex-col items-center justify-center py-1">
            <div className="w-0.5 h-3 bg-gradient-to-b from-slate-300 to-primary dark:from-white/20 dark:to-primary" />
            <div
              className={`my-1 px-4 py-2 rounded-2xl text-white font-bold text-xs flex items-center gap-2.5 shadow-md border border-white/20 transition-all duration-300 ${
                phase === 'centerReact'
                  ? 'scale-108 shadow-lg ring-2 ring-primary/50'
                  : 'scale-100'
              }`}
              style={{ background: 'linear-gradient(135deg, #0d214f 0%, #0369a1 100%)' }}
            >
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                <currentItem.problem.icon className="w-3 h-3 text-white" />
              </div>
              <ArrowRight className="w-3 h-3 text-sky-300" />
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: currentItem.color }}
              >
                <currentItem.solution.icon className="w-3 h-3" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-sky-200 ml-1">
                {currentItem.engineAction}
              </div>
            </div>
            <div className="w-0.5 h-3 bg-gradient-to-b from-primary to-slate-300 dark:from-primary dark:to-white/20" />
          </div>

          {/* Active Solution Pill */}
          <div
            className={`flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0B1527] border shadow-sm transition-all duration-300 ${
              phase === 'toSolution' || phase === 'solution'
                ? 'scale-[1.04] shadow-md ring-2 ring-primary/40'
                : 'scale-100'
            }`}
            style={{ borderColor: currentItem.color }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: currentItem.color }}
            >
              <currentItem.solution.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{currentItem.solution.title}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{currentItem.solution.sub}</div>
            </div>
          </div>

          {/* Step Selector Tabs */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {FLOW_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectStep(idx)}
                className={`
                  flex-1 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer
                  ${activeStep === idx
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }
                `}
                style={{
                  backgroundColor: activeStep === idx ? item.color : undefined,
                  borderColor: activeStep === idx ? item.color : undefined,
                }}
              >
                {item.num}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProblemsSolved
