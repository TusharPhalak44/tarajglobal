import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Search,
  Zap,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Layers,
} from 'lucide-react'
import AnimatedGrid from '@components/animations/AnimatedGrid'

const STAGES = [
  {
    num: '01',
    stepPill: 'STEP 01 OF 05',
    title: 'DEFINE',
    label: 'Define & Telemetry Mapping',
    shortLabel: 'Telemetry Mapping',
    category: 'AUDIENCE & TELEMETRY MAPPING',
    headline: 'Define & Telemetry Mapping',
    description:
      'Audit Total Addressable Market (TAM), calibrate ideal customer persona attributes across US/EMEA/APAC, and set baseline pipeline velocity KPIs.',
    sla: 'Baseline Velocity KPIs Locked',
    icon: Target,
    color: '#00A6FF',
    glow: 'rgba(0,166,255,0.25)',
    deliverables: [
      'Total Addressable Market (TAM) Sizing & Account Prioritization',
      'Multi-Region Persona Calibration across US, EMEA & APAC',
      'Baseline Pipeline Velocity & Revenue Benchmark SLA',
    ],
    parameters: [
      { label: 'MARKET AUDIT', value: 'Global TAM Mapping', sub: 'High-fit account universe' },
      { label: 'TARGET REGIONS', value: 'US, EMEA & APAC', sub: 'Cross-continental scope' },
      { label: 'BUYING PERSONAS', value: 'C-Suite & VP Leaders', sub: 'Authority decision-makers' },
      { label: 'VELOCITY KPIS', value: 'Baseline Calibrated', sub: 'Predictable pipeline goals' },
    ],
  },
  {
    num: '02',
    stepPill: 'STEP 02 OF 05',
    title: 'IDENTIFY',
    label: 'Identify & In-House Verification',
    shortLabel: 'In-House Verification',
    category: 'PROPRIETARY VERIFICATION',
    headline: 'Identify & In-House Verification',
    description:
      'Map buying committees using intent signals and validate direct contact details through our proprietary verification tool.',
    sla: '99.8% Data Accuracy SLA Enforced',
    icon: Search,
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.25)',
    deliverables: [
      'Multi-Threaded Buying Committee Discovery & Stakeholder Mapping',
      'Real-Time First-Party Intent Signal & Research Surge Tracking',
      'Proprietary In-House Verification & Direct Phone Validation',
    ],
    parameters: [
      { label: 'BUYING COMMITTEES', value: 'Multi-Threaded Mapping', sub: 'Stakeholder coverage' },
      { label: 'INTENT SIGNALS', value: 'Active Research Spikes', sub: 'In-market evaluation' },
      { label: 'DIRECT CONTACTS', value: 'Triple-Validated Data', sub: 'Phones & verified emails' },
      { label: 'DATA VERIFICATION', value: 'In-House Engine SLA', sub: 'Zero bounce guarantee' },
    ],
  },
  {
    num: '03',
    stepPill: 'STEP 03 OF 05',
    title: 'ENGAGE',
    label: 'Engage & Automated Cadence',
    shortLabel: 'Automated Cadence',
    category: 'AUTOMATED OUTBOUND CADENCE',
    headline: 'Engage & Automated Cadence',
    description:
      'Deploy multi-channel outbound sequences across email, content syndication, and digital touchpoints using deliverability-optimized infrastructure.',
    sla: 'Deliverability Health: 99.6% Inbox Rate',
    icon: Zap,
    color: '#10B981',
    glow: 'rgba(16,185,129,0.25)',
    deliverables: [
      'Automated Multi-Channel Outreach Cadences',
      'Authoritative Content Syndication to Active Buying Accounts',
      'Deliverability-Optimized Domain & Infrastructure Routing',
    ],
    metrics: [
      {
        icon: Mail,
        label: 'EMAIL SEQUENCES',
        val: '97.2%',
        sub: 'Inbox Placement',
        color: '#00A6FF',
      },
      {
        icon: Layers,
        label: 'CONTENT SYNDICATION',
        val: '12.8x',
        sub: 'Reach Lift',
        color: '#38BDF8',
      },
      {
        icon: Target,
        label: 'DIGITAL TOUCHPOINTS',
        val: '5.4x',
        sub: 'Engagement Lift',
        color: '#10B981',
      },
    ],
  },
  {
    num: '04',
    stepPill: 'STEP 04 OF 05',
    title: 'QUALIFY',
    label: 'Qualify & BANT Scoring',
    shortLabel: 'BANT Scoring',
    category: 'CRM-POWERED BANT SCORING',
    headline: 'Qualify & BANT Scoring',
    description:
      'Evaluate engaged prospects against strict Budget, Authority, Need, and Timeline parameters logged directly in our CRM engine.',
    sla: 'Zero Cold Lead Handover Guarantee',
    icon: TrendingUp,
    color: '#FF6D00',
    glow: 'rgba(255,109,0,0.25)',
    deliverables: [
      'Rigorous BANT Evaluation (Budget, Authority, Need, Timeline)',
      'Direct Dialog Qualification by Experienced Sales Specialists',
      'Full Qualification Logs Recorded Directly in Unified CRM',
    ],
    parameters: [
      { label: 'BUDGET VALIDATION', value: 'Allocated Investment', sub: 'Confirmed fiscal budget' },
      { label: 'AUTHORITY CHECK', value: 'Decision-Maker Sign-off', sub: 'C-Suite & VP verified' },
      { label: 'NEED & PAIN POINT', value: 'Documented Initiative', sub: 'Direct business challenge' },
      { label: 'CRM LOGGING', value: '100% Sales Qualified', sub: 'Logged in unified engine' },
    ],
  },
  {
    num: '05',
    stepPill: 'STEP 05 OF 05',
    title: 'CONVERT',
    label: 'Convert & Closed-Loop Delivery',
    shortLabel: 'Closed-Loop Delivery',
    category: 'CLOSED-LOOP PIPELINE DELIVERY',
    headline: 'Convert & Closed-Loop Delivery',
    description:
      'Route confirmed discovery appointments into your sales calendars alongside complete, verified account intelligence records.',
    sla: 'Complete Account Intelligence Records Included',
    icon: CheckCircle2,
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.25)',
    deliverables: [
      'Direct Discovery Calendar Bookings on Sales Rep Schedules',
      'Comprehensive Pre-Call Dossier & Account Intelligence Brief',
      'Seamless Closed-Loop Delivery to HubSpot, Salesforce & APIs',
    ],
    parameters: [
      { label: 'APPOINTMENT ROUTING', value: 'Direct Calendar Sync', sub: 'Confirmed discovery slots' },
      { label: 'INTELLIGENCE RECORDS', value: 'Verified Dossiers', sub: 'Complete stakeholder data' },
      { label: 'PIPELINE IMPACT', value: 'Predictable Revenue', sub: 'Accelerated conversion' },
      { label: 'CRM INTEGRATION', value: 'Unified Delivery Flow', sub: 'Salesforce, HubSpot & APIs' },
    ],
  },
]

export const HowWeWork = () => {
  const [activeStage, setActiveStage] = useState(0)
  const currentStage = STAGES[activeStage] || STAGES[0]

  const containerRef = useRef(null)
  const isWheelingRef = useRef(false)
  const activeStageRef = useRef(activeStage)

  // Keep ref updated to avoid stale closures in event listeners
  useEffect(() => {
    activeStageRef.current = activeStage
  }, [activeStage])

  // Single-Scroll Step Locking:
  // When the section is in view, scrolling advances steps 01 -> 02 -> 03 -> 04 -> 05 one scroll at a time.
  // The screen DOES NOT scroll away; it stays stationary until all steps are completed.
  useEffect(() => {
    const handleWheel = (e) => {
      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      // Section is considered locked when it is centered or aligned in view
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100
      if (!inView) return

      const isScrollingDown = e.deltaY > 15
      const isScrollingUp = e.deltaY < -15

      if (!isScrollingDown && !isScrollingUp) return

      const current = activeStageRef.current

      // Downward scroll
      if (isScrollingDown) {
        if (current < STAGES.length - 1) {
          // Prevent screen scroll; lock in place and step forward
          e.preventDefault()
          e.stopPropagation()
          if (!isWheelingRef.current) {
            isWheelingRef.current = true
            setActiveStage(current + 1)
            setTimeout(() => {
              isWheelingRef.current = false
            }, 450)
          }
        }
        // When current === STAGES.length - 1 (step 5 completed):
        // Do NOT preventDefault! Allow normal scroll to the next section!
      } else if (isScrollingUp) {
        if (current > 0) {
          // Prevent screen scroll; lock in place and step backward
          e.preventDefault()
          e.stopPropagation()
          if (!isWheelingRef.current) {
            isWheelingRef.current = true
            setActiveStage(current - 1)
            setTimeout(() => {
              isWheelingRef.current = false
            }, 450)
          }
        }
        // When current === 0:
        // Do NOT preventDefault! Allow normal scroll up to the previous section!
      }
    }

    // Touch swipe handling for mobile devices
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight - 80
      if (!inView) return

      const touchY = e.touches[0].clientY
      const diff = touchStartY - touchY

      const current = activeStageRef.current

      if (diff > 45) {
        // Swipe Up -> Step forward
        if (current < STAGES.length - 1) {
          e.preventDefault()
          if (!isWheelingRef.current) {
            isWheelingRef.current = true
            setActiveStage(current + 1)
            setTimeout(() => {
              isWheelingRef.current = false
            }, 450)
          }
        }
      } else if (diff < -45) {
        // Swipe Down -> Step backward
        if (current > 0) {
          e.preventDefault()
          if (!isWheelingRef.current) {
            isWheelingRef.current = true
            setActiveStage(current - 1)
            setTimeout(() => {
              isWheelingRef.current = false
            }, 450)
          }
        }
      }
    }

    // Capture phase listener to intercept before window/Lenis
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    const el = containerRef.current
    if (el) {
      el.addEventListener('touchstart', handleTouchStart, { passive: true })
      el.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true })
      if (el) {
        el.removeEventListener('touchstart', handleTouchStart)
        el.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [])

  return (
    <section
      id="how-we-work"
      ref={containerRef}
      className="relative bg-[#070B14] min-h-screen lg:h-screen w-full flex flex-col justify-center items-center overflow-hidden py-4 sm:py-6 lg:py-8 border-b border-white/[0.08] select-none"
      aria-labelledby="how-we-work-heading"
    >
      {/* ── Ambient Radial Lighting & Animated Grid ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] rounded-full bg-[#00A6FF]/[0.05] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[240px] rounded-full bg-[#FF6D00]/[0.035] blur-[130px]" />
      </div>

      <AnimatedGrid size={64} opacity={0.03} />

      {/* ── Main Frame Container (Fits entirely in 1 Viewport Frame) ─── */}
      <div className="mx-auto max-w-[1240px] w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full max-h-[820px] my-auto">
        
        {/* ── Section Header ─── */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4 lg:mb-5">
          <div className="inline-flex items-center justify-center mb-1.5 sm:mb-2">
            <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              HOW WE WORK
            </p>
          </div>

          <h2
            id="how-we-work-heading"
            className="text-2xl sm:text-3xl lg:text-[36px] font-black tracking-[-0.03em] leading-tight text-white mb-1.5"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00]">
              Tech-Enabled Revenue Framework
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto hidden sm:block">
            Every global campaign follows a structured, data-backed methodology managed entirely inside our unified CRM delivery platform.
          </p>
        </div>

        {/* ── 5-Stage Horizontal Progression Timeline ─── */}
        <div className="relative w-full max-w-[1040px] mx-auto mb-3 sm:mb-4 lg:mb-5">
          <div className="relative pt-1 pb-1">
            
            {/* Background Track Line */}
            <div className="absolute top-[22px] sm:top-[24px] left-[8%] right-[8%] h-[2px] bg-white/10 rounded-full z-0" />

            {/* Active Smooth Progress Fill */}
            <div
              className="absolute top-[22px] sm:top-[24px] left-[8%] h-[2px] bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#00E5FF] rounded-full z-0 transition-all duration-500 shadow-[0_0_12px_rgba(0,166,255,0.7)]"
              style={{
                width: `${(activeStage / (STAGES.length - 1)) * 84}%`,
              }}
            />

            {/* 5 Stages Horizontal Row */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-3 relative z-10">
              {STAGES.map((st, idx) => {
                const isActive = activeStage === idx
                const isCompleted = activeStage > idx
                const StageIcon = st.icon

                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-hidden transition-all duration-300"
                  >
                    {/* Node Circle */}
                    <div
                      className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 mb-1.5 ${
                        isActive
                          ? 'border-2 bg-[#080D1A] text-white shadow-xl ring-4 ring-[#00A6FF]/25 scale-105'
                          : isCompleted
                          ? 'border-2 bg-[#080D1A] text-[#00A6FF] opacity-90'
                          : 'border border-white/20 bg-[#080D1A]/80 text-slate-400 opacity-60 group-hover:opacity-90'
                      }`}
                      style={{
                        borderColor: isActive || isCompleted ? st.color : undefined,
                        boxShadow: isActive ? `0 0 16px ${st.glow}` : undefined,
                      }}
                    >
                      <StageIcon size={17} style={{ color: isActive || isCompleted ? st.color : undefined }} />
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="w-full px-0.5">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`text-[11px] sm:text-xs font-bold tracking-wider ${
                          isActive ? 'text-[#00A6FF]' : 'text-slate-400'
                        }`}>
                          {st.num}
                        </span>
                        <h4 className={`text-xs sm:text-[13px] font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}>
                          {st.title}
                        </h4>
                      </div>

                      <p className={`text-[10px] sm:text-[11px] font-medium mt-0.5 truncate transition-colors duration-300 ${
                        isActive ? 'text-slate-200' : 'text-slate-400'
                      }`}>
                        {st.label}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Realistic Enterprise Showcase Card (No AI sci-fi console tropes) ─── */}
        <div className="relative w-full max-w-[1040px] mx-auto rounded-2xl sm:rounded-3xl border border-white/15 bg-[#090F1F]/95 p-4 sm:p-5 lg:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden">
          
          {/* Subtle Ambient Accent Border Glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-70 transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${currentStage.color}, transparent)`,
            }}
          />

          {/* Clean Enterprise Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 mb-4 sm:mb-5">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/30">
                {currentStage.stepPill}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                {currentStage.label}
              </span>
            </div>

            {/* Clean SLA Guarantee Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>{currentStage.sla}</span>
            </div>
          </div>

          {/* Dynamic Stage Content Body */}
          <div className="min-h-[170px] sm:min-h-[185px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`stage-view-${activeStage}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center"
              >
                {/* Left Column: Stage Editorial Context & Deliverables */}
                <div className="md:col-span-5 space-y-2.5">
                  <span className="text-xs font-bold text-[#00A6FF] tracking-wider uppercase block">
                    {currentStage.category}
                  </span>
                  
                  <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug">
                    {currentStage.headline}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {currentStage.description}
                  </p>

                  {/* Clean Deliverables Checklist */}
                  <div className="space-y-1.5 pt-1">
                    {currentStage.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-200">
                        <span className="w-4 h-4 rounded-full bg-[#00A6FF]/15 border border-[#00A6FF]/30 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-[#00A6FF]" />
                        </span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: 4 Authentic Deliverable Cards or 3-Stage Metric Grid */}
                <div className="md:col-span-7">
                  {currentStage.metrics ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {currentStage.metrics.map((m, i) => {
                        const MIcon = m.icon
                        return (
                          <div
                            key={i}
                            className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0B1429] border border-white/10 hover:border-white/25 transition-all duration-200 text-center flex flex-col items-center justify-center group"
                          >
                            <MIcon size={20} className="mb-2" style={{ color: m.color }} />
                            <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold block mb-1">
                              {m.label}
                            </span>
                            <span className="text-xl sm:text-2xl lg:text-[26px] font-black text-white block my-0.5 tracking-tight">
                              {m.val}
                            </span>
                            <span className="text-xs sm:text-[13px] text-emerald-400 font-semibold block mt-0.5">
                              {m.sub}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {currentStage.parameters.map((param, i) => (
                        <div
                          key={i}
                          className="p-3 sm:p-3.5 rounded-xl bg-[#0B1429] border border-white/10 hover:border-white/20 transition-all duration-200"
                        >
                          <span className="text-[11px] uppercase text-slate-400 tracking-wider font-semibold block mb-1">
                            {param.label}
                          </span>
                          <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-white block">
                            {param.value}
                          </span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {param.sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clean Card Footer Bar */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-4 text-xs text-slate-300">
            {/* Step Selection Dots */}
            <div className="flex items-center gap-1.5">
              {STAGES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeStage === idx
                      ? 'w-6 bg-[#00A6FF]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] text-slate-400 ml-2 font-medium">
                Stage {activeStage + 1} of 5
              </span>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStage((prev) => Math.max(prev - 1, 0))}
                disabled={activeStage === 0}
                className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous step"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => setActiveStage((prev) => Math.min(prev + 1, STAGES.length - 1))}
                disabled={activeStage === STAGES.length - 1}
                className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next step"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default HowWeWork
