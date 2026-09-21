import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * GradientOrb
 * Subtle, floating blurred radial gradient orb.
 * Uses GPU transform/opacity only to prevent repaint costs.
 */
export const GradientOrb = ({
  color = 'rgba(0, 166, 255, 0.12)',
  size = 500,
  blur = 140,
  top = '20%',
  left = '20%',
  duration = 8,
  delay = 0,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        transformOrigin: 'center center',
      }}
      animate={
        prefersReducedMotion
          ? { opacity: 0.7 }
          : {
              scale: [1, 1.15, 1],
              x: [0, 25, 0],
              y: [0, -20, 0],
              opacity: [0.6, 0.85, 0.6],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden="true"
    />
  )
}

export default GradientOrb
