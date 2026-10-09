import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import CleansingProcess from './components/CleansingProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const databaseCleansingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Database Cleansing Services",
      "description": "Comprehensive CRM database cleansing, deduplication, live SMTP verification, and contact enrichment services to eliminate bounce rates and restore data accuracy.",
      "url": "https://tarajglobal.com/database-cleansing",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com"
      },
      "areaServed": "Global",
      "serviceType": "Database Hygiene & Cleansing"
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
          "name": "Database Cleansing",
          "item": "https://tarajglobal.com/database-cleansing"
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

const DatabaseCleansing = () => {
  return (
    <>
      <SEO
        title="B2B Database Cleansing Services | Taraj Global"
        description="Scrub, deduplicate, verify, and enrich your stale CRM databases. Boost email deliverability, protect sender score, and empower sales with accurate contact data."
        keywords="database cleansing services, B2B data enrichment, CRM data hygiene, contact list cleaning, email bounce reduction, CRM deduplication, lead data validation, sales database refresh, SMTP verification"
        canonical="/database-cleansing"
        ogTitle="B2B Database Cleansing Services | Taraj Global"
        ogDescription="Protect your sender reputation and accelerate sales efficiency with automated CRM hygiene, fuzzy deduplication, live SMTP verification, and data enrichment."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={databaseCleansingSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is Database Cleansing */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <CleansingProcess />

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

export default DatabaseCleansing
