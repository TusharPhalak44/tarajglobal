import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const CAPABILITIES = [
  {
    num: '01',
    title: 'DEMAND GENERATION',
    category: 'PIPELINE CREATION',
    link: '/demand-generation',
    tagline: 'Multi-touch awareness & inbound intent capture',
  },
  {
    num: '02',
    title: 'LEAD GENERATION',
    category: 'HIGH-INTENT PROSPECTS',
    link: '/sql-services',
    tagline: 'Decision-maker identification & outbound engines',
  },
  {
    num: '03',
    title: 'QUALIFICATION',
    category: 'BANT & SQL CRITERIA',
    link: '/bant-lead-generation',
    tagline: 'Precision gating for sales-ready opportunities',
  },
  {
    num: '04',
    title: 'APPOINTMENT SETTING',
    category: 'CALENDAR CONVERSION',
    link: '/b2b-appointment-setting',
    tagline: 'Confirmed executive meetings on your sales calendar',
  },
  {
    num: '05',
    title: 'EMAIL MARKETING',
    category: 'DIRECT CADENCES',
    link: '/b2b-email-marketing',
    tagline: 'High-deliverability 1-on-1 personalized outreach',
  },
  {
    num: '06',
    title: 'ABM',
    category: 'TIER-1 ACCOUNTS',
    link: '/abm',
    tagline: 'Hyper-targeted account-based marketing orchestration',
  },
  {
    num: '07',
    title: 'CONTENT & WEBINARS',
    category: 'AUDIENCE NURTURE',
    link: '/content-syndication',
    tagline: 'Thought leadership syndication & digital summits',
  },
  {
    num: '08',
    title: 'LEAD NURTURING',
    category: 'PIPELINE VELOCITY',
    link: '/lead-nurturing',
    tagline: 'Re-engaging dormant leads into active opportunities',
  },
  {
    num: '09',
    title: 'DATA SOLUTIONS',
    category: 'INTELLIGENCE ACCURACY',
    link: '/database-cleansing',
    tagline: 'Cleanse, verify, and enrich B2B decision-maker data',
  },
]

export default function CapabilitiesStrip() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      id="capabilities-strip"
      className="relative py-20 lg:py-28 bg-background border-t border-b border-border/40 overflow-hidden"
      aria-label="One Engine. Many Capabilities."
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-[0.018] dark:opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#00A6FF 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>FULL CAPABILITY STACK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12] mb-4">
            One Engine.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Many Capabilities.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl">
            Every stage of your B2B growth journey requires the right combination of strategy, data, engagement and qualification.
          </p>
        </div>

        {/* Large Editorial Capabilities Strip (Not cards, pure typography with thin dividers) */}
        <div className="divide-y divide-border/60 border-t border-b border-border/60">
          {CAPABILITIES.map((cap, idx) => {
            const isHovered = hoveredIdx === idx
            return (
              <Link
                key={cap.num}
                to={cap.link}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative block py-5 sm:py-6 lg:py-7 transition-colors duration-300 select-none"
              >
                {/* Subtle Hover Highlight Stripe */}
                <motion.div
                  className="absolute inset-0 bg-primary/[0.03] dark:bg-primary/[0.05] pointer-events-none origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
                  {/* Left: Index & Main Typography */}
                  <div className="flex items-baseline sm:items-center gap-4 sm:gap-8">
                    {/* Index Number */}
                    <span className="font-mono text-xs sm:text-sm font-bold text-text-muted transition-colors duration-300 group-hover:text-primary">
                      {cap.num}
                    </span>

                    {/* Active Blue Indicator Dot */}
                    <div className="relative flex items-center justify-center w-2 h-2">
                      <span
                        className={`w-2 h-2 rounded-full bg-primary transition-all duration-300 ${
                          isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      />
                    </div>

                    {/* Main Title */}
                    <h3
                      className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-text-primary transition-all duration-300 ${
                        isHovered ? 'translate-x-2 text-primary dark:text-[#38BDF8]' : 'translate-x-0'
                      }`}
                    >
                      {cap.title}
                    </h3>
                  </div>

                  {/* Right: Category, Tagline & Outbound Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 pl-14 sm:pl-0">
                    <span className="text-xs sm:text-sm font-mono text-text-secondary hidden lg:inline-block">
                      {cap.tagline}
                    </span>

                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded bg-surface border border-border/80 text-text-muted group-hover:text-primary group-hover:border-primary/40 transition-colors duration-300">
                      {cap.category}
                    </span>

                    <div className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Animated Bottom Indicator Line on Hover */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-cta to-transparent transition-all duration-500 origin-left ${
                    isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
