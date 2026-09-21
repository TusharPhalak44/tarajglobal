import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingGear, ConveyorTrack, MechanicalGauge } from './MechanicalParts'
import {
  Rocket,
  FileText,
  CheckCircle2,
  Database,
  Send,
  Activity,
  UserCheck,
  ShieldCheck,
  Award,
  Share2,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Clock,
  Eye,
  MousePointerClick,
  DownloadCloud,
  Sliders,
  Filter,
} from 'lucide-react'

export default function MechanicalStationChamber({ stepIndex, isEngineRunning }) {
  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-surface/95 to-surface-alt/80 border border-border/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[360px] flex flex-col justify-between">
      
      {/* Background Machinery Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Rotating Mechanical Gears in Corners */}
      <div className="absolute -top-6 -right-6 pointer-events-none opacity-25 dark:opacity-30">
        <RotatingGear size={90} teeth={16} speed={isEngineRunning ? 6 : 20} color="#00A6FF" />
      </div>
      <div className="absolute top-12 right-12 pointer-events-none opacity-20 dark:opacity-25">
        <RotatingGear size={50} teeth={10} speed={isEngineRunning ? 3.5 : 12} direction="counter-clockwise" color="#FF6D00" />
      </div>

      {/* Top Station Machinery Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center text-primary font-mono text-base font-bold shadow-inner">
            M-{String(stepIndex + 1).padStart(2, '0')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-wider">
                MECHANICAL APPARATUS UNIT #{stepIndex + 1}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase">
                {isEngineRunning ? 'GEARS ENGAGED' : 'MANUAL HOLD'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
              {STATION_DATA[stepIndex].stationName}
            </h3>
          </div>
        </div>

        {/* Station Diagnostic Meters */}
        <div className="flex items-center gap-4">
          <MechanicalGauge
            value={STATION_DATA[stepIndex].gaugeValue}
            label={STATION_DATA[stepIndex].gaugeLabel}
            color={STATION_DATA[stepIndex].accentColor}
          />
        </div>
      </div>

      {/* Central Interactive Mechanism Stage */}
      <div className="py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            {renderStationMechanism(stepIndex, isEngineRunning)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Conveyor Track & Mechanical Action Plain-English Bar */}
      <div className="space-y-3 pt-4 border-t border-border/60 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>MECHANICAL ACTION:</span>
            <strong className="text-text-primary">{STATION_DATA[stepIndex].actionText}</strong>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-bold">
            <span>BUSINESS OUTCOME:</span>
            <span className="text-text-primary font-normal">{STATION_DATA[stepIndex].outcomeText}</span>
          </div>
        </div>

        {/* Industrial Conveyor Belt */}
        <ConveyorTrack isActive={isEngineRunning} />
      </div>

    </div>
  )
}

function renderStationMechanism(idx, isEngineRunning) {
  switch (idx) {
    case 0: // Campaign Launch
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Hopper Intake Lever Graphic */}
            <div className="relative w-36 h-28 border-2 border-primary/50 rounded-lg p-3 bg-surface/90 flex flex-col justify-between shadow-lg">
              <div className="flex justify-between items-center text-[10px] font-mono text-text-muted">
                <span>INTAKE_HOPPER</span>
                <span className="text-primary font-bold">VALVE OPEN</span>
              </div>
              <motion.div
                className="w-full h-8 rounded bg-primary/20 border border-primary/50 flex items-center justify-center text-xs font-mono font-bold text-primary"
                animate={{ scale: isEngineRunning ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Q3-TECH-SYND // TAL
              </motion.div>
              <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400">
                <span>HEADCOUNT 500+</span>
                <span>AMER/EMEA</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Rocket className="w-4 h-4 text-primary" />
              Campaign Hopper & DNS Provisioning
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Target account lists (TAL) and executive buying criteria are loaded into the feeder chamber. Dedicated outbound secondary domains are spun up with automated SPF, DKIM, and DMARC triple-handshakes.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-bold">
              ✓ 14-Day Automated Warmup Protocol Armed
            </div>
          </div>
        </div>
      )

    case 1: // POC Content Created
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Hydraulic Printing Roller Graphic */}
            <div className="relative w-40 h-32 flex flex-col items-center justify-center">
              <motion.div
                className="w-32 h-6 rounded-full bg-gradient-to-r from-border via-primary to-border border border-primary/60 shadow-md mb-2 flex items-center justify-center text-[9px] font-mono font-bold text-white"
                animate={{ rotate: isEngineRunning ? [0, 360] : 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                ROLLER PRESS
              </motion.div>
              <motion.div
                className="w-36 h-20 rounded-lg bg-surface border-2 border-primary/80 shadow-xl p-2.5 flex flex-col justify-between"
                animate={{ y: isEngineRunning ? [0, -3, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="flex justify-between text-[9px] font-mono text-primary font-bold">
                  <span>PDF_WHITEPAPER</span>
                  <span className="text-emerald-400">READY</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 bg-primary/40 rounded w-full" />
                  <div className="h-1 bg-primary/20 rounded w-4/5" />
                </div>
                <span className="text-[8px] font-mono text-text-muted">Formatted Gated Asset</span>
              </motion.div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Content Press & Copywriting Calibration
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Senior B2B tech copywriters engineer three executive subject-line variants and package your syndication asset (whitepaper, case study, or research report) with conversion landing forms.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
              ✓ 3 Cadence Variations Packaged
            </div>
          </div>
        </div>
      )

    case 2: // Client Approval
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Hydraulic Inspection Lock Gate */}
            <div className="relative w-36 h-28 border-2 border-emerald-500/60 rounded-xl bg-surface p-3 flex flex-col items-center justify-between shadow-lg">
              <span className="text-[9.5px] font-mono text-text-muted">CLIENT_SIGN_OFF_GATE</span>
              <motion.div
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5 shadow-md"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                APPROVED ✓
              </motion.div>
              <span className="text-[8.5px] font-mono text-emerald-400">DISPATCH UNLOCKED</span>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Client Gating & 100% Sign-off Lock
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Before a single outreach packet transmits, you review the complete POC package. Messaging, compliance, and disclaimers must receive your 100% written approval.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
              ✓ Zero Brand Risk Guarantee
            </div>
          </div>
        </div>
      )

    case 3: // ICP Data Collection
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Centrifugal Sorting Sieve */}
            <div className="relative w-36 h-32 flex flex-col items-center justify-center">
              <RotatingGear size={60} teeth={14} speed={isEngineRunning ? 3 : 10} color="#00A6FF" />
              <div className="mt-2 px-3 py-1 rounded bg-surface border border-primary/60 text-[10px] font-mono font-bold text-primary">
                10,000+ MATCHED
              </div>
              <span className="text-[8px] font-mono text-text-muted mt-1">Live SMTP Cleanse</span>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              ICP Centrifugal Sieve & SMTP Handshake
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Target decision-makers are filtered across 8 strict criteria chips. Every record undergoes live SMTP ping verification and phone validation to eliminate bounce risk (&lt; 1% bounce guarantee).
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-bold">
              ✓ Direct-Dial & Corporate Email Enriched
            </div>
          </div>
        </div>
      )

    case 4: // Smart Email Distribution
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Triple Pneumatic Dispatch Tubes */}
            <div className="w-full space-y-1.5 font-mono text-[9px]">
              {['AMER (09:00 EST)', 'EMEA (09:15 GMT)', 'APAC (09:30 SGT)'].map((reg, i) => (
                <div key={reg} className="p-1.5 rounded bg-surface border border-cta/40 flex items-center justify-between">
                  <span className="text-text-muted">{reg}</span>
                  <span className="text-cta font-bold">DISPATCHING...</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Send className="w-4 h-4 text-cta" />
              Timezone Pneumatic Dispatch Engine
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Outbound message waves are timed precisely to local morning working hours across global regions. Volume pacing guarantees 99.2% primary inbox landing and zero spam triggers.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cta/10 border border-cta/30 text-xs font-mono text-cta font-bold">
              ✓ 99.2% Primary Inbox Placement
            </div>
          </div>
        </div>
      )

    case 5: // Real-Time Engagement Tracking
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Optical Telemetry Sensor */}
            <div className="w-full space-y-1 font-mono text-[9px]">
              <div className="p-1.5 rounded bg-primary/10 border border-primary/40 text-primary flex justify-between">
                <span>1. Email Opened</span>
                <span>10:24 AM ✓</span>
              </div>
              <div className="p-1.5 rounded bg-cta/10 border border-cta/40 text-cta flex justify-between">
                <span>2. CTA Clicked</span>
                <span>10:27 AM ✓</span>
              </div>
              <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex justify-between font-bold">
                <span>3. Asset Downloaded</span>
                <span>10:29 AM ✓</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Optical Telemetry Chamber & Intent Scorer
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Every interaction is tracked in real-time. When a decision-maker downloads your gated whitepaper, high-intent telemetry flags the record immediately for qualification.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
              ✓ Confirmed Buyer Opt-In Event
            </div>
          </div>
        </div>
      )

    case 6: // Lead Captured
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Lead Chassis Assembler */}
            <div className="w-36 rounded-lg bg-surface border-2 border-primary p-2 text-[9px] font-mono space-y-1 shadow-lg">
              <div className="text-primary font-bold">LEAD CHASSIS #8842</div>
              <div className="text-text-primary font-semibold">Michael Ross</div>
              <div className="text-text-muted">VP Cloud Eng.</div>
              <div className="text-emerald-400">Opt-in Consent Logged</div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              Lead Chassis Transformation Dock
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              The engaged prospect is encapsulated into a structured Lead Dossier with timestamps, corporate footprint, direct-dial contacts, and asset engagement context.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-bold">
              ✓ Structured B2B Profile Formed
            </div>
          </div>
        </div>
      )

    case 7: // Human Verification
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Dual-Laser Caliper QA Scanner */}
            <div className="relative w-36 h-28 border border-emerald-500/60 rounded-xl bg-surface p-2 flex flex-col justify-between overflow-hidden">
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_8px_#10b981]"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="text-[8.5px] font-mono text-text-muted">LASER_CALIPER_SCAN</span>
              <div className="text-center text-[10px] font-mono text-emerald-400 font-bold">
                7/7 CRITERIA CONFIRMED
              </div>
              <div className="flex justify-between text-[8px] font-mono text-text-muted">
                <span>PHONE TESTED</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Human QA Specialist & Phone Audit Caliper
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Our dedicated QA team calls corporate switchboards and cross-references active employment, purchasing authority, and direct dials. Non-matching records are diverted away.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
              ✓ Zero Junk / 100% Replacement Guarantee
            </div>
          </div>
        </div>
      )

    case 8: // Qualified Lead
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Hydraulic Embosser Gold Seal */}
            <div className="w-36 h-28 rounded-xl bg-surface border-2 border-emerald-400 p-2.5 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Award className="w-8 h-8 text-emerald-400 mb-1" />
              <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
                QUALIFIED LEAD (SQL)
              </div>
              <span className="text-[8px] font-mono text-text-muted mt-1">100% Certified Criteria</span>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Hydraulic Certification Embosser
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              The verified lead dossier receives the official Qualified Lead seal. It satisfies every ICP parameter, verified direct dial, and authenticated download consent.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
              ✓ Sales-Accepted Lead Ready For Follow-up
            </div>
          </div>
        </div>
      )

    case 9: // Client Delivery
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-background/80 border border-border">
            {/* Pneumatic Delivery Port */}
            <div className="w-36 h-28 border-2 border-primary rounded-xl bg-surface p-2.5 flex flex-col justify-between shadow-lg">
              <div className="flex justify-between text-[9px] font-mono text-text-muted">
                <span>CLIENT_CRM_RELAY</span>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>
              <div className="text-center font-mono text-xs font-bold text-primary">
                SALESFORCE / HUBSPOT
              </div>
              <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[8.5px] text-center font-bold">
                DELIVERY COMPLETE ✓
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Share2 className="w-4 h-4 text-primary" />
              Pneumatic Delivery Dock & Client Webhook Handoff
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Certified lead dossiers are pushed via automated webhook straight into your CRM or partner portal, ready for immediate SDR outreach while the prospect's interest is at peak.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-bold">
              ✓ Live Pipeline Active
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}

const STATION_DATA = [
  {
    stationName: 'Station 01 — Campaign Hopper & Intake Feeder',
    gaugeValue: 85,
    gaugeLabel: 'PRESSURE',
    accentColor: '#00A6FF',
    actionText: 'Hopper valves open, secondary DNS provisioned with triple SPF/DKIM verification.',
    outcomeText: 'Risk-free outbound warmup infrastructure active.',
  },
  {
    stationName: 'Station 02 — Content Press & Document Calibrator',
    gaugeValue: 90,
    gaugeLabel: 'CALIBRATION',
    accentColor: '#00A6FF',
    actionText: 'Hydraulic printing press formats whitepaper & compiles 3 email subject variants.',
    outcomeText: 'Engineered for executive attention & gated conversion.',
  },
  {
    stationName: 'Station 03 — Client Sign-Off Gate & Mechanical Lock',
    gaugeValue: 100,
    gaugeLabel: 'SECURITY',
    accentColor: '#10B981',
    actionText: 'Inspection lock gate holds until 100% written client sign-off is logged.',
    outcomeText: 'Guaranteed brand safety & compliance approval.',
  },
  {
    stationName: 'Station 04 — ICP Sieve & Rotary Centrifuge',
    gaugeValue: 95,
    gaugeLabel: 'PURITY',
    accentColor: '#00A6FF',
    actionText: 'Rotary centrifuge filters contacts against 8 criteria chips with SMTP verification.',
    outcomeText: '< 1% bounce rate guaranteed before sending.',
  },
  {
    stationName: 'Station 05 — Pneumatic Dispatch Tube Launcher',
    gaugeValue: 98,
    gaugeLabel: 'FLOW RATE',
    accentColor: '#FF6D00',
    actionText: 'Pneumatic cannons fire staggered message batches into AMER, EMEA, APAC local mornings.',
    outcomeText: '99.2% primary inbox delivery rate achieved.',
  },
  {
    stationName: 'Station 06 — Optical Telemetry Chamber & Sensor Eye',
    gaugeValue: 96,
    gaugeLabel: 'OPTICAL INTENT',
    accentColor: '#00A6FF',
    actionText: 'Sensor array detects email open, CTA click, and whitepaper download opt-in.',
    outcomeText: 'Genuine buyer interest confirmed in real time.',
  },
  {
    stationName: 'Station 07 — Lead Chassis Assembler & Dock',
    gaugeValue: 92,
    gaugeLabel: 'COMPACTION',
    accentColor: '#00A6FF',
    actionText: 'Robotic cradle encapsulates contact dossier with direct dial and asset history.',
    outcomeText: 'Structured enterprise lead profile created.',
  },
  {
    stationName: 'Station 08 — Dual-Laser Caliper QA Station',
    gaugeValue: 100,
    gaugeLabel: 'ACCURACY',
    accentColor: '#10B981',
    actionText: 'Laser calipers scan record while human QA team audits active employment by phone.',
    outcomeText: '100% junk-free guarantee with free replacements.',
  },
  {
    stationName: 'Station 09 — Hydraulic Embosser & Golden Quality Seal',
    gaugeValue: 100,
    gaugeLabel: 'CERTIFICATION',
    accentColor: '#10B981',
    actionText: 'Hydraulic press stamps certified QUALIFIED LEAD seal onto verified record.',
    outcomeText: 'Sales-Ready SQL ready for immediate engagement.',
  },
  {
    stationName: 'Station 10 — Pneumatic Delivery Dock & CRM Intake',
    gaugeValue: 100,
    gaugeLabel: 'THROUGHPUT',
    accentColor: '#00A6FF',
    actionText: 'Pneumatic dock relays verified dossier into Client CRM webhook (200 OK).',
    outcomeText: 'Direct sales pipeline opportunity activated.',
  },
]
