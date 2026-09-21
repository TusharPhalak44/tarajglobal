import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const STAGES = [
  {
    num: '01',
    title: 'CREATE DEMAND',
    desc: 'Capture early buyer attention and establish brand authority across target accounts long before active buying cycles commence.',
    services: [
      { name: 'Demand Generation', link: '/demand-generation' },
      { name: 'List Building', link: '/b2b-list-building' },
      { name: 'Content Syndication', link: '/content-syndication' },
    ],
  },
  {
    num: '02',
    title: 'CREATE ENGAGEMENT',
    desc: 'Foster meaningful 1-on-1 conversations through personalized direct email cadences, thought leadership webinars, and dedicated ABM air-cover.',
    services: [
      { name: 'Email Marketing', link: '/b2b-email-marketing' },
      { name: 'Webinars', link: '/webinar-services' },
      { name: 'ABM', link: '/abm' },
      { name: 'Lead Nurturing', link: '/lead-nurturing' },
    ],
  },
  {
    num: '03',
    title: 'CREATE PIPELINE',
    desc: 'Gate prospects rigorously across intent, budget, and timeline parameters to deliver sales-ready opportunities and confirmed meetings.',
    services: [
      { name: 'MQL', link: '/mql-services' },
      { name: 'BANT', link: '/bant-lead-generation' },
      { name: 'SQL', link: '/sql-services' },
      { name: 'Appointment Setting', link: '/b2b-appointment-setting' },
    ],
  },
]

export default function FeaturedStages() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden select-none"
      aria-label="Built for Every Stage of B2B Growth"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>FULL-FUNNEL ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12]">
            Built for Every Stage of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              B2B Growth.
            </span>
          </h2>
        </div>

        {/* ── THREE LARGE HORIZONTAL AREAS (NO CARDS, SUBTLE BORDERS) ── */}
        <div className="space-y-12 sm:space-y-16">
          {STAGES.map((stage, idx) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
              transition={{ duration: 0.65, delay: 0.15 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="pb-12 sm:pb-16 border-b border-border/60"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                
                {/* Left: Number & Large Title */}
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs sm:text-sm font-bold text-primary block mb-2">
                    {stage.num}
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-none mb-4">
                    {stage.title}
                  </h3>
                </div>

                {/* Center: Short Strategic Narrative */}
                <div className="lg:col-span-5">
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </div>

                {/* Right: Small Service List */}
                <div className="lg:col-span-3 flex flex-col space-y-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted mb-1">
                    KEY CAPABILITIES
                  </span>
                  {stage.services.map((srv) => (
                    <Link
                      key={srv.name}
                      to={srv.link}
                      className="group/link inline-flex items-center justify-between text-sm sm:text-base font-semibold text-text-primary hover:text-primary transition-colors duration-200"
                    >
                      <span>{srv.name}</span>
                      <ArrowRight className="w-4 h-4 text-text-muted group-hover/link:text-primary transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
