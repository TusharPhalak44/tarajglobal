import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import FullFunnelProcess from './components/FullFunnelProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for Full Funnel Demand ──────────────────────────

const fullFunnelSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Full Funnel Demand Generation Services",
      "description": "Accelerate B2B pipeline velocity with Taraj Global's Full Funnel Demand services, connecting buyer intent, multi-touch committee nurturing, and sales-ready meeting generation powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/full-funnel-demand",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "Full Funnel Demand Generation Services",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarajglobal.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tarajglobal.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Full Funnel Demand", "item": "https://tarajglobal.com/full-funnel-demand" },
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

const FullFunnelDemand = () => {
  return (
    <>
      <SEO
        title="B2B Demand Generation Services | Tech-Powered Sales-Ready Pipeline | TaRaj Global"
        description="Taraj Global unifies top-of-funnel brand awareness, mid-funnel buying committee education, and bottom-of-funnel sales qualification into a high-velocity revenue engine."
        keywords="full funnel demand, full funnel demand generation, B2B demand generation, pipeline velocity, buying committee engagement, intent data demand, sales-ready leads, B2B pipeline growth, DemandFlow Bridge"
        canonical="/full-funnel-demand"
        ogTitle="B2B Demand Generation Services | Tech-Powered Sales-Ready Pipeline | TaRaj Global"
        ogDescription="Unify top-of-funnel brand intent, mid-funnel committee education, and bottom-of-funnel sales qualification into an unstoppable B2B revenue engine."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={fullFunnelSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is Full Funnel Demand */}
        <WhatIsService />

        {/* Section 3 — Target Audiences */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Process Workflow */}
        <FullFunnelProcess />

        {/* Section 6 — What Taraj Delivers */}
        <WhatTarajDelivers />

        {/* Section 7 — Why Choose Taraj Global */}
        <WhyChoose />

        {/* Section 8 — FAQ */}
        <FAQ />

        {/* Section 9 — CTA */}
        <CTA />
      </div>
    </>
  )
}

export default FullFunnelDemand
