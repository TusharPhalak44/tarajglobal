import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * StaggerReveal
 * Staggers entrance of its children with customizable intervals.
 */
export const StaggerReveal = ({
  children,
  staggerInterval = 0.12,
  delayChildren = 0.1,
  className = '',
  as: Component = 'div',
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

  const MotionComponent = motion[Component] || motion.div

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerInterval,
            delayChildren,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default StaggerReveal
