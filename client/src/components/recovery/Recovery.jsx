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

/** End-of-page handoff so no page is a dead end. */
export function NextFix() {
  const { pathname } = useLocation()
  const { goal, route, visited, nextStop, growth, brokeThrough, setGoal } = useRecovery()
  const fix = FIXES[pathname]
  const nextAfterThis = route.find((p) => p !== pathname && !visited.includes(p)) || (nextStop !== pathname ? nextStop : null)
  const onRoute = route.includes(pathname)

  return (
    <section aria-labelledby="next-fix-heading" className="relative overflow-hidden border-t border-white/10 bg-[#07090E] py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 0%, rgba(0,166,255,0.12), transparent 55%)' }} />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-success">
            {fix ? `Capability Explored${onRoute ? ' · on your roadmap' : ''}` : 'Pipeline Acceleration'}
          </p>
          <h2 id="next-fix-heading" className="mt-3 text-3xl sm:text-4xl font-black leading-[1.1] tracking-[-0.02em] text-text-primary">
            {brokeThrough ? 'Your pipeline roadmap is optimized.' : goal ? 'Accelerate Your Pipeline Velocity.' : 'Select Your Primary Growth Priority'}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-text-secondary">
            {brokeThrough
              ? `You’ve reviewed the core strategic capabilities required to scale pipeline velocity. Let’s execute on your pipeline.`
              : goal
                ? `Your projected pipeline lift is +${growth}%. Explore each recommended capability to build a predictable revenue engine.`
                : 'Select a priority to tailor your custom B2B demand generation roadmap.'}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Sparkline growth={growth} brokeThrough={brokeThrough} className="h-12 w-44" />
            <span className={`text-3xl font-black tabular-nums ${brokeThrough ? 'text-cta' : 'text-primary'}`}>+{growth}%</span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {!goal ? (
            <PainPicker onPick={setGoal} />
          ) : brokeThrough || !nextAfterThis ? (
            <Link
              to="/contact"
              className="group block rounded-2xl border border-[#FF6D00]/40 bg-[#FF6D00]/[0.08] p-6 transition-colors hover:border-[#FF6D00]"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cta">Strategic Consultation</p>
              <p className="mt-2 text-2xl font-black text-text-primary">Schedule a Pipeline Review</p>
              <p className="mt-2 text-[15px] text-text-secondary">A 30-minute strategic consultation. We audit your ICP and deliver a clear 90-day pipeline roadmap.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold text-cta">
                Book a Pipeline Review <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ) : (
            <>
              <Link
                to={nextAfterThis}
                className="group block rounded-2xl border border-[#00A6FF]/40 bg-[#00A6FF]/[0.07] p-6 transition-colors hover:border-[#00A6FF]"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">Recommended Next Capability</p>
                <p className="mt-2 text-2xl font-black text-text-primary">{FIXES[nextAfterThis]?.title}</p>
                <p className="mt-2 text-[15px] text-text-secondary">{FIXES[nextAfterThis]?.fixes}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold text-primary">
                  Explore this capability <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <div className="mt-4 rounded-2xl border border-white/10 p-2">
                <RouteSteps />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
