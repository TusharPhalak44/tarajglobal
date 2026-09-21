import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Sparkles, Target, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react'

const GROWTH_STAGES = [
  {
    stage: 'STAGE 01',
    name: 'CREATE DEMAND',
    tagline: 'Top-of-Funnel Inbound & Intent Capture',
    desc: 'Establish early market presence and capture active in-market accounts researching problems in your domain.',
    color: '#00A6FF',
    icon: Sparkles,
    services: [
      { name: 'Demand Generation', path: '/demand-generation' },
      { name: 'Content Syndication', path: '/content-syndication' },
      { name: 'B2B List Building', path: '/b2b-list-building' },
    ],
    metric: '10M+ Enterprise Reach',
  },
  {
    stage: 'STAGE 02',
    name: 'IGNITE ENGAGEMENT',
    tagline: 'Multi-Touch Outreach & Account Penetration',
    desc: 'Orchestrate 1-on-1 personalized cold email, LinkedIn touchpoints, targeted webinars, and Tier-1 ABM programs.',
    color: '#FF6D00',
    icon: Zap,
    services: [
      { name: 'B2B Email Marketing', path: '/b2b-email-marketing' },
      { name: 'Account-Based Marketing (ABM)', path: '/abm' },
      { name: 'B2B Webinar Services', path: '/webinar-services' },
      { name: 'Lead Nurturing', path: '/lead-nurturing' },
    ],
    metric: '42% Average Open Rate',
  },
  {
    stage: 'STAGE 03',
    name: 'SECURE PIPELINE',
    tagline: 'BANT Qualification & Sales Meetings',
    desc: 'Verify budget authority, need, and project timelines before booking confirmed meetings onto your reps’ calendars.',
    color: '#10B981',
    icon: ShieldCheck,
    services: [
      { name: 'Sales Qualified Leads (SQL)', path: '/sql-services' },
      { name: 'BANT Lead Generation', path: '/bant-lead-generation' },
      { name: 'B2B Appointment Setting', path: '/b2b-appointment-setting' },
      { name: 'Database Cleansing', path: '/database-cleansing' },
    ],
    metric: '98% Confirmed Show Rate',
  },
]

export default function DevGrowthStages() {
  return (
    <section
      id="dev-growth-stages"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <span>FULL-FUNNEL REVENUE ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            How The 12 Services Work Together <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              In A Synchronized Revenue Engine
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            Whether deployed individually or orchestrated as a compound system, our capabilities map directly to the 3 critical phases of pipeline generation.
          </p>
        </div>

        {/* 3 Interconnected Funnel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {GROWTH_STAGES.map((stage, idx) => {
            const Icon = stage.icon

            return (
              <div
                key={stage.stage}
                className="group relative rounded-2xl border border-border/80 bg-surface/70 hover:bg-surface hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 pb-5 border-b border-border/60">
                    <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
                      {stage.stage}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3 className="mt-5 text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary">
                    {stage.name}
                  </h3>

                  <p className="mt-1 font-mono text-[11px] text-text-muted">
                    {stage.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                    {stage.desc}
                  </p>

                  {/* Included Services List */}
                  <div className="mt-6 pt-5 border-t border-border/60 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-2">
                      INCLUDED CAPABILITIES:
                    </span>
                    {stage.services.map((srv) => (
                      <Link
                        key={srv.name}
                        to={srv.path}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-background/60 hover:bg-background border border-border/50 hover:border-primary/40 text-xs font-semibold text-text-primary group-hover:text-text-primary transition-all"
                      >
                        <span>{srv.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-text-muted hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-text-muted text-[10px] uppercase tracking-wider">
                    KEY OUTCOME
                  </span>
                  <span className="font-bold text-primary">
                    {stage.metric}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
