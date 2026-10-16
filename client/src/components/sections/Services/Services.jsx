import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Target,
  Megaphone,
  Mail,
  CalendarCheck,
  Building2,
  Database,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Filter,
  CheckCircle2,
  PhoneCall,
  Layers,
  RefreshCw,
  Video,
  ChevronDown,
} from 'lucide-react'

// Helper to truncate text to clean word boundary for compact single-frame cards
const truncateText = (text, maxLength = 55) => {
  if (!text || text.length <= maxLength) return text
  const trimmed = text.slice(0, maxLength)
  const lastSpace = trimmed.lastIndexOf(' ')
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '...'
}

// 6 Core B2B Services mapped to exact coordinates on services.png (1672 x 941 whiteboard diagram)
export const SERVICES_DATA = [
  {
    id: 'email-outreach',
    title: 'AI-Enhanced B2B Email Outreach',
    description: 'Engage verified decision-makers through hyper-personalized email cadences validated by our custom deliverability engine and ICP targeting parameters.',
    route: '/b2b-email-marketing',
    icon: Target,
    cardRect: {
      left: '36.2%',
      top: '10.2%',
      width: '14.2%',
      height: '20.0%',
    },
    laserTarget: { x: 50.4, y: 26.0 },
    laserCurve: 'M 59.8 40.5 C 56.5 35.5, 53.0 30.5, 50.4 26.0',
  },
  {
    id: 'abm',
    title: 'Account-Based Marketing (ABM)',
    description: 'Orchestrate multi-channel ABM campaigns across key enterprise accounts in US and EMEA markets with real-time intent telemetry and committee calibration.',
    route: '/abm',
    icon: Megaphone,
    cardRect: {
      left: '52.2%',
      top: '8.0%',
      width: '15.8%',
      height: '18.6%',
    },
    laserTarget: { x: 60.0, y: 26.6 },
    laserCurve: 'M 60.0 35.0 C 60.0 32.0, 60.0 29.0, 60.0 26.6',
  },
  {
    id: 'appointment-setting',
    title: 'B2B Executive Appointment Setting',
    description: 'Convert sales-ready decision-makers into confirmed discovery meetings directly on your sales calendars, complete with enriched CRM lead dossiers.',
    route: '/b2b-appointment-setting',
    icon: Mail,
    cardRect: {
      left: '69.8%',
      top: '10.0%',
      width: '14.5%',
      height: '21.5%',
    },
    laserTarget: { x: 69.8, y: 26.5 },
    laserCurve: 'M 60.2 40.5 C 63.5 35.5, 66.8 30.5, 69.8 26.5',
  },
  {
    id: 'data-enrichment',
    title: 'Verified Prospect Data Enrichment',
    description: 'Build custom, zero-bounce B2B contact lists processed through our proprietary verification tool before launching active outbound campaigns.',
    route: '/b2b-list-building',
    icon: Database,
    cardRect: {
      left: '36.0%',
      top: '33.5%',
      width: '14.2%',
      height: '18.6%',
    },
    laserTarget: { x: 50.2, y: 41.8 },
    laserCurve: 'M 56.0 41.2 C 54.0 41.5, 52.0 41.7, 50.2 41.8',
  },
  {
    id: 'content-syndication',
    title: 'Content Syndication & Nurturing',
    description: 'Distribute whitepapers and collateral across targeted enterprise buyer pools while capturing zero-party intent data inside our verification platform.',
    route: '/content-syndication',
    icon: Building2,
    cardRect: {
      left: '71.8%',
      top: '34.0%',
      width: '15.0%',
      height: '19.0%',
    },
    laserTarget: { x: 71.8, y: 42.8 },
    laserCurve: 'M 64.0 41.2 C 66.5 41.6, 69.0 42.2, 71.8 42.8',
  },
  {
    id: 'lead-qualification',
    title: 'MQL, HQL & SQL Lead Qualification',
    description: 'Deliver leads scored by intent signals, budget, and purchasing authority, ensuring sales reps focus strictly on verified, high-probability opportunities.',
    route: '/sql-services',
    icon: CalendarCheck,
    cardRect: {
      left: '52.2%',
      top: '53.5%',
      width: '16.3%',
      height: '17.5%',
    },
    laserTarget: { x: 59.0, y: 53.5 },
    laserCurve: 'M 60.0 46.5 C 60.0 49.0, 59.5 51.0, 59.0 53.5',
  },
]

// Extended B2B Demand Generation Solutions mentioned at the bottom
export const ADDITIONAL_SERVICES = [
  { id: 'bant', title: 'BANT Lead Generation', route: '/bant-lead-generation', icon: CheckCircle2 },
  { id: 'mql', title: 'MQL Lead Generation', route: '/mql-services', icon: Filter },
  { id: 'hql', title: 'HQL Lead Delivery', route: '/hql-services', icon: PhoneCall },
  { id: 'webinar', title: 'Webinar Demand Services', route: '/webinar-services', icon: Video },
  { id: 'database-cleansing', title: 'Database Cleansing & Hygiene', route: '/database-cleansing', icon: RefreshCw },
  { id: 'lead-nurturing', title: 'Lead Nurturing & Retargeting', route: '/lead-nurturing', icon: Layers },
  { id: 'demand-gen', title: 'Omnichannel Demand Gen', route: '/demand-generation', icon: Megaphone },
  { id: 'demandflow-bridge', title: 'DemandFlow Bridge™', route: '/demandflow-bridge', icon: Sparkles },
]

