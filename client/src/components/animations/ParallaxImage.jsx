import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * ParallaxImage
 * Premium image container with clip-path reveal and subtle scroll parallax.
 */
export const ParallaxImage = ({
  src,
  alt = '',
  aspectRatio = '16/9',
  parallaxDistance = 40,
  className = '',
  imgClassName = '',
}) => {
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Subtle vertical parallax movement
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-parallaxDistance, parallaxDistance]
  )

  return (
    <motion.div
      ref={containerRef}
      initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 }}
      whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: prefersReducedMotion ? 1 : 1.12 }}
        className={`absolute inset-0 w-full h-full object-cover will-change-transform ${imgClassName}`}
      />
    </motion.div>
  )
}

export default ParallaxImage
