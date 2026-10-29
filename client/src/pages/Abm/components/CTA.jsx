import { StarButton } from '@components/ui/StarButton'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Radar, Shield, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useTheme } from '@context/ThemeContext'

const TRUST_PILLARS = [
  {
    id: 'targeted',
    label: 'Tier-1 Target Account Precision',
    badge: 'TIER-1 TAL',
    icon: Radar,
    color: '#00A6FF',
  },
  {
    id: 'data',
    label: '99.8% Committee Accuracy SLA',
    badge: 'ZERO BOUNCE',
    icon: Shield,
    color: '#72D669',
  },
  {
    id: 'intent',
    label: 'Live Intent Telemetry Triggers',
    badge: 'INTENT SURGES',
    icon: Flame,
    color: '#FF6D00',
  },
]

const DATA_POINTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 3) % 95}%`,
  top: `${(i * 23 + 7) % 85}%`,
  size: (i % 3) + 2,
  delay: (i * 0.3) % 3,
}))

const CTA = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const [pillarIndex, setPillarIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20])

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setPillarIndex((prev) => (prev + 1) % TRUST_PILLARS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const handleStartCampaign = () => {
    navigate('/contact')
  }

  const handleTalkToTeam = () => {
    navigate('/contact')
  }

  const currentPillar = TRUST_PILLARS[pillarIndex]
  const PillarIcon = currentPillar.icon

  return (
    <section
      ref={sectionRef}
      id="abm-cta"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-border bg-background"
      aria-label="Account-Based Marketing Call to Action"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {!prefersReducedMotion &&
          DATA_POINTS.map((pt) => (
            <motion.div
              key={pt.id}
              className="absolute rounded-full bg-primary/20 dark:bg-primary/30"
              style={{
                left: pt.left,
                top: pt.top,
                width: pt.size,
                height: pt.size,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                delay: pt.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

        <div
          className="absolute top-0 left-0 w-[500px] h-[320px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,166,255,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[320px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,109,0,0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 text-center">
        <motion.div style={prefersReducedMotion ? {} : { y }}>
          <motion.div
            className="flex items-center justify-center mb-3.5 text-primary"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-[0.22em] uppercase">
              ENTERPRISE GROWTH
            </span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white mb-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Penetrate and Close Your{' '}
            <span
              className="inline-block bg-clip-text text-transparent py-1"
              style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #FFA600 50%, #FF6D00 100%)' }}
            >
              Highest-Value Accounts?
            </span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto font-normal"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Deploy verified, multi-channel ABM campaigns customized to your target enterprise logos, buying committees, and won ACV targets.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              id="cta-start-abm-campaign"
              onClick={handleStartCampaign}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00] focus-visible:ring-offset-2 w-full sm:w-auto justify-center cursor-pointer shadow-md hover:shadow-lg hover:brightness-105"
              style={{
                backgroundColor: '#FF6D00',
                boxShadow: '0 4px 20px rgba(255,109,0,0.3)',
              }}
            >
              Start an ABM Campaign
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <StarButton
              onClick={handleTalkToTeam}
              lightColor="#FF6D00"
              backgroundColor="rgba(0,166,255,0.15)"
              className={`w-full sm:w-auto rounded-[100px] cursor-pointer ${isDark ? "shadow-lg shadow-primary/20" : ""}`}
            >
              <span className="flex items-center justify-center gap-2 min-h-[44px] px-8">
                <span>Talk to Our Team</span>
                <ArrowRight size={15} />
              </span>
            </StarButton>
          </motion.div>

          {/* Animated Trust Pillar Pill */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-surface text-xs font-mono font-medium shadow-sm"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: `${currentPillar.color}20`, color: currentPillar.color }}
                >
                  <PillarIcon className="w-3 h-3" />
                </div>
                <span className="text-text-primary font-bold">{currentPillar.badge}</span>
                <span className="text-text-secondary">•</span>
                <span className="text-text-secondary">{currentPillar.label}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA

