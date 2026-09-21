import React from 'react'
import { motion } from 'framer-motion'
import { Send, Globe, Mail, CheckCircle2, Clock, MapPin } from 'lucide-react'

const REGIONS = [
  { code: 'AMER', name: 'Americas', time: '09:00 AM EST', coords: 'cx="28" cy="24"' },
  { code: 'EMEA', name: 'Europe & ME', time: '09:15 AM GMT', coords: 'cx="54" cy="20"' },
  { code: 'APAC', name: 'Asia Pacific', time: '09:30 AM SGT', coords: 'cx="82" cy="28"' },
]

export default function EmailStage({ isActive, isCompleted, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-2xl p-5 border backdrop-blur-xl h-full flex flex-col justify-between select-none ${
        isActive
          ? 'bg-surface/95 border-cta shadow-[0_0_30px_rgba(255,109,0,0.25)] ring-1 ring-cta/40 -translate-y-1'
          : isCompleted
          ? 'bg-surface/80 border-cta/40 hover:border-cta/70'
          : 'bg-surface/50 border-border/80 hover:border-border hover:bg-surface/70'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-cta text-white shadow-md shadow-cta/30'
                  : isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-alt border border-border text-text-muted'
              }`}
            >
              {isCompleted ? '✓' : '05'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 05
            </span>
          </div>

          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? 'bg-cta/15 text-cta border-cta/40 animate-pulse font-bold'
                : isCompleted
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'DISPATCHING' : isCompleted ? 'DELIVERED ✓' : 'SCHEDULED'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          Smart Email Distribution
          <Send className={`w-4 h-4 text-cta transition-transform duration-300 ${isActive ? 'translate-x-1 -translate-y-0.5' : 'group-hover:translate-x-0.5'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Targeted emails are distributed according to each contact's geographic region and timezone.
        </p>
      </div>

      {/* Lightweight SVG Globe Network & Envelopes */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-3 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/50 pb-1.5 text-text-muted">
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-cta" />
            TIMEZONE_ROUTER
          </span>
          <span className="text-cta font-bold">
            {isActive ? 'SENDING...' : isCompleted ? 'DELIVERED ✓' : 'QUEUED'}
          </span>
        </div>

        {/* Global Dispatch Vector Network */}
        <div className="relative h-18 w-full bg-surface-alt/50 rounded-lg p-2 flex items-center justify-between overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 40" preserveAspectRatio="none">
            {/* Curved SVG routing rays */}
            <path d="M 15 20 Q 28 8 40 20 T 70 20 T 90 20" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-border" />
            <path d="M 10 30 Q 50 5 90 30" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" className="text-border" />
            {/* Active glowing packet path */}
            {isActive && (
              <motion.path
                d="M 10 20 Q 50 10 90 20"
                fill="none"
                stroke="url(#ctaGrad)"
                strokeWidth="1.5"
                strokeDasharray="10 20"
                animate={{ strokeDashoffset: [-60, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            )}
            <defs>
              <linearGradient id="ctaGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00A6FF" />
                <stop offset="100%" stopColor="#FF6D00" />
              </linearGradient>
            </defs>
          </svg>

          {/* Region Badges with animated envelopes */}
          <div className="relative z-10 w-full grid grid-cols-3 gap-1">
            {REGIONS.map((region, idx) => (
              <div
                key={region.code}
                className={`flex flex-col items-center justify-center p-1 rounded-md border text-center transition-all duration-300 ${
                  isActive
                    ? 'bg-cta/10 border-cta/40 text-text-primary'
                    : isCompleted
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-text-secondary'
                    : 'bg-background/80 border-border/60 text-text-muted'
                }`}
              >
                <div className="flex items-center gap-0.5 text-[8.5px] font-mono font-bold">
                  <Mail className={`w-2.5 h-2.5 ${isActive ? 'text-cta animate-bounce' : 'text-text-muted'}`} />
                  <span>{region.code}</span>
                </div>
                <span className="text-[7.5px] text-text-muted font-mono">{region.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery confirmation badge */}
        <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-text-muted">
          <span>Staggered Dispatch</span>
          <span className={`flex items-center gap-1 font-bold ${isCompleted ? 'text-emerald-400' : isActive ? 'text-cta' : 'text-text-muted'}`}>
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Primary Inboxes ✓</span>
              </>
            ) : isActive ? (
              <>
                <Clock className="w-3 h-3 animate-spin" />
                <span>Wave In Flight...</span>
              </>
            ) : (
              'Local Morning Peaks'
            )}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Delivery Rate</span>
        <span className="text-cta font-medium">99.2% Primary Inbox</span>
      </div>
    </div>
  )
}
