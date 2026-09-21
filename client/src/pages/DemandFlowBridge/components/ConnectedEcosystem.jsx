import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const ECOSYSTEM_NODES = [
  {
    id: 'crm',
    title: 'CRM',
    short: 'Accounts & Contacts',
    angle: 0, // Right (0 deg)
    icon: Users,
    color: '#00A6FF',
    desc: 'Unified account data, buying committee stakeholders & touchpoint history.',
  },
  {
    id: 'lead-mgmt',
    title: 'Lead Management',
    short: 'Intake & Validation',
    angle: 45, // Bottom-Right
    icon: Target,
    color: '#00D2FF',
    desc: 'Automated ICP scoring, lead verification, and routing workflows.',
  },
  {
    id: 'sales',
    title: 'Sales',
    short: 'Pipelines & Opportunities',
    angle: 90, // Bottom (90 deg)
    icon: TrendingUp,
    color: '#FF6D00',
    desc: 'Active deal stages, outreach sequence pacing, and conversion forecasts.',
  },
  {
    id: 'client-mgmt',
    title: 'Client Management',
    short: 'Workspaces & SLAs',
    angle: 135, // Bottom-Left
    icon: Briefcase,
    color: '#72D669',
    desc: 'Account health monitoring, milestone tracking, and deliverable handoffs.',
  },
  {
    id: 'hrms',
    title: 'HRMS',
    short: 'Teams & Org Structure',
    angle: 180, // Left (180 deg)
    icon: UserCheck,
    color: '#9333EA',
    desc: 'Internal workforce directory, team hierarchies, and operational roles.',
  },
  {
    id: 'payroll',
    title: 'Payroll',
    short: 'Compensation & Cycles',
    angle: 225, // Top-Left
    icon: CreditCard,
    color: '#EAB308',
    desc: 'Structured payroll cycles, incentive reconciliations, and compliance.',
  },
  {
    id: 'operations',
    title: 'Operations',
    short: 'Workflow Orchestration',
    angle: 270, // Top (270 deg)
    icon: Cog,
    color: '#3B82F6',
    desc: 'Cross-functional delivery capacity, campaign scheduling, and execution.',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    short: 'Telemetry & Reporting',
    angle: 315, // Top-Right
    icon: BarChart3,
    color: '#10B981',
    desc: 'Real-time telemetry, executive reporting, and cross-module visibility.',
  },
]

