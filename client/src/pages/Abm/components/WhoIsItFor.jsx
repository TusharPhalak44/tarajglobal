import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const AUDIENCES = [
  {
    id: 'saas',
    num: '01',
    label: 'Enterprise SaaS & Cloud',
    tagline: 'HIGH-ARR TARGET ACCOUNTS',
    color: '#00A6FF',
    image: '/saas-audience.jpg',
    description:
      ' Spreading outreach across thousands of accounts dilutes every message. We focus SaaS teams on high-ARR target accounts and engage CTOs, VPs of Product, and engineering leaders with multi-threaded, personalized campaigns.',
    points: [
      '✔ Account-level targeting filtered by verified tech stack, growth stage, and ARR band',
      '✔ Messaging aligned to evaluation criteria, security reviews, and proofs of concept',
      '✔ Multi-stakeholder touchpoints reaching technical evaluators and finance leaders',
    ],
    visualType: 'saas',
  },
  {
    id: 'it',
    num: '02',
    label: 'IT & Cloud Infrastructure',
    tagline: 'COMPLEX BUYING COMMITTEES',
    color: '#7C3AED',
    image: '/it-audience.jpg',
    description:
      ' Managed service providers, cloud migration specialists, and cybersecurity vendors win or lose on committee consensus. We map every stakeholder and engage them with account-specific, compliance-aware messaging.',
    points: [
      '✔ CISO, CIO, and IT director committee roles mapped and verified',
      '✔ Compliance and modernization triggers used as account-level engagement hooks',
      '✔ Procurement and RFP timelines tracked through live intent signals',
    ],
    visualType: 'it',
  },
  {
    id: 'enterprise',
    num: '03',
    label: 'Enterprise Complex Solutions',
    tagline: 'LONG SALES CYCLES',
    color: '#FF6D00',
    image: '/enterprise-audience.jpg',
    description:
      'Six-to-eighteen-month cycles stall when only one champion is engaged. We keep multiple stakeholders warm across the cycle for capital equipment, automation, and supply chain technology vendors.',
    points: [
      '✔ Multi-threaded engagement across operations, finance, and procurement',
      '✔ High-touch nurture cadences built for high-ACV enterprise deals',
      '✔ Deal-stage intent tracking that flags when a committee moves into evaluation',
    ],
    visualType: 'enterprise',
  },
  {
    id: 'specific-accounts',
    num: '04',
    label: ' B2B Consulting & Advisory',
    tagline: 'EXECUTIVE-LEVEL ACCOUNT ACCESS ',
    color: '#72D669',
    image: '/services-audience.jpg',
    description:
      'Senior executives ignore broad outreach. We open relationships with named accounts through tailored executive messaging and exclusive briefings aimed at confirmed discretionary budgets and acute mandates.',
    points: [
      '✔ CEO, CFO, and Board-level stakeholder identification',
      '✔ Account-specific briefings built around documented strategic mandates',
      '✔ Personalized executive touchpoints designed for multi-stakeholder committees',
    ],
    visualType: 'services',
  },
]

const AudienceVisualBackground = ({ type, color }) => {
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
    </svg>
  )
}

const WhoIsItFor = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const timerRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AUDIENCES.length)
    }, 4500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [prefersReducedMotion, isPaused])

  const handleSelect = (idx) => {
    setCurrentIndex(idx)
  }

  const active = AUDIENCES[currentIndex]

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
      id="who-benefits-from-abm-services"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-background"
      aria-label="Is Account-Based Marketing Right for Your Business?"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-6 lg:mb-8">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center mb-2">
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
             ICP VERTICAL ALIGNMENT
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-2"
          >
            Is Account-Based Marketing{' '}
            <span className="inline-block bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent py-1 sm:py-1.5">
              Right for Your Business?
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.12)}
            className="text-xs sm:text-sm lg:text-[15px] text-text-secondary leading-relaxed max-w-3xl mx-auto font-normal"
          >
             Built for enterprise SaaS and technology revenue leaders who sell complex, high-value solutions to defined buying committees across US, EMEA, and APAC and need engagement concentrated on the accounts most likely to close.
          </motion.p>
        </div>

        {/* Desktop Showcase */}
        <motion.div
          {...fadeUp(0.18)}
          className="hidden md:block p-4 sm:p-5 lg:p-6 rounded-3xl border border-border bg-surface/70 backdrop-blur-sm shadow-xl relative overflow-hidden"
        >
          <div className="grid md:grid-cols-12 gap-4 lg:gap-5 items-stretch">
            {/* Left Tabs */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between gap-2.5">
              {AUDIENCES.map((aud, idx) => {
                const isActive = idx === currentIndex

                return (
                  <motion.button
                    key={aud.id}
                    onClick={() => handleSelect(idx)}
                    whileHover={prefersReducedMotion ? {} : { x: 4, transition: { duration: 0.2 } }}
                    className={`group relative flex-1 p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer overflow-hidden ${
                      isActive ? 'bg-surface shadow-md' : 'bg-surface/50 hover:bg-surface border-border/80 hover:border-border'
                    }`}
                    style={{
                      borderColor: isActive ? aud.color : undefined,
                      boxShadow: isActive ? `0 8px 22px -6px ${aud.color}25` : undefined,
                    }}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 z-10 transition-all duration-300 pointer-events-none"
                      style={{ backgroundColor: isActive ? aud.color : 'transparent' }}
                    />

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
                        <motion.div
                          key={`prog-${currentIndex}`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 4.5, ease: 'linear' }}
                          className="h-full"
                          style={{ backgroundColor: aud.color }}
                        />
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Right Display Area */}
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
                    transition={{ duration: 0.45 }}
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
                    transition={{ duration: 0.35 }}
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

                        <div className="space-y-2 pt-1 border-t border-border">
                          {active.points.map((pt, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-text-secondary">
                              <span className="mt-0.5 text-primary font-bold">✔</span>
                              <span>{pt.replace(/^✔\s*/, '')}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-border shadow-md aspect-[4/3] bg-surface-raised">
                        <img
                          src={active.image}
                          alt={active.label}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono flex items-center justify-between">
                          <span className="font-bold">{active.tagline}</span>
                          <span style={{ color: active.color }}>ACTIVE ICP</span>
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
        <div className="block md:hidden space-y-4">
          {AUDIENCES.map((aud) => (
            <div
              key={aud.id}
              className="p-4 rounded-2xl border border-border bg-surface shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold" style={{ color: aud.color }}>
                  {aud.tagline}
                </span>
                <span className="text-xs font-mono font-black text-text-secondary">
                  {aud.num}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">{aud.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{aud.description}</p>
              <div className="space-y-1.5 pt-2 border-t border-border">
                {aud.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="text-primary font-bold">✔</span>
                    <span>{pt.replace(/^✔\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoIsItFor

