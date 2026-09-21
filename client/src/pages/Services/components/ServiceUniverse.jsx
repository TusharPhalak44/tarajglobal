import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Orbit, CheckCircle2 } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { ArrowRevealButton, MagneticButton } from './UniverseButtons'

/**
 * ServiceUniverse — 03 SERVICE UNIVERSE (HERO FEATURE)
 * Center: B2B GROWTH
 * 12 services orbiting around center with numbers, names, nodes, and connecting lines.
 * On hover: selected service scales up, moves toward center, becomes brighter,
 * line animates, other services fade, supporting description & CTA appear.
 * Mobile: Clean interactive vertical list.
 */

const UNIVERSE_SERVICES = [
  {
    num: '01',
    short: 'LEAD GENERATION',
    fullName: 'B2B Lead Generation',
    path: '/sql-services',
    desc: 'Target and connect with qualified decision-makers through verified phone and email outbound sequences.',
    deliverable: 'Confirmed AE Appointments',
    sla: '85%+ Show-Rate Guarantee',
  },
  {
    num: '02',
    short: 'BANT LEADS',
    fullName: 'BANT Lead Generation',
    path: '/bant-lead-generation',
    desc: 'Dual-channel human qualification verifying Budget, Authority, Need, and Timeline before sales handoff.',
    deliverable: '4-Point Verified Criteria',
    sla: '100% Pre-Screened Leads',
  },
  {
    num: '03',
    short: 'MQL SERVICES',
    fullName: 'Marketing Qualified Leads',
    path: '/mql-services',
    desc: 'Capture and score active research signals from prospects consuming your technical content.',
    deliverable: 'High-Intent Content Consumers',
    sla: 'Real-Time Intent Scoring',
  },
  {
    num: '04',
    short: 'APPOINTMENT SETTING',
    fullName: 'B2B Appointment Setting',
    path: '/b2b-appointment-setting',
    desc: 'Direct calendar booking with senior stakeholders and VPs ready to explore your technology.',
    deliverable: 'Direct Sales Calendar Slots',
    sla: 'Guaranteed Qualified Meetings',
  },
  {
    num: '05',
    short: 'EMAIL MARKETING',
    fullName: 'B2B Email Marketing',
    path: '/b2b-email-marketing',
    desc: 'Bespoke cold outbound campaigns engineered for deliverability, open rates, and executive replies.',
    deliverable: 'Custom Copy & SMTP Infrastructure',
    sla: '99.8% Inbox Placement',
  },
  {
    num: '06',
    short: 'ABM',
    fullName: 'Account-Based Marketing',
    path: '/abm',
    desc: 'Engage high-value accounts with focused B2B campaigns tailored to specific buying committees.',
    deliverable: 'Tier-1 Target Orchestration',
    sla: 'Multi-Stakeholder Penetration',
  },
  {
    num: '07',
    short: 'CONTENT SYNDICATION',
    fullName: 'Content Syndication',
    path: '/content-syndication',
    desc: 'Distribute whitepapers and technical guides across global enterprise B2B media networks.',
    deliverable: 'Guaranteed Asset Downloads',
    sla: 'Targeted Title Matching',
  },
  {
    num: '08',
    short: 'WEBINAR SERVICES',
    fullName: 'Webinar Services',
    path: '/webinar-services',
    desc: 'End-to-end registrant acquisition and post-event lead qualification for virtual summits and webinars.',
    deliverable: 'Pre-Qualified Live Attendees',
    sla: 'Full Registration Cycle',
  },
  {
    num: '09',
    short: 'LEAD NURTURING',
    fullName: 'Lead Nurturing',
    path: '/lead-nurturing',
    desc: 'Automated multi-channel educational workflows that guide cold leads into active sales evaluations.',
    deliverable: 'Lifecycle Engagement Sequences',
    sla: 'Continuous Buyer Warming',
  },
  {
    num: '10',
    short: 'DEMAND GENERATION',
    fullName: 'Demand Generation',
    path: '/demand-generation',
    desc: 'Create holistic awareness, capture active demand, and generate qualified opportunities across the funnel.',
    deliverable: 'Full-Funnel Opportunity Inflow',
    sla: 'Predictable Pipeline Volume',
  },
  {
    num: '11',
    short: 'LIST BUILDING',
    fullName: 'B2B List Building',
    path: '/b2b-list-building',
    desc: 'Custom-built contact registries matched precisely to your company firmographics, geography, and ICP.',
    deliverable: '100% Bespoke Data Registry',
    sla: 'Triple-Layer Verification',
  },
  {
    num: '12',
    short: 'DATABASE CLEANSING',
    fullName: 'Database Cleansing',
    path: '/database-cleansing',
    desc: 'Scrub, deduplicate, re-verify emails, and enrich missing phone/technographic fields in your CRM.',
    deliverable: 'CRM Deduplication & Enrichment',
    sla: '99.8% Data Accuracy SLA',
  },
]

