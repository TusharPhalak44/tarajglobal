import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Eye,
  MousePointerClick,
  DownloadCloud,
  Activity,
  CheckCircle2,
  FileText,
  User,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const DEMO_ACTIVITIES = [
  { id: 1, name: 'John Smith', role: 'IT Director', company: 'GlobalLogistics', action: 'Email Opened', time: '10:24 AM', icon: Eye, color: 'text-primary' },
  { id: 2, name: 'Sarah Lee', role: 'VP Infrastructure', company: 'Apex Cloud', action: 'CTA Clicked', time: '10:27 AM', icon: MousePointerClick, color: 'text-cta' },
  { id: 3, name: 'Michael Ross', role: 'VP Cloud Engineering', company: 'NexaScale Systems', action: 'Whitepaper Downloaded', time: '10:29 AM', icon: DownloadCloud, color: 'text-emerald-400' },
  { id: 4, name: 'Priya Shah', role: 'Chief Architect', company: 'FinCore Labs', action: 'Content Viewed', time: '10:32 AM', icon: FileText, color: 'text-primary' },
]

export default function EngagementStage({ isActive, isCompleted, onSelect }) {
  const [subStep, setSubStep] = useState(0)

  // Cycle through recipient events during active stage
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSubStep((prev) => (prev + 1) % 4)
      }, 1200)
      return () => clearInterval(interval)
    } else if (isCompleted) {
      setSubStep(3)
    } else {
      setSubStep(0)
    }
  }, [isActive, isCompleted])

  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-3xl p-6 sm:p-8 border backdrop-blur-2xl select-none ${
        isActive
          ? 'bg-surface/95 border-primary shadow-[0_0_40px_rgba(0,166,255,0.3)] ring-1 ring-primary/40 -translate-y-1'
          : isCompleted
          ? 'bg-surface/80 border-primary/40 hover:border-primary/70'
          : 'bg-surface/50 border-border/80 hover:border-border hover:bg-surface/70'
      }`}
    >
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-colors ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : isCompleted
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-surface-alt border border-border text-text-muted'
            }`}
          >
            {isCompleted ? '✓' : '06'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
                STAGE 06 // CENTRAL OPERATIONAL HUB
              </span>
              <span
                className={`font-mono text-[9.5px] px-2.5 py-0.5 rounded-full border transition-all ${
                  isActive
                    ? 'bg-primary/15 text-primary border-primary/40 animate-pulse font-bold'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-surface-alt text-text-muted border-border'
                }`}
              >
                {isActive ? 'TELEMETRY STREAMING' : isCompleted ? 'HIGH INTENT CONFIRMED' : 'STANDBY'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mt-0.5 flex items-center gap-2">
              Real-Time Engagement Tracking
              <Activity className={`w-5 h-5 text-primary ${isActive ? 'animate-pulse' : ''}`} />
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary max-w-md">
          Every meaningful recipient interaction is tracked to identify genuine content engagement and verified buyer intent.
        </p>
      </div>

      {/* Main Row 2 Body: Left = Recipient Intent Journey, Right = Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Interactive 4-Step Recipient Journey (Col 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-background/80 border border-border/70 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-border/50 text-[11px] font-mono">
            <span className="text-text-muted flex items-center gap-1.5 font-semibold">
              <User className="w-3.5 h-3.5 text-primary" />
              TARGET PROSPECT JOURNEY: MICHAEL ROSS (VP CLOUD)
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              INTENT SCORE: {isActive ? '96/100' : isCompleted ? '100/100' : 'AWAITING'}
            </span>
          </div>

          {/* 4 Sequential Events Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            {[
              { idx: 0, label: 'Email Delivered', icon: Mail, desc: 'Primary Inbox 09:00 AM' },
              { idx: 1, label: 'Email Opened', icon: Eye, desc: 'Dwell Time 2m 14s' },
              { idx: 2, label: 'CTA Clicked', icon: MousePointerClick, desc: 'Whitepaper Hook' },
              { idx: 3, label: 'Asset Downloaded', icon: DownloadCloud, desc: 'Direct Opt-In Lead' },
            ].map((ev) => {
              const EvIcon = ev.icon
              const isEvDone = isCompleted || (isActive && subStep >= ev.idx)
              const isEvCurrent = isActive && subStep === ev.idx

              return (
                <div
                  key={ev.label}
                  className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isEvCurrent
                      ? 'bg-primary/15 border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                      : isEvDone
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-text-primary'
                      : 'bg-surface-alt/50 border-border/60 text-text-muted opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isEvCurrent
                          ? 'bg-primary text-white'
                          : isEvDone
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-surface border border-border text-text-muted'
                      }`}
                    >
                      <EvIcon className="w-3.5 h-3.5" />
                    </div>
                    {isEvDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-text-primary">{ev.label}</div>
                    <div className="text-[9px] font-mono text-text-muted mt-0.5">{ev.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Asset Download Transfer Graphic */}
          <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-text-primary font-medium">Enterprise Cloud Migration Whitepaper.pdf</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.div
                animate={{ x: isActive ? [0, 6, 0] : 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 text-cta" />
              </motion.div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-[10px]">
                Asset Downloaded ✓
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Live Activity Feed (Col 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-background/80 border border-border/70 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-border/50 text-[11px] font-mono">
            <span className="text-text-muted flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              LIVE TELEMETRY STREAM
            </span>
            <span className="text-text-secondary">UTC LOGGING</span>
          </div>

          <div className="space-y-2 py-2">
            {DEMO_ACTIVITIES.map((item, idx) => {
              const ItemIcon = item.icon
              const isHighlight = isActive && subStep === idx

              return (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all duration-300 ${
                    isHighlight
                      ? 'bg-primary/10 border-primary/60 shadow-sm ring-1 ring-primary/30'
                      : 'bg-surface/60 border-border/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                      <ItemIcon className={`w-3 h-3 ${item.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-text-primary text-xs truncate">
                        {item.name}{' '}
                        <span className="text-[10px] text-text-muted font-normal">({item.company})</span>
                      </div>
                      <div className="text-[10px] font-mono text-text-secondary truncate">
                        {item.action}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-text-muted shrink-0 pl-2">
                    {item.time}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-text-muted">
            <span>Intent Engine</span>
            <span className="text-primary font-bold">Passing to Lead Capture Stage ↓</span>
          </div>
        </div>

      </div>
    </div>
  )
}
