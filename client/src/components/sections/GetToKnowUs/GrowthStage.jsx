import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * GrowthStage
 * Enterprise Card for Dynamic B2B Growth Flow:
 * - 01 AUDIENCE INTEL (TAM MAPPED) -> 100% ICP PRECISION
 * - 02 VERIFIED DATA (DIRECT DIALS) -> 99.8% ACCURACY
 * - 03 FULL FUNNEL (PIPELINE WON) -> GROWTH PREDICTABLE
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.12 + 0.2, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={() => onHover(stage.number)}
      onMouseLeave={() => onHover(null)}
      className="group relative flex flex-col justify-between h-full select-none cursor-default"
    >
      {/* ── Enterprise Card Container ─────────────────────────────── */}
      <div 
        className={`relative flex flex-col justify-between h-full rounded-2xl border p-5 sm:p-6 lg:p-7 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          isStageActive || isHovered
            ? 'bg-[#091122]/95 -translate-y-1'
            : 'bg-[#080D1A]/90 hover:bg-[#090F20] hover:-translate-y-0.5'
        }`}
        style={{
          borderColor: isStageActive || isHovered ? `${stage.color}80` : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isStageActive || isHovered
            ? `0 14px 35px -8px ${stage.color}25, 0 0 25px ${stage.color}15`
            : '0 8px 24px -10px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Subtle Top Edge Ambient Glow Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, transparent, ${stage.color}, transparent)`,
            opacity: isStageActive || isHovered ? 1 : 0.35,
          }}
        />

        {/* Top Center Visual Alignment Dot (Connecting visually with stem above on desktop) */}
        <div 
          className="hidden md:block absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: stage.color,
            boxShadow: isStageActive || isHovered ? `0 0 8px ${stage.color}` : 'none',
            opacity: isStageActive || isHovered ? 1 : 0.4,
          }}
        />

        {/* Ambient Radial Glow on hover / active */}
        <div 
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
          style={{
            backgroundColor: `${stage.color}18`,
            opacity: isStageActive || isHovered ? 1 : 0.3,
          }}
        />

        {/* ── Header: Stage Number & Sub-label Pill ───────────────── */}
        <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span 
              className="text-base sm:text-lg font-mono font-black tracking-wider transition-colors duration-200"
              style={{ color: stage.color }}
            >
              {stage.number}
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-semibold px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-slate-300 uppercase tracking-wider transition-colors duration-300">
              {stage.sub}
            </span>
          </div>

          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.02]">
            PHASE {stage.number}
          </span>
        </div>

        {/* ── Content: Title & Short Description ─────────────────── */}
        <div className="relative z-10 flex-grow">
          <h3 className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight mb-2 uppercase transition-colors duration-200 ${
            isStageActive || isHovered ? 'text-white' : 'text-slate-100'
          }`}>
            {stage.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
            {stage.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default GrowthStage
