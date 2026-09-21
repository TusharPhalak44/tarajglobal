import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Target,
  Filter,
  CheckCircle,
  Calendar,
  Mail,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react'

// All service data for Taraj Global
const services = [
  {
    id: 'email-marketing',
    eyebrow: '01 - Email Campaigns',
    label: 'B2B Email Marketing',
    title: 'B2B Email Marketing',
    desc: 'Reach the right B2B audience with relevant messaging.',
    icon: Mail,
    image: '/email-service.jpg',
    content:
      'Engage the right companies and decision-makers through personalized B2B email marketing campaigns built around your ideal customer profile (ICP), target market, and campaign objectives. Our B2B email marketing services combine audience selection, targeted messaging, campaign execution, and engagement tracking to strengthen email outreach, generate qualified leads, and create more relevant sales opportunities.',
    highlights: ['Inbox Placement Optimization', 'A/B Tested Copywriting', 'Real-Time Engagement Tracking'],
    link: '/b2b-email-marketing',
    ctaText: 'Explore B2B Email Marketing →'
  },
  {
    id: 'abm-marketing',
    eyebrow: '02 - Account-Based Marketing',
    label: 'Account-Based Marketing (ABM)',
    title: 'Account-Based Marketing (ABM)',
    desc: 'Focus your growth strategy on high-value B2B accounts.',
    icon: Building2,
    image: '/abm.avif',
    content:
      'Identify and engage priority accounts through a targeted account-based marketing (ABM) approach. We combine account research, stakeholder identification, audience intelligence, and personalized B2B engagement strategies to help businesses connect with key decision-makers, build meaningful relationships, and create opportunities with high-value organizations.',
    highlights: ['Buying Committee Penetration', 'Tailored Account Messaging', 'Accelerated Enterprise Velocity'],
    link: '/abm',
    ctaText: 'Explore ABM Services →'
  },
  {
    id: 'mql-services',
    eyebrow: '03 - MQL Verification',
    label: 'MQL Services',
    title: 'MQL Services',
    desc: 'Turn engaged audiences into marketing-qualified opportunities.',
    icon: CheckCircle,
    image: '/mql.png',
    content:
      'Identify and verify B2B prospects that demonstrate relevant interest and meet your defined marketing qualification criteria. Our MQL services combine targeted campaigns, audience engagement, lead qualification, and data-driven verification to help marketing teams deliver qualified leads and more relevant, sales-ready opportunities to their sales teams.',
    highlights: ['Behavioral Engagement Scoring', 'Content Download Verification', 'Seamless CRM Handoff'],
    link: '/mql-services',
    ctaText: 'Explore MQL Services →'
  },
  {
    id: 'hql-services',
    eyebrow: '04 - Lead Qualification',
    label: 'HQL Services',
    title: 'HQL Services',
    desc: 'Deliver high-quality leads with verified intent and interest.',
    icon: Sparkles,
    image: '/hql.png',
    content:
      'Bridge the gap between marketing engagement and sales qualification with Highly Qualified Leads (HQL). We verify high-intent decision-makers who have engaged with specific problem-solving content, demonstrated active organizational need, and meet strict demographic and technographic qualification benchmarks.',
    highlights: ['Deep Multi-Touch Lead Qualification', 'Verified Decision-Maker Engagement', 'High Sales Conversion Velocity'],
    link: '/hql-services',
    ctaText: 'Explore HQL Services →'
  },
  {
    id: 'bant-lead-gen',
    eyebrow: '05 - Lead Qualification',
    label: 'BANT Lead Generation',
    title: 'BANT Lead Generation',
    desc: 'Prioritize prospects with genuine buying potential.',
    icon: Filter,
    image: '/bant.png',
    content:
      'Evaluate B2B prospects against Budget, Authority, Need, and Timeline to identify qualified opportunities that align with your sales criteria. Our BANT lead generation approach helps sales teams qualify and prioritize high-potential prospects, focus on decision-makers with genuine buying intent, and create stronger opportunities for business engagement.',
    highlights: ['Rigorous 4-Pillar Verification', 'Shortened Sales Velocity', 'Higher Deal Win Rates'],
    link: '/bant-lead-generation',
    ctaText: 'Explore BANT Lead Generation →'
  },
  {
    id: 'appointment-setting',
    eyebrow: '06 - Appointment Setting',
    label: 'B2B Appointment Setting',
    title: 'B2B Appointment Setting',
    desc: 'Turn qualified prospects into meaningful sales conversations.',
    icon: Calendar,
    image: '/appointment-setting.png',
    content:
      'Connect your sales team with relevant decision-makers through targeted prospecting, B2B lead qualification, and personalized outreach. Our B2B appointment-setting services help convert qualified B2B leads into sales appointments aligned with your ideal customer profile (ICP), target accounts, and campaign objectives—creating more relevant conversations and stronger sales opportunities.',
    highlights: ['Confirmed Calendar Meetings', 'Pre-Meeting Pain Point Context', 'Direct Decision-Maker Access'],
    link: '/b2b-appointment-setting',
    ctaText: 'Explore B2B Appointment Setting →'
  },
]

