import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useRecovery } from '@context/RecoveryContext'

const SEEN_KEY = 'tg_growth_intro_seen'

// Phases: 1 rising, 2 stalled, 3 pain points, 4 way forward.
const TIMELINE = [
  { phase: 1, at: 400 },
  { phase: 2, at: 3000 },
  { phase: 3, at: 4900 },
  { phase: 4, at: 7600 },
]

const RISE_PATH = 'M30 330 C 120 318, 190 270, 270 220 S 420 120, 520 96'
const STALL_PATH = 'M520 96 C 556 90, 584 104, 620 97 S 690 88, 730 100 S 772 95, 790 98'
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8']

const HEADLINES = {
  1: { title: 'Early Pipeline Momentum.', sub: 'Initial campaigns generate early traction and build initial pipeline velocity.' },
  2: { title: 'The Growth Plateau.', sub: 'Outreach volume increases, but conversion rates and pipeline velocity flatten.' },
  3: { title: 'Traditional Outbound Hits a Wall.', sub: 'Decaying contact data, unsegmented lists, and buyer fatigue stall revenue expansion.' },
  4: { title: 'The Predictable Revenue Engine.', sub: 'High-growth enterprise companies scale by shifting to verified intelligence, precision ABM, and multi-channel engagement.' },
}

function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  if (navigator.webdriver || /HeadlessChrome|bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) return false
  try {
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true
  }
}

