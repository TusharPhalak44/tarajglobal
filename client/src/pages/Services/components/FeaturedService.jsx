import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'

const PIPELINE_STAGES = [
  {
    step: '01',
    label: 'AUDIENCE',
    detail: 'Precision ICP & Buying Committee Mapping',
    sub: 'Firmographics, Tech Stack & Verified Direct Dials',
    accent: '#00A6FF',
  },
  {
    step: '02',
    label: 'CONTENT',
    detail: 'Intent-Triggered Asset Syndication',
    sub: 'Whitepapers, Solution Briefs & Case Studies',
    accent: '#FF6D00',
  },
  {
    step: '03',
    label: 'ENGAGEMENT',
    detail: 'Multi-Touch Personalized Orchestration',
    sub: 'Executive Email, Phone Verification & Retargeting',
    accent: '#00A6FF',
  },
  {
    step: '04',
    label: 'QUALIFIED PIPELINE',
    detail: 'Sales-Ready Opportunities in Your CRM',
    sub: 'Direct Calendar Meetings & Verified BANT Records',
    accent: '#72D669',
  },
]

export default function FeaturedService() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
      aria-label="Where Strategy Meets Execution — Featured Service"
    >
      {/* Background Soft Lighting */}
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] bg-primary/5 dark:bg-primary/8 pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Sub-Eyebrow */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cta/10 border border-cta/25 text-cta text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3" />
            <span>FEATURED SERVICE SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12] mt-4">
            Where Strategy Meets{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Execution.
            </span>
          </h2>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ══════════ LEFT: Large Index & Demand Generation Content ══════════ */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Large Index Number */}
            <div className="font-mono text-6xl sm:text-7xl lg:text-8xl font-black text-primary/20 dark:text-primary/25 tracking-tighter leading-none mb-4 select-none">
              01
            </div>

            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.22em] uppercase text-cta mb-2">
              FOUNDATIONAL CAPABILITY
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.15] mb-6">
              Demand Generation
            </h3>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal mb-6">
              Create predictable, scalable pipeline through integrated demand generation strategies. We combine account intelligence, buyer intent telemetry, and tailored outreach cadences to engage decision-makers long before your competitors arrive.
            </p>

            <ul className="space-y-3 mb-8 text-sm font-mono text-text-secondary">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Multi-tier buyer persona identification</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cta" />
                <span>Intent-driven digital asset distribution</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Real-time lead scoring & CRM synchronization</span>
              </li>
            </ul>

            <div>
              <Link
                to="/demand-generation"
                className="inline-flex items-center gap-3 text-sm sm:text-base font-bold text-primary group transition-all"
              >
                <span>Explore Demand Generation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* ══════════ RIGHT: Progressive Pipeline Visual (AUDIENCE -> PIPELINE) ══════════ */}
          <div className="lg:col-span-6">
            <div className="relative p-6 sm:p-10 rounded-3xl border border-border/70 bg-surface/40 dark:bg-white/[0.02] backdrop-blur-md">
              
              {/* Technical Header */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-border/50 text-[10px] font-mono text-text-muted">
                <span>PIPELINE VELOCITY // EXECUTION FLOW</span>
                <span className="text-primary">LIVE CADENCE</span>
              </div>

              {/* Vertical Progressive Path with 4 Nodes */}
              <div className="relative pl-8 sm:pl-12 space-y-10">
                {/* Continuous Connecting Line */}
                <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-6 w-[2px] bg-border/80">
                  <motion.div
                    className="w-full bg-gradient-to-b from-primary via-cta to-emerald-500 origin-top"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isInView ? 1 : 0 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: '100%' }}
                  />
                </div>

                {PIPELINE_STAGES.map((stage, idx) => (
                  <motion.div
                    key={stage.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.25, ease: 'easeOut' }}
                    className="relative group"
                  >
                    {/* Node Dot along the line */}
                    <div className="absolute -left-[30px] sm:-left-[46px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-background border-2 border-border group-hover:border-primary flex items-center justify-center transition-colors duration-300">
                      <span
                        className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{ backgroundColor: stage.accent }}
                      />
                    </div>

                    {/* Stage Details */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs font-bold text-text-muted">
                          {stage.step}
                        </span>
                        <h4 className="font-mono text-base sm:text-lg font-black tracking-wider text-text-primary">
                          {stage.label}
                        </h4>
                      </div>

                      <p className="text-sm font-semibold text-text-primary mb-0.5">
                        {stage.detail}
                      </p>
                      <p className="text-xs font-mono text-text-secondary">
                        {stage.sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom SLA Stamp */}
              <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>CONVERSION RATE AUDIT</span>
                <span className="text-emerald-500 font-bold">100% INTENT QUALIFIED</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
