import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import MqlProcess from './components/MqlProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const mqlSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Marketing Qualified Leads (MQL) Services",
      "description": "High-fit Marketing Qualified Leads (MQL) generation delivering verified decision-makers exhibiting clear buying intent through personalized outreach, content syndication, and predictive lead scoring.",
      "url": "https://www.tarajglobal.com/mql-services",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Lead Generation",
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
          "name": "MQL Services",
          "item": "https://www.tarajglobal.com/mql-services",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Marketing Qualified Lead (MQL) in B2B?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Marketing Qualified Lead (MQL) is a verified business prospect who matches your Ideal Customer Profile (ICP) and has actively engaged with your solutions—such as downloading whitepapers, attending webinars, or interacting with high-intent content—signaling genuine evaluation interest.",
          },
        },
        {
          "@type": "Question",
          "name": "How do MQL services differ from SQL services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An MQL represents an engaged prospect who fits demographic/firmographic criteria and has demonstrated topical intent, whereas a Sales Qualified Lead (SQL) has advanced further to confirm explicit budget, buying authority, defined pain points, and an active procurement timeline.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Taraj Global score and qualify MQLs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use a multi-touch scoring methodology evaluating firmographic fit (revenue, employee size, tech install base), demographic seniority (job titles, department authority), and behavioral engagement signals before delivering verified records.",
          },
        },
        {
          "@type": "Question",
          "name": "Can we customize criteria and screening questions for our campaigns?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every MQL program is tailored to your exact specifications. You can specify mandatory parameters such as minimum employee count, target geographies, software install base, and custom screening questions.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you verify prospect data and eliminate bounce rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We run every contact record through automated syntax checking, triple-layer SMTP validation, and manual data audits to guarantee 100% active, contactable corporate inboxes with zero bounce risk.",
          },
        },
        {
          "@type": "Question",
          "name": "What content formats perform best for generating high-intent MQLs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Analyst reports, industry benchmark whitepapers, technical implementation guides, product comparison matrixes, and live webinars generate the highest intent signals among senior B2B decision-makers.",
          },
        },
        {
          "@type": "Question",
          "name": "How are MQLs delivered to our CRM or marketing automation platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide direct native sync to HubSpot, Salesforce, Marketo, or Eloqua, as well as secure API webhook endpoints or structured CSV batch deliveries complete with full engagement telemetry and consent timestamps.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the delivery timeline and pacing for an MQL campaign?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Following campaign kickoff and ICP alignment, initial lead flow typically begins within 5 to 7 business days. Deliveries can be throttled or batched to align with your SDR team’s capacity and follow-up cadence.",
          },
        },
      ],
    },
  ],
}

// ─── Page Component ───────────────────────────────────────────────────────────

const MqlServices = () => {
  return (
    <>
      <SEO
        title="MQL Services | Marketing Qualified Lead Generation | Taraj Global"
        description="Taraj Global provides MQL services that identify, qualify, and deliver marketing qualified leads using B2B data, buyer intent, lead scoring, AI-assisted workflows, and targeted demand generation."
        keywords="MQL Services, MQL Lead Generation, Marketing Qualified Leads, B2B MQL Services, MQL Lead Generation Services, Marketing Qualified Lead Generation, B2B Lead Qualification, Qualified B2B Leads, Lead Scoring, Buyer Intent, B2B Demand Generation, DemandFlow Bridge"
        canonical="/mql-services"
        ogTitle="MQL Services | Marketing Qualified Lead Generation | Taraj Global"
        ogDescription="Taraj Global provides MQL services that identify, qualify, and deliver marketing qualified leads using B2B data, buyer intent, lead scoring, AI-assisted workflows, and targeted demand generation."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={mqlSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Are MQLs */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <MqlProcess />

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

export default MqlServices
