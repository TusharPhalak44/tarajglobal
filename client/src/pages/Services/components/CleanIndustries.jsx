import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CleanIndustries — 07 INDUSTRIES
 * Clean interactive list (2-column layout on desktop, 1-column on mobile):
 * - SaaS
 * - Technology
 * - IT Services
 * - Cybersecurity
 * - Cloud
 * - Telecom
 * - Professional Services
 * Each row: Industry Name ->
 * On hover: arrow appears, underline animates, text shifts slightly, subtle background highlight.
 * No seven cards!
 */

const INDUSTRIES = [
  { name: 'SaaS', desc: 'High-velocity subscription platforms, PLG expansions, and enterprise ARR acceleration.' },
  { name: 'Technology', desc: 'Hardware innovators, semiconductor providers, and enterprise electronics.' },
  { name: 'IT Services', desc: 'Systems integrators, managed service providers, and digital engineering agencies.' },
  { name: 'Cybersecurity', desc: 'Threat detection, compliance tooling, identity governance, and SecOps solutions.' },
  { name: 'Cloud Infrastructure', desc: 'DevOps platforms, microservices, cloud cost optimization, and multi-cloud architects.' },
  { name: 'Telecommunications', desc: 'Unified communications, 5G enterprise infrastructure, and global connectivity.' },
  { name: 'Professional Services', desc: 'Management consulting, legal tech, enterprise finance, and advisory firms.' },
]

export default function CleanIndustries() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      id="industries"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#0A0C10' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
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
              07 // INDUSTRIES
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Built For{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Modern B2B Teams
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Our pipeline frameworks are deeply customized around the specific buying behaviors, technical titles, and ACV profiles of premier enterprise sectors.
          </p>
        </div>

        {/* 2-Column Clean Interactive List (No Cards!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INDUSTRIES.map((industry, index) => {
            const isHovered = hoveredIdx === index

            return (
              <Link
                key={industry.name}
                to="/industries"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative flex items-center justify-between p-5 sm:p-6 rounded-xl border transition-all duration-200"
                style={{
                  backgroundColor: isHovered
                    ? isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)'
                    : isDark ? 'rgba(255, 255, 255, 0.015)' : '#FAFBFD',
                  borderColor: isHovered
                    ? isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.3)'
                    : isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                    >
                      0{index + 1}
                    </span>

                    <h3
                      className="text-lg sm:text-xl font-bold tracking-tight transition-transform duration-200 group-hover:translate-x-1"
                      style={{
                        color: isHovered
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#FFFFFF' : '#0B0F19',
                      }}
                    >
                      <span className="relative">
                        {industry.name}
                        <span
                          className="absolute bottom-0 left-0 w-full h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                          style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
                        />
                      </span>
                    </h3>
                  </div>

                  <p
                    className="text-xs sm:text-sm font-normal mt-1.5 pl-7 line-clamp-1"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {industry.desc}
                  </p>
                </div>

                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200"
                  style={{
                    backgroundColor: isHovered
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? '#111622' : '#FFFFFF',
                    borderColor: isHovered
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                    color: isHovered
                      ? isDark ? '#0B0F19' : '#FFFFFF'
                      : isDark ? '#64748B' : '#94A3B8',
                  }}
                >
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isHovered ? 'translate-x-0.5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
