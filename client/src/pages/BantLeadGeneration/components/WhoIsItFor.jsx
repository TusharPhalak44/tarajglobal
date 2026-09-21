import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '../../../animations/gsap'

const AUDIENCES = [
  {
    id: 'saas',
    num: '01',
    label: 'Enterprise SaaS & Cloud',
    tagline: 'PREDICTABLE ARR PIPELINE',
    color: '#00A6FF',
    image: '/saas-audience.jpg',
    description:
      'High-growth software companies requiring pre-screened decision-makers who possess allocated budget for software licenses, identified technical bottlenecks, and immediate implementation readiness.',
    points: [
      'Pre-vetted ACV budget fit ($25k - $500k+ annual contract value)',
      'Verified tech stack displacement readiness and buying intent surges',
      'Direct access to VPs of Engineering, Product, IT, and Commercial Heads',
    ],
    visualType: 'saas',
  },
  {
    id: 'it',
    num: '02',
    label: 'IT & Cloud Infrastructure',
    tagline: 'INFRASTRUCTURE & CYBERSECURITY',
    color: '#7C3AED',
    image: '/it-audience.jpg',
    description:
      'IT hardware, cybersecurity, and cloud migration providers selling into complex buying committees that require formal budget sign-off and strict compliance vetting.',
    points: [
      'CISO, CIO, and Director of IT buying authority validation',
      'Active cybersecurity compliance or modernization mandates (< 6 months)',
      'Pre-screened RFP and enterprise procurement sign-off schedules',
    ],
    visualType: 'it',
  },
  {
    id: 'b2b-services',
    num: '03',
    label: 'B2B Consulting & Advisory',
    tagline: 'STRATEGIC ENTERPRISE ENGAGEMENTS',
    color: '#72D669',
    image: '/services-audience.jpg',
    description:
      'Management consultancies, legal firms, and corporate advisory practices that require high-level corporate introductions with confirmed discretionary budgets and urgent strategic mandates.',
    points: [
      'CEO, CFO, and Board-level executive relationship initiation',
      'Confirmed organizational pain point and advisory requirement',
      'High-converting discovery meetings without sales friction or cold resistance',
    ],
    visualType: 'services',
  },
  {
    id: 'enterprise',
    num: '04',
    label: 'Enterprise Complex Solutions',
    tagline: 'HIGH-TICKET PROCUREMENT CYCLES',
    color: '#FF6D00',
    image: '/enterprise-audience.jpg',
    description:
      'Capital equipment, automation, and supply chain technology vendors navigating 6–18 month evaluation cycles that require confirmed capital expenditure funding.',
    points: [
      'Multi-stakeholder buying committee consensus mapping',
      'Pre-screened capital investment budgets for enterprise upgrades',
      'Documented operational bottleneck and validated purchasing timeline',
    ],
    visualType: 'enterprise',
  },
]

