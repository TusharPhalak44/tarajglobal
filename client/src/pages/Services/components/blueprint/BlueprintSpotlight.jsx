import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Layers, CheckCircle } from 'lucide-react'

const SPOTLIGHT_ITEMS = [
  {
    num: '01',
    name: 'B2B Lead Generation',
    route: '/sql-services',
    desc: 'Identify the right companies and decision-makers with targeted B2B prospecting.',
    image: '/sql-lead-qualification-journey.jpg',
  },
  {
    num: '02',
    name: 'BANT Lead Generation',
    route: '/bant-lead-generation',
    desc: 'Pre-qualify prospects based on verified Budget, Authority, Need, and purchase Timeline.',
    image: '/enterprise-audience.jpg',
  },
  {
    num: '03',
    name: 'MQL Services',
    route: '/mql-services',
    desc: 'Capture high-volume marketing-qualified leads primed for SDR pipeline acceleration.',
    image: '/demandflow-campaigns.png',
  },
  {
    num: '04',
    name: 'B2B Appointment Setting',
    route: '/b2b-appointment-setting',
    desc: 'Pre-qualified, double-confirmed meetings placed directly onto your sales reps’ calendars.',
    image: '/b2b-appointment-setting-journey.jpg',
  },
  {
    num: '05',
    name: 'B2B Email Marketing',
    route: '/b2b-email-marketing',
    desc: 'Warm inbox infrastructure and personalized cold email sequences that land in priority inboxes.',
    image: '/demandflow-qualification.png',
  },
  {
    num: '06',
    name: 'Account-Based Marketing',
    route: '/abm',
    desc: 'Tailored 1:1 and 1:few multi-channel outreach penetrating named strategic enterprise logos.',
    image: '/enterprise-audience.jpg',
  },
  {
    num: '07',
    name: 'Webinar Services',
    route: '/webinar-services',
    desc: 'End-to-end promotion, registrant acquisition, and post-event attendee qualification callouts.',
    image: '/b2b-appointment-setting-journey.jpg',
  },
  {
    num: '08',
    name: 'Lead Nurturing',
    route: '/lead-nurturing',
    desc: 'Dynamic educational cadences that educate delayed opportunities and revive stalled pipeline.',
    image: '/demandflow-campaigns.png',
  },
  {
    num: '09',
    name: 'Content Syndication',
    route: '/content-syndication',
    desc: 'Targeted distribution of whitepapers and case studies to verified buyers on a CPL basis.',
    image: '/demandflow-campaigns.png',
  },
  {
    num: '10',
    name: 'B2B List Building',
    route: '/b2b-list-building',
    desc: 'Hand-curated, phone-verified prospect databases matching your exact ideal customer profile.',
    image: '/careers-hero-team.jpg',
  },
  {
    num: '11',
    name: 'Database Cleansing',
    route: '/database-cleansing',
    desc: 'CRM deduplication, email validation, and job title enrichment to restore data hygiene.',
    image: '/sql-lead-qualification-journey.jpg',
  },
  {
    num: '12',
    name: 'Demand Generation',
    route: '/demand-generation',
    desc: 'Omnichannel demand capture architecture driving continuous inbound opportunities.',
    image: '/demandflow-campaigns.png',
  },
]

const PROCESS_STEPS = ['Identify', 'Research', 'Connect', 'Convert']

export default function BlueprintSpotlight() {
  const navigate = useNavigate()
  const [activeIdx, setActiveIdx] = useState(0)

  const current = SPOTLIGHT_ITEMS[activeIdx]

  return (
    <section
      id="spotlight-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                SERVICE SPOTLIGHT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              One Targeted Need. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                One Focused Solution.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Click through our 12 specialized capabilities below to preview tailored B2B blueprints.
          </p>
        </div>

        {/* 3-COLUMN SPOTLIGHT ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ══════════ LEFT: Active Service Spotlight Info (4 cols) ══════════ */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6D00] font-bold">
                      MODULE {current.num} / 12
                    </span>
                    <span className="text-xs font-mono text-white/40">SLA GUARANTEED</span>
                  </div>

                  {/* Large Number */}
                  <div className="text-6xl sm:text-7xl font-black font-mono text-[#FF6D00] mt-6">
                    {current.num}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2 leading-tight">
                    {current.name}
                  </h3>

                  {/* Short SEO Description */}
                  <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                    {current.desc}
                  </p>
                </div>

                {/* Primary CTA */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => navigate(current.route)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6D00] hover:bg-[#FF8A00] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[#FF6D00]/30 cursor-pointer group"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ══════════ CENTER: Vertical 12-Service Navigation (4 cols) ══════════ */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 sm:p-5 shadow-xl max-h-[480px] overflow-y-auto no-scrollbar space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 px-3 py-2 border-b border-white/10 mb-2 flex items-center justify-between">
              <span>SELECT SERVICE</span>
              <span className="text-[#FF6D00]">12 AVAILABLE</span>
            </div>

            {SPOTLIGHT_ITEMS.map((item, idx) => {
              const isActive = activeIdx === idx

              return (
                <button
                  key={item.num}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full p-3 rounded-xl text-left border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-white/10 border-[#FF6D00] text-white shadow-md'
                      : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isActive ? 'text-[#FF6D00]' : 'text-white/30 group-hover:text-white/60'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide truncate">
                      {item.name}
                    </span>
                  </div>

                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive ? 'bg-[#FF6D00] shadow-[0_0_8px_#FF6D00]' : 'bg-transparent'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* ══════════ RIGHT: Service Visual with 4-Step Process Overlay (4 cols) ══════════ */}
          <div className="lg:col-span-4">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${current.image})` }}
                />
              </AnimatePresence>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent" />

              {/* Overlaid Process Badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-1 p-2 rounded-2xl bg-[#05070B]/70 backdrop-blur-md border border-white/10">
                {PROCESS_STEPS.map((step, i) => (
                  <div
                    key={step}
                    className="flex-1 text-center py-1.5 rounded-lg bg-white/5 text-[9px] font-mono uppercase tracking-wider text-white/80 font-bold border border-white/5"
                  >
                    {step}
                  </div>
                ))}
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#05070B]/85 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-mono text-[#FF6D00] uppercase font-bold tracking-wider">
                  ACTIVE PREVIEW
                </div>
                <div className="text-sm font-bold uppercase text-white mt-0.5">
                  {current.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
