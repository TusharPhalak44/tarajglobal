import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'

const SERVICE_INDEX = [
  { num: '01', title: 'DEMAND GENERATION', link: '/demand-generation' },
  { num: '02', title: 'B2B LEAD GENERATION', link: '/sql-services' },
  { num: '03', title: 'QUALIFICATION', link: '/bant-lead-generation' },
  { num: '04', title: 'APPOINTMENT SETTING', link: '/b2b-appointment-setting' },
  { num: '05', title: 'EMAIL MARKETING', link: '/b2b-email-marketing' },
  { num: '06', title: 'ABM', link: '/abm' },
]

export default function EditorialHero() {
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoveredManually, setIsHoveredManually] = useState(false)
  const timerRef = useRef(null)

  // Auto-cycle the active service every 3.5 seconds when not manually hovered
  useEffect(() => {
    if (prefersReducedMotion || isHoveredManually) return

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICE_INDEX.length)
    }, 3500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [prefersReducedMotion, isHoveredManually])

  const handleScrollToServices = () => {
    const el = document.getElementById('services-list') || document.querySelector('section:nth-of-type(2)')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Calculate percentage down the vertical index track for the moving blue indicator
  const indicatorPercent = (activeIndex / (SERVICE_INDEX.length - 1)) * 100

  return (
    <section
      className="relative min-h-[70vh] lg:min-h-[75vh] flex flex-col justify-between pt-20 sm:pt-22 lg:pt-24 pb-8 sm:pb-10 overflow-hidden bg-background select-none transition-colors duration-500"
      aria-label="Taraj Global Services — Everything You Need to Build Better B2B Growth"
    >
      {/* ── Background: Very Faint Technical Hairline Grid ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Subtle radial ambient blue light */}
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full blur-[160px] bg-primary/[0.04] dark:bg-primary/[0.06] pointer-events-none" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 my-auto">
        {/* ══════════ 50 / 50 SPLIT LAYOUT ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ══════════ LEFT COLUMN: Editorial Messaging (50% -> Span 6 on LG) ══════════ */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Eyebrow: OUR SERVICES */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md mb-5 sm:mb-6 self-start"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-primary">
                OUR SERVICES
              </span>
            </motion.div>

            {/* Main H1: Everything You Need to Build Better B2B Growth. */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[56px] font-black text-text-primary tracking-tight leading-[1.08] mb-6"
            >
              <span>Everything You Need to </span>
              <span className="block mt-1 sm:mt-1.5">
                Build Better{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#0088FF] to-cta font-black inline-block">
                  B2B Growth.
                </span>
                <span
                  className="inline-block w-8 sm:w-10 h-[3px] bg-cta ml-3 sm:ml-4 align-middle mb-1 rounded-full"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-[540px] mb-8 sm:mb-10"
            >
              From demand generation to qualified leads and appointment setting, we connect the right strategies, data and execution to help B2B businesses create meaningful opportunities.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={handleScrollToServices}
                className="cursor-pointer group"
              >
                <StarButton
                  as="div"
                  className="h-12 px-7 text-[13px] font-bold tracking-wide uppercase shadow-lg shadow-primary/20 text-white dark:text-neutral-900 flex items-center justify-center gap-2 transition-transform duration-300 active:scale-95"
                  lightColor={isDark ? '#87CEEB' : '#FF8533'}
                  backgroundColor={isDark ? '#00A6FF' : '#FF6D00'}
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </StarButton>
              </button>

              <Link
                to="/contact"
                className="h-12 px-7 rounded-xl text-[13px] font-bold uppercase tracking-wider text-text-primary border border-border/80 hover:border-primary/60 hover:bg-surface/60 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>Talk to Our Team</span>
              </Link>
            </motion.div>
          </div>

          {/* ══════════ RIGHT COLUMN: Editorial Service Index (50% -> Span 6 on LG) ══════════ */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            
            {/* ── Large Background Editorial Word: "SERVICES" ── */}
            <div
              className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none -z-10 select-none overflow-hidden"
              aria-hidden="true"
            >
              <span className="font-black text-[96px] lg:text-[116px] xl:text-[132px] tracking-[0.22em] text-text-primary opacity-[0.025] dark:opacity-[0.04] leading-none uppercase">
                SERVICES
              </span>
            </div>

            {/* ── Main Vertical Index Composition ── */}
            <div className="relative flex items-stretch gap-6 sm:gap-8">
              
              {/* Vertical Visual Index Track: 01 (top) to 12 (bottom) with moving indicator */}
              <div className="flex flex-col items-center justify-between py-1 shrink-0 select-none">
                <span className="font-mono text-[11px] font-bold text-text-muted">
                  01
                </span>

                {/* Vertical Hairline Track */}
                <div className="relative w-[1.5px] h-full my-3 bg-border/60 overflow-visible">
                  {/* Small Moving Blue Indicator Dot */}
                  <motion.div
                    className="absolute -left-[3.5px] w-2 h-2 rounded-full bg-primary shadow-xs"
                    animate={{ top: `${indicatorPercent}%` }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <span className="font-mono text-[11px] font-bold text-text-muted">
                  12
                </span>
              </div>

              {/* Editorial Service Rows */}
              <div
                className="flex-1 space-y-4 sm:space-y-5 py-1"
                onMouseEnter={() => setIsHoveredManually(true)}
                onMouseLeave={() => setIsHoveredManually(false)}
              >
                {SERVICE_INDEX.map((srv, idx) => {
                  const isActive = activeIndex === idx
                  return (
                    <Link
                      key={srv.num}
                      to={srv.link}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`group relative block transition-all duration-300 ${
                        isActive ? 'translate-x-[5px]' : 'translate-x-0'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        {/* Number & Service Title */}
                        <div className="flex items-baseline gap-3 sm:gap-4">
                          <span
                            className={`font-mono text-xs sm:text-sm font-bold transition-colors duration-200 ${
                              isActive ? 'text-primary' : 'text-text-muted opacity-60'
                            }`}
                          >
                            {srv.num}
                          </span>

                          <h3
                            className={`text-lg sm:text-xl lg:text-2xl tracking-tight transition-all duration-200 ${
                              isActive
                                ? 'font-black text-text-primary'
                                : 'font-bold text-text-secondary opacity-40 hover:opacity-75'
                            }`}
                          >
                            {srv.title}
                          </h3>
                        </div>

                        {/* Active State Indicator Arrow */}
                        <div className="flex items-center gap-2">
                          <ArrowRight
                            className={`w-4 h-4 text-primary transition-all duration-200 ${
                              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Active Indicator Hairline Underneath */}
                      <div
                        className={`h-[1.5px] bg-primary mt-2 transition-all duration-300 origin-left ${
                          isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                        }`}
                      />
                    </Link>
                  )
                })}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ── Hero Bottom Metadata & Subtle Scroll Indicator ── */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mt-8 pt-4 border-t border-border/40 select-none">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-text-muted">
          {/* Left Label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="font-bold tracking-[0.2em] uppercase">
              12 B2B GROWTH SOLUTIONS
            </span>
          </div>

          {/* Right Scroll Indicator */}
          <button
            type="button"
            onClick={handleScrollToServices}
            className="inline-flex items-center gap-1.5 font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors cursor-pointer group"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-3.5 h-3.5 text-primary group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
