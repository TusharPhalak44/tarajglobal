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

// ─── 5 Problem → Engine → Solution Transformation Pairs (Full-Funnel Focused) ───

const FLOW_ITEMS = [
  {
    id: 0,
    num: '01',
    category: 'ICP TARGETING',
    engineLabel: 'AI-Assisted ICP Modeling',
    engineAction: 'Verified Buying Committees',
    problem: {
      title: '01. Untargeted Lists Waste Spend',
      sub: '',
      icon: FilterX,
    },
    solution: {
      title: '01. Precision-Targeted Audiences',
      sub: '',
      icon: Focus,
    },
    color: '#00A6FF',
    gradient: 'from-[#00A6FF] to-[#0070E0]',
  },
  {
    id: 1,
    num: '02',
    category: 'INTENT SIGNALS',
    engineLabel: 'AI-Assisted Intent Signals',
    engineAction: 'Multi-Channel Engagement Tracking',
    problem: {
      title: '02. Content Ignored, Clicks Go Cold',
      sub: '',
      icon: MailX,
    },
    solution: {
      title: '02. Engaged In-Market Buyers',
      sub: '',
      icon: MessageSquareQuote,
    },
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#6D28D9]',
  },
  {
    id: 2,
    num: '03',
    category: 'DATA ACCURACY',
    engineLabel: 'In-House Verification Tool',
    engineAction: '99.8% Data Accuracy SLA',
    problem: {
      title: '03. Bad Data, Unqualified Contacts',
      sub: '',
      icon: ShieldAlert,
    },
    solution: {
      title: '03. Verified Decision-Maker Records',
      sub: '',
      icon: CheckCircle2,
    },
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#059669]',
  },
  {
    id: 3,
    num: '04',
    category: 'BEHAVIORAL NURTURE',
    engineLabel: 'Behavioral Nurture Triggers',
    engineAction: 'Role-Based Content Journeys',
    problem: {
      title: '04. Single-Touch Funnels Stall',
      sub: '',
      icon: Workflow,
    },
    solution: {
      title: '04. Predictable Pipeline Momentum',
      sub: '',
      icon: Send,
    },
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#D97706]',
  },
  {
    id: 4,
    num: '05',
    category: 'ATTRIBUTION & ROI',
    engineLabel: 'DemandFlow Bridge',
    engineAction: 'Closed-Loop CRM Sync',
    problem: {
      title: '05. No Attribution, Blind Spots',
      sub: '',
      icon: EyeOff,
    },
    solution: {
      title: '05. Real-Time Pipeline ROI',
      sub: '',
      icon: BarChart3,
    },
    color: '#EC4899',
    gradient: 'from-[#EC4899] to-[#BE185D]',
  },
]

const TIMING = {
  problemHighlight: 800,
  lineToCenter: 750,
  centerReaction: 1100,
  lineToSolution: 750,
  solutionHold: 1400,
  pauseBetween: 600,
}

