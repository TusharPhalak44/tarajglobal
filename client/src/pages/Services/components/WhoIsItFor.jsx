import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Shield, Cpu, Building2, Briefcase, ChevronRight } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const AUDIENCES = [
  {
    id: 'saas',
    num: '01',
    label: 'B2B SaaS Companies',
    tagline: 'HIGH-VELOCITY TECH BUYERS',
    icon: Cpu,
    color: '#00A6FF',
    headline: 'Accelerate product evaluation cycles and demo conversions with high-intent technical buyers.',
    description:
      'We help B2B SaaS companies penetrate target accounts across specialized technographics, reaching CTOs, VPs of Engineering, and Product leaders with value-driven messaging that secures live software demonstrations.',
    points: [
      'Pinpoint target accounts filtered by current software stack and tech adoption signals',
      'Deploy multi-touch cadences aligned with modern SaaS evaluation and trial stages',
      'Deliver vetted Sales Qualified Leads (SQL) ready for discovery calls and product demos',
    ],
    metricValue: '4.2x',
    metricLabel: 'Average Demo Booking Lift',
  },
  {
    id: 'cybersecurity',
    num: '02',
    label: 'Cloud & Cybersecurity',
    tagline: 'HIGH-COMPLIANCE ENTERPRISE BUYERS',
    icon: Shield,
    color: '#8B5CF6',
    headline: 'Engage CISOs and IT Directors through consultative, compliance-verified outreach.',
    description:
      'Enterprise security and infrastructure sales demand precision. We map the entire security decision matrix—from technical evaluators to economic buyers—ensuring messaging addresses real corporate vulnerabilities.',
    points: [
      'Direct access to vetted CISOs, CIOs, and InfoSec leaders in target revenue bands',
      'Strict adherence to enterprise data privacy (GDPR, CAN-SPAM, CCPA compliance)',
      'Account-Based Marketing (ABM) strategies built for complex 6 to 12-month deal cycles',
    ],
    metricValue: '100%',
    metricLabel: 'Compliance & Verification',
  },
  {
    id: 'fintech',
    num: '03',
    label: 'FinTech & Enterprise Tech',
    tagline: 'EXECUTIVE COMMITTEE ALIGNMENT',
    icon: Building2,
    color: '#10B981',
    headline: 'Connect with financial and enterprise leadership managing high-value transformation budgets.',
    description:
      'For complex technology platforms with high Average Contract Values (ACV), our BANT lead generation and committee mapping services ensure you only pitch organizations with active capital projects and verified authority.',
    points: [
      'Budget and authority validation before scheduling any sales appointment',
      'Multi-stakeholder penetration across finance, operations, and IT leadership',
      'Deep organizational dossiers providing pre-call buyer intelligence for sales reps',
    ],
    metricValue: '$150K+',
    metricLabel: 'Average Opportunity ACV',
  },
  {
    id: 'services',
    num: '04',
    label: 'Professional & Consulting Firms',
    tagline: 'PRACTICE LEADERS & EXECUTIVES',
    icon: Briefcase,
    color: '#FF6D00',
    headline: 'Drive high-trust corporate relationships for strategic advisory and specialized B2B services.',
    description:
      'Consulting, legal, and operational service providers benefit from relationship-led demand generation. We craft tailored, executive-level correspondence that establishes immediate credibility and books exploratory discussions.',
    points: [
      'Seniority targeting focused on C-Suite, Managing Directors, and Practice Heads',
      'Thought-leadership syndication that warms accounts before outbound sales contact',
      'Continuous pipeline nurturing to maintain front-of-mind positioning during buying windows',
    ],
    metricValue: '35%',
    metricLabel: 'Pipeline Conversion Velocity',
  },
]

const WhoIsItFor = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const currentAudience = AUDIENCES[selectedTab]
  const Icon = currentAudience.icon

  return (
    <section
      id="who-our-services-are-for"
      className="relative py-14 sm:py-18 lg:py-24 bg-surface/50 dark:bg-[#070D18]/90 border-b border-border transition-colors duration-300"
      aria-label="Who Can Benefit From Taraj Global B2B Services"
    >
      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Target Market Specialization</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span>Engineered For B2B Sectors Where </span>
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Lead Quality Drives Revenue
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Our demand and lead generation models are built specifically for companies with structured sales cycles and defined Ideal Customer Profiles.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {AUDIENCES.map((item, idx) => {
            const isSelected = selectedTab === idx
            const TabIcon = item.icon

            return (
              <button
                key={item.id}
                onClick={() => setSelectedTab(idx)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-md ring-1 ring-primary/40'
                    : 'border-border bg-surface hover:bg-surface/80 opacity-80'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <TabIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold text-text-tertiary block">
                    {item.num}
                  </span>
                  <span className="text-xs font-bold text-text-primary block truncate">
                    {item.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Audience Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-surface dark:bg-[#0c1424] p-6 sm:p-8 lg:p-10 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold mb-4"
                  style={{ backgroundColor: `${currentAudience.color}15`, color: currentAudience.color }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{currentAudience.tagline}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-text-primary leading-tight">
                  {currentAudience.headline}
                </h3>

                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {currentAudience.description}
                </p>

                {/* Key Deliverable Points */}
                <div className="mt-6 space-y-3">
                  {currentAudience.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                        style={{ backgroundColor: currentAudience.color }}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-text-primary font-medium leading-relaxed">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Performance Highlight (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div
                  className="p-8 rounded-2xl border flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden"
                  style={{
                    backgroundColor: `${currentAudience.color}08`,
                    borderColor: `${currentAudience.color}30`,
                  }}
                >
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight"
                    style={{ color: currentAudience.color }}
                  >
                    {currentAudience.metricValue}
                  </span>
                  <span className="text-sm font-bold text-text-primary mt-2">
                    {currentAudience.metricLabel}
                  </span>
                  <span className="text-xs text-text-secondary mt-1 max-w-xs">
                    Consistent performance metrics observed across active client campaigns.
                  </span>

                  <div className="mt-6 pt-6 border-t border-border/80 w-full flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono text-text-secondary">
                      Active Multi-Channel Execution
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}

export default WhoIsItFor
