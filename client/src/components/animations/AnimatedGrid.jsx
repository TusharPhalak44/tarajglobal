import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * AnimatedGrid
 * Subtle, GPU-accelerated technical grid background pattern.
 * Uses CSS transforms/opacity only.
 */
export const AnimatedGrid = ({
  opacity = 0.04,
  size = 48,
  color = '#00A6FF',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage: `
            linear-gradient(to right, ${color} 1px, transparent 1px),
            linear-gradient(to bottom, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
          maskImage: 'radial-gradient(ellipse at 50% 50%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 60%, transparent 100%)',
        }}
      />
    </div>
  )
}

export default AnimatedGrid