// Central Hub position on services.png
const CENTRAL_HUB = { x: 60.0, y: 41.2 }

export const Services = ({
  heading = 'Everything Your Pipeline Needs.',
  subheading = 'Six synchronized B2B growth engines connected in one unified demand generation architecture.',
}) => {
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState(SERVICES_DATA[0].id)
  const [hoveredId, setHoveredId] = useState(null)
  const [isAutoCycling, setIsAutoCycling] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  // Toggle Read More for that specific card only (keeps entire section in one frame)
  const toggleExpand = (e, serviceId) => {
    e.stopPropagation() // Prevent triggering card navigation
    setActiveId(serviceId)
    setExpandedId((prev) => (prev === serviceId ? null : serviceId))
  }

  // Gentle auto-cycle when not hovered
  useEffect(() => {
    if (!isAutoCycling) return
    const timer = setInterval(() => {
      setActiveId((prev) => {
        const currIdx = SERVICES_DATA.findIndex((s) => s.id === prev)
        const nextIdx = (currIdx + 1) % SERVICES_DATA.length
        return SERVICES_DATA[nextIdx].id
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [isAutoCycling])

  const selectedService =
    SERVICES_DATA.find((s) => s.id === (hoveredId || activeId)) || SERVICES_DATA[0]

  return (
    <section
      id="services"
      className="relative select-none overflow-hidden transition-colors duration-300 bg-[#F8FAFC] dark:bg-[#05070B] border-b border-slate-200 dark:border-white/10 py-6 sm:py-8 lg:py-10"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-5">
          <div className="max-w-2xl">
            {/* Pre-header Eyebrow */}
            <div className="mb-1.5">
              <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#FF6D00]">
                CORE B2B CAPABILITIES
              </p>
            </div>

            <h2
              id="services-heading"
              className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {heading}{' '}
              <span className="text-[#FF6D00]">Predictable Revenue</span>.
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              {subheading}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] text-xs sm:text-sm font-semibold text-slate-800 dark:text-white hover:border-[#FF6D00] hover:text-[#FF6D00] dark:hover:border-[#FF6D00] dark:hover:text-[#FF6D00] transition-all shadow-sm"
            >
              <span>Explore All Solutions</span>
              <ArrowRight
                size={13}
                className="text-[#FF6D00] transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* 2-Section Clean Balanced Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start"
          onMouseEnter={() => setIsAutoCycling(false)}
          onMouseLeave={() => {
            setHoveredId(null)
            setIsAutoCycling(true)
          }}
        >
          {/* Section 1: Whiteboard Diagram Interactive Stage (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070B16] overflow-hidden shadow-sm">
            
            {/* Image Canvas with SVG Laser & Hotspot Overlay */}
            <div className="relative w-full aspect-[1672/941] select-none overflow-hidden bg-slate-900">
              <img
                src="/services.png"
                alt="Taraj Global Connected B2B Services"
                className="w-full h-full object-cover object-center block"
                loading="eager"
              />

              {/* Dynamic SVG Connection Laser Lines */}
              <svg
                className="pointer-events-none absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="activeLaserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6D00" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FFA600" stopOpacity="1" />
                  </linearGradient>

                  <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle base connection lines to all 6 nodes */}
                {SERVICES_DATA.map((srv) => (
                  <path
                    key={`guide-${srv.id}`}
                    d={srv.laserCurve}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="0.4"
                    strokeDasharray="1.5, 1.5"
                    fill="none"
                  />
                ))}

                {/* Active Highlighted Laser Line to Selected Service */}
                <path
                  d={selectedService.laserCurve}
                  stroke="url(#activeLaserGrad)"
                  strokeWidth="1.1"
                  strokeDasharray="3, 3"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                  fill="none"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="18; 0"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Animated Traveling Pulse Particle Along Active Curve */}
                <circle r="1.3" fill="#FFF" filter="url(#laserGlow)">
                  <animateMotion
                    path={selectedService.laserCurve}
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Destination Target Ping */}
                <circle
                  cx={selectedService.laserTarget.x}
                  cy={selectedService.laserTarget.y}
                  r="1.8"
                  fill="#FF6D00"
                  className="animate-pulse"
                />
              </svg>

              {/* Central Hub Pulsing Beacon on the Diagram */}
              <div
                style={{
                  position: 'absolute',
                  left: `${CENTRAL_HUB.x}%`,
                  top: `${CENTRAL_HUB.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute -inset-2 rounded-full border border-[#FF6D00]/70 animate-ping" />
                  <span className="h-3 w-3 rounded-full bg-[#FF6D00] shadow-[0_0_12px_#FF6D00]" />
                </div>
              </div>

              {/* Hotspot Buttons Fitted Directly to Whiteboard Cards */}
              {SERVICES_DATA.map((service) => {
                const isSelected = service.id === selectedService.id
                const rect = service.cardRect

                return (
                  <div
                    key={`card-hotspot-${service.id}`}
                    style={{
                      position: 'absolute',
                      left: rect.left,
                      top: rect.top,
                      width: rect.width,
                      height: rect.height,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(service.id)
                        navigate(service.route)
                      }}
                      onMouseEnter={() => {
                        setHoveredId(service.id)
                        setIsAutoCycling(false)
                      }}
                      onMouseLeave={() => {
                        setHoveredId(null)
                      }}
                      aria-label={service.title}
                      className="relative w-full h-full cursor-pointer focus:outline-none block rounded-2xl"
                    >
                      {/* Highlight Border strictly covering the whiteboard card */}
                      <div
                        className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                          isSelected
                            ? 'border-2 border-[#FF6D00] bg-[#FF6D00]/15 shadow-[0_0_22px_rgba(255,109,0,0.5)]'
                            : 'border border-transparent hover:border-white/30'
                        }`}
                      />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Bottom Bar: Current selection status and Explore button */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-[#0B0F19] border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-slate-600 dark:text-[#94A3B8] truncate">
                Active Architecture Node: <span className="font-semibold text-slate-900 dark:text-white">{selectedService.title}</span>
              </span>

              <button
                type="button"
                onClick={() => navigate(selectedService.route)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF6D00] hover:bg-[#E05E00] text-white text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-sm shrink-0"
              >
                <span>Explore Solution</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Section 2: 6 Clean Compact Service Boxes in Balanced Grid (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 items-start">
              {SERVICES_DATA.map((service) => {
                const isSelected = service.id === selectedService.id
                const isExpanded = expandedId === service.id
                const Icon = service.icon

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => {
                      setHoveredId(service.id)
                      setIsAutoCycling(false)
                    }}
                    onMouseLeave={() => {
                      setHoveredId(null)
                    }}
                    onClick={() => navigate(service.route)}
                    className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between self-start min-h-[110px] ${
                      isSelected
                        ? 'border-[#FF6D00] bg-orange-50/60 dark:bg-[#FF6D00]/[0.08] shadow-[0_4px_16px_rgba(255,109,0,0.12)]'
                        : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0F19] hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    {/* Top Row: Icon + Title + Arrow */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#FF6D00] text-white'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 group-hover:text-[#FF6D00]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        <h3
                          title={service.title}
                          className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-[#FF6D00] transition-colors leading-tight line-clamp-1"
                        >
                          {service.title}
                        </h3>
                      </div>

                      <ArrowUpRight
                        size={14}
                        className={`shrink-0 transition-transform duration-200 ${
                          isSelected
                            ? 'text-[#FF6D00] translate-x-0.5 -translate-y-0.5'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`}
                      />
                    </div>

                    {/* Middle: Compact Description with Inline Read More / Less Toggle */}
                    <div className="min-w-0">
                      <p className="text-[11px] sm:text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed transition-all">
                        {isExpanded ? service.description : truncateText(service.description, 55)}
                        <button
                          type="button"
                          onClick={(e) => toggleExpand(e, service.id)}
                          className="ml-1.5 inline-flex items-center gap-0.5 text-[11px] font-bold text-[#FF6D00] hover:text-[#FFA600] dark:text-[#FF8826] dark:hover:text-[#FFA600] transition-colors focus:outline-none cursor-pointer select-none"
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? `Show less about ${service.title}` : `Read more about ${service.title}`}
                        >
                          <span>{isExpanded ? 'Less' : 'Read More'}</span>
                          <ChevronDown
                            size={11}
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </p>
                    </div>

                    {/* Bottom Micro Action */}
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between text-[10.5px] font-semibold text-slate-400 dark:text-slate-500 group-hover:text-[#FF6D00]">
                      <span className={isSelected ? 'text-[#FF6D00]' : ''}>
                        View Details
                      </span>
                      <ArrowRight size={10} className={`transition-transform duration-200 ${isSelected ? 'translate-x-0.5 text-[#FF6D00]' : 'group-hover:translate-x-0.5'}`} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom Section: Extended Specialized Services (Compact Direct Buttons) ── */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-200 dark:border-white/10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                More Specialized B2B Capabilities
              </h3>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A6FF] hover:text-[#38BDF8] transition-colors"
            >
              <span>View All 14+ Service Offerings</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Compact Button Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {ADDITIONAL_SERVICES.map((item) => {
              const ItemIcon = item.icon

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.route)}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-[#00A6FF]/60 dark:hover:border-[#00A6FF]/60 hover:bg-slate-50 dark:hover:bg-[#00A6FF]/10 transition-all duration-200 cursor-pointer text-left shadow-2xs hover:shadow-xs"
                >
                  <div className="w-4 h-4 rounded flex items-center justify-center bg-slate-100 dark:bg-white/5 group-hover:bg-[#00A6FF]/20 group-hover:text-[#00A6FF] transition-colors text-slate-500 dark:text-slate-400 shrink-0">
                    <ItemIcon size={11} />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="text-slate-400 group-hover:text-[#00A6FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </button>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Services
