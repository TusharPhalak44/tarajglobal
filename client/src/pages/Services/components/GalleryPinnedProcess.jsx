import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Search, Filter, Share2, Sparkles, CheckCircle } from 'lucide-react'

const processSteps = [
  {
    num: '01',
    title: 'IDENTIFY',
    subtitle: 'TAM & Intent Detection',
    icon: Eye,
    description: 'We scan your total addressable market using firmographic filters, technographic signals, and third-party purchase intent data.',
    visualType: 'dots',
  },
  {
    num: '02',
    title: 'RESEARCH',
    subtitle: 'Buying Committee Intelligence',
    icon: Search,
    description: 'We map decision-makers across engineering, finance, security, and operations, verifying direct phone extensions and active inbox health.',
    visualType: 'datalines',
  },
  {
    num: '03',
    title: 'QUALIFY',
    subtitle: 'Noise Elimination & BANT Filter',
    icon: Filter,
    description: 'Non-responsive, low-budget, or out-of-scope contacts are removed. Only contacts meeting stringent qualification parameters proceed.',
    visualType: 'filter',
  },
  {
    num: '04',
    title: 'ENGAGE',
    subtitle: 'Synchronized Multi-Touch Outreach',
    icon: Share2,
    description: 'Personalized email sequences, LinkedIn connection touches, and strategic phone calls activate concurrently to generate warm interest.',
    visualType: 'connections',
  },
  {
    num: '05',
    title: 'CREATE OPPORTUNITY',
    subtitle: 'Executive Calendar Secured',
    icon: Sparkles,
    description: 'The target account responds, requests a demonstration, and confirms a direct discovery meeting with your account executive.',
    visualType: 'opportunity',
  },
]

export const GalleryPinnedProcess = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="pinned-process"
      className="relative py-28 md:py-36 px-6 md:px-14 lg:px-20 bg-background text-text-primary border-b border-border/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Sticky Heading (Pinned visual storytelling) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <span className="font-mono text-xs tracking-widest uppercase text-primary block">
              [SECTION 07 // PINNED STORYTELLING]
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-text-primary leading-[0.95]">
              HOW WE MOVE <br />
              A PROSPECT <br />
              TOWARD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-secondary">
                OPPORTUNITY.
              </span>
            </h2>

            <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed max-w-md">
              A systematic multi-stage progression from raw addressable accounts to high-intent executive sales conversations.
            </p>

            {/* Quick Step Indicators */}
            <div className="flex items-center gap-2 pt-4">
              {processSteps.map((step, idx) => (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStep === idx
                      ? 'w-10 bg-primary'
                      : 'w-4 bg-border hover:bg-text-muted'
                  }`}
                  aria-label={`Go to step ${step.num}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Animated Sequence & Interactive Visual Canvas */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Stage Stepper */}
            <div className="space-y-4">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx
                const Icon = step.icon

                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-2xl border transition-all duration-500 p-6 md:p-8 cursor-pointer ${
                      isActive
                        ? 'bg-surface border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/40'
                        : 'bg-surface/40 border-border/60 hover:border-primary/40 opacity-75 hover:opacity-100'
                    }`}
                    data-cursor-label="STAGE"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isActive
                              ? 'bg-primary text-black border-primary'
                              : 'bg-background text-text-muted border-border'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div>
                          <span className="font-mono text-[10px] tracking-widest text-text-muted block">
                            PHASE {step.num}
                          </span>
                          <h3
                            className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
                              isActive ? 'text-primary' : 'text-text-primary'
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-text-muted uppercase hidden sm:block">
                        {step.subtitle}
                      </span>
                    </div>

                    <p className="mt-4 text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                      {step.description}
                    </p>

                    {/* DYNAMIC STAGE VISUAL DISPLAY ON ACTIVE */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-border/60"
                      >
                        {/* 01 IDENTIFY: Scattered dots appear */}
                        {step.visualType === 'dots' && (
                          <div className="h-32 rounded-xl bg-background border border-border/70 p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="font-mono text-[10px] uppercase text-text-muted tracking-wider flex justify-between">
                              <span>SIGNAL_DETECTION // SCATTER MATRIX</span>
                              <span className="text-primary font-bold">12,400+ SIGNALS DETECTED</span>
                            </div>
                            <div className="grid grid-cols-12 gap-2 my-auto">
                              {Array.from({ length: 36 }).map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: [0, 1.2, 1] }}
                                  transition={{ duration: 0.4, delay: i * 0.015 }}
                                  className={`w-2 h-2 rounded-full ${
                                    i % 4 === 0 ? 'bg-primary' : 'bg-border'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 02 RESEARCH: Data lines appear */}
                        {step.visualType === 'datalines' && (
                          <div className="h-32 rounded-xl bg-background border border-border/70 p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="font-mono text-[10px] uppercase text-text-muted tracking-wider flex justify-between">
                              <span>COMMITTEE_MAPPING // TELEMETRY</span>
                              <span className="text-primary font-bold">4 STAKEHOLDERS MAPPED</span>
                            </div>
                            <div className="space-y-2 my-auto">
                              {['VP of Engineering', 'Head of Infrastructure', 'Chief Information Security Officer'].map((role, rIdx) => (
                                <div key={role} className="flex items-center gap-3">
                                  <span className="w-2 h-2 rounded-full bg-primary" />
                                  <div className="h-2 flex-1 rounded bg-border/80 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${80 - rIdx * 15}%` }}
                                      transition={{ duration: 0.8 }}
                                      className="h-full bg-primary"
                                    />
                                  </div>
                                  <span className="font-mono text-[10px] text-text-secondary">{role}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 03 QUALIFY: Irrelevant nodes disappear */}
                        {step.visualType === 'filter' && (
                          <div className="h-32 rounded-xl bg-background border border-border/70 p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="font-mono text-[10px] uppercase text-text-muted tracking-wider flex justify-between">
                              <span>BANT_FILTER // ZERO WASTE</span>
                              <span className="text-emerald-400 font-bold">100% BUDGET & AUTHORITY CONFIRMED</span>
                            </div>
                            <div className="flex items-center justify-around my-auto">
                              {['BUDGET', 'AUTHORITY', 'NEED', 'TIMELINE'].map((crit) => (
                                <div key={crit} className="flex flex-col items-center gap-1.5">
                                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4" />
                                  </div>
                                  <span className="font-mono text-[9px] text-text-primary uppercase tracking-wider">{crit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 04 ENGAGE: Connection lines activate */}
                        {step.visualType === 'connections' && (
                          <div className="h-32 rounded-xl bg-background border border-border/70 p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="font-mono text-[10px] uppercase text-text-muted tracking-wider flex justify-between">
                              <span>MULTI_TOUCH // CONCURRENT OUTREACH</span>
                              <span className="text-primary font-bold">OUTREACH SYNCHRONIZED</span>
                            </div>
                            <div className="flex items-center justify-between px-4 my-auto">
                              <div className="text-center font-mono text-[10px] text-text-primary uppercase">
                                <div className="p-2 rounded-lg bg-surface border border-border mb-1">EMAIL CADENCE</div>
                                <span className="text-emerald-400">42% OPEN</span>
                              </div>
                              <div className="h-0.5 w-16 bg-primary animate-pulse" />
                              <div className="text-center font-mono text-[10px] text-text-primary uppercase">
                                <div className="p-2 rounded-lg bg-surface border border-border mb-1">PHONE TOUCH</div>
                                <span className="text-primary">WARM INTRO</span>
                              </div>
                              <div className="h-0.5 w-16 bg-primary animate-pulse" />
                              <div className="text-center font-mono text-[10px] text-text-primary uppercase">
                                <div className="p-2 rounded-lg bg-surface border border-border mb-1">ABM ASSETS</div>
                                <span className="text-emerald-400">ENGAGED</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 05 OPPORTUNITY: One large node becomes highlighted */}
                        {step.visualType === 'opportunity' && (
                          <div className="h-32 rounded-xl bg-primary/10 border border-primary/40 p-4 flex items-center justify-between relative overflow-hidden">
                            <div className="space-y-1">
                              <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
                                CALENDAR EVENT CONFIRMED
                              </span>
                              <h4 className="text-base md:text-lg font-black uppercase text-text-primary">
                                VP INFRASTRUCTURE DEMO DISCOVERY
                              </h4>
                              <p className="font-mono text-xs text-text-muted">
                                45 MINUTE BRIEFING · QUALIFIED PIPELINE VALUE: $85,000+
                              </p>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-primary text-black font-black flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
                              <Sparkles className="w-7 h-7" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryPinnedProcess
