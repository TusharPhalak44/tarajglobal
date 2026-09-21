import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import TarajButton from './TarajButton'

const DIRECTORY_SERVICES = [
  {
    num: '01',
    name: 'B2B Lead Generation',
    category: 'High-Intent Pipeline',
    desc: 'Identifying, vetting, and delivering verified sales-ready decision-makers primed for direct sales conversations.',
    link: '/sql-services',
    tag: 'SQL PIPELINE',
    visualColor: '#00A6FF',
    accentText: '42% Average Conversion Lift',
  },
  {
    num: '02',
    name: 'BANT Lead Generation',
    category: 'Commercial Gating',
    desc: 'Rigorous 4-point gating across Budget, Authority, Need, and Timeline parameters to eliminate unqualified meetings.',
    link: '/bant-lead-generation',
    tag: 'STRICT GATING',
    visualColor: '#FFA600',
    accentText: 'Zero Wasted Calls',
  },
  {
    num: '03',
    name: 'MQL Services',
    category: 'Mid-Funnel Velocity',
    desc: 'Targeting and scoring enterprise prospects actively engaging with technical collateral and whitepapers.',
    link: '/mql-services',
    tag: 'CONTENT SCORING',
    visualColor: '#38BDF8',
    accentText: 'Real-Time Intent Telemetry',
  },
  {
    num: '04',
    name: 'B2B Appointment Setting',
    category: 'Confirmed Pipeline',
    desc: 'Sales discovery calls placed directly onto your account executive calendars with pre-meeting briefings.',
    link: '/b2b-appointment-setting',
    tag: 'CALENDAR BOOKINGS',
    visualColor: '#FF6D00',
    accentText: 'Zero No-Show Guarantee',
  },
  {
    num: '05',
    name: 'B2B Email Marketing',
    category: 'Outbound Infrastructure',
    desc: 'Hyper-personalized outbound email cadences backed by dedicated domain warmup and custom copy architecture.',
    link: '/b2b-email-marketing',
    tag: 'DIRECT OUTREACH',
    visualColor: '#60A5FA',
    accentText: '99.8% Inbox Deliverability',
  },
  {
    num: '06',
    name: 'Account-Based Marketing (ABM)',
    category: 'Enterprise 1-to-1',
    desc: 'Coordinated multi-channel air-cover tailored around your top tier enterprise target account lists.',
    link: '/abm',
    tag: 'KEY ACCOUNTS',
    visualColor: '#A78BFA',
    accentText: 'Buying Committee Penetration',
  },
  {
    num: '07',
    name: 'Content Syndication',
    category: 'Thought Leadership',
    desc: 'Distributing technical case studies, research reports, and buyer guides directly to senior executives.',
    link: '/content-syndication',
    tag: 'ASSET SYNDICATION',
    visualColor: '#F59E0B',
    accentText: 'Targeted Reader Engagement',
  },
  {
    num: '08',
    name: 'B2B Webinar Services',
    category: 'Live Engagement',
    desc: 'Turnkey webinar registration acquisition, attendee qualification, and rapid post-event sales acceleration.',
    link: '/webinar-services',
    tag: 'LIVE EVENTS',
    visualColor: '#EC4899',
    accentText: 'High Attendee Conversion',
  },
  {
    num: '09',
    name: 'Lead Nurturing Services',
    category: 'Pipeline Lifecycle',
    desc: 'Multi-touch automated workflows that keep long-cycle enterprise prospects engaged until commercial purchase readiness.',
    link: '/lead-nurturing',
    tag: 'NURTURE CADENCES',
    visualColor: '#10B981',
    accentText: 'Reactivating Stale CRM Leads',
  },
  {
    num: '10',
    name: 'Demand Generation',
    category: 'Full-Funnel Engine',
    desc: 'Holistic revenue programs driving predictable buyer awareness, account intent, and sales velocity.',
    link: '/demand-generation',
    tag: 'REVENUE ENGINE',
    visualColor: '#F43F5E',
    accentText: 'Predictable Monthly Pipeline',
  },
  {
    num: '11',
    name: 'B2B List Building',
    category: 'Data Sourcing',
    desc: 'Custom-mined prospect directories calibrated precisely to your firmographic and technographic ICP.',
    link: '/b2b-list-building',
    tag: 'CUSTOM DATA',
    visualColor: '#06B6D4',
    accentText: 'Direct Dials & Mobile Verified',
  },
  {
    num: '12',
    name: 'Database Cleansing & Enrichment',
    category: 'Data Operations',
    desc: 'Auditing, deduplicating, and enriching legacy CRM data with verified stakeholder information and SLA accuracy.',
    link: '/database-cleansing',
    tag: 'HYGIENE SLA',
    visualColor: '#8B5CF6',
    accentText: '99.8% Data Accuracy SLA',
  },
  {
    num: '13',
    name: 'High-Quality Leads (HQL)',
    category: 'Precision Verification',
    desc: 'Double-vetted leads combining intent telemetry, firmographic filters, and telephone confirmation.',
    link: '/hql-services',
    tag: 'VERIFIED LEADS',
    visualColor: '#34D399',
    accentText: 'Human-in-the-Loop Verified',
  },
]

