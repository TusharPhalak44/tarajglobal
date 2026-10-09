import React from 'react'
import SEO from '@components/common/SEO'

import HqlHero from './components/HqlHero'
import WhatIsHqlService from './components/WhatIsHqlService'
import WhoIsHqlFor from './components/WhoIsHqlFor'
import WhatProblemsSolved from './components/WhatProblemsSolved'
import HqlProcessWorkflow from './components/HqlProcessWorkflow'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import HqlWhyChoose from './components/HqlWhyChoose'
import HqlFAQ, { FAQS } from './components/HqlFAQ'
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
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
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

      </div>
    </>
  )
}
