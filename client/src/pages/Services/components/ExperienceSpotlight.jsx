import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, ShieldCheck, Activity, ChevronRight, Layers } from 'lucide-react'

const SPOTLIGHT_SERVICES = [
  {
    id: 'sql',
    num: '01',
    name: 'SQL Services',
    route: '/sql-services',
    tag: 'SALES READY',
    problem: 'Sales teams wasting high-value selling hours qualifying cold, unvetted leads.',
    solution: 'Pre-qualified, budget-validated prospects with active purchase timelines ready for immediate pipeline entry.',
    kpis: ['Direct C-Level Access', 'Budget Confirmed', '100% Replacement SLA'],
    metricValue: '3.4x',
    metricLabel: 'Pipeline Velocity',
    bgImage: '/sql-lead-qualification-journey.jpg',
  },
  {
    id: 'bant',
    num: '02',
    name: 'BANT Lead Generation',
    route: '/bant-lead-generation',
    tag: 'VALIDATED CRITERIA',
    problem: 'Pipeline inflation caused by contacts lacking budget or purchase authorization.',
    solution: 'Rigorous multi-touch BANT validation verifying Budget, Authority, Need, and Timeline prior to handoff.',
    kpis: ['Phone Verified', 'Authority Matrix Checked', 'CRM Auto-Sync'],
    metricValue: '100%',
    metricLabel: 'BANT Compliant',
    bgImage: '/enterprise-audience.jpg',
  },
  {
    id: 'mql',
    num: '03',
    name: 'MQL Services',
    route: '/mql-services',
    tag: 'DEMAND CAPTURE',
    problem: 'Insufficient top-of-funnel momentum to keep sales development reps fully utilized.',
    solution: 'High-volume engaged prospects generated through targeted content, intent signals, and digital touchpoints.',
    kpis: ['Scored by ICP Fit', 'Intent Level Gauged', 'Fast Handoff'],
    metricValue: '4.8x',
    metricLabel: 'Volume Scaling',
    bgImage: '/demandflow-campaigns.png',
  },
  {
    id: 'appointment-setting',
    num: '04',
    name: 'B2B Appointment Setting',
    route: '/b2b-appointment-setting',
    tag: 'CALENDAR BOOKINGS',
    problem: 'Cold outreach fatigue resulting in low reply rates and empty account executive calendars.',
    solution: 'Dedicated sales specialists engage, qualify, and book double-confirmed discovery calls on your calendar.',
    kpis: ['Double-Confirmed Calls', 'Calendar Integration', 'Zero No-Show Policy'],
    metricValue: '85%+',
    metricLabel: 'Show-Up Rate',
    bgImage: '/b2b-appointment-setting-journey.jpg',
  },
  {
    id: 'email-marketing',
    num: '05',
    name: 'B2B Email Marketing',
    route: '/b2b-email-marketing',
    tag: 'OUTREACH SCALE',
    problem: 'Deliverability issues, spam flags, and low engagement from generic automated templates.',
    solution: 'Warm inbox infrastructure, human-crafted copy, and strict CAN-SPAM/GDPR compliance for direct replies.',
    kpis: ['Dedicated IP Warmup', 'Segmented Sequences', 'Spam Score < 0.5%'],
    metricValue: '98%',
    metricLabel: 'Inbox Deliverability',
    bgImage: '/demandflow-campaigns.png',
  },
  {
    id: 'abm',
    num: '06',
    name: 'Account-Based Marketing',
    route: '/abm',
    tag: 'TIER-1 TARGETS',
    problem: 'Scattered marketing spend failing to penetrate strategic enterprise buying committees.',
    solution: 'Hyper-personalized multi-channel orchestration targeting named accounts with tailored content & outreach.',
    kpis: ['Account Penetration', 'Multi-Stakeholder Map', 'Executive Gifting Sync'],
    metricValue: '92%',
    metricLabel: 'Committee Reach',
    bgImage: '/enterprise-audience.jpg',
  },
  {
    id: 'content-syndication',
    num: '07',
    name: 'Content Syndication',
    route: '/content-syndication',
    tag: 'CONTENT AUTHORITY',
    problem: 'High-value whitepapers and assets trapped behind underperforming corporate landing pages.',
    solution: 'Targeted distribution to verified enterprise decision-makers on a cost-per-lead (CPL) performance model.',
    kpis: ['Cost-Per-Lead Model', 'Strict Domain Filtering', 'Asset Opt-In Verification'],
    metricValue: '100%',
    metricLabel: 'Opt-in Verified',
    bgImage: '/demandflow-campaigns.png',
  },
  {
    id: 'demand-gen',
    num: '08',
    name: 'Demand Generation',
    route: '/demand-generation',
    tag: 'FULL FUNNEL',
    problem: 'Disjointed growth efforts producing temporary spikes instead of sustainable inbound momentum.',
    solution: 'Integrated omnichannel architecture building awareness, capturing demand, and routing ready buyers.',
    kpis: ['Multi-Touch Attribution', 'Programmatic Display', 'Inbound Flow Sync'],
    metricValue: '48%',
    metricLabel: 'Conv. Rate Lift',
    bgImage: '/demandflow-campaigns.png',
  },
  {
    id: 'webinars',
    num: '09',
    name: 'Webinar Services',
    route: '/webinar-services',
    tag: 'LIVE EVENTS',
    problem: 'Low attendee turnout and lack of post-webinar qualification to convert participants into revenue.',
    solution: 'End-to-end promotion, targeted attendee acquisition, and post-session qualification workflows.',
    kpis: ['ICP-Only Registrants', 'Reminder Workflows', 'Post-Event SDR Callouts'],
    metricValue: '62%+',
    metricLabel: 'Attendance Ratio',
    bgImage: '/b2b-appointment-setting-journey.jpg',
  },
  {
    id: 'lead-nurturing',
    num: '10',
    name: 'Lead Nurturing',
    route: '/lead-nurturing',
    tag: 'LIFECYCLE OPS',
    problem: 'Leads falling out of the funnel due to long evaluation periods and lack of timely follow-up.',
    solution: 'Dynamic nurture workflows that monitor engagement signals and re-engage prospects at key decision moments.',
    kpis: ['Intent Triggers', 'Educational Drip', 'Stalled Pipeline Revival'],
    metricValue: '2.8x',
    metricLabel: 'Re-activated Leads',
    bgImage: '/enterprise-audience.jpg',
  },
  {
    id: 'list-building',
    num: '11',
    name: 'B2B List Building',
    route: '/b2b-list-building',
    tag: 'CUSTOM DATA',
    problem: 'Stale database records causing wasted outreach, bounce rates, and damaged sender reputation.',
    solution: 'Custom-built, phone-verified prospect lists matching your exact ideal customer profile (ICP).',
    kpis: ['100% Hand-Curated', 'Direct Dials & Mobile', 'Technographic Filters'],
    metricValue: '99%',
    metricLabel: 'Data Precision',
    bgImage: '/enterprise-audience.jpg',
  },
  {
    id: 'cleansing',
    num: '12',
    name: 'Database Cleansing',
    route: '/database-cleansing',
    tag: 'DATA HYGIENE',
    problem: 'Decaying CRM databases with duplicate records, obsolete job titles, and inactive email domains.',
    solution: 'Comprehensive audit, deduplication, email validation, and enrichment to restore CRM data integrity.',
    kpis: ['SMTP Ping Verified', 'Job Title Standardized', 'GDPR/CAN-SPAM Compliant'],
    metricValue: '98%',
    metricLabel: 'Cleaned Accuracy',
    bgImage: '/sql-lead-qualification-journey.jpg',
  },
]

