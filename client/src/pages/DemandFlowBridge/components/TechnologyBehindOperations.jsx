import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Truck,
  Cog,
  BarChart3,
  Cpu,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const WORKFLOW_STEPS = [
  {
    step: '01',
    id: 'lead',
    title: 'Lead',
    subtitle: 'Account Discovery & Intake',
    icon: Target,
    color: '#00A6FF',
    desc: 'Target accounts identified and ingested with verified contact data.',
  },
  {
    step: '02',
    id: 'qualification',
    title: 'Qualification',
    subtitle: 'BANT & ICP Evaluation',
    icon: ShieldCheck,
    color: '#00D2FF',
    desc: 'Rigorous authority, budget, need and timeline qualification scoring.',
  },
  {
    step: '03',
    id: 'sales',
    title: 'Sales',
    subtitle: 'Cadence & Meeting Booking',
    icon: TrendingUp,
    color: '#FF6D00',
    desc: 'Personalized multi-touch outreach generating sales discovery appointments.',
  },
  {
    step: '04',
    id: 'client',
    title: 'Client',
    subtitle: 'Onboarding & Workspace Sync',
    icon: Briefcase,
    color: '#72D669',
    desc: 'Seamless account transition into dedicated client workspaces.',
  },
  {
    step: '05',
    id: 'delivery',
    title: 'Delivery',
    subtitle: 'SLA Execution & Pacing',
    icon: Truck,
    color: '#9333EA',
    desc: 'Guaranteed milestone fulfillment with live campaign pacing controls.',
  },
  {
    step: '06',
    id: 'operations',
    title: 'Operations',
    subtitle: 'Workforce & Capacity Pacing',
    icon: Cog,
    color: '#3B82F6',
    desc: 'SDR pod scheduling, internal resource allocation, and workflow management.',
  },
  {
    step: '07',
    id: 'reporting',
    title: 'Reporting',
    subtitle: 'BI Telemetry & Analytics',
    icon: BarChart3,
    color: '#10B981',
    desc: 'Real-time client telemetry, revenue velocity, and operational insights.',
  },
]

const TechnologyBehindOperations = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)

  // Auto progression every 2.4 seconds
  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length)
    }, 2400)

    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  return (
    <section
      id="technology-workflow"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
      aria-label="The Technology Behind Our Operations"
    >
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-3.5 backdrop-blur-md"
          >
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
              End-to-End Operational Lifecycle
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-4"
          >
            The Technology Behind{' '}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              Our Operations
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl mx-auto font-normal"
          >
            From managing leads and client relationships to coordinating employees, sales activities and operational workflows, DemandFlow Bridge helps Taraj Global manage its day-to-day business through a centralized digital platform.
          </motion.p>
        </div>

        {/* ── DESKTOP HORIZONTAL STEPPER RAIL (Screen >= 1024px) ── */}
        <div className="hidden lg:block relative max-w-6xl mx-auto py-8">
          
          {/* Connecting Track Line */}
          <div className="absolute top-[68px] left-12 right-12 h-[2px] bg-border z-0">
            {/* Moving Dotted Animated Progress Flow */}
            <div
              className="h-full bg-gradient-to-r from-primary via-[#00d2ff] to-cta transition-all duration-500 ease-out"
              style={{
                width: `${(activeStep / (WORKFLOW_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-7 gap-3 relative z-10">
            {WORKFLOW_STEPS.map((item, idx) => {
              const Icon = item.icon
              const isCurrent = activeStep === idx
              const isPassed = activeStep > idx

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Step Node Circle */}
                  <div
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 shadow-md mb-3.5
                      ${
                        isCurrent
                          ? 'border-primary bg-primary text-white scale-110 shadow-lg shadow-primary/30 ring-4 ring-primary/20'
                          : isPassed
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                          : 'border-border bg-surface text-text-secondary group-hover:border-primary/50'
                      }
                    `}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-text-secondary mb-0.5">
                    STEP {item.step}
                  </span>

                  <span
                    className={`text-sm font-bold tracking-tight transition-colors ${
                      isCurrent
                        ? 'text-primary'
                        : 'text-text-primary group-hover:text-primary'
                    }`}
                  >
                    {item.title}
                  </span>

                  <span className="text-[11px] text-text-secondary mt-0.5 line-clamp-2">
                    {item.subtitle}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Step Highlight Card */}
          <div className="mt-10 p-6 rounded-2xl border border-primary/40 bg-surface shadow-xl max-w-2xl mx-auto text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-2 text-xs font-mono font-bold text-primary uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step {WORKFLOW_STEPS[activeStep].step} Operations Sync</span>
            </div>
            <h4 className="text-xl font-black text-text-primary mb-1.5">
              {WORKFLOW_STEPS[activeStep].title} — {WORKFLOW_STEPS[activeStep].subtitle}
            </h4>
            <p className="text-sm text-text-secondary max-w-xl mx-auto">
              {WORKFLOW_STEPS[activeStep].desc}
            </p>
          </div>

        </div>

        {/* ── MOBILE / TABLET VERTICAL STACK (< 1024px) ── */}
        <div className="block lg:hidden space-y-3">
          {WORKFLOW_STEPS.map((item, idx) => {
            const Icon = item.icon
            const isCurrent = activeStep === idx

            return (
              <div
                key={item.id}
                onClick={() => setActiveStep(idx)}
                className={`
                  p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5
                  ${
                    isCurrent
                      ? 'border-primary bg-surface shadow-md ring-1 ring-primary'
                      : 'border-border bg-surface/70'
                  }
                `}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-text-primary">
                      {item.step}. {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-text-secondary">
                      {item.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default TechnologyBehindOperations
