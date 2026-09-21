import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import ListBuildingProcess from './components/ListBuildingProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const listBuildingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B List Building",
      "description": "Human-verified B2B list building services delivering ICP-matched, triple-layer verified prospect lists — including direct emails, phone numbers, and LinkedIn profiles — ready for outbound sales campaigns.",
      "url": "https://www.tarajglobal.com/b2b-list-building",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com"
      },
      "areaServed": "Global",
      "serviceType": "B2B List Building"
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
          "name": "B2B List Building",
          "item": "https://www.tarajglobal.com/b2b-list-building"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is B2B list building?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B list building is the process of researching, verifying, and compiling targeted databases of companies and decision-makers that match your Ideal Customer Profile (ICP), ready for outbound sales and marketing outreach."
          }
        },
        {
          "@type": "Question",
          "name": "Who is B2B list building suitable for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B list building is ideal for SaaS companies, IT service providers, enterprise solution vendors, B2B agencies, and sales teams that need a reliable pipeline of verified decision-makers to fuel outbound campaigns."
          }
        },
        {
          "@type": "Question",
          "name": "How does Taraj Global build targeted B2B prospect lists?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We align on your ICP and buying committee criteria, then use human-led research across corporate directories and professional networks to identify, enrich, and triple-layer verify each contact before delivery."
          }
        },
        {
          "@type": "Question",
          "name": "How do you verify B2B contact data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every record undergoes real-time SMTP handshake verification, MX record health checks, spam-trap suppression, syntax validation, and manual phone-line confirmation — delivering a 98%+ deliverability guarantee."
          }
        },
        {
          "@type": "Question",
          "name": "Can lists be segmented by industry, title, or geography?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We segment verified lists by industry vertical, job title, seniority level, company revenue bracket, headcount tier, geographic region, and technology stack — creating precision-targeted segments for each campaign."
          }
        },
        {
          "@type": "Question",
          "name": "How do you ensure GDPR and CCPA compliance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We follow strict opt-out suppression protocols and comply fully with GDPR, CCPA, CAN-SPAM, and PECR legislation. Every delivered list includes a compliance certification and a 30-day replacement guarantee."
          }
        },
        {
          "@type": "Question",
          "name": "In what format are B2B lists delivered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lists are delivered as clean CSV or XLSX files pre-mapped to your CRM field schema — Salesforce, HubSpot, Apollo, or Outreach — for seamless 1-click import and immediate campaign launch."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between B2B list building and data scraping?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike scraped databases, our B2B lists are built through human-led research, real-time verification, and compliance-certified processes — ensuring accuracy, freshness, and deliverability that scraped data cannot match."
          }
        }
      ]
    }
  ]
}

// ─── Page Component ───────────────────────────────────────────────────────────

const B2bListBuilding = () => {
  return (
    <>
      <SEO
        title="B2B List Building Services | Taraj Global"
        description="Build verified, campaign-ready B2B prospect lists. Taraj Global delivers ICP-matched, triple-layer verified contact data — direct emails, phone numbers, and LinkedIn profiles — ready for outbound sales."
        keywords="B2B list building, B2B list building services, B2B prospect lists, B2B contact database, B2B lead list, verified B2B data, B2B email lists, B2B contact list building, B2B prospect data, targeted B2B lists, B2B data services, outbound prospect lists, ICP-matched lists, verified contact data"
        canonical="/b2b-list-building"
        ogTitle="B2B List Building Services | Taraj Global"
        ogDescription="Reach the right B2B decision makers with ICP-matched, triple-layer verified prospect lists. Human-researched, compliance-certified, and CRM-ready for immediate outbound campaigns."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={listBuildingSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is B2B List Building */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problem → Solution */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Workflow */}
        <ListBuildingProcess />

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

export default B2bListBuilding
