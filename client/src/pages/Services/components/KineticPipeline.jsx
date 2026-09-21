import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Search, Mail, Calendar, Check, Sparkles } from 'lucide-react'

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'DEFINE ICP & TAM',
    subtitle: 'Account Discovery',
    desc: 'Align on firmographics, technographic signals, and executive title hierarchy before any outreach initiates.',
    icon: Target,
    metric: '99.8% Data Accuracy SLA',
    deliverable: 'Approved Buyer Matrix',
  },
  {
    step: '02',
    title: 'VALIDATE INTENT',
    subtitle: 'Signal Telemetry',
    desc: 'Filter accounts demonstrating active third-party research triggers and acute solution requirements.',
    icon: Search,
    metric: 'Zero-Waste Outbound',
    deliverable: 'High-Intent Target Pool',
  },
  {
    step: '03',
    title: 'MULTI-TOUCH CADENCE',
    subtitle: 'Omnichannel Engagement',
    desc: 'Dedicated warm secondary domains, personalized 1-on-1 copy, and social touches activate concurrently.',
    icon: Mail,
    metric: '42% Average Open Rate',
    deliverable: 'Synchronized Touches',
  },
  {
    step: '04',
    title: 'SECURED MEETING',
    subtitle: 'Sales Discovery Call',
    desc: 'Direct calendar confirmation with full pre-call dossier delivered to your account executive before the call.',
    icon: Calendar,
    metric: '98% Confirmed Show Rate',
    deliverable: 'Confirmed AE Calendar Invite',
  },
]

export default function KineticPipeline() {
  const [activeStep, setActiveStep] = useState(2)

  return (
    <section
      id="kinetic-pipeline"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden select-none"
      aria-label="The 4-Step Connected Pipeline"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPERATIONAL REVENUE PIPELINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            How An Account Moves From <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Raw Signal To Confirmed Meeting
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            A linear, high-velocity progression designed to eliminate SDR friction and accelerate deal close rates.
          </p>
        </div>

        {/* 4 Connected Pipeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PIPELINE_STEPS.map((s, idx) => {
            const Icon = s.icon
            const isActive = activeStep === idx

            return (
              <motion.div
                key={s.step}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveStep(idx)}
                className={`group relative rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-surface border-primary shadow-xl ring-1 ring-primary/40'
                    : 'bg-surface/60 border-border/80 hover:bg-surface hover:border-primary/40 shadow-sm'
                }`}
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      PHASE {s.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-text-primary">
                    {s.title}
                  </h3>

                  <p className="font-mono text-[11px] text-text-muted mt-0.5 mb-3">
                    {s.subtitle}
                  </p>

                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>

                {/* Metric Footer */}
                <div className="mt-6 pt-4 border-t border-border/60 font-mono text-[11px]">
                  <div className="text-text-muted uppercase text-[10px] block mb-0.5">
                    OUTPUT DELIVERABLE:
                  </div>
                  <div className="font-bold text-text-primary">
                    {s.deliverable}
                  </div>
                  <div className="mt-2 text-primary font-bold text-[10px]">
                    ● {s.metric}
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
