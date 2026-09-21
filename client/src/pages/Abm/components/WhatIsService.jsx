import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const OUTCOME_INDICATORS = [
  {
    num: '01',
    label: 'TARGET',
    desc: 'High-value accounts & ICP fit',
    color: 'var(--primary)',
    glowColor: 'rgba(0, 166, 255, 0.25)',
    type: 'target',
  },
  {
    num: '02',
    label: 'ENGAGE',
    desc: 'Personalized stakeholder outreach',
    color: 'var(--cta)',
    glowColor: 'rgba(255, 109, 0, 0.25)',
    type: 'engage',
  },
  {
    num: '03',
    label: 'CONVERT',
    desc: 'Generate qualified sales pipeline',
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

  // Sequential storytelling: TARGET → ENGAGE → CONVERT (cycles every 2.8s when in view, paused on hover)
  useEffect(() => {
    if (!isInView || isHovered || prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % OUTCOME_INDICATORS.length)
    }, 2800)

    return () => clearInterval(interval)
  }, [isInView, isHovered, prefersReducedMotion])

  return (
    <section
      id="what-is-account-based-marketing"
      className="relative pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 overflow-hidden bg-background border-t border-b border-border transition-colors duration-300"
      aria-label="What Is Account-Based Marketing"
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
                Account-Based
              </motion.span>
              <motion.span
                className="inline-block"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                Marketing?
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
                  alt="Account-Based Marketing Journey: Target, Engage, Convert"
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
                      TARGET → ENGAGE → CONVERT
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-primary px-2 py-0.5 rounded-full bg-surface/80 border border-border backdrop-blur-sm">
                    ABM Program
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
              Account-Based Marketing is a focused B2B growth strategy that identifies high-value accounts and delivers targeted engagement to the decision-makers within them.
            </motion.p>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-text-secondary leading-relaxed"
            >
              Taraj Global combines account intelligence, audience targeting, buyer insights, and personalized outreach to help businesses engage the accounts that matter most. The result is structured outreach that accelerates sales velocity and generates high-intent pipeline.
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
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              y: -4,
                              scale: 1.02,
                              transition: { duration: 0.22, ease: 'easeOut' },
                            }
                      }
                      className="relative flex flex-col gap-2 p-3.5 sm:p-4 bg-surface transition-all duration-300"
                      style={{
                        borderRight: idx < 2 ? '1px solid var(--border)' : 'none',
                        borderTop: idx > 0 ? '1px solid var(--border)' : 'none',
                        boxShadow: isActive ? `0 8px 24px -6px ${item.glowColor}` : 'none',
                        borderColor: isActive ? item.color : 'var(--border)',
                        zIndex: isActive ? 10 : 1,
                      }}
                    >
                      {/* CARD PROGRESS ANIMATION */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 rounded-t-xl"
                        style={{
                          height: isActive ? '2.5px' : '1.5px',
                          background: `linear-gradient(90deg, ${item.color}, transparent)`,
                          transformOrigin: 'left',
                          filter: isActive ? 'drop-shadow(0 0 4px currentColor)' : 'none',
                          color: item.color,
                        }}
                        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                        whileInView={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: 0.75 + idx * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />

                      {/* Header with Number, connecting line */}
                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <div className="flex items-center gap-2 flex-1">
                          <span
                            className="text-xs font-mono font-black tracking-widest transition-colors duration-200"
                            style={{ color: item.color }}
                          >
                            {item.num}
                          </span>
                          <div
                            className="flex-1 h-px transition-opacity duration-200"
                            style={{
                              background: `${item.color}35`,
                              opacity: isActive ? 1 : 0.4,
                            }}
                          />
                        </div>

                        {/* Micro-interaction indicator */}
                        <div className="shrink-0 flex items-center justify-center w-5 h-5">
                          {item.type === 'target' && (
                            <div className="relative w-4 h-4 flex items-center justify-center">
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <motion.span
                                className="absolute inset-0 rounded-full border"
                                style={{ borderColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { scale: [1, 1.45, 1], opacity: [0.9, 0.2, 0.9] }
                                    : { scale: 1, opacity: 0.3 }
                                }
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                          )}

                          {item.type === 'engage' && (
                            <div className="flex items-end justify-center gap-0.5 h-3.5">
                              <motion.span
                                className="w-0.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { height: ['4px', '14px', '4px'] }
                                    : { height: '6px' }
                                }
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                              />
                              <motion.span
                                className="w-0.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { height: ['12px', '5px', '12px'] }
                                    : { height: '10px' }
                                }
                                transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                              <motion.span
                                className="w-0.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { height: ['6px', '14px', '6px'] }
                                    : { height: '7px' }
                                }
                                transition={{ duration: 0.8, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                          )}

                          {item.type === 'convert' && (
                            <motion.div
                              className="w-4 h-4 rounded-full flex items-center justify-center border"
                              style={{ borderColor: item.color }}
                              animate={
                                isActive && !prefersReducedMotion
                                  ? { rotate: 360 }
                                  : { rotate: 0 }
                              }
                              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-xs"
                                style={{ backgroundColor: item.color }}
                              />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Label */}
                      <span
                        className="text-xs font-mono font-bold tracking-wider transition-colors duration-200"
                        style={{ color: isActive ? item.color : 'var(--text-primary)' }}
                      >
                        {item.label}
                      </span>

                      {/* Description */}
                      <p className="text-xs text-text-secondary leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIsService
