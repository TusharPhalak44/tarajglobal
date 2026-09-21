import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, UserCheck, Check, X, Laptop, Sparkles, CheckCircle2 } from 'lucide-react'

const VERIFICATION_CHECKS = [
  'Valid Contact',
  'Company Match',
  'Job Title Match',
  'Industry Match',
  'Location Match',
  'ICP Match',
  'Contact Details',
]

export default function VerificationStage({ isActive, isCompleted, onSelect }) {
  const [checkedCount, setCheckedCount] = useState(0)

  // Staggered check reveal during active stage (180ms each)
  useEffect(() => {
    if (isActive) {
      setCheckedCount(0)
      const interval = setInterval(() => {
        setCheckedCount((prev) => {
          if (prev >= VERIFICATION_CHECKS.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 200)
      return () => clearInterval(interval)
    } else if (isCompleted) {
      setCheckedCount(VERIFICATION_CHECKS.length)
    } else {
      setCheckedCount(0)
    }
  }, [isActive, isCompleted])

  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-2xl p-5 border backdrop-blur-xl h-full flex flex-col justify-between select-none ${
        isActive
          ? 'bg-surface/95 border-emerald-500/80 shadow-[0_0_30px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/40 -translate-y-1'
          : isCompleted
          ? 'bg-surface/80 border-emerald-500/40 hover:border-emerald-500/70'
          : 'bg-surface/50 border-border/80 hover:border-border hover:bg-surface/70'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                  : isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-alt border border-border text-text-muted'
              }`}
            >
              {isCompleted ? '✓' : '08'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 08 // HUMAN QA GATE
            </span>
          </div>

          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 animate-pulse font-bold'
                : isCompleted
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'SCANNING & CALLING' : isCompleted ? '100% VERIFIED' : 'GATED'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          Human Verification
          <ShieldCheck className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Our team manually validates each lead to confirm accuracy, relevance and campaign eligibility.
        </p>
      </div>

      {/* Futuristic Verification Scanner Interface */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-3 space-y-2 relative overflow-hidden">
        {/* Animated Scanner Laser Beam */}
        {isActive && (
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none z-20 shadow-[0_0_12px_#10b981]"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/50 pb-1.5 text-text-muted">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <Laptop className="w-3 h-3 text-emerald-400" />
            QA_ANALYST_STATION
          </span>
          <span className="text-emerald-400 font-bold">
            {checkedCount}/{VERIFICATION_CHECKS.length} CRITERIA
          </span>
        </div>

        {/* 7 Staggered Verification Checklist Items */}
        <div className="grid grid-cols-2 gap-1 py-1">
          {VERIFICATION_CHECKS.map((item, idx) => {
            const isVerified = isCompleted || (isActive && idx < checkedCount)

            return (
              <div
                key={item}
                className={`p-1 rounded text-[8.5px] font-mono flex items-center justify-between border transition-all duration-200 ${
                  isVerified
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-surface-alt/40 border-border/50 text-text-muted opacity-50'
                }`}
              >
                <span className="truncate">{item}</span>
                {isVerified ? (
                  <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                )}
              </div>
            )
          })}
        </div>

        {/* Decision Flow Branch: YES (Qualified, Glowing) vs NO (Rejected, Subtle Muted) */}
        <div className="pt-1.5 border-t border-border/50 flex items-center gap-2">
          {/* Main Glowing YES Path */}
          <div
            className={`flex-1 py-1.5 px-2 rounded-lg border font-mono text-[9.5px] font-bold flex items-center justify-center gap-1 transition-all duration-300 ${
              isCompleted || (isActive && checkedCount === VERIFICATION_CHECKS.length)
                ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-surface-alt border-border text-text-muted'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>YES → Qualified Lead</span>
          </div>

          {/* Muted NO Path */}
          <div className="py-1.5 px-2 rounded-lg border border-border/40 bg-surface/30 font-mono text-[9px] text-text-muted/60 flex items-center gap-1">
            <X className="w-2.5 h-2.5 text-rose-400/50" />
            <span>NO (Rejected)</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Verification Type</span>
        <span className="text-emerald-400 font-medium">100% Human Phone & Registry</span>
      </div>
    </div>
  )
}
