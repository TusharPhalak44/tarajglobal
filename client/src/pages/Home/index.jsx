import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import SEO from '@components/common/SEO'
import Hero from '@components/sections/Hero'
import GrowthIntro from '@components/sections/GrowthIntro/GrowthIntro'
import OurClients from '@components/sections/OurClients'
import HowWeWork from '@components/sections/HowWeWork'
import Services from '@components/sections/Services/Services'
import Stats from '@components/sections/Stats'
import Testimonials from '@components/sections/Testimonials/Testimonials'
import { FlowButton } from '@components/ui/FlowButton'
import { useSEOData } from '@hooks/useSEOData'
import { FIXES, GOALS, useRecovery } from '@context/RecoveryContext'

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tarajglobal.com/#organization",
      "name": "Taraj Global",
      "url": "https://tarajglobal.com",
      "logo": "https://tarajglobal.com/logo.png",
      "description": "B2B Demand Generation, Lead Generation, ABM, and Technology Marketing partner for SaaS and enterprise companies.",
      "telephone": "+91-96655-99442",
      "email": "info@tarajglobal.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Space Business Complex, Office No 512 to 517, Grant Rd, Kharadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411014",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.linkedin.com/company/tarajglobal"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://tarajglobal.com/#website",
      "url": "https://tarajglobal.com",
      "name": "Taraj Global",
      "publisher": {
        "@id": "https://tarajglobal.com/#organization"
      }
    }
  ]
}

const CHAPTERS = [
  { id: 'start', label: 'Challenge' },
  { id: 'journey', label: 'Methodology' },
  { id: 'services', label: 'Solutions' },
  { id: 'results', label: 'Impact' },
  { id: 'stories', label: 'Case Studies' },
  { id: 'next', label: 'Consultation' },
]

function ChapterRail() {
  const [active, setActive] = useState(CHAPTERS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page chapters"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
    >
      {CHAPTERS.map(({ id, label }, i) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-end gap-3"
          >
            <span
              className={`rounded-md bg-surface px-2 py-1 text-[12px] font-semibold opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 ${
                isActive ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              <span className="font-mono text-text-muted mr-1.5">0{i + 1}</span>
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive ? 'h-6 w-1.5 bg-primary' : 'h-1.5 w-1.5 bg-slate-400/50 group-hover:bg-text-primary'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}

function RecoveryHandoff() {
  const { route, visited, nextStop } = useRecovery()
  if (!nextStop) return null
  return (
    <Link
      to={nextStop}
      className="group mx-auto mt-8 flex max-w-xl items-center gap-4 rounded-2xl border border-[#00A6FF]/40 bg-[#00A6FF]/[0.07] p-5 text-left transition-colors hover:border-[#00A6FF]"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#00A6FF] text-[15px] font-black text-white">
        {visited.filter((p) => route.includes(p)).length + 1}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">Strategic Growth Roadmap · Recommended Solution</span>
        <span className="mt-0.5 block text-lg font-bold text-text-primary">{FIXES[nextStop].title}</span>
        <span className="block text-[14px] text-text-secondary">{FIXES[nextStop].fixes}</span>
      </span>
      <ArrowRight size={18} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

function NextStep({ activeGoal, onSelectGoal }) {
  return (
    <section id="next" className="relative bg-background py-20 lg:py-28 overflow-hidden" aria-labelledby="next-heading">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-[min(900px,90%)] bg-gradient-to-r from-transparent via-[#00A6FF]/60 to-transparent" />
      <div className="relative mx-auto max-w-[900px] px-5 sm:px-8 text-center">
        <p className="text-[13px] font-mono font-semibold uppercase tracking-[0.16em] text-primary mb-4">
          06 — GET STARTED
        </p>
        <h2 id="next-heading" className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-text-primary">
          {activeGoal ? (
            <>Accelerate your pipeline: <span className="text-cta">"{activeGoal.problem}"</span></>
          ) : (
            <>Ready to scale <span className="text-primary">predictable revenue</span> for your business?</>
          )}
        </h2>
        <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Book a 30-minute strategic pipeline review with our demand generation leaders. We will audit your ICP, analyze your current funnel conversion, and outline a high-impact 90-day pipeline roadmap.
        </p>

        {!activeGoal && (
          <div className="mt-8">
            <p className="text-[13px] text-text-muted mb-3">Explore tailored solutions by growth objective:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => onSelectGoal(goal.id)}
                  className="rounded-full border border-border px-4 py-2 text-[14px] font-medium text-text-secondary hover:border-primary hover:text-text-primary transition-colors"
                >
                  {goal.problem}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeGoal && <RecoveryHandoff />}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/contact" className="w-full sm:w-auto">
            <FlowButton text="Schedule a Pipeline Review" variant="primary" className="w-full sm:w-auto min-h-[48px] justify-center" />
          </Link>
          <a
            href="mailto:info@tarajglobal.com"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-text-secondary hover:text-text-primary transition-colors min-h-[48px] px-4"
          >
            <Mail size={16} /> info@tarajglobal.com
          </a>
        </div>

        {activeGoal && (
          <button
            type="button"
            onClick={() => onSelectGoal(null)}
            className="mt-6 inline-flex items-center gap-1 text-[13px] text-text-muted hover:text-text-primary transition-colors"
          >
            Explore different growth objectives <ArrowRight size={13} />
          </button>
        )}
      </div>
    </section>
  )
}

function Home() {
  const { seoData } = useSEOData('page', 'home', {
    title: "B2B Lead Generation & Demand Generation Agency | Taraj Global",
    description: "Scale your sales pipeline with Taraj Global. We deliver high-impact B2B lead generation, account-based marketing (ABM), appointment setting, and verified B2B data for SaaS and technology companies.",
    keywords: "B2B lead generation, demand generation agency, B2B sales pipeline, SaaS lead generation, qualified B2B leads, account-based marketing agency, B2B appointment setting, intent-based marketing, sales qualified leads, verified B2B intelligence",
    canonical: "/",
    ogTitle: "Taraj Global | Powering Smarter B2B Pipeline Growth",
    ogDescription: "Accelerate pipeline velocity with verified B2B data, demand generation campaigns, and targeted decision-maker outreach.",
    schemaJson: homeSchema
  })

  const { goal: activeGoal, setGoal: setGoalId } = useRecovery()
  const [introClosed, setIntroClosed] = useState(false)

  return (
    <>
      <SEO {...seoData} schemaJson={homeSchema} />
      <GrowthIntro onClose={() => setIntroClosed(true)} />
      <ChapterRail />
      <Hero goals={GOALS} activeGoal={activeGoal} onSelectGoal={setGoalId} replayKey={introClosed ? 'after-intro' : 'initial'} />
      <OurClients />
      <HowWeWork activeGoal={activeGoal} />
      <Services activeGoal={activeGoal} />
      <Stats activeGoal={activeGoal} />
      <Testimonials activeGoal={activeGoal} />
      <NextStep activeGoal={activeGoal} onSelectGoal={setGoalId} />
    </>
  )
}

export default Home