const ConnectedEcosystem = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeNodeId, setActiveNodeId] = useState('crm')

  const activeNode = ECOSYSTEM_NODES.find((n) => n.id === activeNodeId) || ECOSYSTEM_NODES[0]

  // Radial geometry calculation for 8 nodes around center (radius 260px in 700x700 viewBox)
  const CX = 350
  const CY = 350
  const RADIUS = 230

  return (
    <section
      id="ecosystem"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
      aria-label="Connected Business Ecosystem"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-15"
          style={{ background: 'radial-gradient(circle, #00A6FF 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-3.5 backdrop-blur-md"
          >
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Interactive Topology
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-4"
          >
            Connected{' '}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              Business Ecosystem
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Every department feeds into and draws from DemandFlow Bridge in real time. Hover or click any module to inspect how data circulates through the central operational core.
          </motion.p>
        </div>

        {/* ── DESKTOP & TABLET: RADIAL INTERACTIVE TOPOLOGY GRAPH (>=1024px) ── */}
        <div className="hidden lg:block relative max-w-[850px] mx-auto min-h-[720px]">
          
          {/* SVG Animated Connector Rays */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 700 700"
            fill="none"
          >
            <defs>
              {/* Concentric ambient grid circles */}
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00A6FF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Orbit Rings */}
            <circle cx={CX} cy={CY} r="140" stroke="currentColor" className="text-border/60" strokeDasharray="4 6" />
            <circle cx={CX} cy={CY} r="230" stroke="currentColor" className="text-border/40" strokeDasharray="2 4" />
            <circle cx={CX} cy={CY} r="180" fill="url(#hubGlow)" />

            {/* Connection Lines from Center Hub to each Module */}
            {ECOSYSTEM_NODES.map((node) => {
              const rad = (node.angle * Math.PI) / 180
              const nx = CX + RADIUS * Math.cos(rad)
              const ny = CY + RADIUS * Math.sin(rad)
              const isActive = activeNodeId === node.id

              return (
                <g key={`line-${node.id}`}>
                  {/* Base Connection Beam */}
                  <line
                    x1={CX}
                    y1={CY}
                    x2={nx}
                    y2={ny}
                    stroke={isActive ? node.color : 'currentColor'}
                    strokeWidth={isActive ? 2.5 : 1}
                    className={isActive ? '' : 'text-border'}
                    strokeOpacity={isActive ? 0.9 : 0.4}
                  />

                  {/* Traveling Data Photon Dot */}
                  {!prefersReducedMotion && (
                    <circle r={isActive ? 4 : 2.5} fill={node.color}>
                      <animateMotion
                        path={`M ${CX} ${CY} L ${nx} ${ny}`}
                        dur={isActive ? '1.4s' : '2.8s'}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Central Hub Node */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-44 h-44 rounded-full border-2 border-primary/60 bg-slate-900 text-white shadow-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 select-none group"
            style={{
              boxShadow: '0 0 45px rgba(0,166,255,0.3)',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary mb-1.5 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#00A6FF] uppercase font-bold">
              Core Engine
            </span>
            <span className="text-sm font-black tracking-tight text-white mt-0.5">
              DemandFlow Bridge™
            </span>
            <span className="text-[9.5px] font-mono text-slate-400 mt-1">
              Real-Time Synchronization
            </span>
          </div>

          {/* 8 Satellite Nodes positioned around perimeter */}
          {ECOSYSTEM_NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180
            // Map 0-700 SVG coordinates to percentage offsets
            const leftPct = ((CX + RADIUS * Math.cos(rad)) / 700) * 100
            const topPct = ((CY + RADIUS * Math.sin(rad)) / 700) * 100
            const isActive = activeNodeId === node.id
            const Icon = node.icon

            return (
              <div
                key={node.id}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20"
              >
                <button
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`
                    group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer shadow-md
                    ${
                      isActive
                        ? 'bg-surface border-primary shadow-lg shadow-primary/20 scale-105 z-30 ring-2 ring-primary/40'
                        : 'bg-surface/90 border-border hover:border-primary/50 hover:scale-102'
                    }
                  `}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${node.color}20`,
                      color: node.color,
                      border: `1px solid ${node.color}40`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-text-primary tracking-tight">
                      {node.title}
                    </div>
                    <div className="text-[10px] font-mono text-text-secondary">
                      {node.short}
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {/* ── MOBILE & TABLET TOPOLOGY VIEW (<1024px) ── */}
        <div className="block lg:hidden">
          {/* Central Highlight Badge */}
          <div className="p-4 rounded-2xl border border-primary/40 bg-slate-900 text-white mb-6 text-center shadow-lg">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase font-bold mb-1">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>Central Technology Hub</span>
            </div>
            <h3 className="text-xl font-black">DemandFlow Bridge™</h3>
            <p className="text-xs text-slate-300 mt-1">
              Connected to 8 operational business modules in one synchronized environment
            </p>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ECOSYSTEM_NODES.map((node) => {
              const Icon = node.icon
              const isActive = activeNodeId === node.id

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`
                    p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3
                    ${
                      isActive
                        ? 'border-primary bg-surface shadow-md ring-1 ring-primary'
                        : 'border-border bg-surface/70 hover:border-primary/40'
                    }
                  `}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${node.color}20`,
                      color: node.color,
                      border: `1px solid ${node.color}40`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary">{node.title}</div>
                    <div className="text-xs text-text-secondary mt-0.5">{node.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Node Detail Inspector Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-border bg-surface shadow-md max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${activeNode.color}20`,
                color: activeNode.color,
                border: `1px solid ${activeNode.color}40`,
              }}
            >
              <activeNode.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-text-primary">{activeNode.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-background border border-border text-text-secondary">
                  CONNECTED LIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                {activeNode.desc}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Integrated Layer</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ConnectedEcosystem
