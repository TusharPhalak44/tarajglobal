import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import { MagneticPrimaryButton } from './GrowthJourneyButtons'

const FEATURED_ITEMS = [
  {
    num: '01',
    title: 'B2B Lead Generation',
    tagline: 'Identify the right companies. Connect with the right decision-makers.',
    desc: 'Target high-intent B2B accounts actively searching for your solutions. We validate buying authority, verify direct dials, and eliminate wasted sales hours.',
    deliverables: ['100% Calibrated ICP', 'Human Phone-Verified Data', 'Real-Time Intent Telemetry'],
    image: '/sql-lead-qualification-journey.jpg',
    link: '/sql-services',
    color: '#00A6FF',
    kpi: '3.8x Meeting Conversion Rate',
  },
  {
    num: '02',
    title: 'Account-Based Marketing',
    tagline: 'Engage the accounts that matter most.',
    desc: 'Orchestrate precision 1-to-1 and 1-to-few campaigns across key accounts. We coordinate executive outreach, hyper-personalized content, and multi-channel air-cover.',
    deliverables: ['Buying Committee Mapping', 'Multi-Touch Air-Cover', 'Key Account Penetration'],
    image: '/enterprise-audience.jpg',
    link: '/abm',
    color: '#8B5CF6',
    kpi: '85% Target Account Penetration',
  },
  {
    num: '03',
    title: 'Demand Generation',
    tagline: 'Build awareness. Create demand. Generate opportunities.',
    desc: 'A full-funnel growth architecture uniting content syndication, automated nurturing, and precision targeting to build a sustainable, scalable revenue pipeline.',
    deliverables: ['Omnichannel Inbound & Outbound', 'Targeted Asset Syndication', 'Pipeline Velocity Attribution'],
    image: '/demandflow-campaigns.png',
    link: '/demand-generation',
    color: '#10B981',
    kpi: '2,100+ Campaigns Executed',
  },
  {
    num: '04',
    title: 'B2B Appointment Setting',
    tagline: 'Convert conversations into confirmed pipeline meetings.',
    desc: 'Free your account executives to focus entirely on closing. Our sales development specialists schedule confirmed discovery meetings directly onto your reps’ calendars.',
    deliverables: ['Direct Calendar Placements', 'Pre-Meeting Account Briefs', 'Zero No-Show Guarantee'],
    image: '/b2b-appointment-setting-journey.jpg',
    link: '/b2b-appointment-setting',
    color: '#FF6D00',
    kpi: 'Zero No-Show Guarantee',
  },
]

export default function JourneyFeaturedServices() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-b"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Featured Growth Pillars — Asymmetric Service Experiences"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="max-w-3xl mb-24 lg:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>CORE ACCELERATORS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] mb-6"
            style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
          >
            Featured Growth{' '}
            <span className="font-light italic block mt-1">
              Experiences.
            </span>
          </motion.h2>

          <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
            Four signature revenue frameworks designed for rapid deployment, high commercial predictability, and enterprise-grade scale.
          </p>
        </div>

        {/* 4 Asymmetric Alternating Showcase Experiences */}
        <div className="space-y-28 lg:space-y-40">
          {FEATURED_ITEMS.map((item, idx) => {
            const isImageLeft = idx % 2 === 1

            return (
              <div
                key={item.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Visual Image Block (Alternates left / right) */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-3xl overflow-hidden border backdrop-blur-xl shadow-2xl"
                    style={{
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {/* Big Editorial Image with Slow Zoom on Hover */}
                    <div className="relative w-full h-[360px] sm:h-[460px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: isDark
                            ? 'linear-gradient(to top, rgba(8, 10, 15, 0.9) 0%, rgba(8, 10, 15, 0.2) 60%, transparent 100%)'
                            : 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 60%, transparent 100%)',
                        }}
                      />
                    </div>

                    {/* Overlay Badges */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-1">
                          PROVEN PERFORMANCE
                        </span>
                        <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          {item.kpi}
                        </div>
                      </div>
                      <span
                        className="font-mono text-xs font-bold uppercase px-3 py-1.5 rounded-full backdrop-blur-md"
                        style={{
                          backgroundColor: `${item.color}25`,
                          color: '#FFFFFF',
                          border: `1px solid ${item.color}50`,
                        }}
                      >
                        STAGE 0{idx + 1}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Text Content Block */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Oversized Subtle Number */}
                    <span
                      className="font-mono text-6xl sm:text-7xl font-black block mb-4 opacity-25 leading-none"
                      style={{ color: item.color }}
                    >
                      {item.num}
                    </span>

                    <h3
                      className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
                      style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-sm sm:text-base font-semibold mb-4 leading-snug"
                      style={{ color: item.color }}
                    >
                      {item.tagline}
                    </p>

                    <p
                      className="text-sm sm:text-base leading-relaxed mb-6 font-normal"
                      style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
                    >
                      {item.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 mb-8">
                      {item.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium" style={{ color: isDark ? '#D4D4D8' : '#374151' }}>
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    <MagneticPrimaryButton to={item.link}>
                      EXPLORE {item.title.toUpperCase()}
                    </MagneticPrimaryButton>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
