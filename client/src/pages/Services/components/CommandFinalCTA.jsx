import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, Clock, Users, Check } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CommandPrimaryButton } from './CommandButtons'

/**
 * CommandFinalCTA — 10 FINAL CTA
 * Simple, spacious final section:
 * Large heading: "Have a Pipeline Goal?"
 * Below: "Let's build the right growth strategy around it."
 * CTA: START A CONVERSATION ->
 * Large arrow subtly moving toward the button on hover.
 * Spacious, no complex animation.
 */

export default function CommandFinalCTA() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      id="final-cta"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border mb-8"
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            10 // NEXT REVENUE STEP
          </span>
        </div>

        {/* Large Heading */}
        <h2
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
        >
          Have a Pipeline{' '}
          <span
            className="underline decoration-sky-500 decoration-2 underline-offset-8"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            Goal?
          </span>
        </h2>

        {/* Supporting Line */}
        <p
          className="text-lg sm:text-2xl font-normal leading-relaxed mb-12 max-w-xl mx-auto"
          style={{ color: isDark ? '#94A3B8' : '#64748B' }}
        >
          Let's build the right growth strategy around it.
        </p>

        {/* CTA Container with subtly animated arrow moving toward button */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="inline-flex items-center justify-center gap-4 mb-16"
        >
          {/* Subtly moving lead-in arrow */}
          <motion.div
            animate={{ x: isHovered ? 8 : 0, opacity: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex items-center text-sky-500"
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>

          <CommandPrimaryButton
            to="/contact"
            size="large"
          >
            START A CONVERSATION →
          </CommandPrimaryButton>
        </div>

        {/* Assurance Badges */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t max-w-3xl mx-auto text-xs font-mono"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            color: isDark ? '#94A3B8' : '#64748B',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Guaranteed Show-Rates</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-sky-500 shrink-0" />
            <span>7-Day Pilot Onboarding</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Dedicated Strategist</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Zero Long-Term Lock-in</span>
          </div>
        </div>
      </div>
    </section>
  )
}
