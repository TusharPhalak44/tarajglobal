import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  Zap,
  Users,
  Calendar,
  HeartHandshake,
  Database,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react'

const OBJECTIVES = [
  {
    id: 'leads',
    label: 'Generate Leads',
    icon: Target,
    heading: 'Generate Leads',
    description: 'Identify and connect with the decision-makers who matter most.',
    services: [
      { name: 'B2B Lead Generation', route: '/sql-services' },
      { name: 'BANT Lead Generation', route: '/bant-lead-generation' },
      { name: 'MQL Services', route: '/mql-services' },
      { name: 'SQL Lead Generation', route: '/sql-services' },
    ],
    image: '/sql-lead-qualification-journey.jpg',
  },
  {
    id: 'demand',
    label: 'Create Demand',
    icon: Zap,
    heading: 'Create Demand',
    description: 'Ignite in-market interest and turn passive prospects into active inbound buyers.',
    services: [
      { name: 'Demand Generation', route: '/demand-generation' },
      { name: 'Content Syndication', route: '/content-syndication' },
      { name: 'Webinar Services', route: '/webinar-services' },
    ],
    image: '/demandflow-campaigns.png',
  },
  {
    id: 'decision-makers',
    label: 'Reach Decision-Makers',
    icon: Users,
    heading: 'Reach Decision-Makers',
    description: 'Bypass gatekeepers to penetrate strategic C-suite and VP-level buying committees.',
    services: [
      { name: 'Account-Based Marketing', route: '/abm' },
      { name: 'B2B Email Marketing', route: '/b2b-email-marketing' },
      { name: 'B2B Appointment Setting', route: '/b2b-appointment-setting' },
    ],
    image: '/enterprise-audience.jpg',
  },
  {
    id: 'meetings',
    label: 'Book Meetings',
    icon: Calendar,
    heading: 'Book Meetings',
    description: 'Fill your sales reps’ calendars with confirmed, qualified buyer conversations.',
    services: [
      { name: 'B2B Appointment Setting', route: '/b2b-appointment-setting' },
      { name: 'SQL Lead Generation', route: '/sql-services' },
    ],
    image: '/b2b-appointment-setting-journey.jpg',
  },
  {
    id: 'nurture',
    label: 'Nurture Prospects',
    icon: HeartHandshake,
    heading: 'Nurture Prospects',
    description: 'Educate stalled opportunities and revive delayed pipeline through targeted workflows.',
    services: [
      { name: 'Lead Nurturing', route: '/lead-nurturing' },
      { name: 'Content Syndication', route: '/content-syndication' },
    ],
    image: '/demandflow-qualification.png',
  },
  {
    id: 'data',
    label: 'Improve Data Quality',
    icon: Database,
    heading: 'Improve Data Quality',
    description: 'Eliminate bounce rates with triple-verified custom lists and CRM deduplication.',
    services: [
      { name: 'B2B List Building', route: '/b2b-list-building' },
      { name: 'Database Cleansing', route: '/database-cleansing' },
    ],
    image: '/careers-hero-team.jpg',
  },
]

export default function BlueprintObjective() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(OBJECTIVES[0].id)

  const current = OBJECTIVES.find((o) => o.id === activeTab) || OBJECTIVES[0]

  const scrollToCoreServices = () => {
    const el = document.getElementById('core-services-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="growth-objective-section"
      className="relative py-24 lg:py-32 bg-[#F8FAFC] text-[#0F172A] border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                WHAT DO YOU NEED?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
              Choose Your <br className="hidden sm:inline" />
              Growth Objective
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
            <p className="text-sm sm:text-base text-slate-600">
              Every business has different goals. Select what you want to achieve and explore the right services for your needs.
            </p>
            <button
              onClick={scrollToCoreServices}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FF6D00] hover:text-[#E05300] transition-colors cursor-pointer group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ══════════ OBJECTIVE NAVIGATION WITH CIRCULAR ICONS ══════════ */}
        <div className="border-b border-slate-200 pb-4 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-max gap-4 sm:gap-6">
            {OBJECTIVES.map((obj) => {
              const isActive = activeTab === obj.id
              const Icon = obj.icon

              return (
                <button
                  key={obj.id}
                  onClick={() => setActiveTab(obj.id)}
                  className="group relative flex flex-col items-center gap-2.5 pb-4 px-3 cursor-pointer transition-all"
                >
                  {/* Small Circular Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FF6D00] text-white shadow-lg shadow-[#FF6D00]/30 scale-105'
                        : 'bg-slate-200/70 text-slate-600 group-hover:bg-slate-300 group-hover:rotate-6'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    {obj.label}
                  </span>

                  {/* Active Orange Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="objectiveActiveUnderline"
                      className="absolute -bottom-4 left-0 right-0 h-[3px] bg-[#FF6D00] rounded-full"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ══════════ LARGE CONTENT PANEL BELOW NAVIGATION ══════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading, Description, Recommended Services, CTA */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF6D00] mb-2">
                    RECOMMENDED SOLUTION MATRIX
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 tracking-tight leading-tight">
                    {current.heading}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {current.description}
                  </p>

                  {/* Recommended Services List */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
                      RECOMMENDED SERVICES:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.services.map((srv, idx) => (
                        <div
                          key={idx}
                          onClick={() => navigate(srv.route)}
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#FF6D00] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#FF6D00] transition-colors">
                            {srv.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6D00] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary CTA button */}
                <div className="mt-8 pt-6">
                  <button
                    onClick={() => navigate(current.services[0].route)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6D00] hover:bg-[#E05300] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[#FF6D00]/30 cursor-pointer group"
                  >
                    <span>Explore Solution</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual driven by active objective */}
              <div className="lg:col-span-6">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <motion.div
                    key={current.image}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${current.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-[#FF6D00] uppercase font-bold">
                        VERIFIED OBJECTIVE
                      </div>
                      <div className="text-xs sm:text-sm font-bold uppercase text-slate-900">
                        {current.heading}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {current.services.length} CONNECTED SERVICES
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
