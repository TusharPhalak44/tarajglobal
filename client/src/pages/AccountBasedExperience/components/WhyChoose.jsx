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
    title: 'Buyer-Centric Orchestration',
    desc: 'We replace high-pressure sales pitches with high-value buyer experiences that respect the committee’s time and strategic priorities.',
    icon: Crosshair,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '02',
    title: 'True RevOps Alignment',
    desc: 'Marketing, sales development, and account executives share unified intelligence, messaging, and account milestones in real time.',
    icon: Briefcase,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '03',
    title: 'Deep Buying Group Penetration',
    desc: 'Every engagement reaches across executive, technical, and commercial stakeholders, preventing single-threaded deal collapse.',
    icon: SlidersHorizontal,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '04',
    title: 'DemandFlow Telemetry & Automation',
    desc: 'Our proprietary DemandFlow Bridge infrastructure tracks intent across digital, email, and tele-touchpoints to time every outreach perfectly.',
    icon: PieChart,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
  {
    num: '05',
    title: 'Sustained Pipeline & Expansion Lift',
    desc: 'ABX doesn’t stop at the first meeting. Our programs maintain account momentum through contract signature and into multi-divisional expansion.',
    icon: CheckCheck,
    bgImage: '/light 3.png',
    darkBgImage: '/dark 3.png',
  },
]

const WhyChooseCard = ({ item, index, prefersReducedMotion }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const Icon = item.icon

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -5,
              transition: { duration: 0.3, ease: 'easeOut' },
            }
      }
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 overflow-hidden min-h-[220px] sm:min-h-[240px] cursor-pointer bg-white/95 dark:bg-[#0B1527] border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-primary/50 dark:hover:border-[#00A6FF]/60"
      style={{
        backgroundImage: isDark
          ? `linear-gradient(135deg, rgba(11, 21, 39, 0.88), rgba(7, 13, 24, 0.94)), url('${item.darkBgImage}')`
          : `linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.96)), url('${item.bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 166, 255, 0.12), transparent 70%)`,
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-[0_0_12px_#00A6FF]" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span className="font-mono text-[10.5px] sm:text-[11px] font-bold text-primary dark:text-[#00A6FF] bg-primary/10 dark:bg-[#00A6FF]/15 px-2.5 py-0.5 rounded-lg border border-primary/25 dark:border-[#00A6FF]/40 tracking-wider">
              {item.num}
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#060D19] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-primary dark:text-[#00A6FF] group-hover:scale-105 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-[#00A6FF] dark:group-hover:text-black dark:group-hover:border-[#00A6FF] transition-all duration-300 shadow-xs group-hover:shadow-[0_0_15px_rgba(0,166,255,0.6)]">
              <Icon className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>

          <h3 className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-1.5 group-hover:text-primary dark:group-hover:text-[#00A6FF] transition-colors duration-200">
            {item.title}
          </h3>

          <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>

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
            <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Proven Enterprise Advantage
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-slate-900 dark:text-text-primary dark:text-white">Why Choose Taraj Global for </span>
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              ABX Services?
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mt-2 font-normal"
          >
            We synchronize intent telemetry, committee personalization, and automated CRM delivery to turn target enterprise logos into committed pipeline.
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

