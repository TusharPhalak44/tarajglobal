import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import MqlProcess from './components/MqlProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const mqlSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Marketing Qualified Leads (MQL) Services",
      "description": "High-fit Marketing Qualified Leads (MQL) generation delivering verified decision-makers exhibiting clear buying intent through personalized outreach, content syndication, and predictive lead scoring.",
      "url": "https://tarajglobal.com/mql-services",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Lead Generation",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tarajglobal.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://tarajglobal.com/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "MQL Services",
          "item": "https://tarajglobal.com/mql-services",
        },
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

const MqlServices = () => {
  return (
    <>
      <SEO
        title="MQL Services | Marketing Qualified Lead Generation | Taraj Global"
        description="Taraj Global provides MQL services that identify, qualify, and deliver marketing qualified leads using B2B data, buyer intent, lead scoring, AI-assisted workflows, and targeted demand generation."
        keywords="MQL Services, MQL Lead Generation, Marketing Qualified Leads, B2B MQL Services, MQL Lead Generation Services, Marketing Qualified Lead Generation, B2B Lead Qualification, Qualified B2B Leads, Lead Scoring, Buyer Intent, B2B Demand Generation, DemandFlow Bridge"
        canonical="/mql-services"
        ogTitle="MQL Services | Marketing Qualified Lead Generation | Taraj Global"
        ogDescription="Taraj Global provides MQL services that identify, qualify, and deliver marketing qualified leads using B2B data, buyer intent, lead scoring, AI-assisted workflows, and targeted demand generation."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={mqlSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Are MQLs */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <MqlProcess />

        {/* Section 6 — What Taraj Global Delivers */}
        <WhatTarajDelivers />

        {/* Section 7 — Why Choose Taraj Global */}
        <WhyChoose />

        {/* Section 8 — FAQ */}
        <FAQ />

        {/* Section 9 — Final CTA */}
        <CTA />

      </div>
    </>
  )
}

export default MqlServices
