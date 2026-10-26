import React from 'react'
import { motion } from 'framer-motion'
import { Target, Award } from 'lucide-react'

export default function WorkflowTargetBadge({
  isActive = false,
  isCompleted = false,
  onClick,
  isReducedMotion = false,
  className = '',
}) {
  const isCelebrated = isActive || isCompleted

  const handleClick = (e) => {
    e?.stopPropagation()
    if (onClick) onClick()
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick(e)
        }
      }}
      className={`relative flex flex-col items-center justify-center cursor-pointer select-none group ${className}`}
      title="Qualified HQL Leads"
    >
      {/* ── Outer Soft Atmospheric Glow (No Hard Edges) ── */}
      <div
        className={`absolute -inset-4 rounded-full blur-[28px] transition-all duration-700 pointer-events-none ${
          isCelebrated
            ? 'bg-gradient-to-r from-sky-400/35 via-[#00f0ff]/45 to-amber-400/35 scale-110 opacity-90'
            : 'bg-primary/10 dark:bg-[#0077dd]/20 group-hover:bg-primary/25 opacity-50'
        }`}
      />

      {/* ── Main Circular Core Container ── */}
      <motion.div
        whileHover={isReducedMotion ? {} : { scale: 1.06, y: -2 }}
        whileTap={isReducedMotion ? {} : { scale: 0.92 }}
        animate={
          isReducedMotion
            ? {}
            : isCelebrated
            ? {
                scale: [1, 1.05, 1],
                transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
              }
            : {}
        }
        className={`
          relative w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36
          rounded-full flex flex-col items-center justify-center text-center
          p-2 transition-all duration-300
          border-0 outline-none ring-0
          ${
            isCelebrated
              ? 'shadow-[0_0_40px_rgba(0,210,255,0.5),inset_0_0_25px_rgba(0,200,255,0.3)]'
              : 'shadow-[0_0_16px_rgba(0,140,255,0.18),inset_0_0_12px_rgba(0,140,255,0.12)] group-hover:shadow-[0_0_25px_rgba(0,180,255,0.3)]'
          }
        `}
        style={{
          background: isCelebrated
            ? 'radial-gradient(circle at center, #0284c7 0%, #0369a1 35%, #075985 70%, #082f49 100%)'
            : 'radial-gradient(circle at center, #0284c7 0%, #0369a1 40%, #075985 75%, #0c4a6e 100%)',
        }}
      >
        {/* ── Center Icon: Bullseye Target ── */}
        <div className="relative mb-1">
          <motion.div
            animate={
              isReducedMotion
                ? {}
                : isCelebrated
                ? {
                    scale: [1, 1.15, 1],
                    transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                  }
                : {
                    scale: [1, 1.04, 1],
                    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            className={`relative p-1.5 rounded-full border-0 transition-colors duration-300 ${
              isCelebrated
                ? 'bg-white/20 dark:bg-[#0088ff]/25 shadow-[0_0_14px_rgba(0,229,255,0.5)]'
                : 'bg-white/20 dark:bg-[#0088ff]/25 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
            }`}
          >
            <Target
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-text-primary dark:text-white dark:text-[#00f0ff] drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]"
              strokeWidth={2.2}
            />
          </motion.div>
        </div>

        {/* ── Target Outcome Typography ── */}
        <div className="space-y-0 z-10 leading-tight">
          <span className="block text-text-primary dark:text-white font-black text-[10px] sm:text-[11px] xl:text-[12px] tracking-wider uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            QUALIFIED
          </span>
          <span className="block text-sky-200 dark:text-[#00f0ff] font-black text-[10px] sm:text-[11px] xl:text-[12px] tracking-wider uppercase drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]">
            HQL LEADS
          </span>
        </div>

        {/* ── Sub-pill Badge ── */}
        <div
          className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-wider transition-all duration-300 border-0 ${
            isCelebrated
              ? 'bg-black/40 dark:bg-[#000d24]/80 text-sky-200 dark:text-[#38bdf8]'
              : 'bg-black/40 dark:bg-[#000d24]/80 text-sky-200 dark:text-[#38bdf8]'
          }`}
        >
          <Award className="w-2 h-2 text-sky-300 dark:text-[#00f0ff]" />
          <span>GOAL</span>
        </div>
      </motion.div>
    </div>
  )
}
