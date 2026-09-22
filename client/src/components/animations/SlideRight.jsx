import React from 'react'
import { motion } from 'framer-motion'
import { slideRightVariants } from '@animations/variants'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * Reusable SlideRight animation component (slides from left to right)
 */
export const SlideRight = ({
  children,
  delay = 0,
  duration = 0.6,
  distance = 40,
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
      variants={slideRightVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      custom={{ delay, duration, distance }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default SlideRight
