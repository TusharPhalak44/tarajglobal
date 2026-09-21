import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    q: 'How does TaRaj Global qualify leads before handing them over to our sales team?',
    a: 'Every prospect goes through a multi-layer validation protocol. We verify direct contact information (phone and SMTP handshake), evaluate real-time intent surge signals, and confirm BANT parameters (Budget, Authority, Need, and Timeline) with human sales development specialists before CRM routing.',
  },
  {
    q: 'What is your 100% replacement guarantee policy?',
    a: 'If any delivered lead fails agreed-upon BANT criteria, has invalid contact coordinates, or does not respond within our agreed SLA window, we replace that lead 1-for-1 at zero additional cost to your team. This commitment is written into every service agreement.',
  },
  {
    q: 'Can leads and meetings sync directly to our existing CRM and calendar tools?',
    a: 'Yes. We integrate natively with Salesforce, HubSpot, Zoho, and other major CRM platforms. For appointments, meetings are double-confirmed and synched directly to your sales reps’ Google or Outlook calendars with automated reminders to preserve high show-up rates.',
  },
  {
    q: 'What B2B industries and deal sizes do you cater to?',
    a: 'We specialize in B2B technology verticals including Enterprise SaaS, Cybersecurity, Cloud Infrastructure, Fintech, IT Managed Services, and Professional Advisory. Our programs are engineered for high-ACV deal sizes ranging from $25,000 to over $500,000.',
  },
  {
    q: 'How long does campaign onboarding take from contract to live outreach?',
    a: 'Standard campaign ramp takes 7 to 10 business days. During this onboarding phase, our team analyzes your TAM, maps out target buying committees, configures deliverability infrastructure (IP warming, DMARC/SPF), and crafts customized outreach cadences for your approval.',
  },
]

export default function ServicesFAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section
      id="services-faq-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Everything You Need To Know <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
              Before Getting Started
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-lg mx-auto">
            Transparent answers on our qualification process, SLAs, and technical onboarding.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left cursor-pointer gap-4 group"
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF6D00] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#FF6D00] border-[#FF6D00] text-black' : 'text-white/60'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-6 sm:px-7 pb-6 text-sm text-white/70 leading-relaxed font-normal border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
