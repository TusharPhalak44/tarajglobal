import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown, Check, CornerDownRight } from 'lucide-react'

export default function WorkflowDecision({
  node,
  isActive = false,
  isCompleted = false,
  onSelect,
  isReducedMotion = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative flex flex-col items-center my-2 select-none">
      {/* Diamond Shape Container */}
      <div
        onClick={() => {
          setIsExpanded(!isExpanded)
          onSelect?.()
        }}
        className={`relative group cursor-pointer transition-all duration-500 flex items-center justify-center p-4 sm:p-5 rounded-3xl border backdrop-blur-xl ${
          isActive
            ? 'bg-surface/95 border-amber-400 shadow-[0_0_28px_rgba(255,166,0,0.25)] ring-2 ring-amber-400/40 scale-[1.03]'
            : isCompleted
            ? 'bg-surface/90 border-emerald-500/50 shadow-sm'
            : 'bg-surface/60 border-border/80 hover:border-amber-400/50 hover:bg-surface/80'
        }`}
        style={{
          minWidth: '220px',
          maxWidth: '340px',
        }}
      >
        {/* Subtle Diamond Icon Accent */}
        <div className="flex items-center gap-3 w-full">
          {/* Rotary Diamond Indicator */}
          <div
            className={`w-9 h-9 rounded-xl rotate-45 flex items-center justify-center shrink-0 transition-colors border ${
              isActive
                ? 'bg-amber-400/20 border-amber-400 text-amber-400 shadow-md'
                : isCompleted
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-background border-border text-text-muted'
            }`}
          >
            <div className="-rotate-45 font-mono text-xs font-bold">
              {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : '◇'}
            </div>
          </div>

          {/* Decision Title & Question */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold tracking-widest text-amber-500 uppercase">
                DECISION POINT
              </span>
              <span
                className={`font-mono text-[8.5px] px-1.5 py-0.2 rounded border ${
                  isActive
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-400 animate-pulse'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-surface-alt border-border text-text-muted'
                }`}
              >
                {isActive ? 'EVALUATING' : isCompleted ? 'RESOLVED' : 'LOGIC'}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-black text-text-primary tracking-tight mt-0.5">
              {node.title}
            </h4>
          </div>
        </div>

        {/* Pulsing aura when active */}
        {isActive && !isReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-amber-400/40 pointer-events-none"
            animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </div>

      {/* YES / NO Interactive Branch Labels */}
      <div className="flex items-center justify-between w-full max-w-[340px] px-3 mt-2 text-[10px] font-mono">
        {/* YES Dominant Path Label */}
        <div className="flex items-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-xs">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>{node.yesText}</span>
        </div>

        {/* NO Nurture Branch Label */}
        <div className="flex items-center gap-1 text-text-muted font-medium bg-surface/80 px-2 py-0.5 rounded-full border border-border/80">
          <CornerDownRight className="w-3 h-3 text-cta" />
          <span>{node.noText}</span>
        </div>
      </div>

      {/* Expandable Detail Explanation */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full max-w-[340px] mt-2 p-2.5 rounded-xl bg-background/90 border border-border text-[10.5px] text-text-secondary leading-relaxed font-mono"
        >
          {node.shortDesc}
        </motion.div>
      )}
    </div>
  )
}
