import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import CleansingProcess from './components/CleansingProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const databaseCleansingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Database Cleansing Services",
      "description": "Comprehensive CRM database cleansing, deduplication, live SMTP verification, and contact enrichment services to eliminate bounce rates and restore data accuracy.",
      "url": "https://www.tarajglobal.com/database-cleansing",
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
          "name": "Database Cleansing",
          "item": "https://www.tarajglobal.com/database-cleansing"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is B2B database cleansing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B database cleansing is the systematic process of identifying, fixing, or removing inaccurate, duplicate, corrupt, and stale contact and account records from your CRM and marketing automation platforms."
          }
        },
        {
          "@type": "Question",
          "name": "How does database decay affect outbound sales and deliverability?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B data naturally decays by 25% to 30% annually due to job changes, company rebrands, and promotions. Stale contact lists cause high hard bounce rates that destroy sender domain reputation, waste sales rep dial time, and result in blacklisted email servers."
          }
        },
        {
          "@type": "Question",
          "name": "How do you detect duplicate records across CRM systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use advanced multi-vector fuzzy matching algorithms across email prefixes, domain root variations, LinkedIn profile handles, phone structures, and company legal entities to safely consolidate duplicate records while preserving complete historical deal activity and custom notes."
          }
        },
        {
          "@type": "Question",
          "name": "What is live SMTP verification and how does it prevent bounces?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our verification engine conducts real-time SMTP handshakes directly with destination mail servers without ever sending an outbound email. This confirms the exact mailbox existence, identifies catch-all risks, and suppresses known spam traps and honeypots before your team ever hits send."
          }
        },
        {
          "@type": "Question",
          "name": "How do you identify executive job changes and corporate turnover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We combine live professional network tracking and automated employment directory validation to detect departed executives, map their new employers, and identify the newly promoted successor decision-maker at their previous firm."
          }
        },
        {
          "@type": "Question",
          "name": "What data fields can Taraj Global enrich into existing contact records?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We append verified direct desk extensions, mobile numbers, personal LinkedIn profile URLs, company employee counts, estimated annual revenue brackets, industry NAICS/SIC taxonomy, and installed technographic software stacks."
          }
        },
        {
          "@type": "Question",
          "name": "How do you guarantee sub-1% hard bounce rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Through a rigorous multi-stage scrub combining syntax normalization, DNS/MX record health checks, real-time live SMTP ping handshakes, and CDQA manual audit verification. We back every scrubbed list with an ironclad 99%+ deliverability guarantee."
          }
        },
        {
          "@type": "Question",
          "name": "How does Taraj Global securely sync scrubbed data back into our CRM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support direct bi-directional API sync with Salesforce, HubSpot, Marketo, and Microsoft Dynamics 365, as well as encrypted AES-256 staging files, ensuring zero data leakage and effortless one-click CRM updates."
          }
        }
      ]
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

        <ChatBot />
      </div>
    </>
  )
}

export default DatabaseCleansing
