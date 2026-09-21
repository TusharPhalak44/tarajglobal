import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Shield, Building2, Globe2, Check, Users, ArrowRight } from 'lucide-react'

const AUDIENCE_SECTORS = [
  {
    id: 'saas',
    name: 'B2B SaaS Companies',
    tag: 'HIGH-VELOCITY TECH',
    icon: Cpu,
    headline: 'Accelerate product evaluation cycles and demo conversions with high-intent technical buyers.',
    personas: ['VP of Engineering', 'Chief Technology Officer (CTO)', 'VP of Product', 'Head of Revenue Operations'],
    painPoints: ['Long freemium-to-paid cycles', 'Low show-up rates for live demos', 'Difficulty penetrating technical buying committees'],
    benchmark: '4.2x Demo Booking Lift',
  },
  {
    id: 'cybersecurity',
    name: 'Cloud & Cybersecurity',
    tag: 'STRICT COMPLIANCE',
    icon: Shield,
    headline: 'Engage CISOs and IT Directors through consultative, compliance-verified outreach.',
    personas: ['Chief Information Security Officer (CISO)', 'VP of Infrastructure', 'Director of SecOps', 'IT Compliance Officer'],
    painPoints: ['High spam filtering barriers', 'Strict procurement gates', 'Skeptical security buyers rejecting generic pitches'],
    benchmark: '100% Verified Authority',
  },
  {
    id: 'fintech',
    name: 'FinTech & Capital Systems',
    tag: 'ENTERPRISE ACV',
    icon: Building2,
    headline: 'Connect with financial and enterprise leadership managing high-value transformation budgets.',
    personas: ['Chief Financial Officer (CFO)', 'VP of Treasury', 'Head of Enterprise Risk', 'Managing Director of Systems'],
    painPoints: ['Complex multi-stakeholder evaluations', '12+ month procurement cycles', 'Budget validation ambiguity'],
    benchmark: '$150K+ Average ACV',
  },
  {
    id: 'telecom',
    name: 'Telecom & IT Managed Services',
    tag: 'NETWORK INFRASTRUCTURE',
    icon: Globe2,
    headline: 'Connect carriers and IT system integrators directly with enterprise procurement heads.',
    personas: ['VP of Global Telecom', 'Head of Enterprise Infrastructure', 'Director of IT Procurement', 'Solutions Architect'],
    painPoints: ['Commoditized service competition', 'Difficulty identifying active RFP windows', 'Slow response times from cold outreach'],
    benchmark: '32% Show-to-Proposal Rate',
  },
]

export default function DevAudiences() {
  const [activeTab, setActiveTab] = useState(0)
  const current = AUDIENCE_SECTORS[activeTab]

  return (
    <section
      id="dev-audiences"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden"
      aria-label="Target Audiences and Buyer Committees"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <Users className="w-3.5 h-3.5" />
            <span>WHO WE ACCELERATE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            Engineered For High-Value B2B Verticals <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              & Complex Buying Committees
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            We understand the specialized vocabulary, compliance hurdles, and committee hierarchies of technical enterprise buyers.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {AUDIENCE_SECTORS.map((sec, idx) => {
            const Icon = sec.icon
            const isActive = activeTab === idx

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-surface border border-border/80 text-text-secondary hover:text-text-primary hover:border-primary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sec.name}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Sector Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-10 shadow-xl max-w-5xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block mb-1">
                  [{current.tag}]
                </span>
                <h3 className="text-xl sm:text-3xl font-black uppercase text-text-primary tracking-tight">
                  {current.name}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex flex-col sm:items-end">
                <span className="font-mono text-[10px] text-text-muted uppercase">VERIFIED BENCHMARK</span>
                <span className="font-mono text-base font-bold text-primary">{current.benchmark}</span>
              </div>
            </div>

            <p className="mt-6 text-sm sm:text-base text-text-secondary leading-relaxed font-normal max-w-3xl">
              {current.headline}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-border/60">
              {/* Target Buying Committee Stakeholders */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-3 font-bold">
                  PRIMARY TARGET DECISION-MAKERS:
                </span>
                <div className="space-y-2">
                  {current.personas.map((role, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-text-primary p-2.5 rounded-lg bg-background/70 border border-border/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolved Bottlenecks */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-3 font-bold">
                  RESOLVED PIPELINE BOTTLENECKS:
                </span>
                <div className="space-y-2">
                  {current.painPoints.map((pain, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-text-secondary p-2.5 rounded-lg bg-background/70 border border-border/50">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
