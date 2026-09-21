import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, TrendingUp } from 'lucide-react'

const BOTTLENECKS = [
  {
    id: 'unqualified',
    question: 'Our sales team wastes too much time on unqualified leads with no budget or authority.',
    category: 'Lead Quality & BANT',
    recommendedTitle: 'The Strict Qualification & Sales-Ready Stack',
    recommendedServices: [
      { name: 'BANT Lead Generation', path: '/bant-lead-generation', desc: 'Pre-screens for Budget, Authority, Need, and Timeline' },
      { name: 'Sales Qualified Leads (SQL)', path: '/sql-services', desc: 'Delivers sales-ready prospects with validated purchase intent' },
      { name: 'B2B Appointment Setting', path: '/b2b-appointment-setting', desc: 'Directly schedules vetted meetings on rep calendars' },
    ],
    timeframe: '10–14 Days to First Meetings',
    impact: '98% Confirmed Show Rate · Zero Waste',
  },
  {
    id: 'top-funnel',
    question: 'We lack top-of-funnel brand awareness and in-market buyers researching our software.',
    category: 'Demand & Content Reach',
    recommendedTitle: 'The Omnichannel Demand & Syndication Engine',
    recommendedServices: [
      { name: 'Demand Generation', path: '/demand-generation', desc: 'Builds compound brand authority and market demand' },
      { name: 'Content Syndication', path: '/content-syndication', desc: 'Distributes case studies and whitepapers to verified buyers' },
      { name: 'B2B List Building', path: '/b2b-list-building', desc: 'Builds verified custom contact repositories for outreach' },
    ],
    timeframe: '7–10 Days to First Asset Downloads',
    impact: '10M+ Targeted B2B Readers · 3.4x Velocity',
  },
  {
    id: 'tier1-abm',
    question: 'We need to close large enterprise accounts ($100K+ ACV) with complex buying committees.',
    category: 'Enterprise ABM',
    recommendedTitle: 'The Strategic Account-Based Penetration Stack',
    recommendedServices: [
      { name: 'Account-Based Marketing (ABM)', path: '/abm', desc: 'Surrounds buying committees with customized collateral' },
      { name: 'B2B Email Marketing', path: '/b2b-email-marketing', desc: 'Personalized 1-on-1 executive email cadences' },
      { name: 'B2B Webinar Services', path: '/webinar-services', desc: 'Recruits enterprise decision-makers into private sessions' },
    ],
    timeframe: '14–21 Days for Tier-1 Account Engagement',
    impact: '$120K+ Average Enterprise Deal ACV',
  },
  {
    id: 'crm-hygiene',
    question: 'Our existing CRM has high bounce rates, duplicate records, and obsolete executive contacts.',
    category: 'Data Hygiene & Nurture',
    recommendedTitle: 'The Data Revitalization & Pipeline Revival Stack',
    recommendedServices: [
      { name: 'Database Cleansing', path: '/database-cleansing', desc: 'Scrubs invalid records, updates jobs, and eliminates bounces' },
      { name: 'Lead Nurturing', path: '/lead-nurturing', desc: 'Reactivates stalled pipeline with targeted value sequences' },
      { name: 'B2B List Building', path: '/b2b-list-building', desc: 'Enriches missing direct dials and corporate email fields' },
    ],
    timeframe: '3–5 Days for Complete Database Scrubbing',
    impact: '< 1.5% Bounce Guarantee · 35% Stalled Deal Revival',
  },
]

export default function DevStrategyDiagnostic() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(0)
  const current = BOTTLENECKS[selectedBottleneck]

  return (
    <section
      id="dev-strategy-diagnostic"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden"
      aria-label="Interactive Pipeline Strategy Diagnostic"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>INTERACTIVE STRATEGY DIAGNOSTIC</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            Find Your Optimal Pipeline Strategy <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              In 1 Click
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            Select your most pressing revenue bottleneck below. Our diagnostic engine will calculate the exact service stack and deployment timeline for your team.
          </p>
        </div>

        {/* Diagnostic Layout: Left Selector, Right Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Selectable Bottlenecks */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {BOTTLENECKS.map((b, idx) => {
              const isSelected = selectedBottleneck === idx

              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBottleneck(idx)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface border-primary shadow-lg ring-1 ring-primary/40'
                      : 'bg-surface/50 border-border/80 hover:bg-surface hover:border-primary/40 text-text-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                      BOTTLENECK 0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted bg-border/40 px-2 py-0.5 rounded">
                      {b.category}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed font-semibold ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
                    "{b.question}"
                  </p>
                </button>
              )
            })}
          </div>

          {/* Right Column: Dynamic Recommendation Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-9 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/60">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                        RECOMMENDED ARCHITECTURE
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary">
                        {current.recommendedTitle}
                      </h3>
                    </div>
                    <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Recommended Services List */}
                  <div className="mt-6 space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">
                      RECOMMENDED SOLUTION STACK:
                    </span>
                    {current.recommendedServices.map((srv, i) => (
                      <Link
                        key={srv.name}
                        to={srv.path}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-background/80 hover:bg-background border border-border/60 hover:border-primary/50 transition-all"
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-bold uppercase tracking-wide text-text-primary group-hover:text-primary transition-colors">
                            {srv.name}
                          </div>
                          <p className="text-[11px] text-text-muted mt-0.5">
                            {srv.desc}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-primary shrink-0">
                          <span>View Spec</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Telemetry Footer */}
                <div className="mt-8 pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-background/60 border border-border/50">
                    <span className="font-mono text-[10px] uppercase text-text-muted block mb-0.5">
                      DEPLOYMENT TIMELINE
                    </span>
                    <span className="font-mono text-xs font-bold text-text-primary">
                      {current.timeframe}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <span className="font-mono text-[10px] uppercase text-text-muted block mb-0.5">
                      BENCHMARK OUTCOME
                    </span>
                    <span className="font-mono text-xs font-bold text-primary">
                      {current.impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
