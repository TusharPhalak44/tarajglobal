import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { MagneticPrimaryButton, OutlineSecondaryButton } from './GrowthJourneyButtons'
import { Building2, UserCheck, Zap, ShieldCheck, Target, ArrowDown } from 'lucide-react'

// B2B Growth Network Nodes: Company → Decision Maker → Engagement → Qualified Opportunity → Pipeline
const NETWORK_NODES = [
  {
    id: 'company',
    step: '01',
    label: 'Company',
    sub: 'Verified ICP & TAM',
    icon: Building2,
    color: '#00A6FF',
    x: 40,
    y: 60,
  },
  {
    id: 'decision-maker',
    step: '02',
    label: 'Decision Maker',
    sub: 'Direct Dial & Mobile',
    icon: UserCheck,
    color: '#38BDF8',
    x: 230,
    y: 150,
  },
  {
    id: 'engagement',
    step: '03',
    label: 'Engagement',
    sub: 'Omnichannel Outreach',
    icon: Zap,
    color: '#FFA600',
    x: 100,
    y: 260,
  },
  {
    id: 'qualified-opp',
    step: '04',
    label: 'Qualified Opportunity',
    sub: 'BANT Commercial Gating',
    icon: ShieldCheck,
    color: '#10B981',
    x: 280,
    y: 360,
  },
  {
    id: 'pipeline',
    step: '05',
    label: 'Pipeline',
    sub: 'Confirmed Sales Meeting',
    icon: Target,
    color: '#FF6D00',
    x: 160,
    y: 470,
  },
]

export default function JourneyHero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const networkY = useTransform(scrollYProgress, [0, 1], [0, 60])

  const handleScrollToDiscovery = () => {
    const el = document.getElementById('service-discovery')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden select-none border-b"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Turn B2B Demand Into Real Pipeline — Taraj Global Services"
    >
      {/* Subtle Network Matrix Canvas in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Soft Ambient Radial Blur */}
        <div
          className="absolute top-1/3 left-1/3 w-[800px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-30"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 166, 255, 0.2) 0%, rgba(255, 109, 0, 0.1) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(0, 102, 204, 0.12) 0%, rgba(255, 107, 0, 0.06) 60%, transparent 80%)',
          }}
        />

        {/* Delicate Architectural Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, ${isDark ? '#FFF' : '#000'} 1px, transparent 1px), linear-gradient(to bottom, ${isDark ? '#FFF' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '90px 90px',
          }}
        />
      </div>

      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-6 sm:py-10">

          {/* ══ LEFT: Cinematic Typography & Custom Buttons ══ */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Small Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span
                className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase px-3.5 py-1 rounded-full"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                  color: isDark ? '#A1A1AA' : '#52525B',
                }}
              >
                OUR SERVICES
              </span>
              <span
                className="w-12 h-[1px]"
                style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }}
              />
            </motion.div>

            {/* Huge Headline: "Turn B2B Demand Into Real Pipeline" */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] mb-8"
              style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
            >
              Turn B2B Demand{' '}
              <span className="block mt-1 font-light italic">
                Into Real{' '}
                <span
                  className="font-extrabold not-italic inline-block"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 55%, #FF6D00 100%)'
                      : 'linear-gradient(135deg, #080A0F 0%, #0066CC 55%, #EA580C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Pipeline.
                </span>
              </span>
            </motion.h1>

            {/* Natural SEO Services Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl font-normal mb-12"
              style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
            >
              From demand generation to qualified pipeline, Taraj Global brings strategy, data and execution together to help B2B businesses create meaningful revenue opportunities.
            </motion.p>

            {/* Dual Custom Magnetic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <MagneticPrimaryButton to="/contact">
                START A CONVERSATION
              </MagneticPrimaryButton>

              <OutlineSecondaryButton onClick={handleScrollToDiscovery}>
                EXPLORE SERVICES
              </OutlineSecondaryButton>
            </motion.div>
          </div>

          {/* ══ RIGHT: Abstract B2B Growth Network ══ */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-[420px] h-[550px] p-6 rounded-3xl border backdrop-blur-xl"
              style={{
                y: networkY,
                backgroundColor: isDark ? 'rgba(12, 16, 26, 0.75)' : 'rgba(255, 255, 255, 0.85)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                boxShadow: isDark ? '0 30px 60px -15px rgba(0, 0, 0, 0.7)' : '0 20px 45px -15px rgba(0, 102, 204, 0.08)',
              }}
            >
              {/* Header Label */}
              <div className="flex items-center justify-between pb-4 mb-2 border-b" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
                  B2B GROWTH NETWORK
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Connecting Pathway SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none p-6">
                <defs>
                  <linearGradient id="networkGrowthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FF6D00" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 60 90 L 250 180 L 120 290 L 300 390 L 180 500"
                  fill="none"
                  stroke="url(#networkGrowthGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* 5 Network Progression Nodes */}
              {NETWORK_NODES.map((n, i) => {
                const Icon = n.icon
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                    className="absolute flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-md transition-transform duration-300 hover:scale-105"
                    style={{
                      left: n.x,
                      top: n.y,
                      backgroundColor: isDark ? 'rgba(8, 10, 16, 0.92)' : 'rgba(255, 255, 255, 0.95)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                      boxShadow: `0 8px 25px -5px ${n.color}25`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${n.color}20`, color: n.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] font-bold" style={{ color: n.color }}>
                          {n.step}
                        </span>
                        <span className="text-xs font-bold leading-none" style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}>
                          {n.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium leading-none opacity-70 block mt-1" style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
                        {n.sub}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Editorial Bottom Line connecting into Section 2 */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-8 flex items-center justify-between text-xs font-mono"
        style={{ color: isDark ? '#64748B' : '#9CA3AF' }}
      >
        <span className="tracking-widest">DISCOVER → TARGET → QUALIFY → ENGAGE → CONVERT</span>
        <button
          type="button"
          onClick={handleScrollToDiscovery}
          className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer"
        >
          <span>EXPLORE JOURNEY</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  )
}
