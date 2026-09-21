import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageSquare, Radar, Shield, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// 3 Core Trust Pillars unified into the single animated button
const TRUST_PILLARS = [
  {
    id: 'budget',
    label: '100% Confirmed Project Budgets',
    badge: 'BUDGET VERIFIED',
    icon: Radar,
    color: '#00A6FF',
  },
  {
    id: 'authority',
    label: 'Direct C-Level & VP Signers',
    badge: 'ECONOMIC BUYERS',
    icon: Shield,
    color: '#72D669',
  },
  {
    id: 'timeline',
    label: 'Active 90-Day Purchase Horizons',
    badge: 'IN-QUARTER',
    icon: Flame,
    color: '#FF6D00',
  },
]

// Data points for background animation
const DATA_POINTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 3) % 95}%`,
  top: `${(i * 23 + 7) % 85}%`,
  size: (i % 3) + 2,
  delay: (i * 0.3) % 3,
}))

const CTA = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const [pillarIndex, setPillarIndex] = useState(0)

  // Continuously rotate through the 3 trust pillars every 2.8s
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

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [20, -20])

  const handleStartCampaign = () => navigate('/contact')
  const handleTalkToTeam = () => navigate('/contact')

  const currPillar = TRUST_PILLARS[pillarIndex]
  const Icon = currPillar.icon

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative py-10 sm:py-12 lg:py-16 overflow-hidden bg-slate-50 dark:bg-[#050D1A] text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="Ready to Accelerate Your Pipeline With BANT Qualified Leads"
    >
      {/* ── Animated Technical Background (Light & Dark compatible) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle dot pattern grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.04]" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1={`${i * 20}%`}
              y1="0%"
              x2={`${i * 20 + 15}%`}
              y2="100%"
              stroke="#00A6FF"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Animated data points */}
        {!prefersReducedMotion &&
          DATA_POINTS.map((pt) => (
            <motion.div
              key={pt.id}
              className="absolute rounded-full"
              style={{
                left: pt.left,
                top: pt.top,
                width: pt.size,
                height: pt.size,
                background:
                  pt.id % 3 === 0 ? '#00A6FF' : pt.id % 3 === 1 ? '#FF6D00' : '#72D669',
              }}
              animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
              transition={{ duration: 3 + pt.delay, repeat: Infinity, delay: pt.delay }}
            />
          ))}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true">
          <line x1="10%" y1="20%" x2="30%" y2="50%" stroke="#00A6FF" strokeWidth="1" />
          <line x1="30%" y1="50%" x2="60%" y2="30%" stroke="#00A6FF" strokeWidth="1" />
          <line x1="60%" y1="30%" x2="85%" y2="70%" stroke="#FF6D00" strokeWidth="1" />
          <line x1="15%" y1="75%" x2="45%" y2="55%" stroke="#72D669" strokeWidth="1" />
          <line x1="45%" y1="55%" x2="70%" y2="80%" stroke="#FFA600" strokeWidth="1" />
        </svg>

        {/* Blue glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,166,255,0.14) 0%, transparent 70%)' }}
        />
        {/* Orange glow */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[320px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,109,0,0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 text-center">
        <motion.div style={prefersReducedMotion ? {} : { y }}>
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3.5 border border-primary/30 dark:border-[#00A6FF]/25 bg-primary/10 dark:bg-[#00A6FF]/10 text-primary dark:text-[#00A6FF] shadow-xs"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {!prefersReducedMotion && (
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#00A6FF]"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase">
              Scale Your Pipeline
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white mb-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Accelerate Your Pipeline With{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #FFA600 50%, #FF6D00 100%)' }}
            >
              BANT Qualified Leads?
            </span>
          </motion.h2>

          {/* Supporting copy */}
          <motion.p
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto font-normal"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fill your sales pipeline with verified decision-makers who hold confirmed project budgets, urgent commercial needs, and active purchasing authority.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              id="cta-start-campaign"
              onClick={handleStartCampaign}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] focus-visible:ring-offset-2 w-full sm:w-auto justify-center cursor-pointer shadow-md hover:shadow-lg hover:brightness-105"
              style={{
                background: 'linear-gradient(90deg, #FF6D00 0%, #FF8C00 100%)',
                boxShadow: '0 4px 24px rgba(255,109,0,0.35)',
              }}
            >
              Start Your BANT Campaign
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="cta-talk-to-team"
              onClick={handleTalkToTeam}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm text-slate-800 dark:text-white bg-white dark:bg-white/[0.07] border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 w-full sm:w-auto justify-center cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-primary dark:text-[#00A6FF]" />
              Talk to Our Team
            </button>
          </motion.div>

          {/* ── 1 Single Unified Trust Button with Rich Animation & Hover Effect ── */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <motion.button
              type="button"
              onClick={() => navigate('/contact')}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-500 cursor-pointer overflow-hidden bg-white/90 dark:bg-[#0B1527]/90 backdrop-blur-md shadow-sm hover:shadow-md dark:shadow-[0_4px_20px_rgba(0,166,255,0.15)]"
              style={{
                borderColor: `${currPillar.color}45`,
              }}
            >
              {/* Continuous Light Sweep Shimmer Ray */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none"
                  animate={{ translateX: ['-100%', '200%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Dynamic Ambient Glow Aura */}
              <div
                className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none blur-sm"
                style={{ backgroundColor: currPillar.color }}
              />

              {/* Live Pulsing Radar Beacon Dot */}
              <div className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
                <span
                  className="absolute w-full h-full rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: currPillar.color }}
                />
                <span
                  className="relative w-2 h-2 rounded-full shadow-xs"
                  style={{ backgroundColor: currPillar.color }}
                />
              </div>

              {/* Category Pill Tag */}
              <span
                className="text-[9.5px] sm:text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors duration-300"
                style={{
                  backgroundColor: `${currPillar.color}15`,
                  color: currPillar.color,
                  border: `1px solid ${currPillar.color}30`,
                }}
              >
                {currPillar.badge}
              </span>

              {/* Animated Text Cycler */}
              <div className="relative overflow-hidden h-5 flex items-center min-w-[190px] sm:min-w-[225px] text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currPillar.label}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-slate-800 dark:text-white"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: currPillar.color }} />
                    <span className="truncate">{currPillar.label}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Interactive Arrow Circle */}
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 group-hover:bg-[#00A6FF] group-hover:text-white dark:group-hover:bg-[#00A6FF] dark:group-hover:text-white text-slate-500 dark:text-slate-300 transition-all duration-300 shrink-0">
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
