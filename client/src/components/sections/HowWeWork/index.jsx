import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const STUCK_GROWTH = 2
const OLD_PEAK = 38

// Strategic Execution Pillars: Proven methodology powering enterprise B2B pipeline growth.
const MOVES = [
  {
    verb: 'Define',
    title: 'Target Only Verified Accounts with Buying Intent',
    stuck: 'Budget wasted on broad, generic outreach to out-of-market companies.',
    body: 'We engineer your ideal customer profile using verified firmographics, installed technologies, regional parameters, and real-time buying signals. Unqualified accounts are filtered out before campaign launch.',
    before: 'Unsegmented account lists',
    after: '2,400 precision ICP-verified target accounts',
    deliverable: 'Proprietary ICP blueprint & scored Target Account List (TAL)',
    growth: 9,
    services: [
      { title: 'Demand Generation', link: '/demand-generation' },
      { title: 'Account-Based Marketing', link: '/abm' },
    ],
  },
  {
    verb: 'Identify',
    title: 'Engage Verified Economic Decision-Makers',
    stuck: 'High bounce rates and unverified contacts who lack purchasing authority.',
    body: 'Our data research team maps the multi-stakeholder buying committee inside each named account and verifies every record, guaranteeing deliverability and direct contact with decision-makers.',
    before: 'Outdated, decaying CRM records',
    after: '8,600+ multi-threaded buying committee decision-makers',
    deliverable: 'Enterprise contact intelligence backed by 99.8% accuracy SLA',
    growth: 17,
    services: [
      { title: 'B2B List Building', link: '/b2b-list-building' },
      { title: 'Database Cleansing', link: '/database-cleansing' },
    ],
  },
  {
    verb: 'Engage',
    title: 'Deliver Tailored, High-Relevance Value Propositions',
    stuck: 'Low reply rates resulting from generic, one-size-fits-all email blasts.',
    body: 'Personalized multi-channel email cadences, targeted content syndication, and intent-driven nurture programs address each stakeholder’s specific strategic priorities.',
    before: 'Generic mass broadcasts',
    after: '600+ high-intent accounts actively engaging',
    deliverable: 'Omnichannel multi-touch sequences with real-time intent telemetry',
    growth: 25,
    services: [
      { title: 'B2B Email Marketing', link: '/b2b-email-marketing' },
      { title: 'Content Syndication', link: '/content-syndication' },
      { title: 'Lead Nurturing', link: '/lead-nurturing' },
    ],
  },
  {
    verb: 'Qualify',
    title: 'Route Only Sales-Ready, Verified Opportunities',
    stuck: 'Sales bandwidth consumed by low-intent form fills and unqualified leads.',
    body: 'Every engaged prospect is rigorously validated against strict qualification standards (including BANT: Budget, Authority, Need, Timeline) before CRM ingestion.',
    before: 'Inflated, non-converting lead counts',
    after: '150 sales-ready MQL/SQL/BANT qualified leads',
    deliverable: 'Multi-tier qualification (BANT, HQL, SQL) with auditable criteria',
    growth: 33,
    services: [
      { title: 'BANT Lead Generation', link: '/bant-lead-generation' },
      { title: 'MQL Services', link: '/mql-services' },
      { title: 'HQL Services', link: '/hql-services' },
      { title: 'SQL Services', link: '/sql-services' },
    ],
  },
  {
    verb: 'Convert',
    title: 'Secure Confirmed Executive Discovery Meetings',
    stuck: 'Qualified leads stall due to delayed follow-up and scheduling friction.',
    body: "Our specialized appointment setting team confirms high-intent discovery meetings directly on your sales executives' calendars, complete with comprehensive account dossiers and pain-point notes.",
    before: 'Inconsistent, unpredictable meeting flow',
    after: '40+ confirmed executive discovery meetings',
    deliverable: 'Executive calendar placement with full account intelligence briefings',
    growth: 42,
    services: [
      { title: 'B2B Appointment Setting', link: '/b2b-appointment-setting' },
      { title: 'Webinar Services', link: '/webinar-services' },
    ],
  },
]

