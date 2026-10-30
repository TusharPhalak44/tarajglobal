import { StarButton } from '@components/ui/StarButton'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageSquare, Radar, Shield, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useTheme } from '@context/ThemeContext'

const TRUST_PILLARS = [
  {
    id: 'committee',
    label: 'Full Buying Committee Consensus',
    badge: 'CONSENSUS',
    icon: Radar,
    color: '#00A6FF',
  },
  {
    id: 'data',
    label: '99.8% Accuracy Committee SLA',
    badge: 'ZERO BOUNCE',
    icon: Shield,
    color: '#72D669',
  },
  {
    id: 'intent',
    label: 'Active Buying Window Telemetry',
    badge: 'INTENT SURGE',
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

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setPillarIndex((prev) => (prev + 1) % TRUST_PILLARS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const orbY = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const activePillar = TRUST_PILLARS[pillarIndex]
  const ActiveIcon = activePillar.icon

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-12 sm:py-14 lg:py-16 overflow-hidden bg-background border-t border-border transition-colors duration-300"
      aria-label="Ready to Launch Account Based Experience"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ y: orbY }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[130px] opacity-25 dark:opacity-20 pointer-events-none"
          animate={{
            background: `radial-gradient(ellipse, ${activePillar.color}70 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.8 }}
        />

        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {DATA_POINTS.map((pt) => (
          <motion.div
            key={pt.id}
            className="absolute rounded-full"
            style={{
              left: pt.left,
              top: pt.top,
              width: pt.size,
              height: pt.size,
              backgroundColor: activePillar.color,
            }}
            animate={{
              opacity: [0.15, 0.6, 0.15],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: pt.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-border bg-surface/80 dark:bg-[#070E1C]/90 backdrop-blur-xl shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_var(--primary)]" />

          {/* Rotating Trust Pill */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-surface/90 border border-border shadow-xs">
            <ActiveIcon className="w-3.5 h-3.5" style={{ color: activePillar.color }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={activePillar.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] font-mono font-bold tracking-wider uppercase"
                style={{ color: activePillar.color }}
              >
                {activePillar.badge} • {activePillar.label}
              </motion.span>
            </AnimatePresence>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary mb-3">
            <span>Ready to Transform Enterprise Pipeline into </span>
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Account Based Experiences?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto mb-6 font-normal">
            Schedule a strategy briefing to map your Tier-1 buying committees, review intent data coverage, and launch synchronized ABX execution with DemandFlow Bridge.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <StarButton
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 text-sm font-bold shadow-lg shadow-primary/30"
            >
              <span className="flex items-center gap-2">
                <span>Start Your ABX Program</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </StarButton>

            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-surface hover:bg-surface/80 border border-border hover:border-primary/50 text-text-primary text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Talk to an ABX Strategist</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

