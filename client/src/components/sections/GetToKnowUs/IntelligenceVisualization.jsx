import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  Check, 
  Users, 
  Radio, 
  PhoneCall, 
  Database, 
  CalendarCheck, 
  Zap, 
  Lock, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * Stage 01 Display:
 * Dynamic Field of Market Data Points with Targeting Frame & 100% ICP Precision Lock
 */
const Stage01Display = () => {
  const prefersReducedMotion = useReducedMotion()

  // 24 Dynamic Company / Account Data Points across TAM coordinate grid
  const accounts = [
    { id: 1, x: 18, y: 22, isICP: false, name: 'General Market' },
    { id: 2, x: 38, y: 16, isICP: true, name: 'Fortune 500 FinTech', tag: 'ICP Tier-1' },
    { id: 3, x: 72, y: 24, isICP: false, name: 'SMB Retail' },
    { id: 4, x: 84, y: 18, isICP: true, name: 'Enterprise SaaS', tag: 'ICP Tier-1' },
    { id: 5, x: 26, y: 44, isICP: true, name: 'Cloud Infrastructure', tag: 'C-Suite Calibrated' },
    { id: 6, x: 48, y: 38, isICP: true, name: 'AI & Data Platforms', tag: 'TAM Bullseye' },
    { id: 7, x: 64, y: 46, isICP: true, name: 'HealthTech Enterprise', tag: 'Buying Committee' },
    { id: 8, x: 82, y: 52, isICP: false, name: 'Local Services' },
    { id: 9, x: 16, y: 68, isICP: false, name: 'Traditional Manufacturing' },
    { id: 10, x: 34, y: 72, isICP: true, name: 'Cybersecurity Corp', tag: 'ICP Tier-1' },
    { id: 11, x: 58, y: 68, isICP: true, name: 'Telecom Global', tag: 'Buying Committee' },
    { id: 12, x: 78, y: 76, isICP: false, name: 'Hospitality' },
    { id: 13, x: 44, y: 84, isICP: true, name: 'DevOps Platform', tag: 'High Surge Intent' },
    { id: 14, x: 68, y: 88, isICP: false, name: 'Consulting' },
    { id: 15, x: 52, y: 56, isICP: true, name: 'Target Account Core', tag: '100% ICP' },
  ]

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] flex flex-col justify-between p-5 sm:p-6 select-none overflow-hidden">
      
      {/* ── Background Coordinate Grid & Radar Rings ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00A6FF12_1px,transparent_1px),linear-gradient(to_bottom,#00A6FF12_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[320px] h-[320px] rounded-full border border-dashed border-primary/30" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-primary/40" />
          <div className="absolute w-[90px] h-[90px] rounded-full border border-[#00E5FF]/60" />
        </div>
      </div>

      {/* ── Top Console HUD Header ───────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
          <Target size={14} className="text-[#00E5FF]" />
          <span>TAM AUDIENCE MESH // ICP CALIBRATION</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LOCK: 100% PRECISION</span>
        </div>
      </div>

      {/* ── Dynamic 2D Data Field with Converging ICP Nodes ──────────── */}
      <div className="relative z-10 flex-1 my-3 relative min-h-[220px]">
        
        {/* Animated Central Targeting Frame Reticle */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.05, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 pointer-events-none"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00E5FF]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00E5FF]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00E5FF]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00E5FF]" />
        </motion.div>

        {/* Scattered Company Account Nodes */}
        {accounts.map((acc) => (
          <motion.div
            key={acc.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: acc.id * 0.03 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${acc.x}%`, top: `${acc.y}%` }}
          >
            {/* Account Node Dot */}
            <div 
              className={`rounded-full transition-all duration-300 ${
                acc.isICP 
                  ? 'w-3 h-3 bg-[#00E5FF] shadow-[0_0_12px_#00E5FF] ring-2 ring-primary/40 group-hover:scale-135' 
                  : 'w-2 h-2 bg-slate-600 opacity-40 group-hover:opacity-75'
              }`}
            />

            {/* Tooltip on ICP nodes */}
            {acc.isICP && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-30 pointer-events-none whitespace-nowrap px-2 py-1 rounded bg-slate-900 border border-primary/50 text-[9px] font-mono text-white shadow-xl">
                <span className="text-[#00E5FF] font-bold block">{acc.name}</span>
                <span className="text-slate-400 block">{acc.tag}</span>
              </div>
            )}
          </motion.div>
        ))}

        {/* Central Core Bullseye Readout */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-slate-900/90 border border-primary/60 shadow-xl backdrop-blur-md inline-block">
            <span className="text-[10px] font-mono font-black tracking-widest text-white uppercase block">
              TARGET AUDIENCE
            </span>
            <span className="text-[8.5px] font-mono font-bold text-[#00E5FF] uppercase block">
              100% ICP PRECISION
            </span>
          </div>
        </div>

      </div>

      {/* ── Bottom Telemetry Footer ──────────────────────────────────── */}
      <div className="relative z-10 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono">
        <div className="text-slate-400">
          TRANSFORMATION: <strong className="text-slate-200">BROAD MARKET (TAM) → IDENTIFIED ICP ACCOUNTS</strong>
        </div>
        <div className="text-[#00E5FF] font-bold">
          BUYING COMMITTEE CALIBRATED
        </div>
      </div>

    </div>
  )
}

/**
 * Stage 02 Display:
 * Multi-Pass Data Verification Scanner:
 * RAW RECORD → VERIFICATION → VALIDATED (99.8% ACCURACY)
 */
const Stage02Display = () => {
  const prefersReducedMotion = useReducedMotion()

  const records = [
    { title: 'Chief Technology Officer', company: 'Global Cloud Enterprise', phone: '+1 (415) •••-••••', status: 'Direct-Dial Validated', pass: 'PASS 1/3' },
    { title: 'VP of Enterprise Sales', company: 'SaaS Platform Series-D', phone: '+1 (650) •••-••••', status: 'Deliverability Confirmed', pass: 'PASS 2/3' },
    { title: 'Director of Demand Generation', company: 'FinTech Systems Corp', phone: '+1 (212) •••-••••', status: '0% Re-Sync Certified', pass: 'PASS 3/3' },
  ]

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] flex flex-col justify-between p-5 sm:p-6 select-none overflow-hidden">
      
      {/* ── Background Grid & Verification Beam ──────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10B98112_1px,transparent_1px),linear-gradient(to_bottom,#10B98112_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Moving Laser Scanning Beam */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ y: ['0%', '300%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60 z-20 pointer-events-none shadow-[0_0_15px_#10B981]"
        />
      )}

      {/* ── Top Console HUD Header ───────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
          <Database size={14} className="text-emerald-400" />
          <span>MULTI-PASS DIRECT-DIAL VERIFICATION</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ZERO RE-SYNC SLA</span>
        </div>
      </div>

      {/* ── Live Verified Record Rows ────────────────────────────────── */}
      <div className="relative z-10 flex-1 my-3 flex flex-col justify-center gap-2.5">
        
        {/* Verification Pipeline Step Tracker */}
        <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-mono pb-1">
          <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            01 RAW RECORD INFLOW
          </div>
          <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold">
            02 MULTI-PASS VERIFY
          </div>
          <div className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 font-bold">
            03 VALIDATED SLA
          </div>
        </div>

        {/* 3 Validated Contact Records */}
        {records.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 shadow-md backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white font-sans">{rec.title}</h5>
                <span className="text-[10px] text-slate-400 font-mono block">{rec.company}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-emerald-400 block">{rec.status}</span>
              <span className="text-[9px] font-mono text-slate-400 block">{rec.pass}</span>
            </div>
          </motion.div>
        ))}

      </div>

      {/* ── Bottom Telemetry Footer ──────────────────────────────────── */}
      <div className="relative z-10 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono">
        <div className="text-slate-400">
          DELIVERABILITY METRIC: <strong className="text-emerald-400">99.8% VERIFIED DIRECT DIALS</strong>
        </div>
        <div className="text-emerald-400 font-bold">
          0% RE-SYNDICATION GUARANTEED
        </div>
      </div>

    </div>
  )
}

/**
 * Stage 03 Display:
 * Upward Pipeline Velocity & Predictable Growth Trajectory
 */
const Stage03Display = () => {
  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] flex flex-col justify-between p-5 sm:p-6 select-none overflow-hidden">
      
      {/* ── Background Grid ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF6D0012_1px,transparent_1px),linear-gradient(to_bottom,#FF6D0012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* ── Top Console HUD Header ───────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
          <TrendingUp size={14} className="text-cta" />
          <span>FULL FUNNEL PIPELINE VELOCITY</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cta animate-pulse" />
          <span>CLOSED-LOOP REVENUE ENGINE</span>
        </div>
      </div>

      {/* ── Upward Pipeline Conversion Stages ────────────────────────── */}
      <div className="relative z-10 flex-1 my-3 flex flex-col justify-center gap-3">
        
        {/* Step Progression Stream */}
        <div className="space-y-2">
          {[
            { step: '01', title: 'INTENT SIGNALS', desc: 'Real-time surge trigger capture', pct: '100%', color: '#00A6FF' },
            { step: '02', title: 'TARGETED OUTREACH', desc: 'Omnichannel multi-touch cadence', pct: '94%', color: '#FFA600' },
            { step: '03', title: 'EXECUTIVE DISCOVERY', desc: 'Confirmed decision-maker meetings', pct: '88%', color: '#FF6D00' },
            { step: '04', title: 'QUALIFIED PIPELINE', desc: 'Sales-ready revenue opportunities', pct: 'GROWTH', color: '#10B981', highlight: true },
          ].map((funnel, i) => (
            <motion.div
              key={funnel.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                funnel.highlight
                  ? 'bg-cta/15 border-cta/60 shadow-[0_0_20px_rgba(255,109,0,0.2)]'
                  : 'bg-slate-900/80 border-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-black" style={{ color: funnel.color }}>
                  {funnel.step}
                </span>
                <div>
                  <h6 className="text-xs font-bold text-white leading-none">{funnel.title}</h6>
                  <span className="text-[9.5px] text-slate-400 font-mono mt-0.5 block">{funnel.desc}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-black" style={{ color: funnel.color }}>
                  {funnel.pct}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Bottom Telemetry Footer ──────────────────────────────────── */}
      <div className="relative z-10 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono">
        <div className="text-slate-400">
          REVENUE OUTCOME: <strong className="text-amber-400">PREDICTABLE PIPELINE SCALE</strong>
        </div>
        <div className="text-cta font-bold">
          APPOINTMENT SETTING ACTIVE
        </div>
      </div>

    </div>
  )
}

/**
 * IntelligenceVisualization
 * Centerpiece of the Growth Intelligence Console.
 * Smoothly switches between Stage 01, Stage 02, and Stage 03 visual surfaces.
 */
export const IntelligenceVisualization = ({ activeStage }) => {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl bg-[#070A12]/95 border border-slate-800/90 shadow-2xl overflow-hidden backdrop-blur-xl">
      <AnimatePresence mode="wait">
        {activeStage === '01' && (
          <motion.div
            key="stage-01"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <Stage01Display />
          </motion.div>
        )}

        {activeStage === '02' && (
          <motion.div
            key="stage-02"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <Stage02Display />
          </motion.div>
        )}

        {activeStage === '03' && (
          <motion.div
            key="stage-03"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <Stage03Display />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default IntelligenceVisualization
