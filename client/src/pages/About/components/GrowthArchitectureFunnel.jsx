import React, { useState, useEffect, useRef } from 'react'
import { ShieldCheck, Database, Target, Zap } from 'lucide-react'

const FUNNEL_STAGES = [
  {
    id: 'discovery',
    step: '01',
    tag: 'Discovery',
    title: 'Account Intelligence & TAM Intent',
    headline: 'High-Intent B2B Account Identification',
    description: 'Real-time buying signal capture across North America, EMEA, and APAC. We map your total addressable market to identify active buying accounts entering procurement cycles.',
    icon: Target,
    svg: {
      topW: 440,
      botW: 340,
      yTop: 10,
      yBot: 46,
    },
  },
  {
    id: 'validation',
    step: '02',
    tag: 'Validation',
    title: 'Deliverability Engine',
    headline: 'Proprietary Post-Research Verification',
    description: 'Every email and direct-dial passes triple-check MX server handshakes and mailbox test algorithms before handoff to eliminate bounce risks completely.',
    icon: ShieldCheck,
    svg: {
      topW: 330,
      botW: 244,
      yTop: 52,
      yBot: 88,
    },
  },
  {
    id: 'orchestration',
    step: '03',
    tag: 'Orchestration',
    title: 'Single CRM Infrastructure',
    headline: 'Closed-Loop Pipeline Integration',
    description: 'Zero duplicate account risk with bidirectional CRM pipe integration. Sales-ready opportunities sync directly into your Salesforce, HubSpot, or custom API endpoints.',
    icon: Database,
    svg: {
      topW: 236,
      botW: 160,
      yTop: 94,
      yBot: 130,
    },
  },
  {
    id: 'revenue',
    step: '04',
    tag: 'Revenue',
    title: 'Verified Decision-Maker Access',
    headline: 'Direct Executive Engagement',
    description: 'High-velocity sales conversations with verified C-Suite and VP decision-makers executed by our dual-headquarter teams operating 24/7 across San Francisco and Pune.',
    icon: Zap,
    svg: {
      topW: 152,
      botW: 88,
      yTop: 136,
      yBot: 172,
    },
  },
]

export const GrowthArchitectureFunnel = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  // Auto-cycle through funnel stages every 3.8s, pause on hover
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FUNNEL_STAGES.length)
    }, 3800)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovered])

  const activeStage = FUNNEL_STAGES[activeIdx]
  const ActiveIcon = activeStage.icon

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full max-h-[580px] flex flex-col justify-between bg-[#060B14]/95 dark:bg-[#060B14]/95 border border-white/10 rounded-2xl p-4 sm:p-5 font-sans relative overflow-hidden backdrop-blur-xl shadow-2xl select-none"
    >
      {/* Ambient Technical Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#00A6FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── TOP HEADER (CLEAN & MINIMAL) ── */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 shrink-0 relative z-10">
        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#00A6FF] font-mono">
          PRECISION GROWTH FUNNEL
        </span>
        <span className="text-xs font-semibold text-slate-400 font-mono">
          4-Stage Demand Architecture
        </span>
      </div>

      {/* ── PROMINENT FULL-WIDTH 3D ISOMETRIC FUNNEL ── */}
      <div className="w-full my-auto py-2 flex items-center justify-center relative z-10">
        <svg
          viewBox="0 0 460 178"
          className="w-full max-w-[460px] h-auto overflow-visible"
          aria-label="Interactive 4-Stage Precision Growth Funnel"
        >
          <defs>
            {/* Active Tier Radiant Cyan Gradient */}
            <linearGradient id="tierActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#00A6FF" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#005B99" stopOpacity="0.2" />
            </linearGradient>

            {/* Inactive Tier Subtle Slate Gradient */}
            <linearGradient id="tierInactiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.2" />
            </linearGradient>

            {/* Top Rim Shading */}
            <linearGradient id="tierTopRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00A6FF" stopOpacity="0.25" />
            </linearGradient>

            {/* Glowing Laser Filter */}
            <filter id="tierGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00A6FF" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Render 4 Large Tapered Isometric Funnel Tiers */}
          {FUNNEL_STAGES.map((stage, idx) => {
            const { topW, botW, yTop, yBot } = stage.svg
            const cx = 230
            const x1 = cx - topW / 2
            const x2 = cx + topW / 2
            const x3 = cx + botW / 2
            const x4 = cx - botW / 2
            const isActive = activeIdx === idx

            // Trapezoid points: Top-left -> Top-right -> Bottom-right -> Bottom-left
            const points = `${x1},${yTop} ${x2},${yTop} ${x3},${yBot} ${x4},${yBot}`

            return (
              <g
                key={stage.id}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Active Ambient Halo under the selected tier */}
                {isActive && (
                  <polygon
                    points={points}
                    fill="#00A6FF"
                    opacity="0.12"
                    filter="url(#tierGlow)"
                  />
                )}

                {/* Main Tapered Face */}
                <polygon
                  points={points}
                  fill={isActive ? 'url(#tierActiveGrad)' : 'url(#tierInactiveGrad)'}
                  stroke={isActive ? '#38BDF8' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isActive ? '2' : '1'}
                  className="transition-all duration-300"
                />

                {/* Top Rim Highlight Line */}
                <line
                  x1={x1}
                  y1={yTop}
                  x2={x2}
                  y2={yTop}
                  stroke={isActive ? '#38BDF8' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isActive ? '2.5' : '1'}
                />

                {/* Subtle Center Guide Wireframe */}
                <line
                  x1={x1 + (x4 - x1) * 0.5}
                  y1={(yTop + yBot) / 2}
                  x2={x2 + (x3 - x2) * 0.5}
                  y2={(yTop + yBot) / 2}
                  stroke={isActive ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.05)'}
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                />

                {/* Stage Number & Title Label (Centered within Tier Geometry) */}
                <text
                  x={cx}
                  y={(yTop + yBot) / 2 + 4.5}
                  textAnchor="middle"
                  fill={isActive ? '#FFFFFF' : '#CBD5E1'}
                  fontSize={idx === 3 ? '11' : idx === 2 ? '11.5' : '12'}
                  fontWeight="800"
                  letterSpacing="0.05em"
                  className="pointer-events-none transition-colors duration-300 select-none font-sans"
                >
                  {stage.step}. {stage.tag.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── SEGMENTED STAGE TABS (USER-FRIENDLY & INTUITIVE) ── */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 my-1 shrink-0 relative z-10">
        {FUNNEL_STAGES.map((stage, idx) => {
          const isActive = activeIdx === idx

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`py-1.5 sm:py-2 px-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer text-center truncate ${
                isActive
                  ? 'bg-[#00A6FF] text-slate-950 shadow-[0_0_15px_rgba(0,166,255,0.4)]'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5'
              }`}
            >
              <span className="hidden sm:inline font-mono mr-1">{stage.step}.</span>
              <span>{stage.tag}</span>
            </button>
          )
        })}
      </div>

      {/* ── ACTIVE STAGE SHOWCASE PANEL ── */}
      <div className="mt-2 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 relative z-10 shrink-0">
        {/* Stage Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#00A6FF]/15 text-[#38BDF8] border border-[#00A6FF]/30 flex items-center justify-center shrink-0">
            <ActiveIcon className="w-4 h-4" />
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
            {activeStage.headline}
          </h4>
        </div>

        {/* Clear, Human-Readable Description */}
        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
          {activeStage.description}
        </p>
      </div>
    </div>
  )
}
