import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'What B2B services does Taraj Global provide?',
    a: 'Taraj Global provides end-to-end B2B growth solutions across the entire revenue funnel: Demand Generation, ABM, MQL/SQL Generation, BANT Lead Qualification, B2B Appointment Setting, Cold Email Marketing, Content Syndication, Webinar Services, Lead Nurturing, B2B List Building, and Database Cleansing.',
  },
  {
    q: 'How does your B2B lead generation process work?',
    a: 'We combine rigorous ICP targeting, real-time intent telemetry, and direct-dial data validation with multi-channel personalized outreach. Rather than relying on static databases, our team identifies active buying committees and engages decision-makers across email, phone, and content before gating leads through strict criteria.',
  },
  {
    q: 'What is the difference between MQL, BANT and SQL?',
    a: 'MQL (Marketing Qualified Leads) captures prospects actively engaging with technical content and thought leadership assets. BANT leads are vetted across Budget, Authority, Need, and Timeline parameters. SQL (Sales Qualified Leads) represents high-intent prospects with validated commercial challenges who have confirmed exploratory sales meetings.',
  },
  {
    q: 'Can services be customized around our ICP?',
    a: 'Yes, 100%. Every campaign is custom-configured around your exact Ideal Customer Profile (ICP), including industry verticals, annual revenue brackets, corporate headcount, geographic locations, and target technographic installations.',
  },
  {
    q: 'How do you ensure lead quality?',
    a: 'We guarantee a 99.8% Data Accuracy SLA. Every record undergoes automated SMTP handshakes, LinkedIn profile confirmation, and secondary human-in-the-loop validation prior to outreach, guaranteeing virtually zero bounce rates and confirmed stakeholder identities.',
  },
  {
    q: 'How can I get started with Taraj Global?',
    a: 'Getting started is straightforward. Connect with our pipeline team via the contact form or schedule a discovery consultation. We review your ICP, current sales targets, and timeline to propose a calibrated growth pilot within 48 to 72 hours.',
  },
]

export default function EditorialFAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section
      className="relative py-24 lg:py-32 bg-background overflow-hidden select-none"
      aria-label="Frequently Asked Questions"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ══════════ LEFT COLUMN: Heading & Supporting Text ══════════ */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
              <span>CLEAR ANSWERS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12] mb-4">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
                Questions
              </span>
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-md">
              Everything you need to know about our execution methodology, lead qualification criteria, and onboarding timeline.
            </p>
          </div>

          {/* ══════════ RIGHT COLUMN: Clean Accordion List (No Large Boxes) ══════════ */}
          <div className="lg:col-span-7 divide-y divide-border/60 border-t border-b border-border/60">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx
              return (
                <div key={faq.q} className="py-6 sm:py-7">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                      {faq.q}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-border/70 flex items-center justify-center shrink-0 text-text-muted group-hover:text-primary transition-colors">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
