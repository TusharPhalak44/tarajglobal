import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { ArrowRevealButton } from './UniverseButtons'

/**
 * ServiceSpotlight — 04 SERVICE SPOTLIGHT
 * Split screen:
 * Left: Huge "01 B2B LEAD GENERATION", short description, button "EXPLORE SERVICE ->"
 * Right: Full-height visual with slow zoom, cursor parallax, animated mask,
 * and floating label: "IDENTIFY -> QUALIFY -> CONNECT -> CONVERT".
 */

export default function ServiceSpotlight() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      id="service-spotlight"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#05070B' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2.5 mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
          />
          <span
            className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            04 // CAMPAIGN SPOTLIGHT
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ══ LEFT (5 cols): Huge Typography, Description, Button ══ */}
          <div className="lg:col-span-5">
            <span
              className="font-mono text-6xl sm:text-8xl font-black block leading-none mb-4"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              01
            </span>

            <div className="space-y-1 mb-6">
              {['B2B', 'LEAD', 'GENERATION'].map((word, i) => (
                <h3
                  key={i}
                  className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] uppercase"
                  style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
                >
                  {word}
                </h3>
              ))}
            </div>

            <p
              className="text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-md"
              style={{ color: isDark ? '#94A3B8' : '#475569' }}
            >
              We architect custom outbound demand engines that connect your revenue team directly with qualified economic decision-makers. Triple-verified contact data, guaranteed show-rates, and zero bounce-backs.
            </p>

            {/* Credibility checkpoints */}
            <div className="space-y-3 mb-10 text-xs sm:text-sm font-mono"
              style={{ color: isDark ? '#CBD5E1' : '#334155' }}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Dual-Channel Human Verification (Phone + Email)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Confirmed Sales Appointments on AE Calendars</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Guaranteed 85%+ Meeting Show-Rate SLA</span>
              </div>
            </div>

            <div>
              <ArrowRevealButton to="/sql-services">
                EXPLORE SERVICE →
              </ArrowRevealButton>
            </div>
          </div>

          {/* ══ RIGHT (7 cols): Full-Height Visual with Mask & Floating Label ══ */}
          <div className="lg:col-span-7">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative p-2 rounded-2xl border transition-all duration-500 shadow-2xl group overflow-hidden"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isHovered
                  ? isDark ? '#38BDF8' : '#0284C7'
                  : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Inner Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <img
                  src="/sql-lead-qualification-journey.jpg"
                  alt="B2B Lead Generation Campaign Spotlight"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Subtle Cinematic Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 transition-opacity group-hover:opacity-25"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to top, rgba(5, 7, 11, 0.85) 0%, transparent 60%)'
                      : 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 60%)',
                  }}
                />

                {/* Floating Process Flow Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div
                    className="px-3.5 py-2 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md flex items-center gap-2"
                    style={{
                      backgroundColor: isDark ? 'rgba(5, 7, 11, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.25)',
                      color: isDark ? '#FFFFFF' : '#090D15',
                    }}
                  >
                    <span>IDENTIFY</span>
                    <span className="text-sky-500">→</span>
                    <span>QUALIFY</span>
                    <span className="text-sky-500">→</span>
                    <span>CONNECT</span>
                    <span className="text-sky-500">→</span>
                    <span className="text-emerald-400">CONVERT</span>
                  </div>
                </div>

                {/* Bottom Floating Telemetry Bar */}
                <div
                  className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between px-4 py-2.5 rounded-md border backdrop-blur-md text-xs font-mono"
                  style={{
                    backgroundColor: isDark ? 'rgba(5, 7, 11, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                    color: isDark ? '#FFFFFF' : '#090D15',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>ORCHESTRATION ENGINE: ACTIVE</span>
                  </div>
                  <span className="font-bold text-sky-400">
                    SLA: 99.8% ACCURACY
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
