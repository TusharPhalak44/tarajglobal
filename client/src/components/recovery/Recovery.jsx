import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, ChevronUp, TrendingUp, X } from 'lucide-react'
import { BREAKTHROUGH_GROWTH, FIXES, STUCK_GROWTH, useRecovery } from '@context/RecoveryContext'

const growthToY = (growth, top, bottom) => {
  const t = Math.min(Math.max((growth - STUCK_GROWTH) / (BREAKTHROUGH_GROWTH - STUCK_GROWTH), 0), 1.15)
  return bottom - t * (bottom - top)
}

/** Counts the current page as an applied fix. */
export function RecoveryTracker() {
  const { pathname } = useLocation()
  const { markVisited } = useRecovery()
  useEffect(() => {
    const timer = setTimeout(() => markVisited(pathname), 1500)
    return () => clearTimeout(timer)
  }, [pathname, markVisited])
  return null
}

function Sparkline({ growth, brokeThrough, className = '' }) {
  const endY = growthToY(growth, 5, 27)
  const lifting = growth > STUCK_GROWTH
  return (
    <svg viewBox="0 0 120 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="meter-lift" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00A6FF" />
          <stop offset="1" stopColor="#FF6D00" />
        </linearGradient>
      </defs>
      <path d="M2 30 C 14 28, 22 20, 34 14 S 50 9, 56 9" fill="none" stroke="#22C55E" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 9 C 64 8, 70 11, 78 9" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <motion.path
        initial={false}
        animate={{ d: lifting ? `M78 9 C 90 9, 100 ${Math.min(endY + 4, 12)}, 116 ${endY - 4}` : 'M78 9 C 90 9, 100 10, 116 9' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        fill="none"
        stroke={lifting ? 'url(#meter-lift)' : '#EF4444'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <motion.circle
        initial={false}
        animate={{ cy: lifting ? endY - 4 : 9, fill: brokeThrough ? '#FF6D00' : lifting ? '#00A6FF' : '#EF4444' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        cx="116"
        r="3"
      />
    </svg>
  )
}

function PainPicker({ onPick, compact = false }) {
  const { goals } = useRecovery()
  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {goals.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() => onPick(g.id)}
          className="flex items-center gap-3 rounded-xl border border-[#EF4444]/25 bg-[#EF4444]/[0.06] px-3.5 py-3 text-left text-[14px] font-medium text-text-primary hover:border-[#00A6FF]/60 hover:bg-[#00A6FF]/[0.08] transition-colors"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF4444]" />
          {g.pain}
        </button>
      ))}
    </div>
  )
}

