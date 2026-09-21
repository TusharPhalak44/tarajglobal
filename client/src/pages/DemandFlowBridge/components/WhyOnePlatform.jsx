import React from 'react'
import { motion } from 'framer-motion'
import {
  Database,
  Share2,
  Eye,
  TrendingUp,
  Layers,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const VALUE_PILLARS = [
  {
    num: '01',
    title: 'ONE SOURCE OF TRUTH',
    desc: 'Keep essential business information centralized and accessible.',
    icon: Database,
    color: '#00A6FF',
    details: 'Eliminate siloed data between sales, HR, operations, and leadership with unified records.',
  },
  {
    num: '02',
    title: 'CONNECTED WORKFLOWS',
    desc: 'Connect teams and business processes through a unified platform.',
    icon: Share2,
    color: '#00D2FF',
    details: 'Trigger seamless handoffs from lead discovery to qualification, contract signature, and delivery.',
  },
  {
    num: '03',
    title: 'REAL-TIME VISIBILITY',
    desc: 'Get a clearer view of business activities, progress and performance.',
    icon: Eye,
    color: '#FF6D00',
    details: 'Live telemetry across client campaign pacing, employee attendance, and revenue conversion metrics.',
  },
  {
    num: '04',
    title: 'SCALABLE OPERATIONS',
    desc: 'Support growing teams and increasingly complex business operations.',
    icon: TrendingUp,
    color: '#72D669',
    details: 'Architected to handle multi-pod scaling, international time zones, and expanding service suites.',
  },
]

const WhyOnePlatform = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="why-one-platform"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
      aria-label="Why One Platform"
    >
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-3.5 backdrop-blur-md"
          >
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
              The Unified Advantage
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-4"
          >
            Less Switching.{' '}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              More Control.
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Disjointed software breeds confusion, lost leads, and administrative friction. DemandFlow Bridge provides the structural foundation for consistent execution.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon

            return (
              <motion.div
                key={pillar.num}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -6,
                        transition: { duration: 0.22, ease: 'easeOut' },
                      }
                }
                className="group relative p-6 sm:p-7 rounded-2xl border border-border bg-surface hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
              >
                {/* Top glow stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold tracking-widest text-text-secondary">
                      {pillar.num}
                    </span>

                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${pillar.color}15`,
                        color: pillar.color,
                        border: `1px solid ${pillar.color}35`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-black tracking-tight text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-text-primary leading-snug mb-2">
                    {pillar.desc}
                  </p>

                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {pillar.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-mono text-text-secondary group-hover:text-primary transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Platform Standard</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default WhyOnePlatform
