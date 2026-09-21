import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { Sparkles, CheckCircle2, ArrowDown } from 'lucide-react'
import TarajButton from './TarajButton'

const JOURNEY_STEPS = [
  {
    num: '01',
    name: 'RESEARCH',
    tagline: 'TAM Discovery & ICP Precision Mapping',
    desc: 'We map your Total Addressable Market (TAM), analyze competitive intelligence, identify high-growth segments, and configure strict firmographic and technographic gating filters.',
    deliverables: ['Custom ICP Scoring Model', 'TAM Account Universe', 'Technographic Signal Filters'],
    metric: '100% Market Coverage',
    color: '#00A6FF',
  },
  {
    num: '02',
    name: 'TARGET',
    tagline: 'Direct Decision-Maker Extraction',
    desc: 'Extract verified executive stakeholder records with direct telephone numbers and verified corporate emails. Every contact passes secondary human-in-the-loop validation.',
    deliverables: ['Human-Verified Direct Dials', 'Account Buying Committees', 'Real-Time Intent Telemetry'],
    metric: '99.8% Hygiene SLA',
    color: '#38BDF8',
  },
  {
    num: '03',
    name: 'QUALIFY',
    tagline: 'Rigorous Multi-Tier Commercial Gating',
    desc: 'Prospective accounts are scored across BANT criteria (Budget, Authority, Need, Timeline). We verify current commercial pain points and active buying cycles before outreach escalates.',
    deliverables: ['Budget Allocation Check', 'Buying Authority Fit', 'Active Project Urgency'],
    metric: 'Zero Unvetted Prospects',
    color: '#FFA600',
  },
  {
    num: '04',
    name: 'ENGAGE',
    tagline: 'Synchronized Multi-Touch Orchestration',
    desc: 'Coordinated outbound cadences across personalized email, phone touchpoints, and custom content delivery that build rapport and initiate high-value executive sales dialogues.',
    deliverables: ['Hyper-Personalized Copywriting', 'Executive Phone Touchpoints', 'Asset Syndication Air-Cover'],
    metric: '4.2x Reply Rate Lift',
    color: '#A78BFA',
  },
  {
    num: '05',
    name: 'OPPORTUNITY',
    tagline: 'Confirmed Pipeline Hand-Off & CRM Sync',
    desc: 'High-intent introductory discovery calls booked directly onto your sales calendars, accompanied by comprehensive pre-meeting briefing dossiers and live CRM synchronization.',
    deliverables: ['Confirmed Calendar Bookings', 'Account Intelligence Dossier', 'Bi-Directional CRM Sync'],
    metric: 'Zero No-Show Guarantee',
    color: '#FF6D00',
  },
]

export default function ProcessJourney() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Process — How We Work: The 5-Stage Journey"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HOW WE WORK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            A Systematic Journey to{' '}
            <span className="font-light italic">Predictable Revenue.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed"
            style={{ color: isDark ? '#94A3B8' : '#6B7280' }}
          >
            From raw market data to confirmed commercial meetings, every milestone is orchestrated through a structured 5-stage pipeline.
          </motion.p>
        </div>

        {/* ══ THE VERTICAL JOURNEY PATHWAY ══ */}
        <div className="relative max-w-4xl mx-auto">

          {/* Central Animated Vertical Pathway Line */}
          <div
            className="absolute left-6 sm:left-1/2 top-8 bottom-12 w-[2px] -translate-x-1/2"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Animated Draw Progress Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              className="w-full origin-top"
              style={{
                background: 'linear-gradient(180deg, #00A6FF 0%, #FFA600 50%, #FF6D00 100%)',
              }}
            />
          </div>

          {/* 5 Journey Nodes */}
          <div className="space-y-16 sm:space-y-24">
            {JOURNEY_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0
              const isActive = activeStep === idx

              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="relative flex flex-col sm:flex-row items-start sm:items-center group"
                >
                  {/* Central Node Pin Indicator */}
                  <div
                    onClick={() => setActiveStep(idx)}
                    className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: isDark ? '#06080E' : '#FFFFFF',
                      border: `2px solid ${isActive ? step.color : isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)'}`,
                      boxShadow: isActive ? `0 0 25px ${step.color}50` : 'none',
                    }}
                  >
                    <span className="font-mono text-xs font-bold" style={{ color: isActive ? step.color : isDark ? '#A1A1AA' : '#52525B' }}>
                      {step.num}
                    </span>
                  </div>

                  {/* Left Side Content (for Even items on desktop) */}
                  <div className={`w-full sm:w-1/2 pl-16 sm:pl-0 ${isEven ? 'sm:pr-14 sm:text-right' : 'sm:hidden'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <span className="font-mono text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: step.color }}>
                          STAGE {step.num} // {step.name}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                          {step.tagline}
                        </h3>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                          {step.desc}
                        </p>
                        <span className="inline-block text-xs font-mono font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                          {step.metric}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Content (for Odd items on desktop, or mobile view) */}
                  <div className={`w-full sm:w-1/2 pl-16 sm:pl-14 ${isEven ? 'sm:hidden' : 'sm:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <span className="font-mono text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: step.color }}>
                        STAGE {step.num} // {step.name}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                        {step.tagline}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                        {step.desc}
                      </p>
                      <span className="inline-block text-xs font-mono font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                        {step.metric}
                      </span>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Destination Node */}
          <div className="text-center pt-20 relative z-10">
            <div className="inline-flex flex-col items-center">
              <TarajButton to="/contact" variant="primary" size="lg">
                Initiate Your Journey
              </TarajButton>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
