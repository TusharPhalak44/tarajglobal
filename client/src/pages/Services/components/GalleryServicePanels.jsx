import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { MinimalArrowButton, UnderlineTextButton } from './GalleryButtons'

const servicesData = [
  {
    num: '01',
    name: 'B2B Lead Generation',
    category: 'High-Intent Pipeline',
    route: '/sql-services',
    image: '/sql-lead-qualification-journey.jpg',
    imagePosition: 'bottom', // uneven visual placement
    shortDesc: 'Drive sales-ready prospects straight to your account executives with validated B2B lead generation.',
    longDesc: 'Our flagship lead generation architecture combines multi-channel intent signals, verified executive contact data, and multi-touch outreach to convert cold accounts into engaged commercial conversations.',
    deliverables: ['Verified ICP Target List', 'Multi-Touch Outreach', 'Direct Prospect Consent', 'Calendar Meeting Booking'],
  },
  {
    num: '02',
    name: 'BANT Lead Generation',
    category: 'Strict Qualification',
    route: '/bant-lead-generation',
    image: '/enterprise-audience.jpg',
    imagePosition: 'top', // uneven visual placement
    shortDesc: 'Every lead qualified rigorously against Budget, Authority, Need, and Timeline parameters.',
    longDesc: 'Eliminate wasted SDR cycles with prospects vetted against strict BANT criteria. We ensure you speak only with authorized budget holders actively evaluating solutions.',
    deliverables: ['Confirmed Budget Allocation', 'C-Level Authority Proof', 'Explicit Need Documentation', 'Defined Purchase Timeline'],
  },
  {
    num: '03',
    name: 'MQL Services',
    category: 'Audience Education',
    route: '/mql-services',
    image: '/demandflow-campaigns.png',
    imagePosition: 'center', // uneven visual placement
    shortDesc: 'Capture high-affinity prospects engaging with your whitepapers, research, and product collateral.',
    longDesc: 'Scale marketing qualified leads through content-driven interest validation and telemetry tracking. Perfect for building top-of-funnel momentum.',
    deliverables: ['Content Download Validation', 'Company Domain Verification', 'Intent-Score Tagging', 'Automated CRM Sync'],
  },
  {
    num: '04',
    name: 'B2B Appointment Setting',
    category: 'Executive Meetings',
    route: '/b2b-appointment-setting',
    image: '/b2b-appointment-setting-journey.jpg',
    imagePosition: 'bottom',
    shortDesc: 'Secured discovery calls with hard-to-reach VP and C-level decision-makers.',
    longDesc: 'We handle the complete conversation cadence—from icebreaker to agenda alignment—placing confirmed, high-value meetings directly into your sales team’s calendars.',
    deliverables: ['Direct Calendar Invites', 'Agenda Briefing Documents', 'No-Show Replacement Guarantee', 'Call Recording Transcripts'],
  },
  {
    num: '05',
    name: 'B2B Email Marketing',
    category: 'Targeted Outreach',
    route: '/b2b-email-marketing',
    image: '/sql-lead-qualification-journey.jpg',
    imagePosition: 'top',
    shortDesc: 'Reach the right decision-makers with personalized, deliverability-optimized B2B email cadences.',
    longDesc: 'Humanized, non-spammy cold and warm outreach campaigns engineered with high sender reputation, custom domain infrastructure, and tailored copy variations.',
    deliverables: ['Custom Domain Warmup', 'A/B Messaging Copywriting', 'Real-Time Reply Classification', 'Unsubscribe & GDPR Compliance'],
  },
  {
    num: '06',
    name: 'Account-Based Marketing',
    category: 'Strategic ABM',
    route: '/abm',
    image: '/enterprise-audience.jpg',
    imagePosition: 'center',
    shortDesc: 'Surround named enterprise target accounts with synchronized multi-channel touches.',
    longDesc: 'Align your marketing and enterprise sales teams around named Tier-1 accounts. We coordinate IP-targeted ads, custom research decks, and multi-threaded stakeholder outreach.',
    deliverables: ['Buying Committee Mapping', 'Custom Tier-1 Collateral', 'Multi-Threaded Outreach', 'Account Engagement Heatmaps'],
  },
  {
    num: '07',
    name: 'Content Syndication',
    category: 'Authority Distribution',
    route: '/content-syndication',
    image: '/demandflow-campaigns.png',
    imagePosition: 'bottom',
    shortDesc: 'Distribute whitepapers, case studies, and eBooks directly to verified business leaders.',
    longDesc: 'Leverage our proprietary network of B2B readers and digital portals to place your thought leadership in front of qualified decision-makers seeking market insights.',
    deliverables: ['100% Opt-In Verification', 'Title & Seniority Filtering', 'Monthly Campaign Metrics', 'Direct Asset Downloads'],
  },
  {
    num: '08',
    name: 'Demand Generation',
    category: 'Growth Engine',
    route: '/demand-generation',
    image: '/sql-lead-qualification-journey.jpg',
    imagePosition: 'top',
    shortDesc: 'Holistic revenue programs creating sustained market awareness and qualified pipeline.',
    longDesc: 'Transform disconnected tactics into a unified demand engine that continually captures, nurtures, and accelerates target market demand into predictable ARR.',
    deliverables: ['Full-Funnel Orchestration', 'Attribution Modeling', 'Multi-Channel Touchpoints', 'CAC Reduction Strategy'],
  },
  {
    num: '09',
    name: 'B2B Webinar Services',
    category: 'High-Impact Events',
    route: '/webinar-services',
    image: '/b2b-appointment-setting-journey.jpg',
    imagePosition: 'center',
    shortDesc: 'Fill virtual events with ICP registrants and drive real-time interactive audience conversions.',
    longDesc: 'End-to-end B2B webinar recruitment and post-event nurture workflows that ensure your digital sessions are attended by relevant corporate buyers.',
    deliverables: ['Guaranteed Live Attendance', 'Pre-Event Nurture Cadence', 'Live Audience Q&A Telemetry', 'Post-Event MQL Routing'],
  },
  {
    num: '10',
    name: 'Lead Nurturing',
    category: 'Pipeline Velocity',
    route: '/lead-nurturing',
    image: '/enterprise-audience.jpg',
    imagePosition: 'bottom',
    shortDesc: 'Keep long-cycle accounts engaged with structured automated and human touchpoints.',
    longDesc: 'Prevent cold drop-off with contextual follow-ups, relevant case studies, and progressive micro-commitments that guide prospects toward sales readiness.',
    deliverables: ['Lifecycle Nurture Cadences', 'Intent-Triggered Follow-ups', 'Re-Engagement Reactivations', 'CRM Telemetry Enrichment'],
  },
  {
    num: '11',
    name: 'B2B List Building',
    category: 'Data Foundation',
    route: '/b2b-list-building',
    image: '/demandflow-campaigns.png',
    imagePosition: 'top',
    shortDesc: 'Custom-built prospect databases tailored to your exact TAM, geography, and title constraints.',
    longDesc: 'Human-verified contact repositories built strictly on your Ideal Customer Profile. Complete with direct dial numbers, corporate emails, and tech-stack markers.',
    deliverables: ['100% Custom Research', 'Dual-Layer Email Verification', 'Direct Dial Coverage', 'Enriched Technographic Tags'],
  },
  {
    num: '12',
    name: 'Database Cleansing',
    category: 'Data Hygiene',
    route: '/database-cleansing',
    image: '/sql-lead-qualification-journey.jpg',
    imagePosition: 'center',
    shortDesc: 'Scrub duplicates, eliminate bounce rates, and enrich incomplete CRM records.',
    longDesc: 'Revitalize your legacy CRM data. We remove obsolete records, update job changes, verify corporate email validity, and append missing executive phone numbers.',
    deliverables: ['Bounce Rate Reduction', 'Job Change Updates', 'Duplicate De-Duplication', 'GDPR/CCPA Compliance Check'],
  },
]

