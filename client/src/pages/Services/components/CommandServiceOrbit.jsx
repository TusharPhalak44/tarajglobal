import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Orbit, CheckCircle2 } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CommandPrimaryButton } from './CommandButtons'

/**
 * CommandServiceOrbit — 02 SERVICE ORBIT
 * Center: "B2B GROWTH"
 * Around it: 12 Clean text nodes positioned around a circular orbit.
 * Active on hover: Updates the clean information panel beside the orbit.
 * Mobile: Clean vertical interactive list, no cramped orbit.
 */

const SERVICES_ORBIT = [
  {
    id: 'lead-gen',
    short: 'LEAD GENERATION',
    fullName: 'B2B Lead Generation',
    path: '/sql-services',
    category: 'GENERATE',
    desc: 'Identify in-market accounts and book confirmed sales meetings directly with qualified economic buyers.',
    metric: '85%+ Show-Rate SLA',
  },
  {
    id: 'mql',
    short: 'MQL SERVICES',
    fullName: 'Marketing Qualified Leads',
    path: '/mql-services',
    category: 'GENERATE',
    desc: 'Engage and qualify prospects who demonstrate active buying intent and digital asset engagement.',
    metric: 'High Intent Scoring',
  },
  {
    id: 'bant',
    short: 'BANT QUALIFICATION',
    fullName: 'BANT Lead Generation',
    path: '/bant-lead-generation',
    category: 'GENERATE',
    desc: 'Verify prospect Budget, Authority, Need, and Timeline through dual-channel human tele-screening.',
    metric: '4-Point Verified',
  },
  {
    id: 'appt',
    short: 'APPOINTMENT SETTING',
    fullName: 'B2B Appointment Setting',
    path: '/b2b-appointment-setting',
    category: 'CONVERT',
    desc: 'Direct calendar integration to deliver confirmed introductory and technical discovery calls.',
    metric: 'Calendar-Ready',
  },
  {
    id: 'email',
    short: 'EMAIL MARKETING',
    fullName: 'B2B Email Marketing',
    path: '/b2b-email-marketing',
    category: 'ENGAGE',
    desc: 'Reach the right decision-makers with personalized cold outbound sequences with high reply rates.',
    metric: '99.8% Deliverability',
  },
  {
    id: 'abm',
    short: 'ABM',
    fullName: 'Account-Based Marketing',
    path: '/abm',
    category: 'CONVERT',
    desc: 'Engage high-value Tier-1 enterprise accounts with orchestrated multi-channel personalized touchpoints.',
    metric: 'Tier-1 Penetration',
  },
  {
    id: 'content',
    short: 'CONTENT SYNDICATION',
    fullName: 'Content Syndication',
    path: '/content-syndication',
    category: 'ENGAGE',
    desc: 'Distribute whitepapers, analyst reports, and tech guides to active buyers across global B2B networks.',
    metric: 'Guaranteed Downloads',
  },
  {
    id: 'webinars',
    short: 'WEBINARS',
    fullName: 'Webinar Services',
    path: '/webinar-services',
    category: 'ENGAGE',
    desc: 'Drive targeted C-level and practitioner registrations and maintain high attendee conversion rates.',
    metric: 'Full Audience Cycle',
  },
  {
    id: 'nurture',
    short: 'LEAD NURTURING',
    fullName: 'Lead Nurturing',
    path: '/lead-nurturing',
    category: 'ENGAGE',
    desc: 'Keep cold and mid-funnel prospects educated until they enter active RFP and buying evaluation.',
    metric: 'Continuous Nurture',
  },
  {
    id: 'demand',
    short: 'DEMAND GENERATION',
    fullName: 'Demand Generation',
    path: '/demand-generation',
    category: 'CONVERT',
    desc: 'Build continuous market awareness, capture in-market demand, and generate multi-touch opportunities.',
    metric: 'Full-Funnel Motion',
  },
  {
    id: 'list',
    short: 'LIST BUILDING',
    fullName: 'B2B List Building',
    path: '/b2b-list-building',
    category: 'GENERATE',
    desc: 'Custom build target account and decision-maker contact lists tailored to your exact ICP firmographics.',
    metric: '100% Bespoke Data',
  },
  {
    id: 'cleanse',
    short: 'DATABASE CLEANSING',
    fullName: 'Database Cleansing',
    path: '/database-cleansing',
    category: 'GENERATE',
    desc: 'Scrub, deduplicate, re-verify emails, and enrich missing phone/technographic fields in your CRM.',
    metric: 'CRM Health Check',
  },
]

