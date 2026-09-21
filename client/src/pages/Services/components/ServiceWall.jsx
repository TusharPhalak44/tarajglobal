import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Zap, Target, Mail, PhoneCall } from 'lucide-react'

const WALL_CATEGORIES = [
  {
    num: '01',
    title: 'GENERATE',
    subtitle: 'Audience Definition & Data Pipeline',
    accent: '#00A6FF',
    icon: Target,
    direction: -30,
    services: [
      {
        name: 'Demand Generation',
        link: '/demand-generation',
        desc: 'Omnichannel B2B campaigns that ignite early buyer interest.',
      },
      {
        name: 'B2B List Building',
        link: '/b2b-list-building',
        desc: 'Custom-built prospect databases mapped to exact buyer criteria.',
      },
      {
        name: 'Database Cleansing',
        link: '/database-cleansing',
        desc: 'Eliminating duplicate, obsolete and decaying prospect records.',
      },
    ],
  },
  {
    num: '02',
    title: 'ENGAGE',
    subtitle: 'Direct Buyer Touchpoints & Content',
    accent: '#FF6D00',
    icon: Mail,
    direction: 30,
    services: [
      {
        name: 'B2B Email Marketing',
        link: '/b2b-email-marketing',
        desc: 'Personalized 1-on-1 cold outreach engineered for high inbox rates.',
      },
      {
        name: 'Content Syndication',
        link: '/content-syndication',
        desc: 'Promoting whitepapers and case studies to verified decision-makers.',
      },
      {
        name: 'B2B Webinar Services',
        link: '/webinar-services',
        desc: 'Live digital events driving real-time audience qualification.',
      },
    ],
  },
  {
    num: '03',
    title: 'QUALIFY',
    subtitle: 'Intent Scoring & Opportunity Gating',
    accent: '#FFA600',
    icon: Zap,
    direction: -30,
    services: [
      {
        name: 'Marketing Qualified Leads (MQL)',
        link: '/mql-services',
        desc: 'Engaged prospects actively consuming your content.',
      },
      {
        name: 'BANT Lead Generation',
        link: '/bant-lead-generation',
        desc: 'Rigorously vetted across Budget, Authority, Need, and Timeline.',
      },
      {
        name: 'Sales Qualified Leads (SQL)',
        link: '/sql-services',
        desc: 'High-intent accounts prepared for live sales discussions.',
      },
    ],
  },
  {
    num: '04',
    title: 'CONVERT',
    subtitle: 'Executive Meetings & Revenue Acceleration',
    accent: '#72D669',
    icon: PhoneCall,
    direction: 30,
    services: [
      {
        name: 'B2B Appointment Setting',
        link: '/b2b-appointment-setting',
        desc: 'Confirmed sales meetings scheduled on your account executives’ calendars.',
      },
      {
        name: 'Account-Based Marketing (ABM)',
        link: '/abm',
        desc: 'Coordinated multi-channel coverage on high-value tier-1 accounts.',
      },
      {
        name: 'Lead Nurturing',
        link: '/lead-nurturing',
        desc: 'Systematic cadences that convert cold leads into active buyers.',
      },
    ],
  },
]

export default function ServiceWall() {
  const wallRef = useRef(null)
  const isInView = useInView(wallRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={wallRef}
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden"
      aria-label="Service Wall Categories"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>ARCHITECTURAL TAXONOMY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12] mb-4">
            The Revenue Spectrum.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Organized by Stage.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            A comprehensive overview of capabilities tailored to every phase of account acquisition, engagement, and pipeline expansion.
          </p>
        </div>

        {/* 4 Generous Horizontal Category Rows (NO Cards, Pure Editorial Wall) */}
        <div className="space-y-12 sm:space-y-16">
          {WALL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.num}
                initial={{ opacity: 0, x: cat.direction }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : cat.direction }}
                transition={{ duration: 0.75, delay: 0.15 + idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative pb-10 sm:pb-14 border-b border-border/70 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Category Header: Number & Big Typographic Stage Title */}
                  <div className="lg:col-span-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-text-muted">
                          {cat.num}
                        </span>
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cat.accent }}
                        />
                        <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-muted">
                          STAGE {cat.num}
                        </span>
                      </div>

                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-none mb-3">
                        {cat.title}
                      </h3>

                      <p className="text-sm font-mono text-text-secondary">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-2 mt-8 text-xs font-mono text-text-muted">
                      <Icon className="w-4 h-4 text-primary" />
                      <span>3 VERIFIED CORE ENGINES</span>
                    </div>
                  </div>

                  {/* Category Services: Editorial 3-Column List with Direct Links */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
                    {cat.services.map((srv) => (
                      <Link
                        key={srv.name}
                        to={srv.link}
                        className="group/item relative flex flex-col justify-between p-4 -m-4 rounded-xl hover:bg-surface/50 transition-colors duration-200"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight transition-colors duration-200 group-hover/item:text-primary">
                              {srv.name}
                            </h4>
                            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover/item:text-primary transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 shrink-0 mt-1" />
                          </div>

                          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                            {srv.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-mono text-primary font-semibold opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                          <span>Explore Capability</span>
                          <span>→</span>
                        </div>
                      </Link>
                    ))}
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
