import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, BarChart3, Globe2, ShieldCheck } from 'lucide-react'
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

const METRICS_DATA = [
  {
    prefix: '$',
    target: 18,
    suffix: 'M+',
    label: 'Pipeline Influenced',
    desc: 'Closed-won enterprise revenue driven through our qualified multi-touch programs.',
    icon: BarChart3,
  },
  {
    prefix: '',
    target: 12,
    suffix: '+',
    label: 'Growth Capabilities',
    desc: 'Specialized pipeline solutions spanning SQL, BANT, ABM, Content, and Data.',
    icon: Award,
  },
  {
    prefix: '',
    target: 2100,
    suffix: '+',
    label: 'Campaigns Delivered',
    desc: 'Consistently deployed across high-growth SaaS, FinTech, and Cloud verticals.',
    icon: Globe2,
  },
  {
    prefix: '',
    target: 99.8,
    suffix: '%',
    label: 'Data Accuracy SLA',
    desc: 'Triple-layer verified contact records with zero-bounce deliverability assurance.',
    icon: ShieldCheck,
    isFloat: true,
  },
]

export default function KineticStats() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <section
      ref={sectionRef}
      id="kinetic-stats"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden select-none"
      aria-label="Verified Performance Proof"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED PERFORMANCE DATA</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            Proven Outcomes That Accelerate <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Enterprise Revenue
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            Every engagement is backed by verified commercial benchmarks and rigorous SLA compliance.
          </p>
        </div>

        {/* 4 Kinetic Stat Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS_DATA.map((item, idx) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.label}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl border border-border/80 bg-surface/70 hover:bg-surface hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xs text-text-muted uppercase">
                      BENCHMARK 0{idx + 1}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Kinetic Number */}
                  <div className="text-4xl sm:text-5xl font-black text-text-primary font-mono tracking-tight group-hover:text-primary transition-colors">
                    {item.isFloat ? (
                      <span>99.8%</span>
                    ) : (
                      <MetricCounter
                        target={item.target}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        shouldAnimate={isInView}
                      />
                    )}
                  </div>

                  <div className="text-base font-bold text-text-primary uppercase tracking-wide mt-2">
                    {item.label}
                  </div>

                  <p className="mt-2 text-xs text-text-secondary leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-[11px] text-primary font-semibold">
                  <span>AUDITED RECORD</span>
                  <span>● SLA CONFIRMED</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
