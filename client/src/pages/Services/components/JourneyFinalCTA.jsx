import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, ShieldCheck, Clock, Users2, Check } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CircularCTAButton } from './GrowthJourneyButtons'

/**
 * SECTION 09 — FINAL CTA
 * Immersive final CTA occupying a major portion of the viewport:
 * - Large text: "Let's Build Your Next Growth Opportunity."
 * - Large circular CTA button: "START A CONVERSATION ↗" with rotating arrow and expanding animated ring.
 * - Surrounding orbital rings echoing the growth network.
 * - 4 enterprise assurance badges.
 */

export default function JourneyFinalCTA() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="final-cta"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-12 border-b overflow-hidden flex flex-col justify-center min-h-[75vh]"
      style={{
        backgroundColor: isDark ? '#04060A' : '#F4F6FB',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Concentric Ambient Rings in Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        {[200, 400, 600, 850].map((radius, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border opacity-20"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              borderColor: isDark ? '#00A6FF' : '#0066CC',
              borderStyle: idx % 2 === 0 ? 'solid' : 'dashed',
            }}
          />
        ))}
        {/* Subtle radial ambient glow behind button */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: isDark
              ? 'radial-gradient(circle, #00A6FF 0%, #3B82F6 40%, transparent 70%)'
              : 'radial-gradient(circle, #0066CC 0%, #60A5FA 40%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
          style={{
            backgroundColor: isDark ? 'rgba(0, 166, 255, 0.08)' : 'rgba(0, 102, 204, 0.08)',
            borderColor: isDark ? 'rgba(0, 166, 255, 0.3)' : 'rgba(0, 102, 204, 0.3)',
          }}
        >
          <Sparkles
            className="w-3.5 h-3.5 animate-spin"
            style={{ color: isDark ? '#00A6FF' : '#0066CC', animationDuration: '6s' }}
          />
          <span
            className="font-mono text-xs font-bold uppercase tracking-widest"
            style={{ color: isDark ? '#00A6FF' : '#0066CC' }}
          >
            09 // READY TO SCALE YOUR PIPELINE
          </span>
        </motion.div>

        {/* Massive Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] mb-8"
          style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
        >
          Let’s Build Your Next{' '}
          <span className="font-sans font-black italic underline decoration-blue-500 underline-offset-8">
            Growth Opportunity.
          </span>
        </motion.h2>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-14"
          style={{ color: isDark ? '#94A3B8' : '#475569' }}
        >
          Direct access to enterprise demand strategists. From ICP definition to qualified sales appointments, we convert target accounts into predictable, recurring revenue.
        </motion.p>

        {/* Central Circular CTA Showpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <CircularCTAButton to="/contact">
            START A CONVERSATION
          </CircularCTAButton>
        </motion.div>

        {/* Assurance Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
        >
          {[
            { label: 'Guaranteed Show-Rates', icon: ShieldCheck },
            { label: 'Pilot Launch in 7 Days', icon: Clock },
            { label: 'Dedicated Account Pod', icon: Users2 },
            { label: '100% Human-Verified Data', icon: Check },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="flex flex-col items-center text-center p-3">
                <Icon
                  className="w-4 h-4 mb-2"
                  style={{ color: isDark ? '#00A6FF' : '#0066CC' }}
                />
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                >
                  {item.label}
                </span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
