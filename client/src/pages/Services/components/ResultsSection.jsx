import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * Kinetic Counter from 0 to target
 */
const MetricCounter = ({ target, duration = 1800, shouldAnimate }) => {
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

const STATS = [
  {
    prefix: '$',
    target: 18,
    suffix: 'M+',
    label: 'Pipeline Influenced',
    sub: 'Verified opportunities generated across client cohorts',
    accent: '#00A6FF',
  },
  {
    prefix: '',
    target: 12,
    suffix: '+',
    label: 'Growth Solutions',
    sub: 'Specialized outbound capabilities & data services',
    accent: '#FF6D00',
  },
  {
    prefix: '',
    target: 2100,
    suffix: '+',
    label: 'Campaigns Delivered',
    sub: 'High-converting multi-channel demand programs',
    accent: '#00A6FF',
  },
  {
    prefix: '',
    target: 99.8,
    isDecimal: true,
    suffix: '%',
    label: 'Data Accuracy SLA',
    sub: 'Multi-tiered phone & email verification guarantee',
    accent: '#72D669',
  },
]

export default function ResultsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-background border-t border-b border-border/50 overflow-hidden"
      aria-label="Verified Performance Metrics"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Compact 4-Column Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 divide-border/40">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
              className="flex flex-col justify-center pt-6 sm:pt-0"
            >
              {/* Animated Stat Value */}
              <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight mb-2 flex items-baseline">
                {stat.prefix && <span className="text-primary mr-1">{stat.prefix}</span>}
                {stat.isDecimal ? (
                  <span>99.8</span>
                ) : (
                  <MetricCounter target={stat.target} shouldAnimate={isInView} />
                )}
                <span className="text-cta ml-0.5">{stat.suffix}</span>
              </div>

              {/* Stat Title */}
              <h3 className="text-sm sm:text-base font-bold text-text-primary tracking-tight mb-1">
                {stat.label}
              </h3>

              {/* Micro Subtitle */}
              <p className="text-xs text-text-secondary font-mono leading-relaxed">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
