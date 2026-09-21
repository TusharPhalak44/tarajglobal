import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  Zap,
  Users,
  Calendar,
  HeartHandshake,
  Database,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const OBJECTIVES = [
  {
    id: 'leads',
    num: '01',
    label: 'Generate Leads',
    icon: Target,
    heading: 'Generate Leads',
    desc: 'Identify and connect with the decision-makers who matter most.',
    recommended: [
      { name: 'B2B Lead Generation', route: '/sql-services' },
      { name: 'BANT Lead Generation', route: '/bant-lead-generation' },
      { name: 'MQL Services', route: '/mql-services' },
      { name: 'SQL Lead Generation', route: '/sql-services' },
    ],
  },
  {
    id: 'demand',
    num: '02',
    label: 'Create Demand',
    icon: Zap,
    heading: 'Create Demand',
    desc: 'Transform passive market prospects into active in-market buyers.',
    recommended: [
      { name: 'Demand Generation', route: '/demand-generation' },
      { name: 'Content Syndication', route: '/content-syndication' },
      { name: 'Webinar Services', route: '/webinar-services' },
    ],
  },
  {
    id: 'decision-makers',
    num: '03',
    label: 'Reach Decision-Makers',
    icon: Users,
    heading: 'Reach Decision-Makers',
    desc: 'Penetrate strategic C-suite and VP-level buying committees.',
    recommended: [
      { name: 'Account-Based Marketing', route: '/abm' },
      { name: 'B2B Email Marketing', route: '/b2b-email-marketing' },
      { name: 'B2B Appointment Setting', route: '/b2b-appointment-setting' },
    ],
  },
  {
    id: 'meetings',
    num: '04',
    label: 'Book Meetings',
    icon: Calendar,
    heading: 'Book Meetings',
    desc: 'Fill your sales reps’ calendars with confirmed, qualified buyer conversations.',
    recommended: [
      { name: 'B2B Appointment Setting', route: '/b2b-appointment-setting' },
      { name: 'SQL Lead Generation', route: '/sql-services' },
    ],
  },
  {
    id: 'nurture',
    num: '05',
    label: 'Nurture Prospects',
    icon: HeartHandshake,
    heading: 'Nurture Prospects',
    desc: 'Educate delayed opportunities and revive stalled pipeline accounts.',
    recommended: [
      { name: 'Lead Nurturing', route: '/lead-nurturing' },
      { name: 'Content Syndication', route: '/content-syndication' },
    ],
  },
  {
    id: 'data',
    num: '06',
    label: 'Improve Data Quality',
    icon: Database,
    heading: 'Improve Data Quality',
    desc: 'Cleanse legacy CRM databases and build custom-curated prospect lists.',
    recommended: [
      { name: 'B2B List Building', route: '/b2b-list-building' },
      { name: 'Database Cleansing', route: '/database-cleansing' },
    ],
  },
]

