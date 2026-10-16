import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Cpu,
  Database,
  CheckCircle2,
  GitBranch,
  RefreshCw,
  Server,
  Zap,
  Activity,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const PrecisionPipeline = () => {
  return (
    <section
      id="precision"
      aria-labelledby="precision-heading"
      className="relative bg-[#070B14] py-14 sm:py-20 lg:py-24 border-y border-white/[0.08] overflow-hidden select-none"
    >
      {/* ── Ambient Background Lighting Spheres & Grid ───────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] rounded-full bg-[#00A6FF]/[0.06] blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[320px] rounded-full bg-[#FF6D00]/[0.05] blur-[140px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '44px 44px'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">

        {/* ── SECTION HEADER & LEAD EDITORIAL COPY ────────────────────────── */}
        <div className="max-w-4xl space-y-4 mb-12 sm:mb-16">
          
          {/* Clean Editorial Eyebrow (No capsule, global font) */}
          <div>
            <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              IN-HOUSE DATA INFRASTRUCTURE
            </p>
          </div>

          {/* Heading (H2) */}
          <h2
            id="precision-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-[-0.03em] leading-[1.14] text-white"
          >
            Engineered for Precision:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
              In-House Verification &amp; CRM Pipeline Delivery
            </span>
          </h2>

          {/* Body Text */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-normal pt-1 max-w-3xl">
            Unlike traditional lead agencies relying on third-party data aggregators, TaRaj Global operates on custom-built infrastructure. Following audience research, every prospect record passes through our proprietary verification engine—validating direct-dial phones and active email deliverability. The entire lifecycle, from target identification to final client handover, is managed inside a single, unified CRM platform for total pipeline transparency.
          </p>
        </div>

        {/* ── TWO DYNAMIC SUB-CARDS (THE PILLARS) ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          {/* ══ SUB-CARD 1: PROPRIETARY VERIFICATION INFRASTRUCTURE ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-xl hover:border-[#00A6FF]/40 transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_-10px_rgba(0,166,255,0.18)]"
          >
            {/* Top Hover Ambient Gradient Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#00A6FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative space-y-5">
              
              {/* Category Pill & Tech Icon */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] bg-[#00A6FF]/10 border border-[#00A6FF]/20 px-3 py-1 rounded-full">
                  Proprietary Verification Infrastructure
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#00A6FF]/10 border border-[#00A6FF]/30 flex items-center justify-center text-[#00A6FF]">
                  <Cpu size={20} />
                </div>
              </div>

              {/* Title (H3) */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors">
                Multi-Pass Verification Technology
              </h3>

              {/* Body Description */}
              <p className="text-sm leading-relaxed text-slate-300 font-normal">
                Our post-research verification tool sanitizes contact records, checks email deliverability in real time, and validates direct-dial numbers to guarantee a 99.8% data accuracy SLA.
              </p>

              {/* Live Multi-Pass Verification Telemetry Graphic */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#040711] p-4 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Activity size={13} className="text-[#00A6FF]" />
                    <span>Real-Time Sanitization Pipeline</span>
                  </div>
                  <span className="text-emerald-400 font-bold">99.8% SLA Active</span>
                </div>

                {/* Pass 1 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] text-xs">
                  <span className="text-slate-300 font-medium">Pass 01: SMTP Handshake &amp; MX Domain Health</span>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Deliverable
                  </span>
                </div>

                {/* Pass 2 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] text-xs">
                  <span className="text-slate-300 font-medium">Pass 02: Direct-Dial Carrier Connectivity Ping</span>
                  <span className="font-mono text-[10px] text-[#38BDF8] bg-[#00A6FF]/10 border border-[#00A6FF]/20 px-2 py-0.5 rounded">
                    Live Verified
                  </span>
                </div>

                {/* Pass 3 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] text-xs">
                  <span className="text-slate-300 font-medium">Pass 03: Cross-Account Zero-Duplicate Scrub</span>
                  <span className="font-mono text-[10px] text-[#FF6D00] bg-[#FF6D00]/10 border border-[#FF6D00]/20 px-2 py-0.5 rounded">
                    Enforced
                  </span>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Capabilities
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#00A6FF] shrink-0 mt-0.5" />
                    <span>In-house automated email &amp; phone verification engine</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#00A6FF] shrink-0 mt-0.5" />
                    <span>Live buyer intent signal tracking and domain health checks</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#00A6FF] shrink-0 mt-0.5" />
                    <span>Zero-duplicate contact enforcement prior to outreach</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Status Signal */}
            <div className="relative pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck size={14} className="text-[#00A6FF]" />
                Zero-Bounce Guarantee
              </span>
              <span className="text-[#00A6FF]">Proprietary Engine</span>
            </div>
          </motion.div>

          {/* ══ SUB-CARD 2: UNIFIED CRM PIPELINE LIFECYCLE ═════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-xl hover:border-[#FF6D00]/40 transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_-10px_rgba(255,109,0,0.18)]"
          >
            {/* Top Hover Ambient Gradient Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FF6D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative space-y-5">
              
              {/* Category Pill & Tech Icon */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#FB923C] bg-[#FF6D00]/10 border border-[#FF6D00]/20 px-3 py-1 rounded-full">
                  Unified CRM Pipeline Lifecycle
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#FF6D00]/10 border border-[#FF6D00]/30 flex items-center justify-center text-[#FF6D00]">
                  <Database size={20} />
                </div>
              </div>

              {/* Title (H3) */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors">
                Closed-Loop CRM Delivery System
              </h3>

              {/* Body Description */}
              <p className="text-sm leading-relaxed text-slate-300 font-normal">
                From cold prospect research to confirmed executive discovery calls, campaign operations flow seamlessly inside one integrated CRM engine—delivering verified leads directly into your tech stack.
              </p>

              {/* Live Closed-Loop CRM Delivery Lifecycle Graphic */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#040711] p-4 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <GitBranch size={13} className="text-[#FF6D00]" />
                    <span>Closed-Loop Telemetry Routing</span>
                  </div>
                  <span className="text-[#FB923C] font-bold">Bi-Directional Sync</span>
                </div>

                {/* Delivery Flow Stage */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="block text-[10px] font-mono text-slate-400">Step 01</span>
                    <span className="font-bold text-white text-[11px]">ICP Research</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/20">
                    <span className="block text-[10px] font-mono text-[#FB923C]">Step 02</span>
                    <span className="font-bold text-white text-[11px]">BANT Score</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="block text-[10px] font-mono text-emerald-400">Step 03</span>
                    <span className="font-bold text-white text-[11px]">CRM Ingest</span>
                  </div>
                </div>

                {/* Native Integration Stack Pills */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 text-[11px] font-mono text-slate-300">
                  <span className="text-[10px] text-slate-400">Supported Connectors:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white">Salesforce</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white">HubSpot</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[#38BDF8]">Custom API</span>
                  </div>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Capabilities
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#FF6D00] shrink-0 mt-0.5" />
                    <span>Real-time campaign telemetry &amp; pipeline velocity dashboards</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#FF6D00] shrink-0 mt-0.5" />
                    <span>BANT &amp; HQL qualification scoring mapped to account records</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#FF6D00] shrink-0 mt-0.5" />
                    <span>Native bi-directional synchronization (Salesforce, HubSpot, APIs)</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Status Signal */}
            <div className="relative pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <RefreshCw size={13} className="text-[#FF6D00]" />
                Live Native Handover
              </span>
              <span className="text-[#FF6D00]">Unified Ecosystem</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default PrecisionPipeline
