import React from 'react'
import { motion } from 'framer-motion'

export function RowConnector({ activeFrom, activeTo, currentStage, colorFrom = '#00A6FF', colorTo = '#00A6FF' }) {
  const isFilled = currentStage >= activeTo
  const isTransmitting = currentStage === activeFrom

  return (
    <div className="relative w-full h-[3px] bg-border/70 overflow-hidden rounded-full">
      {/* Background track */}
      <div
        className="h-full transition-all duration-500"
        style={{
          width: isFilled ? '100%' : '0%',
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
          boxShadow: isFilled ? `0 0 10px ${colorTo}` : 'none',
        }}
      />
      {/* Moving packet pulse */}
      {isTransmitting && (
        <motion.div
          className="absolute top-0 bottom-0 w-8 blur-[2px] rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${colorTo}, #ffffff)`,
            boxShadow: `0 0 12px ${colorTo}`,
          }}
          initial={{ left: '-20%' }}
          animate={{ left: '120%' }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}

export function RowTransitionBus({
  title,
  subtext,
  direction = 'down',
  isPassed,
  isActive,
  accentColor = '#00A6FF',
}) {
  return (
    <div className="relative py-4 flex items-center justify-between px-6 z-0">
      {/* Left Conduit */}
      <div className="h-[2px] flex-1 bg-border/60 relative overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: isPassed ? '100%' : '0%',
            backgroundColor: accentColor,
            boxShadow: isPassed ? `0 0 8px ${accentColor}` : 'none',
          }}
        />
      </div>

      {/* Central Illuminated Node Badge */}
      <div
        className={`mx-4 px-4 py-1.5 rounded-full border text-[11px] font-mono font-bold flex items-center gap-2.5 transition-all duration-300 shadow-md ${
          isActive
            ? 'bg-surface border-primary text-primary shadow-primary/20 ring-2 ring-primary/30 scale-105'
            : isPassed
            ? 'bg-surface/90 border-emerald-500/40 text-emerald-400'
            : 'bg-background/80 border-border/80 text-text-muted'
        }`}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: isPassed ? '#10b981' : isActive ? accentColor : 'var(--border)',
            boxShadow: isActive ? `0 0 8px ${accentColor}` : 'none',
          }}
        />
        <span>{title}</span>
        <span className="text-text-muted">→</span>
        <span className="text-text-secondary">{subtext}</span>
      </div>

      {/* Right Conduit */}
      <div className="h-[2px] flex-1 bg-border/60 relative overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: isPassed ? '100%' : '0%',
            backgroundColor: accentColor,
            boxShadow: isPassed ? `0 0 8px ${accentColor}` : 'none',
          }}
        />
      </div>
    </div>
  )
}

export function MobileVerticalRail({ activeStageIndex, totalStages }) {
  const heightPercent = Math.min(100, Math.round(((activeStageIndex + 1) / totalStages) * 100))

  return (
    <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-border/70 z-0 pointer-events-none lg:hidden">
      <motion.div
        className="w-full bg-gradient-to-b from-primary via-cta to-emerald-400"
        style={{
          height: `${heightPercent}%`,
          boxShadow: '0 0 10px #00A6FF',
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
