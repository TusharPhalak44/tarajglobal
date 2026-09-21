import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const categoryColumns = [
  {
    id: 'generate',
    title: 'GENERATE',
    index: '01',
    description: 'Top-of-funnel demand capture, contact list acquisition, and intent mapping.',
    services: [
      { name: 'Lead Generation', url: '/sql-services', tag: 'PIPELINE' },
      { name: 'MQL Services', url: '/mql-services', tag: 'AWARENESS' },
      { name: 'BANT Lead Generation', url: '/bant-lead-generation', tag: 'QUALIFICATION' },
      { name: 'B2B List Building', url: '/b2b-list-building', tag: 'DATA' },
      { name: 'Database Cleansing', url: '/database-cleansing', tag: 'HYGIENE' },
    ],
  },
  {
    id: 'engage',
    title: 'ENGAGE',
    index: '02',
    description: 'Multi-touch syndication, executive email cadences, and content distribution.',
    services: [
      { name: 'B2B Email Marketing', url: '/b2b-email-marketing', tag: 'OUTREACH' },
      { name: 'Content Syndication', url: '/content-syndication', tag: 'AUTHORITY' },
      { name: 'B2B Webinar Services', url: '/webinar-services', tag: 'EVENTS' },
      { name: 'Lead Nurturing', url: '/lead-nurturing', tag: 'RETENTION' },
    ],
  },
  {
    id: 'convert',
    title: 'CONVERT',
    index: '03',
    description: 'Executive meetings, Tier-1 account penetration, and closed-won acceleration.',
    services: [
      { name: 'B2B Appointment Setting', url: '/b2b-appointment-setting', tag: 'EXECUTIVE MEETINGS' },
      { name: 'Account-Based Marketing', url: '/abm', tag: 'TIER-1 ABM' },
      { name: 'Demand Generation', url: '/demand-generation', tag: 'REVENUE ENGINE' },
    ],
  },
]

export const GalleryCategoryWall = () => {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section
      id="category-wall"
      className="relative py-28 md:py-36 px-6 md:px-14 lg:px-20 bg-background text-text-primary border-b border-border/40 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
              [SECTION 06 // CATEGORY WALL]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-[1.0]">
              WHAT PART OF YOUR PIPELINE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-secondary">
                NEEDS TO MOVE?
              </span>
            </h2>
          </div>
          <div className="max-w-xs text-text-muted text-xs md:text-sm font-sans leading-relaxed">
            Hover or tap any primary pipeline verb to inspect its dedicated execution clusters.
          </div>
        </div>

        {/* 3 HUGE HORIZONTAL WORDS ACCORDION / SLIDE-IN (No cards!) */}
        <div className="divide-y divide-border/60 border-y border-border/60">
          {categoryColumns.map((cat, idx) => {
            const isActive = activeCategory === idx

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategory(idx)}
                className={`transition-colors duration-500 py-8 md:py-12 ${
                  isActive ? 'bg-surface/30' : 'bg-transparent'
                }`}
                data-cursor-label="CATEGORY"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  {/* LEFT: Index and Massive Interactive Word */}
                  <div className="flex items-baseline gap-6 md:gap-12 cursor-pointer">
                    <span className="font-mono text-sm md:text-base text-text-muted tracking-widest">
                      /{cat.index}
                    </span>
                    <h3
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase transition-all duration-500 ${
                        isActive
                          ? 'text-primary translate-x-3 scale-[1.02]'
                          : 'text-text-primary/70 hover:text-text-primary'
                      }`}
                    >
                      {cat.title}
                    </h3>
                  </div>

                  {/* RIGHT: Slide-in Services Stream (NO CARDS - Pure typography stream) */}
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <p className="text-xs md:text-sm text-text-muted font-sans mb-4 max-w-lg">
                      {cat.description}
                    </p>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {cat.services.map((srv) => (
                        <Link
                          key={srv.name}
                          to={srv.url}
                          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/70 bg-surface/50 hover:bg-surface hover:border-primary transition-all duration-300"
                        >
                          <span className="text-xs md:text-sm font-semibold uppercase tracking-wide text-text-primary group-hover:text-primary transition-colors">
                            {srv.name}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted group-hover:text-primary transition-colors">
                            [{srv.tag}]
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GalleryCategoryWall
