import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Crosshair, MessageSquare, CheckCircle2, UserCheck, TrendingUp } from 'lucide-react'

const STAGES = [
  {
    num: '01',
    title: 'Identify',
    desc: 'Find the right accounts.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Target',
    desc: 'Reach key decision-makers.',
    icon: Crosshair,
  },
  {
    num: '03',
    title: 'Engage',
    desc: 'Start relevant conversations.',
    icon: MessageSquare,
  },
  {
    num: '04',
    title: 'Qualify',
    desc: 'Prioritize real opportunities.',
    icon: CheckCircle2,
  },
  {
    num: '05',
    title: 'Convert',
    desc: 'Turn interest into pipeline.',
    icon: UserCheck,
  },
  {
    num: '06',
    title: 'Grow',
    desc: 'Build long-term success.',
    icon: TrendingUp,
  },
]

export default function BlueprintConnect() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      id="how-services-connect-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                HOW OUR SERVICES CONNECT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              From Target to Pipeline, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                We Make It Happen
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Our proven process combines data, technology and expertise to deliver consistent B2B growth.
          </p>
        </div>

        {/* ══════════ HORIZONTAL CONNECTED PROCESS LINE ══════════ */}
        <div className="relative pt-6 pb-4">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[2px] bg-white/10 -z-0">
            {/* Animated Orange Pulse Line */}
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#FF6D00] via-[#FF8A00] to-[#FF6D00]"
            />
          </div>

          {/* 6 Sequential Stage Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon
              const isHovered = hoveredIdx === idx

              return (
                <motion.div
                  key={stage.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  {/* Circular Node Icon */}
                  <div
                    className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 mb-5 ${
                      isHovered
                        ? 'border-[#FF6D00] bg-[#FF6D00] text-black scale-110 shadow-[0_0_20px_rgba(255,109,0,0.5)]'
                        : 'border-white/20 bg-[#05070B] text-white/80 group-hover:border-[#FF6D00]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Number & Stage Name */}
                  <div className="text-[11px] font-mono font-bold text-[#FF6D00] mb-1">
                    {stage.num} STAGE
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide text-white group-hover:text-white transition-colors">
                    {stage.title}
                  </h3>

                  {/* Supporting Short Description */}
                  <p className="mt-2 text-xs text-white/60 leading-relaxed max-w-[170px]">
                    {stage.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
