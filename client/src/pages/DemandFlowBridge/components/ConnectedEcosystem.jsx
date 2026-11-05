import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Users,
  Target,
  TrendingUp,
  Briefcase,
  UserCheck,
  CreditCard,
  Cog,
  BarChart3,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowUpRight,
} from 'lucide-react'

// ─── 8 CONNECTED OPERATIONS MODULES (EXACT CONTENT PRESERVED) ───────────────
const modules = [
  {
    id: 'crm',
    name: 'CRM',
    subtitle: 'Accounts & Contacts',
    description:
      'Unified account data, buying committee stakeholders & touchpoint history.',
    color: '#00A6FF',
    icon: Users,
  },
  {
    id: 'leads',
    name: 'Lead Management',
    subtitle: 'Intake & Validation',
    description:
      'Automated ICP scoring, lead verification, and routing workflows.',
    color: '#00D2FF',
    icon: Target,
  },
  {
    id: 'sales',
    name: 'Sales',
    subtitle: 'Pipelines & Opportunities',
    description:
      'Active deal stages, outreach sequence pacing, and conversion forecasts.',
    color: '#FF6D00',
    icon: TrendingUp,
  },
  {
    id: 'clients',
    name: 'Client Management',
    subtitle: 'Workspaces & SLAs',
    description:
      'Account health monitoring, milestone tracking, and deliverable handoffs.',
    color: '#72D669',
    icon: Briefcase,
  },
  {
    id: 'hrms',
    name: 'HRMS',
    subtitle: 'Teams & Org Structure',
    description:
      'Internal workforce directory, team hierarchies, and operational roles.',
    color: '#9333EA',
    icon: UserCheck,
  },
  {
    id: 'payroll',
    name: 'Payroll',
    subtitle: 'Compensation & Cycles',
    description:
      'Structured payroll cycles, incentive reconciliations, and compliance.',
    color: '#EAB308',
    icon: CreditCard,
  },
  {
    id: 'operations',
    name: 'Operations',
    subtitle: 'Workflow Orchestration',
    description:
      'Cross-functional delivery capacity, campaign scheduling, and execution.',
    color: '#3B82F6',
    icon: Cog,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    subtitle: 'Telemetry & Reporting',
    description:
      'Real-time telemetry, executive reporting, and cross-module visibility.',
    color: '#10B981',
    icon: BarChart3,
  },
]

