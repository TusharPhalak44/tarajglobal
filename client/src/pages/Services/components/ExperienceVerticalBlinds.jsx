import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ChevronRight } from 'lucide-react'

const BLIND_SERVICES = [
  {
    num: '01',
    name: 'Lead Generation',
    subtitle: 'High-Intent Pipeline Acceleration',
    desc: 'Multi-channel B2B qualification frameworks delivering sales-ready leads directly to your SDR team with strict verification SLAs.',
    route: '/sql-services',
    image: '/sql-lead-qualification-journey.jpg',
    tag: 'PIPELINE',
    kpi: '3.4x Velocity',
  },
  {
    num: '02',
    name: 'Demand Generation',
    subtitle: 'Omnichannel Buyer Capture',
    desc: 'Transform passive market prospects into active buyers through strategic content syndication, digital touchpoints, and category authority.',
    route: '/demand-generation',
    image: '/demandflow-campaigns.png',
    tag: 'INBOUND',
    kpi: '48% Conv. Lift',
  },
  {
    num: '03',
    name: 'Account-Based Marketing',
    subtitle: 'Strategic Tier-1 Penetration',
    desc: 'Precision account-level campaigns tailored for complex buying committees, navigating stakeholders with customized messaging.',
    route: '/abm',
    image: '/enterprise-audience.jpg',
    tag: 'TIER-1 LOGOS',
    kpi: '92% Committee Reach',
  },
  {
    num: '04',
    name: 'Email Marketing',
    subtitle: 'Precision Inbox Authority',
    desc: 'High-deliverability, hyper-personalized email campaigns that initiate meaningful dialogues with hard-to-reach senior leadership.',
    route: '/b2b-email-marketing',
    image: '/demandflow-campaigns.png',
    tag: 'OUTREACH',
    kpi: '98% Deliverability',
  },
  {
    num: '05',
    name: 'Appointment Setting',
    subtitle: 'Direct Sales Calendar Access',
    desc: 'Eliminate cold outreach drag. Pre-qualified, double-confirmed meetings with active decision-makers placed right onto your calendar.',
    route: '/b2b-appointment-setting',
    image: '/b2b-appointment-setting-journey.jpg',
    tag: 'MEETINGS',
    kpi: '85%+ Show-up',
  },
  {
    num: '06',
    name: 'Data Solutions',
    subtitle: 'Enterprise-Grade Intelligence',
    desc: 'Custom list building, CRM deduplication, and phone-verified contact enrichment to ensure your outbound never hits dead ends.',
    route: '/b2b-list-building',
    image: '/enterprise-audience.jpg',
    tag: 'INTELLIGENCE',
    kpi: '99% Accuracy',
  },
]

export default function ExperienceVerticalBlinds() {
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()

  return (
    <section
      id="vertical-blinds-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                CORE ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Solutions Built Around <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Your Growth Goals
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Hover over each vertical solution panel to explore core mechanisms, execution KPIs, and direct integration paths.
          </p>
        </div>

        {/* ════════════ DESKTOP: FULL-HEIGHT VERTICAL BLINDS ════════════ */}
        <div className="hidden lg:flex h-[620px] w-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
          {BLIND_SERVICES.map((srv, idx) => {
            const isActive = activeIndex === idx

            return (
              <div
                key={srv.num}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => navigate(srv.route)}
                style={{
                  flex: isActive ? '3.8' : '1',
                  transition: 'flex 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                className={`relative h-full overflow-hidden border-r border-white/10 last:border-r-0 cursor-pointer group select-none`}
              >
                {/* Background Image Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${srv.image})`,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    opacity: isActive ? 0.35 : 0.08,
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/80 to-[#05070B]/40" />

                {/* Vertical Orange Line for Active State */}
                {isActive && (
                  <motion.div
                    layoutId="activeBlindBar"
                    className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#FF6D00] shadow-[0_0_12px_rgba(255,109,0,0.8)] z-20"
                  />
                )}

                {/* COLLAPSED STATE CONTENT (Rotated Vertical Label) */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col justify-between items-center py-10 px-2 z-10">
                    <span className="font-mono text-xs font-black text-white/40 group-hover:text-[#FF6D00] transition-colors">
                      {srv.num}
                    </span>
                    <div className="rotate-[-90deg] whitespace-nowrap text-xs font-mono font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                      {srv.name}
                    </div>
                    <span className="font-mono text-[9px] text-white/30 tracking-widest">
                      [{srv.tag}]
                    </span>
                  </div>
                )}

                {/* EXPANDED STATE CONTENT */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="absolute inset-0 p-10 flex flex-col justify-between z-10"
                  >
                    {/* Top Bar inside panel */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl font-black text-[#FF6D00]">
                          {srv.num}
                        </span>
                        <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-widest text-white/70">
                          {srv.tag}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-[#FF6D00] group-hover:border-[#FF6D00] transition-all">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Bottom Details inside panel */}
                    <div className="space-y-4 max-w-md">
                      <div>
                        <span className="text-xs font-mono uppercase text-[#FF6D00] tracking-wider font-semibold block mb-1">
                          {srv.subtitle}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                          {srv.name}
                        </h3>
                      </div>

                      <p className="text-sm text-white/75 leading-relaxed font-normal">
                        {srv.desc}
                      </p>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="font-mono text-xs text-white/50">
                          METRIC SLA: <span className="text-white font-bold">{srv.kpi}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FF6D00] group-hover:translate-x-1 transition-transform">
                          <span>Explore Solution</span>
                          <span>&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* ════════════ MOBILE / TABLET: SMOOTH ACCORDION ════════════ */}
        <div className="lg:hidden space-y-3">
          {BLIND_SERVICES.map((srv, idx) => {
            const isOpen = activeIndex === idx

            return (
              <div
                key={srv.num}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-black text-[#FF6D00]">
                      {srv.num}
                    </span>
                    <div>
                      <h4 className="text-base font-bold uppercase text-white tracking-wide">
                        {srv.name}
                      </h4>
                      <span className="text-[10px] font-mono text-white/40 uppercase">
                        [{srv.tag}]
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
                      isOpen ? 'rotate-90 text-[#FF6D00]' : ''
                    }`}
                  />
                </button>

                {/* Accordion Expandable Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-5 pb-5 pt-2 border-t border-white/5"
                    >
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                        {srv.desc}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-[11px] font-mono text-white/50">
                          METRIC: <strong className="text-white">{srv.kpi}</strong>
                        </span>
                        <button
                          onClick={() => navigate(srv.route)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#FF6D00] hover:underline"
                        >
                          <span>Go To Service</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