function RouteSteps({ onNavigate }) {
  const { route, visited, nextStop } = useRecovery()
  return (
    <ol className="space-y-1.5">
      {route.map((path, i) => {
        const done = visited.includes(path)
        const isNext = path === nextStop
        return (
          <li key={path}>
            <Link
              to={path}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors ${
                isNext ? 'bg-[#00A6FF]/10 text-text-primary' : 'text-text-secondary hover:bg-white/5'
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                  done ? 'bg-success text-black' : isNext ? 'bg-[#00A6FF] text-white' : 'border border-white/20'
                }`}
              >
                {done ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold truncate">{FIXES[path]?.title}</span>
                {isNext && <span className="block text-[12px] text-text-muted truncate">{FIXES[path]?.fixes}</span>}
              </span>
              {isNext && <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Next</span>}
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

/** Always-visible growth line that rises as the visitor applies fixes across the site. */
export function GrowthMeter() {
  const { goal, growth, brokeThrough, route, visited, setGoal } = useRecovery()
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const previous = useRef(growth)
  const { pathname } = useLocation()

  useEffect(() => {
    if (growth > previous.current) {
      setToast(`+${growth - previous.current}% · ${FIXES[pathname]?.title || 'Solution'} explored`)
      const timer = setTimeout(() => setToast(null), 3200)
      previous.current = growth
      return () => clearTimeout(timer)
    }
    previous.current = growth
  }, [growth, pathname])

  useEffect(() => setOpen(false), [pathname])

  const done = route.filter((p) => visited.includes(p)).length
  const progress = Math.min((growth - STUCK_GROWTH) / (BREAKTHROUGH_GROWTH - STUCK_GROWTH), 1)

  return (
    <div className="fixed bottom-5 left-4 sm:left-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            id="growth-meter-panel"
            role="dialog"
            aria-label="Your growth roadmap"
            data-lenis-prevent
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-[min(360px,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0F17]/95 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Pipeline Growth Roadmap</p>
                <p className="mt-1 text-[17px] font-bold leading-snug text-text-primary">
                  {goal ? goal.diagnosis : 'What is your primary revenue priority?'}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close roadmap" className="rounded-lg p-1 text-text-muted hover:text-text-primary">
                <X size={16} />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between text-[12px]">
                <span className="text-text-secondary">Velocity Index</span>
                <span className={`font-bold ${brokeThrough ? 'text-cta' : 'text-text-primary'}`}>
                  +{growth}% <span className="font-normal text-text-muted">/ +{BREAKTHROUGH_GROWTH}% target</span>
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-[#00A6FF] to-[#FF6D00]"
                  initial={false}
                  animate={{ scaleX: Math.max(progress, 0.03) }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            <div className="mt-4">
              {goal ? (
                <>
                  <p className="mb-2 text-[12px] text-text-muted">{done} of {route.length} capabilities explored in your roadmap.</p>
                  <RouteSteps onNavigate={() => setOpen(false)} />
                  <button type="button" onClick={() => setGoal(null)} className="mt-2 px-3 text-[12px] text-text-muted underline-offset-4 hover:text-text-primary hover:underline">
                    Different priority? Change it
                  </button>
                </>
              ) : (
                <PainPicker compact onPick={setGoal} />
              )}
            </div>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className={`mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-bold transition-colors ${
                brokeThrough ? 'bg-[#FF6D00] text-white hover:bg-[#FF6D00]/90' : 'border border-white/15 text-text-primary hover:border-[#FF6D00]'
              }`}
            >
              {brokeThrough ? 'Target velocity reached. Schedule consultation' : 'Schedule a 30-min pipeline review'} <ArrowRight size={15} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && !open && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-2 inline-flex items-center gap-2 rounded-full bg-success px-3.5 py-1.5 text-[13px] font-bold text-black shadow-lg"
          >
            <TrendingUp size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="growth-meter-panel"
        className={`group flex items-center gap-3 rounded-2xl border bg-[#0B0F17]/90 py-2 pl-3 pr-3.5 backdrop-blur-xl transition-colors ${
          brokeThrough ? 'border-[#FF6D00]/60' : 'border-white/10 hover:border-white/25'
        }`}
      >
        <Sparkline growth={growth} brokeThrough={brokeThrough} className="h-8 w-[84px] sm:w-[104px]" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            {brokeThrough ? 'Accelerated' : growth > STUCK_GROWTH ? 'Scaling' : 'Baseline'}
          </span>
          <span className={`block text-[17px] font-black tabular-nums ${brokeThrough ? 'text-cta' : growth > STUCK_GROWTH ? 'text-primary' : 'text-[#F87171]'}`}>
            +{growth}%
          </span>
        </span>
        <ChevronUp size={15} className={`text-text-muted transition-transform ${open ? '' : 'rotate-180'}`} />
      </button>
    </div>
  )
}

const ENGINEERED_SOLUTIONS = [
  {
    num: '01',
    problem: 'Wasted Campaign Spend',
    problemDesc: 'Marketing budget wasted on out-of-market or non-ICP accounts.',
    solution: 'TaRaj Solution',
    solutionDesc: 'Intent-filtered ABM & ABX targeting ensuring 100% ICP alignment.',
  },
  {
    num: '02',
    problem: 'Contact Data Decay',
    problemDesc: 'High email bounce rates and inaccurate CRM intelligence.',
    solution: 'TaRaj Solution',
    solutionDesc: '99.8% Data Accuracy SLA backed by our proprietary post-research verification tool.',
  },
  {
    num: '03',
    problem: 'Unqualified Lead Stalls',
    problemDesc: 'High top-of-funnel volume stalling before sales qualification.',
    solution: 'TaRaj Solution',
    solutionDesc: 'Rigorous multi-stage vetting (BANT, HQL, SQL) before sales handoff.',
  },
  {
    num: '04',
    problem: 'Calendar Inefficiency',
    problemDesc: 'Unpredictable meeting volume and underutilized sales capacity.',
    solution: 'TaRaj Solution',
    solutionDesc: 'Confirmed C-suite appointments synced directly to rep calendars with account dossiers.',
  },
]

/** End-of-page handoff so no page is a dead end. */
export function NextFix() {
  const { pathname } = useLocation()
  const { goal, growth, brokeThrough } = useRecovery()
  const fix = FIXES[pathname]
  const isServices = pathname === '/services'
  const isOptimized = brokeThrough || isServices

  return (
    <section aria-labelledby="next-fix-heading" className="relative overflow-hidden border-t border-white/10 bg-[#07090E] py-8 sm:py-10 lg:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(0,166,255,0.1), transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(255,109,0,0.06), transparent 50%)',
        }}
      />
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-12 px-4 sm:px-6 lg:px-8 items-center">
        {/* Left Column: Heading, Subtext, Metric & Quick CTA */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF] flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
            {isOptimized
              ? 'Pipeline Acceleration & SLA Commitment'
              : fix
                ? 'Capability Explored'
                : 'Pipeline Acceleration & SLA Commitment'}
          </p>

          <h3 id="next-fix-heading" className="mt-2 text-2xl sm:text-[28px] lg:text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-text-primary">
            {isOptimized ? 'Your Revenue Roadmap is Fully Engineered' : goal ? 'Accelerate Your Pipeline Velocity.' : 'Select Your Primary Growth Priority'}
          </h3>

          <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-text-secondary max-w-lg">
            {isOptimized
              ? 'Eliminate operational friction and unverified outreach. Partner with an ISO 27001:2022 certified growth engine designed to scale qualified opportunity velocity.'
              : goal
                ? `Your projected pipeline lift is +${growth}%. Explore each recommended capability to build a predictable revenue engine.`
                : 'Select a priority to tailor your custom B2B demand generation roadmap.'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 backdrop-blur-sm">
              <Sparkline growth={isOptimized ? 52 : growth} brokeThrough={isOptimized} className="h-7 w-28 shrink-0" />
              <div className="flex flex-col">
                <span className={`text-2xl font-black tabular-nums leading-none ${isOptimized ? 'text-cta' : 'text-primary'}`}>
                  {isOptimized ? '+52%' : `+${growth}%`}
                </span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Average Velocity Lift
                </span>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6D00] to-[#FF8500] hover:from-[#E05E00] hover:to-[#FF6D00] px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md shadow-[#FF6D00]/25 transition-all hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
            >
              <span>Book a Review</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: 4 Compact Problem ➔ Solution Cards */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {ENGINEERED_SOLUTIONS.map((card) => (
              <div
                key={card.num}
                className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0A0E1A]/85 p-3.5 sm:p-4 backdrop-blur-md transition-all duration-200 hover:border-[#00A6FF]/40 hover:bg-[#0D1426] hover:shadow-[0_8px_24px_-8px_rgba(0,166,255,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/25 shrink-0">
                        {card.num}
                      </span>
                      <span className="text-[13px] font-bold text-white tracking-tight truncate">
                        {card.problem}
                      </span>
                    </div>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                  </div>

                  <p className="text-[12px] text-slate-400 leading-snug">
                    {card.problemDesc}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/[0.07] flex items-start gap-1.5">
                  <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15 text-[#22C55E]">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <p className="text-[12px] leading-snug">
                    <span className="font-bold text-[#22C55E]">{card.solution}:</span>{' '}
                    <span className="text-slate-200">{card.solutionDesc}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
