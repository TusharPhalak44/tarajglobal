import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import DemandProcess from './components/DemandProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { demandGenFaqs } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for Demand Generation ───────────────────────────

const demandGenSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Demand Generation Services",
      "description": "Taraj Global provides B2B demand generation services that help technology and SaaS companies reach target audiences, engage decision-makers, generate qualified leads, and build stronger sales pipelines powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/demand-generation",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Demand Generation Services",
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
          "name": "Demand Generation",
          "item": "https://tarajglobal.com/demand-generation",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": demandGenFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ],
}

const DemandGeneration = () => {
  return (
    <>
      <SEO
        title="B2B Demand Generation Services | Demand Generation Agency | Taraj Global"
        description="Taraj Global provides B2B demand generation services that help technology and SaaS companies reach target audiences, engage decision-makers, generate qualified leads, and build stronger sales pipelines."
        keywords="B2B Demand Generation, B2B Demand Generation Services, Demand Generation Services, B2B Demand Generation Agency, Demand Generation Strategy, B2B Demand Generation Strategy, Demand Generation Campaigns, B2B Lead Generation, B2B Marketing, Account-Based Marketing, Lead Nurturing, Content Syndication, B2B Audience Targeting, Decision-Maker Engagement, Buyer Intent, Lead Qualification, MQL Generation, Sales Pipeline, Qualified B2B Leads, DemandFlow Bridge"
        canonical="/demand-generation"
        ogTitle="B2B Demand Generation Services | Demand Generation Agency | Taraj Global"
        ogDescription="Taraj Global provides B2B demand generation services that help technology and SaaS companies reach target audiences, engage decision-makers, generate qualified leads, and build stronger sales pipelines."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={demandGenSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is B2B Demand Generation */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <DemandProcess />

        {/* Section 6 — What Taraj Global Delivers (DemandFlow Bridge) */}
        <WhatTarajDelivers />

        {/* Section 7 — Why Choose Taraj Global */}
        <WhyChoose />

        {/* Section 8 — FAQ */}
        <FAQ />

        {/* Section 9 — Final CTA */}
        <CTA />

        <ChatBot />
      </div>
    </>
  )
}

export default DemandGeneration
