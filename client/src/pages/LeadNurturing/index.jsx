import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import NurtureProcess from './components/NurtureProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for B2B Lead Nurturing ───────────────────────────

const leadNurturingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Lead Nurturing Services",
      "description": "Engage, qualify, and develop prospects through targeted outreach, buyer intent signals, lead scoring, and data-driven lead nurturing strategies.",
      "url": "https://www.tarajglobal.com/lead-nurturing",
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
          "item": "https://www.tarajglobal.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.tarajglobal.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "B2B Lead Nurturing",
          "item": "https://www.tarajglobal.com/lead-nurturing"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is B2B lead nurturing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B lead nurturing is the structured process of developing relationships with buyers across each stage of the sales funnel. By delivering relevant content, timely outreach, and personalized communication aligned with buyer interest and intent, lead nurturing turns stalled prospects into sales-ready opportunities."
          }
        },
        {
          "@type": "Question",
          "name": "How does B2B lead nurturing work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It works by identifying qualified accounts, segmenting them by industry, role, and buying stage, delivering contextual touchpoints, tracking engagement telemetry, and scoring behavioral signals until prospects demonstrate sales readiness."
          }
        },
        {
          "@type": "Question",
          "name": "Who needs lead nurturing services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B SaaS companies, technology providers, enterprise solution vendors, and organizations with long sales cycles or multi-stakeholder buying committees benefit significantly from structured lead nurturing."
          }
        },
        {
          "@type": "Question",
          "name": "How do you identify prospects for lead nurturing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We identify prospects using your Ideal Customer Profile (ICP), firmographic data, technographic indicators, historical engagement history, and third-party buyer intent signals."
          }
        },
        {
          "@type": "Question",
          "name": "How do you measure lead engagement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We track multi-channel telemetry including email opens, content downloads, page visits, reply sentiment, webinar attendance, and direct interactions across touches."
          }
        },
        {
          "@type": "Question",
          "name": "What role does lead scoring play in nurturing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lead scoring ranks prospects by evaluating explicit fit (demographics, company size, title) and implicit behavior (frequency of visits, content engagement, intent spikes), ensuring sales teams receive only genuinely qualified leads."
          }
        },
        {
          "@type": "Question",
          "name": "How does lead nurturing support sales teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It reduces cold outreach friction, warms up decision-makers before AE contact, eliminates wasted follow-up on unresponsive leads, and delivers actionable prospect intelligence with every handoff."
          }
        },
        {
          "@type": "Question",
          "name": "How does DemandFlow Bridge support lead nurturing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DemandFlow Bridge is Taraj Global's unified operations and intelligence platform that synchronizes prospect data, tracks multi-channel engagement, runs automated lead scoring, and triggers seamless AE handoffs in real time."
          }
        }
      ]
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

        <ChatBot />
      </div>
    </>
  )
}

export default LeadNurturing
