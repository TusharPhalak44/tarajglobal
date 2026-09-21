import React from 'react'
import { motion } from 'framer-motion'
import { XCircle, CheckCircle2, Target, Zap, ShieldCheck } from 'lucide-react'

const COMPARISONS = [
  {
    num: '01',
    area: 'TARGETING & DATA',
    problemTitle: 'The Traditional Trap: Stale Static Lists',
    problemDesc: 'Buying generic scrapings from bloated data brokers results in 25%+ bounce rates, spam penalties, and SDRs calling outdated employee records.',
    solutionTitle: 'The Taraj Standard: Live Intent & Technographic Signals',
    solutionDesc: 'Custom TAM mapping verified in real-time. Direct-dial phone validation and third-party purchase intent tracking guarantee zero wasted touches.',
    metric: '99.8% Data Accuracy SLA',
    icon: Target,
  },
  {
    num: '02',
    area: 'OUTREACH & ENGAGEMENT',
    problemTitle: 'The Traditional Trap: Generic Email Blasting',
    problemDesc: 'Sending boilerplate cold email blasts from burned corporate domains destroys sender reputation and drives prospect opt-outs.',
    solutionTitle: 'The Taraj Standard: Synchronized Multi-Touch Cadences',
    solutionDesc: 'Warmup-isolated secondary domains, personalized 1-on-1 copy, LinkedIn social touches, and authoritative content syndication running concurrently.',
    metric: '42% Average Open Rate',
    icon: Zap,
  },
  {
    num: '03',
    area: 'CONVERSION & PIPELINE',
    problemTitle: 'The Traditional Trap: Low-Intent Form Fills',
    problemDesc: 'Paying for vanity eBook downloads where prospects never show up for calls, lack budget authority, or have no active buying cycle.',
    solutionTitle: 'The Taraj Standard: Strict BANT & SQL Qualified Meetings',
    solutionDesc: 'Prospects are pre-qualified across Budget, Authority, Need, and Timeline before direct booking into your account executives’ calendar.',
    metric: '98% Confirmed Show Rate',
    icon: ShieldCheck,
  },
]

export default function DevProblemSolution() {
  return (
    <section
      id="dev-problem-solution"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
            <span>METHODOLOGY COMPARISON</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            Why Traditional Outbound Breaks Down <br />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              — And How Taraj Fixes It
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            B2B pipeline generation is an engineering discipline. Here is how our operational framework eliminates waste at every stage of the funnel.
          </p>
        </div>

        {/* 3 High-Impact Comparison Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMPARISONS.map((card, idx) => {
            const Icon = card.icon

            return (
              <div
                key={card.num}
                className="group relative rounded-2xl border border-border/80 bg-surface/70 hover:bg-surface hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-4 pb-5 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
                        {card.area}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      /{card.num}
                    </span>
                  </div>

                  {/* Problem Block */}
                  <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wide mb-1.5">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>{card.problemTitle}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {card.problemDesc}
                    </p>
                  </div>

                  {/* Solution Block */}
                  <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{card.solutionTitle}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {card.solutionDesc}
                    </p>
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-text-muted text-[11px] uppercase tracking-wider">
                    OPERATIONAL SLA
                  </span>
                  <span className="font-bold text-primary">
                    {card.metric}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
