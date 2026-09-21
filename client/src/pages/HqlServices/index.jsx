import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import HqlHero from './components/HqlHero'
import WhatIsHqlService from './components/WhatIsHqlService'
import WhoIsHqlFor from './components/WhoIsHqlFor'
import WhatProblemsSolved from './components/WhatProblemsSolved'
import HqlProcessWorkflow from './components/HqlProcessWorkflow'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import HqlWhyChoose from './components/HqlWhyChoose'
import HqlFAQ from './components/HqlFAQ'
import HqlCTA from './components/HqlCTA'

// ─── JSON-LD Structured Data for HQL Services ─────────────────────────────────

const hqlSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'High-Quality Leads (HQL) Services',
      description:
        'Bridge the gap between marketing interest and closed revenue with High-Quality Leads (HQL) from Taraj Global. We deliver verified B2B decision-makers screened against custom ICP criteria, technographics, and active business pain points.',
      url: 'https://tarajglobal.com/hql-services',
      provider: {
        '@type': 'Organization',
        name: 'Taraj Global',
        url: 'https://tarajglobal.com',
      },
      areaServed: 'Global',
      serviceType: 'B2B Lead Qualification & Demand Generation Services',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://tarajglobal.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://tarajglobal.com/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'HQL Services',
          item: 'https://tarajglobal.com/hql-services',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a High-Quality Lead (HQL)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A High-Quality Lead (HQL) is a verified B2B prospect who strictly matches your custom Ideal Customer Profile (ICP), holds direct purchasing or evaluation authority, has demonstrated verified engagement with relevant problem-solving assets, and has answered specific qualifying questions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is an HQL different from an MQL or cold lead?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'While an MQL is often just an unverified form download or gate-click with unknown authority, an HQL is manually and algorithmically validated for seniority, current tech stack, active business pain points, and purchase timeline before sales outreach.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Taraj Global verify decision-maker data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We execute a multi-tier validation process combining real-time SMTP handshake checks, algorithmic mailbox pinging, LinkedIn profile audits, and live telephone verification to ensure 100% accurate contact dossiers with zero email bounce rates.',
          },
        },
        {
          '@type': 'Question',
          name: 'What kind of custom screening questions can we include?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can specify 2 to 4 mandatory discovery questions tailored to your solution—such as current software vendor, renewal dates, team size, cloud deployment model, or immediate operational bottlenecks.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we define our exact Ideal Customer Profile (ICP)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You retain complete control over targeting criteria including company revenue, employee headcount, industry verticals, geographic regions, target tech stacks (technographics), and specific job titles or seniority levels.',
          },
        },
        {
          '@type': 'Question',
          name: 'How are HQL leads delivered to our sales or SDR team?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leads can be pushed in real-time directly into your CRM (Salesforce, HubSpot, Marketo) via custom webhooks, or delivered in encrypted CSV/Excel batches with full prospect dossiers and engagement timestamps.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are your HQL lead generation practices GDPR and CCPA compliant?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. All outreach and lead generation strictly adhere to global privacy frameworks including GDPR, CCPA, and CAN-SPAM, complete with documented opt-in consent and clear audit trails for every contact.',
          },
        },
        {
          '@type': 'Question',
          name: "What is Taraj Global's lead replacement guarantee SLA?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every HQL campaign is backed by our 14-day 1-to-1 lead replacement guarantee. If any lead bounces, has an inaccurate job title, or does not meet your agreed qualification criteria, we replace it at zero extra cost.',
          },
        },
      ],
    },
  ],
}

// ─── Main HQL Services Page Component ─────────────────────────────────────────

export default function HqlServices() {
  return (
    <>
      <SEO
        title="High-Quality Leads (HQL) Services | Taraj Global"
        description="Accelerate your B2B sales pipeline with Taraj Global's High-Quality Leads (HQL) services. Verified decision-makers, custom discovery screening, 100% human-verified data, and guaranteed CPL delivery."
        keywords="HQL services, High Quality Leads B2B, what is HQL, who is HQL for, business problems HQL solves, what does Taraj deliver, B2B lead qualification, MQL vs HQL, sales pipeline acceleration, verified B2B contacts, CPL lead generation, B2B intent data"
        canonical="/hql-services"
        ogTitle="High-Quality Leads (HQL) Services | Taraj Global"
        ogDescription="Engage vetted, high-intent B2B decision-makers with custom discovery answers, 100% phone-verified contacts, and zero bounce risk."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={hqlSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 0 — Hero with interactive qualification engine */}
        <HqlHero />

        {/* Section 1 — What is the service? */}
        <WhatIsHqlService />

        {/* Section 2 — Who is it for? */}
        <WhoIsHqlFor />

        {/* Section 3 — What business problem does it solve? */}
        <WhatProblemsSolved />

        {/* Section 4 — HQL Workflow */}
        <HqlProcessWorkflow />

        {/* Section 5 — What does Taraj actually deliver? */}
        <WhatTarajDelivers />

        {/* Section 6 — Why Choose Taraj Global for HQL */}
        <HqlWhyChoose />

        {/* Section 7 — FAQ */}
        <HqlFAQ />

        {/* Section 8 — Final High-Converting CTA */}
        <HqlCTA />

        {/* AI Assistant ChatBot */}
        <ChatBot />
      </div>
    </>
  )
}
