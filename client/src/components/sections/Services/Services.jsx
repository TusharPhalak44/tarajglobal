import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useRecovery } from '@context/RecoveryContext'
import { useReducedMotion } from '@hooks/useReducedMotion'

const LEAKS = [
  {
    id: 'reach',
    label: 'Targeting & Market Acquisition',
    stuck: 'Eliminate wasted budget with precision ICP mapping, intent signals, and multi-channel reach.',
    services: [
      { title: 'Account-Based Marketing', link: '/abm', seals: 'Budget dispersed across non-buying or low-intent accounts', result: 'Every campaign engages verified buying committees at high-fit enterprise accounts.' },
      { title: 'B2B List Building', link: '/b2b-list-building', seals: 'Guesswork and incomplete contact directories', result: 'Custom-researched, human-verified decision-maker contacts matched to your ICP.' },
      { title: 'Database Cleansing', link: '/database-cleansing', seals: 'High bounce rates, duplicate records, and decaying job titles', result: 'Clean, enriched CRM databases ready for high-deliverability outbound campaigns.' },
      { title: 'B2B Email Marketing', link: '/b2b-email-marketing', seals: 'Outbound emails trapped in spam or ignored by executives', result: 'Personalized, multi-touch email cadences that consistently generate replies.' },
      { title: 'Content Syndication', link: '/content-syndication', seals: 'High-value whitepapers and reports unseen by buyers', result: 'Thought leadership placed directly before in-market decision-makers with verified opt-ins.' },
      { title: 'Demand Generation', link: '/demand-generation', seals: 'Unpredictable pipeline overly dependent on single channels', result: 'A balanced, multi-channel demand engine generating continuous pipeline.' },
    ],
  },
  {
    id: 'qualify',
    label: 'Lead Qualification & Nurturing',
    stuck: 'Ensure your sales organization focuses exclusively on verified, purchase-ready decision-makers.',
    services: [
      { title: 'MQL Services', link: '/mql-services', seals: 'Superficial clicks falsely counted as sales leads', result: 'Marketing-engaged prospects verified against defined firmographic criteria.' },
      { title: 'HQL Services', link: '/hql-services', seals: 'Unqualified inquiries lacking purchasing intent', result: 'High-intent leads with confirmed strategic need and active initiative timelines.' },
      { title: 'SQL Services', link: '/sql-services', seals: 'Sales and marketing misalignment over lead quality', result: 'Pre-vetted opportunities agreed upon and ready for immediate sales calls.' },
      { title: 'BANT Lead Generation', link: '/bant-lead-generation', seals: 'Prospects lacking budget authority or deployment timelines', result: '100% validated Budget, Authority, Need, and Timeline before CRM transfer.' },
      { title: 'Lead Nurturing', link: '/lead-nurturing', seals: 'Longer-cycle evaluators abandoned after a single interaction', result: 'Systematic multi-touch sequences keeping your brand top-of-mind until buying.' },
    ],
  },
  {
    id: 'meet',
    label: 'Meeting Acceleration & Conversion',
    stuck: 'Accelerate deal cycles by securing confirmed executive discovery calls on reps’ calendars.',
    services: [
      { title: 'B2B Appointment Setting', link: '/b2b-appointment-setting', seals: 'Qualified buyers lost due to slow outbound follow-up', result: 'Confirmed meetings with key decision-makers accompanied by executive briefings.' },
      { title: 'Webinar Services', link: '/webinar-services', seals: 'Virtual events attended by low-tier audiences with zero follow-through', result: 'Targeted executive attendees converted into active post-event sales pipeline.' },
    ],
  },
]

