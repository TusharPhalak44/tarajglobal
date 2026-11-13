import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import AbmProcess from './components/AbmProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const abmSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Account-Based Marketing (ABM) Services",
      "description": "High-precision Account-Based Marketing (ABM) services delivering verified multi-stakeholder enterprise buying committees, bespoke 1:1 personalized value narratives, and closed-loop CRM synchronization powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/abm",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "Account-Based Marketing Services",
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
          "name": "Account-Based Marketing",
          "item": "https://tarajglobal.com/abm",
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

const Abm = () => {
  return (
    <>
      <SEO
        title="Account-Based Marketing (ABM) Services | Tech-Powered Enterprise Account Engagement | TaRaj Global"
        description="Engage high-value target accounts and full buying committees across US, EMEA, and APAC. TaRaj Global combines AI-assisted account scoring, intent telemetry, and a 99.8% Data Accuracy SLA."
        keywords="account-based marketing services, account-based marketing, ABM services, enterprise lead generation, ABM agency, 1:1 ABM campaigns, target account list, buying committee engagement, intent data ABM, DemandFlow Bridge, enterprise pipeline growth"
        canonical="/abm"
        ogTitle="Account-Based Marketing (ABM) Services | Tech-Powered Enterprise Account Engagement | TaRaj Global"
        ogDescription="Engage high-value target accounts and full buying committees across US, EMEA, and APAC. TaRaj Global combines AI-assisted account scoring, intent telemetry, and a 99.8% Data Accuracy SLA."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={abmSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is ABM */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution Transformation */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step ABM Workflow */}
        <AbmProcess />

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

export default Abm
