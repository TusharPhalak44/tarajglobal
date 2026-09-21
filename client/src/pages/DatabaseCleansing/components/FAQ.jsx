import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const FAQS = [
  {
    id: 'faq-1',
    num: '01',
    question: 'What is B2B database cleansing?',
    answer:
      'B2B database cleansing is the systematic process of identifying, fixing, or removing inaccurate, duplicate, corrupt, and stale contact and account records from your CRM and marketing automation platforms.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'How does database decay affect outbound sales and deliverability?',
    answer:
      'B2B data naturally decays by 25% to 30% annually due to job changes, company rebrands, and promotions. Stale contact lists cause high hard bounce rates that destroy sender domain reputation, waste sales rep dial time, and result in blacklisted email servers.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'How do you detect duplicate records across CRM systems?',
    answer:
      'We use advanced multi-vector fuzzy matching algorithms across email prefixes, domain root variations, LinkedIn profile handles, phone structures, and company legal entities to safely consolidate duplicate records while preserving complete historical deal activity and custom notes.',
  },
  {
    id: 'faq-4',
    num: '04',
    question: 'What is live SMTP verification and how does it prevent bounces?',
    answer:
      'Our verification engine conducts real-time SMTP handshakes directly with destination mail servers without ever sending an outbound email. This confirms the exact mailbox existence, identifies catch-all risks, and suppresses known spam traps and honeypots before your team ever hits send.',
  },
  {
    id: 'faq-5',
    num: '05',
    question: 'How do you identify executive job changes and corporate turnover?',
    answer:
      'We combine live professional network tracking and automated employment directory validation to detect departed executives, map their new employers, and identify the newly promoted successor decision-maker at their previous firm.',
  },
  {
    id: 'faq-6',
    num: '06',
    question: 'What data fields can Taraj Global enrich into existing contact records?',
    answer:
      'We append verified direct desk extensions, mobile numbers, personal LinkedIn profile URLs, company employee counts, estimated annual revenue brackets, industry NAICS/SIC taxonomy, and installed technographic software stacks.',
  },
  {
    id: 'faq-7',
    num: '07',
    question: 'How do you guarantee sub-1% hard bounce rates?',
    answer:
      'Through a rigorous multi-stage scrub combining syntax normalization, DNS/MX record health checks, real-time live SMTP ping handshakes, and CDQA manual audit verification. We back every scrubbed list with an ironclad 99%+ deliverability guarantee.',
  },
  {
    id: 'faq-8',
    num: '08',
    question: 'How does Taraj Global securely sync scrubbed data back into our CRM?',
    answer:
      'We support direct bi-directional API sync with Salesforce, HubSpot, Marketo, and Microsoft Dynamics 365, as well as encrypted AES-256 staging files, ensuring zero data leakage and effortless one-click CRM updates.',
  },
]

const FAQ = () => {
  const [openId, setOpenId] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

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
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-[#00A6FF]'
              }`}
            >
              {faq.question}
            </span>
          </div>

          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
              isOpen
                ? 'bg-[#00A6FF]/15 text-[#00A6FF] rotate-180'
                : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:bg-slate-200 dark:group-hover:bg-white/10'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4.5 sm:px-5 sm:pb-5 pt-0">
                <div className="pl-9 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 font-normal">
                  {faq.answer}
                </div>
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
      aria-label="Frequently Asked Questions About Database Cleansing"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[320px] bg-[#00A6FF]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" />
            <span className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              Got Questions?
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span className="text-slate-900 dark:text-white">Frequently Asked </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">
              Questions
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Everything you need to know about our enterprise CRM hygiene, deduplication algorithms, and sub-1% bounce rate guarantees.
          </p>
        </div>

        {/* 2-Column Balanced FAQ Layout */}
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-3.5 items-start">
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {leftFaqs.map(renderFaqItem)}
          </div>
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {rightFaqs.map(renderFaqItem)}
          </div>
        </div>

      </div>
    </section>
  )
}

export default FAQ
