import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import { MagneticPrimaryButton } from './GrowthJourneyButtons'

const PATH_STEPS = [
  {
    num: '01',
    name: 'RESEARCH',
    tagline: 'TAM Discovery & ICP Precision Mapping',
    desc: 'Deep discovery mapping total market opportunity, decision-maker personas, and strict firmographic/technographic gating criteria.',
    deliverables: ['ICP Calibration', 'TAM Sizing', 'Tech Install Mapping'],
    metric: '100% Market Alignment',
    color: '#00A6FF',
    x: '10%',
    y: '15%',
  },
  {
    num: '02',
    name: 'TARGET',
    tagline: 'Direct Decision-Maker Extraction',
    desc: 'Mining and human-verifying executive stakeholder contact records with validated direct dials and confirmed active intent signals.',
    deliverables: ['Direct Dial Validation', 'Intent Telemetry', 'Account Committees'],
    metric: '99.8% Hygiene SLA',
    color: '#38BDF8',
    x: '30%',
    y: '45%',
  },
  {
    num: '03',
    name: 'QUALIFY',
    tagline: 'Rigorous Multi-Tier Commercial Gating',
    desc: 'Vetting accounts across BANT criteria (Budget, Authority, Need, Timeline) before initiating high-touch commercial outreach.',
    deliverables: ['Budget Verification', 'Authority Confirmation', 'Project Timeline'],
    metric: 'Zero Unvetted Leads',
    color: '#FFA600',
    x: '50%',
    y: '20%',
  },
  {
    num: '04',
    name: 'ENGAGE',
    tagline: 'Synchronized Omnichannel Outbound',
    desc: 'Orchestrating personalized cold email cadences, phone touchpoints, and custom content delivery to executive buying committees.',
    deliverables: ['Cold Email Sequences', 'Executive Phone Touches', 'ABM Syndication'],
    metric: '4.2x Reply Lift',
    color: '#A78BFA',
    x: '70%',
    y: '50%',
  },
  {
    num: '05',
    name: 'OPPORTUNITY',
    tagline: 'Confirmed Pipeline Hand-Off & CRM Sync',
    desc: 'Sales discovery meetings booked directly into account executive calendars with complete pre-call intelligence briefings.',
    deliverables: ['Direct Calendar Placement', 'Pre-Meeting Briefing', 'Bi-Directional CRM Sync'],
    metric: 'Zero No-Show Guarantee',
    color: '#FF6D00',
    x: '90%',
    y: '25%',
  },
]

export default function JourneyProcessPath() {
  const [activeStep, setActiveStep] = useState(2) // Default step 03
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const active = PATH_STEPS[activeStep]

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-b"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Our Process — The Curved Growth Journey"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>THE GROWTH PATHWAY</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06]"
              style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
            >
              A Continuous{' '}
              <span className="font-light italic block mt-1">
                Curved Journey.
              </span>
            </motion.h2>
          </div>

          <p className="text-base sm:text-lg max-w-md font-normal leading-relaxed" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
            Follow each milestone along the curve. Raw target data transforms progressively into confirmed sales conversations.
          </p>
        </div>

        {/* ══ CURVED SVG PATHWAY CANVAS (Desktop) ══ */}
        <div className="hidden lg:block relative w-full h-[320px] mb-16">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 240" fill="none">
            {/* Background Base Curve */}
            <path
              d="M 60 70 C 220 220, 360 30, 500 130 C 640 230, 780 40, 940 90"
              stroke={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />

            {/* Animated Draw Progress Curve */}
            <motion.path
              d="M 60 70 C 220 220, 360 30, 500 130 C 640 230, 780 40, 940 90"
              stroke="url(#curvedPathGradient)"
              strokeWidth="3.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />

            <defs>
              <linearGradient id="curvedPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A6FF" />
                <stop offset="35%" stopColor="#38BDF8" />
                <stop offset="65%" stopColor="#FFA600" />
                <stop offset="100%" stopColor="#FF6D00" />
              </linearGradient>
            </defs>
          </svg>

          {/* 5 Interactive Stepper Node Triggers along the curve */}
          <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
            {PATH_STEPS.map((s, idx) => {
              const isActive = activeStep === idx

              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className="pointer-events-auto flex flex-col items-center cursor-pointer transition-all duration-300 group"
                  style={{ transform: idx % 2 === 1 ? 'translateY(40px)' : 'translateY(-30px)' }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-mono text-sm font-black border transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: isActive
                        ? isDark ? '#FFFFFF' : '#080A0F'
                        : isDark ? 'rgba(12, 16, 26, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                      borderColor: isActive ? s.color : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
                      color: isActive ? (isDark ? '#080A0F' : '#FFFFFF') : s.color,
                      boxShadow: isActive ? `0 0 30px ${s.color}60` : 'none',
                    }}
                  >
                    {s.num}
                  </div>

                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider mt-3 transition-colors duration-200"
                    style={{ color: isActive ? (isDark ? '#FFFFFF' : '#080A0F') : (isDark ? '#71717A' : '#9CA3AF') }}
                  >
                    {s.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ══ ACTIVE STEP EXPANDED MISSION MANIFEST PANE ══ */}
        <motion.div
          key={active.num}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-3xl p-8 sm:p-12 border backdrop-blur-xl relative overflow-hidden shadow-2xl"
          style={{
            backgroundColor: isDark ? 'rgba(12, 16, 26, 0.85)' : 'rgba(250, 251, 253, 0.95)',
            borderColor: isDark ? `${active.color}40` : `${active.color}35`,
          }}
        >
          {/* Top Line Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${active.color}, transparent)` }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: `${active.color}18`, color: active.color }}>
                  STEP {active.num} // {active.name}
                </span>
                <span className="font-mono text-xs" style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
                  {active.metric}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4" style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}>
                {active.tagline}
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-6 font-normal" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
                {active.desc}
              </p>

              {/* Deliverable pills */}
              <div className="flex flex-wrap gap-2">
                {active.deliverables.map((d, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border"
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                      color: isDark ? '#D4D4D8' : '#374151',
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: active.color }} />
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <MagneticPrimaryButton to="/contact">
                START AT STEP 01
              </MagneticPrimaryButton>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
