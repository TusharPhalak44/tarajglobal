import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '@animations/gsap'

const AUDIENCES = [
  {
    id: 'saas',
    num: '01',
    label: 'Enterprise SaaS Platforms',
    tagline: 'HIGH-ARR MULTI-STAKEHOLDER PIPELINE',
    color: '#00A6FF',
    image: '/saas-audience.jpg',
    description:
      'Engage multi-million dollar annual contract value (ACV) enterprise software accounts with tailored buying committee journeys across business, finance, and technical leaders.',
    points: [
      '✔ Multi-stakeholder touchpoints engaging CTOs, CIOs, and CFOs concurrently',
      '✔ Bespoke value propositions aligned to total cost of ownership (TCO) and rapid deployment',
      '✔ Seamless orchestration across marketing aircover and executive sales discovery',
    ],
    visualType: 'saas',
  },
  {
    id: 'cloud',
    num: '02',
    label: 'Cloud & Infrastructure Providers',
    tagline: 'MISSION-CRITICAL WORKLOAD BUYERS',
    color: '#7C3AED',
    image: '/it-audience.jpg',
    description:
      'Navigate complex technical architectures and enterprise IT evaluations with precision account intelligence and consensus enablement.',
    points: [
      '✔ Target system architects, VP Infrastructure, and SecOps directors at Tier-1 companies',
      '✔ Technical briefings addressing workload reliability, migration safety, and multi-cloud SLAs',
      '✔ Deep intent monitoring alerting sales to active RFP research and vendor evaluations',
    ],
    visualType: 'it',
  },
  {
    id: 'security',
    num: '03',
    label: 'Enterprise Cybersecurity Solutions',
    tagline: 'COMPLIANCE & RISK BUYING COMMITTEES',
    color: '#72D669',
    image: '/services-audience.jpg',
    description:
      'Connect security innovators with CISOs and risk executives seeking trusted solutions for urgent compliance mandates and threat reduction.',
    points: [
      '✔ Executive-level threat intelligence and compliance benchmarking briefings',
      '✔ High-trust engagement maintaining strict confidentiality and regulatory alignment',
      '✔ Multi-touch consensus building that unites security practitioners with finance approvers',
    ],
    visualType: 'services',
  },
  {
    id: 'services',
    num: '04',
    label: 'Global Advisory & Consultancies',
    tagline: 'C-SUITE TRANSFORMATION MANDATES',
    color: '#FF6D00',
    image: '/enterprise-audience.jpg',
    description:
      'Position consulting, engineering, and implementation firms for large-scale enterprise transformation contracts with tailored executive dossiers.',
    points: [
      '✔ Thought leadership and proprietary research delivered directly to executive sponsors',
      '✔ Bespoke account dossiers outlining corporate restructuring and digital modernization goals',
      '✔ High-touch executive introductions and peer-to-peer advisory roundtables',
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
        <circle cx="150" cy="150" r="110" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="150" cy="150" r="60" stroke={color} strokeWidth="1.5" />
        <circle cx="150" cy="150" r="8" fill={color} />
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
        <rect x="180" y="50" width="90" height="40" rx="6" stroke={color} strokeWidth="1.5" />
        <circle cx="195" cy="70" r="3" fill={color} />
        <line x1="210" y1="70" x2="255" y2="70" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <rect x="180" y="110" width="90" height="40" rx="6" stroke={color} strokeWidth="1.5" />
        <circle cx="195" cy="130" r="3" fill={color} />
        <line x1="210" y1="130" x2="255" y2="130" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <rect x="180" y="170" width="90" height="40" rx="6" stroke={color} strokeWidth="1.5" />
        <circle cx="195" cy="190" r="3" fill={color} />
        <line x1="210" y1="190" x2="255" y2="190" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
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
        <circle cx="100" cy="100" r="26" stroke={color} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="8" fill={color} />
        <circle cx="210" cy="80" r="20" stroke={color} strokeWidth="1.5" />
        <circle cx="210" cy="80" r="6" fill={color} />
        <circle cx="200" cy="210" r="30" stroke={color} strokeWidth="1.5" />
        <circle cx="200" cy="210" r="10" fill={color} />
        <circle cx="80" cy="220" r="22" stroke={color} strokeWidth="1.5" />
        <circle cx="80" cy="220" r="7" fill={color} />
        <line x1="124" y1="108" x2="175" y2="190" stroke={color} strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1="126" y1="95" x2="190" y2="83" stroke={color} strokeWidth="1.5" />
        <line x1="102" y1="220" x2="170" y2="212" stroke={color} strokeWidth="1.5" />
        <line x1="88" y1="199" x2="96" y2="126" stroke={color} strokeWidth="1.2" strokeDasharray="4 4" />
      </svg>
    )
  }

  return (
    <svg
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.14] pointer-events-none"
      viewBox="0 0 300 300"
      fill="none"
    >
      <rect x="110" y="40" width="80" height="34" rx="6" stroke={color} strokeWidth="1.5" />
      <text x="150" y="62" textAnchor="middle" fill={color} fontSize="11" fontFamily="monospace" fontWeight="bold">C-SUITE</text>
      <path d="M150 74 V120 M70 120 H230 M70 120 V150 M230 120 V150 M150 120 V150" stroke={color} strokeWidth="1.2" />
      <rect x="35" y="150" width="70" height="30" rx="5" stroke={color} strokeWidth="1.2" />
      <text x="70" y="170" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">TECHNICAL</text>
      <rect x="115" y="150" width="70" height="30" rx="5" stroke={color} strokeWidth="1.2" />
      <text x="150" y="170" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">FINANCE</text>
      <rect x="195" y="150" width="70" height="30" rx="5" stroke={color} strokeWidth="1.2" />
      <text x="230" y="170" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">CHAMPION</text>
    </svg>
  )
}

