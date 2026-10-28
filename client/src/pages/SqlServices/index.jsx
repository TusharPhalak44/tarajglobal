import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import SqlProcess from './components/SqlProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for SQL Services ────────────────────────────────

const sqlSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Sales Qualified Leads (SQL) Services",
      "description": "Accelerate your pipeline with verified Sales Qualified Leads (SQLs). Taraj Global delivers high-intent enterprise buyers with confirmed budget, authority, need, and purchasing timelines.",
      "url": "https://tarajglobal.com/sql-services",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Sales Qualified Leads Generation",
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
          "name": "SQL Services",
          "item": "https://tarajglobal.com/sql-services",
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

const SqlServices = () => {
  return (
    <>
      <SEO
        title="SQL Lead Generation Services | Tech-Powered Sales Qualified Leads | TaRaj Global"
        description="Fill AE calendars with verified Sales Qualified Leads across US, EMEA, and APAC. TaRaj Global delivers sales-ready decision-makers verified via in-house tooling and a 99.8% Data Accuracy SLA."
        keywords="Sales Qualified Leads services, SQL lead generation, B2B SQL generation, high-intent B2B leads, sales-ready leads, qualified discovery meetings, SaaS SQL pipeline, enterprise B2B leads, B2B sales pipeline, lead qualification services"
        canonical="/sql-services"
        ogTitle="SQL Lead Generation Services | Tech-Powered Sales Qualified Leads | TaRaj Global"
        ogDescription="Fill AE calendars with verified Sales Qualified Leads across US, EMEA, and APAC. TaRaj Global delivers sales-ready decision-makers verified via in-house tooling and a 99.8% Data Accuracy SLA."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={sqlSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is An SQL */}
        <WhatIsService />

        {/* Section 3 — Target Audiences */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Process Workflow */}
        <SqlProcess />

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

export default SqlServices