function FixStage({ leak, nextStop, visited, reducedMotion }) {
  const preferred = leak.services.findIndex((service) => service.link === nextStop)
  const [index, setIndex] = useState(preferred >= 0 ? preferred : 0)

  useEffect(() => {
    setIndex(preferred >= 0 ? preferred : 0)
  }, [leak.id, preferred])

  const service = leak.services[index]
  const isNext = service.link === nextStop
  const seen = visited.includes(service.link)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
      <div role="tablist" aria-label={`${leak.label} solutions`} className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
        {leak.services.map((item, i) => {
          const selected = i === index
          const opened = visited.includes(item.link)
          return (
            <button
              key={item.link}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setIndex(i)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-left text-[14px] font-semibold transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:bg-transparent lg:px-5 lg:py-4 ${
                selected
                  ? 'border-primary bg-primary text-white lg:border-primary lg:bg-transparent lg:text-text-primary'
                  : 'border-white/10 text-text-secondary hover:text-text-primary lg:border-white/15'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`font-mono text-[12px] ${selected ? 'text-white/80 lg:text-primary' : 'text-text-muted'}`}>0{i + 1}</span>
                <span>{item.title}</span>
                {opened && <Check size={14} className={selected ? 'text-white lg:text-success' : 'text-success'} />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="lg:col-span-8" role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={service.link}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            className="flex min-h-[380px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#07090E] p-6 sm:p-8 lg:p-10"
          >
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
                {isNext ? 'Recommended Next Step' : seen ? 'Capability Explored' : 'Featured Capability'}
              </p>
              <h3 className="mt-3 text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-text-primary">
                {service.title}
              </h3>
            </div>

            <div className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#EF4444]/25 bg-[#EF4444]/[0.07] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F87171]">The Bottleneck</p>
                <p className="mt-3 text-lg font-semibold leading-snug text-text-primary">{service.seals}</p>
              </div>
              <div className="rounded-2xl border border-[#00A6FF]/30 bg-[#00A6FF]/[0.08] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Taraj Global Impact</p>
                <p className="mt-3 text-lg font-semibold leading-snug text-text-primary">{service.result}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={service.link}
                className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-12px_rgba(255,109,0,0.8)] hover:bg-cta-hover transition-colors"
              >
                Explore Solution
                <ArrowRight size={16} />
              </Link>
              {seen && <span className="text-[13px] font-semibold text-success">Included in your pipeline acceleration roadmap.</span>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const Services = ({ activeGoal }) => {
  const { visited, nextStop } = useRecovery()
  const reducedMotion = useReducedMotion()
  const [activeId, setActiveId] = useState(activeGoal?.tab || LEAKS[0].id)

  useEffect(() => {
    if (activeGoal?.tab) setActiveId(activeGoal.tab)
  }, [activeGoal])

  const leak = LEAKS.find((item) => item.id === activeId) || LEAKS[0]

  return (
    <section id="services" className="relative bg-surface py-20 lg:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">03 — OUR SERVICES</p>
          <h2 id="services-heading" className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-text-primary">
            Targeted Solutions Engineered for <span className="text-cta">Revenue Growth</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-text-secondary">
            Select a strategic focus area below to explore our targeted demand generation, data intelligence, and conversion capabilities.
          </p>
          {activeGoal && (
            <p className="mt-4 text-[15px] font-semibold text-cta">Selected Priority: {activeGoal.pain}</p>
          )}
        </div>

        <div role="tablist" aria-label="Strategic solution categories" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {LEAKS.map((item, index) => {
            const selected = item.id === activeId
            const isYours = activeGoal?.tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(item.id)}
                className={`rounded-3xl border px-5 py-5 text-left transition-colors ${
                  selected ? 'border-primary bg-[#07090E]' : 'border-white/10 bg-background/30 hover:border-white/25'
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={`font-mono text-[12px] font-semibold ${selected ? 'text-primary' : 'text-text-muted'}`}>0{index + 1}</span>
                  {isYours && <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cta">Your Priority</span>}
                </span>
                <span className="mt-3 block text-lg font-bold leading-snug text-text-primary">{item.label}</span>
                <span className="mt-2 block text-[14px] leading-relaxed text-text-secondary">{item.stuck}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-8 lg:mt-12">
          <FixStage leak={leak} nextStop={nextStop} visited={visited} reducedMotion={reducedMotion} />
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/demandflow-bridge" className="text-[15px] font-semibold text-text-secondary hover:text-primary transition-colors">
            All solutions powered by DemandFlow Bridge™ technology
          </Link>
          <Link to="/services" className="inline-flex items-center gap-2 text-[15px] font-semibold text-text-primary hover:text-primary transition-colors">
            Compare all services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
