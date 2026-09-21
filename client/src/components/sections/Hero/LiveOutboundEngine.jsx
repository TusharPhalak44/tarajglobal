import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, ShieldCheck, CheckCircle2, Target, CalendarCheck } from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

// ── 4 REAL-TIME PIPELINE ACTIVITY EVENTS ────────────────────────────────────
const ACTIVITY_STREAM = [
  {
    id: 'act-1',
    company: 'Enterprise Cloud SaaS',
    tag: 'Appointment',
    tagBg: 'bg-sky-500/10 text-[#00A6FF] border-sky-500/20',
    contact: 'VP of Sales',
    status: 'SQL Confirmed',
    statusColor: 'text-emerald-500 dark:text-emerald-400',
    time: 'Just now',
    icon: CalendarCheck
  },
  {
    id: 'act-2',
    company: 'Global Telecom Giant',
    tag: 'ABM Lead',
    tagBg: 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20',
    contact: 'Chief Marketing Officer',
    status: 'ICP Verified',
    statusColor: 'text-sky-500 dark:text-sky-400',
    time: '1m ago',
    icon: Target
  },
  {
    id: 'act-3',
    company: 'Cybersecurity Unicorn',
    tag: 'BANT',
    tagBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    contact: 'Head of Demand Gen',
    status: 'BANT Qualified',
    statusColor: 'text-emerald-500 dark:text-emerald-400',
    time: '3m ago',
    icon: ShieldCheck
  },
  {
    id: 'act-4',
    company: 'AI Data Platform',
    tag: 'SQL',
    tagBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    contact: 'Director of Growth',
    status: 'Calendar Booked',
    statusColor: 'text-emerald-500 dark:text-emerald-400',
    time: '5m ago',
    icon: CheckCircle2
  }
]

export const LiveOutboundEngine = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  // Subtle downward signal cycle (every 2.8s)
  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ACTIVITY_STREAM.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  return (
    <div className="relative w-full max-w-[520px] mx-auto select-none">
      
      {/* ── Soft Ambient Radial Glow Behind Engine ─────────────────────── */}
      <div className="absolute -inset-6 bg-[#00A6FF]/8 dark:bg-[#00A6FF]/12 rounded-[36px] blur-3xl pointer-events-none -z-10" />

      {/* ── Subtle Decorative Data Signal Trail (Top Tag) ─────────────── */}
      <div className="hidden sm:flex items-center justify-between px-3 mb-2 text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF]" />
          DATA
        </span>
        <span className="text-slate-400 dark:text-slate-600">→</span>
        <span>TARGETING</span>
        <span className="text-slate-400 dark:text-slate-600">→</span>
        <span>QUALIFICATION</span>
        <span className="text-slate-400 dark:text-slate-600">→</span>
        <span className="text-[#00A6FF] font-bold">PIPELINE</span>
      </div>

      {/* ── Master Panel Container ─────────────────────────────────────── */}
      <div className="relative rounded-2xl bg-white/95 dark:bg-[#121620]/95 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-black/[0.04] dark:shadow-black/40 overflow-hidden backdrop-blur-xl">
        
        {/* ── Panel Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {!prefersReducedMotion && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-900 dark:text-white uppercase">
              LIVE ENGINE
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Live Outbound Activity</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Synchronized
            </span>
          </div>
        </div>

        {/* ── Activity Timeline Feed ───────────────────────────────────── */}
        <div className="relative p-4 sm:p-5 space-y-2.5">
          
          {/* Subtle Vertical Signal Line on Left */}
          <div className="absolute left-[26px] top-6 bottom-6 w-[1.5px] bg-slate-200 dark:bg-white/10">
            {/* Animated Pulse Indicator traveling down */}
            {!prefersReducedMotion && (
              <motion.div
                className="w-full bg-[#00A6FF]"
                animate={{
                  top: `${activeIndex * 25}%`,
                  height: '25%'
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute' }}
              />
            )}
          </div>

          {ACTIVITY_STREAM.map((item, index) => {
            const isActive = index === activeIndex
            const Icon = item.icon

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative pl-8 pr-3.5 py-3 rounded-xl border transition-all duration-300 cursor-default ${
                  isActive
                    ? 'bg-sky-500/[0.06] dark:bg-[#00A6FF]/10 border-[#00A6FF]/35 dark:border-[#00A6FF]/40 -translate-y-0.5 shadow-sm'
                    : 'bg-white/40 dark:bg-white/[0.015] border-slate-200/60 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
                }`}
              >
                {/* Timeline Dot on the line */}
                <div className="absolute left-[19px] top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? 'bg-[#00A6FF] shadow-sm shadow-[#00A6FF]/60'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#121620]" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-bold truncate transition-colors ${
                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {item.company}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.tagBg}`}>
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate flex items-center gap-1.5">
                      <span>{item.contact}</span>
                      <span className="text-slate-400 dark:text-slate-600">•</span>
                      <span className={`font-semibold ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </p>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                    {item.time}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Panel Footer Metrics Strip ───────────────────────────────── */}
        <div className="px-5 py-2.5 bg-slate-50/80 dark:bg-white/[0.02] border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
            <Activity size={12} className="text-[#00A6FF]" />
            Pipeline Velocity: High
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            99.8% Match Rate
          </span>
        </div>

      </div>

    </div>
  )
}

export default LiveOutboundEngine
