import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Target, Users, Mail, Compass, Database, CheckCircle2, ShieldCheck, Sparkles, Filter, Workflow } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const OUTCOME_INDICATORS = [
  {
    num: '01',
    label: 'ATTRACT & IDENTIFY',
    desc: 'Precision ICP modeling, TAM discovery, and intent surge tracking.',
    color: '#00A6FF',
    glowColor: 'rgba(0, 166, 255, 0.25)',
  },
  {
    num: '02',
    label: 'NURTURE & ENGAGE',
    desc: 'Multi-touch email cadences, Account-Based Marketing, and syndication.',
    color: '#FF6D00',
    glowColor: 'rgba(255, 109, 0, 0.25)',
  },
  {
    num: '03',
    label: 'QUALIFY & DELIVER',
    desc: 'BANT criteria vetting, sales-qualified appointments, and CRM telemetry.',
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
]

// ─── 4 Strategic Service Categories with All 12 Services ─────────────────────

const SERVICE_CLUSTERS = [
  {
    id: 'qualified-leads',
    category: 'Qualified Lead Delivery',
    tagline: 'HIGH-INTENT PIPELINE ACCELERATION',
    desc: 'Rigorous vetting that moves prospects from general interest into sales-ready discovery conversations.',
    services: [
      {
        id: 'sql',
        name: 'Sales Qualified Leads (SQL)',
        path: '/sql-services',
        eyebrow: '01 · High-Intent Pipeline',
        desc: 'Connect with verified decision-makers who have an active need, confirmed budget, and near-term buying timeline ready for sales discovery.',
        metrics: '98% Show Rate',
        deliverable: 'Confirmed Executive Meetings',
        icon: Target,
        color: '#00A6FF',
      },
      {
        id: 'bant',
        name: 'BANT Lead Generation',
        path: '/bant-lead-generation',
        eyebrow: '02 · Deep Qualification',
        desc: 'Filter leads against Budget, Authority, Need, and Timeline frameworks to eliminate tire-kickers and shorten sales cycles.',
        metrics: '100% Vetted Authority',
        deliverable: 'BANT-Verified Dossiers',
        icon: ShieldCheck,
        color: '#8B5CF6',
      },
      {
        id: 'mql',
        name: 'Marketing Qualified Leads (MQL)',
        path: '/mql-services',
        eyebrow: '03 · Top-Funnel Velocity',
        desc: 'High-intent marketing qualified leads nurtured through verified content engagement, intent triggers, and profile matching.',
        metrics: '3.4x Pipeline Lift',
        deliverable: 'Enriched Contact Profiles',
        icon: Sparkles,
        color: '#10B981',
      },
      {
        id: 'hql',
        name: 'High-Quality Leads (HQL)',
        path: '/hql-services',
        eyebrow: '04 · Precision Quality',
        desc: 'Bridge marketing engagement and sales qualification with pre-screened decision-makers and custom discovery answers.',
        metrics: '99.8% Deliverability SLA',
        deliverable: '100% Human-Verified HQLs',
        icon: ShieldCheck,
        color: '#00A6FF',
      },
    ],
  },
  {
    id: 'multi-channel',
    category: 'Precision Outreach & ABM',
    tagline: '1-TO-1 ACCOUNT PENETRATION',
    desc: 'Targeted outreach architectures designed to engage complex buying committees and book executive discovery meetings.',
    services: [
      {
        id: 'b2b-email',
        name: 'B2B Email Marketing',
        path: '/b2b-email-marketing',
        eyebrow: '04 · Precision Sequencing',
        desc: 'Personalized, multi-step email cadences sent to verified decision-makers, supported by deliverability infrastructure and telemetry.',
        metrics: '99% Inbox Delivery',
        deliverable: 'Engaged Sales Conversations',
        icon: Mail,
        color: '#00A6FF',
      },
      {
        id: 'abm',
        name: 'Account-Based Marketing (ABM)',
        path: '/abm',
        eyebrow: '05 · Tiered Account Focus',
        desc: 'Full buying committee mapping across strategic accounts with synchronized messaging for executive stakeholders.',
        metrics: '40% Faster Cycle',
        deliverable: 'Committee Stakeholder Consensus',
        icon: Compass,
        color: '#EC4899',
      },
      {
        id: 'appointment',
        name: 'B2B Appointment Setting',
        path: '/b2b-appointment-setting',
        eyebrow: '06 · Direct SDR Delivery',
        desc: 'Dedicated appointment setting specialists who prospect, engage, and place qualified meetings directly onto your reps calendars.',
        metrics: 'Zero No-Shows Guaranteed',
        deliverable: 'Direct Calendar Bookings',
        icon: Users,
        color: '#F59E0B',
      },
    ],
  },
  {
    id: 'demand-content',
    category: 'Demand & Content Generation',
    tagline: 'FULL-FUNNEL AUDIENCE ENGAGEMENT',
    desc: 'Amplify your thought leadership and capture in-market solution researchers across global B2B syndication networks.',
    services: [
      {
        id: 'content-syndication',
        name: 'Content Syndication',
        path: '/content-syndication',
        eyebrow: '07 · Global Media Reach',
        desc: 'Distribute whitepapers, ebooks, and research reports to targeted personas to capture intent-verified first-party opt-ins.',
        metrics: 'Global Publisher Network',
        deliverable: 'Cost-Per-Lead (CPL) Opt-Ins',
        icon: Layers,
        color: '#00A6FF',
      },
      {
        id: 'demand-gen',
        name: 'Demand Generation',
        path: '/demand-generation',
        eyebrow: '08 · Pipeline Velocity',
        desc: 'Integrated demand programs that blend paid interception, inbound conversion, and outbound acceleration to fill your sales pipeline.',
        metrics: 'Full-Funnel Attribution',
        deliverable: 'Scalable In-Market Inquiries',
        icon: Workflow,
        color: '#10B981',
      },
      {
        id: 'webinars',
        name: 'B2B Webinar Services',
        path: '/webinar-services',
        eyebrow: '09 · Live Event Engagement',
        desc: 'Drive registrations and verified attendance for virtual roundtables and webinars from relevant enterprise buying accounts.',
        metrics: '45%+ Live Attendance',
        deliverable: 'Engaged Live Attendees',
        icon: Users,
        color: '#8B5CF6',
      },
    ],
  },
  {
    id: 'data-cleansing',
    category: 'B2B Data Intelligence & Hygiene',
    tagline: 'FOUNDATIONAL REVENUE ACCURACY',
    desc: 'Eliminate dead records, enrich buying attributes, and maintain pristine CRM hygiene to empower your sales operations.',
    services: [
      {
        id: 'list-building',
        name: 'B2B List Building',
        path: '/b2b-list-building',
        eyebrow: '10 · Custom TAM Discovery',
        desc: 'Bespoke contact discovery tailored to your exact technographics, firmographics, headcount, and organizational seniority.',
        metrics: '100% Fresh Verified Contacts',
        deliverable: 'Custom Target Accounts & Leads',
        icon: Filter,
        color: '#00A6FF',
      },
      {
        id: 'database-cleansing',
        name: 'Database Cleansing',
        path: '/database-cleansing',
        eyebrow: '11 · CRM Decay Prevention',
        desc: 'Scrub, deduplicate, re-verify emails, and enrich missing fields to protect domain reputation and sales team productivity.',
        metrics: 'Under 1% Bounce Rate',
        deliverable: 'Sanitized Clean CRM Database',
        icon: Database,
        color: '#10B981',
      },
      {
        id: 'lead-nurturing',
        name: 'Lead Nurturing',
        path: '/lead-nurturing',
        eyebrow: '12 · Lifecycle Optimization',
        desc: 'Re-activate stalled pipeline, warm cold leads, and maintain consistent relationship touches until accounts are ready to buy.',
        metrics: '35% Stalled Lead Revival',
        deliverable: 'Re-Engaged Active Opportunities',
        icon: CheckCircle2,
        color: '#FF6D00',
      },
    ],
  },
]

const WhatIsService = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const [activeCluster, setActiveCluster] = useState('all')

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % OUTCOME_INDICATORS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const filteredClusters =
    activeCluster === 'all'
      ? SERVICE_CLUSTERS
      : SERVICE_CLUSTERS.filter((c) => c.id === activeCluster)

  return (
    <section
      id="services-catalog"
      className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 overflow-hidden bg-background border-b border-border transition-colors duration-300"
      aria-label="Taraj Global 12 Specialized Services Catalog"
    >
      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete B2B Capabilities</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span>A Complete Growth Engine: From </span>
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Intent To Closed Revenue
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Taraj Global combines verified audience data, multi-channel outreach, and strict qualification to deliver measurable sales results across 12 strategic areas.
          </p>

          {/* Sequential 3-Step Storytelling Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
            {OUTCOME_INDICATORS.map((ind, idx) => {
              const isActive = activeStep === idx

              return (
                <div
                  key={ind.label}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-md scale-102 ring-1 ring-primary/30'
                      : 'border-border bg-surface/40 hover:bg-surface/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-black" style={{ color: ind.color }}>
                      {ind.num} &bull; {ind.label}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: ind.color }} />
                    )}
                  </div>
                  <div className="text-xs text-text-secondary leading-relaxed">
                    {ind.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCluster('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeCluster === 'all'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-surface text-text-secondary border-border hover:border-text-tertiary'
            }`}
          >
            All 12 Services
          </button>
          {SERVICE_CLUSTERS.map((cl) => (
            <button
              key={cl.id}
              onClick={() => setActiveCluster(cl.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeCluster === cl.id
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface text-text-secondary border-border hover:border-text-tertiary'
              }`}
            >
              {cl.category}
            </button>
          ))}
        </div>

        {/* Service Clusters Grid */}
        <div className="space-y-12">
          {filteredClusters.map((cluster) => (
            <div key={cluster.id} className="relative">
              {/* Cluster Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 mb-6 border-b border-border">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase">
                    {cluster.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary mt-0.5">
                    {cluster.category}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary max-w-md">
                  {cluster.desc}
                </p>
              </div>

              {/* Cluster 3 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cluster.services.map((srv) => {
                  const Icon = srv.icon

                  return (
                    <div
                      key={srv.id}
                      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-surface/70 hover:bg-surface dark:bg-[#0c1424]/70 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div>
                        {/* Top Badge & Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-tertiary">
                            {srv.eyebrow}
                          </span>
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                            style={{ backgroundColor: srv.color }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-text-primary leading-tight group-hover:text-primary transition-colors">
                          {srv.name}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-text-secondary leading-relaxed mt-2.5">
                          {srv.desc}
                        </p>
                      </div>

                      {/* Bottom Footer Info */}
                      <div className="pt-5 mt-5 border-t border-border/70 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[9.5px] font-mono uppercase text-text-tertiary">Benchmark</span>
                          <span className="text-xs font-mono font-bold text-emerald-500">{srv.metrics}</span>
                        </div>

                        <Link
                          to={srv.path}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatIsService
