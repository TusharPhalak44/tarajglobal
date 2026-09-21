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
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

// The 5 Core Strategic Pillars requested by the user
const SERVICE_PILLARS = [
  {
    id: 'lead-generation',
    num: '01',
    category: 'Lead Generation',
    icon: Target,
    tagline: 'High-Intent Sales Pipeline Acceleration',
    description:
      'Rigorous multi-touch qualification frameworks delivering sales-ready enterprise leads directly into your SDR team with contract-backed SLAs.',
    stats: '10M+ Verified Contacts',
    services: [
      {
        name: 'SQL Services',
        route: '/sql-services',
        badge: 'Sales Ready',
        desc: 'Direct access to verified decision-makers with active purchase cycles and validated budget.',
        sla: '100% Contract-Backed Replacement SLA',
      },
      {
        name: 'BANT Lead Generation',
        route: '/bant-lead-generation',
        badge: 'Validated Criteria',
        desc: 'Rigorous 4-stage audit verifying Budget, Authority, Need, and Timeline prior to handoff.',
        sla: 'Phone & Authority Matrix Verified',
      },
      {
        name: 'MQL Services',
        route: '/mql-services',
        badge: 'High Volume Demand',
        desc: 'High-volume engaged prospects scored by ICP fit, primed for immediate SDR nurturing.',
        sla: 'Targeted Domain & Headcount Filtering',
      },
    ],
  },
  {
    id: 'demand-generation',
    num: '02',
    category: 'Demand Generation',
    icon: Zap,
    tagline: 'Omnichannel Inbound & Category Authority',
    description:
      'Multi-channel awareness, thought leadership syndication, and digital touchpoints engineered to turn passive enterprise accounts into active market demand.',
    stats: '48% Conv. Lift',
    services: [
      {
        name: 'Demand Generation',
        route: '/demand-generation',
        badge: 'Full-Funnel Omnichannel',
        desc: 'Integrated digital campaigns orchestrating awareness, intent capture, and inbound routing.',
        sla: 'Multi-Touch Pipeline Attribution',
      },
      {
        name: 'Content Syndication',
        route: '/content-syndication',
        badge: 'Targeted Whitepapers',
        desc: 'Distribute whitepapers, research, and case studies to verified decision-makers on a CPL basis.',
        sla: '100% Opt-In Verification Guaranteed',
      },
      {
        name: 'Webinar Services',
        route: '/webinar-services',
        badge: 'Live Events',
        desc: 'End-to-end registrant acquisition, attendance drive, and post-session qualification callouts.',
        sla: 'ICP-Only Registrants & Attendance SLA',
      },
    ],
  },
  {
    id: 'abm',
    num: '03',
    category: 'Account-Based Marketing (ABM)',
    icon: Users,
    tagline: 'Precision Tier-1 Enterprise Penetration',
    description:
      'Hyper-personalized 1:1 and 1:few multi-channel campaigns navigating complex enterprise buying committees with customized stakeholder messaging.',
    stats: '92% Committee Reach',
    services: [
      {
        name: 'Account-Based Marketing',
        route: '/abm',
        badge: 'Tier-1 Target Accounts',
        desc: 'Strategic orchestration aligning economic buyers, technical evaluators, and executive champions.',
        sla: 'Multi-Stakeholder Account Alignment Matrix',
      },
    ],
  },
  {
    id: 'data-solutions',
    num: '04',
    category: 'Data Solutions & Hygiene',
    icon: Database,
    tagline: 'Enterprise Contact Intelligence & TAM Mapping',
    description:
      'Prevent outbound decay. We build custom-curated, phone-verified contact lists and cleanse legacy CRM databases to eliminate bounce rates.',
    stats: '99% Deliverability SLA',
    services: [
      {
        name: 'B2B List Building',
        route: '/b2b-list-building',
        badge: 'Custom Curated',
        desc: 'Hand-curated, triple-verified prospect lists matching your exact ideal customer profile (ICP).',
        sla: 'Direct Dials & Mobile Numbers Included',
      },
      {
        name: 'Database Cleansing',
        route: '/database-cleansing',
        badge: 'Data Hygiene',
        desc: 'Comprehensive CRM deduplication, email validation, job title standardization, and enrichment.',
        sla: 'SMTP Handshake & Real-Time Ping Audit',
      },
    ],
  },
  {
    id: 'operations',
    num: '05',
    category: 'Sales Operations & Outreach',
    icon: CalendarCheck,
    tagline: 'Execution Cadences & Calendar Bookings',
    description:
      'Eliminate SDR drag. Dedicated specialists manage outreach infrastructure, book confirmed discovery calls, and re-engage stalled pipeline.',
    stats: '85%+ Show-Up Rate',
    services: [
      {
        name: 'B2B Appointment Setting',
        route: '/b2b-appointment-setting',
        badge: 'Double-Confirmed Calls',
        desc: 'Pre-qualified discovery calls with validated decision-makers placed straight on your calendar.',
        sla: 'Direct Calendar Sync with Zero No-Show SLA',
      },
      {
        name: 'B2B Email Marketing',
        route: '/b2b-email-marketing',
        badge: 'Inbox Authority',
        desc: 'High-deliverability cold email campaigns crafted with human-written copy and dedicated IPs.',
        sla: 'Spam Score < 0.5% & CAN-SPAM Compliance',
      },
      {
        name: 'Lead Nurturing',
        route: '/lead-nurturing',
        badge: 'Lifecycle Ops',
        desc: 'Dynamic trigger-based workflows that educate delayed opportunities and re-activate pipeline.',
        sla: 'Automated + Human-Assisted Handoff',
      },
    ],
  },
]