const ProblemsSolved = () => {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const centerCircleRef = useRef(null)

  const problemRefs = useRef([])
  const solutionRefs = useRef([])

  const [activeStep, setActiveStep] = useState(0)
  const [phase, setPhase] = useState('problem')
  const [cycleKey, setCycleKey] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const [paths, setPaths] = useState({ left: [], right: [] })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const updatePaths = useCallback(() => {
    if (!containerRef.current || !centerCircleRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const centerRect = centerCircleRef.current.getBoundingClientRect()

    const centerY = centerRect.top + centerRect.height / 2 - containerRect.top
    const radius = centerRect.width / 2

    const newLeftPaths = []
    const newRightPaths = []
    const angleOffsets = [-0.4, -0.2, 0, 0.2, 0.4]

    FLOW_ITEMS.forEach((_, idx) => {
      const pEl = problemRefs.current[idx]
      const sEl = solutionRefs.current[idx]

      if (pEl) {
        const pRect = pEl.getBoundingClientRect()
        const startX = pRect.right - containerRect.left
        const startY = pRect.top + pRect.height / 2 - containerRect.top

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
              setPhase('idle')

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
      clearTimeout(stepTimer)
    }
  }, [activeStep, cycleKey, isInView, prefersReducedMotion])

  const handleSelectStep = (idx) => {
    setActiveStep(idx)
    setPhase('problem')
    setCycleKey((k) => k + 1)
  }

  const currentItem = FLOW_ITEMS[activeStep]
  const currentLeftPath = paths.left[activeStep]?.d
  const currentRightPath = paths.right[activeStep]?.d

  return (
    <section
      id="problems-solved"
      ref={sectionRef}
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Problems Does Full-Funnel Demand Generation Solve"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
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
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              TECH-ENABLED FULL-FUNNEL TRANSFORMATION
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase">
            <span>What Problems Does </span>
            <span className="inline-block bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent py-1 sm:py-1.5">
              Full-Funnel Demand Solve?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mt-1.5 font-normal">
            From siloed funnel transitions to stalled middle-funnel deals, we eliminate pipeline friction and deliver predictable, multi-threaded enterprise revenue.
          </p>

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

        {/* Desktop Visualization */}
        <div
          ref={containerRef}
          className="hidden md:block relative min-h-[380px] lg:min-h-[400px] w-full"
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="line-glow-ff" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {FLOW_ITEMS.map((item) => (
                <React.Fragment key={`arrow-${item.id}`}>
                  <marker
                    id={`arrow-head-ff-${item.id}`}
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
                    id={`arrow-head-base-ff-${item.id}`}
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

            {/* Base static connector lines */}
            {paths.left.map((p, idx) => {
              if (!p) return null
              const item = FLOW_ITEMS[idx]
              return (
                <g key={`base-left-${idx}`}>
                  <path
                    d={p.d}
                    stroke={item.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.25"
                    strokeDasharray="4 4"
                    fill="none"
                    markerEnd={`url(#arrow-head-base-ff-${item.id})`}
                  />
                  <circle cx={p.startX} cy={p.startY} r="3" fill={item.color} fillOpacity="0.4" />
                </g>
              )
            })}

            {paths.right.map((p, idx) => {
              if (!p) return null
              const item = FLOW_ITEMS[idx]
              return (
                <g key={`base-right-${idx}`}>
                  <path
                    d={p.d}
                    stroke={item.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.25"
                    strokeDasharray="4 4"
                    fill="none"
                    markerEnd={`url(#arrow-head-base-ff-${item.id})`}
                  />
                  <circle cx={p.endX} cy={p.endY} r="3" fill={item.color} fillOpacity="0.4" />
                </g>
              )
            })}

            {/* Active animated Left Path */}
            {currentLeftPath && (phase === 'toCenter' || phase === 'centerReact' || phase === 'toSolution' || phase === 'solution') && (
              <g>
                <path
                  d={currentLeftPath}
                  stroke={currentItem.color}
                  strokeWidth="3"
                  fill="none"
                  filter="url(#line-glow-ff)"
                  strokeLinecap="round"
                  markerEnd={`url(#arrow-head-ff-${currentItem.id})`}
                />
                {!prefersReducedMotion && (
                  <circle r="4" fill="#ffffff" filter="url(#line-glow-ff)">
                    <animateMotion
                      path={currentLeftPath}
                      dur="0.75s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                )}
              </g>
            )}

            {/* Active animated Right Path */}
            {currentRightPath && (phase === 'toSolution' || phase === 'solution') && (
              <g>
                <path
                  d={currentRightPath}
                  stroke={currentItem.color}
                  strokeWidth="3"
                  fill="none"
                  filter="url(#line-glow-ff)"
                  strokeLinecap="round"
                  markerEnd={`url(#arrow-head-ff-${currentItem.id})`}
                />
                {!prefersReducedMotion && (
                  <circle r="4" fill="#ffffff" filter="url(#line-glow-ff)">
                    <animateMotion
                      path={currentRightPath}
                      dur="0.75s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                )}
              </g>
            )}
          </svg>

          {/* Grid Layout: Left Problems (5) | Middle Hub (1) | Right Solutions (5) */}
          <div className="grid grid-cols-12 gap-2 sm:gap-3 items-center relative z-10 py-1">
            {/* Left: 5 Problems */}
            <div className="col-span-4 space-y-1.5">
              {FLOW_ITEMS.map((item, idx) => {
                const isCurrent = activeStep === idx
                const isCurrentProblem = isCurrent && phase === 'problem'
                const ProblemIcon = item.problem.icon

                return (
                  <div
                    key={`p-${item.id}`}
                    ref={(el) => (problemRefs.current[idx] = el)}
                    onClick={() => handleSelectStep(idx)}
                    className={`
                      relative p-2.5 rounded-xl border transition-all duration-300 cursor-pointer
                      flex items-center gap-2.5 backdrop-blur-sm select-none
                      ${isCurrent
                        ? 'bg-white dark:bg-[#0B1527] shadow-md -translate-x-0.5'
                        : 'bg-white/70 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }
                      ${isCurrentProblem ? 'ring-2 ring-primary/40' : ''}
                    `}
                    style={{
                      borderColor: isCurrent ? item.color : undefined,
                      boxShadow: isCurrent ? `0 4px 18px -4px ${item.color}30` : undefined,
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        backgroundColor: isCurrent ? item.color : 'rgba(100,116,139,0.12)',
                        color: isCurrent ? '#ffffff' : '#64748b',
                      }}
                    >
                      <ProblemIcon className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] lg:text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
                        {item.problem.title}
                      </div>
                      {item.problem.sub ? (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.problem.sub}
                        </div>
                      ) : null}
                    </div>

                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: item.color,
                        opacity: isCurrent ? 1 : 0.25,
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Middle: Interactive Core Engine */}
            <div className="col-span-4 flex items-center justify-center">
              <div
                ref={centerCircleRef}
                className="relative w-44 h-44 lg:w-48 lg:h-48 rounded-full flex flex-col items-center justify-center text-center p-3 select-none"
                style={{
                  background: 'radial-gradient(circle at center, #0B1930 0%, #060E1D 70%, #030812 100%)',
                  border: `2px solid ${currentItem.color}`,
                  boxShadow: `0 0 35px ${currentItem.color}35, inset 0 0 20px ${currentItem.color}25`,
                }}
              >
                {/* Rotating accent ring */}
                <motion.div
                  className="absolute inset-1 rounded-full border border-dashed pointer-events-none"
                  style={{ borderColor: `${currentItem.color}50` }}
                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />

                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-sky-400 mb-1">
                  FULL-FUNNEL ENGINE
                </span>

                <motion.div
                  key={`hub-icon-${currentItem.id}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="my-1"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${currentItem.color}, #0284c7)`,
                    }}
                  >
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                </motion.div>

                <div className="text-xs font-black text-white px-2 leading-tight">
                  {currentItem.engineLabel}
                </div>

                <div className="text-[9.5px] font-mono text-slate-300 mt-1 px-1 leading-tight">
                  {currentItem.engineAction}
                </div>

                <div className="mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[8.5px] font-mono text-sky-300">
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: currentItem.color }} />
                  <span>TRANSFORMING</span>
                </div>
              </div>
            </div>

            {/* Right: 5 Solutions */}
            <div className="col-span-4 space-y-1.5">
              {FLOW_ITEMS.map((item, idx) => {
                const isCurrent = activeStep === idx
                const isCurrentSolution = isCurrent && (phase === 'toSolution' || phase === 'solution')
                const SolutionIcon = item.solution.icon

                return (
                  <div
                    key={`s-${item.id}`}
                    ref={(el) => (solutionRefs.current[idx] = el)}
                    onClick={() => handleSelectStep(idx)}
                    className={`
                      relative p-2.5 rounded-xl border transition-all duration-300 cursor-pointer
                      flex items-center gap-2.5 backdrop-blur-sm select-none
                      ${isCurrent
                        ? 'bg-white dark:bg-[#0B1527] shadow-md translate-x-0.5'
                        : 'bg-white/70 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }
                      ${isCurrentSolution ? 'ring-2 ring-emerald-500/50' : ''}
                    `}
                    style={{
                      borderColor: isCurrent ? item.color : undefined,
                      boxShadow: isCurrent ? `0 4px 18px -4px ${item.color}30` : undefined,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: item.color,
                        opacity: isCurrent ? 1 : 0.25,
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] lg:text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
                        {item.solution.title}
                      </div>
                      {item.solution.sub ? (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.solution.sub}
                        </div>
                      ) : null}
                    </div>

                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        backgroundColor: isCurrent ? item.color : 'rgba(100,116,139,0.12)',
                        color: isCurrent ? '#ffffff' : '#64748b',
                      }}
                    >
                      <SolutionIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3 pt-2">
          <div
            className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0B1527] border shadow-sm"
            style={{ borderColor: currentItem.color }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: currentItem.color }}
            >
              <currentItem.problem.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {currentItem.problem.title}
              </div>
              {currentItem.problem.sub ? (
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentItem.problem.sub}
                </div>
              ) : null}
            </div>
          </div>

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
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {currentItem.solution.title}
              </div>
              {currentItem.solution.sub ? (
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentItem.solution.sub}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-2">
            {FLOW_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectStep(idx)}
                className={`
                  flex-1 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer
                  ${
                    activeStep === idx
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

