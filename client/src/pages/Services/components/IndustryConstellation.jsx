import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * IndustryConstellation — 10 INDUSTRY CONSTELLATION
 * Center: TARAJ GLOBAL
 * Orbiting nodes: SAAS, TECHNOLOGY, CYBERSECURITY, CLOUD, TELECOM, IT SERVICES, PROFESSIONAL SERVICES.
 * Connected using thin animated lines.
 * On hover: node moves toward center, line brightens, short description appears.
 */

const CONSTELLATION_NODES = [
  {
    name: 'SAAS',
    fullName: 'SaaS & Cloud Platforms',
    desc: 'Pipeline acceleration for recurring revenue ARR scale-ups, product-led expansion models, and high-ACV platforms.',
    dealCycle: '45–90 Days',
    keyTitles: 'CTO, VP Engineering, Head of RevOps',
  },
  {
    name: 'TECHNOLOGY',
    fullName: 'Hardware & Systems',
    desc: 'Targeted account-based prospecting for OEM manufacturers, compute providers, and semiconductor leaders.',
    dealCycle: '90–180 Days',
    keyTitles: 'VP Engineering, Procurement Directors',
  },
  {
    name: 'CYBERSECURITY',
    fullName: 'Cybersecurity & SecOps',
    desc: 'Engaging CISOs, SecOps directors, and data compliance heads across strict security frameworks.',
    dealCycle: '60–120 Days',
    keyTitles: 'CISO, Director of InfoSec, VP Risk',
  },
  {
    name: 'CLOUD',
    fullName: 'Cloud Infrastructure & DevOps',
    desc: 'Connecting solutions for cloud cost observability, containerization, and multi-cloud migration initiatives.',
    dealCycle: '60–90 Days',
    keyTitles: 'VP Infrastructure, Platform Engineering',
  },
  {
    name: 'TELECOM',
    fullName: 'Telecommunications & 5G',
    desc: 'Reaching decision-makers for enterprise SD-WAN, unified communications, fiber networks, and private 5G.',
    dealCycle: '90–150 Days',
    keyTitles: 'VP Network Operations, IT Directors',
  },
  {
    name: 'IT SERVICES',
    fullName: 'IT Services & System Integrators',
    desc: 'Pipeline generation for digital transformation agencies, MSPs, and global engineering consultancies.',
    dealCycle: '60–120 Days',
    keyTitles: 'CIO, VP Digital Transformation',
  },
  {
    name: 'PROFESSIONAL SERVICES',
    fullName: 'Corporate & Financial Tech',
    desc: 'Engaging enterprise leaders in legal tech, accounting automation, corporate advisory, and human capital.',
    dealCycle: '45–90 Days',
    keyTitles: 'CFO, General Counsel, VP People',
  },
]

