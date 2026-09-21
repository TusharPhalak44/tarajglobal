import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * CountUp
 * Viewport-triggered animated number counter with easeOutExpo deceleration.
 * Runs only once per page load / viewport entry.
 */
export const CountUp = ({
  value = 0,
  duration = 1600,
  delay = 0,
  separator = ',',
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true

      const timer = setTimeout(() => {
        const startTime = performance.now()
        const startVal = 0
        const endVal = Number(value)

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)

          // Exponential ease out for satisfying deceleration
          const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          const current = Math.floor(startVal + (endVal - startVal) * easedProgress)
          setDisplayValue(current)

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setDisplayValue(endVal)
          }
        }

        requestAnimationFrame(animate)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, value, duration, delay, prefersReducedMotion])

  const formattedValue = separator
    ? displayValue.toLocaleString()
    : displayValue

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}

export default CountUp
