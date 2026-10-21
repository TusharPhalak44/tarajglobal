import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const LEADERSHIP_MEMBERS = [
  {
    id: 'hanmant',
    name: 'Hanmant Dhotre',
    roleTag: 'FOUNDER & CEO',
    position: 'Vision, Leadership & Business Direction',
    introduction:
      'Hanmant Dhotre founded TaRaj Global to replace unverified B2B outbound marketing with engineered growth architecture. Under his leadership, the firm scaled into an ISO 9001:2015 and ISO 27001:2022 certified enterprise. He guides technical strategy across US, EMEA, and APAC markets using proprietary verification tools to deliver predictable revenue pipeline.',
    image: '/Hanmant-Dhotre.webp',
    social: {
      linkedin: 'https://www.linkedin.com/in/hanmant-dhotre-3799b425/',
      email: 'hanmant.dhotre@tarajglobal.com',
    },
  },
  {
    id: 'tushar',
    name: 'Tushar Phalak',
    roleTag: 'CO-FOUNDER & CTO',
    position: 'Growth, Marketing & Demand Generation',
    introduction:
      'Tushar Phalak leads growth architecture and campaign strategy at TaRaj Global, specializing in multi-touch B2B lead generation and ABM. He integrates real-time intent telemetry with custom deliverability engines, helping enterprise SaaS and technology brands scale market penetration and convert target account intent into qualified pipeline across global markets.',
    image: '/Tushar-Phalak-1.webp',
    social: {
      linkedin: 'https://www.linkedin.com/in/tushar-phalak-b44088101/',
      email: 'tushar@tarajglobal.com',
    },
  },
  {
    id: 'abhishek',
    name: 'Abhishek Rikibe',
    roleTag: 'CO-FOUNDER & COO',
    position: 'Client Success, Relationships & Partnerships',
    introduction:
      'Abhishek Rikibe directs enterprise client operations and global partnerships, ensuring strict adherence to TaRaj Global’s 99.8% Data Accuracy SLA. He oversees client portal onboarding, providing revenue leaders with single-pane campaign telemetry, instant lead alerts, and automated CRM pipeline routing (Salesforce, HubSpot) to drive high retention and measurable ROI.',
    image: '/Abhishek-Rikibe.webp',
    social: {
      linkedin: 'https://www.linkedin.com/in/abhishek-rikibe-834196231/',
      email: 'abhishek@tarajglobal.com',
    },
  },
]

