import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const EDITORIAL_SERVICES = [
  {
    num: '01',
    title: 'SQL',
    subtitle: 'Sales Qualified Lead',
    link: '/sql-services',
  },
  {
    num: '02',
    title: 'BANT',
    subtitle: 'Buyer qualification based on intent',
    link: '/bant-lead-generation',
  },
  {
    num: '03',
    title: 'MQL',
    subtitle: 'Marketing Qualified Leads',
    link: '/mql-services',
  },
  {
    num: '04',
    title: 'HQL',
    subtitle: 'High-Quality Leads with verified intent',
    link: '/hql-services',
  },
  {
    num: '05',
    title: 'APPOINTMENT SETTING',
    subtitle: 'Connect with decision-makers',
    link: '/b2b-appointment-setting',
  },
  {
    num: '06',
    title: 'B2B EMAIL MARKETING',
    subtitle: 'Targeted outbound engagement',
    link: '/b2b-email-marketing',
  },
  {
    num: '07',
    title: 'ABM',
    subtitle: 'Account-based growth',
    link: '/abm',
  },
  {
    num: '08',
    title: 'CONTENT SYNDICATION',
    subtitle: 'Reach high-intent audiences',
    link: '/content-syndication',
  },
  {
    num: '09',
    title: 'WEBINARS',
    subtitle: 'Build engagement and authority',
    link: '/webinar-services',
  },
  {
    num: '10',
    title: 'LEAD NURTURING',
    subtitle: 'Move prospects toward conversion',
    link: '/lead-nurturing',
  },
  {
    num: '11',
    title: 'DEMAND GENERATION',
    subtitle: 'Build predictable pipeline',
    link: '/demand-generation',
  },
  {
    num: '12',
    title: 'LIST BUILDING',
    subtitle: 'Build accurate prospect lists',
    link: '/b2b-list-building',
  },
  {
    num: '13',
    title: 'DATABASE CLEANSING',
    subtitle: 'Clean and enrich your database',
    link: '/database-cleansing',
  },
]

export default function EditorialServiceList() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      id="services-list"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden select-none"
      aria-label="Explore Our Services — Editorial Service List"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12]">
            Explore Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Services
            </span>
          </h2>
        </div>

        {/* ── FULL-WIDTH EDITORIAL SERVICE LIST (NO CARDS) ── */}
        <div className="divide-y divide-border/60 border-t border-b border-border/60">
          {EDITORIAL_SERVICES.map((srv, idx) => {
            const isHovered = hoveredIdx === idx
            return (
              <motion.div
                key={srv.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 * idx,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={srv.link}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative block py-7 sm:py-8 lg:py-9 transition-all duration-300 ${
                    isHovered ? 'translate-x-2.5 sm:translate-x-3' : 'translate-x-0'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-6">
                    {/* Left: Number & Title */}
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      {/* Number */}
                      <span
                        className={`font-mono text-sm sm:text-base font-bold transition-colors duration-300 ${
                          isHovered ? 'text-primary' : 'text-text-muted'
                        }`}
                      >
                        {srv.num}
                      </span>

                      {/* Main Service Title */}
                      <h3
                        className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight transition-colors duration-300 ${
                          isHovered ? 'text-primary dark:text-[#38BDF8]' : 'text-text-primary'
                        }`}
                      >
                        {srv.title}
                      </h3>
                    </div>

                    {/* Right: Subtitle & Outbound Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 pl-12 sm:pl-0">
                      <span
                        className={`text-sm sm:text-base transition-colors duration-300 ${
                          isHovered
                            ? 'text-text-primary font-medium'
                            : 'text-text-secondary font-normal'
                        }`}
                      >
                        {srv.subtitle}
                      </span>

                      <div className="flex items-center justify-center w-7 h-7 text-text-muted transition-all duration-300 group-hover:text-primary">
                        <ArrowUpRight
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isHovered ? 'translate-x-1 -translate-y-0.5' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Animated Thin Blue Line Underneath on Hover */}
                  <div
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-500 origin-left ${
                      isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
