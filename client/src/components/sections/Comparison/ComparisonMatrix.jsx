import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, X, AlertTriangle, Sparkles, Crown, Zap } from 'lucide-react'

const comparisonRows = [
  {
    feature: 'Data Verification Standard',
    brokers: { text: 'Static database (30%+ bounce rate)', status: 'bad' },
    inhouse: { text: 'Manual SDR research (time-consuming)', status: 'warning' },
    taraj: { text: '99.8% Triple-Validated ICP & Live Phone/Email', status: 'good' },
  },
  {
    feature: 'Campaign Launch Speed',
    brokers: { text: 'Immediate (unqualified raw list)', status: 'warning' },
    inhouse: { text: '3 to 6 Months (Hiring + Onboarding)', status: 'bad' },
    taraj: { text: '48 to 72 Hours Full Setup & Outreach', status: 'good' },
  },
  {
    feature: 'Buying Committee Coverage',
    brokers: { text: 'Single contact email blast', status: 'bad' },
    inhouse: { text: 'Limited rep bandwidth per account', status: 'warning' },
    taraj: { text: 'Multi-Threaded Account-Based Marketing (ABM)', status: 'good' },
  },
  {
    feature: 'Lead Qualification Rigor',
    brokers: { text: 'Zero qualification (raw contacts)', status: 'bad' },
    inhouse: { text: 'Variable rep qualification discipline', status: 'warning' },
    taraj: { text: 'Full BANT / MEDDIC & Need Assessment', status: 'good' },
  },
  {
    feature: 'Contract Flexibility & Risk',
    brokers: { text: 'Expensive Annual Lock-in', status: 'bad' },
    inhouse: { text: 'High Fixed Salaries & Tech Stack Costs', status: 'bad' },
    taraj: { text: 'Agile Engagements, Outcome-Aligned', status: 'good' },
  },
]

export const ComparisonMatrix = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-label="Why Us Comparison Matrix">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-primary/8 dark:bg-[#00A6FF]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="flex items-center justify-center gap-2 mb-3.5">
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary/70 dark:text-[#00E5FF]/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                The Strategic Advantage
              </span>
            </div>

            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-cta/70 dark:text-orange-400/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight leading-[1.16] overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              Why Leaders Choose{' '}
              <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
                Taraj Global
              </span>
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            A transparent side-by-side look at how our verified demand generation framework outperforms outdated methods.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-[#00E5FF] to-cta mx-auto rounded-full mt-6" />
        </div>

        {/* ── Responsive Comparison Table Container ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/80 dark:border-white/10 bg-surface/90 dark:bg-[#070B14]/90 backdrop-blur-xl shadow-xl overflow-hidden"
        >
          {/* Table Grid Headers */}
          <div className="grid grid-cols-12 border-b border-border/70 dark:border-white/10 bg-black/5 dark:bg-white/[0.02]">
            <div className="col-span-12 md:col-span-4 p-5 sm:p-6 font-extrabold text-sm sm:text-base text-text-primary flex items-center">
              Strategic Growth Capabilities
            </div>
            
            <div className="hidden md:flex md:col-span-2.5 lg:col-span-2.5 p-5 text-center flex-col justify-center border-l border-border/70 dark:border-white/10 opacity-75">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Static List Brokers</span>
              <span className="text-[10px] text-text-muted mt-0.5">e.g. Raw Data Vendors</span>
            </div>

            <div className="hidden md:flex md:col-span-2.5 lg:col-span-2.5 p-5 text-center flex-col justify-center border-l border-border/70 dark:border-white/10 opacity-75">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">In-House SDR Team</span>
              <span className="text-[10px] text-text-muted mt-0.5">Internal Hiring Model</span>
            </div>

            {/* Taraj Global Highlighted Column Header */}
            <div className="col-span-12 md:col-span-3 lg:col-span-3 p-5 sm:p-6 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent border-l border-primary/30 text-center flex flex-col justify-center relative">
              <div className="inline-flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-primary dark:text-[#00E5FF] uppercase tracking-widest mb-1">
                <Crown size={12} className="text-amber-400" />
                Recommended Partner
              </div>
              <span className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
                Taraj Global
              </span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-border/60 dark:divide-white/5">
            {comparisonRows.map((row, idx) => (
              <div
                key={row.feature}
                className="grid grid-cols-12 hover:bg-primary/5 transition-colors duration-200"
              >
                {/* Feature Name */}
                <div className="col-span-12 md:col-span-4 p-5 sm:p-6 flex items-center">
                  <span className="text-sm font-extrabold text-text-primary tracking-tight">
                    {row.feature}
                  </span>
                </div>

                {/* Brokers */}
                <div className="col-span-6 md:col-span-2.5 lg:col-span-2.5 p-4 sm:p-5 border-t md:border-t-0 md:border-l border-border/60 dark:border-white/5 flex items-center gap-2 text-xs text-text-secondary">
                  <X size={15} className="text-rose-500 flex-shrink-0" />
                  <span className="leading-snug">{row.brokers.text}</span>
                </div>

                {/* In-House */}
                <div className="col-span-6 md:col-span-2.5 lg:col-span-2.5 p-4 sm:p-5 border-t md:border-t-0 md:border-l border-border/60 dark:border-white/5 flex items-center gap-2 text-xs text-text-secondary">
                  <AlertTriangle size={15} className="text-amber-500 flex-shrink-0" />
                  <span className="leading-snug">{row.inhouse.text}</span>
                </div>

                {/* Taraj Global Highlighted Row */}
                <div className="col-span-12 md:col-span-3 lg:col-span-3 p-4 sm:p-5 bg-primary/[0.04] border-t md:border-t-0 md:border-l border-primary/30 flex items-center gap-2.5 text-xs font-bold text-text-primary">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="leading-snug text-primary dark:text-[#00E5FF]">
                    {row.taraj.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="p-6 bg-gradient-to-r from-primary/10 via-transparent to-cta/10 border-t border-border/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="text-primary animate-pulse" size={20} />
              <span className="text-xs sm:text-sm font-bold text-text-primary">
                Ready to accelerate pipeline growth without hiring overhead?
              </span>
            </div>
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-cta text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>Schedule Strategy Call</span>
              <Sparkles size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ComparisonMatrix