export default function ConnectedEcosystem() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const reduceMotion = useReducedMotion()

  // Auto-progression: opens cards one-by-one with fade in/out every 3.6s
  useEffect(() => {
    if (reduceMotion || !isPlaying || isHovered) return

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % modules.length)
    }, 3600)

    return () => clearInterval(timer)
  }, [reduceMotion, isPlaying, isHovered])

  const activeModule = modules[activeIdx] || modules[0]
  const ActiveIcon = activeModule.icon

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? modules.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % modules.length)
  }

  return (
    <section
      id="ecosystem"
      className="relative w-full py-8 sm:py-10 lg:py-12 bg-[#040711] text-text-primary font-sans overflow-hidden border-t border-b border-border/40 select-none"
      aria-label="Connected Business Ecosystem"
    >
      {/* ─── BACKGROUND AMBIENCE (MATCHING WHATISPLATFORM STYLE) ───────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft Blue Ambient Aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${activeModule.color}15 0%, rgba(0,166,255,0.08) 40%, transparent 70%)`,
            transition: 'background 0.8s ease',
          }}
        />

        {/* Micro Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── 1. SECTION INTRO (EXACT CONTENT PRESERVED) ──────────────────── */}
        <div className="mb-4 sm:mb-5 text-center max-w-3xl mx-auto">
          <div className="mb-1.5">
            <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.16em] uppercase text-primary">
              Meet Your Connected Ecosystem
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-heading font-extrabold tracking-tight leading-tight text-white mb-1.5">
            All your operations.{' '}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #00A6FF 0%, #67E8F9 100%)',
              }}
            >
              One powerful connection.
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] font-sans text-slate-300 leading-relaxed max-w-xl mx-auto font-normal">
            Eight essential business operations, connected through one intelligent ecosystem.
          </p>
        </div>

        {/* ─── 2. DEMANDFLOW BRIDGE CENTRAL HUB BANNER ───────────────────────── */}
        <div className="relative mx-auto mb-3 max-w-[420px]">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-[#0C1322]/90 via-[#0A0F1D]/85 to-[#070B16]/90 px-4 py-2.5 text-center backdrop-blur-xl shadow-[0_4px_20px_rgba(0,166,255,0.12)]">
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <div className="w-5 h-5 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                <Cpu className="w-3 h-3 animate-pulse" />
              </div>
              <h3 className="text-sm sm:text-base font-heading font-bold text-white tracking-tight">
                DemandFlow{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#67E8F9]">
                  Bridge
                </span>
              </h3>
            </div>
            <p className="text-[11px] font-sans text-text-secondary">
              One connected ecosystem. Every department working together.
            </p>
          </div>

          {/* Vertical Bus Feed Line connecting to Main Highway */}
          <div className="mx-auto h-3 w-[2px] bg-gradient-to-b from-primary/80 to-primary/30" />
        </div>

        {/* ─── 3. THE BUS TOPOLOGY HIGHWAY & 8 NODES ───────────────────────── */}
        <div
          className="relative w-full max-w-[1140px] mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Bus Highway Line (SVG with animated electrical pulses) */}
          <div className="relative w-full h-8 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 1000 32"
            >
              <defs>
                <linearGradient id="busGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#00A6FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Underlying bus guide line */}
              <line
                x1="20"
                y1="16"
                x2="980"
                y2="16"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2"
                strokeDasharray="4 6"
              />

              {/* Illuminated data highway beam */}
              <line
                x1="20"
                y1="16"
                x2="980"
                y2="16"
                stroke="url(#busGrad)"
                strokeWidth="2"
              />

              {/* Animated data pulses moving continuously along the bus line */}
              {!reduceMotion && (
                <>
                  <motion.circle
                    r="3.5"
                    cy="16"
                    fill="#00A6FF"
                    animate={{ cx: [20, 980] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                    style={{ filter: 'drop-shadow(0 0 6px #00A6FF)' }}
                  />
                  <motion.circle
                    r="3"
                    cy="16"
                    fill="#FF6D00"
                    animate={{ cx: [980, 20] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', delay: 1 }}
                    style={{ filter: 'drop-shadow(0 0 6px #FF6D00)' }}
                  />
                </>
              )}
            </svg>
          </div>

          {/* 8 Bus Topology Nodes */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2 mb-3">
            {modules.map((item, idx) => {
              const Icon = item.icon
              const isSelected = activeIdx === idx

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative flex flex-col items-center p-2 rounded-xl border transition-all duration-300 cursor-pointer text-center ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#0F1C36] to-[#0A1324] scale-105 shadow-[0_4px_20px_rgba(0,166,255,0.25)]'
                      : 'bg-[#0B1220]/80 border-white/[0.08] hover:border-primary/40 hover:bg-[#0E172A]'
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : undefined,
                  }}
                >
                  {/* Vertical tap line connecting node to bus */}
                  <div
                    className="absolute -top-3 w-[1.5px] h-3 transition-colors"
                    style={{
                      background: isSelected ? item.color : 'rgba(255,255,255,0.15)',
                    }}
                  />

                  {/* Node Icon Dock */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 mb-1"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                      border: `1px solid ${item.color}${isSelected ? '80' : '30'}`,
                      boxShadow: isSelected ? `0 0 12px ${item.color}50` : 'none',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Node Short Name */}
                  <span
                    className={`text-[11px] font-heading font-semibold tracking-tight transition-colors truncate w-full ${
                      isSelected ? 'text-white' : 'text-text-secondary group-hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Active Indicator Pip */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeBusPip"
                      className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                      style={{ background: item.color }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ─── 4. ACTIVE CARD STAGE (OPENS DIRECTLY FROM THE BUS LINE) ──────── */}
          <div className="relative w-full max-w-3xl mx-auto min-h-[175px]">
            {/* Dynamic Branch Line feeding down from the bus to the active card */}
            <div className="mx-auto w-[2px] h-3 bg-gradient-to-b from-primary to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#0C1322]/95 via-[#0A0F1D]/90 to-[#070B16]/95 border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden"
                style={{
                  borderColor: `${activeModule.color}45`,
                  boxShadow: `0 8px 32px ${activeModule.color}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
                }}
              >
                {/* Subtle Ambient Color Wash */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-[0.12] blur-3xl"
                  style={{ background: activeModule.color }}
                />

                {/* Left Edge Accent Bar */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r"
                  style={{
                    background: activeModule.color,
                    boxShadow: `0 0 10px ${activeModule.color}`,
                  }}
                />

                {/* Card Top Row: Icon Dock + Module Title + Subtitle + Bridge Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5 pl-2">
                  <div className="flex items-center gap-2.5">
                    {/* Glowing Icon Dock */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                      style={{
                        backgroundColor: `${activeModule.color}22`,
                        color: activeModule.color,
                        border: `1.5px solid ${activeModule.color}60`,
                        boxShadow: `0 0 14px ${activeModule.color}40`,
                      }}
                    >
                      <ActiveIcon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-heading font-bold text-white tracking-tight">
                          {activeModule.name}
                        </h4>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold tracking-wider"
                          style={{
                            backgroundColor: `${activeModule.color}18`,
                            color: activeModule.color,
                            border: `1px solid ${activeModule.color}40`,
                          }}
                        >
                          {activeModule.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ecosystem Connection Tag */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      color: activeModule.color,
                      background: `${activeModule.color}12`,
                      border: `1px solid ${activeModule.color}30`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-ping"
                      style={{ background: activeModule.color }}
                    />
                    Part of DemandFlow Bridge
                  </div>
                </div>

                {/* Card Body: Description (Exact user content) */}
                <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed pl-2 mb-3">
                  {activeModule.description}
                </p>

                {/* Card Footer: Interactive Stepper & Controls */}
                <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.08] pl-2 text-xs font-mono">
                  
                  {/* Prev / Next controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      title="Previous Module"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      title="Next Module"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-white/60 hover:text-white border border-white/10 transition-colors cursor-pointer ml-1"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-2.5 h-2.5 text-primary" />
                          <span>Auto</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-2.5 h-2.5 text-cta" />
                          <span>Paused</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 8 Node Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {modules.map((m, mIdx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveIdx(mIdx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          mIdx === activeIdx
                            ? 'w-5 h-1.5'
                            : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                        style={{
                          backgroundColor: mIdx === activeIdx ? activeModule.color : undefined,
                        }}
                        title={m.name}
                      />
                    ))}
                  </div>

                  {/* Step counter */}
                  <span className="text-[10px] text-text-secondary font-mono">
                    Module 0{activeIdx + 1} / 0{modules.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
