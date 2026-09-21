import React from 'react'
import { motion } from 'framer-motion'
import { scaleInVariants } from '../../animations/variants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Reusable ScaleIn animation component
 */
export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.6,
  initialScale = 0.92,
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
    <MotionComponent
      variants={scaleInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      custom={{ delay, duration, initialScale }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default ScaleIn
