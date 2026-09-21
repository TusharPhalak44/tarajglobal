import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CommandPrimaryButton } from './CommandButtons'

/**
 * CommandSpotlight — 04 FEATURED SERVICE SPOTLIGHT
 * Heading: "Designed Around Your Growth Challenge"
 * Left:
 * - Large vertical number: 01
 * - B2B LEAD GENERATION
 * - Short description + SLA points
 * - Button: EXPLORE SERVICE ->
 * Right:
 * - Asymmetric frame image (rounded-tr-3xl rounded-bl-3xl, sharp corners)
 * - Slow zoom on hover, moving overlay badge, clip-path scroll reveal.
 */

export default function CommandSpotlight() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      id="service-spotlight"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
          />
          <span
            className="font-mono text-xs font-semibold tracking-wider uppercase"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            04 // FLAGSHIP SPOTLIGHT
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-16"
          style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
        >
          Designed Around Your{' '}
          <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
            Growth Challenge
          </span>
        </h2>

        {/* Large Spotlight Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column (5 cols): Number, Headline, Copy, CTA */}
          <div className="lg:col-span-5">
            {/* Large Vertical Number */}
            <span
              className="font-mono text-5xl sm:text-7xl font-black block mb-2 leading-none"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              01
            </span>

            <h3
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              B2B LEAD GENERATION
            </h3>

            <p
              className="font-mono text-xs font-bold uppercase tracking-wider mb-5"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              SALES-QUALIFIED PIPELINE ACCELERATION
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed font-normal mb-8"
              style={{ color: isDark ? '#94A3B8' : '#475569' }}
            >
              We architect custom outbound demand engines that connect your revenue team directly with qualified economic decision-makers. No stale scraped lists, no bounce-backs—only verified sales pipeline.
            </p>

            {/* SLA Bullet points */}
            <div className="space-y-3 mb-10">
              {[
                'Dual-channel human telephonic + email verification',
                'Guaranteed 85%+ show-rates on confirmed calendars',
                'Targeted firmographic and intent signal calibration',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  />
                  <span
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <CommandPrimaryButton to="/sql-services">
                EXPLORE SERVICE →
              </CommandPrimaryButton>
            </div>
          </div>

          {/* Right Column (7 cols): Asymmetric Framed Visual */}
          <div className="lg:col-span-7">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative p-2 rounded-tl-lg rounded-br-lg rounded-tr-3xl rounded-bl-3xl border transition-all duration-300 shadow-xl overflow-hidden group"
              style={{
                backgroundColor: isDark ? '#111622' : '#FFFFFF',
                borderColor: isHovered
                  ? isDark ? '#38BDF8' : '#0284C7'
                  : isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Inner Framed Image with Asymmetric Shape */}
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-tl-md rounded-br-md rounded-tr-2xl rounded-bl-2xl"
              >
                <img
                  src="/sql-lead-qualification-journey.jpg"
                  alt="B2B Lead Generation Flagship Spotlight"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Ambient Gradient Mask */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 transition-opacity group-hover:opacity-25"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to top, rgba(6, 8, 14, 0.85) 0%, transparent 60%)'
                      : 'linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 60%)',
                  }}
                />

                {/* Moving Overlay Label */}
                <motion.div
                  animate={{ x: isHovered ? 6 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <span
                    className="px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-wider uppercase border backdrop-blur-md"
                    style={{
                      backgroundColor: isDark ? 'rgba(8, 10, 15, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)',
                      color: isDark ? '#FFFFFF' : '#0B0F19',
                    }}
                  >
                    // FLAGSHIP ORCHESTRATION
                  </span>
                </motion.div>

                {/* Bottom Floating Telemetry */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between px-4 py-2.5 rounded-md border backdrop-blur-md text-xs font-mono"
                  style={{
                    backgroundColor: isDark ? 'rgba(8, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.85)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                    color: isDark ? '#FFFFFF' : '#0B0F19',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>STATUS: HIGH-CONVERTING PIPELINE</span>
                  </div>
                  <span className="font-bold" style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
                    99.8% ACCURACY SLA
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
