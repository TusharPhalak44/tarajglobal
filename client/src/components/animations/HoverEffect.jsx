import React from 'react'
import { motion } from 'framer-motion'
import { hoverLiftVariants } from '../../animations/variants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Reusable HoverEffect component for cards, buttons, and interactive pods
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.lift=6] - Y lift in pixels
 * @param {number} [props.scale=1.02] - Scale factor
 * @param {string} [props.className='']
 */
export const HoverEffect = ({
  children,
  lift = 6,
  scale = 1.02,
  className = '',
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
      variants={hoverLiftVariants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      custom={{ lift, scale }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default HoverEffect
