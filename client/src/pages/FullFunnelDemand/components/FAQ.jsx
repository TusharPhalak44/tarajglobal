import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

export const FAQS = [
  {
    id: 'faq-1',
    num: '01',
    question: 'What is B2B demand generation?',
    answer:
      'B2B demand generation is a data-driven strategy that builds awareness, engages target accounts, and creates consistent buyer interest across the full buying journey to deliver sales-qualified opportunities. TaRaj Global pairs it with in-house data verification and AI-assisted intent scoring, so campaigns reach decision-makers who can buy, not just click.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'How does demand generation support B2B?',
    answer:
      'Demand generation bridges marketing and sales. It educates buyers, builds trust before the first pitch, scores intent, and delivers pre-qualified leads that convert faster, so reps spend their time on accounts already in motion.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: ' Who should use B2B demand generation services?',
    answer:
      'Technology providers, B2B SaaS platforms, IT consultancies, and high-growth enterprise firms that need multi-stakeholder buy-in use demand generation to build a predictable, scalable revenue pipeline across US, EMEA, and APAC. Marketing and demand generation teams also use it to prove pipeline impact.',
  },
  {
    id: 'faq-4',
    num: '04',
    question: 'What channels are used for B2B demand generation?',
    answer:
      ' TaRaj Global runs a coordinated multi-channel program: targeted email outreach, LinkedIn account-based marketing (ABM), authoritative content syndication, virtual webinars, and intent-driven digital media, all orchestrated through DemandFlow Bridge.',
  },
  {
    id: 'faq-5',
    num: '05',
    question: ' How do demand generation campaigns generate qualified leads?',
    answer:
      'Campaigns target verified decision-makers with personalized messaging and educational assets, capture contact data through opt-in engagement, and evaluate behavioral intent signals. Engaged accounts are then scored, qualified against BANT criteria, and routed to sales as validated leads.',
  },
  {
    id: 'faq-6',
    num: '06',
    question: ' How do you reach B2B decision-makers?',
    answer:
      'We map your Ideal Customer Profile against verified firmographic and technographic data, then validate executive job roles, direct dials, and corporate emails with our in-house verification tool for zero-bounce deliverability, backed by our 99.8% Data Accuracy SLA.',
  },
  {
    id: 'faq-7',
    num: '07',
    question: ' How are demand generation leads qualified?',
    answer:
      'Leads are validated using multi-touch engagement metrics, BANT criteria (Budget, Authority, Need, Timeline), content consumption depth, and custom qualification filters. Our CDQA audit then reviews each record before sales handoff, so only sales-ready opportunities reach your CRM.',
  },
  {
    id: 'faq-8',
    num: '08',
    question: 'How does DemandFlow Bridge support demand generation?',
    answer:
      'DemandFlow Bridge is TaRaj Global’s central command layer. It automates multi-channel cadences, verifies prospect data, scores live buyer intent, and syncs sales-qualified opportunities directly to your CRM, giving you one view from first touch to pipeline.',
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
          ${isOpen
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
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="Frequently Asked Questions about Full-Funnel Demand Services"
    >
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
            <span className="text-slate-900 dark:text-text-primary dark:text-white">FREQUENTLY ASKED </span>
            <div className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">
            QUESTIONS ON FULL FUNNEL DEMAND GENERATION
            </div>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
          >
            Common questions about TaRaj Global’s B2B demand generation, multi-channel methodology, buyer qualification, and DemandFlow Bridge across US, EMEA, and APAC.
          </motion.p>
        </div>

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

