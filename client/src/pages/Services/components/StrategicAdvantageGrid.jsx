import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, CheckCircle2, Zap, Share2, TrendingUp, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import CyberButton from './CyberButton'

const ADVANTAGES = [
  {
    num: '01',
    title: 'ICP-Focused Targeting',
    desc: 'Reach the prospects that matter.',
    detail: 'We build pinpoint account targeting frameworks calibrated around firmographics, technographics, and verified commercial buying authority.',
    icon: Target,
    color: '#00A6FF',
    badge: 'TARGETING',
    stat: '100% ICP Alignment',
  },
  {
    num: '02',
    title: 'Verified B2B Data',
    desc: 'Build campaigns on reliable information.',
    detail: 'Backed by our 99.8% Data Accuracy SLA with secondary human-in-the-loop validation, guaranteeing zero deliverability waste.',
    icon: CheckCircle2,
    color: '#34D399',
    badge: 'ACCURACY',
    stat: '99.8% Hygiene SLA',
  },
  {
    num: '03',
    title: 'Intent-Led Qualification',
    desc: 'Prioritize prospects with genuine buying signals.',
    detail: 'Filter out tire-kickers by combining real-time purchase intent signals with rigorous BANT qualification gating before meeting handoff.',
    icon: Zap,
    color: '#FFA600',
    badge: 'INTENT',
    stat: 'Zero Wasted Calls',
  },
  {
    num: '04',
    title: 'Multi-Channel Engagement',
    desc: 'Connect across the channels your buyers use.',
    detail: 'Orchestrate email, phone touchpoints, and content syndication synchronously rather than working in isolated single-channel silos.',
    icon: Share2,
    color: '#38BDF8',
    badge: 'OMNICHANNEL',
    stat: '3.8x Touch Efficiency',
  },
  {
    num: '05',
    title: 'Scalable Campaign Execution',
    desc: 'Scale outreach without losing quality.',
    detail: 'From startup growth sprints to global enterprise sales cadences, expand outreach volume while maintaining personalized precision.',
    icon: TrendingUp,
    color: '#FF6D00',
    badge: 'SCALE',
    stat: '10x Pipeline Capacity',
  },
]

export default function StrategicAdvantageGrid() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden select-none"
      style={{
        background: isDark ? '#020307' : '#ffffff',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      aria-label="Why Taraj Global — Strategic Advantage"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
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
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>THE TARAJ ADVANTAGE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              Why{' '}
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
                Taraj Global
              </span>
            </motion.h2>
          </div>

          <p className="text-sm sm:text-base max-w-md" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Engineered to remove pipeline friction and deliver predictable, enterprise-grade revenue growth at scale.
          </p>
        </div>

        {/* 5-Card Asymmetric Bento Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-7 mb-12">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon
            const colSpan = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2'

            return (
              <motion.div
                key={adv.num}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${colSpan}`}
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(8, 12, 24, 0.88) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: isDark
                    ? '0 15px 35px -10px rgba(0, 0, 0, 0.6)'
                    : '0 15px 35px -10px rgba(0, 0, 0, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = adv.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: isDark ? `${adv.color}15` : `${adv.color}12`,
                        color: adv.color,
                        border: `1px solid ${adv.color}30`,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                          color: adv.color,
                          border: `1px solid ${adv.color}30`,
                        }}
                      >
                        {adv.badge}
                      </span>
                      <span className="font-mono text-xs font-bold" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                        {adv.num}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 tracking-tight" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                    {adv.title}
                  </h3>
                  <div className="text-sm font-semibold mb-3" style={{ color: adv.color }}>
                    {adv.desc}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                    {adv.detail}
                  </p>
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)' }}>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ color: adv.color }}>
                    {adv.stat}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:translate-x-1"
                    style={{ background: `${adv.color}15`, color: adv.color }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Banner with CyberButton */}
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border backdrop-blur-md"
          style={{
            background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(240, 246, 255, 0.8)',
            borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(0, 102, 204, 0.2)',
          }}
        >
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-1" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
              Want to see how our targeting model works for your TAM?
            </h4>
            <p className="text-xs sm:text-sm" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
              Request a complimentary ICP feasibility analysis tailored to your addressable market.
            </p>
          </div>
          <CyberButton
            to="/contact"
            variant="primary"
            size="md"
          >
            Request TAM Audit
          </CyberButton>
        </div>

      </div>
    </section>
  )
}
