import React from 'react'
import { motion, useScroll } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * ScrollProgress
 * Displays a subtle, minimal page scroll progress indicator:
 * - Desktop (>= 768px): Ultra-thin vertical bar on the right side (blue -> cyan -> orange)
 * - Mobile (< 768px): Thin top horizontal progress bar
 * Synchronized with Lenis scroll without secondary spring lag.
 */
export const ScrollProgress = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  if (prefersReducedMotion) return null

  return (
    <>
      {/* ── MOBILE PROGRESS BAR (TOP) ─────────────────────────────────── */}
      <motion.div
        className={`md:hidden fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left pointer-events-none ${className}`}
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #0066CC 0%, #00A6FF 50%, #FF6D00 100%)',
          boxShadow: '0 0 8px rgba(0, 166, 255, 0.4)',
        }}
        aria-hidden="true"
      />

      {/* ── DESKTOP PROGRESS INDICATOR (VERTICAL RIGHT EDGE) ───────────── */}
      <div 
        className={`hidden md:flex fixed right-2 top-1/2 -translate-y-1/2 z-40 flex-col items-center pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {/* Track Container */}
        <div className="relative w-[3px] h-36 rounded-full bg-slate-200/50 dark:bg-white/10 backdrop-blur-xs overflow-hidden">
          {/* Active Gradient Fill */}
          <motion.div
            className="w-full h-full rounded-full origin-top"
            style={{
              scaleY: scrollYProgress,
              background: 'linear-gradient(180deg, #0066CC 0%, #00A6FF 55%, #FF6D00 100%)',
              boxShadow: '0 0 10px rgba(0, 166, 255, 0.5)',
            }}
          />
        </div>

        {/* Small subtle accent pip */}
        <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-primary/40 dark:bg-white/20" />
      </div>
    </>
  )
}

export default ScrollProgress
