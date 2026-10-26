import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Check, Users, Search, ShieldCheck, BarChart3, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { trackCtaClick, buildTrackedUrl } from '@utils/utmTracker'


// ─── Pipeline Step Data ─────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  {
    id: 'target',
    label: 'ICP Targeting',
    desc: 'Account & tech stack match',
    icon: Search,
    accent: '#00A6FF',
  },
  {
    id: 'decision',
    label: 'Decision Maker ID',
    desc: 'VP / C-Suite verification',
    icon: Users,
    accent: '#38BDF8',
  },
  {
    id: 'intent',
    label: 'Intent Signal',
    desc: 'Buying surge detected',
    icon: BarChart3,
    accent: '#A78BFA',
  },
  {
    id: 'verify',
    label: 'Dual-Layer Audit',
    desc: 'SMTP & direct dial vetted',
    icon: ShieldCheck,
    accent: '#34D399',
  },
  {
    id: 'deliver',
    label: 'Sales-Ready HQL',
    desc: 'CRM push · 0% bounce',
    icon: Send,
    accent: '#FF8C42',
  },
]

// ─── Pipeline Visual ────────────────────────────────────────────────────────

function PipelineVisual({ prefersReducedMotion }) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStep(PIPELINE_STEPS.length - 1)
      return
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length)
    }, 2400)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface, #121212)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
      }}
      role="img"
      aria-label="B2B lead qualification pipeline — from ICP targeting to sales-ready HQL delivery"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))' }}
      >
        <span className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
          Qualification Pipeline
        </span>
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#34D399' }}
          />
          <span className="text-[11px] font-medium text-text-secondary">
            Active
          </span>
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="p-4 sm:p-5 space-y-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const isActive = activeStep === idx
          const isCompleted = idx < activeStep
          const Icon = step.icon

          return (
            <motion.div
              key={step.id}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                    opacity: isActive || isCompleted ? 1 : 0.45,
                  }
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex items-center gap-3.5 rounded-xl px-4 py-3"
              style={{
                background: isActive
                  ? `linear-gradient(90deg, ${step.accent}0D 0%, transparent 100%)`
                  : 'transparent',
                opacity: prefersReducedMotion ? 1 : undefined,
              }}
            >
              {/* Step number + connector */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isActive
                      ? `${step.accent}1A`
                      : isCompleted
                        ? `${step.accent}12`
                        : 'var(--surface-alt, rgba(255,255,255,0.04))',
                    border: `1.5px solid ${isActive || isCompleted
                      ? `${step.accent}55`
                      : 'var(--border, rgba(255,255,255,0.08))'
                      }`,
                  }}
                >
                  {isCompleted ? (
                    <Check
                      className="w-3.5 h-3.5"
                      style={{ color: step.accent }}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Icon
                      className="w-3.5 h-3.5 transition-colors duration-300"
                      style={{
                        color: isActive ? step.accent : 'var(--text-muted, #94A3B8)',
                      }}
                      strokeWidth={1.8}
                    />
                  )}
                </div>
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-[13px] font-semibold leading-tight transition-colors duration-300"
                  style={{
                    color: isActive
                      ? 'var(--text-primary, #F5F5F5)'
                      : isCompleted
                        ? 'var(--text-primary, #F5F5F5)'
                        : 'var(--text-muted, #94A3B8)',
                  }}
                >
                  {step.label}
                </div>
                <div
                  className="text-[11px] mt-0.5 transition-colors duration-300"
                  style={{
                    color: isActive
                      ? step.accent
                      : 'var(--text-muted, #64748B)',
                  }}
                >
                  {step.desc}
                </div>
              </div>

              {/* Status indicator */}
              <div className="shrink-0">
                {isCompleted && (
                  <span
                    className="inline-block text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      color: step.accent,
                      background: `${step.accent}14`,
                    }}
                  >
                    Done
                  </span>
                )}
                {isActive && !prefersReducedMotion && (
                  <motion.span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: step.accent }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom Stats */}
      <div
        className="grid grid-cols-3 gap-4 px-5 py-3.5"
        style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.08))' }}
      >
        {[
          { label: 'Accuracy SLA', value: '99.8%', accent: '#34D399' },
          { label: 'Pipeline Lift', value: '3.8×', accent: '#FF8C42' },
          { label: 'Bounce Rate', value: '0.0%', accent: '#00A6FF' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-[11px] text-text-secondary mb-0.5"
              style={{ fontWeight: 500 }}
            >
              {stat.label}
            </div>
            <div
              className="text-base font-bold"
              style={{ color: stat.accent }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Hero Component for HQL Services ──────────────────────────────────────────

export default function HqlHero() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  const handleStartCampaign = () => {
    trackCtaClick({
      section_id: 'hero',
      section_name: 'Hero Section',
      cta_text: 'Deploy HQL Campaign',
      destination_url: '/contact',
      utm_campaign: 'hql_services'
    })
    navigate(buildTrackedUrl('/contact', {
      sectionId: 'hero',
      sectionName: 'Hero Section',
      ctaText: 'Deploy HQL Campaign',
      customCampaign: 'hql_services'
    }))
  }

  const handleSeeHowItWorks = () => {
    trackCtaClick({
      section_id: 'hero',
      section_name: 'Hero Section',
      cta_text: 'See How It Works',
      destination_url: '#hql-process-workflow',
      utm_campaign: 'hql_services'
    })
    const el = document.getElementById('hql-process-workflow')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section
      id="hero"
      data-cta-section="Hero Section"
      ref={sectionRef}
      className="relative min-h-[80vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden bg-background pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-10 lg:pb-8 transition-colors duration-300"
      aria-label="High-Quality Leads (HQL) Hero"
    >

      {/* Background — soft radial glows, no grid/scanline */}
      <div className="absolute inset-0 bg-background" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 20% 50%, rgba(0,166,255,0.06) 0%, transparent 70%),
              radial-gradient(ellipse 40% 45% at 80% 60%, rgba(167,139,250,0.05) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-6 lg:pb-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* ── Left: Content ── */}
          <div className="flex flex-col justify-center order-1 lg:order-1">
            {/* Eyebrow */}
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                style={{
                  color: 'var(--primary, #00A6FF)',
                  background: 'rgba(0,166,255,0.08)',
                  border: '1px solid rgba(0,166,255,0.15)',
                }}
              >
                High-Quality Leads
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold tracking-tight leading-[1.15] text-text-primary mb-5"
            >
              <span className="block">Convert High-Intent</span>
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #00A6FF 0%, #A78BFA 100%)',
                }}
              >
                Decision Makers
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-sm sm:text-[15px] text-text-secondary leading-relaxed mb-7 max-w-[540px]"
            >
              Stop wasting SDR cycles on unverified contacts. TaRaj Global delivers
              fully vetted, high-intent B2B decision-makers matched to your ICP,
              tech stack, and buying signals — backed by a 99.8% data accuracy SLA
              across US, EMEA, and APAC markets.
            </motion.p>

            {/* Trust indicators */}
            <motion.div {...fadeUp(0.36)} className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-7">
              {[
                'ICP-Matched Contacts',
                'Triple-SMTP Verified',
                '0% Bounce Guarantee',
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: '#34D399' }}
                    strokeWidth={2.5}
                  />
                  <span className="text-xs font-medium text-text-secondary">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.42)} className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                onClick={handleStartCampaign}
                id="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FF6D00 0%, #FF8C42 100%)',
                  boxShadow: '0 2px 12px rgba(255,109,0,0.25)',
                }}
              >
                Deploy HQL Campaign
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleSeeHowItWorks}
                id="hero-cta-secondary"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
                style={{
                  color: 'var(--text-primary, #F5F5F5)',
                  background: 'var(--surface-alt, rgba(255,255,255,0.04))',
                  border: '1px solid var(--border-light, rgba(255,255,255,0.12))',
                }}
              >
                See How It Works
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* ── Right: Pipeline Visual ── */}
          <motion.div
            className="order-2 lg:order-2"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <PipelineVisual prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
