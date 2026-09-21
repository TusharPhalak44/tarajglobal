import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import TarajButton from './TarajButton'

const SHOWCASE_SERVICES = [
  {
    num: '01',
    title: 'Sales Qualified Leads (SQL)',
    tagline: 'High-Intent Commercial Pipeline',
    desc: 'Bypass the tire-kickers. We identify, engage, and gate decision-makers actively evaluating solutions in your market. Every lead is verified for ICP fit, buying authority, and commercial project urgency.',
    deliverables: ['100% ICP Calibration', 'Direct Phone & Email Verification', 'Commercial Intent Telemetry'],
    link: '/sql-services',
    accentColor: '#00A6FF',
    accentGradient: 'from-sky-500/20 to-blue-600/5',
    visualBadge: 'TIER-1 SQL DELIVERY',
    kpi: '3.8x Sales Velocity Lift',
  },
  {
    num: '02',
    title: 'Account-Based Marketing (ABM)',
    tagline: 'Precision 1-to-1 Enterprise Acceleration',
    desc: 'Align marketing and sales around your highest-value target accounts. We orchestrate personalized digital air-cover, bespoke content, and stakeholder relationship mapping across executive buying committees.',
    deliverables: ['Buying Committee Mapping', 'Custom Content Air-Cover', 'Multi-Touch Engagement Cadences'],
    link: '/abm',
    accentColor: '#8B5CF6',
    accentGradient: 'from-purple-500/20 to-indigo-600/5',
    visualBadge: 'KEY ACCOUNTS ORCHESTRATION',
    kpi: '85% Target Account Penetration',
  },
  {
    num: '03',
    title: 'B2B Appointment Setting',
    tagline: 'Confirmed Sales Meetings on Your Calendar',
    desc: 'Free your sales team to focus on closing deals. Our team engages your target prospects across phone, email, and social to schedule confirmed, qualified discovery meetings directly into your sales reps’ calendars.',
    deliverables: ['Direct Calendar Placements', 'Comprehensive Account Dossiers', 'Strict Zero No-Show SLA'],
    link: '/b2b-appointment-setting',
    accentColor: '#FF6D00',
    accentGradient: 'from-orange-500/20 to-amber-600/5',
    visualBadge: 'CONFIRMED DISCOVERY CALLS',
    kpi: 'Zero No-Show Guarantee',
  },
  {
    num: '04',
    title: 'Demand Generation Engine',
    tagline: 'Full-Funnel Predictable Pipeline Velocity',
    desc: 'Build an unstoppable inbound and outbound revenue engine. We bring together content syndication, intent-driven outreach, and data hygiene to create consistent, scalable demand month after month.',
    deliverables: ['Omnichannel Inbound & Outbound', 'Targeted Whitepaper Syndication', 'Continuous Pipeline Attribution'],
    link: '/demand-generation',
    accentColor: '#10B981',
    accentGradient: 'from-emerald-500/20 to-teal-600/5',
    visualBadge: 'SUSTAINABLE REVENUE ENGINE',
    kpi: '2,100+ Campaigns Executed',
  },
]

export default function AsymmetricServiceShowcase() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Flagship B2B Capabilities — Asymmetric Showcase"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="max-w-3xl mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>FLAGSHIP CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Engineered for{' '}
            <span className="font-light italic">Revenue Impact.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed"
            style={{ color: isDark ? '#94A3B8' : '#6B7280' }}
          >
            Explore our core growth pillars. Each solution functions as a modular accelerator or as part of a synchronized revenue program.
          </motion.p>
        </div>

        {/* Asymmetric Alternating Split Rows */}
        <div className="space-y-28 lg:space-y-40">
          {SHOWCASE_SERVICES.map((srv, idx) => {
            const isImageLeft = idx % 2 === 1

            return (
              <div
                key={srv.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Visual Graphic Block (Swaps position based on odd/even) */}
                <div
                  className={`lg:col-span-6 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border backdrop-blur-xl"
                    style={{
                      backgroundColor: isDark ? 'rgba(12, 16, 26, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                      boxShadow: isDark
                        ? `0 30px 60px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                        : `0 30px 60px -20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)`,
                    }}
                  >
                    {/* Background Subtle Gradient Mesh */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 70% 30%, ${srv.accentColor}25 0%, transparent 70%)`,
                      }}
                    />

                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between mb-12 relative z-10">
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${srv.accentColor}18`,
                          color: srv.accentColor,
                          border: `1px solid ${srv.accentColor}35`,
                        }}
                      >
                        {srv.visualBadge}
                      </span>
                      <span
                        className="font-mono text-4xl sm:text-5xl font-black opacity-30"
                        style={{ color: srv.accentColor }}
                      >
                        {srv.num}
                      </span>
                    </div>

                    {/* Big KPI Metric */}
                    <div className="relative z-10 my-8">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1" style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
                        PROVEN PERFORMANCE
                      </span>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                        {srv.kpi}
                      </div>
                    </div>

                    {/* Deliverable Checkmarks */}
                    <div className="space-y-3 relative z-10 pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
                      {srv.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium" style={{ color: isDark ? '#D4D4D8' : '#374151' }}>
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: srv.accentColor }} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Text Content Block */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-widest block mb-2"
                      style={{ color: srv.accentColor }}
                    >
                      {srv.tagline}
                    </span>

                    <h3
                      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6"
                      style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                    >
                      {srv.title}
                    </h3>

                    <p
                      className="text-base sm:text-lg leading-relaxed mb-8 font-normal"
                      style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
                    >
                      {srv.desc}
                    </p>

                    <TarajButton to={srv.link} variant="primary" size="md">
                      Learn More About {srv.title}
                    </TarajButton>
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
