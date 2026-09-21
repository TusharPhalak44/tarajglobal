import React from 'react'
import { motion } from 'framer-motion'

/**
 * Curved Bezier Energy Conduits connecting Row 1 -> Row 2 and Row 2 -> Row 3
 */
export function CurvedConnectionRight({ isActive = false, isPassed = false }) {
  return (
    <div className="hidden lg:flex items-center justify-end pr-12 -my-2 relative z-0 pointer-events-none">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/90 border border-border/80 text-[10px] font-mono shadow-sm">
        <span
          className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-primary animate-ping' : isPassed ? 'bg-emerald-500' : 'bg-border'
          }`}
        />
        <span className="text-text-muted">ICP Filter Complete</span>
        <span className="text-primary font-bold">↓ Curved Pipeline to Distribution</span>
      </div>
    </div>
  )
}

export function CurvedConnectionLeft({ isActive = false, isPassed = false }) {
  return (
    <div className="hidden lg:flex items-center justify-start pl-12 -my-2 relative z-0 pointer-events-none">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/90 border border-border/80 text-[10px] font-mono shadow-sm">
        <span
          className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-emerald-500 animate-ping' : isPassed ? 'bg-emerald-500' : 'bg-border'
          }`}
        />
        <span className="text-text-muted">Lead Captured</span>
        <span className="text-emerald-400 font-bold">↓ Entering Human Verification</span>
      </div>
    </div>
  )
}

/**
 * Vertical Light Trail for Mobile
 */
export function MobileWorkflowRail({ currentStep = 0, totalSteps = 10 }) {
  const percent = Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100))

  return (
    <div className="absolute left-4 sm:left-6 top-6 bottom-6 w-[2px] bg-border/60 z-0 pointer-events-none lg:hidden">
      <motion.div
        className="w-full bg-gradient-to-b from-primary via-cta to-emerald-400"
        style={{
          height: `${percent}%`,
          boxShadow: '0 0 8px #00A6FF',
        }}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}
