import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

export const FAQS = [
  {
    id: 'faq-1',
    num: '01',
    question: 'What is Account-Based Experience (ABX)?',
    answer:
      'Account-based experience (ABX) coordinates every interaction a target account’s buying committee has with your company, across marketing, SDRs, and sales, into one consistent, personalized journey. TaRaj Global delivers ABX with journey design, AI-assisted intent signals, verified stakeholder data, and CRM-ready handoffs through DemandFlow Bridge.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: ' How does ABX differ from ABM?',
    answer:
      'ABM focuses on selecting high-fit target accounts and engaging their buying committees. ABX extends that focus to the quality and continuity of the whole experience, aligning teams, sequencing content by buying stage, and adapting to account behavior so each touch builds on the last. Many teams use ABM to choose accounts and ABX to move them toward an opportunity.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'Who benefits most from ABX?',
    answer:
      'B2B technology and enterprise revenue teams with multi-stakeholder buying committees and long evaluation cycles benefit most. That includes SaaS and technology vendors, teams with siloed sales and marketing, teams scaling an existing ABM program, and companies expanding into new regions.',
  },
  {
    id: 'faq-4',
    num: '04',
    question: ' How do you design the account journey?',
    answer:
      'We work with sales leadership to map the stages each committee moves through, from awareness to active evaluation, then define the message, asset, and channel for every moment, so marketing, SDRs, and sales run one playbook.',
  },
  {
    id: 'faq-5',
    num: '05',
    question: 'How do sales and marketing coordinate in an ABX program?',
    answer:
      'Both teams run on one set of stage definitions and one synchronized cadence managed in DemandFlow Bridge. Sequencing rules prevent duplicate outreach, and a unified account view in your CRM shows every touch so neither team works blind.',
  },
  {
    id: 'faq-6',
    num: '06',
    question: ' How does intent data shape the account experience?',
    answer:
      'AI-assisted intent and engagement signals show where each account sits in its journey and when interest surges. We use those signals to adapt content, channel, and timing, so the next touch reflects what the committee is doing now rather than a fixed schedule.',
  },
  {
    id: 'faq-7',
    num: '07',
    question: 'How do you measure ABX success?',
    answer:
      ' We track account-level progress rather than lead counts: committee engagement, stage progression, meetings booked, opportunities created, and pipeline velocity. CRM sync attributes touches to opportunity progress, and bi-weekly journey reviews align results with your sales and marketing leadership.',
  },
  {
    id: 'faq-8',
    num: '08',
    question: 'What role does DemandFlow Bridge play in ABX?',
    answer:
      'DemandFlow Bridge is TaRaj Global’s native delivery platform. It centralizes journey stages, stakeholder data, intent signals, cadences, and CRM sync in one workflow, and passes each opportunity to sales with the full touch history attached.',
  },
]

const FAQ = () => {
  const [openId, setOpenId] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  // Single-open accordion: opening one closes any other open FAQ
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
          ${isOpen
            ? 'bg-white dark:bg-[#0B1424] border-[#00A6FF] shadow-lg shadow-[#00A6FF]/15 dark:shadow-[0_10px_30px_rgba(0,166,255,0.22)] ring-1 ring-[#00A6FF]/30'
            : 'bg-white dark:bg-[#091120] border-slate-200/90 dark:border-white/10 shadow-sm hover:border-[#00A6FF]/60 dark:hover:border-[#00A6FF]/60 hover:shadow-md hover:shadow-[#00A6FF]/10 dark:hover:shadow-[0_8px_25px_rgba(0,166,255,0.14)]'
          }
        `}
      >
        {/* Top subtle hover / active accent beam */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
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
              className={`font-mono text-xs font-black px-2 py-0.5 rounded-md mt-0.5 shrink-0 transition-all duration-200 ${isOpen
                ? 'bg-[#00A6FF] text-white shadow-xs shadow-[#00A6FF]/40'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-[#00A6FF]'
                }`}
            >
              {faq.num}
            </span>
            <span
              className={`text-sm sm:text-[15px] font-bold leading-snug transition-colors duration-200 ${isOpen
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
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen
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
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="Frequently Asked Questions about Account Based Experience (ABX)"
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
            className="flex items-center justify-center mb-2.5"
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              SOMETHING ON YOUR MIND?
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-slate-900 dark:text-text-primary dark:text-white">Frequently Asked </span>
            <div className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">
              Questions ON ABX
            </div>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
          >
            Everything you need to know about TaRaj Global’s account-based experience methodology, journey orchestration, intent-driven adaptation, and CRM-ready handoffs across US, EMEA, and APAC.
          </motion.p>
        </div>

        {/* ── 2-COLUMN SPLIT ACCORDION (HALF LEFT, HALF RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-2.5 items-start">
          {/* Left Column (01 to 04) */}
          <div className="space-y-2">
            {leftFaqs.map(renderFaqItem)}
          </div>

          {/* Right Column (05 to 08) */}
          <div className="space-y-2">
            {rightFaqs.map(renderFaqItem)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
