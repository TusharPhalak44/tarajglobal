import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Database, 
  TrendingUp, 
  Users, 
  Radio, 
  PhoneCall, 
  CalendarCheck, 
  Sparkles, 
  Layers,
  ArrowRight,
  Zap
} from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/**
 * GrowthEngineNetwork
 * Hero Central Visual System: B2B Growth Intelligence Network
 * Visualizes the interconnected B2B pipeline flow:
 * TAM → ICP → DECISION MAKERS → VERIFIED DATA → INTENT SIGNALS → OUTREACH → APPOINTMENTS → PIPELINE → REVENUE
 */
export const GrowthEngineNetwork = ({ activeStage, onHoverStage }) => {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredNode, setHoveredNode] = useState(null)
  const [pulseTick, setPulseTick] = useState(0)

  // Fluid continuous pulse stream
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100)
    }, 45)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Intelligent Network Nodes configuration (9 Core Nodes)
  const networkNodes = [
    // ── STAGE 01: AUDIENCE INTEL (Cyan/Blue #00A6FF / #00E5FF) ──
    {
      id: 'tam',
      stage: '01',
      x: 120,
      y: 95,
      title: 'TAM',
      sub: 'MAPPED',
      desc: 'Total Addressable Market Matrix',
      metric: '100% Calibrated',
      color: '#00A6FF',
      icon: Layers,
    },
    {
      id: 'icp',
      stage: '01',
      x: 275,
      y: 65,
      title: 'ICP',
      sub: 'CALIBRATED',
      desc: 'Precision Account Prioritization',
      metric: '100% Precision',
      color: '#00E5FF',
      icon: Target,
    },
    {
      id: 'decision-makers',
      stage: '01',
      x: 385,
      y: 145,
      title: 'DECISION MAKERS',
      sub: 'STAKEHOLDERS',
      desc: 'C-Suite & Buying Committee',
      metric: '6.8 Key Contacts',
      color: '#00A6FF',
      icon: Users,
    },

    // ── STAGE 02: VERIFIED DATA (Emerald Green #10B981 / #72D669) ──
    {
      id: 'verified-data',
      stage: '02',
      x: 145,
      y: 335,
      title: 'VERIFIED DATA',
      sub: 'DIRECT DIALS',
      desc: 'Multi-Pass Direct-Dial Verification',
      metric: '99.8% Accuracy',
      color: '#10B981',
      icon: PhoneCall,
    },
    {
      id: 'intent-signals',
      stage: '02',
      x: 320,
      y: 395,
      title: 'INTENT SIGNALS',
      sub: 'TELEMETRY',
      desc: 'Surge Topics & Buying Triggers',
      metric: 'Real-Time Intent',
      color: '#72D669',
      icon: Radio,
    },

    // ── STAGE 03: FULL FUNNEL (Signal Orange / Amber #FF6D00 / #FFA600) ──
    {
      id: 'outreach',
      stage: '03',
      x: 630,
      y: 110,
      title: 'OUTREACH',
      sub: 'ACTIVATED',
      desc: 'Targeted Omnichannel Cadence',
      metric: 'Multi-Touch Sprints',
      color: '#FFA600',
      icon: Zap,
    },
    {
      id: 'appointments',
      stage: '03',
      x: 770,
      y: 195,
      title: 'APPOINTMENTS',
      sub: 'CONFIRMED',
      desc: 'Executive Discovery Meetings',
      metric: 'Sales-Ready SQLs',
      color: '#FF6D00',
      icon: CalendarCheck,
    },
    {
      id: 'pipeline',
      stage: '03',
      x: 695,
      y: 345,
      title: 'PIPELINE',
      sub: 'WON',
      desc: 'Closed-Loop Opportunity Pipeline',
      metric: 'High Conversion',
      color: '#FF6D00',
      icon: TrendingUp,
    },
    {
      id: 'revenue',
      stage: '03',
      x: 825,
      y: 390,
      title: 'REVENUE',
      sub: 'PREDICTABLE',
      desc: 'Sustainable Enterprise Growth',
      metric: 'GROWTH Predictable',
      color: '#FFA600',
      icon: Sparkles,
    },
  ]

  // Interconnecting Vector Conduits
  const connections = [
    // Stage 1 Flow: TAM -> ICP -> Decision Makers -> Core Engine
    { from: 'tam', to: 'icp', stage: '01', color: '#00A6FF', path: 'M 120 95 Q 195 55 275 65' },
    { from: 'icp', to: 'decision-makers', stage: '01', color: '#00E5FF', path: 'M 275 65 Q 345 85 385 145' },
    { from: 'decision-makers', to: 'core', stage: '01', color: '#00A6FF', path: 'M 385 145 Q 450 185 490 225' },
    
    // Stage 2 Flow: Verified Data -> Intent Signals -> Core Engine
    { from: 'verified-data', to: 'intent-signals', stage: '02', color: '#10B981', path: 'M 145 335 Q 230 385 320 395' },
    { from: 'intent-signals', to: 'core', stage: '02', color: '#72D669', path: 'M 320 395 Q 430 360 490 225' },
    
    // Core Engine -> Stage 3 Flow: Core -> Outreach -> Appointments -> Pipeline -> Revenue
    { from: 'core', to: 'outreach', stage: '03', color: '#FFA600', path: 'M 490 225 Q 560 150 630 110' },
    { from: 'outreach', to: 'appointments', stage: '03', color: '#FF6D00', path: 'M 630 110 Q 710 135 770 195' },
    { from: 'appointments', to: 'pipeline', stage: '03', color: '#FF6D00', path: 'M 770 195 Q 755 285 695 345' },
    { from: 'pipeline', to: 'revenue', stage: '03', color: '#FFA600', path: 'M 695 345 Q 760 385 825 390' },

    // Cross-system telemetry bridge lines (Subtle dotted conduits)
    { from: 'tam', to: 'verified-data', stage: '01', color: '#00A6FF', path: 'M 120 95 Q 105 215 145 335', subtle: true },
    { from: 'decision-makers', to: 'verified-data', stage: '02', color: '#10B981', path: 'M 385 145 Q 310 260 145 335', subtle: true },
    { from: 'intent-signals', to: 'pipeline', stage: '03', color: '#FF6D00', path: 'M 320 395 Q 520 440 695 345', subtle: true },
  ]

  const isStageActive = (stageId) => activeStage === stageId || activeStage === null

  return (
    <div className="relative w-full max-w-[1100px] mx-auto overflow-visible select-none my-4">
      
      {/* ── Ambient Radial Lighting Behind Network ──────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[460px] rounded-full bg-radial from-primary/18 via-[#FF6D00]/6 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* ── Top Telemetry HUD Status Bar ────────────────────────────── */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-2 mb-2.5 rounded-xl bg-[#090D17]/90 border border-slate-800 dark:border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200 font-bold uppercase tracking-wider">
            B2B GROWTH ENGINE // ACTIVE TOPOLOGY
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-slate-400">
          <span>LATENCY: <strong className="text-emerald-400">8ms</strong></span>
          <span>SLA ACCURACY: <strong className="text-primary">99.8%</strong></span>
          <span>PIPELINE: <strong className="text-cta">PREDICTABLE</strong></span>
        </div>
      </div>

      {/* ── Network Canvas Container ─────────────────────────────────── */}
      <div className="relative w-full aspect-[2/1] min-h-[360px] sm:min-h-[440px] md:min-h-[480px] rounded-2xl bg-[#080B14]/95 border border-slate-800/90 dark:border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden p-2 sm:p-4">
        
        {/* Subtle Coordinate Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Outer Circular Coordinate Horizon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="w-[560px] h-[330px] rounded-[100%] border border-dashed border-primary/40" />
          <div className="absolute w-[780px] h-[430px] rounded-[100%] border border-slate-700/30" />
        </div>

        {/* ── SVG Connections Layer ─────────────────────────────────── */}
        <svg 
          viewBox="0 0 920 480" 
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Core Glow Gradient */}
            <radialGradient id="coreGlowPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#FF6D00" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00A6FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Render All Connecting Conduits */}
          {connections.map((conn, idx) => {
            const isConnActive = activeStage === null || activeStage === conn.stage
            const strokeColor = conn.stage === '01' ? '#00A6FF' : conn.stage === '02' ? '#10B981' : '#FF6D00'
            const strokeOpacity = isConnActive ? (conn.subtle ? 0.35 : 0.85) : 0.1
            const strokeWidth = isConnActive ? (conn.subtle ? 1.2 : 2.4) : 1

            return (
              <g key={idx}>
                {/* Conduit Track Line */}
                <path
                  d={conn.path}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={strokeOpacity}
                  strokeLinecap="round"
                  strokeDasharray={conn.subtle ? '4 6' : 'none'}
                  className="transition-all duration-300"
                />

                {/* Flowing Data Energy Pulses */}
                {!prefersReducedMotion && isConnActive && !conn.subtle && (
                  <path
                    d={conn.path}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={strokeWidth + 1}
                    strokeLinecap="round"
                    strokeDasharray="8 85"
                    strokeDashoffset={-pulseTick * 3.2}
                    opacity="0.95"
                  />
                )}
              </g>
            )
          })}

          {/* Central Target Pulsing Core Bloom */}
          <circle cx="490" cy="225" r="90" fill="url(#coreGlowPulse)" />
        </svg>

        {/* ── CENTRAL TARAJ GLOBAL GROWTH ENGINE CORE ───────────────── */}
        <div 
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto cursor-pointer group"
          style={{ left: '53.5%', top: '47%' }}
        >
          {/* Animated Orbital Energy Ring */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center">
            
            {/* Outer Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-primary/60"
            />

            {/* Inner Counter-Rotating Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-1.5 rounded-full border border-[#FF6D00]/50"
            />

            {/* Glowing Core Emblem Disk */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#090D17] border-2 border-primary/90 shadow-[0_0_28px_rgba(0,166,255,0.7)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={20} className="text-[#00E5FF] animate-pulse" />
            </div>
          </div>

          {/* Core Label Badge */}
          <div className="mt-1 px-3 py-1 rounded-full bg-[#0a0f1d]/90 border border-slate-700 dark:border-white/15 shadow-xl backdrop-blur-md inline-block">
            <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-widest text-white uppercase block">
              TARAJ GLOBAL
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#00E5FF] uppercase block tracking-wider">
              GROWTH ENGINE
            </span>
          </div>
        </div>

        {/* ── INTELLIGENT NETWORK NODES (9 Nodes) ───────────────────── */}
        {networkNodes.map((node) => {
          const Icon = node.icon
          const isNodeActive = isStageActive(node.stage)
          const isHovered = hoveredNode === node.id

          const leftPct = (node.x / 920) * 100
          const topPct = (node.y / 480) * 100

          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => {
                setHoveredNode(node.id)
                onHoverStage?.(node.stage)
              }}
              onMouseLeave={() => {
                setHoveredNode(null)
                onHoverStage?.(null)
              }}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              {/* Node Pod Container */}
              <div 
                className={`relative flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all duration-300 ${
                  isNodeActive
                    ? 'bg-[#090D17]/95 border shadow-lg scale-100'
                    : 'bg-[#090D17]/40 border-slate-800/40 opacity-35 scale-95'
                } ${
                  isHovered ? 'scale-108 z-40' : ''
                }`}
                style={{
                  borderColor: isNodeActive ? `${node.color}80` : 'rgba(255,255,255,0.06)',
                  boxShadow: isNodeActive ? `0 4px 22px ${node.color}30` : 'none',
                }}
              >
                {/* Node Status Dot & Icon */}
                <div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${node.color}22`,
                    border: `1px solid ${node.color}70`,
                    color: node.color,
                  }}
                >
                  <Icon size={12} strokeWidth={2.2} />
                </div>

                {/* Node Text & Data */}
                <div className="min-w-0 pr-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-tight text-white block truncate group-hover:text-primary transition-colors">
                      {node.title}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-400 block leading-tight truncate">
                    {node.sub}
                  </span>
                </div>

                {/* Pulsing Signal Dot */}
                <div 
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: node.color,
                    boxShadow: `0 0 6px ${node.color}`,
                  }}
                />
              </div>

              {/* Enhanced Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2.5 rounded-xl bg-[#090D17] border border-white/20 shadow-2xl z-50 pointer-events-none text-left"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[9px] font-mono font-bold">
                      <span style={{ color: node.color }}>STAGE {node.stage}</span>
                      <span className="text-emerald-400">TELEMETRY OK</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1 font-sans">
                      {node.desc}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <span>VERIFICATION:</span>
                      <span className="text-white font-bold">{node.metric}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* ── Bottom Step Flow Indicator ────────────────────────────── */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-slate-400 pointer-events-none">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>01 AUDIENCE INTEL</span>
            <ArrowRight size={10} className="text-slate-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>02 VERIFIED DATA</span>
            <ArrowRight size={10} className="text-slate-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-cta" />
            <span>03 FULL FUNNEL</span>
          </span>

          <span className="hidden sm:inline-block text-emerald-400 font-bold">
            CLOSED-LOOP TELEMETRY ENGINE
          </span>
        </div>

      </div>

    </div>
  )
}

export default GrowthEngineNetwork
