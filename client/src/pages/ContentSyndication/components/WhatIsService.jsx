import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const OUTCOME_INDICATORS = [
  {
    num: '01',
    label: 'TARGET',
    desc: 'Match ICP criteria & verified decision makers',
    color: 'var(--primary)',
    glowColor: 'rgba(0, 166, 255, 0.25)',
    type: 'target',
  },
  {
    num: '02',
    label: 'ENGAGE',
    desc: 'Syndicate content & capture asset downloads',
    color: 'var(--cta)',
    glowColor: 'rgba(255, 109, 0, 0.25)',
    type: 'engage',
  },
  {
    num: '03',
    label: 'QUALIFY',
    desc: 'Validate readership, intent & sales readiness',
    color: 'var(--success)',
    glowColor: 'rgba(114, 214, 105, 0.25)',
    type: 'convert',
  },
]

const WhatIsService = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // Sequential storytelling: TARGET → ENGAGE → QUALIFY (cycles every 2.8s when in view, paused on hover)
  useEffect(() => {
    if (!isInView || isHovered || prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % OUTCOME_INDICATORS.length)
    }, 2800)

    return () => clearInterval(interval)
  }, [isInView, isHovered, prefersReducedMotion])

  return (
    <section
      id="what-is-content-syndication"
      className="relative pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 overflow-hidden bg-background border-t border-b border-border transition-colors duration-300"
      aria-label="What Is B2B Content Syndication"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            opacity: 'var(--glow-opacity, 0.05)',
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--cta) 0%, transparent 70%)',
            opacity: 'var(--glow-opacity, 0.04)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 lg:mb-12">
          {/* SERVICE DEFINITION BADGE */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-surface mb-4"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0.5 }}
              whileInView={prefersReducedMotion ? {} : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
            />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase">
              Service Definition
            </span>
          </motion.div>

          {/* HEADING ANIMATION — line by line reveal */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.24] text-text-primary whitespace-normal lg:whitespace-nowrap">
            <motion.span
              className="inline-block mr-3"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              What Is
            </motion.span>
            <span className="inline-block bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent pb-1 sm:pb-1.5">
              <motion.span
                className="inline-block mr-2.5"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                B2B Content
              </motion.span>
              <motion.span
                className="inline-block"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                Syndication?
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10 items-center">
          {/* Left — visual image card */}
          <div className="relative">
            {/* Premium Visual Image Card */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-border bg-surface shadow-lg group hover:border-primary/40 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                <img
                  src="/enterprise-audience.jpg"
                  alt="B2B Content Syndication Journey: Target, Engage, Qualify"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

                {/* Bottom caption bar */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00A6FF] animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-wider text-text-primary">
                      TARGET → ENGAGE → QUALIFY
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-primary px-2 py-0.5 rounded-full bg-surface/80 border border-border backdrop-blur-sm">
                    Pipeline Acceleration
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — content & process cards */}
          <div className="space-y-6">
            {/* PARAGRAPH REVEAL */}
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-text-secondary leading-relaxed"
            >
              B2B content syndication distributes your content across targeted channels and relevant buyer audiences to increase reach, generate engagement, and create qualified leads.
            </motion.p>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-text-secondary leading-relaxed"
            >
              Taraj Global combines audience targeting, buyer intelligence, and content distribution to connect your content with relevant decision-makers.
            </motion.p>

            {/* PROCESS CARDS — MAIN INTERACTION */}
            <div className="relative pt-5 sm:pt-6">
              <motion.div
                onViewportEnter={() => setIsInView(true)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                {OUTCOME_INDICATORS.map((item, idx) => {
                  const isActive = activeStep === idx

                  return (
                    <motion.div
                      key={item.num}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.65,
                        delay: 0.6 + idx * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onMouseEnter={() => {
                        setIsHovered(true)
                        setActiveStep(idx)
                      }}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`
                        relative p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer
                        ${idx < OUTCOME_INDICATORS.length - 1 ? 'sm:border-r border-b sm:border-b-0 border-border' : ''}
                      `}
                      style={{
                        background: isActive ? 'var(--surface)' : 'transparent',
                      }}
                    >
                      {/* Active indicator top bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                        style={{
                          background: isActive ? item.color : 'transparent',
                          boxShadow: isActive ? `0 0 12px ${item.color}` : 'none',
                        }}
                      />

                      <div>
                        {/* Step number with pulse */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-xs font-mono font-bold tracking-wider"
                            style={{ color: item.color }}
                          >
                            {item.num}
                          </span>
                          {isActive && (
                            <motion.span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: item.color }}
                              animate={prefersReducedMotion ? {} : { scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            />
                          )}
                        </div>

                        {/* Label */}
                        <h3
                          className="text-base sm:text-lg font-black tracking-tight leading-tight mb-1 transition-colors duration-300"
                          style={{
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          }}
                        >
                          {item.label}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-text-secondary leading-normal mb-4">
                          {item.desc}
                        </p>
                      </div>

                      {/* Micro-metric badge */}
                      <div
                        className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded w-fit transition-all duration-300"
                        style={{
                          background: isActive ? `${item.color}15` : 'transparent',
                          color: isActive ? item.color : 'var(--text-muted)',
                          border: `1px solid ${isActive ? `${item.color}30` : 'transparent'}`,
                        }}
                      >
                        {item.type === 'target' && 'VERIFIED ICP'}
                        {item.type === 'engage' && 'OPT-IN READERS'}
                        {item.type === 'convert' && 'QUALIFIED LEADS'}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Progress track */}
              <div className="relative w-full h-0.5 bg-border rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-cta rounded-full"
                  animate={{
                    width: `${((activeStep + 1) / OUTCOME_INDICATORS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIsService
