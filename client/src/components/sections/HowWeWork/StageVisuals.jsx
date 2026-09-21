import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Search, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Mail, 
  MessageSquare, 
  ArrowUpRight, 
  Database,
  Activity,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react'

/**
 * RevenueProcessVisual
 * Large central visual console placed above the horizontal timeline.
 * Evolving enterprise B2B revenue intelligence system:
 * 01 DEFINE -> 02 IDENTIFY -> 03 ENGAGE -> 04 QUALIFY -> 05 CONVERT
 */
export const RevenueProcessVisual = ({ activeStage }) => {
  const stageMeta = [
    { name: 'DEFINE', badge: 'TAM & ICP STRATEGY', color: '#0066CC', glow: 'rgba(0,102,204,0.3)' },
    { name: 'IDENTIFY', badge: 'DECISION-MAKER INTELLIGENCE', color: '#00A6FF', glow: 'rgba(0,166,255,0.3)' },
    { name: 'ENGAGE', badge: 'MULTI-CHANNEL CADENCE', color: '#10B981', glow: 'rgba(16,185,129,0.3)' },
    { name: 'QUALIFY', badge: 'BANT & INTENT SCORING', color: '#FF6D00', glow: 'rgba(255,109,0,0.3)' },
    { name: 'CONVERT', badge: 'CLOSED-LOOP PIPELINE WON', color: '#00E5FF', glow: 'rgba(0,229,255,0.3)' }
  ]

  const currentMeta = stageMeta[activeStage] || stageMeta[0]

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl border border-border/80 dark:border-white/10 bg-surface/95 dark:bg-[#090D18]/95 p-4 sm:p-5 lg:p-6 shadow-xl backdrop-blur-2xl overflow-hidden min-h-[230px] sm:min-h-[250px] lg:min-h-[260px] flex flex-col justify-between">
      
      {/* ── Background Subtle Tech Atmosphere ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none -z-10 overflow-hidden">
        {/* Ambient Specular Glow shifting position/color */}
        <motion.div
          key={`glow-${activeStage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.7 }}
          className="absolute -top-20 left-1/3 w-[500px] h-[300px] rounded-full blur-[130px]"
          style={{ backgroundColor: currentMeta.glow }}
        />
        {/* Technical Coordinate Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 dark:border-white/8 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: currentMeta.color }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: currentMeta.color }} />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-text-primary uppercase flex items-center gap-2">
            <span>REVENUE ENGINE CONSOLE</span>
            <span className="px-2 py-0.5 rounded-sm bg-black/5 dark:bg-white/10 text-primary text-[10px]">
              PHASE 0{activeStage + 1}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface dark:bg-white/5 border border-border/70 dark:border-white/10 text-[10px] font-mono font-bold text-text-secondary">
          <Sparkles size={12} className="text-primary" />
          <span>{currentMeta.badge}</span>
        </div>
      </div>

      {/* Dynamic Content Graphic Area */}
      <div className="relative z-10 flex-1 flex items-center">
        <AnimatePresence mode="wait">
          
          {/* ── 01 DEFINE VISUAL ───────────────────────────────────────── */}
          {activeStage === 0 && (
            <motion.div
              key="vis-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">
                  ICP Parameter Mapping
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                  Define &amp; Align Strategy
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                  We audit your TAM, calibrate ideal customer attributes, and establish qualified revenue benchmarks to eliminate outbound guesswork.
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-semibold pt-0.5">
                  <ShieldCheck size={13} />
                  <span>100% Parameter Validation Locked</span>
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-2 gap-2">
                {[
                  { label: 'Target Sector', val: 'Enterprise Cloud & Cyber' },
                  { label: 'Annual Revenue', val: '$20M – $250M ARR' },
                  { label: 'Buying Committee', val: 'VP & C-Suite Titles' },
                  { label: 'Market Scope', val: 'North America & EMEA' }
                ].map((box, i) => (
                  <div key={i} className="p-2 sm:p-2.5 rounded-xl bg-surface/80 dark:bg-white/5 border border-border/70 dark:border-white/8 shadow-xs">
                    <span className="text-[9px] font-mono uppercase text-text-muted block">
                      {box.label}
                    </span>
                    <span className="text-xs font-bold text-text-primary truncate block">
                      {box.val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── 02 IDENTIFY VISUAL ─────────────────────────────────────── */}
          {activeStage === 1 && (
            <motion.div
              key="vis-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-[#00A6FF] tracking-widest uppercase">
                  Audience Intelligence
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                  Identify High-Fit Buyers
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We discover active buying committees and high-fit accounts using live intent data and direct-dial verified B2B intelligence.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#00A6FF] font-semibold pt-1">
                  <Database size={15} />
                  <span>24,500 Active Accounts Monitored</span>
                </div>
              </div>

              <div className="md:col-span-7 space-y-2.5">
                {[
                  { name: 'Apex Global Cloud Solutions', role: 'Chief Technology Officer', status: 'Direct Dial Verified', sync: '99.8%' },
                  { name: 'Vanguard Cyber Systems', role: 'VP Information Security', status: 'Active Decision-Maker', sync: '100%' },
                  { name: 'Nexura Enterprise Systems', role: 'Head of Infrastructure', status: 'Buying Committee Matched', sync: '99.4%' }
                ].map((account, i) => (
                  <div key={i} className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-surface/80 dark:bg-white/5 border border-border/70 dark:border-white/8 text-xs">
                    <div>
                      <span className="font-bold text-text-primary block">{account.name}</span>
                      <span className="text-[11px] text-text-muted">{account.role}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono font-bold text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 block">
                        {account.status}
                      </span>
                      <span className="text-[9px] font-mono text-text-muted">{account.sync} Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── 03 ENGAGE VISUAL ───────────────────────────────────────── */}
          {activeStage === 2 && (
            <motion.div
              key="vis-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-emerald-500 tracking-widest uppercase">
                  Multi-Touch Cadence
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                  Engage Decision-Makers
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We deploy hyper-personalized outbound sequences and targeted content syndication to capture active interest from executive buyers.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold pt-1">
                  <Activity size={15} />
                  <span>Deliverability Health: 99.6%</span>
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-surface/80 dark:bg-white/5 border border-border/70 dark:border-white/8 text-center">
                  <Mail size={22} className="mx-auto text-primary mb-2" />
                  <span className="text-[10px] font-mono uppercase text-text-muted block">Direct Email</span>
                  <span className="text-xl sm:text-2xl font-black text-text-primary">68.4%</span>
                  <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">Open Rate</span>
                </div>

                <div className="p-4 rounded-2xl bg-surface/80 dark:bg-white/5 border border-border/70 dark:border-white/8 text-center">
                  <MessageSquare size={22} className="mx-auto text-[#00A6FF] mb-2" />
                  <span className="text-[10px] font-mono uppercase text-text-muted block">Exec Touch</span>
                  <span className="text-xl sm:text-2xl font-black text-text-primary">34.2%</span>
                  <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">Reply Rate</span>
                </div>

                <div className="p-4 rounded-2xl bg-surface/80 dark:bg-white/5 border border-border/70 dark:border-white/8 text-center">
                  <Users size={22} className="mx-auto text-emerald-500 mb-2" />
                  <span className="text-[10px] font-mono uppercase text-text-muted block">Syndication</span>
                  <span className="text-xl sm:text-2xl font-black text-text-primary">12.8x</span>
                  <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">Reach Lift</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── 04 QUALIFY VISUAL ──────────────────────────────────────── */}
          {activeStage === 3 && (
            <motion.div
              key="vis-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-cta tracking-widest uppercase">
                  Rigorous Qualification
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                  Qualify Opportunity Intent
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We audit prospects against Budget, Authority, Need, and Timeline parameters. Only confirmed, sales-ready opportunities are passed forward.
                </p>
                <div className="flex items-center gap-2 text-xs text-cta font-semibold pt-1">
                  <TrendingUp size={15} />
                  <span>SLA: Zero Cold Contact Handover</span>
                </div>
              </div>

              <div className="md:col-span-7 space-y-2.5">
                {[
                  { label: 'FIT PARAMETER', pct: 94, bar: 'bg-primary' },
                  { label: 'BUYING INTENT SIGNAL', pct: 87, bar: 'bg-[#00A6FF]' },
                  { label: 'BUDGET CONFIRMATION', pct: 78, bar: 'bg-emerald-500' },
                  { label: 'AUTHORITY VERIFICATION', pct: 91, bar: 'bg-cta' }
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-surface/80 dark:bg-white/5 border border-border/70 dark:border-white/8">
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="font-bold text-text-muted">{item.label}</span>
                      <span className="font-extrabold text-text-primary">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        className={`h-full ${item.bar} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── 05 CONVERT VISUAL ──────────────────────────────────────── */}
          {activeStage === 4 && (
            <motion.div
              key="vis-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-widest uppercase">
                  Closed-Loop Pipeline
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                  Convert into Revenue
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We schedule qualified discovery appointments directly into your reps’ calendars, accelerating sales velocity and deal conversions.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold pt-1">
                  <ArrowUpRight size={15} />
                  <span>4.8x Pipeline Acceleration Multiplier</span>
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { step: '01', title: 'Target Account', desc: 'TAM Filtered' },
                  { step: '02', title: 'Qualified SQL', desc: 'BANT Confirmed' },
                  { step: '03', title: 'Discovery Call', desc: 'Meeting Set' },
                  { step: '04', title: 'Pipeline Won', desc: 'Predictable ARR' }
                ].map((step, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-surface/80 dark:bg-white/5 border border-border/70 dark:border-white/8 text-center relative">
                    <span className="text-[9px] font-mono text-primary font-bold block">{step.step}</span>
                    <span className="text-xs font-black text-text-primary block mt-0.5">{step.title}</span>
                    <span className="text-[10px] text-text-muted block mt-1">{step.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Console Bottom Status Row */}
      <div className="flex items-center justify-between border-t border-border/70 dark:border-white/8 pt-3 text-[11px] font-mono text-text-muted">
        <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
          <CheckCircle2 size={13} />
          <span>Continuous Revenue Optimization Active</span>
        </span>
        <span>Taraj Global Growth Framework</span>
      </div>

    </div>
  )
}

export default RevenueProcessVisual
