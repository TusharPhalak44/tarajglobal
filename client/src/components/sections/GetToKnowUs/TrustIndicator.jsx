import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * TrustIndicator
 * Compact bottom trust indicators with micro-animations:
 * - SLA GUARANTEED | 100% VALIDATED DATA RECORDS (with animated ○ -> ✓)
 * - GROWTH SIGNAL INDEX | PREDICTABLE TELEMETRY (with tiny animated sparkline)
 * 
 * Fully responsive and supports both dark and light themes seamlessly.
 */
export const TrustIndicator = () => {
  const [isChecked, setIsChecked] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  // Gentle cyclic check pulse for SLA indicator
  useEffect(() => {
    if (prefersReducedMotion) return

    const timer = setInterval(() => {
      setIsChecked((prev) => !prev)
    }, 2600)

    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="mt-6 sm:mt-8 pt-4 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-slate-400 select-none transition-colors duration-300"
    >
      
      {/* ── Indicator 01: SLA Guaranteed (with animated ○ -> ✓ check) ── */}
      <div className="flex items-center gap-2.5">
        {/* Animated Check Icon Capsule */}
        <div className="relative w-4 h-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
          <motion.div
            animate={{
              scale: isChecked ? 1 : 0.5,
              opacity: isChecked ? 1 : 0.25,
            }}
            transition={{ duration: 0.35 }}
          >
            <Check size={9} strokeWidth={3} />
          </motion.div>
        </div>

        <div className="flex items-center gap-1.5">
          <strong className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
            SLA GUARANTEED:
          </strong>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            100% VALIDATED DATA RECORDS
          </span>
        </div>
      </div>

      <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">|</span>

      {/* ── Indicator 02: Growth Signal Index (with animated micro-sparkline) ── */}
      <div className="flex items-center gap-2.5">
        {/* Animated Micro SVG Sparkline */}
        <div className="w-6 h-3 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 12" className="w-full h-full overflow-visible">
            <motion.path
              d="M 1 10 L 7 4 L 13 8 L 22 2"
              fill="none"
              stroke="#00A6FF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={prefersReducedMotion ? {} : {
                pathLength: [0.75, 1, 0.75],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <circle cx="22" cy="2" r="1.5" fill="#00A6FF" />
          </svg>
        </div>

        <div className="flex items-center gap-1.5">
          <strong className="text-primary dark:text-[#00E5FF] font-bold uppercase tracking-wider">
            GROWTH SIGNAL INDEX:
          </strong>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            PREDICTABLE TELEMETRY
          </span>
        </div>
      </div>

    </motion.div>
  )
}

export default TrustIndicator
