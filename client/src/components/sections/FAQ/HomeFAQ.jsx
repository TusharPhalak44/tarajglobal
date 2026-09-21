import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageSquare, ArrowRight, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'How does Taraj Global guarantee 99.8% B2B data accuracy?',
    a: 'We combine algorithmic intent intelligence with rigorous multi-tier human validation. Every target account, direct-dial phone number, and verified email address is tested in real-time against SMTP ping protocols and LinkedIn corporate records prior to campaign dispatch, guaranteeing virtually zero bounce rates.',
  },
  {
    q: 'What is the difference between MQL, BANT, and Appointment Setting services?',
    a: 'MQL (Marketing Qualified Leads) targets prospects exhibiting high engagement with your whitepapers and content. BANT Lead Generation qualifies prospects across defined Budget, Authority, Need, and Timeline parameters. B2B Appointment Setting goes a step further by securing confirmed, double-opted calendar meetings directly between key decision-makers and your sales closers.',
  },
  {
    q: 'How quickly can our growth campaign go live?',
    a: 'Most dedicated campaigns are fully calibrated, mapped to your ICP, and active within 48 to 72 hours. Our rapid-launch methodology includes CRM webhook configuration, audience segmentation, email warmup verification, and custom messaging approval.',
  },
  {
    q: 'How does lead handoff and CRM integration work?',
    a: 'We push verified prospect intelligence, contact details, and scheduled calendar invites directly into your CRM (Salesforce, HubSpot, Pipedrive, Marketo, Outreach, etc.) via encrypted webhooks or API relays in real-time, complete with call notes and buyer context.',
  },
  {
    q: 'Which geographies and markets do you cover?',
    a: 'We execute multi-lingual and localized B2B campaigns globally, with core specialization across North America (USA & Canada), EMEA (UK, Germany, France, Nordics), APAC (Australia, Singapore, India), and Latin America.',
  },
]

export const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-label="Frequently Asked Questions">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/8 dark:bg-[#00A6FF]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="relative text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="flex items-center justify-center gap-2 mb-3.5">
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary/70 dark:text-[#00E5FF]/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                Common Questions
              </span>
            </div>

            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-cta/70 dark:text-orange-400/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight leading-[1.16] overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
                Questions
              </span>
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-normal">
            Everything you need to know about our data accuracy, qualification frameworks, and campaign execution.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-[#00E5FF] to-cta mx-auto rounded-full mt-6" />
        </div>

        {/* ── Interactive Glass Accordion ───────────────────────────────── */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-surface dark:bg-[#0B0F19] border-primary/70 shadow-[0_10px_30px_-5px_rgba(0,102,204,0.15)] dark:shadow-[0_8px_25px_-5px_rgba(0,166,255,0.25)]'
                    : 'bg-surface/80 dark:bg-white/5 border-border/70 dark:border-white/10 hover:border-primary/40'
                }`}
              >
                {/* Question Trigger Button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-extrabold text-text-primary tracking-tight leading-snug">
                    {faq.q}
                  </span>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isOpen 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                  </div>
                </button>

                {/* Animated Collapsible Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-black/5 dark:border-white/5 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Support Callout Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-surface to-cta/10 border border-border/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
              <MessageSquare size={18} />
            </div>
            <div>
              <div className="text-sm font-extrabold text-text-primary">
                Have a specific question about your sales pipeline?
              </div>
              <div className="text-xs text-text-muted">
                Our demand generation specialists are ready to discuss your ICP.
              </div>
            </div>
          </div>

          <a
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-cta text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Ask Our Team</span>
            <ArrowRight size={13} />
          </a>
        </div>

      </div>
    </section>
  )
}

export default HomeFAQ
