import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * CardHover
 * Reusable card wrapper providing:
 * - Subtle lift: translateY(-5px to -6px)
 * - Icon scale: 1.05
 * - Expanding bottom gradient line
 * - Soft ambient specular glow
 */
export const CardHover = ({
  children,
  lift = 5,
  accentGradient = 'from-[#0066CC] via-[#00A6FF] to-[#FF6D00]',
  glowColor = 'rgba(0, 166, 255, 0.15)',
  showBottomLine = true,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <Component className={`relative ${className}`} {...rest}>
        {children}
      </Component>
    )
  }

  const MotionComponent = motion[Component] || motion.div

  return (
    <MotionComponent
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -lift : 0,
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative ${className}`}
      {...rest}
    >
      {/* Soft Ambient Specular Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 14px 30px -10px ${glowColor}`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}

        {/* Expanding Bottom Accent Line */}
        {showBottomLine && (
          <div className="relative w-full h-[2px] mt-4 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
            <motion.div
              className={`h-full w-full bg-gradient-to-r ${accentGradient} origin-left`}
              initial={false}
              animate={{
                scaleX: isHovered ? 1 : 0.25,
                opacity: isHovered ? 1 : 0.4,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </div>
    </MotionComponent>
  )
}

export default CardHover