export default function CommandServiceOrbit() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(0)

  const activeService = SERVICES_ORBIT[activeIdx]

  // Radius for desktop circular orbit
  const orbitRadius = 160

  return (
    <section
      id="service-orbit"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
            />
            <span
              className="font-mono text-xs font-semibold tracking-wider uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              02 // THE SERVICE ORBIT
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            One Cohesive Ecosystem.{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Twelve Specialized Disciplines.
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Hover over any discipline in the orbit to inspect its role within your B2B growth architecture.
          </p>
        </div>

        {/* ══ DESKTOP / TABLET: Interactive Service Orbit & Side Panel ══ */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column (7 cols): The Orbit Structure */}
          <div className="md:col-span-7 flex items-center justify-center relative min-h-[460px] select-none">
            {/* Concentric Guide Rings */}
            <div
              className="absolute w-[360px] h-[360px] rounded-full border border-dashed pointer-events-none"
              style={{ borderColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.18)' }}
            />
            <div
              className="absolute w-[240px] h-[240px] rounded-full border pointer-events-none"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)' }}
            />

            {/* Central Node: B2B GROWTH */}
            <div
              className="relative z-10 w-28 h-28 rounded-full border flex flex-col items-center justify-center p-2 text-center shadow-lg"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isDark ? '#38BDF8' : '#0284C7',
                boxShadow: isDark ? '0 0 25px rgba(56, 189, 248, 0.2)' : '0 10px 25px rgba(2, 132, 199, 0.1)',
              }}
            >
              <Orbit className="w-4 h-4 text-sky-500 mb-1 animate-spin" style={{ animationDuration: '20s' }} />
              <span
                className="font-mono text-xs font-bold tracking-tight uppercase"
                style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
              >
                B2B GROWTH
              </span>
              <span
                className="text-[9px] font-mono"
                style={{ color: isDark ? '#64748B' : '#94A3B8' }}
              >
                12 DISCIPLINES
              </span>
            </div>

            {/* 12 Positioned Text Nodes */}
            {SERVICES_ORBIT.map((service, idx) => {
              const angle = (idx * (360 / SERVICES_ORBIT.length) - 90) * (Math.PI / 180)
              const x = Math.cos(angle) * orbitRadius
              const y = Math.sin(angle) * orbitRadius
              const isActive = activeIdx === idx

              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`absolute z-20 px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer border whitespace-nowrap ${
                    isActive
                      ? 'scale-110 shadow-md'
                      : 'hover:scale-105 opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px) ${isActive ? 'scale(1.12)' : 'scale(1)'}`,
                    backgroundColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? '#111622' : '#FFFFFF',
                    borderColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                    color: isActive
                      ? isDark ? '#0B0F19' : '#FFFFFF'
                      : isDark ? '#E2E8F0' : '#334155',
                  }}
                >
                  {service.short}
                </button>
              )
            })}
          </div>

          {/* Right Column (5 cols): Dynamic Information Panel */}
          <div className="md:col-span-5">
            <div
              className="p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.25)',
                boxShadow: isDark
                  ? '0 10px 30px -5px rgba(0, 0, 0, 0.4)'
                  : '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* Category Tag & Index */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
              >
                <span
                  className="font-mono text-xs font-bold tracking-widest uppercase"
                  style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                >
                  // CATEGORY: {activeService.category}
                </span>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                >
                  {String(activeIdx + 1).padStart(2, '0')} / 12
                </span>
              </div>

              {/* Dynamic Service Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3
                    className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
                    style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                  >
                    {activeService.fullName}
                  </h3>

                  <p
                    className="text-sm sm:text-base leading-relaxed font-normal mb-6"
                    style={{ color: isDark ? '#94A3B8' : '#475569' }}
                  >
                    {activeService.desc}
                  </p>

                  <div className="flex items-center gap-2 mb-8 text-xs font-mono"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">CORE SLA: {activeService.metric}</span>
                  </div>

                  <div>
                    <CommandPrimaryButton to={activeService.path}>
                      LEARN MORE →
                    </CommandPrimaryButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* ══ MOBILE: Clean Vertical Interactive List (No cramped orbit) ══ */}
        <div className="md:hidden space-y-3">
          {SERVICES_ORBIT.map((service, idx) => {
            const isActive = activeIdx === idx

            return (
              <div
                key={service.id}
                onClick={() => setActiveIdx(idx)}
                className="p-4 rounded-xl border transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)'
                    : isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                    >
                      {service.fullName}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border"
                    style={{
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      color: isDark ? '#94A3B8' : '#64748B',
                    }}
                  >
                    {service.category}
                  </span>
                </div>

                {isActive && (
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
                      {service.desc}
                    </p>
                    <Link
                      to={service.path}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider"
                      style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                    >
                      <span>LEARN MORE</span>
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
