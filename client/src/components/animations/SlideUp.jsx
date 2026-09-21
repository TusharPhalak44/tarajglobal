import React from 'react'
import { motion } from 'framer-motion'
import { slideUpVariants } from '../../animations/variants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Reusable SlideUp animation component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0] - Delay in seconds
 * @param {number} [props.duration=0.6] - Duration in seconds
 * @param {number} [props.distance=30] - Y offset distance in pixels
 * @param {string} [props.className='']
 * @param {boolean} [props.once=true]
 * @param {number} [props.threshold=0.15]
 */
export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.6,
  distance = 30,
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
      variants={slideUpVariants}
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

export default SlideUp