const WhoIsItFor = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const desktopPinRef = useRef(null)
  const activeIndexRef = useRef(0)
  const tabRefs = useRef([])

  // GSAP Desktop pinned scroll experience
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return

    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    const trigger = ScrollTrigger.create({
      trigger: desktopPinRef.current,
      start: 'top 12%',
      end: '+=800',
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      id: 'who-is-abx-for-scroll',
      onUpdate: (self) => {
        const p = self.progress
        setScrollProgress(p)
        const step = Math.min(Math.floor(p * AUDIENCES.length), AUDIENCES.length - 1)
        if (step !== activeIndexRef.current) {
          activeIndexRef.current = step
          setCurrentIndex(step)
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [prefersReducedMotion])

  // Mobile / Tablet continuous autoplay
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (isDesktop && !prefersReducedMotion) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AUDIENCES.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [currentIndex, prefersReducedMotion])

  useEffect(() => {
    const tab = tabRefs.current[currentIndex]
    if (tab && tab.parentElement) {
      const container = tab.parentElement
      const scrollLeft = tab.offsetLeft - (container.clientWidth / 2) + (tab.clientWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [currentIndex])

  const handleSelect = (idx) => {
    setCurrentIndex(idx)
    activeIndexRef.current = idx
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (isDesktop && !prefersReducedMotion) {
      const st = ScrollTrigger.getById('who-is-abx-for-scroll')
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

  const active = AUDIENCES[currentIndex]

  return (
    <section
      ref={sectionRef}
      id="who-benefits-from-abx"
      className="relative py-6 sm:py-8 lg:py-8 overflow-hidden bg-background"
      aria-label="Is Account Based Experience (ABX) Right for You?"
    >
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
        <div className="max-w-4xl mx-auto text-center mb-3.5 lg:mb-4">
          <motion.div
            {...fadeUp(0)}
            className="flex items-center justify-center mb-2"
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              TARGET AUDIENCE • ENTERPRISE ALIGNMENT
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-2"
          >
            Is Account Based Experience{' '}
            <span className="inline-block bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent py-1 sm:py-1.5">
              Right for You?
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.12)}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl mx-auto font-normal"
          >
            ABX empowers high-growth B2B organizations closing high-ACV deals that require consensus across 6 to 10 cross-functional stakeholders.
          </motion.p>
        </div>

        {/* Desktop Container */}
        <motion.div
          {...fadeUp(0.18)}
          className="hidden md:block p-4 sm:p-5 lg:p-6 rounded-3xl border border-border bg-surface/70 backdrop-blur-sm shadow-xl relative overflow-hidden"
        >
          <div className="grid md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Left 4 cards */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between gap-2.5">
              {AUDIENCES.map((aud, idx) => {
                const isActive = idx === currentIndex

                return (
                  <motion.button
                    key={aud.id}
                    onClick={() => handleSelect(idx)}
                    className={`group relative text-left p-3 lg:p-3.5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive
                        ? 'bg-surface shadow-md border-border scale-[1.01]'
                        : 'bg-surface/40 hover:bg-surface/80 border-transparent hover:border-border/60 opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      borderLeft: isActive ? `4px solid ${aud.color}` : undefined,
                    }}
                  >
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

                    <div
                      className={`text-[15px] sm:text-base font-bold transition-colors pl-1.5 ${
                        isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {aud.label}
                    </div>

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

            {/* Right Detailed Showcase */}
            <div className="md:col-span-7 lg:col-span-8">
              <div
                className="relative h-full flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-3xl bg-surface shadow-xl overflow-hidden transition-all duration-300"
                style={{
                  border: `2px solid ${active.color}`,
                  boxShadow: `0 10px 30px -10px ${active.color}25`,
                }}
              >
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

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col justify-between h-full space-y-3.5"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
                      <div className="lg:col-span-7 flex flex-col">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold mb-2.5 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                          <span className="text-text-secondary">{active.num}</span>
                          <span className="text-text-primary">{active.tagline}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary mb-2">
                          {active.label}
                        </h3>

                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal mb-3.5">
                          {active.description}
                        </p>

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
                            alt={active.label}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono font-bold text-white px-3 py-1.5 rounded-xl bg-surface/90 border border-white/10 backdrop-blur-md">
                            <span>{active.label}</span>
                            <span style={{ color: active.color }}>{active.num}</span>
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

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {AUDIENCES.map((aud, idx) => (
              <button
                key={aud.id}
                ref={(el) => (tabRefs.current[idx] = el)}
                onClick={() => handleSelect(idx)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  idx === currentIndex
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface/60 border-border text-text-secondary'
                }`}
              >
                {aud.label}
              </button>
            ))}
          </div>

          <div
            className="p-5 rounded-2xl bg-surface border shadow-md space-y-3"
            style={{ borderColor: active.color }}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold" style={{ color: active.color }}>
              <span>{active.num}</span>
              <span>•</span>
              <span>{active.tagline}</span>
            </div>
            <h3 className="text-lg font-black text-text-primary">{active.label}</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{active.description}</p>
            <div className="space-y-2 pt-1">
              {active.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-text-primary">
                  <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoIsItFor

