import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useTheme } from '@context/ThemeContext'
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
    title: 'One Unified Account Experience',
    desc: 'Committees notice when marketing, SDRs, and sales contradict each other. We run all teams on one account playbook and one cadence, so every touch builds on the last.',
    icon: Crosshair,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '02',
    title: 'Stage-Aware Personalization',
    desc: 'Content that ignores where a buyer is in the journey loses credibility. Messaging, assets, and offers are matched to each stakeholder’s role and buying stage, not just their industry.',
    icon: Briefcase,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '03',
    title: 'Sales & Marketing Orchestration',
    desc: ' Siloed teams create duplicate outreach and gaps in follow-up. Shared sequencing rules and a unified account view keep marketing and SDR activity coordinated from first touch to meeting.',
    icon: SlidersHorizontal,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '04',
    title: 'AI-Assisted Behavioral Intelligence',
    desc: 'Fixed sequences miss the moment a committee turns active. AI-assisted intent and engagement signals tell us when to adapt content, channel, or timing, so the next touch fits the buyer’s current behavior.',
    icon: PieChart,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '05',
    title: ' Context-Rich Handoffs & Attribution',
    desc: ' AEs who start cold force buyers to repeat themselves. CDQA-audited opportunities arrive with full touch history and route into your CRM with account-level attribution, so you can see which touches drive pipeline.',
    icon: CheckCheck,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
]

const WhyChooseCard = ({ item, index, prefersReducedMotion }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

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
      className="relative group rounded-2xl p-3 sm:p-3.5 bg-white/95 dark:bg-[#0B1424]/90 border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,102,204,0.18),0_0_20px_-3px_rgba(0,166,255,0.12)] hover:border-primary/50 dark:hover:shadow-[0_0_30px_rgba(0,166,255,0.35),0_10px_25px_-5px_rgba(0,166,255,0.25)] dark:hover:border-[#00A6FF]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Dynamic Cursor Torchlight Inner Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-1"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 166, 255, 0.22), transparent 70%)`,
          }}
        />
      )}

      {/* Background Image - appears on hover with circuit visibility */}
      {currentBgImage && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0 overflow-hidden">
          <img
            src={currentBgImage}
            alt=""
            className="w-full h-full object-cover contrast-[1.25] brightness-[1.02] dark:contrast-[1.2] dark:brightness-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: 'center' }}
          />
          {/* Gradient overlay keeping text legible without obscuring circuits */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent dark:from-[#08101E]/80 dark:via-[#08101E]/30 dark:to-transparent" />
        </div>
      )}

      {/* Top Cyan Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-[0_0_12px_#00A6FF]" />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Top Bar: Number Tag & Icon */}
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span className="font-mono text-[10.5px] sm:text-[11px] font-bold text-primary dark:text-[#00A6FF] bg-primary/10 dark:bg-[#00A6FF]/15 px-2.5 py-0.5 rounded-lg border border-primary/25 dark:border-[#00A6FF]/40 tracking-wider">
              {item.num}
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#060D19] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-primary dark:text-[#00A6FF] group-hover:scale-105 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-[#00A6FF] dark:group-hover:text-black dark:group-hover:border-[#00A6FF] transition-all duration-300 shadow-xs group-hover:shadow-[0_0_15px_rgba(0,166,255,0.6)]">
              <Icon className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>

          {/* Main Title */}
          <h3 className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-1.5 group-hover:text-primary dark:group-hover:text-[#00A6FF] transition-colors duration-200">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>

        {/* Bottom Accent line expanding on hover */}
        <div className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-[#FF6D00] dark:from-[#00A6FF] dark:to-[#FF6D00] mt-3 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  )
}

const WhyChoose = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="why-choose-taraj-global-abx"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="Why Choose Taraj Global for ABX Services"
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
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-primary/10 dark:bg-[#00A6FF]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-cta/10 dark:bg-[#FF6D00]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-3"
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              WHY TARAJ GLOBAL • TECH-ENABLED VALUE PROPOSITION
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-slate-900 dark:text-text-primary dark:text-white">Why Choose Taraj Global for </span>
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              ACCOUNT-BASED EXPERIENCE
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mt-2 font-normal"
          >
           Enterprise ABX backed by in-house verification infrastructure, delivering one consistent buyer journey and context-rich handoffs straight into your CRM via DemandFlow Bridge.

          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
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

