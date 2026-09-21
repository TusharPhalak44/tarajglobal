import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * SectionReveal
 * Section-level wrapper that reveals contents when scrolling into viewport.
 */
export const SectionReveal = ({
  children,
  delay = 0,
  duration = 0.7,
  distance = 35,
  className = '',
  as: Component = 'section',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <Component className={className} {...rest}>
        {children}
      </Component>
    )
  }

  const MotionComponent = motion[Component] || motion.section

  return (
    <MotionComponent
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default SectionReveal
