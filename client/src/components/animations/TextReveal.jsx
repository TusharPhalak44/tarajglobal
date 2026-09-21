import React from 'react'
import { motion } from 'framer-motion'
import { revealMaskVariants } from '../../animations/variants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Reusable TextReveal component with clean clip-path / overflow mask reveal
 */
export const TextReveal = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
  threshold = 0.15,
  as: Component = 'div',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <Component className={className} {...rest}>{children}</Component>
  }

  const MotionComponent = motion[Component] || motion.div

  return (
    <div className={`overflow-hidden ${className}`}>
      <MotionComponent
        variants={revealMaskVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        custom={{ delay, duration }}
        {...rest}
      >
        {children}
      </MotionComponent>
    </div>
  )
}

export default TextReveal
