import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, Sparkles, ExternalLink, Info } from 'lucide-react'

export default function WorkflowNode({
  node,
  isActive = false,
  isCompleted = false,
  onSelect,
  isReducedMotion = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = node.icon

  // Styling based on node type
  const isSuccess = node.type === 'success'
  const isConversion = node.type === 'conversion'

  return (
    <div
      onClick={() => {
        setIsExpanded(!isExpanded)
        onSelect?.()
      }}
      className={`group relative rounded-2xl p-4 sm:p-5 border transition-all duration-400 cursor-pointer select-none backdrop-blur-xl flex flex-col justify-between ${
        isActive
          ? isConversion
            ? 'bg-surface/95 border-cta shadow-[0_0_30px_rgba(255,109,0,0.3)] ring-2 ring-cta/40 scale-[1.02] -translate-y-1'
            : isSuccess
            ? 'bg-surface/95 border-emerald-400 shadow-[0_0_28px_rgba(114,214,105,0.28)] ring-2 ring-emerald-400/40 scale-[1.02] -translate-y-1'
            : 'bg-surface/95 border-primary shadow-[0_0_28px_rgba(0,166,255,0.25)] ring-2 ring-primary/40 scale-[1.02] -translate-y-1'
          : isCompleted
          ? 'bg-surface/85 border-emerald-500/40 hover:border-emerald-500/70 hover:shadow-md'
          : isConversion
          ? 'bg-surface/75 border-cta/50 hover:border-cta hover:shadow-md'
          : 'bg-surface/60 border-border/80 hover:border-border hover:bg-surface/80 hover:shadow-md'
      }`}
    >
      {/* Top Meta Line: Number + Tag + State */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                isActive
                  ? isConversion
                    ? 'bg-cta text-white shadow-md shadow-cta/30'
                    : isSuccess
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-primary text-white shadow-md shadow-primary/30'
                  : isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-alt border border-border text-text-muted'
              }`}
            >
              {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : node.number}
            </div>

            {node.tag && (
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-text-muted">
                {node.tag}
              </span>
            )}
          </div>

          <span
            className={`font-mono text-[8.5px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? isConversion
                  ? 'bg-cta/15 text-cta border-cta/40 font-bold animate-pulse'
                  : isSuccess
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 font-bold animate-pulse'
                  : 'bg-primary/15 text-primary border-primary/40 font-bold animate-pulse'
                : isCompleted
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'ACTIVE' : isCompleted ? 'VERIFIED ✓' : 'STANDBY'}
          </span>
        </div>

        {/* Node Title & Icon */}
        <h4 className="text-sm sm:text-base font-bold text-text-primary tracking-tight mb-1.5 flex items-center justify-between">
          <span className="truncate">{node.title}</span>
          <Icon
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
              isActive
                ? isConversion
                  ? 'text-cta scale-110'
                  : isSuccess
                  ? 'text-emerald-400 scale-110'
                  : 'text-primary scale-110'
                : 'text-text-muted group-hover:text-primary group-hover:translate-x-0.5'
            }`}
          />
        </h4>

        {/* Short Process Description */}
        <p className="text-xs text-text-secondary leading-relaxed font-normal mb-2">
          {node.shortDesc}
        </p>
      </div>

      {/* Expandable Technical Detail Popover / Accordion */}
      <AnimatePresence>
        {isExpanded && node.fullDesc && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 mt-2 border-t border-border/60 text-[11px] font-mono text-text-secondary leading-relaxed"
          >
            <div className="flex items-start gap-1.5 p-2 rounded-lg bg-background/80 border border-border/70">
              <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{node.fullDesc}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Footer Cue */}
      <div className="pt-2 mt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Click for details</span>
        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90 text-primary' : ''}`} />
      </div>

      {/* Subtle Active Aura Indicator */}
      {isActive && !isReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
          style={{
            borderColor: isConversion ? '#FF6D00' : isSuccess ? '#72D669' : '#00A6FF',
          }}
          animate={{ opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
  )
}
