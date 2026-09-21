import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react'

const NEEDS = [
  {
    id: 'leads',
    question: 'Need More Leads?',
    service: 'B2B Lead Generation',
    route: '/sql-services',
    desc: 'Identify and engage in-market decision-makers with confirmed budgets and active buying cycles.',
    deliverables: ['Pre-vetted Budget & Timeline', '100% Replacement Guarantee', 'CRM Integration'],
  },
  {
    id: 'data',
    question: 'Need Better Data?',
    service: 'B2B List Building & Cleansing',
    route: '/b2b-list-building',
    desc: 'Cleanse legacy CRM records and build net-new custom prospect lists verified via SMTP handshakes.',
    deliverables: ['98%+ Deliverability SLA', 'Triple-Verified Contact Attributes', 'Direct Dials Included'],
  },
  {
    id: 'meetings',
    question: 'Need More Meetings?',
    service: 'B2B Appointment Setting',
    route: '/b2b-appointment-setting',
    desc: 'Connect your sales team with relevant decision-makers through targeted, double-confirmed appointments.',
    deliverables: ['Double-Confirmed Calls', 'Zero No-Show Guarantee', 'Direct Calendar Sync'],
  },
  {
    id: 'outreach',
    question: 'Need Stronger Outreach?',
    service: 'B2B Email Marketing',
    route: '/b2b-email-marketing',
    desc: 'Upgrade from generic blasts to inbox-landing cold outreach crafted with human copywriting.',
    deliverables: ['Dedicated Inboxes & IP Warming', 'Human-Written Copywriting', 'Spam Score < 0.5%'],
  },
  {
    id: 'pipeline',
    question: 'Need More Pipeline?',
    service: 'Demand Generation',
    route: '/demand-generation',
    desc: 'Syndicate high-value assets and capture omnichannel buyer interest on a performance CPL model.',
    deliverables: ['Cost-Per-Lead (CPL) Model', 'Omnichannel Inbound Sync', 'Multi-Touch Attribution'],
  },
]

export default function BlueprintBusinessNeeds() {
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState('meetings')

  const current = NEEDS.find((n) => n.id === activeId) || NEEDS[2]

  return (
    <section
      id="business-needs-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                FIND YOUR SOLUTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Choose What Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Business Needs Next.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Tell us what you're looking for, and we'll help you find the right service.
          </p>
        </div>

        {/* ══════════ SPLIT LAYOUT: Horizontal Question Selector & Elevated Active Panel ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 5 Questions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {NEEDS.map((item, idx) => {
              const isActive = activeId === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`group w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white/[0.08] border-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.2)] scale-[1.01]'
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

          {/* Right Column: Elevated Active Solution Panel (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-3xl border border-[#FF6D00]/50 bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-[#FF6D00]/10"
              >
                {/* Radial glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6D00]/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs text-[#FF6D00] uppercase tracking-widest font-bold">
                      {current.question}
                    </span>
                    <span className="text-[11px] font-mono text-white/40 uppercase">
                      MATCHED BLUEPRINT
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-snug">
                    {current.service}
                  </h3>

                  <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed font-normal">
                    {current.desc}
                  </p>

                  {/* Key Deliverables list */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                      KEY DELIVERABLES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.deliverables.map((del, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-[#FF6D00] shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => navigate(current.route)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6D00] hover:bg-[#FF8A00] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[#FF6D00]/30 cursor-pointer group"
                  >
                    <span>View Service</span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
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
