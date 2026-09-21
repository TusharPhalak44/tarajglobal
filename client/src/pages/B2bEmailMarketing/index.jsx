import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import EmailProcess from './components/EmailProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

const emailMarketingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Email Marketing",
      "description": "Targeted B2B email marketing services designed to connect businesses with relevant decision-makers through personalized outreach, verified prospect data, engagement tracking, and lead qualification.",
      "url": "https://www.tarajglobal.com/b2b-email-marketing",
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
          "name": "B2B Email Marketing",
          "item": "https://www.tarajglobal.com/b2b-email-marketing"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is B2B email marketing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B email marketing is a targeted outreach strategy that connects businesses with relevant decision makers through personalized email campaigns. Unlike consumer email marketing, B2B email marketing focuses on reaching specific business roles, such as managers, directors, and executives, with messaging relevant to their professional responsibilities and business challenges. The goal is to generate meaningful business conversations rather than broad awareness."
          }
        },
        {
          "@type": "Question",
          "name": "Who is B2B email marketing suitable for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B email marketing is suitable for any company that sells products or services to other businesses and needs to reach specific decision makers as part of their sales process. It is particularly effective for SaaS companies, IT and technology providers, professional services firms, and enterprise solution providers where personalized, targeted outreach supports a structured sales cycle."
          }
        },
        {
          "@type": "Question",
          "name": "How does Taraj Global build targeted B2B email campaigns?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Taraj Global builds targeted B2B email campaigns by first defining your ideal customer profile (the industries, company types, sizes, and roles most relevant to your business). Using this profile, we identify and verify relevant prospects, develop structured multi step email sequences, personalize messaging based on audience context, and execute campaigns with engagement tracking throughout."
          }
        },
        {
          "@type": "Question",
          "name": "How do you identify and verify B2B prospects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We identify B2B prospects by mapping your ideal customer profile against available business data including company type, industry, size, and relevant decision maker roles. Prospect data is then validated to improve quality and relevance before use in campaigns. Verification reduces wasted outreach and ensures campaigns reach active, relevant decision makers rather than outdated or inaccurate contacts."
          }
        },
        {
          "@type": "Question",
          "name": "Can B2B email campaigns be personalized by industry or job role?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. B2B email campaigns can be personalized by industry, job role, company type, company size, and campaign objective. Personalization ensures that each email speaks directly to the recipient's business context rather than delivering generic messaging."
          }
        },
        {
          "@type": "Question",
          "name": "How do you measure B2B email marketing performance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B email marketing performance is measured across multiple engagement stages: delivery rates, open rates, click rates, reply rates, and qualification rates. Tracking across all stages provides a complete view of campaign effectiveness."
          }
        },
        {
          "@type": "Question",
          "name": "How does email marketing generate qualified B2B leads?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B email marketing generates qualified leads by targeting prospects that match your ideal customer profile, delivering relevant and personalized messaging, maintaining engagement through structured multi step sequences, and qualifying responses to identify genuine sales interest."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between B2B email marketing and cold email outreach?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cold email outreach typically refers to one to one or one to few prospecting messages aimed at initiating a sales conversation. B2B email marketing encompasses a broader strategy including audience segmentation, multi step sequences, campaign management, engagement tracking, and lead qualification, structured to generate consistent responses across a defined target audience over time."
          }
        }
      ]
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

        <ChatBot />
      </div>
    </>
  )
}

export default B2bEmailMarketing
