import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const OUTCOME_INDICATORS = [
  {
    num: '01',
    label: ' SELECT',
    desc: ' Tier ICP-fit accounts using firmographics, tech stack, and live intent.',
    color: '#00A6FF',
    accentColor: '#38BDF8',
    glowColor: 'rgba(0, 166, 255, 0.25)',
    bgActive: 'rgba(0, 166, 255, 0.08)',
    borderActive: 'rgba(0, 166, 255, 0.55)',
    type: 'target',
  },
  {
    num: '02',
    label: 'ENGAGE',
    desc: 'Reach every buying-committee stakeholder with personalized multi-channel outreach.',
    color: '#FFA600',
    accentColor: '#FFC048',
    glowColor: 'rgba(255, 166, 0, 0.25)',
    bgActive: 'rgba(255, 166, 0, 0.08)',
    borderActive: 'rgba(255, 166, 0, 0.55)',
    type: 'engage',
  },
  {
    num: '03',
    label: 'CONVERT',
    desc: 'Qualify account interest and hand off sales-ready opportunities.',
    color: '#72D669',
    accentColor: '#86EFAC',
    glowColor: 'rgba(114, 214, 105, 0.25)',
    bgActive: 'rgba(114, 214, 105, 0.08)',
    borderActive: 'rgba(114, 214, 105, 0.55)',
    type: 'convert',
  },
]

const WhatIsService = () => {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredStep, setHoveredStep] = useState(null)

  return (
    <section
      id="what-is-abm"
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
            className="flex items-center justify-center mb-4"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
             ABM PIPELINE ENGINE
            </span>
          </motion.div>

          {/* HEADING ANIMATION — line by line reveal */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.24] text-text-primary whitespace-normal lg:whitespace-nowrap">
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
                {/* Account-Based Marketing (ABM) */}
              </motion.span>
              <motion.span
                className="inline-block"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
               Account-Based Marketing (ABM)?
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10 items-center">
          {/* Left — visual image card */}
          <div className="relative">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-border bg-surface shadow-lg group hover:border-primary/40 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                <img
                  src="/abm.avif"
                  alt="Account-Based Marketing Journey: Target Accounts, Buying Committees, 1:1 Outreach, Won ACV"
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
                      TARGET ACCOUNTS → BUYING COMMITTEES → 1:1 OUTREACH → WON ACV
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-primary px-2 py-0.5 rounded-full bg-surface/80 border border-border backdrop-blur-sm">
                    ABM Execution
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
               Account-based marketing (ABM) is a B2B go-to-market strategy that treats each high-value target account as a market of one. Sales and marketing agree on best-fit accounts upfront, then engage every member of the buying committee with coordinated, personalized outreach.
            </motion.p>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-text-secondary leading-relaxed"
            >
              Unlike broad lead generation that chases volume, TaRaj Global’s tech-enabled ABM combines AI-assisted account scoring, live intent telemetry, and in-house verified contact data, backed by our 99.8% Data Accuracy SLA. Your team engages only accounts that fit your ICP and show buying signals, with opportunities routed into your CRM via DemandFlow Bridge.
            </motion.p>

            {/* PROCESS CARDS — HOVER ACTIVATION */}
            <div className="relative pt-4 sm:pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                {OUTCOME_INDICATORS.map((item, idx) => {
                  const isActive = hoveredStep === idx

                  return (
                    <motion.div
                      key={item.num}
                      onMouseEnter={() => setHoveredStep(idx)}
                      onMouseLeave={() => setHoveredStep(null)}
                      onTouchStart={() => setHoveredStep(idx)}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + idx * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={prefersReducedMotion ? {} : { y: -3 }}
                      className={`relative flex flex-col justify-between text-left p-4 sm:p-4.5 rounded-xl border transition-all duration-300 overflow-hidden cursor-default ${
                        isActive
                          ? 'shadow-lg'
                          : 'bg-surface/50 dark:bg-white/[0.02] border-border/80 dark:border-white/10 hover:border-white/20 hover:bg-surface/80 dark:hover:bg-white/[0.04]'
                      }`}
                      style={{
                        backgroundColor: isActive ? item.bgActive : undefined,
                        borderColor: isActive ? item.borderActive : undefined,
                        boxShadow: isActive ? `0 8px 24px -4px ${item.glowColor}` : undefined,
                      }}
                    >
                      {/* Active Progress Bar (Fills when hovered) */}
                      {isActive && !prefersReducedMotion && (
                        <motion.div
                          key={`progress-${idx}`}
                          className="absolute top-0 left-0 right-0 h-[2.5px] origin-left"
                          style={{
                            background: `linear-gradient(90deg, ${item.color}, ${item.accentColor})`,
                            boxShadow: `0 0 10px ${item.color}`,
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      )}
                      {isActive && prefersReducedMotion && (
                        <div
                          className="absolute top-0 left-0 right-0 h-[2.5px]"
                          style={{
                            background: `linear-gradient(90deg, ${item.color}, ${item.accentColor})`,
                          }}
                        />
                      )}

                      {/* Header with Number, Label, and Micro-Interaction Indicator */}
                      <div className="flex items-center justify-between gap-2 mb-2 w-full pt-0.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-mono font-black tracking-widest transition-colors duration-200"
                            style={{ color: item.color }}
                          >
                            {item.num}
                          </span>
                          <span
                            className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase transition-colors duration-200"
                            style={{ color: isActive ? item.color : 'inherit' }}
                          >
                            {item.label}
                          </span>
                        </div>

                        {/* Micro-interaction indicator */}
                        <div className="shrink-0 flex items-center justify-center w-5 h-5">
                          {item.type === 'target' && (
                            <div className="relative w-4 h-4 flex items-center justify-center">
                              <span
                                className="w-1.5 h-1.5 rounded-full transition-transform duration-200"
                                style={{
                                  backgroundColor: item.color,
                                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                }}
                              />
                              <motion.span
                                className="absolute inset-0 rounded-full border"
                                style={{ borderColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { scale: [1, 1.45, 1], opacity: [0.9, 0.25, 0.9] }
                                    : { scale: 1, opacity: 0.3 }
                                }
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                          )}

                          {item.type === 'engage' && (
                            <div className="flex items-end justify-center gap-0.5 h-3.5">
                              <motion.span
                                className="w-1 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { height: ['4px', '12px', '4px'], opacity: [0.6, 1, 0.6] }
                                    : { height: '6px', opacity: 0.35 }
                                }
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                              <motion.span
                                className="w-1 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { height: ['12px', '5px', '12px'], opacity: [1, 0.5, 1] }
                                    : { height: '10px', opacity: 0.45 }
                                }
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                              />
                              <motion.span
                                className="w-1 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={
                                  isActive && !prefersReducedMotion
                                    ? { height: ['6px', '11px', '6px'], opacity: [0.7, 1, 0.7] }
                                    : { height: '4px', opacity: 0.35 }
                                }
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                              />
                            </div>
                          )}

                          {item.type === 'convert' && (
                            <motion.svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 16 16"
                              fill="none"
                              style={{ color: item.color }}
                              animate={
                                isActive && !prefersReducedMotion
                                  ? { y: [0, -2.5, 0], x: [0, 1.5, 0], opacity: [0.8, 1, 0.8] }
                                  : { y: 0, x: 0, opacity: 0.4 }
                              }
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <path
                                d="M3 13L13 3M13 3H6M13 3V10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed transition-colors duration-200 mt-1 ${
                          isActive
                            ? 'text-text-primary dark:text-slate-100 font-medium'
                            : 'text-text-secondary/85 dark:text-slate-400 font-normal'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIsService
