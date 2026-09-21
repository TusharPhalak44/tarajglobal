import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageSquare, Radar, Shield, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// 3 Core Trust Pillars unified into the single animated button
const TRUST_PILLARS = [
  {
    id: 'audiences',
    label: 'Targeted B2B Audiences',
    badge: 'ICP ACCURACY',
    icon: Radar,
    color: '#00A6FF',
  },
  {
    id: 'decision-makers',
    label: 'Verified Decision-Makers',
    badge: 'ZERO WASTE',
    icon: Shield,
    color: '#72D669',
  },
  {
    id: 'pipeline',
    label: 'Sales-Qualified Pipeline',
    badge: 'HIGH INTENT',
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

  const handleStartConversation = () => navigate('/contact')
  const handleExploreServices = () => {
    const el = document.getElementById('what-is-demand-generation') || document.getElementById('demand-process')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const currPillar = TRUST_PILLARS[pillarIndex]
  const Icon = currPillar.icon

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative py-10 sm:py-12 lg:py-16 overflow-hidden bg-background text-text-primary border-t border-border transition-colors duration-300"
      aria-label="Ready to Build Stronger B2B Demand"
    >
      {/* ── Animated Technical Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle dot pattern grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1={`${i * 20}%`}
              y1="0%"
              x2={`${i * 20 + 15}%`}
              y2="100%"
              stroke="var(--primary)"
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
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
          <line x1="10%" y1="20%" x2="30%" y2="50%" stroke="#00A6FF" strokeWidth="1" />
          <line x1="30%" y1="50%" x2="60%" y2="30%" stroke="#00A6FF" strokeWidth="1" />
          <line x1="60%" y1="30%" x2="85%" y2="70%" stroke="#FF6D00" strokeWidth="1" />
          <line x1="15%" y1="75%" x2="45%" y2="55%" stroke="#72D669" strokeWidth="1" />
          <line x1="45%" y1="55%" x2="70%" y2="80%" stroke="#FFA600" strokeWidth="1" />
        </svg>

        {/* Ambient glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,166,255,0.14) 0%, transparent 70%)' }}
        />
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3.5 border border-primary/30 bg-primary/10 text-primary shadow-xs"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {!prefersReducedMotion && (
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase">
              Get Started
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Build Stronger{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #FFA600 50%, #FF6D00 100%)' }}
            >
              B2B Demand?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[620px] mx-auto mb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reach the right audiences, engage decision-makers, and create qualified sales opportunities with targeted B2B demand generation services from Taraj Global.
          </motion.p>

          {/* ── Rotating Trust Button ── */}
          <motion.div
            className="flex justify-center mb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.94 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <div
              className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full border shadow-sm transition-all duration-500 overflow-hidden"
              style={{
                backgroundColor: `${currPillar.color}08`,
                borderColor: `${currPillar.color}35`,
                boxShadow: `0 4px 20px -4px ${currPillar.color}25`,
              }}
            >
              {/* Animated beacon dot */}
              <span
                className="w-2 h-2 rounded-full shrink-0 transition-colors duration-500"
                style={{ backgroundColor: currPillar.color }}
              />

              {/* Icon */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currPillar.id}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currPillar.color}20`, color: currPillar.color }}
                >
                  <Icon className="w-3 h-3" />
                </motion.div>
              </AnimatePresence>

              {/* Label & Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currPillar.id}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 text-left"
                >
                  <span className="text-xs sm:text-sm font-bold text-text-primary tracking-tight">
                    {currPillar.label}
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: `${currPillar.color}20`,
                      color: currPillar.color,
                      border: `1px solid ${currPillar.color}40`,
                    }}
                  >
                    {currPillar.badge}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Action Buttons ── */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3.5"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.36 }}
          >
            <button
              onClick={handleStartConversation}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(90deg, #00A6FF 0%, #0080CC 100%)',
                boxShadow: '0 4px 20px rgba(0,166,255,0.3)',
              }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleExploreServices}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-text-primary border border-border bg-surface hover:bg-surface/80 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
