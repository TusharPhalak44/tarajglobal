import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import TarajButton from './TarajButton'

const FAQS = [
  {
    topic: 'SCOPE & SOLUTIONS',
    q: 'What B2B services does Taraj Global provide?',
    a: 'Taraj Global provides end-to-end B2B growth solutions across the entire revenue funnel: Demand Generation, ABM, MQL/SQL Generation, BANT Lead Qualification, B2B Appointment Setting, Cold Email Marketing, Content Syndication, Webinar Services, Lead Nurturing, B2B List Building, and Database Cleansing.',
  },
  {
    topic: 'METHODOLOGY & TARGETING',
    q: 'How does your B2B lead generation process work?',
    a: 'We combine rigorous ICP targeting, real-time intent telemetry, and direct-dial data validation with multi-channel personalized outreach. Rather than relying on static databases, our team identifies active buying committees and engages decision-makers across email, phone, and content before gating leads through strict criteria.',
  },
  {
    topic: 'LEAD DEFINITIONS',
    q: 'What is the difference between MQL, BANT and SQL?',
    a: 'MQL (Marketing Qualified Leads) captures prospects actively engaging with technical content and thought leadership assets. BANT leads are vetted across Budget, Authority, Need, and Timeline parameters. SQL (Sales Qualified Leads) represents high-intent prospects with validated commercial challenges who have confirmed exploratory sales meetings.',
  },
  {
    topic: 'CUSTOM ICP CONFIGURATION',
    q: 'Can services be customized around our ICP?',
    a: 'Yes, 100%. Every campaign is custom-configured around your exact Ideal Customer Profile (ICP), including industry verticals, annual revenue brackets, corporate headcount, geographic locations, and target technographic installations.',
  },
  {
    topic: 'QUALITY & SLA GUARANTEES',
    q: 'How do you ensure lead quality?',
    a: 'We guarantee a 99.8% Data Accuracy SLA. Every record undergoes automated SMTP handshakes, LinkedIn profile confirmation, and secondary human-in-the-loop validation prior to outreach, guaranteeing virtually zero bounce rates and confirmed stakeholder identities.',
  },
  {
    topic: 'PILOT ONBOARDING',
    q: 'How can I get started with Taraj Global?',
    a: 'Getting started is straightforward. Connect with our pipeline team via the contact form or schedule a discovery consultation. We review your ICP, current sales targets, and timeline to propose a calibrated growth pilot within 48 to 72 hours.',
  },
]

export default function EditorialFAQModern() {
  const [openIdx, setOpenIdx] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section
      className="relative py-28 lg:py-40 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Frequently Asked Questions — Editorial FAQ"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT: Heading & Expert Support */}
          <div className="lg:col-span-5 lg:sticky top-32">
            <div
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              Common{' '}
              <span className="font-light italic">Inquiries.</span>
            </h2>

            <p className="text-base leading-relaxed mb-10 font-normal" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
              Everything you need to know about our growth services, SLA guarantees, qualification criteria, and pilot onboarding.
            </p>

            <TarajButton to="/contact" variant="secondary" size="md">
              Speak with a Strategist
            </TarajButton>
          </div>

          {/* RIGHT: Clean Editorial Accordion List */}
          <div className="lg:col-span-7 divide-y" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx

              return (
                <div key={idx} className="py-6 transition-colors duration-300">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full text-left flex items-start justify-between gap-6 cursor-pointer group"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase block mb-1.5" style={{ color: isOpen ? (isDark ? '#38BDF8' : '#0066CC') : (isDark ? '#52525B' : '#A1A1AA') }}>
                        // {faq.topic}
                      </span>
                      <span
                        className="text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200"
                        style={{
                          color: isOpen
                            ? isDark ? '#FFFFFF' : '#0B0F19'
                            : isDark ? '#A1A1AA' : '#374151',
                        }}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-transform duration-300"
                      style={{
                        borderColor: isOpen
                          ? isDark ? '#FFFFFF' : '#0B0F19'
                          : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
                        color: isOpen ? (isDark ? '#FFFFFF' : '#0B0F19') : (isDark ? '#71717A' : '#71717A'),
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <div
                          className="pt-4 text-sm sm:text-base leading-relaxed font-normal"
                          style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
                        >
                          {faq.a}
                        </div>
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