export default function ReferenceObjective() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  // ── Auto-cycle through objectives one by one every 3.8s ──
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % OBJECTIVES.length)
    }, 3800)

    return () => clearInterval(timer)
  }, [isPaused])

  const current = OBJECTIVES[currentIndex]

  const handleSelect = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1)
    setCurrentIndex(idx)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % OBJECTIVES.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + OBJECTIVES.length) % OBJECTIVES.length)
  }

  const scrollToCoreServices = () => {
    const el = document.getElementById('core-services-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="growth-objective-section"
      className="relative py-24 lg:py-28 bg-white dark:bg-[#080B11] text-[#0F172A] dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ══════════ LEFT COLUMN: Heading & Copy (4 cols) ══════════ */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-[#FF6D00]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                WHAT DO YOU NEED?
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Choose Your <br />
              Growth Objective
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-white/70 leading-relaxed font-normal">
              Every business has different goals. Select what you want to achieve and explore the right services for your needs.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={scrollToCoreServices}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-800 dark:border-white/30 text-slate-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer group"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ══════════ RIGHT COLUMN: Animated Navigation Icons & Movable Card Panel (8 cols) ══════════ */}
          <div
            className="lg:col-span-8 flex flex-col gap-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Horizontal Row of 6 Circular Objective Icons with Active Animations */}
            <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-2 relative">
              {OBJECTIVES.map((obj, idx) => {
                const isActive = currentIndex === idx
                const Icon = obj.icon

                return (
                  <button
                    key={obj.id}
                    onClick={() => handleSelect(idx)}
                    className="group relative flex flex-col items-center gap-2 cursor-pointer transition-all shrink-0 min-w-[90px]"
                  >
                    {/* Circle Icon with smooth scale & glow on active */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                        isActive
                          ? 'bg-[#FF6D00] text-white shadow-lg shadow-[#FF6D00]/40 scale-110'
                          : 'border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0F1624] text-slate-600 dark:text-white/60 group-hover:border-[#FF6D00] group-hover:text-[#FF6D00]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />

                      {/* Active Ring Pulse */}
                      {isActive && (
                        <span className="absolute -inset-1 rounded-full border border-[#FF6D00]/50 animate-ping pointer-events-none" />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-[11px] sm:text-xs font-bold text-center leading-tight transition-colors ${
                        isActive
                          ? 'text-slate-900 dark:text-white font-extrabold'
                          : 'text-slate-500 dark:text-white/50 group-hover:text-slate-800 dark:group-hover:text-white'
                      }`}
                    >
                      {obj.label}
                    </span>

                    {/* Small Line directly under the highlighted item only */}
                    {isActive ? (
                      <motion.div
                        layoutId="activeObjectiveSmallLine"
                        className="w-7 h-[3px] rounded-full bg-[#FF6D00] shadow-[0_0_8px_rgba(255,109,0,0.8)] mt-1.5 shrink-0"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    ) : (
                      <div className="w-7 h-[3px] mt-1.5 shrink-0 opacity-0 pointer-events-none" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Large Elevated Card Panel with Directional Slide Transitions */}
            <div className="relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={{
                    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
                    center: { opacity: 1, x: 0 },
                    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative rounded-3xl border border-slate-200/90 dark:border-white/10 bg-[#FDFEFE] dark:bg-[#0D131F] p-8 sm:p-10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 overflow-hidden transition-colors duration-300"
                >
                  {/* Giant Faint Watermark Number "01", "02", etc. */}
                  <div className="absolute -bottom-6 -left-2 text-[130px] font-black font-mono text-slate-200/40 dark:text-white/[0.04] select-none pointer-events-none leading-none">
                    {current.num}
                  </div>

                  {/* Top-Right Action Controls (Prev/Next & Link) */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-white/60 hover:border-[#FF6D00] hover:text-[#FF6D00] transition-colors cursor-pointer"
                      title="Previous objective"
                      aria-label="Previous objective"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-white/60 hover:border-[#FF6D00] hover:text-[#FF6D00] transition-colors cursor-pointer"
                      title="Next objective"
                      aria-label="Next objective"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div
                      onClick={() => navigate(current.recommended[0].route)}
                      className="w-9 h-9 rounded-full bg-[#FF6D00] flex items-center justify-center text-white shadow-md shadow-[#FF6D00]/30 hover:scale-110 transition-transform cursor-pointer"
                      title="Open recommended solution"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 items-start">
                    {/* Left inside card: Heading & Description */}
                    <div className="md:col-span-6 pr-4">
                      <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#FF6D00]">
                        <span>OBJECTIVE {current.num}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
                        <span className="text-slate-400 dark:text-white/40">STEP {currentIndex + 1} OF 6</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {current.heading}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 dark:text-white/70 leading-relaxed font-normal">
                        {current.desc}
                      </p>
                    </div>

                    {/* Right inside card: Recommended Services Caret List */}
                    <div className="md:col-span-6 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-white/50 font-bold mb-3">
                          Recommended Services
                        </div>
                        <div className="space-y-2">
                          {current.recommended.map((srv, idx) => (
                            <div
                              key={idx}
                              onClick={() => navigate(srv.route)}
                              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-white/80 hover:text-[#FF6D00] dark:hover:text-[#FF6D00] cursor-pointer transition-colors group"
                            >
                              <span className="text-[#FF6D00] font-bold">&gt;</span>
                              <span className="group-hover:translate-x-0.5 transition-transform">{srv.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => navigate(current.recommended[0].route)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FF6D00] hover:text-[#FF8A00] transition-colors cursor-pointer group"
                        >
                          <span>Explore Solution</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
