import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CommandIndustryMatrix — 09 INDUSTRY MATRIX
 * Unique matrix instead of industry cards:
 * Rows: SAAS, TECHNOLOGY, CYBERSECURITY, CLOUD, TELECOM, IT SERVICES, PROFESSIONAL SERVICES.
 * Subtle grid.
 * When hovering a row:
 * - Row expands
 * - Background changes subtly
 * - Arrow appears
 * - Industry name becomes larger
 * - Short description appears
 * - Only one row is active at a time.
 */

const MATRIX_ROWS = [
  {
    id: 'saas',
    num: '01',
    name: 'SAAS & ENTERPRISE SOFTWARE',
    desc: 'Accelerating pipeline velocity for recurring revenue scale-ups, product-led expansion models, and high-ACV enterprise platforms.',
    targetRoles: 'Chief Technology Officers, VP Product, Head of RevOps',
    dealCycle: '45–90 Days',
  },
  {
    id: 'tech',
    num: '02',
    name: 'HARDWARE & TECHNOLOGY',
    desc: 'Targeted account-based prospecting for OEM manufacturers, enterprise compute providers, and semiconductor leaders.',
    targetRoles: 'VP Engineering, Procurement Directors, Supply Chain Heads',
    dealCycle: '90–180 Days',
  },
  {
    id: 'cyber',
    num: '03',
    name: 'CYBERSECURITY & RISK',
    desc: 'Engaging CISOs, SecOps directors, and data compliance heads navigating zero-trust architectures and vendor governance.',
    targetRoles: 'Chief Information Security Officers, Director of InfoSec',
    dealCycle: '60–120 Days',
  },
  {
    id: 'cloud',
    num: '04',
    name: 'CLOUD & DEVOPS INFRASTRUCTURE',
    desc: 'Connecting solutions for cloud cost observability, containerization, microservices, and multi-cloud migration initiatives.',
    targetRoles: 'VP Infrastructure, Platform Engineering Leads, Cloud Architects',
    dealCycle: '60–90 Days',
  },
  {
    id: 'telecom',
    num: '05',
    name: 'TELECOMMUNICATIONS & NETWORKING',
    desc: 'Reaching decision-makers for enterprise SD-WAN, unified communications, fiber networks, and 5G private infrastructure.',
    targetRoles: 'VP Network Operations, IT Infrastructure Directors',
    dealCycle: '90–150 Days',
  },
  {
    id: 'it-services',
    num: '06',
    name: 'IT SERVICES & SYSTEM INTEGRATION',
    desc: 'Pipeline generation for digital transformation agencies, MSPs, and global engineering consultancies.',
    targetRoles: 'CIOs, VP Digital Transformation, Enterprise Architects',
    dealCycle: '60–120 Days',
  },
  {
    id: 'pro-services',
    num: '07',
    name: 'PROFESSIONAL & FINANCIAL SERVICES',
    desc: 'Engaging enterprise leaders in legal tech, accounting automation, corporate advisory, and human capital solutions.',
    targetRoles: 'Chief Financial Officers, General Counsel, VP HR',
    dealCycle: '45–90 Days',
  },
]

export default function CommandIndustryMatrix() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(0) // Default to SaaS

  return (
    <section
      id="industry-matrix"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FFFFFF',
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
              className="font-mono text-xs font-semibold tracking-wider uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              09 // SECTOR MATRIX
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Built For Modern{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              B2B Companies
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Our outbound strategies are tailored to the unique buying committees, sales velocity, and ACV profiles of major enterprise technology verticals.
          </p>
        </div>

        {/* ══ Matrix Rows (Subtle Grid, Interactive Expansion) ══ */}
        <div
          className="rounded-2xl border divide-y overflow-hidden"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            backgroundColor: isDark ? '#0D1117' : '#FAFBFD',
          }}
        >
          {MATRIX_ROWS.map((row, idx) => {
            const isActive = activeIdx === idx

            return (
              <div
                key={row.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive ? 'p-6 sm:p-8' : 'p-4 sm:p-5'
                }`}
                style={{
                  backgroundColor: isActive
                    ? isDark ? '#111622' : '#FFFFFF'
                    : 'transparent',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Number & Industry Name */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-1">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                    >
                      {row.num}
                    </span>

                    <h3
                      className={`font-mono tracking-wider uppercase transition-all duration-200 ${
                        isActive
                          ? 'text-lg sm:text-2xl font-black text-sky-500'
                          : 'text-sm sm:text-base font-bold text-slate-400 hover:text-slate-200'
                      }`}
                      style={{
                        color: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#94A3B8' : '#475569',
                      }}
                    >
                      {row.name}
                    </h3>
                  </div>

                  {/* Right: Arrow Action */}
                  <div
                    className={`w-8 h-8 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isActive ? 'scale-105' : 'opacity-40'
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? isDark ? '#38BDF8' : '#0284C7'
                        : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                      borderColor: isActive
                        ? isDark ? '#38BDF8' : '#0284C7'
                        : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                      color: isActive
                        ? isDark ? '#0B0F19' : '#FFFFFF'
                        : isDark ? '#64748B' : '#94A3B8',
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Expanded Details when Active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pt-4 mt-4 border-t"
                      style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <p
                          className="md:col-span-7 text-sm sm:text-base leading-relaxed font-normal"
                          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                        >
                          {row.desc}
                        </p>

                        <div
                          className="md:col-span-5 p-4 rounded-xl border text-xs font-mono space-y-1.5"
                          style={{
                            backgroundColor: isDark ? 'rgba(56, 189, 248, 0.04)' : 'rgba(2, 132, 199, 0.03)',
                            borderColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)',
                          }}
                        >
                          <div>
                            <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>KEY TARGETS: </span>
                            <span className="font-semibold" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                              {row.targetRoles}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>CYCLE TIME: </span>
                            <span className="font-semibold" style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
                              {row.dealCycle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
