import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Laptop, Cpu, Server, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const INDUSTRIES = [
  {
    id: 'saas',
    title: 'SaaS & Cloud Platforms',
    eyebrow: 'Subscription & PLG Velocity',
    challenge: 'Overcome saturated ad channels and high customer churn.',
    solution: 'Multi-threaded outbound targeting technical champions and budget-holding finance executives across accounts ready for subscription expansion.',
    stats: 'Enterprise ARR Pipeline Focus',
    icon: Laptop,
    accent: '#00A6FF',
  },
  {
    id: 'enterprise-tech',
    title: 'Enterprise Technology',
    eyebrow: 'Complex Buying Committees',
    challenge: 'Navigate 6-to-18 month sales cycles with 8+ stakeholders.',
    solution: 'Account-Based Marketing (ABM) cadences orchestrating personalized messaging across IT directors, CTOs, and procurement leadership.',
    stats: 'C-Suite Committee Consensus',
    icon: Cpu,
    accent: '#FF6D00',
  },
  {
    id: 'it-services',
    title: 'IT Services & System Integrators',
    eyebrow: 'RFP & Modernization Deals',
    challenge: 'Differentiate against commoditized digital transformation vendors.',
    solution: 'Targeted executive appointment setting that surfaces unannounced modernization initiatives and RFPs before public tender.',
    stats: 'Strategic Advisory Engagements',
    icon: Server,
    accent: '#10B981',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & FinTech',
    eyebrow: 'High-Compliance Verticals',
    challenge: 'Engage risk-averse CISOs and compliance leaders weary of vendor noise.',
    solution: 'Strictly validated, intent-driven outreach addressing specific compliance benchmarks (SOC2, HIPAA, GDPR) with zero generic blast tactics.',
    stats: 'Verified Security Buyer Intent',
    icon: ShieldCheck,
    accent: '#8B5CF6',
  },
]

export default function IndustriesServed() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="industries"
      className="relative bg-surface py-16 sm:py-20 lg:py-24 border-b border-border/80 overflow-hidden"
      aria-labelledby="industries-heading"
    >
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-border/60">
          <div className="max-w-2xl">
            <div className="mb-3">
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-primary">
                VERTICAL EXPERTISE
              </span>
            </div>
            <h2
              id="industries-heading"
              className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] leading-[1.12] text-text-primary"
            >
              Built for Complex{' '}
              <span className="text-cta">B2B Buying Journeys.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-secondary">
              We engineer outbound pipeline tailored to the technical nuances, extended sales cycles, and multi-stakeholder committees of high-growth technology sectors.
            </p>
          </div>

          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-primary hover:text-primary transition-colors self-start md:self-auto"
          >
            <span>Explore All Service Frameworks</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Industries Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon

            return (
              <motion.div
                key={ind.id}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reducedMotion ? {} : { translateY: -4 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/90 bg-background/90 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-text-muted">
                      SECTOR {i + 1}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    {ind.eyebrow}
                  </span>

                  <h3 className="text-lg font-bold text-text-primary tracking-tight leading-snug mb-3">
                    {ind.title}
                  </h3>

                  <div className="rounded-lg bg-surface/80 p-3 mb-3 border border-border/40">
                    <p className="text-[11.5px] font-medium text-cta leading-snug">
                      <strong>Challenge:</strong> {ind.challenge}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] leading-relaxed text-text-secondary">
                    {ind.solution}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-xs font-semibold text-text-muted group-hover:text-primary transition-colors">
                  <CheckCircle2 size={13} className="text-primary shrink-0" />
                  <span>{ind.stats}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
