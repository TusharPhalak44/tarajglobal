import React, { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * MagneticButton
 * Interactive button wrapper with subtle spring-based magnetic attraction to cursor.
 * Automatically disabled on mobile touch devices and when reduced motion is preferred.
 */
export const MagneticButton = ({
  children,
  strength = 0.25,
  className = '',
  ...rest
}) => {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 220, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 220, damping: 18 })

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || isMobile || prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    mouseX.set(x)
    mouseY.set(y)
  }, [isMobile, prefersReducedMotion, strength, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  if (prefersReducedMotion || isMobile) {
    return <div className={`inline-block ${className}`} {...rest}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={`inline-block ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton
