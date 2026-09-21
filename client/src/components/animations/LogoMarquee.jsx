import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * LogoMarquee
 * High-performance infinite horizontal marquee with:
 * - Bilateral edge gradient fade masks
 * - Pause slightly on hover
 * - Seamless looping without visible seam
 * - Row direction control ('left' | 'right')
 */
export const LogoMarquee = ({
  items = [],
  speed = 28, // seconds per loop
  direction = 'left', // 'left' | 'right'
  pauseOnHover = true,
  className = '',
  renderItem,
}) => {
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Ensure seamless loop with duplicated array
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div
      className={`relative w-full overflow-hidden select-none ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Bilateral Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      {/* Marquee Track */}
      <motion.div
        className="flex items-center gap-6 sm:gap-10 w-max"
        animate={
          prefersReducedMotion || isPaused
            ? {}
            : {
                x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
              }
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {renderItem ? renderItem(item, index) : item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default LogoMarquee
