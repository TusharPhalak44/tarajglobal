import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const FAQS = [
  {
    id: 'faq-1',
    num: '01',
    question: 'What is Account-Based Marketing (ABM)?',
    answer:
      'Account-Based Marketing (ABM) is a focused B2B growth strategy where marketing and sales teams collaborate to target, engage, and close specific high-value enterprise accounts with hyper-personalized campaigns.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'How does ABM differ from traditional B2B lead generation?',
    answer:
      'Traditional lead generation casts a broad net to generate high lead volumes, often resulting in unqualified leads. ABM flips the funnel: it identifies best-fit target accounts upfront and engages buying committees with tailored experiences.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'What types of businesses benefit most from ABM?',
    answer:
      'B2B SaaS companies, enterprise software vendors, IT service providers, and companies with high annual contract values (ACVs) and complex, multi-stakeholder buying cycles benefit most.',
  },
  {
    id: 'faq-4',
    num: '04',
    question: 'How do you select and tier target accounts?',
    answer:
      'We analyze historical closed-won deals, define your Ideal Customer Profile (ICP), map total addressable market (TAM), and tier accounts (Tier 1: 1-to-1, Tier 2: 1-to-Few, Tier 3: 1-to-Many) based on revenue potential and intent signals.',
  },
  {
    id: 'faq-5',
    num: '05',
    question: 'What channels do you use for ABM outreach?',
    answer:
      'We orchestrate synchronized multi-channel outreach across personalized email cadences, executive LinkedIn touchpoints, content syndication, and tailored digital experiences.',
  },
  {
    id: 'faq-6',
    num: '06',
    question: 'How does intent data enhance ABM campaigns?',
    answer:
      'Intent data detects when target accounts are actively researching solutions in your space, allowing us to reach them at peak purchase intent and accelerate sales velocity.',
  },
  {
    id: 'faq-7',
    num: '07',
    question: 'How do you measure the success of an ABM program?',
    answer:
      'We track account engagement depth, buying committee penetration, pipeline velocity, meeting conversion rates, and revenue attribution directly tied to target accounts.',
  },
  {
    id: 'faq-8',
    num: '08',
    question: 'What role does DemandFlow Bridge play in your ABM services?',
    answer:
      'DemandFlow Bridge powers our end-to-end ABM infrastructure — from account scoring and organizational mapping to automated multi-channel sequences, real-time intent telemetry, and CRM handoff.',
  },
]

const FAQ = () => {
  const [openId, setOpenId] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  // Split into 4 left and 4 right
  const leftFaqs = FAQS.slice(0, 4)
  const rightFaqs = FAQS.slice(4, 8)

  const renderFaqItem = (faq) => {
    const isOpen = openId === faq.id

    return (
      <div
        key={faq.id}
        className={`
          relative group rounded-2xl transition-all duration-300 border overflow-hidden
          hover:-translate-y-0.5
          ${
            isOpen
              ? 'bg-white dark:bg-[#0B1424] border-[#00A6FF] shadow-lg shadow-[#00A6FF]/15 dark:shadow-[0_10px_30px_rgba(0,166,255,0.22)] ring-1 ring-[#00A6FF]/30'
              : 'bg-white dark:bg-[#091120] border-slate-200/90 dark:border-white/10 shadow-sm hover:border-[#00A6FF]/60 dark:hover:border-[#00A6FF]/60 hover:shadow-md hover:shadow-[#00A6FF]/10 dark:hover:shadow-[0_8px_25px_rgba(0,166,255,0.14)]'
          }
        `}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        <button
          id={`faq-btn-${faq.id}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${faq.id}`}
          onClick={() => toggle(faq.id)}
          className="w-full flex items-start justify-between gap-3.5 p-4 sm:p-5 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-start gap-3">
            <span
              className={`font-mono text-xs font-black px-2 py-0.5 rounded-md mt-0.5 shrink-0 transition-all duration-200 ${
                isOpen
                  ? 'bg-[#00A6FF] text-white shadow-xs shadow-[#00A6FF]/40'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-[#00A6FF]'
              }`}
            >
              {faq.num}
            </span>
            <span
              className={`text-sm sm:text-[15px] font-bold leading-snug transition-colors duration-200 ${
                isOpen
                  ? 'text-[#00A6FF]'
                  : 'text-slate-900 dark:text-white group-hover:text-[#00A6FF]'
              }`}
            >
              {faq.question}
            </span>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
              isOpen
                ? 'bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/40 shadow-xs'
                : 'bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200/60 dark:border-white/5 group-hover:border-[#00A6FF]/40 group-hover:text-[#00A6FF]'
            }`}
            aria-hidden="true"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }}
              exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 font-normal pl-[44px] sm:pl-[48px]">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section
      id="faq"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="Frequently Asked Questions about Account-Based Marketing"
    >
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00A6FF]/10 rounded-full blur-[160px] pointer-events-none" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-slate-900 dark:text-white">Frequently Asked </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">
              Questions
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
          >
            Common questions about Account-Based Marketing (ABM), our approach, and how DemandFlow Bridge accelerates enterprise pipeline.
          </motion.p>
        </div>

        {/* ── 2-COLUMN SPLIT ACCORDION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-2.5 items-start">
          <div className="space-y-2">
            {leftFaqs.map(renderFaqItem)}
          </div>

          <div className="space-y-2">
            {rightFaqs.map(renderFaqItem)}
          </div>
        </div>

      </div>
    </section>
  )
}

export default FAQ
