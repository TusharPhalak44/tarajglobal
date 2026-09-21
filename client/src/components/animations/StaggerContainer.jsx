import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainerVariants } from '../../animations/variants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Reusable StaggerContainer component
 * Automatically staggers child motion elements
 */
export const StaggerContainer = ({
  children,
  staggerChildren = 0.12,
  delayChildren = 0.05,
  className = '',
  once = true,
  threshold = 0.1,
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
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      custom={{ staggerChildren, delayChildren }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default StaggerContainer
