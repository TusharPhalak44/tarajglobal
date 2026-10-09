import React from 'react'
import SEO from '@components/common/SEO'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import EmailProcess from './components/EmailProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const emailMarketingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Email Marketing",
      "description": "Targeted B2B email marketing services designed to connect businesses with relevant decision-makers through personalized outreach, verified prospect data, engagement tracking, and lead qualification.",
      "url": "https://tarajglobal.com/b2b-email-marketing",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com"
      },
      "areaServed": "Global",
      "serviceType": "B2B Email Marketing"
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
          "name": "B2B Email Marketing",
          "item": "https://tarajglobal.com/b2b-email-marketing"
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

const B2bEmailMarketing = () => {
  return (
    <>
      <SEO
        title="B2B Email Marketing Services | Taraj Global"
        description="Drive qualified B2B conversations with targeted email marketing campaigns. Taraj Global combines verified data, personalization, outreach, and lead qualification."
        keywords="B2B email marketing, B2B email marketing services, B2B email marketing agency, B2B email campaigns, B2B email outreach, B2B lead generation, targeted B2B email campaigns, B2B prospect outreach, email lead generation, B2B demand generation, qualified B2B leads, B2B sales outreach, personalized B2B email campaigns"
        canonical="/b2b-email-marketing"
        ogTitle="B2B Email Marketing Services | Taraj Global"
        ogDescription="Reach the right B2B decision makers with targeted email campaigns, personalized outreach, verified data, engagement tracking, and lead qualification."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={emailMarketingSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is B2B Email Marketing */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <EmailProcess />

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

export default B2bEmailMarketing
