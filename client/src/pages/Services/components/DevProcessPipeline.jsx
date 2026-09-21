import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const PROCESS_STEPS = [
  {
    step: '01',
    label: 'DEFINE',
    name: 'ICP & TAM Scoping',
    desc: 'We interview your sales leaders, establish strict ICP firmographics, determine tech stack installations, and define non-negotiable qualification criteria.',
    deliverable: 'Approved ICP Definition Matrix',
    timeline: 'Day 1–3',
  },
  {
    step: '02',
    label: 'IDENTIFY',
    name: 'Data Extraction & Verification',
    desc: 'Our data operations team builds custom prospect databases, runs triple-layer SMTP handshakes, and verifies active direct-dial phone extensions.',
    deliverable: '100% Verified Contact Repository',
    timeline: 'Day 4–6',
  },
  {
    step: '03',
    label: 'ENGAGE',
    name: 'Multi-Touch Orchestration',
    desc: 'Dedicated warm secondary domains, tailored executive messaging, LinkedIn touchpoints, and asset syndication activate concurrently.',
    deliverable: 'Synchronized Outbound Cadences',
    timeline: 'Day 7–14',
  },
  {
    step: '04',
    label: 'QUALIFY',
    name: 'BANT & SQL Rigorous Gating',
    desc: 'Every prospect response is vetted. Only decision-makers with confirmed budget, explicit commercial need, and active buying timelines proceed.',
    deliverable: 'Pre-Call Executive Dossier',
    timeline: 'Ongoing SLA',
  },
  {
    step: '05',
    label: 'CONVERT',
    name: 'Confirmed Calendar Meeting',
    desc: 'Discovery calls are scheduled directly onto your account executive’s calendar with guaranteed show-up replacement assurances.',
    deliverable: 'Sales-Ready Discovery Session',
    timeline: 'Recurring Pipeline',
  },
]

export default function DevProcessPipeline() {
  const [activeStep, setActiveStep] = useState(2)

  return (
    <section
      id="dev-process-pipeline"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden"
      aria-label="5-Stage Operational Delivery Workflow"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <span>OPERATIONAL DELIVERY SLA</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            From First Signal To Confirmed Meeting: <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Our 5-Stage Execution Framework
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            A transparent, reliable methodology built for predictable execution and enterprise SLA assurance.
          </p>
        </div>

        {/* Stepper Timeline Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-5xl mx-auto mb-8">
          {PROCESS_STEPS.map((s, idx) => {
            const isActive = activeStep === idx

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-surface border-primary shadow-md ring-1 ring-primary/30'
                    : 'bg-surface/50 border-border/80 hover:bg-surface text-text-muted hover:text-text-primary'
                }`}
              >
                <span className={`font-mono text-xs font-bold block mb-1 ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                  PHASE {s.step}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider block text-text-primary">
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Stage Detail Card */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-9 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60">
            <div>
              <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest block mb-1">
                STAGE {PROCESS_STEPS[activeStep].step} // {PROCESS_STEPS[activeStep].label}
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-text-primary">
                {PROCESS_STEPS[activeStep].name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-text-muted bg-background px-3 py-1.5 rounded-lg border border-border">
                {PROCESS_STEPS[activeStep].timeline}
              </span>
            </div>
          </div>

          <p className="mt-5 text-sm sm:text-base text-text-secondary leading-relaxed font-normal max-w-3xl">
            {PROCESS_STEPS[activeStep].desc}
          </p>

          <div className="mt-6 pt-5 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-text-primary font-semibold">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>KEY DELIVERABLE: {PROCESS_STEPS[activeStep].deliverable}</span>
            </div>

            <span className="text-text-muted text-[11px]">
              TARAJ GLOBAL EXECUTION SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
