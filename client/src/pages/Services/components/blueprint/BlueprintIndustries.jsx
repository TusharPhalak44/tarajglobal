import React from 'react'
import { motion } from 'framer-motion'
import {
  Laptop,
  Cpu,
  Server,
  Shield,
  Cloud,
  Radio,
  Briefcase,
  Building,
  ArrowUpRight,
} from 'lucide-react'

const INDUSTRIES = [
  { name: 'SaaS', icon: Laptop, desc: 'High-growth B2B software scaling recurring revenue.' },
  { name: 'Technology', icon: Cpu, desc: 'Cutting-edge tech products penetrating enterprise markets.' },
  { name: 'IT Services', icon: Server, desc: 'Managed service providers and digital transformation leaders.' },
  { name: 'Cybersecurity', icon: Shield, desc: 'InfoSec platforms engaging CISOs and security committees.' },
  { name: 'Cloud', icon: Cloud, desc: 'Multi-cloud infrastructure and DevOps architecture.' },
  { name: 'Telecom', icon: Radio, desc: 'Network carriers and next-gen connectivity providers.' },
  { name: 'Professional Services', icon: Briefcase, desc: 'Strategic consulting and corporate advisory firms.' },
  { name: 'Enterprise Solutions', icon: Building, desc: 'Complex multi-stakeholder ERP and enterprise tools.' },
]

export default function BlueprintIndustries() {
  return (
    <section
      id="industries-section"
      className="relative py-24 lg:py-32 bg-[#F8FAFC] text-[#0F172A] border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                INDUSTRIES WE SERVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
              Built for Modern <br className="hidden sm:inline" />
              B2B Teams
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md">
            We serve a wide range of industries with customized B2B growth solutions.
          </p>
        </div>

        {/* 8 Industry Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon

            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6D00] hover:shadow-xl hover:shadow-slate-200/60 cursor-pointer min-h-[190px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-[#FF6D00]/10 group-hover:text-[#FF6D00] transition-colors">
                      <Icon className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-[#FF6D00] group-hover:bg-[#FF6D00] transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase text-slate-900 tracking-tight group-hover:text-[#FF6D00] transition-colors">
                    {ind.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  SPECIALIZED PRACTICE
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
