import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import WebinarProcess from './components/WebinarProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for Webinar Services ────────────────────────────

const webinarSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Webinar Services",
      "description": "Taraj Global provides B2B webinar services that help technology and SaaS companies reach targeted audiences, generate webinar registrations, engage decision-makers, and create qualified leads powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/webinar-services",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Webinar Services",
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
          "name": "Webinar Services",
          "item": "https://tarajglobal.com/webinar-services",
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

const WebinarServices = () => {
  return (
    <>
      <SEO
        title="B2B Webinar Services | Webinar Lead Generation | Taraj Global"
        description="Taraj Global provides B2B webinar services that help technology and SaaS companies reach targeted audiences, generate webinar registrations, engage decision-makers, and create qualified leads."
        keywords="B2B Webinar Services, Webinar Services, B2B Webinar Marketing, Webinar Lead Generation, Webinar Lead Generation Services, B2B Webinar Campaigns, Webinar Marketing Services, B2B Demand Generation, B2B Lead Generation, Webinar Promotion, Webinar Audience Generation, Webinar Registrations, B2B Audience Targeting, Decision-Maker Engagement, Lead Qualification, Marketing Qualified Leads, MQL Generation, Buyer Intent, Sales Pipeline, DemandFlow Bridge"
        canonical="/webinar-services"
        ogTitle="B2B Webinar Services | Webinar Lead Generation | Taraj Global"
        ogDescription="Taraj Global provides B2B webinar services that help technology and SaaS companies reach targeted audiences, generate webinar registrations, engage decision-makers, and create qualified leads."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={webinarSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Are B2B Webinar Services */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — B2B Webinar Process Workflow */}
        <WebinarProcess />

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

export default WebinarServices
