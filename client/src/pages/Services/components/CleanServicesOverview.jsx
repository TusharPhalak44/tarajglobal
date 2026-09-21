import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Layers, Flame, Target, ChevronRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CleanServicesOverview — 02 SERVICES OVERVIEW
 * Structured service navigation divided into 3 clean category containers:
 * - Category 01: Lead Generation (5 services)
 * - Category 02: Demand & Engagement (5 services)
 * - Category 03: Account & Sales (2 services + Strategic consultation)
 * Clean text rows with 4px shift, arrow reveal, and underline animation on hover.
 */

const CATEGORIES = [
  {
    id: 'lead-gen',
    num: 'CATEGORY 01',
    name: 'Lead Generation',
    tagline: 'High-intent qualified prospecting',
    icon: Layers,
    services: [
      { name: 'B2B Lead Generation', path: '/sql-services', desc: 'Precision sales-ready accounts & confirmed exploratory meetings' },
      { name: 'BANT Lead Generation', path: '/bant-lead-generation', desc: 'Pre-screened against budget, authority, need, and timeframe' },
      { name: 'MQL Services', path: '/mql-services', desc: 'High-intent top-funnel prospects actively consuming your content' },
      { name: 'B2B List Building', path: '/b2b-list-building', desc: 'Custom verified ICP contacts built to exact technographic criteria' },
      { name: 'Database Cleansing', path: '/database-cleansing', desc: 'Deduplication, SMTP verification, and data enrichment' },
    ],
  },
  {
    id: 'demand-engagement',
    num: 'CATEGORY 02',
    name: 'Demand & Engagement',
    tagline: 'Market awareness & multi-touch nurture',
    icon: Flame,
    services: [
      { name: 'Demand Generation', path: '/demand-generation', desc: 'Comprehensive full-funnel buyer acquisition campaigns' },
      { name: 'Content Syndication', path: '/content-syndication', desc: 'Distribute whitepapers & technical guides to targeted stakeholders' },
      { name: 'B2B Email Marketing', path: '/b2b-email-marketing', desc: 'Personalized cold outbound sequences with high reply rates' },
      { name: 'Lead Nurturing', path: '/lead-nurturing', desc: 'Multi-touch educational workflows that warm cool prospects' },
      { name: 'Webinar Services', path: '/webinar-services', desc: 'End-to-end registrant acquisition and live attendee engagement' },
    ],
  },
  {
    id: 'account-sales',
    num: 'CATEGORY 03',
    name: 'Account & Sales',
    tagline: 'Tier-1 enterprise acceleration',
    icon: Target,
    services: [
      { name: 'Account-Based Marketing', path: '/abm', desc: 'Hyper-personalized multi-channel orchestration for Tier-1 accounts' },
      { name: 'B2B Appointment Setting', path: '/b2b-appointment-setting', desc: 'Guaranteed calendar bookings directly with executive decision-makers' },
    ],
  },
]

export default function CleanServicesOverview() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredService, setHoveredService] = useState(null)

  return (
    <section
      id="services-overview"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#080A0E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
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
              02 // SERVICES OVERVIEW
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Everything You Need to Build a{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Stronger Pipeline
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Our solutions are structured across three interconnected capabilities—delivering targeted intelligence, continuous market engagement, and closed-won sales appointments.
          </p>
        </div>

        {/* 3 Clean Category Containers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {CATEGORIES.map((category) => {
            const Icon = category.icon

            return (
              <div
                key={category.id}
                className="rounded-2xl border p-6 sm:p-8 flex flex-col h-full transition-all duration-300"
                style={{
                  backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  boxShadow: isDark
                    ? '0 4px 20px -2px rgba(0, 0, 0, 0.4)'
                    : '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
                }}
              >
                {/* Category Header */}
                <div className="pb-6 mb-6 border-b"
                  style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-xs font-semibold tracking-widest uppercase"
                      style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                    >
                      {category.num}
                    </span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{
                        backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                        borderColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)',
                        color: isDark ? '#38BDF8' : '#0284C7',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5"
                    style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                  >
                    {category.name}
                  </h3>
                  <p
                    className="text-xs sm:text-sm font-normal"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {category.tagline}
                  </p>
                </div>

                {/* Service Text Rows */}
                <div className="space-y-1.5 flex-1">
                  {category.services.map((service) => {
                    const isHovered = hoveredService === service.path

                    return (
                      <Link
                        key={service.path}
                        to={service.path}
                        onMouseEnter={() => setHoveredService(service.path)}
                        onMouseLeave={() => setHoveredService(null)}
                        className="group relative block p-3 rounded-xl transition-all duration-200"
                        style={{
                          backgroundColor: isHovered
                            ? isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)'
                            : 'transparent',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-sm font-semibold tracking-tight transition-transform duration-200 group-hover:translate-x-1"
                                style={{
                                  color: isHovered
                                    ? isDark ? '#38BDF8' : '#0284C7'
                                    : isDark ? '#E2E8F0' : '#1E293B',
                                }}
                              >
                                {service.name}
                              </span>
                            </div>
                            <p
                              className="text-xs font-normal mt-0.5 line-clamp-1"
                              style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                            >
                              {service.desc}
                            </p>
                          </div>

                          <ArrowRight
                            className={`w-4 h-4 transition-all duration-200 shrink-0 ${
                              isHovered
                                ? 'opacity-100 translate-x-1'
                                : 'opacity-30 -translate-x-1'
                            }`}
                            style={{
                              color: isHovered
                                ? isDark ? '#38BDF8' : '#0284C7'
                                : isDark ? '#64748B' : '#94A3B8',
                            }}
                          />
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Bottom subtle count */}
                <div
                  className="pt-4 mt-4 border-t flex items-center justify-between text-xs"
                  style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' }}
                >
                  <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                    Capabilities Included
                  </span>
                  <span
                    className="font-mono font-medium"
                    style={{ color: isDark ? '#94A3B8' : '#475569' }}
                  >
                    0{category.services.length} Dedicated Workflows
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
