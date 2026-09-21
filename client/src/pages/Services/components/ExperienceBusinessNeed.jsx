import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, HelpCircle, Check, ArrowUpRight } from 'lucide-react'

const BUSINESS_NEEDS = [
  {
    id: 'more-leads',
    question: 'Need More Leads?',
    tag: 'PIPELINE SCALING',
    service: 'SQL & BANT Lead Generation',
    route: '/sql-services',
    desc: 'When your sales reps are spending more time researching than closing, we step in with pre-qualified, sales-ready leads that match your target accounts and have validated buying intent.',
    deliverables: ['Pre-vetted Budget & Timeline', '100% Replacement Guarantee', 'CRM Integration'],
  },
  {
    id: 'better-data',
    question: 'Need Better Data?',
    tag: 'DATA HYGIENE',
    service: 'B2B List Building & Database Cleansing',
    route: '/b2b-list-building',
    desc: 'High bounce rates and outdated contacts poison outbound campaigns. We build custom-curated lists and cleanse legacy CRM records to give your team pristine contact intelligence.',
    deliverables: ['98%+ Deliverability SLA', 'Triple-Verified Contact Attributes', 'GDPR & CAN-SPAM Compliance'],
  },
  {
    id: 'more-meetings',
    question: 'Need More Meetings?',
    tag: 'CALENDAR ACCELERATION',
    service: 'B2B Appointment Setting',
    route: '/b2b-appointment-setting',
    desc: 'Bypass gatekeepers and secure confirmed discovery calls with key executives. We handle prospecting, qualification, and scheduling directly into your reps’ calendars.',
    deliverables: ['Double-Confirmed Calls', 'Zero No-Show Guarantee', 'Direct Calendar Sync'],
  },
  {
    id: 'account-engagement',
    question: 'Need Account Engagement?',
    tag: 'ENTERPRISE ABM',
    service: 'Account-Based Marketing (ABM)',
    route: '/abm',
    desc: 'Penetrate strategic enterprise logos with hyper-personalized multi-touch campaigns designed to align complex buying committees around your value proposition.',
    deliverables: ['Multi-Stakeholder Mapping', 'Tier-1 Content Customization', 'High-Touch Cadences'],
  },
  {
    id: 'better-outreach',
    question: 'Need Better Outreach?',
    tag: 'OUTBOUND REACH',
    service: 'B2B Email Marketing',
    route: '/b2b-email-marketing',
    desc: 'Upgrade from generic blasts to inbox-landing cold outreach. Warm infrastructure, persuasive copy, and targeted segmentation deliver high reply rates from actual buyers.',
    deliverables: ['Dedicated Inboxes & IP Warming', 'Human-Written Copywriting', 'Real-Time Telemetry'],
  },
  {
    id: 'more-pipeline',
    question: 'Need More Pipeline?',
    tag: 'OMNICHANNEL REVENUE',
    service: 'Demand Generation & Content Syndication',
    route: '/demand-generation',
    desc: 'Create sustainable pipeline flow by syndicating high-value assets to in-market buyers and orchestrating multi-channel demand capture across digital channels.',
    deliverables: ['Cost-Per-Lead (CPL) Model', 'Omnichannel Inbound Sync', 'Multi-Touch Attribution'],
  },
]

export default function ExperienceBusinessNeed() {
  const [activeId, setActiveId] = useState(BUSINESS_NEEDS[0].id)
  const navigate = useNavigate()

  const current = BUSINESS_NEEDS.find((b) => b.id === activeId) || BUSINESS_NEEDS[0]

  return (
    <section
      id="business-need-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                PAIN-POINT MAPPING
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Services Matched To <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Your Immediate Need
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Click any pain point below to instantly preview the exact service framework designed to resolve it.
          </p>
        </div>

        {/* ══════════ SPLIT SCREEN MENU ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 6 Questions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {BUSINESS_NEEDS.map((item, idx) => {
              const isActive = activeId === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`group w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white/[0.08] border-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.2)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isActive ? 'text-[#FF6D00]' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold tracking-tight uppercase transition-colors ${
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive
                        ? 'text-[#FF6D00] translate-x-1 opacity-100'
                        : 'text-white/30 opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Right Column: Dynamic Recommendation Panel (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl"
              >
                {/* Subtle radial glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6D00]/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="font-mono text-xs text-[#FF6D00] uppercase tracking-widest font-bold">
                      {current.tag}
                    </span>
                    <span className="text-[11px] font-mono text-white/40 uppercase">
                      MATCHED BLUEPRINT
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-snug">
                    {current.service}
                  </h3>

                  <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed font-normal">
                    {current.desc}
                  </p>

                  {/* Core Deliverables list */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                      KEY DELIVERABLES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.deliverables.map((del, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/90">
                          <Check className="w-4 h-4 text-[#FF6D00] shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA bar */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => navigate(current.route)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-white/20 cursor-pointer group"
                  >
                    <span>Deploy This Solution</span>
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <span className="text-xs font-mono text-white/40">
                    DIRECT ENGAGEMENT
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
