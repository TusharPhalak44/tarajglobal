import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { MagneticPrimaryButton } from './GrowthJourneyButtons'

const SERVICES = [
  {
    num: '01',
    name: 'B2B Lead Generation',
    desc: 'Connecting sales teams with verified decision-makers actively evaluating commercial solutions.',
    tag: 'HIGH INTENT PIPELINE',
    link: '/sql-services',
    color: '#00A6FF',
    previewImage: '/sql-lead-qualification-journey.jpg',
    metric: '42% Average Conversion Lift',
  },
  {
    num: '02',
    name: 'BANT Lead Generation',
    desc: 'Deep commercial qualification gating across Budget, Authority, Need, and Timeline parameters.',
    tag: 'STRICT GATING',
    link: '/bant-lead-generation',
    color: '#FFA600',
    previewImage: '/bant-lead-qualification-journey.jpg',
    metric: 'Zero Wasted Calls',
  },
  {
    num: '03',
    name: 'MQL Services',
    desc: 'Targeting and scoring enterprise prospects actively engaging with technical collateral and reports.',
    tag: 'MID-FUNNEL VELOCITY',
    link: '/mql-services',
    color: '#38BDF8',
    previewImage: '/demandflow-tracking.png',
    metric: 'Real-Time Intent Telemetry',
  },
  {
    num: '04',
    name: 'B2B Appointment Setting',
    desc: 'Confirmed, qualified sales discovery meetings booked directly into your account executives’ calendars.',
    tag: 'SALES-READY MEETINGS',
    link: '/b2b-appointment-setting',
    color: '#FF6D00',
    previewImage: '/b2b-appointment-setting-journey.jpg',
    metric: 'Zero No-Show Guarantee',
  },
  {
    num: '05',
    name: 'B2B Email Marketing',
    desc: 'Targeted cold email outreach with dedicated domain warming, custom copywriting, and high inbox delivery.',
    tag: 'OUTBOUND INFRASTRUCTURE',
    link: '/b2b-email-marketing',
    color: '#60A5FA',
    previewImage: '/b2b-email-marketing-journey.jpg',
    metric: '99.8% Inbox Deliverability',
  },
  {
    num: '06',
    name: 'Account-Based Marketing',
    desc: 'Full-funnel bespoke marketing programs tailored around your highest-value enterprise target accounts.',
    tag: 'ENTERPRISE 1-TO-1',
    link: '/abm',
    color: '#A78BFA',
    previewImage: '/enterprise-audience.jpg',
    metric: 'Buying Committee Penetration',
  },
  {
    num: '07',
    name: 'Content Syndication',
    desc: 'Distributing whitepapers, research reports, and buyer guides to decision-makers across partner channels.',
    tag: 'TOP-FUNNEL REACH',
    link: '/content-syndication',
    color: '#F59E0B',
    previewImage: '/demandflow-campaigns.png',
    metric: 'Targeted Asset Syndication',
  },
  {
    num: '08',
    name: 'Webinar Services',
    desc: 'End-to-end webinar attendee acquisition, registration qualification, and rapid post-event follow-up.',
    tag: 'LIVE ENGAGEMENT',
    link: '/webinar-services',
    color: '#EC4899',
    previewImage: '/it-audience.jpg',
    metric: 'High Attendee Conversion',
  },
  {
    num: '09',
    name: 'Lead Nurturing',
    desc: 'Systematic multi-touch workflows that re-engage stale prospects and warm cold leads until purchase readiness.',
    tag: 'PIPELINE LIFECYCLE',
    link: '/lead-nurturing',
    color: '#10B981',
    previewImage: '/b2b-lead-nurturing-journey.jpg',
    metric: 'Reactivating Stale CRM Records',
  },
  {
    num: '10',
    name: 'Demand Generation',
    desc: 'End-to-end demand engine creating sustainable pipeline velocity across every touchpoint of the buyer journey.',
    tag: 'FULL-FUNNEL ENGINE',
    link: '/demand-generation',
    color: '#F43F5E',
    previewImage: '/demandflow-personalization.png',
    metric: 'Predictable Monthly Pipeline',
  },
  {
    num: '11',
    name: 'B2B List Building',
    desc: 'Bespoke contact discovery tailored specifically to your ideal customer profile with direct phone and email records.',
    tag: 'CUSTOM DATA MINING',
    link: '/b2b-list-building',
    color: '#06B6D4',
    previewImage: '/engine-data.jpg',
    metric: 'Verified Direct Dials & Mobile',
  },
  {
    num: '12',
    name: 'Database Cleansing',
    desc: 'Revitalize and enrich outdated CRM records, remove decay, and restore email deliverability with verified data.',
    tag: 'DATA HYGIENE SLA',
    link: '/database-cleansing',
    color: '#8B5CF6',
    previewImage: '/engine-strategy.jpg',
    metric: '99.8% Data Accuracy SLA',
  },
  {
    num: '13',
    name: 'High-Quality Leads (HQL)',
    desc: 'Double-vetted leads combining intent telemetry, firmographic criteria, and direct telephone confirmation.',
    tag: 'PRECISION VERIFICATION',
    link: '/hql-services',
    color: '#34D399',
    previewImage: '/saas-audience.jpg',
    metric: 'Human-in-the-Loop Verified',
  },
]