export default function ExperienceSpotlight() {
  const [activeIdx, setActiveIdx] = useState(0)
  const navigate = useNavigate()

  const current = SPOTLIGHT_SERVICES[activeIdx]

  return (
    <section
      id="service-spotlight-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                FOCUSED SOLUTIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              One Growth Problem. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                One Focused Solution.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Explore our complete suite of 12 specialized B2B capabilities designed to eliminate pipeline bottlenecks.
          </p>
        </div>

        {/* 2-COLUMN PRESENTATION WITH INTERACTIVE SELECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ══════════ LEFT COLUMN: 12-SERVICE SELECTOR & ACTIVE DETAILS (5 COLS) ══════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Horizontal Mini-Scroller / Grid for 12 Services */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/40 uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#FF6D00]" />
                  SELECT SERVICE (12 TOTAL)
                </span>
                <span className="text-white font-bold">
                  {current.num} / 12
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {SPOTLIGHT_SERVICES.map((srv, idx) => {
                  const isSelected = activeIdx === idx

                  return (
                    <button
                      key={srv.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`px-2 py-2 rounded-xl text-left border transition-all text-xs font-mono font-bold cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#FF6D00] text-black border-[#FF6D00] shadow-[0_0_12px_rgba(255,109,0,0.5)] scale-[1.03]'
                          : 'bg-white/[0.03] text-white/60 border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] opacity-70">{srv.num}</span>
                      <span className="truncate text-[11px] font-sans font-semibold mt-1">
                        {srv.name.split(' ')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Service Deep Dive Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6D00] uppercase tracking-widest">
                    MODULE {current.num} // {current.tag}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : SPOTLIGHT_SERVICES.length - 1))}
                      className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-xs cursor-pointer"
                      title="Previous"
                    >
                      &larr;
                    </button>
                    <button
                      onClick={() => setActiveIdx((prev) => (prev < SPOTLIGHT_SERVICES.length - 1 ? prev + 1 : 0))}
                      className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-xs cursor-pointer"
                      title="Next"
                    >
                      &rarr;
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  {current.name}
                </h3>

                {/* Problem vs Solution */}
                <div className="mt-6 space-y-4">
                  <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                      THE BOTTLENECK
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {current.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                      OUR ENGINEERED BLUEPRINT
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {current.solution}
                    </p>
                  </div>
                </div>

                {/* CTA Link */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => navigate(current.route)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-white/20 cursor-pointer group"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-xs font-mono text-white/40">
                    SLA PROTECTED
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ══════════ RIGHT COLUMN: HIGH-TECH VISUAL TELEMETRY CARD (7 COLS) ══════════ */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl p-6 sm:p-10 flex flex-col justify-between min-h-[460px] lg:min-h-[520px]"
              >
                {/* Background visual artwork */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out opacity-25"
                  style={{
                    backgroundImage: `url(${current.bgImage})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/85 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,109,0,0.15),transparent_60%)]" />

                {/* Top HUD Telemetry Bar */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-white/70">
                    <Activity className="w-4 h-4 text-[#FF6D00] animate-pulse" />
                    <span>PIPELINE ENGINE: ACTIVE</span>
                  </div>
                  <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80">
                    MODULE {current.num} / 12
                  </span>
                </div>

                {/* Middle Content: Big Metric Spotlight */}
                <div className="relative z-10 my-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6D00]/10 border border-[#FF6D00]/30 text-xs font-mono text-[#FF6D00] uppercase mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>BENCHMARKED IMPACT</span>
                  </div>
                  <div className="text-5xl sm:text-7xl font-black font-mono text-white tracking-tight">
                    {current.metricValue}
                  </div>
                  <div className="text-sm sm:text-base font-mono uppercase tracking-widest text-white/60 mt-1">
                    {current.metricLabel}
                  </div>
                </div>

                {/* Bottom Content: Verified Capabilities Checklist */}
                <div className="relative z-10 pt-6 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block mb-3">
                    DELIVERY ATTRIBUTES & STANDARDS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {current.kpis.map((kpi, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs font-semibold text-white/90"
                      >
                        <CheckCircle className="w-4 h-4 text-[#FF6D00] shrink-0" />
                        <span className="truncate">{kpi}</span>
                      </div>
                    ))}
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
