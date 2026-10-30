import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import AbxProcess from './components/AbxProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for ABX Services ────────────────────────────────

const abxSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Account Based Experience (ABX) Services",
      "description": "Engage high-value enterprise accounts with synchronized Account Based Experiences (ABX). Taraj Global unites marketing, sales, and executive engagement powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/account-based-experience",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "Account Based Experience Services",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarajglobal.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tarajglobal.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Account Based Experience", "item": "https://tarajglobal.com/account-based-experience" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

// ─── Page Component ───────────────────────────────────────────────────────────

const AccountBasedExperience = () => {
  return (
    <>
      <SEO
        title="Account Based Experience (ABX) Services | Modern Account Growth | Taraj Global"
        description="Evolve your ABM into synchronized Account Based Experiences. Taraj Global unifies buyer intent, multi-stakeholder personalization, and high-impact RevOps execution powered by DemandFlow Bridge."
        keywords="account based experience, ABX services, modern ABM, enterprise account engagement, buying committee orchestration, intent data ABX, B2B pipeline acceleration, DemandFlow Bridge"
        canonical="/account-based-experience"
        ogTitle="Account Based Experience (ABX) Services | Modern Account Growth | Taraj Global"
        ogDescription="Deliver personalized, synchronized buying experiences to your most important enterprise accounts. Accelerate consensus, deal velocity, and pipeline revenue."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={abxSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is ABX */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step ABX Workflow */}
        <AbxProcess />

        {/* Section 6 — What Taraj Global Delivers */}
        <WhatTarajDelivers />

        {/* Section 7 — Why Choose Taraj Global */}
        <WhyChoose />

        {/* Section 8 — FAQ */}
        <FAQ />

        {/* Section 9 — Final High-Converting CTA */}
        <CTA />
      </div>
    </>
  )
}

export default AccountBasedExperience
