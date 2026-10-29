import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Crosshair,
  Briefcase,
  SlidersHorizontal,
  PieChart,
  CheckCheck,
} from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    title: 'Surgical Account Selection',
    desc: 'Campaigns calibrated strictly around verified high-yield enterprise logos matching your exact ICP criteria. Every outreach decision is grounded in deep firmographic and technographic fit.',
    icon: Crosshair,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '02',
    title: 'Decision-Maker Intelligence',
    desc: 'Direct access to mapped buying committees, key economic buyers, and internal champions instead of broad, untargeted contact lists that stall pipeline.',
    icon: Briefcase,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '03',
    title: '1:1 Executive Personalization',
    desc: 'Account-specific, 1-to-1 executive messaging tailored by industry context, role priorities, and real enterprise pain points to drive unanimous committee consensus.',
    icon: SlidersHorizontal,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '04',
    title: 'Real-Time Intent Telemetry',
    desc: 'Multi-channel intent monitoring and engagement telemetry across touchpoints to isolate accounts exhibiting active evaluation surges at peak buying windows.',
    icon: PieChart,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '05',
    title: 'Revenue-Driven Handoff',
    desc: 'Structured lead handoffs with complete account dossiers, consent timestamps, and screening notes delivered directly to your CRM to accelerate SDR and AE deal closing.',
    icon: CheckCheck,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
]

const WhyChoose = () => {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-50px' },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section
      id="why-choose-abm"
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-background border-t border-border"
      aria-label="Why Choose Taraj Global for Account-Based Marketing"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[400px] rounded-full blur-[140px] opacity-10"
          style={{ background: 'radial-gradient(circle, #00A6FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 left-10 w-[500px] h-[350px] rounded-full blur-[130px] opacity-10"
          style={{ background: 'radial-gradient(circle, #FF6D00 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10 lg:mb-12">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center mb-3">
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              WHY CHOOSE TARAJ GLOBAL • ENTERPRISE ADVANTAGE
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-3 uppercase"
          >
            <span>Why Choose Taraj Global for </span>
            <span className="inline-block bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent py-1 sm:py-1.5">
              Account-Based Marketing?
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.12)}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            We merge surgical account targeting, multi-stakeholder organizational mapping, and DemandFlow Bridge telemetry to deliver qualified enterprise pipeline with verified revenue attribution.
          </motion.p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PILLARS.map((p, idx) => {
            const IconComponent = p.icon
            return (
              <motion.div
                key={p.num}
                {...fadeUp(0.15 + idx * 0.08)}
                className={`relative p-6 rounded-2xl border border-border bg-surface hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden ${
                  idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-black text-text-secondary opacity-60">
                    {p.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose

