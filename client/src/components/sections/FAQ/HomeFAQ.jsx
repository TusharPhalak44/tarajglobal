import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AnimatedGrid from '@components/animations/AnimatedGrid'

export const HOME_FAQS = [
  {
    id: 'faq-1',
    num: '01',
    question: 'What is a tech-powered B2B demand generation agency?',
    answer:
      'A tech-powered B2B demand generation agency combines strategic account outreach with custom software infrastructure. Rather than relying solely on manual processes or generic third-party databases, tech-powered agencies build proprietary verification and CRM tools to deliver 99.8% data accuracy and predictable pipeline growth.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'How does TaRaj Global verify prospect data before client delivery?',
    answer:
      'TaRaj Global processes all prospect research through an in-house verification engine. This custom tool conducts multi-pass validation on direct-dial phone numbers and tests email deliverability in real time, eliminating bounce rates and duplicate contacts before leads flow into our client delivery CRM.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'What is the difference between B2B lead generation and demand generation?',
    answer:
      'B2B lead generation focuses on acquiring individual contact details (MQLs). B2B demand generation is a full-funnel strategy designed to generate category awareness, nurture intent-qualified buying committees, and convert accounts into verified sales opportunities (SQLs) and closed-loop revenue.',
  },
  {
    id: 'faq-4',
    num: '04',
    question: 'How does TaRaj Global support pipeline growth across US, EMEA, and APAC?',
    answer:
      'TaRaj Global maintains global data verification operations compliance-mapped for North America (CCPA), Europe (GDPR), and APAC. Our infrastructure enables technology companies to scale personalized account outreach to enterprise decision-makers worldwide.',
  },
]

export const HomeFAQ = () => {
  // Classic accordion: all answers hidden by default, expanding only when clicked
  const [openId, setOpenId] = useState(null)

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="relative bg-[#070B14] py-8 sm:py-10 lg:py-12 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="home-faq-heading"
    >
      {/* ── Ambient Radial Lighting & Coordinate Grid ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[260px] rounded-full bg-[#00A6FF]/[0.05] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[200px] rounded-full bg-[#FF6D00]/[0.03] blur-[130px]" />
      </div>

      <AnimatedGrid size={64} opacity={0.03} />

      <div className="relative z-10 mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 xl:pr-12 2xl:pr-6">
        
        {/* ── Section Header (Compact) ─── */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center mb-1.5">
            <p className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              FREQUENTLY ASKED QUESTIONS
            </p>
          </div>

          {/* Headline */}
          <h2
            id="home-faq-heading"
            className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-[-0.03em] leading-tight text-white mb-1.5"
          >
            Got Questions?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00]">
              We Have Answers.
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal max-w-lg mx-auto">
            Everything you need to know about our tech-powered demand generation, data verification, and pipeline execution.
          </p>
        </div>

        {/* ── 2 Row × 2 Column FAQ Grid (Clean & Compact) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
          {HOME_FAQS.map((faq) => {
            const isOpen = openId === faq.id

            return (
              <div
                key={faq.id}
                className={`group relative z-10 rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
                  isOpen
                    ? 'border-[#00A6FF]/40 bg-[#091122]/95 shadow-[0_0_24px_rgba(0,166,255,0.12)]'
                    : 'border-white/10 bg-[#080D1A]/90 hover:border-white/25 hover:bg-[#091022]'
                }`}
              >
                {/* Top Subtle Accent Beam on active/hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />

                {/* FAQ Header & Toggle Trigger */}
                <button
                  type="button"
                  id={`home-faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`home-faq-panel-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full relative z-10 flex items-start justify-between gap-3 p-3.5 sm:p-4 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                    {/* Number Badge Only */}
                    <span
                      className={`font-mono text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-md mt-0.5 shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#00A6FF] text-white shadow-xs shadow-[#00A6FF]/40'
                          : 'bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/25'
                      }`}
                    >
                      {faq.num}
                    </span>

                    {/* Question Only */}
                    <h3
                      className={`text-xs sm:text-[14px] lg:text-[15px] font-bold leading-snug transition-colors duration-200 ${
                        isOpen ? 'text-[#00A6FF]' : 'text-white group-hover:text-[#00A6FF]'
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Expand / Collapse Chevron */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/40 rotate-180'
                        : 'bg-white/[0.04] text-slate-400 border border-white/10 group-hover:border-[#00A6FF]/40 group-hover:text-[#00A6FF]'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {/* FAQ Answer Body Only (No extra footer or bottom badges) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`home-faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`home-faq-btn-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 sm:pt-1.5 border-t border-white/[0.06] ml-7 sm:ml-9 mr-1">
                        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default HomeFAQ