// Subtle, abstract B2B technology background visuals
const AudienceVisualBackground = ({ type, color }) => {
  if (type === 'saas') {
    return (
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.14] pointer-events-none"
        viewBox="0 0 300 300"
        fill="none"
      >
        {/* SaaS Node Network */}
        <circle cx="150" cy="150" r="110" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="150" cy="150" r="60" stroke={color} strokeWidth="1.5" />
        <circle cx="150" cy="150" r="8" fill={color} />
        {/* Surrounding persona nodes */}
        <line x1="150" y1="150" x2="60" y2="90" stroke={color} strokeWidth="1.2" />
        <circle cx="60" cy="90" r="18" fill="var(--surface)" stroke={color} strokeWidth="1.5" />
        <rect x="53" y="85" width="14" height="10" rx="2" stroke={color} strokeWidth="1.2" />

        <line x1="150" y1="150" x2="240" y2="80" stroke={color} strokeWidth="1.2" />
        <circle cx="240" cy="80" r="16" fill="var(--surface)" stroke={color} strokeWidth="1.5" />
        <circle cx="240" cy="77" r="5" stroke={color} strokeWidth="1.2" />
        <path d="M232 88 C232 83, 248 83, 248 88" stroke={color} strokeWidth="1.2" />

        <line x1="150" y1="150" x2="210" y2="220" stroke={color} strokeWidth="1.2" />
        <circle cx="210" cy="220" r="20" fill="var(--surface)" stroke={color} strokeWidth="1.5" />
        <path d="M202 225 L210 213 L218 225 Z" stroke={color} strokeWidth="1.2" />

        <line x1="150" y1="150" x2="80" y2="210" stroke={color} strokeWidth="1.2" />
        <circle cx="80" cy="210" r="15" fill="var(--surface)" stroke={color} strokeWidth="1.5" />
        <circle cx="80" cy="210" r="6" stroke={color} strokeWidth="1.2" />
      </svg>
    )
  }

  if (type === 'it') {
    return (
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.14] pointer-events-none"
        viewBox="0 0 300 300"
        fill="none"
      >
        {/* IT & Infrastructure Grid / Server Matrix */}
        <rect x="180" y="50" width="90" height="40" rx="6" stroke={color} strokeWidth="1.5" />
        <circle cx="195" cy="70" r="3" fill={color} />
        <line x1="210" y1="70" x2="255" y2="70" stroke={color} strokeWidth="1" strokeDasharray="2 2" />

        <rect x="180" y="110" width="90" height="40" rx="6" stroke={color} strokeWidth="1.5" />
        <circle cx="195" cy="130" r="3" fill={color} />
        <line x1="210" y1="130" x2="255" y2="130" stroke={color} strokeWidth="1" strokeDasharray="2 2" />

        <rect x="180" y="170" width="90" height="40" rx="6" stroke={color} strokeWidth="1.5" />
        <circle cx="195" cy="190" r="3" fill={color} />
        <line x1="210" y1="190" x2="255" y2="190" stroke={color} strokeWidth="1" strokeDasharray="2 2" />

        {/* Connection Bus */}
        <path d="M180 70 H130 V190 H180" stroke={color} strokeWidth="1.5" />
        <path d="M130 130 H60" stroke={color} strokeWidth="1.5" />
        <circle cx="60" cy="130" r="22" fill="var(--surface)" stroke={color} strokeWidth="1.5" />
        <circle cx="60" cy="130" r="8" fill={color} />
      </svg>
    )
  }

  if (type === 'services') {
    return (
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.14] pointer-events-none"
        viewBox="0 0 300 300"
        fill="none"
      >
        {/* Professional Services / Connected Business Nodes */}
        <circle cx="100" cy="100" r="26" stroke={color} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="8" fill={color} />
        <circle cx="210" cy="80" r="20" stroke={color} strokeWidth="1.5" />
        <circle cx="210" cy="80" r="6" fill={color} />
        <circle cx="200" cy="210" r="30" stroke={color} strokeWidth="1.5" />
        <circle cx="200" cy="210" r="10" fill={color} />
        <circle cx="80" cy="220" r="22" stroke={color} strokeWidth="1.5" />
        <circle cx="80" cy="220" r="7" fill={color} />

        {/* Connecting Partnership Vectors */}
        <line x1="124" y1="108" x2="175" y2="190" stroke={color} strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1="126" y1="95" x2="190" y2="83" stroke={color} strokeWidth="1.5" />
        <line x1="102" y1="220" x2="170" y2="212" stroke={color} strokeWidth="1.5" />
        <line x1="88" y1="199" x2="96" y2="126" stroke={color} strokeWidth="1.2" strokeDasharray="4 4" />
      </svg>
    )
  }

  // Enterprise Solutions
  return (
    <svg
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.14] pointer-events-none"
      viewBox="0 0 300 300"
      fill="none"
    >
      {/* Enterprise Account Network / Organizational Hierarchy Matrix */}
      <rect x="110" y="40" width="80" height="34" rx="6" stroke={color} strokeWidth="1.5" />
      <text x="150" y="62" textAnchor="middle" fill={color} fontSize="11" fontFamily="monospace" fontWeight="bold">HQ / C-SUITE</text>

      <path d="M150 74 V120 M70 120 H230 M70 120 V150 M230 120 V150 M150 120 V150" stroke={color} strokeWidth="1.2" />

      <rect x="35" y="150" width="70" height="30" rx="5" stroke={color} strokeWidth="1.2" />
      <text x="70" y="170" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">PROCUREMENT</text>

      <rect x="115" y="150" width="70" height="30" rx="5" stroke={color} strokeWidth="1.2" />
      <text x="150" y="170" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">OPERATIONS</text>

      <rect x="195" y="150" width="70" height="30" rx="5" stroke={color} strokeWidth="1.2" />
      <text x="230" y="170" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">TECHNOLOGY</text>

      <circle cx="150" cy="230" r="28" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="150" cy="230" r="10" fill={color} />
      <line x1="150" y1="180" x2="150" y2="202" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
    </svg>
  )
}

const WhoIsItFor = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)
  const desktopPinRef = useRef(null)
  const activeIndexRef = useRef(0)
  const tabRefs = useRef([])
  const prefersReducedMotion = useReducedMotion()

  const active = AUDIENCES[currentIndex] || AUDIENCES[0]

  // GSAP ScrollTrigger Pinned Storytelling on Desktop (Identical to B2bEmailMarketing)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (!isDesktop || prefersReducedMotion || !sectionRef.current || !desktopPinRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'bant-who-is-it-for-scroll',
        trigger: sectionRef.current,
        pin: desktopPinRef.current,
        start: 'center center',
        end: '+=1600px', // ~350vh scroll distance
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          setScrollProgress(p)

          // Update active audience stage 0-3 based on scroll progress
          const currentStage = Math.min(Math.floor(p * AUDIENCES.length), AUDIENCES.length - 1)
          if (currentStage !== activeIndexRef.current) {
            activeIndexRef.current = currentStage
            setCurrentIndex(currentStage)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // Automatic progression on mobile / fallback (<1024px)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (isDesktop && !prefersReducedMotion) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AUDIENCES.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [currentIndex, prefersReducedMotion])

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (tabRefs.current[currentIndex]) {
      tabRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [currentIndex])

  const handleSelect = (idx) => {
    setCurrentIndex(idx)
    activeIndexRef.current = idx
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (isDesktop && !prefersReducedMotion) {
      const st = ScrollTrigger.getById('bant-who-is-it-for-scroll')
      if (st) {
        const scrollPos = st.start + ((idx + 0.5) / AUDIENCES.length) * (st.end - st.start)
        window.scrollTo({ top: scrollPos, behavior: 'smooth' })
      }
    }
  }

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section
      ref={sectionRef}
      id="who-benefits-from-bant-lead-generation"
      className="relative py-6 sm:py-8 lg:py-8 overflow-hidden bg-background"
      aria-label="Is BANT Lead Generation Right for Your Business?"
    >
      {/* Background accents — clean, soft, almost-white with very subtle radial light */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[140px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(0,166,255,0.18) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-[500px] h-[400px] rounded-full blur-[130px] opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(255,109,0,0.14) 0%, transparent 70%)' }}
        />
      </div>

      <div
        ref={desktopPinRef}
        className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header — Centered, well-spaced & uncompressed */}
        <div className="max-w-4xl mx-auto text-center mb-3.5 lg:mb-4">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-surface mb-2 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-primary uppercase">
              Target Audience
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-2"
          >
            Is BANT Lead Generation{' '}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              Right for Your Business?
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.12)}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl mx-auto font-normal"
          >
            BANT lead generation helps B2B companies qualify prospects by budget, authority, need, and timeline before sales handoff.
          </motion.p>
        </div>

        {/* ── Desktop & Tablet: Large Showcase Container with GSAP Pinned Progression ── */}
        <motion.div
          {...fadeUp(0.18)}
          className="hidden md:block p-4 sm:p-5 lg:p-6 rounded-3xl border border-border bg-surface/70 backdrop-blur-sm shadow-xl relative overflow-hidden"
        >
          <div className="grid md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* LEFT SIDE: Vertical Stack of 4 Selectable Audience Cards (4 cols on lg) */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between gap-2.5">
              {AUDIENCES.map((aud, idx) => {
                const isActive = idx === currentIndex

                return (
                  <motion.button
                    key={aud.id}
                    onClick={() => handleSelect(idx)}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            x: 4,
                            transition: { duration: 0.2, ease: 'easeOut' },
                          }
                    }
                    className={`group relative flex-1 p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer overflow-hidden ${
                      isActive
                        ? 'bg-surface shadow-md'
                        : 'bg-surface/50 hover:bg-surface border-border/80 hover:border-border'
                    }`}
                    style={{
                      borderColor: isActive ? aud.color : undefined,
                      boxShadow: isActive ? `0 8px 22px -6px ${aud.color}25` : undefined,
                    }}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {/* Active left accent line indicator */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 z-10 transition-all duration-300 pointer-events-none"
                      style={{
                        backgroundColor: isActive ? aud.color : 'transparent',
                      }}
                    />

                    {/* Curved corner fill */}
                    {isActive && (
                      <div
                        className="absolute left-0 bottom-0 w-4 h-4 z-20 pointer-events-none"
                        style={{
                          borderLeft: `6px solid ${aud.color}`,
                          borderBottom: `3px solid ${aud.color}`,
                          borderBottomLeftRadius: '1rem',
                        }}
                      />
                    )}

                    {/* Eyebrow & Number */}
                    <div className="flex items-center justify-between gap-2 mb-1.5 pl-1.5">
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider uppercase transition-colors"
                        style={{ color: isActive ? aud.color : 'var(--text-secondary)' }}
                      >
                        {aud.tagline}
                      </span>
                      <span
                        className={`text-xs font-mono font-black tracking-widest transition-colors ${
                          isActive ? 'text-text-primary' : 'text-text-secondary opacity-60'
                        }`}
                        style={{ color: isActive ? aud.color : undefined }}
                      >
                        {aud.num}
                      </span>
                    </div>

                    {/* Main Title */}
                    <div
                      className={`text-[15px] sm:text-base font-bold transition-colors pl-1.5 ${
                        isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {aud.label}
                    </div>

                    {/* Visual Flow Progress Bar on Active Card */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border/40 overflow-hidden">
                        {typeof window !== 'undefined' && window.innerWidth >= 1024 && !prefersReducedMotion ? (
                          <div
                            className="h-full transition-all duration-75 ease-out"
                            style={{
                              backgroundColor: aud.color,
                              width: `${Math.min(
                                Math.max((scrollProgress * AUDIENCES.length - idx) * 100, 0),
                                100
                              )}%`,
                            }}
                          />
                        ) : (
                          <motion.div
                            key={`prog-${currentIndex}`}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 4.0, ease: 'linear' }}
                            className="h-full"
                            style={{ backgroundColor: aud.color }}
                          />
                        )}
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* RIGHT SIDE: Large Visual / Content Area for Selected Audience (8 cols on lg) */}
            <div className="md:col-span-7 lg:col-span-8">
              <div
                className="relative h-full flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl bg-surface shadow-xl overflow-hidden transition-all duration-300"
                style={{
                  border: `2px solid ${active.color}`,
                  boxShadow: `0 10px 30px -10px ${active.color}25`,
                }}
              >
                {/* Subtle abstract background visualization */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.visualType}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AudienceVisualBackground type={active.visualType} color={active.color} />
                  </motion.div>
                </AnimatePresence>

                {/* Foreground Content with smooth slide-up transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col justify-between h-full space-y-3.5"
                  >
                    {/* Two-column layout: Left text content + Right image preview */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
                      {/* Left side: Content */}
                      <div className="lg:col-span-7 flex flex-col">
                        {/* Header badge */}
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-background border border-border text-[11px] font-mono font-semibold mb-2.5 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                          <span className="text-text-secondary">{active.num}</span>
                          <span className="text-text-primary">{active.tagline}</span>
                        </div>

                        {/* Main Title */}
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary mb-2">
                          {active.label}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal mb-3.5">
                          {active.description}
                        </p>

                        {/* 3 Checkpoint Points */}
                        <div className="space-y-2.5">
                          {active.points.map((pt, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div
                                className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                  backgroundColor: `${active.color}18`,
                                  color: active.color,
                                  border: `1px solid ${active.color}40`,
                                }}
                              >
                                <Check className="w-2 h-2" strokeWidth={2.5} />
                              </div>
                              <span className="text-sm sm:text-base text-text-primary font-medium leading-snug">
                                {pt}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right side: Modern Image Preview Card */}
                      <div className="lg:col-span-5">
                        <div
                          className="relative rounded-2xl overflow-hidden border shadow-md group aspect-[16/11] max-h-[250px] w-full"
                          style={{
                            borderColor: `${active.color}35`,
                            boxShadow: `0 10px 24px -6px ${active.color}20`,
                          }}
                        >
                          <img
                            src={active.image}
                            alt={`${active.label} BANT Qualification Preview`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                          {/* Top Floating Badge */}
                          <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background/90 backdrop-blur-md border border-border/80 text-[10px] font-mono font-bold shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: active.color }} />
                            <span className="text-text-primary uppercase tracking-wider">VERIFIED</span>
                          </div>

                          {/* Bottom Caption Overlay */}
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-white pointer-events-none">
                            <span className="text-[11px] font-mono font-bold text-white/95 drop-shadow-xs truncate">
                              {active.label}
                            </span>
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-xs shrink-0"
                              style={{ backgroundColor: active.color }}
                            >
                              {active.num}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile & Small Screens: Horizontally Auto-Scrolling Tabs + Content Card ── */}
        <div className="md:hidden space-y-3">
          {/* Horizontal scrollable tab row with auto-scroll ref */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {AUDIENCES.map((aud, idx) => {
              const isActive = idx === currentIndex

              return (
                <button
                  key={aud.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el
                  }}
                  onClick={() => handleSelect(idx)}
                  className={`shrink-0 p-4 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-surface shadow-md border-primary'
                      : 'bg-surface/50 border-border/70'
                  }`}
                  style={{
                    borderColor: isActive ? aud.color : undefined,
                    minWidth: '220px',
                  }}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className="text-[9px] font-mono font-bold uppercase tracking-wider line-clamp-1"
                      style={{ color: isActive ? aud.color : 'var(--text-secondary)' }}
                    >
                      {aud.tagline}
                    </span>
                    <span className="text-[10px] font-mono font-black" style={{ color: aud.color }}>
                      {aud.num}
                    </span>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      isActive ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {aud.label}
                  </div>
                  {/* Progress line */}
                  {isActive && (
                    <div className="w-full h-1 bg-border/40 rounded-full mt-2.5 overflow-hidden">
                      <motion.div
                        key={`prog-mob-${currentIndex}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.0, ease: 'linear' }}
                        className="h-full"
                        style={{ backgroundColor: aud.color }}
                      />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Active mobile content card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="p-5 sm:p-6 rounded-2xl bg-surface shadow-lg relative overflow-hidden transition-all duration-300"
              style={{ border: `2px solid ${active.color}`, boxShadow: `0 8px 24px -8px ${active.color}25` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: active.color }} />
                <span className="text-[11px] font-mono font-bold uppercase" style={{ color: active.color }}>
                  {active.tagline}
                </span>
              </div>
              <h4 className="text-xl font-black text-text-primary mb-2.5">{active.label}</h4>

              {/* Mobile Image Preview */}
              <div
                className="relative rounded-xl overflow-hidden border shadow-sm aspect-[16/10] mb-3.5"
                style={{ borderColor: `${active.color}35` }}
              >
                <img
                  src={active.image}
                  alt={`${active.label} Preview`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white pointer-events-none">
                  <span className="text-[10px] font-mono font-bold text-white/90">{active.label}</span>
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded text-white"
                    style={{ backgroundColor: active.color }}
                  >
                    {active.num}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-3.5">
                {active.description}
              </p>
              <div className="space-y-2">
                {active.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-text-primary">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${active.color}20`, color: active.color }}
                    >
                      <Check className="w-2 h-2" strokeWidth={2.5} />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default WhoIsItFor
