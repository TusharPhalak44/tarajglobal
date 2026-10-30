import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

export const FAQS = [
  {
    id: 'faq-1',
    num: '01',
    question: 'What is Account Based Experience (ABX)?',
    answer:
      'Account Based Experience (ABX) is a customer-centric evolution of Account-Based Marketing (ABM). It synchronizes marketing, sales, and executive touchpoints to deliver tailored, high-value experiences to buying committees at every stage of their evaluation.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'How is ABX different from traditional ABM?',
    answer:
      'Traditional ABM focuses primarily on identifying and targeting accounts with marketing ads and sales emails. ABX focuses on the entire experience delivered to the buyer, combining real-time intent telemetry, multi-stakeholder personalization, and empathetic timing to build authentic consensus.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'How do you tier accounts for an ABX strategy?',
    answer:
      'We segment target accounts into three distinct tiers: Tier 1 (1:1 hyper-personalized campaigns for top enterprise logos), Tier 2 (1:Few tailored cluster campaigns for specific verticals), and Tier 3 (1:Many programmatic scale with dynamic personalization).',
  },
  {
    id: 'faq-4',
    num: '04',
    question: 'What role does intent data play in ABX?',
    answer:
      'Intent data serves as the catalyst for ABX execution. Instead of blind cold outreach, our systems detect when target accounts are actively researching your category, competitors, or pain points, allowing us to initiate context-rich engagement at the exact right moment.',
  },
  {
    id: 'faq-5',
    num: '05',
    question: 'How does ABX engage entire buying committees?',
    answer:
      'Enterprise deals involve an average of 6-10 stakeholders. We map each persona—from technical evaluators and end-users to financial gatekeepers and C-suite champions—and deliver tailored content that answers each role’s unique evaluation criteria.',
  },
  {
    id: 'faq-6',
    num: '06',
    question: 'What channels are used during an ABX program?',
    answer:
      'We orchestrate synchronized touches across personalized 1:1 email sequences, LinkedIn executive outreach, high-impact content syndication, tailored digital aircover, peer roundtables, and direct tele-discovery.',
  },
  {
    id: 'faq-7',
    num: '07',
    question: 'How do you measure ABX performance and ROI?',
    answer:
      'Key metrics include account engagement velocity, buying committee coverage percentage, meeting conversion rates, opportunity win rates, enterprise deal sizes (ACV), and overall pipeline acceleration.',
  },
  {
    id: 'faq-8',
    num: '08',
    question: 'Does ABX help with account retention and expansion?',
    answer:
      'Yes. ABX applies to the entire customer lifecycle. Post-sale, we use account intelligence to identify cross-sell opportunities, drive executive sponsor check-ins, and build multi-division advocacy.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section
      id="abx-faq"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-background border-t border-b border-border transition-colors duration-300"
      aria-label="Frequently Asked Questions about ABX Services"
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-primary uppercase">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
            <span>Got Questions About </span>
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              ABX Services?
            </span>
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-surface border-primary/50 shadow-md'
                    : 'bg-surface/50 border-border hover:border-border/80'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-xs font-mono font-bold text-primary shrink-0">
                      {faq.num}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-text-primary">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/40 mt-1">
                        {faq.answer}
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

export default FAQ

