import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wand2,
  FilterX,
  Focus,
  MailX,
  MessageSquareQuote,
  ShieldAlert,
  FileCheck2,
  Workflow,
  Send,
  EyeOff,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── 5 Problem → Engine → Solution Transformation Pairs ───────────────────────

const FLOW_ITEMS = [
  {
    id: 0,
    num: '01',
    category: 'TARGETING',
    engineLabel: 'ICP Engine',
    engineAction: 'Precision Filtering',
    problem: {
      title: 'Untargeted Lists',
      sub: 'Broad & Low Response',
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
    category: 'ENGAGEMENT',
    engineLabel: 'AI Copy Engine',
    engineAction: '1 to 1 Personalize',
    problem: {
      title: 'Low Engagement',
      sub: 'Generic & Ignored Outreach',
      icon: MailX,
    },
    solution: {
      title: 'Personalized Messaging',
      sub: 'Role & Industry Context',
      icon: MessageSquareQuote,
    },
    color: '#8B5CF6', // Purple
    gradient: 'from-[#8B5CF6] to-[#6D28D9]',
  },
  {
    id: 2,
    num: '03',
    category: 'DATA QUALITY',
    engineLabel: 'Data Verifier',
    engineAction: 'Zero Bounce Cleanse',
    problem: {
      title: 'Poor Quality Leads',
      sub: 'High Bounce & Invalid Data',
      icon: ShieldAlert,
    },
    solution: {
      title: 'Verified Prospect Data',
      sub: 'Zero Bounce Guarantee',
      icon: FileCheck2,
    },
    color: '#10B981', // Emerald
    gradient: 'from-[#10B981] to-[#059669]',
  },
  {
    id: 3,
    num: '04',
    category: 'CADENCE',
    engineLabel: 'Cadence Engine',
    engineAction: 'Multi Touch Nurture',
    problem: {
      title: 'Inconsistent Cadence',
      sub: 'Single Touch Stalled Leaks',
      icon: Workflow,
    },
    solution: {
      title: 'Multi Touch Sequences',
      sub: 'Nurtured Buying Cycles',
      icon: Send,
    },
    color: '#F59E0B', // Amber
    gradient: 'from-[#F59E0B] to-[#D97706]',
  },
  {
    id: 4,
    num: '05',
    category: 'TELEMETRY',
    engineLabel: 'Telemetry Hub',
    engineAction: 'Pipeline Attribution',
    problem: {
      title: 'Zero Visibility',
      sub: 'Unclear ROI & Tracking Gaps',
      icon: EyeOff,
    },
    solution: {
      title: 'Full Performance Telemetry',
      sub: 'Real Time Pipeline ROI',
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 2. Compute exact curved connector SVG paths between card ports and circle rim ports
  const updatePaths = useCallback(() => {
    if (!containerRef.current || !centerCircleRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const centerRect = centerCircleRef.current.getBoundingClientRect()

    const centerLeftX = centerRect.left - containerRect.left
    const centerRightX = centerRect.right - containerRect.left
    const centerY = centerRect.top + centerRect.height / 2 - containerRect.top
    const radius = centerRect.width / 2

    const newLeftPaths = []
    const newRightPaths = []

    // Calculate Y offsets on circle rim for 5 distinct ports
    // Angles around circle: -30deg, -15deg, 0deg, 15deg, 30deg
    const angleOffsets = [-0.4, -0.2, 0, 0.2, 0.4]

    FLOW_ITEMS.forEach((_, idx) => {
      const pEl = problemRefs.current[idx]
      const sEl = solutionRefs.current[idx]

      if (pEl) {
        const pRect = pEl.getBoundingClientRect()
        const startX = pRect.right - containerRect.left
        const startY = pRect.top + pRect.height / 2 - containerRect.top

        // Exact port docking on left rim of circle
        const angle = angleOffsets[idx]
        const rimX = centerRect.left + radius - Math.cos(angle) * radius - containerRect.left
        const rimY = centerY + Math.sin(angle) * (radius * 0.7)

        const dx = (rimX - startX) * 0.55
        newLeftPaths[idx] = {
          d: `M ${startX} ${startY} C ${startX + dx} ${startY}, ${rimX - dx} ${rimY}, ${rimX} ${rimY}`,
          startX,
          startY,
          rimX,
          rimY,
        }
      }

      if (sEl) {
        const sRect = sEl.getBoundingClientRect()
        const endX = sRect.left - containerRect.left
        const endY = sRect.top + sRect.height / 2 - containerRect.top

        const angle = angleOffsets[idx]
        const rimX = centerRect.left + radius + Math.cos(angle) * radius - containerRect.left
        const rimY = centerY + Math.sin(angle) * (radius * 0.7)

        const dx = (endX - rimX) * 0.55
        newRightPaths[idx] = {
          d: `M ${rimX} ${rimY} C ${rimX + dx} ${rimY}, ${endX - dx} ${endY}, ${endX} ${endY}`,
          rimX,
          rimY,
          endX,
          endY,
        }
      }
    })

    setPaths({ left: newLeftPaths, right: newRightPaths })
  }, [])

  useEffect(() => {
    updatePaths()
    window.addEventListener('resize', updatePaths)
    return () => window.removeEventListener('resize', updatePaths)
  }, [updatePaths])

  useEffect(() => {
    const timer = setTimeout(updatePaths, 120)
    return () => clearTimeout(timer)
  }, [updatePaths])

  // 3. Sequenced Flow State Machine
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    let isMounted = true
    let stepTimer = null

    setPhase('problem')

    stepTimer = setTimeout(() => {
      if (!isMounted) return
      setPhase('toCenter')

      stepTimer = setTimeout(() => {
        if (!isMounted) return
        setPhase('centerReact')

        stepTimer = setTimeout(() => {
          if (!isMounted) return
          setPhase('toSolution')

          stepTimer = setTimeout(() => {
            if (!isMounted) return
            setPhase('solution')

            stepTimer = setTimeout(() => {
              if (!isMounted) return
              setPhase('pause')

              stepTimer = setTimeout(() => {
                if (!isMounted) return
                setActiveStep((prev) => (prev + 1) % FLOW_ITEMS.length)
                setCycleKey((k) => k + 1)
              }, TIMING.pauseBetween)
            }, TIMING.solutionHold)
          }, TIMING.lineToSolution)
        }, TIMING.centerReaction)
      }, TIMING.lineToCenter)
    }, TIMING.problemHighlight)

    return () => {
      isMounted = false
      if (stepTimer) clearTimeout(stepTimer)
    }
  }, [activeStep, cycleKey, isInView, prefersReducedMotion])

  const handleSelectStep = (idx) => {
    setActiveStep(idx)
    setPhase('problem')
    setCycleKey((k) => k + 1)
  }

  const currentItem = FLOW_ITEMS[activeStep] || FLOW_ITEMS[0]

  const isProblemActive = phase === 'problem' || phase === 'toCenter' || phase === 'centerReact' || phase === 'toSolution' || phase === 'solution'
  const isLeftLineActive = phase === 'toCenter'
  const isCenterActive = phase === 'centerReact' || phase === 'toCenter' || phase === 'toSolution'
  const isRightLineActive = phase === 'toSolution'
  const isSolutionActive = phase === 'toSolution' || phase === 'solution'

  return (
    <section
      id="what-problems-b2b-email-marketing-solves"
      ref={sectionRef}
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-[#FAFCFF] dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Problems Does B2B Email Marketing Solve"
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
              Email Marketing Solve?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mt-1.5 font-normal">
            From inaccurate targeting to low engagement, we transform core bottlenecks into sales ready conversations.
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
              <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dynamic Arrowhead Markers */}
              {FLOW_ITEMS.map((item) => (
                <React.Fragment key={`arrow-${item.id}`}>
                  <marker
                    id={`arrow-head-${item.id}`}
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
                    id={`arrow-head-base-${item.id}`}
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
                <g key={`left-group-${i}`}>
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
                    markerEnd={`url(#${isCurr && isLeftLineActive ? `arrow-head-${item.id}` : `arrow-head-base-${item.id}`})`}
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
                <g key={`right-group-${i}`}>
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
                    markerEnd={`url(#${isCurr && isRightLineActive ? `arrow-head-${item.id}` : `arrow-head-base-${item.id}`})`}
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

            {/* ── Active Traveling Particle: Left to Center (Slower & Multi-Layer Glowing Comet) ── */}
            {paths.left[activeStep] && isLeftLineActive && !prefersReducedMotion && (
              <g>
                <animateMotion
                  key={`particle-left-${activeStep}-${cycleKey}`}
                  path={paths.left[activeStep].d}
                  dur={`${TIMING.lineToCenter}ms`}
                  repeatCount="1"
                  fill="freeze"
                />
                {/* Outer halo */}
                <circle r="8.5" fill={currentItem.color} opacity="0.35" filter="url(#line-glow)" />
                {/* Mid glow */}
                <circle r="5" fill={currentItem.color} opacity="0.9" />
                {/* Bright white core */}
                <circle r="2.8" fill="#ffffff" />
              </g>
            )}

            {/* ── Active Traveling Particle: Center to Right (Slower & Multi-Layer Glowing Comet) ── */}
            {paths.right[activeStep] && isRightLineActive && !prefersReducedMotion && (
              <g>
                <animateMotion
                  key={`particle-right-${activeStep}-${cycleKey}`}
                  path={paths.right[activeStep].d}
                  dur={`${TIMING.lineToSolution}ms`}
                  repeatCount="1"
                  fill="freeze"
                />
                {/* Outer halo */}
                <circle r="8.5" fill={currentItem.color} opacity="0.35" filter="url(#line-glow)" />
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
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs transition-transform duration-300 ${isActive ? 'scale-110 shadow-md' : ''
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
                    key={`shockwave-${activeStep}`}
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
                      key={`center-transform-${activeStep}-${phase}`}
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
                          title={`Problem: ${currentItem.problem.title}`}
                        >
                          <currentItem.problem.icon className="w-3.5 h-3.5" />
                        </div>

                        {/* Animated Arrow Connector */}
                        <motion.div
                          animate={{ x: [0, 2, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="text-white/80"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.div>

                        {/* Solution Icon */}
                        <div
                          className={`
                            w-7 h-7 rounded-lg flex items-center justify-center text-white border transition-all duration-300
                            ${phase === 'centerReact' || phase === 'toSolution' || phase === 'solution'
                              ? 'shadow-md scale-110 border-white'
                              : 'opacity-80 border-white/30'
                            }
                          `}
                          style={{
                            backgroundColor: currentItem.color,
                          }}
                          title={`Solution: ${currentItem.solution.title}`}
                        >
                          <currentItem.solution.icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Engine Action Headline */}
                      <div className="text-[11px] lg:text-[11.5px] font-black uppercase tracking-tight text-white leading-tight text-center px-1">
                        {currentItem.engineAction}
                      </div>

                      {/* Status indicator */}
                      <div className="text-[8.5px] font-mono tracking-wider mt-0.5 text-center">
                        {phase === 'centerReact' ? (
                          <span className="text-amber-300 font-bold animate-pulse">⚡ TRANSFORMING</span>
                        ) : phase === 'toSolution' || phase === 'solution' ? (
                          <span className="text-emerald-300 font-bold">✓ SOLVED</span>
                        ) : (
                          <span className="text-sky-300/90">● INGESTING</span>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Pill Tag */}
              <motion.div
                animate={{
                  borderColor: isCenterActive ? currentItem.color : 'rgba(0,166,255,0.3)',
                  scale: isCenterActive ? 1.08 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="mt-2 px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary dark:text-[#00d2ff] font-mono text-[9.5px] font-bold uppercase tracking-wider shadow-xs"
              >
                OPTIMIZE
              </motion.div>
            </div>

            {/* ── RIGHT: 5 Compact Horizontal Solution Cards (4 cols) ── */}
            <div className="col-span-4 flex flex-col justify-between gap-2.5">
              {FLOW_ITEMS.map((item, idx) => {
                const isActive = activeStep === idx && isSolutionActive
                const Icon = item.solution.icon

                return (
                  <div
                    key={`s-${item.id}`}
                    ref={(el) => (solutionRefs.current[idx] = el)}
                    onClick={() => handleSelectStep(idx)}
                    className={`
                      relative flex items-center gap-3 p-2.5 lg:p-3 rounded-xl transition-all duration-300 cursor-pointer select-none border
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
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Text block */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] lg:text-[13px] font-bold text-slate-900 dark:text-white leading-tight truncate">
                        {item.solution.title}
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

        {/* ── MOBILE VERTICAL VIEW (< 768px) ── */}
        <div className="block md:hidden space-y-3 pt-1">
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
