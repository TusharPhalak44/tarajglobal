import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Target,
  TrendingUp,
  Briefcase,
  UserCheck,
  CreditCard,
  Cog,
  BarChart3,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const CAPABILITY_CARDS = [
  {
    id: 'crm',
    title: 'CRM',
    desc: 'Centralize contact records, account hierarchies, communication histories, and buyer relationship touchpoints.',
    icon: Users,
    color: '#00A6FF',
    badge: 'RELATIONSHIPS',
  },
  {
    id: 'lead-management',
    title: 'Lead Management',
    desc: 'Track prospect lifecycles from initial demographic capture and ICP scoring to qualification handoff.',
    icon: Target,
    color: '#00D2FF',
    badge: 'QUALIFICATION',
  },
  {
    id: 'sales-management',
    title: 'Sales Management',
    desc: 'Manage active pipelines, SDR outreach cadence pacing, deal stages, and real-time conversion forecasting.',
    icon: TrendingUp,
    color: '#FF6D00',
    badge: 'PIPELINE VELOCITY',
  },
  {
    id: 'client-management',
    title: 'Client Management',
    desc: 'Coordinate client workspaces, deliverable milestones, communication logs, and SLA quality assurances.',
    icon: Briefcase,
    color: '#72D669',
    badge: 'DELIVERY & SLAS',
  },
  {
    id: 'hrms',
    title: 'HRMS',
    desc: 'Centralize internal employee information, team organizational structures, roles, and administrative workflows.',
    icon: UserCheck,
    color: '#9333EA',
    badge: 'ORGANIZATION',
  },
  {
    id: 'payroll',
    title: 'Payroll',
    desc: 'Manage employee compensation structures, payroll cycles, incentive reconciliations, and compliance tracking.',
    icon: CreditCard,
    color: '#EAB308',
    badge: 'COMPENSATION',
  },
  {
    id: 'operations',
    title: 'Operations',
    desc: 'Orchestrate day-to-day resource distribution, account allocation, cross-department handoffs, and execution.',
    icon: Cog,
    color: '#3B82F6',
    badge: 'WORKFLOW ENGINE',
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    desc: 'Transform operational events and revenue telemetry into actionable business intelligence dashboards.',
    icon: BarChart3,
    color: '#10B981',
    badge: 'BUSINESS INTEL',
  },
]

const WhatIsPlatform = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="overview"
      className="relative py-16 sm:py-20 lg:py-24 bg-surface border-t border-b border-border transition-colors duration-300"
      aria-label="What is DemandFlow Bridge"
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
              Unified Architecture
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-4"
          >
            One Platform.{' '}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              Multiple Business Functions.
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Instead of forcing teams to juggle fragmented software, isolated spreadsheets, and disconnected tools, DemandFlow Bridge unifies every essential business function into a single, synchronized platform.
          </motion.p>
        </div>

        {/* 8 Capability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CAPABILITY_CARDS.map((card, idx) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -5,
                        transition: { duration: 0.22, ease: 'easeOut' },
                      }
                }
                className="group relative p-6 rounded-2xl border border-border bg-background hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
              >
                {/* Subtle top glow accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${card.color}15`,
                        color: card.color,
                        border: `1px solid ${card.color}35`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-surface border border-border text-text-secondary">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-mono text-text-secondary group-hover:text-primary transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Centralized Module</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default WhatIsPlatform
