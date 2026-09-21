import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Sparkles, TrendingUp, ChevronRight, Zap } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import CyberButton from './CyberButton'

const STAGES = [
  {
    num: '01',
    phase: 'TOP-OF-FUNNEL',
    title: 'CREATE DEMAND',
    subtitle: 'Capture Early Intent & Build Brand Recall',
    desc: 'Capture early buyer attention and establish brand authority across target accounts long before active buying cycles commence.',
    services: [
      { name: 'Demand Generation', link: '/demand-generation' },
      { name: 'List Building', link: '/b2b-list-building' },
      { name: 'Content Syndication', link: '/content-syndication' },
    ],
    color: '#00A6FF',
    accentGlow: 'rgba(0, 166, 255, 0.4)',
    icon: Sparkles,
  },
  {
    num: '02',
    phase: 'MID-FUNNEL',
    title: 'CREATE ENGAGEMENT',
    subtitle: 'Nurture & Activate Key Decision-Makers',
    desc: 'Foster meaningful 1-on-1 conversations through personalized direct email cadences, thought leadership webinars, and dedicated ABM air-cover.',
    services: [
      { name: 'Email Marketing', link: '/b2b-email-marketing' },
      { name: 'Webinars', link: '/webinar-services' },
      { name: 'ABM', link: '/abm' },
      { name: 'Lead Nurturing', link: '/lead-nurturing' },
    ],
    color: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.4)',
    icon: Layers,
  },
  {
    num: '03',
    phase: 'BOTTOM-OF-FUNNEL',
    title: 'CREATE PIPELINE',
    subtitle: 'Gate, Verify & Deliver Confirmed Revenue Meetings',
    desc: 'Gate prospects rigorously across intent, budget, and timeline parameters to deliver sales-ready opportunities and confirmed meetings.',
    services: [
      { name: 'MQL', link: '/mql-services' },
      { name: 'BANT', link: '/bant-lead-generation' },
      { name: 'SQL', link: '/sql-services' },
      { name: 'Appointment Setting', link: '/b2b-appointment-setting' },
    ],
    color: '#FF6D00',
    accentGlow: 'rgba(255, 109, 0, 0.4)',
    icon: TrendingUp,
  },
]

export default function GrowthStagesGrid() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden select-none"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #020306 0%, #080f22 50%, #020306 100%)'
          : 'linear-gradient(180deg, #f8fafd 0%, #edf4fc 50%, #f8fafd 100%)',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      aria-label="Built for Every Stage of B2B Growth"
    >
      {/* Background Connected Conduit Laser Beam (desktop) */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4"
              style={{
                background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(0, 102, 204, 0.08)',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
                color: isDark ? '#38BDF8' : '#0066CC',
              }}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>END-TO-END PIPELINE ARCHITECTURE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-5"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              Built for Every Stage of{' '}
              <span
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #38BDF8 0%, #00A6FF 50%, #FF6D00 100%)'
                    : 'linear-gradient(135deg, #0066CC 0%, #0284C7 50%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                B2B Growth
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg leading-relaxed font-normal"
              style={{ color: isDark ? '#94A3B8' : '#475569' }}
            >
              Whether you need to generate early awareness, nurture cold accounts, or deliver verified sales meetings directly to your team, our modular architecture adapts to your exact sales velocity requirements.
            </motion.p>
          </div>

          <CyberButton
            to="/contact"
            variant="orange"
            size="md"
          >
            Design Custom Funnel
          </CyberButton>
        </div>

        {/* 3 Interconnected Stage Bento Cards with Stage Connectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(8, 12, 24, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: isDark
                    ? '0 20px 45px -15px rgba(0, 0, 0, 0.7)'
                    : '0 20px 45px -15px rgba(0, 102, 204, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = stage.color
                  e.currentTarget.style.boxShadow = isDark
                    ? `0 25px 60px -15px ${stage.accentGlow}`
                    : `0 25px 60px -15px rgba(0, 102, 204, 0.15)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 20px 45px -15px rgba(0, 0, 0, 0.7)'
                    : '0 20px 45px -15px rgba(0, 102, 204, 0.08)'
                }}
              >
                {/* Glowing Top Beam */}
                <div
                  className="absolute top-0 left-8 right-8 h-[3px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${stage.color}, transparent)` }}
                />

                <div>
                  {/* Stage Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: isDark ? `${stage.color}18` : `${stage.color}15`,
                          color: stage.color,
                          border: `1px solid ${stage.color}35`,
                          boxShadow: `0 0 15px ${stage.accentGlow}`,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold tracking-widest block uppercase" style={{ color: stage.color }}>
                          {stage.phase}
                        </span>
                        <span className="font-mono text-xs font-bold" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                          STAGE {stage.num}
                        </span>
                      </div>
                    </div>

                    <span
                      className="font-mono text-2xl font-black opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ color: stage.color }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black mb-1.5 tracking-tight" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                    {stage.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold mb-4" style={{ color: stage.color }}>
                    {stage.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-6 font-normal" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                    {stage.desc}
                  </p>
                </div>

                {/* Stage Services Pills */}
                <div className="pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)' }}>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-3" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                    KEY SERVICES IN THIS STAGE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stage.services.map((srv, i) => (
                      <Link
                        key={i}
                        to={srv.link}
                        className="group/pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                          background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                          color: isDark ? '#E2E8F0' : '#1E293B',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = stage.color
                          e.currentTarget.style.color = stage.color
                          e.currentTarget.style.background = isDark ? `${stage.color}15` : `${stage.color}10`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                          e.currentTarget.style.color = isDark ? '#E2E8F0' : '#1E293B'
                          e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)'
                        }}
                      >
                        <span>{srv.name}</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/pill:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