export const GalleryServicePanels = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeModalService, setActiveModalService] = useState(null)

  return (
    <section
      id="service-gallery"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-background text-text-primary border-b border-border/40 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
              [SECTION 03 & 04 // THE SERVICE GALLERY]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-text-primary leading-[0.95]">
              INTERACTIVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-text-primary to-text-secondary">
                GROWTH PANELS.
              </span>
            </h2>
          </div>
          <div className="max-w-sm text-text-muted text-xs md:text-sm font-sans leading-relaxed">
            Hover any panel to expand its visual canvas, telemetry metrics, and deliverables. Select to reveal the full exhibition narrative.
          </div>
        </div>

        {/* UNEVEN VERTICAL PANELS GALLERY */}
        {/* Grid layout on desktop with asymmetric panel heights & uneven visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {servicesData.map((service, idx) => {
            const isHovered = hoveredIndex === idx
            const isAnyHovered = hoveredIndex !== null && !isHovered

            // Uneven height classes for editorial gallery feel
            const heightClasses =
              idx % 4 === 0
                ? 'min-h-[460px] md:min-h-[520px]'
                : idx % 4 === 1
                ? 'min-h-[420px] md:min-h-[480px]'
                : idx % 4 === 2
                ? 'min-h-[480px] md:min-h-[540px]'
                : 'min-h-[440px] md:min-h-[500px]'

            return (
              <div
                key={service.num}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative rounded-2xl border transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between p-6 md:p-8 cursor-pointer ${heightClasses} ${
                  isHovered
                    ? 'bg-surface border-primary shadow-2xl scale-[1.02] z-20 ring-1 ring-primary/40'
                    : isAnyHovered
                    ? 'bg-surface/40 border-border/50 opacity-80 scale-[0.98] z-10'
                    : 'bg-surface/70 border-border/70 hover:border-primary/60 z-10'
                }`}
                data-cursor-label="VIEW"
                onClick={() => setActiveModalService(service)}
              >
                {/* Visual Image Reveal: Positions vary per panel (top, center, bottom) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none overflow-hidden ${
                    isHovered ? 'opacity-25' : 'opacity-0'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    } ${
                      service.imagePosition === 'top'
                        ? 'object-top'
                        : service.imagePosition === 'bottom'
                        ? 'object-bottom'
                        : 'object-center'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                {/* TOP ROW: Number and Category Tag */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span
                    className={`font-mono font-bold tracking-widest text-xs transition-all duration-500 ${
                      isHovered
                        ? 'text-primary translate-y-1 scale-110'
                        : 'text-text-muted'
                    }`}
                  >
                    /{service.num}
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted bg-border/40 px-2 py-0.5 rounded border border-border/60">
                    {service.category}
                  </span>
                </div>

                {/* MIDDLE: Service Name & Dynamic Expanding Description */}
                <div className="relative z-10 my-auto py-6">
                  <h3
                    className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-500 leading-snug ${
                      isHovered ? 'text-primary' : 'text-text-primary'
                    }`}
                  >
                    {service.name}
                  </h3>

                  {/* Description reveals smoothly on hover */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isHovered
                        ? 'max-h-40 opacity-100 mt-4'
                        : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                {/* BOTTOM ROW: Action Link / Rotating Arrow */}
                <div className="relative z-10 pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="text-xs font-mono tracking-widest uppercase text-text-muted group-hover:text-primary transition-colors">
                    {isHovered ? 'EXPLORE SERVICE →' : 'DISCOVER'}
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isHovered
                        ? 'bg-primary text-black border-primary rotate-45 scale-110'
                        : 'border-border/70 text-text-muted group-hover:border-primary/60'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SECTION 05 — FULL-SCREEN SERVICE REVEAL MODAL */}
      <AnimatePresence>
        {activeModalService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-background/80 backdrop-blur-xl"
            onClick={() => setActiveModalService(null)}
          >
            {/* Modal Card Container */}
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-text-primary hover:text-primary hover:border-primary transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT: Visual Image Showcase */}
              <div className="relative w-full md:w-5/12 min-h-[260px] md:min-h-[500px] overflow-hidden bg-background">
                <img
                  src={activeModalService.image}
                  alt={activeModalService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-background/40 to-background" />
                <div className="absolute top-6 left-6 font-mono text-xs tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  EXHIBIT // {activeModalService.num}
                </div>
              </div>

              {/* RIGHT: Service Narrative & Direct Navigation */}
              <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono tracking-wider text-primary uppercase">
                    <span>{activeModalService.category}</span>
                    <span className="text-border">•</span>
                    <span>ACTIVE_PIPELINE</span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-text-primary leading-tight">
                    {activeModalService.name}
                  </h3>

                  <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans pt-2">
                    {activeModalService.longDesc}
                  </p>

                  {/* Key Deliverables Pill Grid */}
                  <div className="pt-4 border-t border-border/50">
                    <span className="font-mono text-xs uppercase tracking-widest text-text-muted block mb-3">
                      [SERVICE DELIVERABLES]
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeModalService.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-medium text-text-primary p-2.5 rounded-lg bg-background/60 border border-border/40"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOTTOM ACTIONS */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    to={activeModalService.route}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-primary-hover transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    <span>VIEW SERVICE DETAILS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setActiveModalService(null)}
                    className="text-xs font-mono tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors"
                  >
                    RETURN TO GALLERY
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GalleryServicePanels