export default function ServiceDirectoryInteractive() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const activeItem = DIRECTORY_SERVICES[activeIndex]

  return (
    <section
      id="service-directory"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Built Around Your Growth Goals — Interactive Service Navigation"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* ══ Editorial Section Header ══ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>INTERACTIVE DIRECTORY</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              Built Around Your{' '}
              <span className="font-light italic">Growth Goals.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-sm sm:text-base max-w-md font-normal"
            style={{ color: isDark ? '#94A3B8' : '#6B7280' }}
          >
            Hover or tap any service to preview its methodology, key deliverables, and direct route. Only one capability dominates focus at a time.
          </motion.p>
        </div>

        {/* ══ Agency-Style Interactive Split Directory ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: 13 Interactive Vertical Service Rows */}
          <div className="lg:col-span-7 divide-y" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
            {DIRECTORY_SERVICES.map((srv, idx) => {
              const isActive = activeIndex === idx

              return (
                <div
                  key={srv.num}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="py-4 sm:py-5 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className="font-mono text-xs sm:text-sm font-bold transition-colors duration-300"
                        style={{
                          color: isActive
                            ? srv.visualColor
                            : isDark ? '#52525B' : '#A1A1AA',
                        }}
                      >
                        {srv.num}
                      </span>

                      <Link
                        to={srv.link}
                        className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight transition-all duration-300"
                        style={{
                          color: isActive
                            ? isDark ? '#FFFFFF' : '#0B0F19'
                            : isDark ? '#71717A' : '#9CA3AF',
                          transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                        }}
                      >
                        {srv.name}
                      </Link>
                    </div>

                    <div className="flex items-center gap-3">
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="hidden sm:inline-block font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${srv.visualColor}18`,
                            color: srv.visualColor,
                            border: `1px solid ${srv.visualColor}35`,
                          }}
                        >
                          {srv.tag}
                        </motion.span>
                      )}

                      <Link
                        to={srv.link}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isActive
                            ? srv.visualColor
                            : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                          color: isActive ? '#FFFFFF' : isDark ? '#71717A' : '#9CA3AF',
                          transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                        aria-label={`View ${srv.name}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Inline description expanded on mobile or active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="lg:hidden pt-3 text-xs sm:text-sm"
                        style={{ color: isDark ? '#94A3B8' : '#6B7280' }}
                      >
                        {srv.desc}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Floating Active Service Telemetry & Visual Preview (Sticky on desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-3xl p-8 sm:p-10 border backdrop-blur-2xl relative overflow-hidden"
                style={{
                  backgroundColor: isDark ? 'rgba(12, 16, 26, 0.85)' : 'rgba(250, 251, 253, 0.95)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                  boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 20px 40px -12px rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Visual Accent Glow Top */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${activeItem.visualColor}, transparent)` }}
                />

                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-black" style={{ color: activeItem.visualColor }}>
                    {activeItem.num}
                  </span>
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${activeItem.visualColor}18`,
                      color: activeItem.visualColor,
                      border: `1px solid ${activeItem.visualColor}35`,
                    }}
                  >
                    {activeItem.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                  {activeItem.name}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed mb-8 font-normal" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
                  {activeItem.desc}
                </p>

                {/* Key Deliverable Highlight Pill */}
                <div
                  className="p-4 rounded-2xl mb-8 flex items-center justify-between text-xs font-mono font-bold"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <span style={{ color: isDark ? '#A1A1AA' : '#52525B' }}>KEY IMPACT</span>
                  <span style={{ color: activeItem.visualColor }}>{activeItem.accentText}</span>
                </div>

                {/* Direct Custom Action Button */}
                <TarajButton to={activeItem.link} variant="primary" size="md">
                  Explore {activeItem.name}
                </TarajButton>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