const CYCLE_DURATION_MS = 6000 // 6 seconds per step

const ServicesGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const activeService = services[activeIndex] || services[0]
  const IconComponent = activeService.icon

  // Handle manual selection
  const handleSelect = useCallback((index) => {
    setActiveIndex(index)
    setProgress(0)
    setIsFlipped(false)
  }, [])

  const isCardFlipped = isHovered || isFlipped

  // Auto-cycle timer with progress bar
  useEffect(() => {
    if (isPaused || isFlipped) return

    const startTime = Date.now() - (progress / 100) * CYCLE_DURATION_MS
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      const currentPct = (elapsed / CYCLE_DURATION_MS) * 100

      if (currentPct >= 100) {
        setActiveIndex((prev) => (prev + 1) % services.length)
        setProgress(0)
      } else {
        setProgress(currentPct)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [isPaused, isFlipped, activeIndex, services.length, progress])

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Dual-Pane Interactive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Pane: Detailed Display Card */}
        <div className="lg:col-span-7 relative h-full flex flex-col justify-center">
          {/* Ambient Glows Behind Card */}
          <div className="absolute -top-12 -left-12 w-72 h-72 bg-primary/10 blur-[90px] rounded-full -z-10 pointer-events-none" />
          <div className="absolute -bottom-12 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full -z-10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden h-full flex flex-col justify-center cursor-pointer lg:cursor-default"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsFlipped((prev) => !prev)}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Side - Image */}
                <motion.div
                  className="absolute inset-0 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative w-full rounded-[28px] sm:rounded-[40px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] min-h-[380px] sm:min-h-[420px] md:min-h-[460px]">
                    <img
                      src={activeService.image}
                      alt={activeService.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                    
                    {/* Mobile Tap Indicator */}
                    <div className="absolute top-4 left-4 lg:hidden px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] text-white font-medium flex items-center gap-1.5 shadow-md">
                      <span>Tap for details</span>
                      <span className="text-primary font-bold">↻</span>
                    </div>

                    {/* Giant Faint Watermark Step Number */}
                    <div className="absolute top-1 right-4 sm:right-7 text-[50px] sm:text-[80px] lg:text-[100px] font-black text-white/10 leading-none select-none pointer-events-none">
                      0{activeIndex + 1}
                    </div>

                    {/* Title on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2">
                        {activeService.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80">
                        {activeService.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Back Side - Content */}
                <motion.div
                  className="absolute inset-0 backface-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="relative p-5 sm:p-8 md:p-10 lg:p-11 rounded-[28px] sm:rounded-[40px] border-2 border-primary/30 dark:border-primary/50 bg-surface/95 dark:bg-surface/90 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[380px] sm:min-h-[420px] md:min-h-[460px] overflow-hidden">
                    {/* Mobile Flip Back Indicator */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsFlipped(false)
                      }}
                      className="lg:hidden absolute top-3.5 right-4 z-30 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-semibold text-primary flex items-center gap-1 min-h-[32px]"
                      aria-label="Flip card back to cover"
                    >
                      <span>Flip Back ↻</span>
                    </button>

                    {/* Giant Faint Watermark Step Number */}
                    <div className="absolute top-1 right-4 sm:right-7 text-[50px] sm:text-[80px] lg:text-[100px] font-black text-primary/10 dark:text-primary/15 leading-none select-none pointer-events-none">
                      0{activeIndex + 1}
                    </div>

                    <div className="relative z-10 flex flex-col gap-6">
                      {/* Top Eyebrow Tag + Horizontal Accent Line */}
                      <div className="flex items-center gap-3">
                        <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/25 shadow-xs">
                          <span className="text-[10px] sm:text-xs font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase tracking-[0.22em]">
                            {activeService.eyebrow}
                          </span>
                        </div>
                        <div className="h-px w-12 bg-gradient-to-r from-primary/40 to-transparent" />
                      </div>

                      {/* Icon + Main Title */}
                      <div>
                        <div className="flex items-center gap-4 sm:gap-5">
                          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/25 shadow-md flex items-center justify-center shrink-0">
                            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                          </div>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight leading-tight dark:text-white">
                            {activeService.title}
                          </h3>
                        </div>

                        {/* Gradient Underline Pill */}
                        <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
                      </div>

                      {/* Content Description with Vertical Left Line */}
                      <div className="relative flex gap-4 my-1">
                        <div className="hidden sm:block w-0.5 bg-gradient-to-b from-primary/50 via-accent/30 to-transparent shrink-0 rounded-full" />
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal dark:text-gray-300">
                          {activeService.content}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4"
                      >
                        <Link
                          to={activeService.link}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full sm:w-auto"
                        >
                          {activeService.ctaText}
                          <ArrowRight size={16} />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Pane: Interactive Tiered Step Stack */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[440px] flex flex-col items-center">
            {/* Center Vertical Laser Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-primary/20 hidden md:block">
              <motion.div
                animate={{
                  top: [
                    `${(100 / services.length) * activeIndex}%`,
                    `${(100 / services.length) * (activeIndex + 1)}%`
                  ],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 -translate-x-1/2 w-2.5 h-16 bg-gradient-to-b from-primary via-accent to-transparent blur-[2px] z-10"
              />
            </div>

            {/* Stack of Cards */}
            <div className="w-full flex flex-col items-center gap-3 relative z-20">
              {services.map((service, index) => {
                const isActive = activeIndex === index

                return (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      scale: isActive ? 1.03 : 1
                    }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    onMouseEnter={() => handleSelect(index)}
                    onClick={() => handleSelect(index)}
                    aria-label={`View details for ${service.title}`}
                    className="group relative transition-all duration-300 w-full text-left cursor-pointer"
                  >
                    <motion.div
                      className={`relative px-4 sm:px-5 py-3.5 text-center rounded-2xl overflow-hidden border transition-all duration-300 ${
                        isActive
                          ? 'bg-surface border-primary/70 shadow-[0_12px_32px_rgba(0,166,255,0.22)] dark:shadow-[0_0_30px_-5px_rgba(0,166,255,0.75),0_0_12px_rgba(0,229,255,0.4)] dark:bg-gray-800 dark:border-primary z-30 ring-1 ring-primary/40'
                          : 'bg-surface/85 dark:bg-gray-800/60 border-border/80 dark:border-gray-600 shadow-xs hover:border-primary/40 dark:hover:shadow-[0_0_22px_-3px_rgba(0,166,255,0.6)] dark:hover:border-primary/70 z-20'
                      }`}
                      whileHover={{ 
                        scale: 1.02,
                        y: -2
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated Background Gradient */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Step Number Badge */}
                      <motion.div 
                        className="absolute top-2.5 left-3.5"
                        animate={{ 
                          scale: isActive ? [1, 1.2, 1] : 1,
                          opacity: isActive ? 1 : 0.7
                        }}
                        transition={{ 
                          duration: 0.5,
                          repeat: isActive ? Infinity : 0,
                          repeatDelay: 1
                        }}
                      >
                        <span className="text-[10px] font-mono font-extrabold text-primary">
                          0{index + 1}
                        </span>
                      </motion.div>

                      {/* Eyebrow / Category Label */}
                      <motion.p
                        className={`text-[9px] uppercase tracking-[0.22em] font-extrabold mb-0.5 transition-colors ${
                          isActive
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'
                            : 'text-text-muted dark:text-gray-400'
                        }`}
                        animate={{ 
                          y: isActive ? [0, -2, 0] : 0
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        {service.label}
                      </motion.p>

                      {/* Card Title */}
                      <motion.h4
                        className={`text-xs sm:text-sm font-extrabold tracking-tight leading-tight transition-colors ${
                          isActive ? 'text-text-primary dark:text-white' : 'text-text-secondary group-hover:text-text-primary dark:text-gray-300 dark:group-hover:text-white'
                        }`}
                        animate={{ 
                          scale: isActive ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.title}
                      </motion.h4>

                      {/* Short Description */}
                      <motion.p
                        className={`text-[10px] mt-0.5 leading-normal font-medium transition-colors hidden sm:block ${
                          isActive ? 'text-text-secondary dark:text-gray-300' : 'text-text-muted dark:text-gray-400'
                        }`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0.6,
                          y: isActive ? 0 : 5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.desc}
                      </motion.p>

                      {/* Live Auto-Advancing Progress Bar */}
                      {isActive && !isPaused && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${progress}%` }}
                          animate={{ 
                            boxShadow: [
                              "0 0 0px rgba(0, 166, 255, 0)",
                              "0 0 10px rgba(0, 166, 255, 0.5)",
                              "0 0 0px rgba(0, 166, 255, 0)"
                            ]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}

                      {/* Floating Particles */}
                      {isActive && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-primary rounded-full"
                              initial={{ 
                                x: Math.random() * 100,
                                y: Math.random() * 100,
                                opacity: 0
                              }}
                              animate={{ 
                                y: [0, -20, 0],
                                x: [0, (Math.random() - 0.5) * 20, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>

                    {/* Glowing Backdrop for Active Card */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute -inset-1 bg-gradient-to-r from-primary/25 to-accent/25 blur-2xl -z-10 rounded-full"
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Bottom Subtle Indicator Dots */}
            <div className="mt-8 flex flex-col items-center gap-1.5 opacity-50">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesGrid
