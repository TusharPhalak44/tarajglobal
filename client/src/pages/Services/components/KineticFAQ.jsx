import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQ_ITEMS = [
  {
    q: 'What B2B services does Taraj Global provide?',
    a: 'Taraj Global provides 12 specialized B2B revenue solutions covering Demand Generation, Account-Based Marketing (ABM), Sales Qualified Leads (SQL), BANT Lead Generation, Marketing Qualified Leads (MQL), B2B Appointment Setting, Cold Email Marketing, Content Syndication, Webinar Services, Lead Nurturing, B2B List Building, and Database Cleansing.',
  },
  {
    q: 'How do you ensure lead data accuracy and compliance?',
    a: 'All data and outbound solutions are governed by our 99.8% Data Accuracy SLA. Records undergo automated SMTP validation, LinkedIn profile verification, and human verification before outreach initiates. We are 100% compliant with GDPR, CCPA, and CAN-SPAM regulations.',
  },
  {
    q: 'What is the exact difference between MQL, BANT, and SQL?',
    a: 'MQLs capture prospects engaging with technical whitepapers or webinars. BANT leads are rigorously qualified across Budget, Authority, Need, and Timeline thresholds. SQLs represent verified decision-makers who have explicit commercial requirements and have confirmed live discovery meetings with your account executives.',
  },
  {
    q: 'What is your No-Show Replacement Guarantee?',
    a: 'If a scheduled prospect fails to attend the confirmed discovery call or cancels without notice, our outreach team coordinates rescheduling or delivers a replacement lead at zero extra cost.',
  },
  {
    q: 'How fast can our campaign go live?',
    a: 'Typical campaign launch is 7 to 14 business days. During this ramp, we calibrate your Ideal Customer Profile (ICP), establish isolated secondary domain infrastructure with full warmup, draft A/B tested messaging, and configure CRM routing.',
  },
]

export default function KineticFAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section
      id="kinetic-faq"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden select-none"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Consultation CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
                Clear Answers For <br />
                <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
                  Growth Leaders
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                Everything you need to know about our campaign scoping, SLAs, and technical execution.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-2xl border border-border/80 bg-surface/80">
              <h3 className="text-base font-bold text-text-primary uppercase mb-2">
                Need a Custom Scope Review?
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
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openIdx === idx

              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
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
