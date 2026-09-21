import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Layers, Flame, Target } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CommandTextLink } from './CommandButtons'

/**
 * CommandCategorySelector — 03 SERVICE CATEGORY SELECTOR
 * Three large category tabs:
 * 01 GENERATE
 * 02 ENGAGE
 * 03 CONVERT
 * Smooth animated content switching using fade, slide, scale.
 */

const CATEGORY_DATA = [
  {
    id: 'generate',
    num: '01',
    tabName: 'GENERATE',
    heading: 'Build & Qualify High-Intent Demand',
    tagline: 'Precision prospecting and data intelligence to fuel top-of-funnel pipeline.',
    icon: Layers,
    services: [
      {
        name: 'B2B Lead Generation',
        path: '/sql-services',
        desc: 'Precision sales-ready accounts and confirmed exploratory meetings with vetted decision-makers.',
        tag: 'SQL SLA',
      },
      {
        name: 'BANT Lead Generation',
        path: '/bant-lead-generation',
        desc: 'Prospects screened across verified Budget, Authority, Need, and Timeline parameters.',
        tag: '4-Point Qualified',
      },
      {
        name: 'MQL Services',
        path: '/mql-services',
        desc: 'Identify and qualify prospects demonstrating active commercial interest in your technical assets.',
        tag: 'Intent Scored',
      },
      {
        name: 'B2B List Building',
        path: '/b2b-list-building',
        desc: 'Custom-built contact registries matched precisely to your company firmographics and ICP.',
        tag: '100% Custom Data',
      },
      {
        name: 'Database Cleansing',
        path: '/database-cleansing',
        desc: 'Eliminate dead records, SMTP bounce-backs, and CRM duplicate contacts with automated verification.',
        tag: 'CRM Health',
      },
    ],
  },
  {
    id: 'engage',
    num: '02',
    tabName: 'ENGAGE',
    heading: 'Multi-Touch Nurturing & Outreach',
    tagline: 'Build authority, spark engagement, and keep buying committees warmed.',
    icon: Flame,
    services: [
      {
        name: 'B2B Email Marketing',
        path: '/b2b-email-marketing',
        desc: 'Hyper-personalized cold email sequences that bypass spam filters and land in the priority inbox.',
        tag: '99.8% Deliverability',
      },
      {
        name: 'Content Syndication',
        path: '/content-syndication',
        desc: 'Syndicate your whitepapers, case studies, and eBooks to targeted technology decision-makers.',
        tag: 'Guaranteed Reads',
      },
      {
        name: 'Webinar Services',
        path: '/webinar-services',
        desc: 'Comprehensive attendee acquisition and post-event qualification for enterprise webinars.',
        tag: 'Full Audience Cycle',
      },
      {
        name: 'Lead Nurturing',
        path: '/lead-nurturing',
        desc: 'Automated multi-channel education workflows that guide lukewarm leads toward sales readiness.',
        tag: 'Continuous Touch',
      },
    ],
  },
  {
    id: 'convert',
    num: '03',
    tabName: 'CONVERT',
    heading: 'Sales Appointments & Revenue Acceleration',
    tagline: 'Convert target accounts into booked calendar meetings and predictable ARR.',
    icon: Target,
    services: [
      {
        name: 'B2B Appointment Setting',
        path: '/b2b-appointment-setting',
        desc: 'Confirmed, high-impact introductory and technical discovery calls scheduled on your sales calendars.',
        tag: 'Guaranteed Show-Rates',
      },
      {
        name: 'Account-Based Marketing',
        path: '/abm',
        desc: 'Dedicated 1:1 and 1:few multi-channel campaigns engineered specifically for enterprise Tier-1 accounts.',
        tag: 'Tier-1 Penetration',
      },
      {
        name: 'Demand Generation',
        path: '/demand-generation',
        desc: 'Holistic full-funnel demand creation engines driving qualified opportunities across all quarters.',
        tag: 'Full-Funnel Motion',
      },
    ],
  },
]

export default function CommandCategorySelector() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState('generate')

  const currentCategory = CATEGORY_DATA.find((c) => c.id === activeTab) || CATEGORY_DATA[0]

  return (
    <section
      id="category-selector"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
          />
          <span
            className="font-mono text-xs font-semibold tracking-wider uppercase"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            03 // GROWTH MOTION SELECTOR
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-12"
          style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
        >
          Select Your Pipeline Objective
        </h2>

        {/* 3 Large Category Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {CATEGORY_DATA.map((cat) => {
            const isActive = activeTab === cat.id
            const Icon = cat.icon

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isActive ? 'shadow-md' : 'opacity-80 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive
                    ? isDark ? '#111622' : '#F8FAFC'
                    : isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                  >
                    {cat.num}
                  </span>
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                  />
                </div>

                <h3
                  className="font-mono text-xl sm:text-2xl font-black tracking-wider uppercase mb-1"
                  style={{ color: isActive ? (isDark ? '#FFFFFF' : '#0B0F19') : (isDark ? '#94A3B8' : '#475569') }}
                >
                  {cat.tabName}
                </h3>

                <p
                  className="text-xs font-normal"
                  style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                >
                  {cat.tagline}
                </p>
              </button>
            )
          })}
        </div>

        {/* Animated Service Cards Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border p-6 sm:p-10"
            style={{
              backgroundColor: isDark ? '#0D1117' : '#FAFBFD',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="mb-8 pb-6 border-b flex flex-wrap items-center justify-between gap-4"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
            >
              <div>
                <h4
                  className="text-xl sm:text-2xl font-bold tracking-tight mb-1"
                  style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                >
                  {currentCategory.heading}
                </h4>
                <p
                  className="text-xs sm:text-sm font-normal"
                  style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                >
                  {currentCategory.services.length} Specialized Workflows in this motion
                </p>
              </div>

              <span
                className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase border"
                style={{
                  backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                  borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.2)',
                  color: isDark ? '#38BDF8' : '#0284C7',
                }}
              >
                // ACTIVE MOTION: {currentCategory.tabName}
              </span>
            </div>

            {/* Grid of services in this category */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory.services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="p-5 rounded-xl border transition-all duration-200 group flex flex-col justify-between"
                  style={{
                    backgroundColor: isDark ? '#111622' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h5
                        className="font-bold text-base transition-colors group-hover:text-sky-500"
                        style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                      >
                        {service.name}
                      </h5>
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 border"
                        style={{
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                          color: isDark ? '#94A3B8' : '#64748B',
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>

                    <p
                      className="text-xs sm:text-sm font-normal leading-relaxed mb-4"
                      style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                    >
                      {service.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider mt-auto"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    <span>EXPLORE SERVICE</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
