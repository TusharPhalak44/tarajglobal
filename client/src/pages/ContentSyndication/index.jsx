import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import SyndicationProcess from './components/SyndicationProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for Content Syndication ─────────────────────────

const syndicationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Content Syndication Services",
      "description": "Distribute whitepapers, ebooks, and research reports across verified B2B publisher networks to reach targeted decision-makers and generate sales-qualified leads on guaranteed CPL pricing.",
      "url": "https://www.tarajglobal.com/content-syndication",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Content Syndication",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.tarajglobal.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.tarajglobal.com/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Content Syndication",
          "item": "https://www.tarajglobal.com/content-syndication",
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

// ─── Page Component ───────────────────────────────────────────────────────────

const ContentSyndication = () => {
  return (
    <>
      <SEO
        title="B2B Content Syndication Services | Taraj Global"
        description="Expand reach, engage active decision-makers, and generate high-intent qualified leads with targeted B2B content syndication on guaranteed CPL terms."
        keywords="B2B content syndication, content syndication services, B2B lead syndication, whitepaper syndication, CPL content syndication, B2B lead generation, demand generation syndication, enterprise content distribution, verified reader leads, ABM content syndication"
        canonical="/content-syndication"
        ogTitle="B2B Content Syndication Services | Taraj Global"
        ogDescription="Distribute high-value digital assets to verified B2B decision-makers across premier publishing networks. Guaranteed CPL qualified lead delivery."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={syndicationSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is B2B Content Syndication */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 7-Step Workflow */}
        <SyndicationProcess />

        {/* Section 6 — What Taraj Global Delivers (Powered by DemandFlow Bridge) */}
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

export default ContentSyndication
