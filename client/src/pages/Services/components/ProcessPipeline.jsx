import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STAGES = [
  {
    num: '01',
    name: 'DEFINE',
    desc: 'Aligning ICP, TAM boundaries, buyer personas, and qualification metrics.',
  },
  {
    num: '02',
    name: 'IDENTIFY',
    desc: 'Extracting verified decision-maker records with direct dials & active intent signals.',
  },
  {
    num: '03',
    name: 'ENGAGE',
    desc: 'Orchestrating multi-touch cold email, phone touchpoints, and asset syndication.',
  },
  {
    num: '04',
    name: 'QUALIFY',
    desc: 'Vetting accounts across BANT criteria to ensure true commercial readiness.',
  },
  {
    num: '05',
    name: 'CONVERT',
    desc: 'Booking confirmed meetings onto your sales calendars and syncing CRM data.',
  },
]

export default function ProcessPipeline() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })
  const [activeStage, setActiveStage] = useState(2)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden select-none"
      aria-label="How We Turn Strategy Into Pipeline"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12]">
            How We Turn Strategy Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Pipeline.
            </span>
          </h2>
        </div>

        {/* ── DESKTOP HORIZONTAL PROCESS (CONNECTED VIA ONE THIN LINE) ── */}
        <div className="hidden lg:block relative">
          {/* Continuous Connecting Thin Line */}
          <div className="absolute top-5 left-10 right-10 h-[1.5px] bg-border/60">
            <motion.div
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* 5 Process Stages Horizontally */}
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {STAGES.map((stage, idx) => {
              const isSelected = activeStage === idx
              return (
                <div
                  key={stage.num}
                  onMouseEnter={() => setActiveStage(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Subtle Node Point on the Line */}
                  <div
                    className={`w-10 h-10 rounded-full bg-background border-2 flex items-center justify-center mb-6 transition-all duration-300 ${
                      isSelected
                        ? 'border-primary text-primary shadow-xs'
                        : 'border-border text-text-muted group-hover:border-primary/60'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">
                      {stage.num}
                    </span>
                  </div>

                  {/* Stage Name */}
                  <h3
                    className={`font-mono text-base sm:text-lg font-black tracking-wider mb-2 transition-colors duration-200 ${
                      isSelected ? 'text-primary' : 'text-text-primary group-hover:text-primary'
                    }`}
                  >
                    {stage.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal max-w-[210px]">
                    {stage.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── MOBILE VERTICAL PROCESS (ONE CONNECTED LINE) ── */}
        <div className="lg:hidden relative pl-8 space-y-8">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[13px] top-3 bottom-3 w-[1.5px] bg-border/60">
            <motion.div
              className="w-full bg-primary origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%' }}
            />
          </div>

          {STAGES.map((stage, idx) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 16 }}
              transition={{ duration: 0.5, delay: 0.12 * idx }}
              className="relative"
            >
              {/* Point on vertical line */}
              <div className="absolute -left-[27px] top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs font-bold text-primary">
                    {stage.num}
                  </span>
                  <h3 className="font-mono text-base font-black tracking-wider text-text-primary">
                    {stage.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                  {stage.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
