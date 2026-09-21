import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, Lock, Flame, Award } from 'lucide-react'

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: '100% Replacement SLA',
    tag: 'CONTRACT-BACKED',
    desc: 'If any delivered lead fails agreed BANT criteria, has invalid contact details, or becomes non-responsive, we replace it immediately at zero cost.',
  },
  {
    icon: Flame,
    title: '98%+ Inbox Deliverability',
    tag: 'TECHNICAL HYGIENE',
    desc: 'Dedicated IP warming, DMARC/DKIM/SPF configuration, and custom tracking domains ensure your outreach lands in priority inboxes—never spam.',
  },
  {
    icon: Award,
    title: '85%+ Show-Up Rate',
    tag: 'CALENDAR GUARANTEE',
    desc: 'Every scheduled appointment includes reminder workflows and direct calendar sync to maintain industry-leading discovery call attendance.',
  },
  {
    icon: Lock,
    title: 'Strict Global Compliance',
    tag: 'LEGAL INTEGRITY',
    desc: 'Full compliance with GDPR, CAN-SPAM, and CCPA regulations. We respect privacy thresholds while legitimately engaging business buyers.',
  },
]

export default function ServicesGuarantees() {
  return (
    <section
      id="services-guarantees-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                TRUST & ASSURANCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Enterprise Performance <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Backed By Clear SLAs
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            We operate on accountability. Every engagement is bound by measurable delivery criteria to safeguard your acquisition budget.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES.map((item, idx) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF6D00]/50 p-7 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6D00]/10 border border-[#FF6D00]/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#FF6D00]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 text-white/60">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase text-white tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CONTRACTUALLY SECURED</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
