import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Target, Zap, Users, Calendar, HeartHandshake, Database } from 'lucide-react'

const OBJECTIVES = [
  {
    id: 'leads',
    label: 'Generate Leads',
    icon: Target,
    tagline: 'Fuel your sales pipeline with verified high-intent buyers',
    summary:
      'We combine programmatic intent verification, multi-touch validation, and custom ICP scoring to deliver sales-ready leads directly into your CRM.',
    services: [
      { name: 'SQL Services', route: '/sql-services', badge: 'Sales Ready', desc: 'Direct access to prospect accounts with active buying cycles.' },
      { name: 'BANT Lead Generation', route: '/bant-lead-generation', badge: 'Validated', desc: 'Budget, Authority, Need, and Timeline validated prospects.' },
      { name: 'MQL Services', route: '/mql-services', badge: 'High Volume', desc: 'High-volume engaged prospects primed for SDR acceleration.' },
    ],
    metric: '3.4x',
    metricLabel: 'Average Pipeline Velocity Increase',
    highlight: 'Strict 100% replacement SLA on non-responsive contacts',
  },
  {
    id: 'demand',
    label: 'Create Demand',
    icon: Zap,
    tagline: 'Build category leadership and ignite organic market pull',
    summary:
      'Multi-channel awareness and content syndication programs engineered to turn passive decision-makers into active in-market demand.',
    services: [
      { name: 'Demand Generation', route: '/demand-generation', badge: 'Omnichannel', desc: 'Multi-touch demand capture across digital channels.' },
      { name: 'Content Syndication', route: '/content-syndication', badge: 'Targeted Reach', desc: 'Distribute whitepapers & case studies to targeted buying groups.' },
      { name: 'Webinar Services', route: '/webinar-services', badge: 'Live Engagement', desc: 'End-to-end registrant acquisition and post-event qualification.' },
    ],
    metric: '48%',
    metricLabel: 'Higher MQL-to-SQL Conversion Rate',
    highlight: 'Guaranteed downloads & verified registrant attendance',
  },
  {
    id: 'decision-makers',
    label: 'Reach Decision-Makers',
    icon: Users,
    tagline: 'Penetrate hard-to-reach enterprise buying committees',
    summary:
      'Hyper-personalized 1:1 and 1:few account-based campaigns that breach gatekeepers and engage true C-suite and VP-level decision-makers.',
    services: [
      { name: 'Account-Based Marketing', route: '/abm', badge: 'Tier-1 Focus', desc: 'Tailored multi-touch outreach for strategic priority logos.' },
      { name: 'B2B Appointment Setting', route: '/b2b-appointment-setting', badge: 'Direct Access', desc: 'Pre-qualified calendar bookings with key budget holders.' },
      { name: 'B2B Email Marketing', route: '/b2b-email-marketing', badge: 'Inbox Authority', desc: 'Strictly compliant, human-written cold email campaigns.' },
    ],
    metric: '92%',
    metricLabel: 'Decision-Maker Reach Accuracy',
    highlight: 'Direct dial and corporate email verification on all contacts',
  },
  {
    id: 'meetings',
    label: 'Book Meetings',
    icon: Calendar,
    tagline: 'Fill your sales reps’ calendars with confirmed buyer conversations',
    summary:
      'Eliminate cold outreach friction. Our sales development specialists qualify prospect pain points and book double-confirmed discovery calls.',
    services: [
      { name: 'B2B Appointment Setting', route: '/b2b-appointment-setting', badge: 'Confirmed Meetings', desc: 'Double-confirmed discovery calls on your sales calendar.' },
      { name: 'SQL Services', route: '/sql-services', badge: 'Budget Qualified', desc: 'Prospects actively shopping solutions in your exact space.' },
    ],
    metric: '85%+',
    metricLabel: 'Average Discovery Call Show-Up Rate',
    highlight: 'Calendar invites synched directly with your reps via Calendly/ChiliPiper',
  },
  {
    id: 'nurture',
    label: 'Nurture Prospects',
    icon: HeartHandshake,
    tagline: 'Retain interest and educate accounts across long deal cycles',
    summary:
      'Convert cold and stalled pipeline accounts with contextual drip sequences, educational content drops, and timely trigger-based outreach.',
    services: [
      { name: 'Lead Nurturing', route: '/lead-nurturing', badge: 'Lifecycle', desc: 'Automated + human-assisted mid-funnel nurture workflows.' },
      { name: 'Content Syndication', route: '/content-syndication', badge: 'Education', desc: 'Continuous thought leadership touchpoints for buying committees.' },
    ],
    metric: '2.8x',
    metricLabel: 'Re-activated Pipeline Revenue',
    highlight: 'Behavior-triggered lead alerts so reps strike when interest peaks',
  },
  {
    id: 'data',
    label: 'Improve Data Quality',
    icon: Database,
    tagline: 'Clean, enrich, and build precision-targeted enterprise databases',
    summary:
      'Prevent pipeline decay. We cleanse outdated contact records, append missing technographic attributes, and build net-new verified custom lists.',
    services: [
      { name: 'B2B List Building', route: '/b2b-list-building', badge: 'Custom Built', desc: 'Hand-curated, phone-verified account lists tailored to your ICP.' },
      { name: 'Database Cleansing', route: '/database-cleansing', badge: '98% Accuracy', desc: 'De-duplication, email validation, and CRM data enrichment.' },
    ],
    metric: '98%',
    metricLabel: 'Data Deliverability & Contact Accuracy',
    highlight: 'Triple-verified via automated ping, SMTP handshake & manual audit',
  },
]

export default function ExperienceObjectiveSelector() {
  const [activeTab, setActiveTab] = useState(OBJECTIVES[0].id)
  const navigate = useNavigate()

  const currentObjective = OBJECTIVES.find((o) => o.id === activeTab) || OBJECTIVES[0]
  const IconComponent = currentObjective.icon

  return (
    <section
      id="growth-objective-selector"
      className="relative py-20 lg:py-28 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#FF6D00]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                STRATEGY ALIGNMENT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              What Are You Trying <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                To Achieve?
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Select your primary business objective to reveal tailored B2B service blueprints engineered for high conversion.
          </p>
        </div>

        {/* Horizontal Editorial Tab Bar */}
        <div className="relative border-b border-white/10 mb-10 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-2 sm:gap-4 min-w-max pb-3">
            {OBJECTIVES.map((obj) => {
              const isActive = activeTab === obj.id
              const TabIcon = obj.icon

              return (
                <button
                  key={obj.id}
                  onClick={() => setActiveTab(obj.id)}
                  className={`group relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <TabIcon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#FF6D00]' : 'text-white/40 group-hover:text-white/70'
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    {obj.label}
                  </span>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="objectiveSelectorActiveBar"
                      className="absolute -bottom-3.5 left-0 right-0 h-[2px] bg-[#FF6D00] shadow-[0_0_12px_rgba(255,109,0,0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentObjective.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Top Accent Gradient Border Light */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6D00]/40 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Objective Narrative & Metrics (~5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-[#FF6D00] uppercase tracking-wider mb-4">
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>OBJECTIVE BLUEPRINT</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-snug">
                    {currentObjective.tagline}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                    {currentObjective.summary}
                  </p>
                </div>

                {/* Highlight box and metric */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6D00] shrink-0 mt-0.5" />
                    <span>{currentObjective.highlight}</span>
                  </div>

                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.03] flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black font-mono text-[#FF6D00]">
                        {currentObjective.metric}
                      </div>
                      <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mt-0.5">
                        {currentObjective.metricLabel}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/contact')}
                      className="text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-[#FF6D00] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Recommended Specific Services (~7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="text-xs font-mono uppercase tracking-widest text-white/40 pb-2 border-b border-white/5">
                  RECOMMENDED EXECUTION MODULES ({currentObjective.services.length})
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentObjective.services.map((srv) => (
                    <div
                      key={srv.route}
                      onClick={() => navigate(srv.route)}
                      className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#FF6D00]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-white/60 group-hover:bg-[#FF6D00]/20 group-hover:text-[#FF6D00] transition-colors">
                            {srv.badge}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#FF6D00] group-hover:translate-x-1 transition-all" />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold uppercase text-white tracking-tight group-hover:text-white transition-colors">
                          {srv.name}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">
                          {srv.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#FF6D00] group-hover:underline">
                        <span>EXPLORE SERVICE</span>
                        <span>&rarr;</span>
                      </div>
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
