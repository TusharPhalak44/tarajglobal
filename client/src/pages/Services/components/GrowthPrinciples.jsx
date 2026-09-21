import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ShieldCheck, Database, Target, Layers, Zap } from 'lucide-react'

const PRINCIPLES = [
  {
    num: '01',
    title: 'ICP-FOCUSED TARGETING',
    desc: 'Eliminating guesswork by strictly mapping outbound campaigns against validated firmographic, technographic, and departmental criteria.',
    icon: Target,
    accent: '#00A6FF',
  },
  {
    num: '02',
    title: 'VERIFIED B2B DATA',
    desc: 'Ensuring zero email bounce rates and direct dial connectivity with human-in-the-loop validation and live SMTP verification.',
    icon: Database,
    accent: '#FF6D00',
  },
  {
    num: '03',
    title: 'INTENT-LED QUALIFICATION',
    desc: 'Prioritizing accounts currently researching relevant technologies to connect when purchasing readiness is at its peak.',
    icon: Zap,
    accent: '#FFA600',
  },
  {
    num: '04',
    title: 'MULTI-CHANNEL ENGAGEMENT',
    desc: 'Synchronizing personalized 1-on-1 cold email, LinkedIn touchpoints, content syndication, and phone outreach into cohesive cadences.',
    icon: Layers,
    accent: '#00A6FF',
  },
  {
    num: '05',
    title: 'SCALABLE CAMPAIGN EXECUTION',
    desc: 'Rapid deployment architecture designed to ramp volume from pilot campaigns to thousands of qualified monthly touches seamlessly.',
    icon: ShieldCheck,
    accent: '#72D669',
  },
]

export default function GrowthPrinciples() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden"
      aria-label="Why Taraj Global — Built Around What Actually Drives Growth"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>CORE METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12] mb-4">
            Built Around What{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Actually Drives Growth.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            Five non-negotiable operational principles engineered into every campaign we run to ensure pipeline predictability.
          </p>
        </div>

        {/* Editorial Sequence (Editorial List with Interactive Activation) */}
        <div className="divide-y divide-border/60 border-t border-b border-border/60">
          {PRINCIPLES.map((principle, idx) => {
            const isActive = activeIdx === idx
            const Icon = principle.icon
            return (
              <motion.div
                key={principle.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
                onMouseEnter={() => setActiveIdx(idx)}
                className="group relative py-8 sm:py-10 transition-all duration-300 cursor-pointer"
              >
                {/* Active Indicator Line along Left Edge */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundColor: principle.accent }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  
                  {/* Left: Number & Icon */}
                  <div className="lg:col-span-2 flex items-center gap-4">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-text-muted transition-colors duration-300 group-hover:text-primary">
                      {principle.num}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl bg-surface border border-border/70 flex items-center justify-center transition-colors duration-300 group-hover:border-primary/50"
                      style={{ color: principle.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Center: Title */}
                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight group-hover:text-primary transition-colors duration-300">
                      {principle.title}
                    </h3>
                  </div>

                  {/* Right: Description & Micro-Line */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal mb-3">
                      {principle.desc}
                    </p>

                    {/* Animated Progress Line on Activation */}
                    <div className="h-[2px] w-full bg-border/40 overflow-hidden rounded-full mt-2">
                      <motion.div
                        className="h-full origin-left"
                        style={{ backgroundColor: principle.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0.15 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
