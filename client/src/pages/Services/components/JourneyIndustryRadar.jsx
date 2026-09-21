import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { Sparkles, Radio, ArrowRight } from 'lucide-react'
import { MagneticPrimaryButton } from './GrowthJourneyButtons'

const RADAR_NODES = [
  {
    id: 'saas',
    name: 'SAAS',
    angle: 0, // In degrees around the circle
    x: 480,
    y: 80,
    headline: 'High-Velocity ARR Expansion for Enterprise Software',
    desc: 'Targeting technical software evaluators and CIOs actively testing modern stacks.',
    kpi: '3.4x ARR Pipeline Lift',
    color: '#00A6FF',
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    angle: 52,
    x: 580,
    y: 220,
    headline: 'Multi-Stakeholder Hardware & OEM Procurement',
    desc: 'Engaging global supply chain and IT directors navigating long RFP sales cycles.',
    kpi: '85% Buying Committee Reach',
    color: '#38BDF8',
  },
  {
    id: 'cloud',
    name: 'CLOUD',
    angle: 104,
    x: 520,
    y: 390,
    headline: 'Accelerating Enterprise Cloud Migration & DevOps',
    desc: 'Targeting VP Infrastructure and Cloud Architects with high commercial intent.',
    kpi: '4.8x Outbound Response Lift',
    color: '#8B5CF6',
  },
  {
    id: 'cybersecurity',
    name: 'CYBERSECURITY',
    angle: 156,
    x: 320,
    y: 430,
    headline: 'Vetting CISOs Across Heavily Regulated Sectors',
    desc: 'Trust-driven, threat-vector aligned outreach tailored to security leadership.',
    kpi: '99.8% Compliance Validated',
    color: '#FFA600',
  },
  {
    id: 'telecom',
    name: 'TELECOM',
    angle: 208,
    x: 140,
    y: 350,
    headline: 'Unified Connectivity & Network Modernization',
    desc: 'Reaching network engineers and distributed enterprise telecom buyers.',
    kpi: '92% Account Engagement',
    color: '#EC4899',
  },
  {
    id: 'it-services',
    name: 'IT SERVICES',
    angle: 260,
    x: 110,
    y: 190,
    headline: 'High-Ticket Digital Transformation & SI Advisory',
    desc: 'Connecting systems integrators directly with enterprise modernization executives.',
    kpi: '$2.4M Avg Deal Size Influenced',
    color: '#10B981',
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    angle: 312,
    x: 270,
    y: 70,
    headline: 'Specialized Corporate Advisory & Consulting',
    desc: 'Initiating confidential C-suite consultations with CEOs, CFOs, and board members.',
    kpi: '100% C-Level Direct Gating',
    color: '#FF6D00',
  },
]

export default function JourneyIndustryRadar() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const active = RADAR_NODES[activeIdx]

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-b"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Industries We Accelerate — Industry Radar"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>THE INDUSTRY RADAR</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] mb-6"
            style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
          >
            Sectors We{' '}
            <span className="font-light italic">Accelerate.</span>
          </motion.h2>

          <p className="text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
            Hover or tap any node to inspect market benchmarks, targeting nuances, and verified ICP penetration across verticals.
          </p>
        </div>

        {/* ══ INTERACTIVE ORBITAL RADAR CONSOLE (Desktop & Tablet) ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT: Radar Orbital Graphic */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[480px]">
            {/* Concentric Radar Circles */}
            <div className="absolute w-[440px] h-[440px] rounded-full border border-sky-500/15 pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-sky-500/20 pointer-events-none" />
            <div className="absolute w-[160px] h-[160px] rounded-full border border-sky-500/25 pointer-events-none" />

            {/* Radar Center Beacon: TARAJ GLOBAL */}
            <div
              className="w-28 h-28 rounded-full border flex flex-col items-center justify-center text-center p-2 z-20 shadow-2xl relative"
              style={{
                backgroundColor: isDark ? '#080A0F' : '#FFFFFF',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(0, 102, 204, 0.3)',
                boxShadow: isDark ? '0 0 35px rgba(0, 166, 255, 0.25)' : '0 0 35px rgba(0, 102, 204, 0.15)',
              }}
            >
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase" style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
                RADAR CORE
              </span>
              <span className="font-black text-xs sm:text-sm tracking-tight" style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}>
                TARAJ GLOBAL
              </span>
            </div>

            {/* Orbiting Satellite Industry Nodes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full pointer-events-none" viewBox="0 0 700 500">
                {RADAR_NODES.map((n, i) => {
                  const isSelected = activeIdx === i
                  return (
                    <line
                      key={n.id}
                      x1="350"
                      y1="250"
                      x2={n.x}
                      y2={n.y}
                      stroke={isSelected ? n.color : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
                      strokeWidth={isSelected ? '2' : '1'}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                    />
                  )
                })}
              </svg>
            </div>

            {/* Interactive Node Buttons positioned around */}
            <div className="absolute inset-0 pointer-events-none">
              {RADAR_NODES.map((n, i) => {
                const isSelected = activeIdx === i
                // Map coordinates percentage wise for responsive layout
                const leftPct = `${(n.x / 700) * 100}%`
                const topPct = `${(n.y / 500) * 100}%`

                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg"
                    style={{
                      left: leftPct,
                      top: topPct,
                      backgroundColor: isSelected
                        ? n.color
                        : isDark ? 'rgba(12, 16, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: isSelected ? n.color : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                      color: isSelected ? '#FFFFFF' : isDark ? '#D4D4D8' : '#374151',
                      transform: isSelected ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)',
                      boxShadow: isSelected ? `0 0 25px ${n.color}70` : 'none',
                    }}
                  >
                    {n.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT: Dynamic Telemetry Inspector Pane */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl p-8 sm:p-10 border backdrop-blur-xl relative overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: isDark ? 'rgba(12, 16, 26, 0.85)' : 'rgba(250, 251, 253, 0.95)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${active.color}, transparent)` }}
                />

                <span className="font-mono text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: active.color }}>
                  // TARGET VERTICAL: {active.name}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4" style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}>
                  {active.headline}
                </h3>

                <p className="text-base leading-relaxed mb-6 font-normal" style={{ color: isDark ? '#94A3B8' : '#4B5563' }}>
                  {active.desc}
                </p>

                <div className="p-4 rounded-2xl mb-8 border" style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)', borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)' }}>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1" style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
                    BENCHMARK KPI IMPACT
                  </span>
                  <div className="text-2xl font-extrabold" style={{ color: active.color }}>
                    {active.kpi}
                  </div>
                </div>

                <MagneticPrimaryButton to="/contact">
                  EXPLORE {active.name} CAMPAIGNS
                </MagneticPrimaryButton>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