export default function ExperiencePillarDirectory() {
  const navigate = useNavigate()
  const [selectedPillarId, setSelectedPillarId] = useState('all')

  const filteredPillars =
    selectedPillarId === 'all'
      ? SERVICE_PILLARS
      : SERVICE_PILLARS.filter((p) => p.id === selectedPillarId)

  return (
    <section
      id="pillar-directory-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FF6D00]/5 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                CORE SOLUTIONS ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Five Specialized Pillars. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Twelve Connected Blueprints.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Explore our complete capability matrix organized by strategic category. Select any service to explore its dedicated solution page.
          </p>
        </div>

        {/* Horizontal Category Selector Tabs */}
        <div className="relative border-b border-white/10 mb-12 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max pb-3">
            <button
              onClick={() => setSelectedPillarId('all')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedPillarId === 'all'
                  ? 'bg-[#FF6D00] text-black shadow-lg shadow-[#FF6D00]/25'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              ALL PILLARS (5)
            </button>

            {SERVICE_PILLARS.map((pillar) => {
              const isActive = selectedPillarId === pillar.id
              const Icon = pillar.icon

              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6D00] text-black shadow-lg shadow-[#FF6D00]/25'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pillar.category}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ══════════ THE 5 PILLARS CONTAINER ══════════ */}
        <div className="space-y-12">
          {filteredPillars.map((pillar) => {
            const PillarIcon = pillar.icon

            return (
              <motion.div
                key={pillar.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Pillar Header Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6D00]/10 border border-[#FF6D00]/30 flex items-center justify-center shrink-0">
                      <PillarIcon className="w-6 h-6 text-[#FF6D00]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#FF6D00] uppercase font-bold tracking-widest mb-1">
                        <span>PILLAR {pillar.num}</span>
                        <span>//</span>
                        <span>{pillar.tagline}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                        {pillar.category}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/80">
                      KEY SLA: <strong className="text-white">{pillar.stats}</strong>
                    </div>
                    <span className="text-white/40 hidden sm:inline">
                      {pillar.services.length} {pillar.services.length === 1 ? 'SERVICE' : 'SERVICES'}
                    </span>
                  </div>
                </div>

                {/* Sub-Services Grid inside this Pillar */}
                <div
                  className={`grid gap-4 ${
                    pillar.services.length === 1
                      ? 'grid-cols-1 max-w-xl'
                      : pillar.services.length === 2
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1 md:grid-cols-3'
                  }`}
                >
                  {pillar.services.map((srv) => (
                    <div
                      key={srv.route}
                      onClick={() => navigate(srv.route)}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#FF6D00]/60 p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                      {/* Top Bar of Service Card */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-white/70 group-hover:bg-[#FF6D00]/15 group-hover:text-[#FF6D00] transition-colors border border-white/5 group-hover:border-[#FF6D00]/30">
                            {srv.badge}
                          </span>
                          <div className="w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#FF6D00] group-hover:border-[#FF6D00] transition-colors">
                            <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" />
                          </div>
                        </div>

                        <h4 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight group-hover:text-white transition-colors">
                          {srv.name}
                        </h4>

                        <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                          {srv.desc}
                        </p>
                      </div>

                      {/* Bottom SLA & Direct Link Action */}
                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6D00] shrink-0" />
                          <span className="truncate">{srv.sla}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#FF6D00] group-hover:underline pt-1">
                          <span>Explore {srv.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
