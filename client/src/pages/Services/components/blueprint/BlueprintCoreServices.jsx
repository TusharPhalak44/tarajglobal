import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

const CORE_CARDS = [
  {
    num: '01',
    title: 'B2B Lead Generation',
    desc: 'Targeted multi-touch prospecting that connects your reps with verified buying committees.',
    route: '/sql-services',
    image: '/sql-lead-qualification-journey.jpg',
  },
  {
    num: '02',
    title: 'Demand Generation',
    desc: 'Omnichannel campaigns building market awareness and capturing inbound buyer intent.',
    route: '/demand-generation',
    image: '/demandflow-campaigns.png',
  },
  {
    num: '03',
    title: 'Account-Based Marketing',
    desc: 'Hyper-personalized orchestration designed to penetrate complex Tier-1 enterprise accounts.',
    route: '/abm',
    image: '/enterprise-audience.jpg',
  },
  {
    num: '04',
    title: 'B2B Email Marketing',
    desc: 'Warm inbox infrastructure and human-crafted copywriting delivering direct executive replies.',
    route: '/b2b-email-marketing',
    image: '/demandflow-qualification.png',
  },
  {
    num: '05',
    title: 'Appointment Setting',
    desc: 'Pre-qualified, double-confirmed discovery calls placed straight onto sales calendars.',
    route: '/b2b-appointment-setting',
    image: '/b2b-appointment-setting-journey.jpg',
  },
  {
    num: '06',
    title: 'Data Solutions',
    desc: 'Hand-curated custom prospect lists and CRM cleansing to eliminate bounce rates.',
    route: '/b2b-list-building',
    image: '/careers-hero-team.jpg',
  },
]

export default function BlueprintCoreServices() {
  const navigate = useNavigate()

  return (
    <section
      id="core-services-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                OUR CORE SERVICES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Solutions Built Around <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Your Growth Goals
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
            <p className="text-sm sm:text-base text-white/60">
              From lead generation to data solutions, our services work together to move your pipeline forward.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('spotlight-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FF6D00] hover:text-[#FF8A00] transition-colors cursor-pointer group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 6 Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_CARDS.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => navigate(card.route)}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#FF6D00] p-6 flex flex-col justify-between transition-all duration-400 ease-out cursor-pointer hover:-translate-y-2.5 shadow-xl overflow-hidden min-h-[380px]"
            >
              {/* Top Row: Number & Circular Arrow Button */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <span className="font-mono text-xl sm:text-2xl font-black text-white/40 group-hover:text-[#FF6D00] transition-colors duration-300">
                  {card.num}
                </span>
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center group-hover:border-[#FF6D00] group-hover:bg-[#FF6D00] group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                  {card.desc}
                </p>
                {/* Subtle orange accent line on hover */}
                <div className="w-8 h-[2px] bg-[#FF6D00] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Lower Portion: B2B Visual with dark overlay */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden mt-6 border border-white/5">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent group-hover:via-[#05070B]/30 transition-colors" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="uppercase tracking-widest text-[#FF6D00] font-bold">EXPLORE BLUEPRINT</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