export const OurTeam = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  const touchStartX = useRef(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % LEADERSHIP_MEMBERS.length)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + LEADERSHIP_MEMBERS.length) % LEADERSHIP_MEMBERS.length)
  }, [])

  // Auto-rotation loop (every 4.5 seconds)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      handleNext()
    }, 4500)
    return () => clearInterval(interval)
  }, [isPaused, handleNext])

  // Responsive offset calculation
  const offset = windowWidth < 640 ? 150 : windowWidth < 1024 ? 270 : 390

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (diff > 45) {
      handleNext()
    } else if (diff < -45) {
      handlePrev()
    }
  }

  // Helper to determine role and position for each card
  const getCardPosition = (index) => {
    const diff = (index - activeIndex + LEADERSHIP_MEMBERS.length) % LEADERSHIP_MEMBERS.length
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    return 'left'
  }

  return (
    <section
      id="leadership"
      aria-label="Meet Our Leaders"
      className="relative pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-background select-none"
    >
      {/* ── Ambient Radial Lighting ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] rounded-full bg-[#00A6FF]/[0.05] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[240px] rounded-full bg-[#FF6D00]/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── SECTION HEADING ───────────────────────────────────────────── */}
        <div className="relative text-center mb-8 sm:mb-10 lg:mb-12">
          {/* Pre-header Eyebrow (Matching Homepage Section Style) */}
          <div className="inline-flex items-center justify-center mb-2.5 sm:mb-3">
            <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              EXECUTIVE LEADERSHIP
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            MEET OUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00]">
              LEADERS
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 mx-auto bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00] rounded-full mt-2.5" />
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2.5 font-normal leading-relaxed">
            The visionary architects and engineers steering TaRaj Global's B2B demand generation operations across global technology markets.
          </p>
        </div>

        {/* ── ONE FRAME 3D CAROUSEL STAGE ─────────────────────────────── */}
        <div
          className="relative w-full max-w-5xl mx-auto h-[540px] sm:h-[500px] md:h-[480px] flex items-center justify-center overflow-visible"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: '1200px' }}
        >
          {LEADERSHIP_MEMBERS.map((member, index) => {
            const position = getCardPosition(index)
            const isCenter = position === 'center'
            const isLeft = position === 'left'
            const isRight = position === 'right'

            const xPos = isCenter ? 0 : isLeft ? -offset : offset

            return (
              <div
                key={member.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: isCenter ? 30 : 10 }}
              >
                <motion.div
                  animate={{
                    x: xPos,
                    scale: isCenter ? 1 : windowWidth < 640 ? 0.8 : 0.86,
                    opacity: isCenter ? 1 : windowWidth < 640 ? 0.45 : 0.65,
                    rotateY: isCenter ? 0 : isLeft ? 6 : -6,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.3 }
                      : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                  }
                  onClick={() => {
                    if (isLeft) handlePrev()
                    if (isRight) handleNext()
                  }}
                  className={`pointer-events-auto relative w-[92%] sm:w-[440px] md:w-[470px] lg:w-[490px] rounded-3xl p-6 sm:p-7 border transition-all duration-300 overflow-hidden ${
                    isCenter
                      ? 'bg-[#091122] border-[#00A6FF]/40 shadow-[0_12px_45px_rgba(0,166,255,0.2)] cursor-default'
                      : 'bg-[#080D1A] border-white/10 hover:border-white/25 hover:opacity-85 cursor-pointer shadow-lg'
                  }`}
                >
                  {/* Top Ambient Glow Line on Center Card */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent transition-opacity duration-300 ${
                      isCenter ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Card Content Layout */}
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar Portrait with Ambient Ring */}
                    <div className="relative mb-4">
                      {/* Ambient Accent Ring */}
                      <div
                        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                          isCenter ? 'bg-[#00A6FF]/15 ring-2 ring-[#00A6FF]/30 opacity-100' : 'opacity-0'
                        }`}
                        style={{ transform: 'scale(1.15)' }}
                      />

                      {/* Portrait Circle */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#00A6FF]/50 shadow-xl shadow-[#00A6FF]/15">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          style={{ objectPosition: 'center 20%' }}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            if (e.target.nextElementSibling) {
                              e.target.nextElementSibling.style.display = 'flex'
                            }
                          }}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-[#091122]"
                          style={{ display: 'none' }}
                        >
                          <span className="text-4xl">👤</span>
                        </div>
                      </div>

                      {/* Small badge overlay */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="bg-[#00A6FF] text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-md uppercase">
                          {member.roleTag}
                        </span>
                      </div>
                    </div>

                    {/* Leader Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 mb-1">
                      {member.name}
                    </h3>

                    {/* Position / Strategic Responsibility */}
                    <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00] bg-clip-text text-transparent mb-3 max-w-sm">
                      {member.position}
                    </p>

                    {/* Bio Paragraph */}
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal mb-5 line-clamp-4 [text-wrap:pretty]">
                      {member.introduction}
                    </p>

                    {/* Social Connect Links */}
                    <div className="flex items-center gap-3">
                      <motion.a
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/30 flex items-center justify-center text-[#00A6FF] hover:bg-[#00A6FF] hover:text-white transition-all duration-200 shadow-sm"
                        aria-label={`${member.name} LinkedIn Profile`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>

                      <motion.a
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={`mailto:${member.social.email}`}
                        className="w-9 h-9 rounded-full bg-[#FF6D00]/10 border border-[#FF6D00]/30 flex items-center justify-center text-[#FF6D00] hover:bg-[#FF6D00] hover:text-white transition-all duration-200 shadow-sm"
                        aria-label={`Email ${member.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* ── INTERACTIVE CONTROLS: PREV / NEXT ARROWS & PAGINATION PILLS ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 sm:mt-6">
          {/* Arrow Buttons & Dot Indicators */}
          <div className="inline-flex items-center gap-3 bg-[#070D18]/90 border border-white/10 px-4 py-2 rounded-full">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Leader"
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#00A6FF]/20 border border-white/10 hover:border-[#00A6FF]/40 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 px-1">
              {LEADERSHIP_MEMBERS.map((member, idx) => {
                const isActive = activeIndex === idx
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to ${member.name}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-7 bg-gradient-to-r from-[#00A6FF] to-[#00E5FF]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                )
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Leader"
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#00A6FF]/20 border border-white/10 hover:border-[#00A6FF]/40 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurTeam
