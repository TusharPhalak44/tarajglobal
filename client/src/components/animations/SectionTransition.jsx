import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * SectionTransition
 * Soft ambient color passage between sections.
 * Smoothly shifts between blue, cyan, and orange atmospheres without hard edges.
 */
export const SectionTransition = ({
  fromColor = 'rgba(0, 102, 204, 0.04)',
  toColor = 'rgba(255, 109, 0, 0.04)',
  height = '80px',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`relative w-full pointer-events-none select-none overflow-hidden ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${fromColor} 0%, transparent 50%, ${toColor} 100%)`,
        }}
      />
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 166, 255, 0.05) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  )
}

export default SectionTransition
