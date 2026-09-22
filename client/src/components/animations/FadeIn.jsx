import React from 'react'
import { motion } from 'framer-motion'
import { fadeInVariants } from '@animations/variants'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * Reusable FadeIn animation component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0] - Delay in seconds
 * @param {number} [props.duration=0.6] - Duration in seconds
 * @param {string} [props.className='']
 * @param {boolean} [props.once=true] - Animate once in viewport
 * @param {number} [props.threshold=0.15] - Viewport amount threshold
 */
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
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
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      custom={{ delay, duration }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default FadeIn
