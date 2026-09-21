import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/**
 * GrowthStage
 * Minimal editorial block for each stage in the Dynamic B2B Growth Flow:
 * - 01 AUDIENCE INTEL (TAM MAPPED) -> 100% ICP PRECISION
 * - 02 VERIFIED DATA (DIRECT DIALS) -> 99.8% ACCURACY
 * - 03 FULL FUNNEL (PIPELINE WON) -> GROWTH PREDICTABLE
 * 
 * Supports both dark and light themes seamlessly.
 */
export const GrowthStage = ({ 
  stage, 
  index, 
  isStageActive, 
  isHovered, 
  onHover 
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15 + 0.25, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={() => onHover(stage.number)}
      onMouseLeave={() => onHover(null)}
      className="group relative flex flex-col justify-between select-none cursor-default transition-all duration-300"
    >
      {/* ── Top Row: Circular Node Indicator (Positioned on the connector line) ── */}
      <div className="relative flex items-center h-4 mb-2.5">
        <div className="relative flex items-center justify-center">
          {/* Subtle Expanding Activation Pulse Ring */}
          <motion.div
            animate={prefersReducedMotion ? {} : {
              scale: isStageActive || isHovered ? [1, 1.4, 1] : 1,
              opacity: isStageActive || isHovered ? [0.6, 0, 0.6] : 0,
            }}
            transition={{
              duration: 2.2,
              repeat: isStageActive ? Infinity : 0,
              ease: 'easeInOut',
            }}
            className="absolute w-7 h-7 rounded-full pointer-events-none"
            style={{ backgroundColor: `${stage.color}25` }}
          />

          {/* Node Core Disk */}
          <div 
            className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              isStageActive || isHovered ? 'scale-115' : 'scale-100'
            } bg-white dark:bg-[#0E0E0E]`}
            style={{
              borderColor: stage.color,
              boxShadow: isStageActive || isHovered 
                ? `0 0 12px ${stage.color}60` 
                : 'none',
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full mx-auto mt-0.5 transition-all duration-300"
              style={{ 
                backgroundColor: isStageActive || isHovered ? stage.color : 'currentColor',
                opacity: isStageActive || isHovered ? 1 : 0.4
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Sub-header: Stage Number & Sub-label Pill (Shifted cleanly below the line) ── */}
      <div className="flex items-center gap-2 mb-2">
        <span 
          className="text-xs font-mono font-bold tracking-wider transition-colors duration-200"
          style={{ color: stage.color }}
        >
          {stage.number}
        </span>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 uppercase tracking-wider transition-colors duration-300">
          {stage.sub}
        </span>
      </div>

      {/* ── Stage Content: Title & Short Description ─────────────────── */}
      <div className="mb-3.5">
        <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-1 transition-colors duration-200 ${
          isStageActive || isHovered 
            ? 'text-slate-900 dark:text-white' 
            : 'text-slate-700 dark:text-slate-200'
        }`}>
          {stage.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal transition-colors duration-300">
          {stage.desc}
        </p>
      </div>

      {/* ── Dominant Metric ──────────────────────────────────────────── */}
      <div className={`pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-baseline justify-between transition-transform duration-300 ${
        isHovered ? '-translate-y-1' : ''
      }`}>
        <span 
          className={`text-xs sm:text-sm font-mono font-bold tracking-wider transition-all duration-300 ${
            isStageActive || isHovered ? 'opacity-100' : 'opacity-80'
          }`}
          style={{ color: stage.color }}
        >
          {stage.metric}
        </span>
      </div>

    </motion.div>
  )
}

export default GrowthStage
