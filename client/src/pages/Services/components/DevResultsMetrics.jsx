import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const MetricCounter = ({ target, prefix = '', suffix = '', duration = 1800, shouldAnimate }) => {
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

  return (
    <span>
      {prefix}
      {prefersReducedMotion ? target.toLocaleString() : display.toLocaleString()}
      {suffix}
    </span>
  )
}

const STATS = [
  {
    prefix: '$',
    target: 18,
    suffix: 'M+',
    label: 'Pipeline Influenced',
    detail: 'Closed-won enterprise revenue driven by our multi-channel outbound and SQL programs.',
  },
  {
    prefix: '',
    target: 12,
    suffix: '+',
    label: 'Growth Solutions',
    detail: 'Specialized pipeline solutions spanning SQL, BANT, ABM, Content Syndication, and Data.',
  },
  {
    prefix: '',
    target: 2100,
    suffix: '+',
    label: 'Campaigns Delivered',
    detail: 'Delivered consistently across SaaS, Cloud, FinTech, and Cybersecurity verticals.',
  },
  {
    prefix: '',
    target: 99.8,
    suffix: '%',
    label: 'Data Accuracy SLA',
    detail: 'Triple-layer verified contact validation guaranteeing virtually zero bounce rates.',
    isFloat: true,
  },
]

export default function DevResultsMetrics() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <section
      ref={sectionRef}
      id="dev-results-metrics"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden"
      aria-label="Verified Performance Results"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <span>VERIFIED BENCHMARKS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            Results That Speak In Revenue, <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Not Just Vanity Activity
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            Proven commercial impact across over two thousand executed enterprise growth campaigns.
          </p>
        </div>

        {/* 4 Kinetic Stat Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-border/80 bg-surface/70 hover:bg-surface hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-3">
                  METRIC 0{idx + 1}
                </span>

                <div className="text-4xl sm:text-5xl font-black text-text-primary font-mono tracking-tight group-hover:text-primary transition-colors">
                  {stat.isFloat ? (
                    <span>99.8%</span>
                  ) : (
                    <MetricCounter
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      shouldAnimate={isInView}
                    />
                  )}
                </div>

                <div className="text-base font-bold text-text-primary mt-2 uppercase tracking-wide">
                  {stat.label}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                  {stat.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-[11px] text-primary font-semibold">
                <span>VERIFIED RECORD</span>
                <span>● SLA ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
