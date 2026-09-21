import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const industriesData = [
  {
    name: 'SaaS & Cloud Platforms',
    short: 'SAAS',
    size: 'large', // col-span-2 row-span-2 or similar
    tag: 'HIGH GROWTH',
    description: 'Targeting IT directors and engineering heads evaluating developer tooling, ERPs, and workflow infrastructure.',
    metric: '4.2x Faster Deal Velocity',
    image: '/sql-lead-qualification-journey.jpg',
  },
  {
    name: 'Cybersecurity & Infosec',
    short: 'CYBERSECURITY',
    size: 'small',
    tag: 'STRICT BANT',
    description: 'Connecting security vendors directly with CISOs, SecOps directors, and compliance officers.',
    metric: '99.8% Title Accuracy',
    image: '/enterprise-audience.jpg',
  },
  {
    name: 'Enterprise Technology',
    short: 'TECHNOLOGY',
    size: 'medium',
    tag: 'MARKET SCALE',
    description: 'Hardware, microservices, and AI-enabled software penetration across enterprise Tier-1 accounts.',
    metric: '$120K+ Average Deal Size',
    image: '/demandflow-campaigns.png',
  },
  {
    name: 'Cloud & DevOps Infrastructure',
    short: 'CLOUD',
    size: 'medium',
    tag: 'TECH STACK ICP',
    description: 'AWS, Azure, and GCP ecosystem targeting based on verified technographic installations.',
    metric: '32% Conversion Rate',
    image: '/sql-lead-qualification-journey.jpg',
  },
  {
    name: 'Telecommunications & Networks',
    short: 'TELECOM',
    size: 'small',
    tag: 'CONNECTIVITY',
    description: 'Carrier solutions, enterprise fiber, SD-WAN, and IoT infrastructure sales pipeline.',
    metric: 'Global Coverage',
    image: '/b2b-appointment-setting-journey.jpg',
  },
  {
    name: 'IT Services & Managed Consulting',
    short: 'IT SERVICES',
    size: 'medium',
    tag: 'CONSULTING',
    description: 'System integrators and outsourced software development partners securing RFP appointments.',
    metric: 'Consistent MQLs',
    image: '/enterprise-audience.jpg',
  },
  {
    name: 'Professional & Financial Services',
    short: 'PROFESSIONAL SERVICES',
    size: 'small',
    tag: 'FINANCE & LEGAL',
    description: 'B2B fintech, corporate advisory, and risk consulting outreach to CFOs and Managing Partners.',
    metric: 'High Net-Worth ICP',
    image: '/demandflow-campaigns.png',
  },
]

export const GalleryIndustryMosaic = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      id="industry-mosaic"
      className="relative py-28 md:py-36 px-6 md:px-14 lg:px-20 bg-background text-text-primary border-b border-border/40 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
              [SECTION 12 // INDUSTRY MOSAIC]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-[1.0]">
              PROVEN ACROSS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-secondary">
                SECTOR HORIZONS.
              </span>
            </h2>
          </div>
          <div className="max-w-xs text-text-muted text-xs md:text-sm font-sans leading-relaxed">
            Asymmetric mosaic tiles tailored to the specific buying nuances of each vertical.
          </div>
        </div>

        {/* ASYMMETRIC TILE MOSAIC (Not equal cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          {industriesData.map((ind, idx) => {
            const isHovered = hoveredIdx === idx

            // Determine size span classes
            let spanClass = 'col-span-1 row-span-1'
            if (ind.size === 'large') {
              spanClass = 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2'
            } else if (ind.size === 'medium') {
              spanClass = 'col-span-1 md:col-span-1 lg:col-span-2 row-span-1'
            }

            return (
              <div
                key={ind.short}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative rounded-2xl border transition-all duration-500 overflow-hidden p-6 md:p-8 flex flex-col justify-between cursor-pointer ${spanClass} ${
                  isHovered
                    ? 'border-primary shadow-2xl scale-[1.01] z-10'
                    : 'border-border/70 hover:border-primary/50 bg-surface/40'
                }`}
                data-cursor-label="SECTOR"
              >
                {/* Background visual changes on hover */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isHovered ? 'opacity-30' : 'opacity-0'
                  }`}
                >
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                {/* Top Row: Tag & Index */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                    [{ind.tag}]
                  </span>
                  <span className="font-mono text-[10px] text-text-muted">
                    0{idx + 1}
                  </span>
                </div>

                {/* Middle: Industry Title */}
                <div className="relative z-10 my-auto">
                  <h3
                    className={`font-black uppercase tracking-tight transition-colors duration-300 leading-tight ${
                      ind.size === 'large'
                        ? 'text-2xl sm:text-3xl md:text-4xl'
                        : 'text-lg sm:text-xl md:text-2xl'
                    } ${isHovered ? 'text-primary' : 'text-text-primary'}`}
                  >
                    {ind.name}
                  </h3>

                  {/* Description appears on hover or always for large */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isHovered || ind.size === 'large'
                        ? 'max-h-24 opacity-100 mt-2'
                        : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <p className="text-xs text-text-secondary font-sans leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Metric & Arrow */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-border/40 font-mono text-xs">
                  <span className="text-primary font-semibold tracking-wider">
                    {ind.metric}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:rotate-45 transition-all" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GalleryIndustryMosaic
