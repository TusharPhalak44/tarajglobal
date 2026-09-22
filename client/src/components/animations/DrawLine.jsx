import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * DrawLine
 * SVG stroke-dasharray / width animated gradient line.
 */
export const DrawLine = ({
  direction = 'horizontal',
  gradient = 'from-[#0066CC] via-[#00A6FF] to-[#FF6D00]',
  height = '2px',
  width = '100%',
  delay = 0.2,
  duration = 0.9,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div
        className={`bg-gradient-to-r ${gradient} ${className}`}
        style={{ width, height }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }} aria-hidden="true">
      <motion.div
        className={`h-full w-full bg-gradient-to-r ${gradient} rounded-full origin-left`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  )
}

export default DrawLine
