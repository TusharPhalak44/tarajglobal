import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Crosshair,
  Briefcase,
  PieChart,
  CheckCheck,
  Star,
  Zap,
} from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    title: 'Targeted Audience Generation',
    desc: 'Reach relevant prospects based on defined audience and ICP criteria. Every outreach decision is grounded in verified buyer fit.',
    icon: Crosshair,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '02',
    title: 'Decision-Maker Reach',
    desc: 'Engage relevant stakeholders within target businesses, ensuring senior leaders attend and participate in your sessions.',
    icon: Briefcase,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '03',
    title: 'Campaign Intelligence',
    desc: 'Track registrations, live engagement, and buyer signals across the entire webinar lifecycle with rich telemetry.',
    icon: PieChart,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '04',
    title: 'Qualified Lead Delivery',
    desc: 'Help sales teams focus on verified webinar leads and sales-qualified opportunities that possess active commercial intent.',
    icon: CheckCheck,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '05',
    title: 'Pipeline Acceleration',
    desc: 'Turn virtual engagement into revenue-producing pipeline through rapid, structured post-event sales enablement.',
    icon: Zap,
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

      {/* Background Image on hover */}
      {currentBgImage && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0 overflow-hidden">
          <img
            src={currentBgImage}
            alt=""
            className="w-full h-full object-cover contrast-[1.25] brightness-[0.98] dark:contrast-[1.15] dark:brightness-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/65 via-white/15 to-transparent dark:from-[#0B1424]/70 dark:via-[#0B1424]/20 dark:to-transparent" />
        </div>
      )}

      {/* Top Subtle Hover Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span className="font-mono text-[10.5px] sm:text-[11px] font-black text-primary dark:text-[#00A6FF] bg-primary/10 dark:bg-[#00A6FF]/15 px-2 py-0.5 rounded-md border border-primary/25 dark:border-[#00A6FF]/30">
              {item.num}
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#060D19] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-primary dark:text-[#00A6FF] group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-[#00A6FF] dark:group-hover:text-black transition-all duration-300 shadow-xs">
              <Icon className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3 className="text-[13.5px] sm:text-[14px] font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-1.5 group-hover:text-primary dark:group-hover:text-[#00A6FF] transition-colors duration-200">
            {item.title}
          </h3>

          <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>

        <div className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-orange-500 mt-2.5 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  )
}

const WhyChoose = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="why-choose-taraj-global-webinars"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="Why Choose Taraj Global for B2B Webinar Services"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00A6FF]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-xs"
          >
            <Star className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" />
            <span className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              Why Taraj Global
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-slate-900 dark:text-white">Why Choose Taraj Global for </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">
              B2B Webinar Services?
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
          >
            Targeted webinar campaigns that generate qualified registrations and meaningful executive sales conversations.
          </motion.p>
        </div>

        {/* ── 5 Pillars: 5 Cards in 1 Row (lg:grid-cols-5) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {PILLARS.map((item, idx) => (
            <WhyChooseCard
              key={item.num}
              item={item}
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