export default function IndustryConstellation() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(0)

  const active = CONSTELLATION_NODES[activeIdx]
  const constellationRadius = 165

  return (
    <section
      id="industry-constellation"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#05070B' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
            />
            <span
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              10 // THE INDUSTRY CONSTELLATION
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
          >
            One Growth Partner.{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Multiple B2B Sectors.
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Hover over any orbiting industry node to inspect calibrated market dynamics and deal velocity.
          </p>
        </div>

        {/* ══ DESKTOP: Constellation Radar & Inspector Panel ══ */}
        <div className="hidden md:grid md:grid-cols-12 gap-10 items-center">

          {/* Left / Center (7 cols): Constellation Canvas */}
          <div className="md:col-span-7 flex items-center justify-center relative min-h-[460px] select-none">
            {/* Concentric Guide Rings */}
            <div
              className="absolute w-[360px] h-[360px] rounded-full border border-dashed pointer-events-none"
              style={{ borderColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)' }}
            />
            <div
              className="absolute w-[240px] h-[240px] rounded-full border pointer-events-none"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
            />

            {/* Connecting Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {CONSTELLATION_NODES.map((node, idx) => {
                const angle = (idx * (360 / CONSTELLATION_NODES.length) - 90) * (Math.PI / 180)
                const isSelected = activeIdx === idx

                return (
                  <line
                    key={node.name}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${Math.cos(angle) * (isSelected ? constellationRadius - 20 : constellationRadius)}px)`}
                    y2={`calc(50% + ${Math.sin(angle) * (isSelected ? constellationRadius - 20 : constellationRadius)}px)`}
                    stroke={isSelected ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')}
                    strokeWidth={isSelected ? '2' : '1'}
                    strokeDasharray={isSelected ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                )
              })}
            </svg>

            {/* Center Core: TARAJ GLOBAL */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full border flex flex-col items-center justify-center p-3 text-center shadow-xl backdrop-blur-md cursor-pointer"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isDark ? '#38BDF8' : '#0284C7',
                boxShadow: isDark ? '0 0 30px rgba(56, 189, 248, 0.25)' : '0 10px 25px rgba(2, 132, 199, 0.12)',
              }}
            >
              <Globe className="w-5 h-5 text-sky-400 mb-1 animate-spin" style={{ animationDuration: '30s' }} />
              <span
                className="font-mono text-xs font-black tracking-wider uppercase leading-tight"
                style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
              >
                TARAJ
                <br />
                GLOBAL
              </span>
            </motion.div>

            {/* 7 Orbiting Satellite Nodes */}
            {CONSTELLATION_NODES.map((node, idx) => {
              const angle = (idx * (360 / CONSTELLATION_NODES.length) - 90) * (Math.PI / 180)
              const isSelected = activeIdx === idx
              const currentR = isSelected ? constellationRadius - 20 : constellationRadius
              const x = Math.cos(angle) * currentR
              const y = Math.sin(angle) * currentR

              return (
                <button
                  key={node.name}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`absolute z-20 px-3 py-1.5 rounded-md font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer border whitespace-nowrap ${
                    isSelected ? 'shadow-xl scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    backgroundColor: isSelected
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? '#111622' : '#FFFFFF',
                    borderColor: isSelected
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                    color: isSelected
                      ? isDark ? '#090D15' : '#FFFFFF'
                      : isDark ? '#CBD5E1' : '#334155',
                  }}
                >
                  {node.name}
                </button>
              )
            })}
          </div>

          {/* Right (5 cols): Dynamic Constellation Inspector Panel */}
          <div className="md:col-span-5">
            <div
              className="p-8 sm:p-10 rounded-2xl border relative overflow-hidden backdrop-blur-md"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.25)',
                boxShadow: isDark
                  ? '0 20px 45px -10px rgba(0, 0, 0, 0.5)'
                  : '0 15px 35px -10px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="flex items-center justify-between pb-3 mb-5 border-b"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
              >
                <span
                  className="font-mono text-xs font-bold tracking-widest uppercase"
                  style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                >
                  // SECTOR BLUEPRINT
                </span>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                >
                  0{activeIdx + 1} / 07
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3"
                    style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
                  >
                    {active.fullName}
                  </h3>

                  <p
                    className="text-sm sm:text-base leading-relaxed font-normal mb-6"
                    style={{ color: isDark ? '#94A3B8' : '#475569' }}
                  >
                    {active.desc}
                  </p>

                  <div
                    className="p-4 rounded-xl border text-xs font-mono space-y-2 mb-6"
                    style={{
                      backgroundColor: isDark ? '#111622' : '#F8FAFC',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <div>
                      <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>TARGET STAKEHOLDERS: </span>
                      <span className="font-bold" style={{ color: isDark ? '#FFFFFF' : '#090D15' }}>{active.keyTitles}</span>
                    </div>
                    <div className="pt-2 border-t"
                      style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' }}
                    >
                      <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>AVG DEAL CYCLE: </span>
                      <span className="font-bold text-sky-500">{active.dealCycle}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* ══ MOBILE: Clean Vertical List ══ */}
        <div className="md:hidden space-y-3">
          {CONSTELLATION_NODES.map((node, idx) => {
            const isSelected = activeIdx === idx

            return (
              <div
                key={node.name}
                onClick={() => setActiveIdx(idx)}
                className="p-4 rounded-xl border transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)'
                    : isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isSelected
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-bold text-sm"
                    style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
                  >
                    {node.fullName}
                  </span>
                  <span className="text-[10px] font-mono text-sky-500 font-bold">
                    {node.name}
                  </span>
                </div>

                {isSelected && (
                  <p
                    className="text-xs leading-relaxed mt-2 pt-2 border-t"
                    style={{
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                      color: isDark ? '#94A3B8' : '#475569',
                    }}
                  >
                    {node.desc}
                  </p>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
