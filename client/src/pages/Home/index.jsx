import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import SEO from '@components/common/SEO'
import Hero from '@components/sections/Hero/Hero'
import GetToKnowUs from '@components/sections/GetToKnowUs/GetToKnowUs'
import OurClients from '@components/sections/OurClients/OurClients'
import Services from '@components/sections/Services/Services'
import BusinessOutcomes from '@components/sections/BusinessOutcomes/BusinessOutcomes'
import Testimonials from '@components/sections/Testimonials/Testimonials'
import WhyTarajGlobal from '@components/sections/WhyTarajGlobal/WhyTarajGlobal'
import HowWeWork from '@components/sections/HowWeWork/HowWeWork'
import HomeFAQ from '@components/sections/FAQ/HomeFAQ'
import AudienceIntelligence from '@components/sections/AudienceIntelligence'
import { FlowButton } from '@components/ui/FlowButton'
import { useSEOData } from '@hooks/useSEOData'

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
    },
    {
      "@type": "FAQPage",
      "@id": "https://tarajglobal.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a tech-powered B2B demand generation agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A tech-powered B2B demand generation agency combines strategic account outreach with custom software infrastructure. Rather than relying solely on manual processes or generic third-party databases, tech-powered agencies build proprietary verification and CRM tools to deliver 99.8% data accuracy and predictable pipeline growth."
          }
        },
        {
          "@type": "Question",
          "name": "How does TaRaj Global verify prospect data before client delivery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TaRaj Global processes all prospect research through an in-house verification engine. This custom tool conducts multi-pass validation on direct-dial phone numbers and tests email deliverability in real time, eliminating bounce rates and duplicate contacts before leads flow into our client delivery CRM."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between B2B lead generation and demand generation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B lead generation focuses on acquiring individual contact details (MQLs). B2B demand generation is a full-funnel strategy designed to generate category awareness, nurture intent-qualified buying committees, and convert accounts into verified sales opportunities (SQLs) and closed-loop revenue."
          }
        },
        {
          "@type": "Question",
          "name": "How does TaRaj Global support pipeline growth across US, EMEA, and APAC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TaRaj Global maintains global data verification operations compliance-mapped for North America (CCPA), Europe (GDPR), and APAC. Our infrastructure enables technology companies to scale personalized account outreach to enterprise decision-makers worldwide."
          }
        }
      ]
    }
  ]
}

const CHAPTERS = [
  { id: 'hero', label: 'The Growth Engine' },
  { id: 'enterprise-architecture', label: 'Growth Architecture' },
  { id: 'services', label: 'Our Services' },
  { id: 'reach', label: 'Audience Intelligence' },
  { id: 'trust', label: 'Client Trust' },
  { id: 'testimonials', label: 'Client Testimonials' },
  { id: 'why-taraj', label: 'Why Taraj Global' },
  { id: 'how-we-work', label: 'How We Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta', label: 'Get Started' },
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
      { rootMargin: '-40% 0px -45% 0px' }
    )
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page navigation chapters"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 pointer-events-none"
    >
      {CHAPTERS.map(({ id, label }, i) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-end gap-3 pointer-events-auto self-end max-w-fit"
          >
            <span
              className={`pointer-events-none rounded-md bg-[#07090E]/95 border border-white/10 px-2.5 py-1 text-[11.5px] font-semibold opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 shadow-xl ${
                isActive ? 'text-white' : 'text-text-secondary'
              }`}
            >
              <span className="font-mono text-[#00A6FF] mr-1.5">0{i + 1}</span>
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 shrink-0 ${
                isActive ? 'h-6 w-1.5 bg-[#00A6FF]' : 'h-1.5 w-1.5 bg-slate-500/40 group-hover:bg-white'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}

function NextStep() {
  return (
    <section
      id="cta"
      className="relative bg-background py-12 sm:py-14 lg:py-16 overflow-hidden border-t border-white/[0.08]"
      aria-labelledby="cta-heading"
    >
      <div className="relative mx-auto max-w-[850px] px-5 sm:px-8 text-center">
        
        {/* Eyebrow (Clean Pre-header matching Hero) */}
        <div className="inline-flex items-center justify-center mb-2.5 sm:mb-3">
          <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
            GET STARTED
          </p>
        </div>

        {/* Headline */}
        <h2
          id="cta-heading"
          className="text-2xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.03em] leading-[1.15] text-white"
        >
          Ready to Accelerate Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
            Global B2B Revenue Pipeline
          </span>
          ?
        </h2>

        {/* Supporting Copy */}
        <p className="mt-3.5 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Partner with a tech-powered demand generation agency that combines custom verification tools with a unified CRM delivery engine across US, EMEA, and APAC.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link to="/contact" className="w-full sm:w-auto">
            <FlowButton
              text="Schedule Your Pipeline Strategy Call"
              variant="primary"
              className="w-full sm:w-auto min-h-[48px] px-8 justify-center text-[15px] font-bold shadow-[0_10px_25px_-8px_rgba(255,109,0,0.5)]"
            />
          </Link>
          <a
            href="mailto:info@tarajglobal.com"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-[14px] font-semibold text-white hover:border-[#00A6FF] hover:bg-[#00A6FF]/10 transition-colors w-full sm:w-auto"
          >
            <Mail size={15} className="text-[#00A6FF]" />
            <span>Talk to Our Team</span>
          </a>
        </div>

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

  return (
    <>
      <SEO {...seoData} schemaJson={homeSchema} />
      
      <ChapterRail />
      
      {/* 01. Hero Section: The Growth Engine */}
      <Hero />

      {/* 02. Enterprise Growth Architecture */}
      <GetToKnowUs />

      {/* 03. Our Services */}
      <Services />

      {/* 04. Global Audience Intelligence */}
      <AudienceIntelligence />

      {/* 05. Client Trust (One Client Scroller Only, Above Testimonials) */}
      <OurClients />

      {/* 07. Client Testimonials */}
      <Testimonials />

      {/* 08. Why Taraj Global */}
      <WhyTarajGlobal />

      {/* 09. How We Work */}
      <HowWeWork />

      {/* 10. Frequently Asked Questions */}
      <HomeFAQ />

      {/* 11. Final Call to Action */}
      <NextStep />
    </>
  )
}

export default Home
