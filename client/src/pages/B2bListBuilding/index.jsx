import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import ListBuildingProcess from './components/ListBuildingProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const listBuildingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B List Building",
      "description": "Human-verified B2B list building services delivering ICP-matched, triple-layer verified prospect lists — including direct emails, phone numbers, and LinkedIn profiles — ready for outbound sales campaigns.",
      "url": "https://tarajglobal.com/b2b-list-building",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com"
      },
      "areaServed": "Global",
      "serviceType": "B2B List Building"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tarajglobal.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://tarajglobal.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "B2B List Building",
          "item": "https://tarajglobal.com/b2b-list-building"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      }))
    }
  ]
}

// ─── Page Component ───────────────────────────────────────────────────────────

const B2bListBuilding = () => {
  return (
    <>
      <SEO
        title="B2B List Building Services | Taraj Global"
        description="Build verified, campaign-ready B2B prospect lists. Taraj Global delivers ICP-matched, triple-layer verified contact data — direct emails, phone numbers, and LinkedIn profiles — ready for outbound sales."
        keywords="B2B list building, B2B list building services, B2B prospect lists, B2B contact database, B2B lead list, verified B2B data, B2B email lists, B2B contact list building, B2B prospect data, targeted B2B lists, B2B data services, outbound prospect lists, ICP-matched lists, verified contact data"
        canonical="/b2b-list-building"
        ogTitle="B2B List Building Services | Taraj Global"
        ogDescription="Reach the right B2B decision makers with ICP-matched, triple-layer verified prospect lists. Human-researched, compliance-certified, and CRM-ready for immediate outbound campaigns."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={listBuildingSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is B2B List Building */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <ListBuildingProcess />

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

export default B2bListBuilding