export default function GrowthIntro({ onClose }) {
  const reducedMotion = useReducedMotion()
  const { goals, goal, setGoal } = useRecovery()
  const [open, setOpen] = useState(shouldShowIntro)
  const [phase, setPhase] = useState(0)
  const [growth, setGrowth] = useState(0)
  const continueRef = useRef(null)
  const skipRef = useRef(null)

  const close = () => {
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* storage unavailable */ }
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    if (reducedMotion) {
      setPhase(3)
      setGrowth(2)
      const timer = setTimeout(() => setPhase(4), 5000)
      return () => clearTimeout(timer)
    }
    const timers = TIMELINE.map(({ phase: p, at }) => setTimeout(() => setPhase(p), at))
    return () => timers.forEach(clearTimeout)
  }, [open, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    if (phase === 1) {
      const controls = animate(0, 38, { duration: 2.4, ease: [0.33, 1, 0.68, 1], onUpdate: setGrowth })
      return () => controls.stop()
    }
    if (phase === 2) {
      const controls = animate(38, 2, { duration: 1.8, ease: [0.65, 0, 0.35, 1], onUpdate: setGrowth })
      return () => controls.stop()
    }
  }, [phase, reducedMotion])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    window.lenis?.stop()
    const retry = setTimeout(() => window.lenis?.stop(), 300)
    skipRef.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(retry)
      root.style.overflow = previous
      window.lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (phase === 4) continueRef.current?.focus({ preventScroll: true })
  }, [phase])

  const stalled = phase >= 2
  const headline = HEADLINES[phase] || HEADLINES[1]

  return (
    <AnimatePresence onExitComplete={onClose}>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="growth-intro-title"
          aria-describedby="growth-intro-sub"
          className="fixed inset-0 z-[10000] flex flex-col overflow-y-auto bg-[#050505]/70 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: stalled ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(239,68,68,0.18), transparent 60%)' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: phase === 4 ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,166,255,0.18), transparent 60%)' }}
          />

          <div className="relative mx-auto flex w-full max-w-[1100px] flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                Your growth story
              </span>
              <button
                ref={skipRef}
                type="button"
                onClick={close}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-text-secondary hover:border-white/40 hover:text-text-primary transition-colors"
              >
                Skip intro <X size={14} />
              </button>
            </div>

            <div className="mt-5 min-h-[118px] sm:mt-6 sm:min-h-[124px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase === 0 ? 1 : phase}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2
                    id="growth-intro-title"
                    className={`text-[32px] sm:text-5xl lg:text-[56px] font-black leading-[1.05] tracking-[-0.03em] ${
                      phase === 4 ? 'text-text-primary' : stalled ? 'text-[#F87171]' : 'text-text-primary'
                    }`}
                  >
                    {headline.title}
                  </h2>
                  <p id="growth-intro-sub" className="mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-text-secondary">
                    {headline.sub}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-3 rounded-3xl border border-white/10 bg-black/40 p-4 sm:px-6 sm:py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-muted">Pipeline growth</p>
                  <p
                    className={`mt-1 text-4xl sm:text-5xl font-black tabular-nums tracking-tight transition-colors duration-700 ${
                      stalled ? 'text-[#F87171]' : 'text-[#00A6FF]'
                    }`}
                    aria-live="off"
                  >
                    +{growth.toFixed(0)}%
                  </p>
                </div>
                <AnimatePresence>
                  {stalled && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#EF4444]/15 px-3 py-1.5 text-[12px] font-bold text-[#F87171]"
                    >
                      <span className="relative flex h-2 w-2">
                        {!reducedMotion && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EF4444] opacity-75" />}
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EF4444]" />
                      </span>
                      Growth Plateau
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <svg viewBox="0 0 820 370" className="mx-auto mt-2 block w-full h-auto max-h-[30vh]" aria-hidden>
                <defs>
                  <linearGradient id="intro-rise" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#0EA5E9" />
                    <stop offset="1" stopColor="#22C55E" />
                  </linearGradient>
                  <linearGradient id="intro-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#00A6FF" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#00A6FF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[96, 172, 248, 324].map((y) => (
                  <line key={y} x1="20" x2="800" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8" />
                ))}
                {QUARTERS.map((q, i) => (
                  <text key={q} x={30 + i * 108} y="360" fontSize="17" fill="rgba(255,255,255,0.4)" fontWeight="600">
                    {q}
                  </text>
                ))}

                <motion.path
                  d={`${RISE_PATH} L520 340 L30 340 Z`}
                  fill="url(#intro-area)"
                  initial={{ opacity: reducedMotion ? 1 : 0 }}
                  animate={{ opacity: phase >= 1 ? (stalled ? 0.35 : 1) : 0 }}
                  transition={{ duration: 1.2, delay: phase === 1 ? 1 : 0 }}
                />
                <motion.path
                  d={RISE_PATH}
                  fill="none"
                  stroke="url(#intro-rise)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: reducedMotion ? 1 : 0 }}
                  animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: stalled ? 0.55 : 1 }}
                  transition={{ pathLength: { duration: 2.4, ease: [0.33, 1, 0.68, 1] }, opacity: { duration: 0.8 } }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.45))' }}
                />
                <motion.path
                  d={STALL_PATH}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: reducedMotion ? 1 : 0 }}
                  animate={{ pathLength: stalled ? 1 : 0 }}
                  transition={{ duration: 1.8, ease: 'linear' }}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.6))' }}
                />

                <AnimatePresence>
                  {stalled && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                      <line x1="520" x2="520" y1="96" y2="340" stroke="rgba(239,68,68,0.35)" strokeDasharray="4 6" />
                      <circle cx="520" cy="96" r="7" fill="#EF4444" />
                      <text x="520" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="#F87171">
                        Velocity Plateau
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {phase >= 3 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <circle
                        cx="790"
                        cy="98"
                        r="16"
                        fill="#EF4444"
                        opacity="0.3"
                        className={reducedMotion ? '' : 'animate-ping'}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                      />
                      <circle cx="790" cy="98" r="7" fill="#EF4444" />
                      <text x="790" y="140" textAnchor="end" fontSize="20" fontWeight="800" fill="#ffffff">
                        Current Baseline
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </div>

            <div className="mt-4 pb-2">
              <AnimatePresence initial={false}>
                {phase === 4 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2.5 text-[14px] font-semibold text-text-primary"
                  >
                    Select your primary growth priority: <span className="font-normal text-text-secondary">We'll map your acceleration roadmap.</span>
                  </motion.p>
                )}
              </AnimatePresence>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key growth challenges">
                {goals.map((g, i) => {
                  const selected = goal?.id === g.id
                  const interactive = phase === 4
                  return (
                    <motion.li
                      key={g.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                      transition={{ duration: 0.5, delay: phase === 3 ? i * 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        type="button"
                        disabled={!interactive}
                        aria-pressed={interactive ? selected : undefined}
                        onClick={() => setGoal(g.id)}
                        className={`flex h-full w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[14px] sm:text-[15px] font-medium transition-colors disabled:cursor-default ${
                          selected
                            ? 'border-[#00A6FF] bg-[#00A6FF]/15 text-text-primary'
                            : 'border-[#EF4444]/25 bg-[#EF4444]/[0.06] text-text-primary enabled:hover:border-[#00A6FF]/60'
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${selected ? 'bg-[#00A6FF]' : 'bg-[#EF4444]'}`} />
                        {g.pain}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              <AnimatePresence>
                {phase === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <p className="text-[15px] text-text-secondary">
                      <span className="font-semibold text-text-primary">Predictable Revenue Engine.</span>{' '}
                      {goal ? 'Your customized pipeline acceleration plan is ready.' : 'Discover how Taraj Global scales B2B enterprise pipeline.'}
                    </p>
                    <button
                      ref={continueRef}
                      type="button"
                      onClick={close}
                      className="group inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#FF6D00] px-7 text-[15px] font-bold text-white shadow-[0_15px_40px_-12px_rgba(255,109,0,0.8)] hover:bg-[#FF6D00]/90 transition-colors"
                    >
                      {goal ? 'View My Acceleration Plan' : 'Explore Enterprise Solutions'}
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
