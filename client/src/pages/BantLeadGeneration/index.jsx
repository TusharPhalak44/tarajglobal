import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import BantProcess from './components/BantProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for BANT Lead Generation ────────────────────────

const bantSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "BANT Lead Generation Services",
      "description": "Maximize sales conversion with BANT-qualified B2B leads. Taraj Global rigorously verifies Budget, Authority, Need, and Timeline for every prospect delivered.",
      "url": "https://tarajglobal.com/bant-lead-generation",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Lead Qualification Services",
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
          "name": "BANT Lead Generation",
          "item": "https://tarajglobal.com/bant-lead-generation",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
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

const BantLeadGeneration = () => {
  return (
    <>
      <SEO
        title="BANT Lead Generation Services | Tech-Powered B2B Qualification | TaRaj Global"
        description="Accelerate enterprise B2B deal velocity across US, EMEA, and APAC. TaRaj Global delivers BANT-qualified decision-makers verified via custom in-house tooling and 99.8% Data Accuracy SLA"
        keywords="BANT lead generation services, BANT qualification, BANT qualified B2B leads, budget authority need timeline, B2B lead qualification criteria, sales-ready prospects, high-converting B2B leads, B2B lead generation"
        canonical="/bant-lead-generation"
        ogTitle="BANT Lead Generation Services | Tech-Powered B2B Qualification | TaRaj Globa"
        ogDescription="Accelerate enterprise B2B deal velocity across US, EMEA, and APAC. TaRaj Global delivers BANT-qualified decision-makers verified via custom in-house tooling and 99.8% Data Accuracy SLA."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={bantSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is BANT */}
        <WhatIsService />

        {/* Section 3 — Target Audiences */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Process Workflow */}
        <BantProcess />

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

export default BantLeadGeneration
