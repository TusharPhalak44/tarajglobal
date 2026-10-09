import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import NurtureProcess from './components/NurtureProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for B2B Lead Nurturing ───────────────────────────

const leadNurturingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Lead Nurturing Services",
      "description": "Engage, qualify, and develop prospects through targeted outreach, buyer intent signals, lead scoring, and data-driven lead nurturing strategies.",
      "url": "https://tarajglobal.com/lead-nurturing",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com"
      },
      "areaServed": "Global",
      "serviceType": "B2B Lead Nurturing"
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
          "name": "B2B Lead Nurturing",
          "item": "https://tarajglobal.com/lead-nurturing"
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

const LeadNurturing = () => {
  return (
    <>
      <SEO
        title="B2B Lead Nurturing Services | B2B Lead Engagement | Taraj Global"
        description="Taraj Global provides B2B lead nurturing services that engage, qualify, and develop prospects through targeted outreach, buyer intent signals, lead scoring, and data-driven nurturing strategies."
        keywords="B2B Lead Nurturing, B2B Lead Nurturing Services, Lead Nurturing Services, B2B Lead Nurturing Campaigns, Lead Nurturing Strategy, B2B Lead Nurturing Solutions, Lead Qualification, Lead Engagement, Marketing Qualified Leads, Sales Qualified Leads, Buyer Intent, Lead Scoring, B2B Demand Generation, B2B Lead Generation, Sales Pipeline, Prospect Engagement"
        canonical="/lead-nurturing"
        ogTitle="B2B Lead Nurturing Services | B2B Lead Engagement | Taraj Global"
        ogDescription="Taraj Global provides B2B lead nurturing services that engage, qualify, and develop prospects through targeted outreach, buyer intent signals, lead scoring, and data-driven nurturing strategies."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={leadNurturingSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is B2B Lead Nurturing */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <NurtureProcess />

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

export default LeadNurturing