// Chart geometry (viewBox 0 0 600 300).
const STALL = { x: 300, y: 170 }
const HISTORY_PATH = 'M20 270 C 70 262, 110 225, 160 198 S 230 170, 250 168 C 268 166, 284 174, 300 170'
const growthToY = (g) => STALL.y - ((g - STUCK_GROWTH) / (OLD_PEAK - STUCK_GROWTH)) * 110
const PEAK_Y = growthToY(OLD_PEAK)
const NODES = MOVES.map((m, i) => ({ x: STALL.x + (i + 1) * 56, y: growthToY(m.growth) }))
const SEGMENTS = NODES.map((node, i) => {
  const from = i === 0 ? STALL : NODES[i - 1]
  const midX = (from.x + node.x) / 2
  return `M${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${node.y}, ${node.x} ${node.y}`
})

function RecoveryChart({ step, yourStage, reducedMotion }) {
  const growth = step >= 0 ? MOVES[step].growth : STUCK_GROWTH
  const brokeThrough = growth > OLD_PEAK
  const status = brokeThrough ? 'Accelerated' : step >= 0 ? 'Scaling' : 'Baseline'
  const statusColor = brokeThrough ? 'text-cta bg-[#FF6D00]/15' : step >= 0 ? 'text-primary bg-[#00A6FF]/15' : 'text-[#F87171] bg-[#EF4444]/15'
  const duration = reducedMotion ? 0 : 0.7

  return (
    <div className="rounded-3xl border border-white/10 bg-[#07090E] p-4 sm:p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-text-muted">Pipeline Velocity Index</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={growth}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className={`text-4xl sm:text-5xl font-black tabular-nums tracking-tight ${brokeThrough ? 'text-cta' : step >= 0 ? 'text-primary' : 'text-[#F87171]'}`}
            >
              +{growth}%
            </motion.p>
          </AnimatePresence>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-[12px] font-bold ${statusColor}`}>{status}</span>
      </div>

      <svg viewBox="0 0 600 300" className="mt-2 w-full h-auto max-h-[34vh] lg:max-h-none" role="img" aria-label={`Pipeline velocity ${growth}%, ${status.toLowerCase()}`}>
        <defs>
          <linearGradient id="hww-lift" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#00A6FF" />
            <stop offset="1" stopColor="#FF6D00" />
          </linearGradient>
        </defs>

        <line x1="20" x2="590" y1={PEAK_Y} y2={PEAK_Y} stroke="rgba(255,255,255,0.18)" strokeDasharray="5 7" />
        <text x="24" y={PEAK_Y - 8} fontSize="13" fontWeight="600" fill="rgba(255,255,255,0.45)">Industry Benchmark · +{OLD_PEAK}%</text>
        <line x1="20" x2="590" y1="285" y2="285" stroke="rgba(255,255,255,0.08)" />

        <path d={HISTORY_PATH} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="4" strokeLinecap="round" />
        <path d="M250 168 C 268 166, 284 174, 300 170" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
        <circle cx={STALL.x} cy={STALL.y} r="6" fill="#EF4444" />
        <text x={STALL.x} y={STALL.y + 28} textAnchor="middle" fontSize="13" fontWeight="700" fill="#F87171">Growth Plateau</text>

        {SEGMENTS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="url(#hww-lift)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: step >= i ? 1 : 0, opacity: step >= i ? 1 : 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,166,255,0.45))' }}
          />
        ))}

        {NODES.map((node, i) => {
          const reached = step >= i
          const isYours = yourStage === i
          return (
            <g key={MOVES[i].verb}>
              {isYours && !reducedMotion && (
                <circle cx={node.x} cy={node.y} r="14" fill="#FF6D00" opacity="0.25" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={reached ? 7 : 5}
                fill={reached ? (i === MOVES.length - 1 ? '#FF6D00' : '#00A6FF') : '#07090E'}
                stroke={isYours ? '#FF6D00' : reached ? 'transparent' : 'rgba(255,255,255,0.25)'}
                strokeWidth="2"
                style={{ transition: 'fill 400ms ease, r 400ms ease' }}
              />
              <text
                x={node.x}
                y={node.y - 16}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={reached ? '#ffffff' : 'rgba(255,255,255,0.3)'}
                style={{ transition: 'fill 400ms ease' }}
              >
                {MOVES[i].verb}
              </text>
            </g>
          )
        })}
      </svg>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          className="mt-3 flex min-h-[48px] items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-[14px]"
        >
          {step < 0 ? (
            <span className="text-text-secondary">This is your current baseline. Scroll to explore the strategic execution framework.</span>
          ) : (
            <>
              <span className="text-[#F87171] line-through decoration-[#EF4444]/60">{MOVES[step].before}</span>
              <ArrowRight size={15} className="shrink-0 text-text-muted" />
              <span className="font-bold text-success">{MOVES[step].after}</span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export const HowWeWork = ({ activeGoal }) => {
  const [step, setStep] = useState(-1)
  const stepRefs = useRef([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // On small screens the sticky chart covers the top of the viewport.
    const rootMargin = window.innerWidth < 1024 ? '-62% 0px -22% 0px' : '-45% 0px -45% 0px'
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.step)
          if (entry.isIntersecting) setStep(index)
          else if (index === 0 && entry.boundingClientRect.top > 0) setStep(-1)
        })
      },
      { rootMargin }
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="journey" className="relative bg-background py-20 lg:py-28" aria-labelledby="journey-heading">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">02 — OUR METHODOLOGY</p>
          <h2 id="journey-heading" className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-text-primary">
            Five Strategic Pillars Powering <span className="text-cta">Predictable Revenue</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-text-secondary">
            Explore how our end-to-end framework systematically transforms unqualified volume into predictable, closed-won pipeline.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="sticky top-[84px] z-10 self-start bg-background pb-2 lg:order-2 lg:col-span-7 lg:top-[120px] lg:pb-0">
            <RecoveryChart step={step} yourStage={activeGoal?.stage} reducedMotion={reducedMotion} />
          </div>

          <div className="lg:order-1 lg:col-span-5">
            {MOVES.map((move, i) => {
              const isActive = step === i
              const isYours = activeGoal?.stage === i
              return (
                <article
                  key={move.verb}
                  id={`journey-step-${i}`}
                  data-step={i}
                  ref={(el) => { stepRefs.current[i] = el }}
                  className={`flex min-h-[65vh] lg:min-h-[75vh] flex-col justify-center py-10 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                      Pillar <span className="text-primary">0{i + 1}</span> · {move.verb}
                    </p>
                    {isYours && (
                      <span className="rounded-full bg-[#FF6D00]/15 px-2.5 py-1 text-[12px] font-semibold text-cta">
                        Selected Focus
                      </span>
                    )}
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-[15px] font-semibold text-[#F87171]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF4444]" />
                    The Challenge: {move.stuck}
                  </p>
                  <h3 className="mt-3 text-2xl sm:text-4xl font-black tracking-[-0.02em] leading-[1.12] text-text-primary">
                    {move.title}
                  </h3>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-secondary">{move.body}</p>
                  <p className="mt-5 text-[14px] text-text-secondary">
                    <span className="font-semibold text-text-primary">Key Deliverable: </span>
                    {move.deliverable}
                    <span className="ml-2 font-bold text-success">· Projected Lift: +{move.growth}%</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {move.services.map((service) => (
                      <Link
                        key={service.link}
                        to={service.link}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[13px] font-semibold text-text-primary hover:border-primary hover:text-primary transition-colors"
                      >
                        {service.title}
                        <ArrowUpRight size={13} />
                      </Link>
                    ))}
                  </div>
                </article>
              )
            })}

            <a
              href="#services"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:gap-3 transition-all"
            >
              Explore our tailored growth solutions below <ArrowDown size={16} />
            </a>
          </div>
        </div>

        <p className="mt-8 text-[12px] text-text-muted">Illustrative numbers from a typical campaign.</p>
      </div>
    </section>
  )
}

export default HowWeWork
