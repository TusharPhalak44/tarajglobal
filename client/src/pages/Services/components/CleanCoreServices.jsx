import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Target, TrendingUp } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CleanCoreServices — 03 CORE SERVICES
 * 3 Large featured blocks highlighting the core services:
 * - 01 B2B Lead Generation
 * - 02 Account-Based Marketing
 * - 03 Demand Generation
 * Alternating image position (Left-Right, Right-Left, Left-Right)
 * Clean image cropping, thin borders, subtle rounded corners, 1 -> 1.04 zoom on hover, and overlay labels.
 */

const CORE_SERVICES = [
  {
    num: '01',
    title: 'B2B Lead Generation',
    tagline: 'Precision Prospecting & Qualified Pipeline',
    description: 'Find the right companies and decision-makers with targeted B2B prospecting. We combine verified phone/email telemetry with dual-channel qualification to book meetings that convert.',
    link: '/sql-services',
    image: '/sql-lead-qualification-journey.jpg',
    overlayLabel: 'VERIFIED PIPELINE SLA',
    stats: [
      { label: 'Show-Rate Guarantee', val: '85%+' },
      { label: 'Data Accuracy', val: '99.8%' },
    ],
  },
  {
    num: '02',
    title: 'Account-Based Marketing',
    tagline: 'High-Value Account Engagement',
    description: 'Engage high-value accounts with focused, personalized campaigns. Align your marketing and sales teams around dedicated Tier-1 accounts to drive larger deal sizes and faster executive consensus.',
    link: '/abm',
    image: '/enterprise-audience.jpg',
    overlayLabel: 'TIER-1 ICP ORCHESTRATION',
    stats: [
      { label: 'Buying Committee Reach', val: '6.8 Stakeholders' },
      { label: 'Pipeline Velocity', val: '2.8x Faster' },
    ],
  },
  {
    num: '03',
    title: 'Demand Generation',
    tagline: 'Full-Funnel Demand & Opportunity Velocity',
    description: 'Create awareness, engagement and qualified opportunities across the funnel. Build sustained buyer interest with multi-touch content syndication, email workflows, and intent monitoring.',
    link: '/demand-generation',
    image: '/demandflow-campaigns.png',
    overlayLabel: 'SUSTAINED BUYER INTENT',
    stats: [
      { label: 'Monthly SQLs', val: '2,100+' },
      { label: 'Global Reach', val: '16+ Sectors' },
    ],
  },
]

export default function CleanCoreServices() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="core-services"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#0A0C10' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
            />
            <span
              className="font-mono text-xs font-semibold tracking-wider uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              03 // CORE CAPABILITIES
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Engineered For{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Revenue Growth
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Three flagship growth pillars designed for enterprise B2B teams requiring predictability, rigorous lead qualification, and transparent sales execution.
          </p>
        </div>

        {/* 3 Large Featured Blocks with Alternating Layout */}
        <div className="space-y-20 lg:space-y-28">
          {CORE_SERVICES.map((service, index) => {
            const isReversed = index % 2 === 1

            return (
              <div
                key={service.num}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:col-start-7' : ''
                  }`}
                >
                  {/* Large Number */}
                  <span
                    className="font-mono text-3xl sm:text-4xl font-bold block mb-4"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    {service.num}
                  </span>

                  {/* Large Heading */}
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3"
                    style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-xs sm:text-sm font-mono font-medium uppercase tracking-wider mb-4"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {service.tagline}
                  </p>

                  <p
                    className="text-base sm:text-lg leading-relaxed font-normal mb-8"
                    style={{ color: isDark ? '#CBD5E1' : '#475569' }}
                  >
                    {service.description}
                  </p>

                  {/* Quick Stat Pill Highlights */}
                  <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t"
                    style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)' }}
                  >
                    {service.stats.map((stat, i) => (
                      <div key={i}>
                        <div
                          className="font-mono text-xl sm:text-2xl font-bold"
                          style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                        >
                          {stat.val}
                        </div>
                        <div
                          className="text-xs font-medium"
                          style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <Link
                    to={service.link}
                    className="group inline-flex items-center gap-2 font-medium text-sm sm:text-base transition-colors"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    <span className="relative">
                      Learn More
                      <span
                        className="absolute bottom-0 left-0 w-full h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                        style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
                      />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:col-start-1' : ''
                  }`}
                >
                  <Link
                    to={service.link}
                    className="group block relative rounded-2xl overflow-hidden border shadow-sm transition-all duration-300"
                    style={{
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                      backgroundColor: isDark ? '#11151F' : '#F1F5F9',
                    }}
                  >
                    {/* Clean Image with 1 -> 1.04 hover zoom */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />

                      {/* Subtle Vignette Gradient Overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity group-hover:opacity-30"
                        style={{
                          background: isDark
                            ? 'linear-gradient(to top, rgba(10, 12, 16, 0.8) 0%, transparent 60%)'
                            : 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 60%)',
                        }}
                      />

                      {/* Small Overlay Label */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase border backdrop-blur-md"
                          style={{
                            backgroundColor: isDark ? 'rgba(10, 12, 16, 0.75)' : 'rgba(255, 255, 255, 0.85)',
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                            color: isDark ? '#FFFFFF' : '#0B0F19',
                          }}
                        >
                          // {service.overlayLabel}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
