import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const RESULTS = [
  {
    id: 'leads',
    value: 1500,
    suffix: '+',
    label: 'Qualified leads a month',
    context: 'Matched to each client’s ideal customer and qualification rules.',
    goals: ['convert', 'meetings'],
  },
  {
    id: 'accuracy',
    value: 99.8,
    suffix: '%',
    decimals: 1,
    label: 'Data accuracy SLA',
    context: 'Every contact is researched and verified before a campaign sends.',
    goals: ['data'],
  },
  {
    id: 'campaigns',
    value: 2100,
    suffix: '+',
    label: 'Campaigns delivered',
    context: 'Demand generation, account-based marketing and appointment setting.',
    goals: ['reach'],
  },
  {
    id: 'industries',
    value: 12,
    suffix: '+',
    label: 'Industries served',
    context: 'SaaS, cloud, cybersecurity, FinTech, HealthTech and more.',
    goals: [],
  },
]

function Counter({ value, decimals = 0, start }) {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? value : 0)

  useEffect(() => {
    if (!start || reducedMotion) {
      if (reducedMotion) setDisplay(value)
      return
    }
    let frame
    const began = performance.now()
    const tick = (now) => {
      const t = Math.min((now - began) / 1400, 1)
      setDisplay(value * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, value, reducedMotion])

  return display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export const Stats = ({ activeGoal }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const featured = RESULTS.find((item) => activeGoal && item.goals.includes(activeGoal.id)) || RESULTS[0]
  const rest = RESULTS.filter((item) => item.id !== featured.id)

  return (
    <section id="results" className="relative bg-background py-20 lg:py-28" aria-labelledby="results-heading">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">04 — PROVEN TRACK RECORD</p>
          <h2 id="results-heading" className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-text-primary">
            Measurable Impact Delivered Across <span className="text-cta">Global Enterprises</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-text-secondary">
            {activeGoal
              ? 'Key performance benchmarks aligned directly with your selected growth priority.'
              : 'Verified performance metrics delivered across ongoing enterprise client engagements.'}
          </p>
        </div>

        <div ref={ref} className="mt-12 rounded-[28px] border border-white/10 bg-[#07090E] p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-cta">
                {activeGoal ? 'Primary Strategic Benchmark' : 'Featured Growth Metric'}
              </p>
              <p className="mt-4 text-6xl sm:text-7xl lg:text-8xl font-black tracking-[-0.05em] text-primary tabular-nums leading-none">
                <Counter value={featured.value} decimals={featured.decimals} start={inView} />
                <span>{featured.suffix}</span>
              </p>
              <h3 className="mt-5 text-2xl font-bold text-text-primary">{featured.label}</h3>
              <p className="mt-2 max-w-sm text-[16px] leading-relaxed text-text-secondary">{featured.context}</p>
            </div>

            <ul className="lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-16">
              {rest.map((item) => (
                <li key={item.id} className="border-b border-white/10 py-6 first:pt-0 last:border-b-0 last:pb-0">
                  <p className="text-4xl sm:text-5xl font-black tracking-[-0.04em] text-text-primary tabular-nums">
                    <Counter value={item.value} decimals={item.decimals} start={inView} />
                    <span className="text-primary">{item.suffix}</span>
                  </p>
                  <h3 className="mt-2 text-[16px] font-bold text-text-primary">{item.label}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-text-secondary">{item.context}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
