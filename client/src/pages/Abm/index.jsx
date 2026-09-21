import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import AbmProcess from './components/AbmProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ from './components/FAQ'
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
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Account-Based Marketing (ABM)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Account-Based Marketing (ABM) is a focused B2B growth strategy where marketing and sales teams collaborate to target, engage, and close specific high-value enterprise accounts with hyper-personalized campaigns.",
          },
        },
        {
          "@type": "Question",
          "name": "How does ABM differ from traditional B2B lead generation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional lead generation casts a broad net to generate high lead volumes, often resulting in unqualified leads. ABM flips the funnel: it identifies best-fit target accounts upfront and engages buying committees with tailored experiences.",
          },
        },
        {
          "@type": "Question",
          "name": "What types of businesses benefit most from ABM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B SaaS companies, enterprise software vendors, IT service providers, and companies with high annual contract values (ACVs) and complex, multi-stakeholder buying cycles benefit most.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you select and tier target accounts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We analyze historical closed-won deals, define your Ideal Customer Profile (ICP), map total addressable market (TAM), and tier accounts (Tier 1: 1-to-1, Tier 2: 1-to-Few, Tier 3: 1-to-Many) based on revenue potential and intent signals.",
          },
        },
        {
          "@type": "Question",
          "name": "What channels do you use for ABM outreach?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We orchestrate synchronized multi-channel outreach across personalized email cadences, executive LinkedIn touchpoints, content syndication, and tailored digital experiences.",
          },
        },
        {
          "@type": "Question",
          "name": "How does intent data enhance ABM campaigns?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Intent data detects when target accounts are actively researching solutions in your space, allowing us to reach them at peak purchase intent and accelerate sales velocity.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you measure the success of an ABM program?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We track account engagement depth, buying committee penetration, pipeline velocity, meeting conversion rates, and revenue attribution directly tied to target accounts.",
          },
        },
        {
          "@type": "Question",
          "name": "What role does DemandFlow Bridge play in your ABM services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DemandFlow Bridge powers our end-to-end ABM infrastructure — from account scoring and organizational mapping to automated multi-channel sequences, real-time intent telemetry, and CRM handoff.",
          },
        },
      ],
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

        <ChatBot />
      </div>
    </>
  )
}

export default Abm