export default function ServiceUniverse() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(5) // Default to ABM (06)

  const active = UNIVERSE_SERVICES[activeIdx]

  // Radius for desktop circular universe
  const orbitRadius = 180

  return (
    <section
      id="service-universe"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-8 lg:px-14 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#04060A' : '#F5F7FB',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Subtle Ambience */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
            />
            <span
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              03 // THE SERVICE UNIVERSE
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4 uppercase"
            style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
          >
            One Integrated{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400">
              Growth Platform
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Hover over any orbiting service node to command its parameters, deliverables, and performance benchmarks.
          </p>
        </div>

        {/* ══ DESKTOP: Interactive Circular Universe with Live Side Inspector ══ */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left / Center (7 cols): The Orbit Canvas */}
          <div className="md:col-span-7 flex items-center justify-center relative min-h-[480px] lg:min-h-[520px] select-none">
            {/* Outer Orbit Guides */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full border border-dashed pointer-events-none"
              style={{ borderColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)' }}
            />
            <div
              className="absolute w-[260px] h-[260px] rounded-full border pointer-events-none"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
            />

            {/* Connecting Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {UNIVERSE_SERVICES.map((s, idx) => {
                const angle = (idx * (360 / UNIVERSE_SERVICES.length) - 90) * (Math.PI / 180)
                const cx = 240
                const cy = 250
                const x = cx + orbitRadius * Math.cos(angle)
                const y = cy + orbitRadius * Math.sin(angle)
                const isSelected = activeIdx === idx

                return (
                  <line
                    key={s.num}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${Math.cos(angle) * orbitRadius}px)`}
                    y2={`calc(50% + ${Math.sin(angle) * orbitRadius}px)`}
                    stroke={isSelected ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')}
                    strokeWidth={isSelected ? '2' : '1'}
                    strokeDasharray={isSelected ? 'none' : '3 3'}
                    className="transition-all duration-300"
                  />
                )
              })}
            </svg>

            {/* Central Hub: B2B GROWTH */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10 w-32 h-32 rounded-full border flex flex-col items-center justify-center p-3 text-center shadow-2xl backdrop-blur-md cursor-pointer"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isDark ? '#38BDF8' : '#0284C7',
                boxShadow: isDark ? '0 0 35px rgba(56, 189, 248, 0.25)' : '0 10px 30px rgba(2, 132, 199, 0.15)',
              }}
            >
              <Orbit className="w-5 h-5 text-sky-400 mb-1 animate-spin" style={{ animationDuration: '25s' }} />
              <span
                className="font-mono text-xs font-black tracking-widest uppercase"
                style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
              >
                B2B GROWTH
              </span>
              <span
                className="text-[9px] font-mono mt-0.5"
                style={{ color: isDark ? '#64748B' : '#94A3B8' }}
              >
                12 DISCIPLINES
              </span>
            </motion.div>

            {/* 12 Orbiting Service Nodes */}
            {UNIVERSE_SERVICES.map((service, idx) => {
              const angle = (idx * (360 / UNIVERSE_SERVICES.length) - 90) * (Math.PI / 180)
              // If selected, moves 16px closer to center
              const isSelected = activeIdx === idx
              const currentRadius = isSelected ? orbitRadius - 16 : orbitRadius
              const x = Math.cos(angle) * currentRadius
              const y = Math.sin(angle) * currentRadius

              return (
                <button
                  key={service.num}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`absolute z-20 flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer border whitespace-nowrap ${
                    isSelected
                      ? 'shadow-xl scale-115'
                      : 'opacity-50 hover:opacity-100 scale-95'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px) ${isSelected ? 'scale(1.15)' : 'scale(1)'}`,
                    backgroundColor: isSelected
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? '#111622' : '#FFFFFF',
                    borderColor: isSelected
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                    color: isSelected
                      ? isDark ? '#090D15' : '#FFFFFF'
                      : isDark ? '#CBD5E1' : '#334155',
                  }}
                >
                  <span className="text-[9px] opacity-70">{service.num}</span>
                  <span>{service.short}</span>
                </button>
              )
            })}
          </div>

          {/* Right (5 cols): Dynamic Universe Information Panel */}
          <div className="md:col-span-5">
            <div
              className="p-8 sm:p-10 rounded-2xl border relative overflow-hidden backdrop-blur-md"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.3)',
                boxShadow: isDark
                  ? '0 20px 45px -10px rgba(0, 0, 0, 0.6)'
                  : '0 15px 35px -10px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Header inside Panel */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span
                    className="font-mono text-xs font-bold tracking-widest uppercase"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    DISCIPLINE INSPECTOR
                  </span>
                </div>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                >
                  {active.num} / 12
                </span>
              </div>

              {/* Dynamic Service Reveal with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <span
                    className="font-mono text-4xl sm:text-5xl font-black block mb-2 leading-none"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    {active.num}
                  </span>

                  <h3
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3"
                    style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
                  >
                    {active.fullName}
                  </h3>

                  <p
                    className="text-sm sm:text-base leading-relaxed font-normal mb-6"
                    style={{ color: isDark ? '#94A3B8' : '#475569' }}
                  >
                    {active.desc}
                  </p>

                  <div
                    className="p-4 rounded-xl border mb-8 text-xs font-mono space-y-1.5"
                    style={{
                      backgroundColor: isDark ? '#111622' : '#F8FAFC',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>DELIVERABLE:</span>
                      <span className="font-bold" style={{ color: isDark ? '#FFFFFF' : '#090D15' }}>{active.deliverable}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t"
                      style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)' }}
                    >
                      <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>SLA BENCHMARK:</span>
                      <span className="font-bold text-sky-500">{active.sla}</span>
                    </div>
                  </div>

                  <div>
                    <ArrowRevealButton to={active.path}>
                      EXPLORE SERVICE →
                    </ArrowRevealButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* ══ MOBILE: Clean Interactive Vertical List ══ */}
        <div className="md:hidden space-y-3">
          {UNIVERSE_SERVICES.map((s, idx) => {
            const isSelected = activeIdx === idx

            return (
              <div
                key={s.num}
                onClick={() => setActiveIdx(idx)}
                className="p-4 rounded-xl border transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)'
                    : isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isSelected
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                    >
                      {s.num}
                    </span>
                    <h3
                      className="font-bold text-sm"
                      style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
                    >
                      {s.fullName}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-sky-500 font-semibold">
                    {s.short}
                  </span>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2 border-t mt-2"
                    style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)' }}
                  >
                    <p
                      className="text-xs leading-relaxed mb-3"
                      style={{ color: isDark ? '#94A3B8' : '#475569' }}
                    >
                      {s.desc}
                    </p>
                    <Link
                      to={s.path}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-sky-500"
                    >
                      <span>EXPLORE SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
