import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Layers, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { ArrowRevealButton } from './UniverseButtons'

/**
 * InteractiveCardDeck — 06 INTERACTIVE SERVICE CARDS
 * Stacked vertical cards overlapping in a "deck of cards" presentation:
 * CARD 01 B2B LEAD GENERATION
 * CARD 02 ABM
 * CARD 03 DEMAND GENERATION
 * CARD 04 APPOINTMENT SETTING
 * Active card expands, image appears, content reveals, border animates, CTA appears.
 */

const DECK_CARDS = [
  {
    id: 'lead-gen',
    cardNum: 'CARD 01',
    title: 'B2B Lead Generation',
    tagline: 'High-Velocity Sales Pipeline',
    desc: 'Custom-built outbound engines connecting sales reps with economic buyers who possess validated budget authority and immediate project timelines.',
    path: '/sql-services',
    image: '/sql-lead-qualification-journey.jpg',
    stats: '85%+ Show-Rate SLA',
    deliverable: 'Confirmed Discovery Meetings',
  },
  {
    id: 'abm',
    cardNum: 'CARD 02',
    title: 'Account-Based Marketing',
    tagline: 'Tier-1 Enterprise Account Penetration',
    desc: 'Align your marketing and revenue teams to execute orchestrated, hyper-personalized campaigns across senior buying committees.',
    path: '/abm',
    image: '/enterprise-audience.jpg',
    stats: 'Multi-Stakeholder Consensus',
    deliverable: 'Bespoke Account Telemetry',
  },
  {
    id: 'demand-gen',
    cardNum: 'CARD 03',
    title: 'Demand Generation',
    tagline: 'Full-Funnel Opportunity Inflow',
    desc: 'Drive sustainable brand authority, capture in-market research spikes, and convert lukewarm prospects into sales-qualified opportunities.',
    path: '/demand-generation',
    image: '/demandflow-campaigns.png',
    stats: '2,100+ Monthly Leads',
    deliverable: 'Omnichannel Inbound & Outbound',
  },
  {
    id: 'appt-setting',
    cardNum: 'CARD 04',
    title: 'B2B Appointment Setting',
    tagline: 'Calendar-Ready Executive Conversations',
    desc: 'Direct calendar integration to deliver confirmed introductory and technical discovery calls directly onto your account executives’ schedules.',
    path: '/b2b-appointment-setting',
    image: '/b2b-appointment-setting-journey.jpg',
    stats: 'Guaranteed Meeting Volumes',
    deliverable: 'Direct Sales Calendar Slots',
  },
]

export default function InteractiveCardDeck() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section
      id="service-card-deck"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#05070B' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
            />
            <span
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              06 // INTERACTIVE CARD DECK
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
          >
            Stacked For{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Execution
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Select any card in the deck to bring its strategic blueprint forward.
          </p>
        </div>

        {/* Deck Navigation Selector Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {DECK_CARDS.map((card, i) => {
            const isActive = activeIdx === i

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`px-4 py-2 rounded-md font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  isActive ? 'shadow-md scale-102' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? '#111622' : '#F8FAFC',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                  color: isActive
                    ? isDark ? '#090D15' : '#FFFFFF'
                    : isDark ? '#CBD5E1' : '#475569',
                }}
              >
                {card.cardNum} // {card.title}
              </button>
            )
          })}
        </div>

        {/* ══ Overlapping Stacked Deck ══ */}
        <div className="relative min-h-[500px]">
          {DECK_CARDS.map((card, index) => {
            const isActive = activeIdx === index
            const offset = (index - activeIdx) * 14

            return (
              <motion.div
                key={card.id}
                animate={{
                  y: isActive ? 0 : offset,
                  scale: isActive ? 1 : 0.98 - Math.abs(index - activeIdx) * 0.02,
                  zIndex: isActive ? 30 : 20 - index,
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIdx(index)}
                className={`p-6 sm:p-10 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive ? 'shadow-2xl' : 'absolute inset-0 pointer-events-none'
                }`}
                style={{
                  backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Card Content Column */}
                  <div className="lg:col-span-6">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b"
                      style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
                    >
                      <span
                        className="font-mono text-xs font-bold uppercase tracking-widest"
                        style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                      >
                        {card.cardNum} // DECK ELEVATION
                      </span>
                      <span className="font-mono text-xs font-semibold text-emerald-400">
                        {card.stats}
                      </span>
                    </div>

                    <h3
                      className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2"
                      style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
                    >
                      {card.title}
                    </h3>

                    <p
                      className="font-mono text-xs font-bold uppercase tracking-wider mb-4"
                      style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                    >
                      {card.tagline}
                    </p>

                    <p
                      className="text-base leading-relaxed font-normal mb-8"
                      style={{ color: isDark ? '#94A3B8' : '#475569' }}
                    >
                      {card.desc}
                    </p>

                    <div className="p-3.5 rounded-xl border mb-8 text-xs font-mono"
                      style={{
                        backgroundColor: isDark ? '#111622' : '#F8FAFC',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>KEY OUTPUT: </span>
                      <span className="font-bold" style={{ color: isDark ? '#FFFFFF' : '#090D15' }}>
                        {card.deliverable}
                      </span>
                    </div>

                    <div>
                      <ArrowRevealButton to={card.path}>
                        EXPLORE SERVICE →
                      </ArrowRevealButton>
                    </div>
                  </div>

                  {/* Card Visual Column */}
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border shadow-md"
                      style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                          background: isDark
                            ? 'linear-gradient(to top, rgba(13, 17, 23, 0.8) 0%, transparent 60%)'
                            : 'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 60%)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
