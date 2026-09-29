import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * React Bits Magnet Component
 * Subtly and smoothly pulls the wrapped element towards the cursor.
 */
export const Magnet = ({
  children,
  disabled = false,
  magnetStrength = 0.22,
  springConfig = { damping: 18, stiffness: 140, mass: 0.2 },
  className = '',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion()
  const isDisabled = disabled || prefersReducedMotion
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (isDisabled || !ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distX = clientX - centerX
    const distY = clientY - centerY

    // Controlled, professional displacement (max ~14px)
    const maxOffset = 14
    const targetX = Math.max(Math.min(distX * magnetStrength, maxOffset), -maxOffset)
    const targetY = Math.max(Math.min(distY * magnetStrength, maxOffset), -maxOffset)

    x.set(targetX)
    y.set(targetY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Magnet
