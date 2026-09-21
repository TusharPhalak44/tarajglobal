import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import WebinarProcess from './components/WebinarProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for Webinar Services ────────────────────────────

const webinarSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Webinar Services",
      "description": "Taraj Global provides B2B webinar services that help technology and SaaS companies reach targeted audiences, generate webinar registrations, engage decision-makers, and create qualified leads powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/webinar-services",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Webinar Services",
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
          "name": "Webinar Services",
          "item": "https://tarajglobal.com/webinar-services",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are B2B webinar services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B webinar services are specialized demand generation solutions that help businesses plan, promote, and execute virtual events to engage decision-makers and convert attendees into sales-qualified leads.",
          },
        },
        {
          "@type": "Question",
          "name": "How do B2B webinar campaigns generate leads?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Campaigns generate leads by targeting relevant industry professionals with high-value educational content, capturing verified registration data, and evaluating live attendee engagement and intent signals.",
          },
        },
        {
          "@type": "Question",
          "name": "Who should use webinar marketing services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B SaaS companies, enterprise technology vendors, IT providers, and consulting firms looking to showcase expertise and accelerate complex sales cycles benefit most from webinar marketing.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you attract the right webinar audience?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We define your Ideal Customer Profile (ICP), filter target account lists by firmographics and intent, and deploy personalized multi-channel outreach directly to verified decision-makers.",
          },
        },
        {
          "@type": "Question",
          "name": "How are webinar leads qualified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Leads are scored using multi-signal telemetry—including session watch duration, poll responses, questions asked, resource downloads, and BANT criteria.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you engage prospects before and after a webinar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Before the event, we send calendar holds, speaker teasers, and preparation materials. After the event, we deliver session replays, custom takeaway assets, and personalized sales follow-ups.",
          },
        },
        {
          "@type": "Question",
          "name": "What happens to webinar leads after the event?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sales-ready leads are immediately routed into your CRM with rich discussion dossiers, while less engaged registrants enter targeted nurture workflows.",
          },
        },
        {
          "@type": "Question",
          "name": "How does DemandFlow Bridge support webinar campaigns?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DemandFlow Bridge acts as the central command layer—automating invitation sequences, verifying registrant data, tracking live attendee engagement, and syncing qualified leads directly to your sales reps.",
          },
        },
      ],
    },
  ],
}

const WebinarServices = () => {
  return (
    <>
      <SEO
        title="B2B Webinar Services | Webinar Lead Generation | Taraj Global"
        description="Taraj Global provides B2B webinar services that help technology and SaaS companies reach targeted audiences, generate webinar registrations, engage decision-makers, and create qualified leads."
        keywords="B2B Webinar Services, Webinar Services, B2B Webinar Marketing, Webinar Lead Generation, Webinar Lead Generation Services, B2B Webinar Campaigns, Webinar Marketing Services, B2B Demand Generation, B2B Lead Generation, Webinar Promotion, Webinar Audience Generation, Webinar Registrations, B2B Audience Targeting, Decision-Maker Engagement, Lead Qualification, Marketing Qualified Leads, MQL Generation, Buyer Intent, Sales Pipeline, DemandFlow Bridge"
        canonical="/webinar-services"
        ogTitle="B2B Webinar Services | Webinar Lead Generation | Taraj Global"
        ogDescription="Taraj Global provides B2B webinar services that help technology and SaaS companies reach targeted audiences, generate webinar registrations, engage decision-makers, and create qualified leads."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={webinarSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Are B2B Webinar Services */}
        <WhatIsService />

        {/* Section 3 — Who Can Benefit */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — B2B Webinar Process Workflow */}
        <WebinarProcess />

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

export default WebinarServices
