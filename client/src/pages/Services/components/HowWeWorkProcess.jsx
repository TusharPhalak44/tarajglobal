import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const PROCESS_STEPS = [
  {
    step: '01',
    label: 'DEFINE',
    desc: 'Aligning ICP, TAM boundaries, buyer personas, and qualification metrics.',
  },
  {
    step: '02',
    label: 'IDENTIFY',
    desc: 'Extracting verified decision-maker records with direct dials & active intent signals.',
  },
  {
    step: '03',
    label: 'ENGAGE',
    desc: 'Orchestrating multi-touch cold email, phone touchpoints, and asset syndication.',
  },
  {
    step: '04',
    label: 'QUALIFY',
    desc: 'Vetting accounts across BANT criteria to ensure true commercial readiness.',
  },
  {
    step: '05',
    label: 'CONVERT',
    desc: 'Booking confirmed meetings onto your sales calendars and syncing CRM data.',
  },
]

export default function HowWeWorkProcess() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })
  const [activeStep, setActiveStep] = useState(2)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden"
      aria-label="How We Work — From First Signal to Qualified Opportunity"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>END-TO-END EXECUTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12] mb-4">
            From First Signal to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Qualified Opportunity.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            A cohesive, single-thread revenue pipeline connecting market intelligence directly to closed-won revenue.
          </p>
        </div>

        {/* Desktop Horizontal Process Line (NO Cards) */}
        <div className="hidden lg:block relative">
          {/* Continuous Connecting Line */}
          <div className="absolute top-6 left-12 right-12 h-[2px] bg-border/60">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-cta to-emerald-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* 5 Stages Positioned Horizontally */}
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((item, idx) => {
              const isCurrent = activeStep === idx
              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Indicator Node on the Line */}
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-border/80 group-hover:border-primary flex items-center justify-center mb-6 transition-all duration-300 shadow-sm relative">
                    <span className="font-mono text-xs font-bold text-text-muted group-hover:text-primary">
                      {item.step}
                    </span>
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-ping" />
                    )}
                  </div>

                  {/* Stage Name */}
                  <h3 className="font-mono text-lg font-black tracking-wider text-text-primary mb-3 transition-colors duration-200 group-hover:text-primary">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed font-normal max-w-[220px]">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Vertical Process (NO Cards, Single Connected Line) */}
        <div className="lg:hidden relative pl-8 sm:pl-10 space-y-8">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-border/60">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-cta to-emerald-500 origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%' }}
            />
          </div>

          {PROCESS_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.12 }}
              className="relative"
            >
              {/* Node on Vertical Line */}
              <div className="absolute -left-[28px] sm:-left-[36px] top-1 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs font-bold text-text-muted">
                    {item.step}
                  </span>
                  <h3 className="font-mono text-base font-black tracking-wider text-text-primary">
                    {item.label}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
