import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ArrowRight, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQS = [
  {
    q: 'What B2B services does Taraj Global offer?',
    a: 'Taraj Global delivers a complete suite of 12 B2B growth solutions covering Demand Generation, Account-Based Marketing (ABM), Sales Qualified Leads (SQL), BANT Lead Generation, Marketing Qualified Leads (MQL), B2B Appointment Setting, Cold Email Marketing, Content Syndication, Webinar Services, Lead Nurturing, B2B List Building, and Database Cleansing.',
  },
  {
    q: 'How do you ensure lead and data quality?',
    a: 'We back all outbound and data services with our 99.8% Data Accuracy SLA. Target records undergo triple-layer verification: live SMTP handshake tests, LinkedIn profile confirmation, and human-in-the-loop validation to ensure zero email bounces and authentic decision-maker phone connectivity.',
  },
  {
    q: 'What is the exact difference between MQL, BANT, and SQL?',
    a: 'MQL (Marketing Qualified Leads) captures decision-makers who downloaded high-value technical whitepapers or attended webinars. BANT leads are rigorously qualified across Budget, Authority, Need, and Timeline thresholds. SQL (Sales Qualified Leads) represents verified buyers with an immediate commercial requirement who have agreed to a live discovery meeting directly on your calendar.',
  },
  {
    q: 'How fast can a new campaign launch?',
    a: 'Most dedicated campaigns deploy within 7 to 14 business days. During this window, we calibrate your Ideal Customer Profile (ICP), set up secondary domain infrastructure with proper DKIM/SPF/DMARC warmup, draft and test value messaging variations, and configure CRM telemetry sync.',
  },
  {
    q: 'What happens if a qualified lead does not show up for the meeting?',
    a: 'We provide an explicit No-Show Replacement Guarantee. If a scheduled prospect cancels or does not attend the confirmed discovery session, our outreach team coordinates rescheduling or replaces the lead at zero additional cost.',
  },
  {
    q: 'Can these services be customized around our specific tech stack and TAM?',
    a: 'Yes, 100%. Every program is custom-scoped around your exact target market, including annual revenue brackets, corporate headcount, headquarters geography, and technographic installations (e.g. AWS, Salesforce, Snowflake, or Kubernetes adoption).',
  },
]

export default function DevServicesFAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section
      id="dev-services-faq"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Consultation CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>QUESTIONS & TECHNICAL ANSWERS</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
                Everything You Need To Know <br />
                <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
                  About Our Engagements
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                Got a custom requirement or specialized procurement question? Our senior growth architects are available for direct discovery calls.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-2xl border border-border/80 bg-surface/80">
              <h3 className="text-base font-bold text-text-primary uppercase mb-2">
                Have a Specific SLA Question?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Schedule a 20-minute architecture review with our campaign operations team.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors"
              >
                <span>Talk To An Architect</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-7 divide-y divide-border/70 border-y border-border/70">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx

              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 text-text-muted group-hover:border-primary group-hover:text-primary transition-colors">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
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
