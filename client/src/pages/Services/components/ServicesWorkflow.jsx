import React from 'react'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, Zap, UserCheck, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'TAM & ICP Blueprint',
    subtitle: 'Strategic Account Definition',
    icon: Search,
    desc: 'We map your Total Addressable Market, filter by tech-stack, headcount, and revenue, and outline exact buyer committee titles.',
  },
  {
    num: '02',
    title: 'Data & Intent Audit',
    subtitle: 'Triple-Verification Protocol',
    icon: ShieldCheck,
    desc: 'Every contact is phone-verified and validated via SMTP handshakes while tracking active intent surges across your category.',
  },
  {
    num: '03',
    title: 'Multi-Touch Cadence',
    subtitle: 'High-Impact Execution',
    icon: Zap,
    desc: 'Our senior pipeline specialists launch synchronized outreach cadences spanning warm emails, syndication, and qualification calls.',
  },
  {
    num: '04',
    title: 'CRM Delivery & Scale',
    subtitle: 'Zero-Friction Handoff',
    icon: UserCheck,
    desc: 'Confirmed discovery calls sync directly to your reps’ calendars and qualified leads flow straight into Salesforce or HubSpot.',
  },
]

export default function ServicesWorkflow() {
  return (
    <section
      id="services-workflow-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                EXECUTION PROTOCOL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              How We Turn Cold Outbound <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Into Qualified Revenue
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            A battle-tested 4-step pipeline architecture delivering predictable sales conversations month over month.
          </p>
        </div>

        {/* 4 Connected Chronological Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF6D00]/50 p-7 flex flex-col justify-between transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#FF6D00]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#FF6D00]/40 group-hover:bg-[#FF6D00]/10 transition-colors">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-[#FF6D00] transition-colors" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6D00] font-semibold block mb-1">
                    {step.subtitle}
                  </span>

                  <h3 className="text-xl font-bold uppercase text-white tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>STAGE {step.num} / 04</span>
                  <span className="text-[#FF6D00] font-bold">ACTIVE PROTOCOL</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
