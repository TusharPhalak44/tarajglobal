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

// ─── JSON-LD Structured Data for ABM Services ────────────────────────────────

const abmSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Account-Based Marketing (ABM) Services",
      "description": "Win high-value enterprise accounts with bespoke ABM programs. Taraj Global aligns intent data, multi-stakeholder mapping, and personalized 1:1 campaigns powered by DemandFlow Bridge.",
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

const Abm = () => {
  return (
    <>
      <SEO
        title="Account-Based Marketing (ABM) Services | Enterprise B2B Growth | Taraj Global"
        description="Win high-value enterprise accounts with bespoke ABM programs. Taraj Global aligns intent data, multi-stakeholder mapping, and personalized 1:1 campaigns powered by DemandFlow Bridge."
        keywords="account-based marketing services, account-based marketing, ABM services, enterprise lead generation, ABM agency, 1:1 ABM campaigns, target account list, buying committee engagement, intent data ABM, DemandFlow Bridge, enterprise pipeline growth"
        canonical="/abm"
        ogTitle="Account-Based Marketing (ABM) Services | Enterprise B2B Growth | Taraj Global"
        ogDescription="Engage, penetrate, and close your highest-value target accounts with bespoke multi-stakeholder ABM programs powered by DemandFlow Bridge."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={abmSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is Account-Based Marketing */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — ABM Process Workflow */}
        <AbmProcess />

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

export default Abm