export default function JourneyServiceDiscovery() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const current = SERVICES[activeIdx]

  return (
    <section
      id="service-discovery"
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-b"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="How We Help You Grow — Interactive Service Discovery"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ══ LEFT: Sticky Heading & Agency Context ══ */}
          <div className="lg:col-span-5 lg:sticky top-32">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>SERVICE DIRECTORY</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
            >
              How We Help{' '}
              <span className="font-light italic block mt-1">
                You Grow.
              </span>
            </motion.h2>

            <p className="text-base sm:text-lg leading-relaxed mb-8 font-normal" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
              Every growth program is tailored to your target accounts, sales cycle length, and quota expectations. Hover over any capability to preview how it fuels your revenue engine.
            </p>

            {/* Floating Visual Preview Card for Active Service (Desktop) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="hidden lg:block rounded-3xl p-6 border backdrop-blur-xl relative overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: isDark ? 'rgba(12, 16, 26, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Visual Image Preview */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
                  <img
                    src={current.previewImage}
                    alt={current.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span
                    className="absolute bottom-3 left-3 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md"
                    style={{ backgroundColor: `${current.color}30`, color: '#FFFFFF' }}
                  >
                    {current.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                  <span style={{ color: current.color }}>KEY OUTCOME</span>
                  <span style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}>{current.metric}</span>
                </div>

                <p className="text-xs leading-relaxed mb-5" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
                  {current.desc}
                </p>

                <MagneticPrimaryButton to={current.link} className="!py-2.5 !px-5 !text-xs">
                  EXPLORE {current.name.toUpperCase()}
                </MagneticPrimaryButton>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ══ RIGHT: Large Horizontal Interactive Service Rows ══ */}
          <div className="lg:col-span-7 divide-y" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
            {SERVICES.map((srv, idx) => {
              const isActive = activeIdx === idx

              return (
                <div
                  key={srv.num}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="py-5 sm:py-6 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className="font-mono text-sm sm:text-base font-bold transition-all duration-300"
                        style={{
                          color: isActive ? srv.color : isDark ? '#52525B' : '#A1A1AA',
                          transform: isActive ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >
                        {srv.num}
                      </span>

                      <Link
                        to={srv.link}
                        className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-300"
                        style={{
                          color: isActive
                            ? isDark ? '#FFFFFF' : '#080A0F'
                            : isDark ? '#71717A' : '#9CA3AF',
                          transform: isActive ? 'translateX(10px)' : 'translateX(0)',
                        }}
                      >
                        {srv.name}
                      </Link>
                    </div>

                    <Link
                      to={srv.link}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                      style={{
                        backgroundColor: isActive
                          ? srv.color
                          : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                        color: isActive ? '#FFFFFF' : isDark ? '#71717A' : '#9CA3AF',
                        transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                      aria-label={`Learn more about ${srv.name}`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* Mobile expansion when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="lg:hidden pt-4"
                      >
                        <p className="text-sm leading-relaxed mb-3" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
                          {srv.desc}
                        </p>
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span style={{ color: srv.color }}>{srv.metric}</span>
                          <Link to={srv.link} className="underline" style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}>
                            View Service Details →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
