import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const LEAK_LABEL = {
  reach: 'Account Targeting',
  data: 'Data Accuracy',
  convert: 'Lead Conversion',
  meetings: 'Meeting Velocity',
}

const STORIES = [
  {
    id: 'innovatetech',
    company: 'InnovateTech Solutions',
    companyLogo: '/Vonage.png',
    leak: 'convert',
    quote: "Taraj Global's data-driven approach and attention to detail sets them apart. They don't just deliver leads; they deliver opportunities that convert. Our partnership has been instrumental in scaling our business growth.",
  },
  {
    id: 'avaya',
    company: 'Avaya Global Systems',
    companyLogo: '/Avaya.webp',
    leak: 'reach',
    quote: 'Taraj Global transformed our B2B demand generation strategy. Their targeted outreach helped us connect with high-value enterprise accounts and build a high-velocity sales pipeline with verified decision-makers.',
  },
  {
    id: 'oracle-partner',
    company: 'Oracle Solutions Partner',
    companyLogo: '/ora.png',
    leak: 'data',
    quote: 'Working with Taraj Global improved our ability to reach verified decision-makers across global accounts. The quality of qualified leads and account-based intelligence is exceptional.',
  },
  {
    id: 'mitel',
    company: 'Mitel Networks',
    companyLogo: '/mitel.png',
    leak: 'meetings',
    quote: "The content syndication and appointment setting programs delivered exceptional results. We've seen a measurable increase in qualified pipeline and executive engagement across our key verticals.",
  },
  {
    id: 'ringcentral',
    company: 'RingCentral Inc.',
    companyLogo: '/ringcentral.png',
    leak: 'meetings',
    quote: 'Their B2B lead generation services helped us reach the right audience and accelerate our sales cycle. The Taraj Global team is proactive, knowledgeable, and focused on delivering real revenue impact.',
  },
  {
    id: 'microsoft-partner',
    company: 'Microsoft Solutions Partner',
    companyLogo: '/micro.png',
    leak: 'data',
    quote: 'Taraj Global provided a targeted B2B lead generation strategy that helped us identify relevant prospects and create predictable new enterprise revenue opportunities with zero duplicate data.',
  },
]

function storyFor(goalId) {
  const index = STORIES.findIndex((story) => story.leak === goalId)
  return index >= 0 ? index : 0
}

export const Testimonials = ({ activeGoal }) => {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(() => storyFor(activeGoal?.id))

  useEffect(() => {
    if (activeGoal?.id) setIndex(storyFor(activeGoal.id))
  }, [activeGoal?.id])

  const current = STORIES[index]
  const sameLeak = activeGoal?.id === current.leak

  return (
    <section id="stories" className="relative bg-surface py-20 lg:py-28" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">05 — CLIENT SUCCESS</p>
          <h2 id="stories-heading" className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-text-primary">
            Trusted by Global Technology Leaders &amp; <span className="text-cta">High-Growth Brands</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-text-secondary">
            Read how enterprise sales and marketing teams scaled qualified pipeline and accelerated deal velocity with Taraj Global.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
          <div role="tablist" aria-label="Choose a client story" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {STORIES.map((story, i) => {
              const selected = i === index
              return (
                <button
                  key={story.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setIndex(i)}
                  className={`flex shrink-0 items-center gap-3 rounded-full border px-3 py-2 text-left transition-colors lg:w-full lg:rounded-2xl lg:px-4 lg:py-3 ${
                    selected
                      ? 'border-primary bg-[#07090E] text-text-primary'
                      : 'border-white/10 text-text-secondary hover:border-white/25 hover:text-text-primary'
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white p-1.5">
                    <img src={story.companyLogo} alt="" className="max-h-full max-w-full object-contain" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-bold">{story.company}</span>
                    <span className={`block text-[12px] ${selected ? 'text-primary' : 'text-text-muted'}`}>{LEAK_LABEL[story.leak]}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-8" role="tabpanel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.22 }}
                className="flex min-h-[380px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#07090E] p-6 sm:p-8 lg:p-10"
              >
                <div>
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {sameLeak ? 'Same leak as yours' : 'Their leak'} · {LEAK_LABEL[current.leak]}
                  </p>
                  <blockquote className="mt-6 text-xl sm:text-3xl font-semibold leading-[1.35] tracking-[-0.02em] text-text-primary">
                    “{current.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white p-2">
                    <img src={current.companyLogo} alt="" className="max-h-full max-w-full object-contain" />
                  </span>
                  <span className="text-lg font-bold text-text-primary">{current.company}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
