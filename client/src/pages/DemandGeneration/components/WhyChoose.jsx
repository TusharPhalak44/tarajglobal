import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Crosshair,
  Briefcase,
  SlidersHorizontal,
  PieChart,
  CheckCheck,
} from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    title: 'Targeted B2B Audiences',
    desc: 'Campaigns built around precision ICP characteristics. Every demand generation workflow, from audience selection to content syndication, is grounded in your target market definition.',
    icon: Crosshair,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '02',
    title: 'Decision-Maker Reach',
    desc: 'Connect with high-value buying committees instead of broad, untargeted audiences. Taraj Global engages the specific executives and stakeholders who hold budget authority.',
    icon: Briefcase,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '03',
    title: 'Data-Driven Campaigns',
    desc: 'Leverage real-time intent telemetry and engagement tracking to optimize outreach. Monitoring content consumption, clicks, and intent surges continuously sharpens campaign yield.',
    icon: SlidersHorizontal,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '04',
    title: 'Buyer Engagement',
    desc: 'Deliver high-value educational content and multi-touch cadences aligned with audience context, creating authentic buyer interest and category authority.',
    icon: PieChart,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '05',
    title: 'Sales Pipeline Support',
    desc: 'Turn top-of-funnel engagement into validated, sales-ready opportunities. Rigorous qualification ensures your sales reps focus strictly on high-intent accounts with active timelines.',
    icon: CheckCheck,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
]

const WhyChooseCard = ({ item, index, prefersReducedMotion }) => {
  const [isDark, setIsDark] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()

    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const currentBgImage = isDark ? item.darkBgImage : item.bgImage
  const Icon = item.icon

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.07 }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -6,
              scale: 1.02,
            }
      }
      className="relative group rounded-xl p-3 sm:p-3.5 bg-white/95 dark:bg-[#0B1424]/90 border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,102,204,0.18),0_0_20px_-3px_rgba(0,166,255,0.12)] hover:border-primary/50 dark:hover:shadow-[0_10px_30px_-5px_rgba(0,166,255,0.35),0_0_15px_-2px_rgba(0,166,255,0.2)] dark:hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Dynamic Cursor Torchlight Inner Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-1"
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 166, 255, 0.22), transparent 70%)`,
          }}
        />
      )}

      {/* Background Image - appears on hover with enhanced circuit visibility */}
      {currentBgImage && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0 overflow-hidden">
          <img
            src={currentBgImage}
            alt=""
            className="w-full h-full object-cover contrast-[1.25] brightness-[0.98] dark:contrast-[1.15] dark:brightness-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: 'center' }}
          />
          {/* Subtle gradient overlay that keeps text legible without hiding the circuits */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/65 via-white/15 to-transparent dark:from-[#0B1424]/70 dark:via-[#0B1424]/20 dark:to-transparent" />
        </div>
      )}

      {/* Top Subtle Hover Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Top Bar: Number Tag & Icon */}
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span className="font-mono text-[10.5px] sm:text-[11px] font-black text-primary dark:text-[#00A6FF] bg-primary/10 dark:bg-[#00A6FF]/15 px-2 py-0.5 rounded-md border border-primary/25 dark:border-[#00A6FF]/30">
              {item.num}
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#060D19] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-primary dark:text-[#00A6FF] group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-[#00A6FF] dark:group-hover:text-black transition-all duration-300 shadow-xs">
              <Icon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-1.5 group-hover:text-primary dark:group-hover:text-[#00A6FF] transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-[11.5px] text-slate-600 dark:text-slate-300/85 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const WhyChoose = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="why-choose-taraj-global"
      className="relative py-8 sm:py-10 lg:py-12 bg-white dark:bg-[#070D18] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300 overflow-hidden"
      aria-label="Why Choose Taraj Global for B2B Demand Generation"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] bg-[#00A6FF]/10 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] bg-[#FF6D00]/10 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 backdrop-blur-md mb-2 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-primary dark:text-[#00A6FF] uppercase">
              Our Core Strengths
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            <span>Why Choose Taraj Global for </span>
            <span className="bg-gradient-to-r from-primary via-[#00A6FF] to-cta bg-clip-text text-transparent">
              B2B Demand Generation?
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mt-1.5 font-normal"
          >
            Five structural advantages that ensure your demand generation campaigns generate authentic buyer demand and sales pipeline.
          </motion.p>
        </div>

        {/* ── 5 Spotlight Cards Grid — Always single-row on Desktop (lg:grid-cols-5) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 items-stretch">
          {PILLARS.map((pillar, idx) => (
            <WhyChooseCard
              key={pillar.num}
              item={pillar}
              index={idx}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
