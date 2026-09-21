import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  Zap,
  Users,
  Database,
  CalendarCheck,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react'

const CATEGORIES = [
  { id: 'all', label: 'All Services (12)' },
  { id: 'lead-gen', label: 'Lead Generation' },
  { id: 'demand-gen', label: 'Demand Generation' },
  { id: 'abm', label: 'ABM' },
  { id: 'data', label: 'Data Solutions' },
  { id: 'operations', label: 'Outreach & Operations' },
]

const ALL_SERVICES = [
  // ─── 01. LEAD GENERATION ───
  {
    id: 'sql',
    category: 'lead-gen',
    categoryName: 'Lead Generation',
    name: 'SQL Services',
    route: '/sql-services',
    tag: 'SALES READY',
    summary: 'Direct access to verified decision-makers who have active purchase cycles, defined budgets, and immediate project timelines.',
    sla: '100% Contract-Backed Replacement SLA',
    kpis: ['Direct C-Level Access', 'Budget Confirmed', 'Fast CRM Handoff'],
  },
  {
    id: 'bant',
    category: 'lead-gen',
    categoryName: 'Lead Generation',
    name: 'BANT Lead Generation',
    route: '/bant-lead-generation',
    tag: 'VALIDATED CRITERIA',
    summary: 'Four-stage qualification framework verifying Budget, Authority, Need, and Timeline before any prospect enters your sales pipeline.',
    sla: 'Phone & Authority Matrix Verified',
    kpis: ['Authority Confirmed', 'Timeline Verified', 'Zero Unvetted Leads'],
  },
  {
    id: 'mql',
    category: 'lead-gen',
    categoryName: 'Lead Generation',
    name: 'MQL Services',
    route: '/mql-services',
    tag: 'HIGH VOLUME PIPELINE',
    summary: 'High-volume engaged prospects generated through targeted content, intent scoring, and digital touchpoints for SDR acceleration.',
    sla: 'Strict ICP & Domain Match SLA',
    kpis: ['Intent Scored', 'Firmographic Filtering', 'Rapid SDR Routing'],
  },

  // ─── 02. DEMAND GENERATION ───
  {
    id: 'demand-gen',
    category: 'demand-gen',
    categoryName: 'Demand Generation',
    name: 'Demand Generation',
    route: '/demand-generation',
    tag: 'OMNICHANNEL INBOUND',
    summary: 'Integrated multi-touch awareness and demand capture architecture designed to transform passive accounts into active inbound buyers.',
    sla: 'Multi-Touch Pipeline Attribution',
    kpis: ['Omnichannel Reach', 'Category Authority', 'Inbound Flow Sync'],
  },
  {
    id: 'content-syndication',
    category: 'demand-gen',
    categoryName: 'Demand Generation',
    name: 'Content Syndication',
    route: '/content-syndication',
    tag: 'WHITE PAPERS & ASSETS',
    summary: 'Strategic distribution of your whitepapers, case studies, and reports to verified enterprise decision-makers on a cost-per-lead (CPL) basis.',
    sla: '100% Opt-In Verification SLA',
    kpis: ['Cost-Per-Lead Model', 'Strict Domain Filtering', 'Asset Engagement Audit'],
  },
  {
    id: 'webinar-services',
    category: 'demand-gen',
    categoryName: 'Demand Generation',
    name: 'Webinar Services',
    route: '/webinar-services',
    tag: 'LIVE EVENTS & WEBINARS',
    summary: 'End-to-end B2B registrant acquisition, attendance reminder cadences, and post-session SDR qualification workflows.',
    sla: 'ICP-Only Registrants & Attendance SLA',
    kpis: ['Targeted Registrations', '60%+ Attendance Cadence', 'Post-Event Qualification'],
  },

  // ─── 03. ACCOUNT-BASED MARKETING (ABM) ───
  {
    id: 'abm',
    category: 'abm',
    categoryName: 'ABM',
    name: 'Account-Based Marketing',
    route: '/abm',
    tag: 'TIER-1 ENTERPRISE LOGOS',
    summary: 'Hyper-personalized 1:1 and 1:few multi-channel orchestration targeting complex buying committees across named priority logos.',
    sla: 'Multi-Stakeholder Alignment Guarantee',
    kpis: ['Buying Committee Mapping', 'Custom Outreach Cadences', 'Executive Engagement'],
  },

  // ─── 04. DATA SOLUTIONS & HYGIENE ───
  {
    id: 'list-building',
    category: 'data',
    categoryName: 'Data Solutions',
    name: 'B2B List Building',
    route: '/b2b-list-building',
    tag: 'CUSTOM VERIFIED LISTS',
    summary: 'Hand-curated, phone-verified prospect databases built to your exact ideal customer profile (ICP) with direct dials and validated emails.',
    sla: '99% Deliverability SLA Guarantee',
    kpis: ['100% Hand-Curated', 'Direct Dials Included', 'Technographic Filters'],
  },
  {
    id: 'database-cleansing',
    category: 'data',
    categoryName: 'Data Solutions',
    name: 'Database Cleansing',
    route: '/database-cleansing',
    tag: 'CRM DATA HYGIENE',
    summary: 'Comprehensive deduplication, SMTP ping validation, job title standardization, and contact enrichment to restore CRM integrity.',
    sla: 'Zero Bounces & Real-Time Ping Audit',
    kpis: ['SMTP Handshake Check', 'Job Title Normalization', 'GDPR/CAN-SPAM Clean'],
  },

  // ─── 05. SALES OUTREACH & OPERATIONS ───
  {
    id: 'appointment-setting',
    category: 'operations',
    categoryName: 'Outreach & Operations',
    name: 'B2B Appointment Setting',
    route: '/b2b-appointment-setting',
    tag: 'CALENDAR BOOKINGS',
    summary: 'Pre-qualified, double-confirmed discovery calls with key budget holders scheduled directly onto your sales reps’ calendars.',
    sla: 'Zero No-Show & Show-Up Guarantee',
    kpis: ['Double-Confirmed Calls', 'Direct Calendar Sync', 'Pre-Vetted Agendas'],
  },
  {
    id: 'email-marketing',
    category: 'operations',
    categoryName: 'Outreach & Operations',
    name: 'B2B Email Marketing',
    route: '/b2b-email-marketing',
    tag: 'INBOX OUTREACH INFRASTRUCTURE',
    summary: 'Warm inbox infrastructure, dedicated IPs, persuasive human-written copy, and strict CAN-SPAM/GDPR compliance delivering direct replies.',
    sla: 'Dedicated IP Warming & 98% Inbox Delivery',
    kpis: ['Dedicated Inboxes', 'High Reply Rates', 'Spam Score < 0.5%'],
  },
  {
    id: 'lead-nurturing',
    category: 'operations',
    categoryName: 'Outreach & Operations',
    name: 'Lead Nurturing',
    route: '/lead-nurturing',
    tag: 'LIFECYCLE ACTIVATION',
    summary: 'Dynamic lifecycle workflows and educational content cadences that re-activate delayed pipeline accounts and stalled sales conversations.',
    sla: 'Automated + Human-Assisted Handoff',
    kpis: ['Pipeline Revival', 'Intent Trigger Alerts', 'Continuous Education'],
  },
]

export default function ServicesCatalog() {
  const navigate = useNavigate()
  const [selectedCat, setSelectedCat] = useState('all')

  const filteredServices =
    selectedCat === 'all'
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.category === selectedCat)

  return (
    <section
      id="services-catalog-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                CORE CAPABILITIES DIRECTORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Twelve Specialized Services. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                One Unified Growth Engine.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Click any service card to view complete execution specifications, delivery timelines, and transparent SLA guarantees.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-white/10">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF6D00] text-black shadow-lg shadow-[#FF6D00]/25 scale-[1.02]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Services Grid (All 12 Services with Direct Links) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => navigate(service.route)}
                className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF6D00]/60 p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden shadow-xl"
              >
                {/* Top of Card */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-white/70 group-hover:bg-[#FF6D00]/15 group-hover:text-[#FF6D00] transition-colors border border-white/5">
                      {service.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#FF6D00] group-hover:border-[#FF6D00] transition-all">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-white transition-colors">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-white/65 leading-relaxed">
                    {service.summary}
                  </p>

                  {/* Micro-Features Bullets */}
                  <div className="mt-5 space-y-1.5">
                    {service.kpis.map((kpi, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-white/60">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FF6D00] shrink-0" />
                        <span>{kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom of Card: SLA + Direct Action Link */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF6D00] shrink-0" />
                    <span className="truncate">{service.sla}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#FF6D00] group-hover:underline pt-1">
                    <span>Explore {service.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
