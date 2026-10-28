import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

export const FAQS = [
  {
    id: 'faq-1',
    num: '01',
    question: 'What is an HQL (High-Quality Lead) in B2B demand generation?',
    answer:
      'A High-Quality Lead (HQL) is a pre-screened B2B contact who holds verified decision-making authority (C-Suite, VP, Director) within a target Ideal Customer Profile (ICP) account. Unlike standard leads, an HQL is qualified through mandatory discovery screening questions—confirming active business pain points, installed software stack, and project evaluation timelines—before being routed to sales teams.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'How does an HQL differ from an MQL or SQL in conversion velocity',
    answer:
      'Marketing Qualified Leads (MQLs) rely on passive content downloads or web traffic, yielding lower conversion rates. An HQL guarantees active engagement from verified budget holders who have explicitly answered 2 to 4 custom qualification questions regarding their installed tech stack, active pain points, and buying timeline, accelerating SDR-to-opportunity pipeline velocity by up to 3.8x.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'How does TaRaj Global verify B2B lead data and prevent email bounces?',
    answer:
      'TaRaj Global verifies contact records using an in-house post-research verification tool backed by a 99.8% Data Accuracy SLA. Every record undergoes real-time SMTP inbox validation, direct-dial phone checks, and human QA audits to eliminate domain bounces, spam traps, and stale contact details before delivery.',
  },
  {
    id: 'faq-4',
    num: '04',
    question: 'What custom qualification screening questions can be included in HQL campaigns?',
    answer:
      'Clients can specify 2 to 4 mandatory qualifying questions aligned with their sales priorities. Examples include identifying current software vendor tools, contract renewal dates, team size, primary operational bottlenecks, allocated purchasing budget, and planned implementation timelines (e.g., within 3 to 6 months).',
  },
  {
    id: 'faq-5',
    num: '05',
    question: 'Can TaRaj Global target specific installed software stacks and ARR tiers?',
    answer:
      ' Campaigns are built using granular firmographic and technographic filters. You can segment accounts by annual revenue (ARR), employee count, geographic region (US, EMEA, APAC), target vertical markets, installed technology stack (e.g., Salesforce, AWS, SAP), and specific buying committee job titles.',
  },
  {
    id: 'faq-6',
    num: '06',
    question: 'How does DemandFlow Bridge sync HQL leads into Salesforce and HubSpot?',
    answer:
      'Leads route in real time via DemandFlow Bridge, our proprietary middleware that integrates directly into CRMs (Salesforce, HubSpot, Marketo) or custom REST API webhooks. Each record arrives enriched with direct dials, corporate email, LinkedIn profile, engagement telemetry, and verbatim discovery answers for immediate rep assignment.',
  },
  {
    id: 'faq-7',
    num: '07',
    question: 'Are TaRaj Global\'s lead generation processes GDPR and ISO 27001 compliant?',
    answer:
      'Yes. TaRaj Global operates under certified ISO 27001:2022 (Information Security) and ISO 9001:2015 (Quality Management) standards. All B2B lead generation activities comply fully with international privacy laws, including GDPR (EU/UK), CCPA/CPRA (US), and CAN-SPAM regulations.',
  },
  {
    id: 'faq-8',
    num: '08',
    question: "What is TaRaj Global's 99.8% Data Accuracy and lead replacement SLA?",
    answer:
      'We enforce a strict 99.8% Data Accuracy SLA. If any delivered contact contains an invalid/bounced email, incorrect telephone number, or fails pre-agreed qualification criteria, TaRaj Global automatically replaces the record on a 1-to-1 basis via DemandFlow Bridge at zero extra cost.',
  },
]

const HqlFAQ = () => {
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
      aria-label="Frequently Asked Questions about High-Quality Leads (HQL)"
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
            className="inline-flex items-center gap-2 mb-2.5"
          >

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              FREQUENTLY ASKED QUESTIONS • DEMANDFLOW KNOWLEDGE BASE
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
              Questions
            </div>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
          >
            Common questions about High-Quality Leads (HQL), our qualification methodology, custom screening questions, and delivery SLAs.
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

export default HqlFAQ
