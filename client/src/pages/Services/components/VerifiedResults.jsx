import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/**
 * MetricCounter
 * Single-trigger kinetic counter with natural deceleration easing
 */
const MetricCounter = ({ target, duration = 1600, shouldAnimate }) => {
  const [display, setDisplay] = useState(0)
  const hasRun = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(target)
      return
    }

    if (shouldAnimate && !hasRun.current) {
      hasRun.current = true
      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setDisplay(Math.floor(ease * target))

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setDisplay(target)
        }
      }

      requestAnimationFrame(step)
    }
  }, [shouldAnimate, target, duration, prefersReducedMotion])

  return <span>{prefersReducedMotion ? target.toLocaleString() : display.toLocaleString()}</span>
}

const METRICS = [
  {
    prefix: '$',
    target: 18,
    suffix: 'M+',
    label: 'Pipeline Influenced',
  },
  {
    prefix: '',
    target: 12,
    suffix: '+',
    label: 'Growth Solutions',
  },
  {
    prefix: '',
    target: 2100,
    suffix: '+',
    label: 'Campaigns Delivered',
  },
  {
    prefix: '',
    target: 99.8,
    isDecimal: true,
    suffix: '%',
    label: 'Data Accuracy SLA',
  },
]

export default function VerifiedResults() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-background border-t border-b border-border/50 overflow-hidden select-none"
      aria-label="Verified Performance Metrics"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Medium-Large Typography (Clean, Minimal, Non-Overwhelming) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
              transition={{ duration: 0.55, delay: 0.08 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <div className="font-mono text-3xl sm:text-4xl lg:text-[44px] font-black text-text-primary tracking-tight leading-none mb-2">
                {metric.prefix && <span className="text-primary">{metric.prefix}</span>}
                {metric.isDecimal ? (
                  <span>99.8</span>
                ) : (
                  <MetricCounter target={metric.target} shouldAnimate={isInView} />
                )}
                <span className="text-cta ml-0.5">{metric.suffix}</span>
              </div>

              <span className="text-sm font-semibold text-text-secondary">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
