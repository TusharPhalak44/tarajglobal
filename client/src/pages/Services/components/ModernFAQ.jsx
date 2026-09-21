import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import CyberButton from './CyberButton'

const FAQS = [
  {
    topic: 'SCOPE',
    q: 'What B2B services does Taraj Global provide?',
    a: 'Taraj Global provides end-to-end B2B growth solutions across the entire revenue funnel: Demand Generation, ABM, MQL/SQL Generation, BANT Lead Qualification, B2B Appointment Setting, Cold Email Marketing, Content Syndication, Webinar Services, Lead Nurturing, B2B List Building, and Database Cleansing.',
  },
  {
    topic: 'METHODOLOGY',
    q: 'How does your B2B lead generation process work?',
    a: 'We combine rigorous ICP targeting, real-time intent telemetry, and direct-dial data validation with multi-channel personalized outreach. Rather than relying on static databases, our team identifies active buying committees and engages decision-makers across email, phone, and content before gating leads through strict criteria.',
  },
  {
    topic: 'QUALIFICATION',
    q: 'What is the difference between MQL, BANT and SQL?',
    a: 'MQL (Marketing Qualified Leads) captures prospects actively engaging with technical content and thought leadership assets. BANT leads are vetted across Budget, Authority, Need, and Timeline parameters. SQL (Sales Qualified Leads) represents high-intent prospects with validated commercial challenges who have confirmed exploratory sales meetings.',
  },
  {
    topic: 'CUSTOMIZATION',
    q: 'Can services be customized around our ICP?',
    a: 'Yes, 100%. Every campaign is custom-configured around your exact Ideal Customer Profile (ICP), including industry verticals, annual revenue brackets, corporate headcount, geographic locations, and target technographic installations.',
  },
  {
    topic: 'QUALITY SLA',
    q: 'How do you ensure lead quality?',
    a: 'We guarantee a 99.8% Data Accuracy SLA. Every record undergoes automated SMTP handshakes, LinkedIn profile confirmation, and secondary human-in-the-loop validation prior to outreach, guaranteeing virtually zero bounce rates and confirmed stakeholder identities.',
  },
  {
    topic: 'TIMELINE',
    q: 'How can I get started with Taraj Global?',
    a: 'Getting started is straightforward. Connect with our pipeline team via the contact form or schedule a discovery consultation. We review your ICP, current sales targets, and timeline to propose a calibrated growth pilot within 48 to 72 hours.',
  },
]

export default function ModernFAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden select-none"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #020306 0%, #060e20 50%, #020306 100%)'
          : 'linear-gradient(180deg, #f8fafd 0%, #edf4fc 50%, #f8fafd 100%)',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      aria-label="Frequently Asked Questions"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT: Section Headline & Support Card */}
          <div className="lg:col-span-5 lg:sticky top-28">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-5"
              style={{
                background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(0, 102, 204, 0.08)',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
                color: isDark ? '#38BDF8' : '#0066CC',
              }}
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              Common{' '}
              <span
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #38BDF8 0%, #00A6FF 50%, #FF6D00 100%)'
                    : 'linear-gradient(135deg, #0066CC 0%, #0284C7 50%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Questions
              </span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
              Everything you need to know about our growth services, SLA guarantees, qualification criteria, and onboarding timeline.
            </p>

            {/* Support Quick Contact Box with CyberButton */}
            <div
              className="p-7 rounded-3xl border backdrop-blur-xl"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(8, 12, 24, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%)',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(0, 102, 204, 0.2)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(0, 102, 204, 0.1)',
                    color: isDark ? '#38BDF8' : '#0066CC',
                  }}
                >
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="font-bold text-base" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                  Have a specific question?
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-5" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                Our growth strategists are ready to review your exact TAM and answer technical questions.
              </p>
              <CyberButton
                to="/contact"
                variant="primary"
                size="sm"
                fullWidth={true}
              >
                Talk with an Expert
              </CyberButton>
            </div>
          </div>

          {/* RIGHT: Accordion Cards with Left Glowing Indicator */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx

              return (
                <div
                  key={idx}
                  className="rounded-2xl transition-all duration-300 overflow-hidden relative"
                  style={{
                    background: isDark
                      ? isOpen ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.02)'
                      : isOpen ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.65)',
                    border: isOpen
                      ? isDark ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(0, 102, 204, 0.35)'
                      : isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isOpen
                      ? isDark ? '0 10px 30px -10px rgba(0, 166, 255, 0.25)' : '0 10px 30px -10px rgba(0, 102, 204, 0.1)'
                      : 'none',
                  }}
                >
                  {/* Left glowing neon accent line when expanded */}
                  {isOpen && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                      style={{ background: 'linear-gradient(180deg, #38BDF8, #00A6FF)' }}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: isOpen ? '#38BDF8' : (isDark ? '#64748B' : '#94A3B8') }}>
                        // {faq.topic}
                      </span>
                      <span
                        className="text-base sm:text-lg font-bold tracking-tight pr-2"
                        style={{ color: isOpen ? (isDark ? '#38BDF8' : '#0066CC') : (isDark ? '#FFFFFF' : '#0F172A') }}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: isOpen
                          ? isDark ? '#38BDF8' : '#0066CC'
                          : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        color: isOpen ? (isDark ? '#05070d' : '#FFFFFF') : (isDark ? '#94A3B8' : '#64748B'),
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div
                          className="px-6 pb-6 pt-2 text-sm sm:text-base leading-relaxed border-t ml-2"
                          style={{
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                            color: isDark ? '#CBD5E1' : '#475569',
                          }}
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
