import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Identify',
    desc: 'Right accounts and prospects',
  },
  {
    num: '02',
    title: 'Target',
    desc: 'Key decision-makers',
  },
  {
    num: '03',
    title: 'Engage',
    desc: 'Start relevant conversations',
  },
  {
    num: '04',
    title: 'Qualify',
    desc: 'Focus on real opportunities',
  },
  {
    num: '05',
    title: 'Convert',
    desc: 'Turn interest into pipeline',
  },
  {
    num: '06',
    title: 'Grow',
    desc: 'Build long-term success',
  },
]

export default function ReferenceHowWeWork() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="how-we-work-section"
      className="relative py-24 lg:py-32 bg-white dark:bg-[#05070B] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ══════════ LEFT COLUMN: Heading, Text & Button (4 cols) ══════════ */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-[#FF6D00]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6D00]">
                HOW WE WORK
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              From Target to <br />
              Pipeline, We Make It Happen
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-white/65 leading-relaxed font-normal">
              Our proven process combines data, technology and expertise to deliver consistent B2B growth.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer group hover:border-[#FF6D00]"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 dark:text-white/70 group-hover:text-[#FF6D00] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* ══════════ RIGHT COLUMN: 6 Connected Timeline Nodes (8 cols) ══════════ */}
          <div className="lg:col-span-8 relative">
            {/* Horizontal Connecting Orange Line (Desktop) */}
            <div className="hidden lg:block absolute top-[18px] left-[6%] right-[6%] h-[2px] bg-slate-200 dark:bg-white/10 z-0">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#FF6D00] via-[#FF8A00] to-[#FF6D00]"
              />
            </div>

            {/* 6 Step Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx

                return (
                  <div
                    key={step.num}
                    onMouseEnter={() => setActiveStep(idx)}
                    className="group flex flex-col items-center text-center cursor-pointer"
                  >
                    {/* Glowing Circular Node */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 mb-4 ${
                        isActive
                          ? 'bg-[#FF6D00] text-black shadow-[0_0_16px_rgba(255,109,0,0.6)] scale-110'
                          : 'border-2 border-[#FF6D00]/60 bg-white dark:bg-[#05070B] text-slate-900 dark:text-white group-hover:border-[#FF6D00] group-hover:scale-105'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-black' : 'bg-[#FF6D00]'}`} />
                    </div>

                    {/* Step Number */}
                    <span className="font-mono text-xs font-bold text-[#FF6D00] mb-1">
                      {step.num}
                    </span>

                    {/* Step Name */}
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white group-hover:text-[#FF6D00] transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Short Description */}
                    <p className="mt-1.5 text-[11px] text-slate-500 dark:text-white/50 leading-relaxed max-w-[120px]">
                      {step.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
