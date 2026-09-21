import React from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

import Hero from './components/Hero'
import WhatIsService from './components/WhatIsService'
import WhoIsItFor from './components/WhoIsItFor'
import ProblemsSolved from './components/ProblemsSolved'
import AppointmentProcess from './components/AppointmentProcess'
import WhatTarajDelivers from './components/WhatTarajDelivers'
import WhyChoose from './components/WhyChoose'
import FAQ, { FAQS } from './components/FAQ'
import CTA from './components/CTA'

// ─── JSON-LD Structured Data for Appointment Setting ─────────────────────────

const appointmentSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "B2B Appointment Setting Services",
      "description": "Taraj Global provides B2B appointment setting services that connect sales teams with relevant decision-makers through targeted prospecting, personalized outreach, qualification, and buyer intelligence.",
      "url": "https://www.tarajglobal.com/b2b-appointment-setting",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "B2B Appointment Setting Services",
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
          "name": "B2B Appointment Setting",
          "item": "https://www.tarajglobal.com/b2b-appointment-setting",
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

const B2bAppointmentSetting = () => {
  return (
    <>
      <SEO
        title="B2B Appointment Setting Services | Qualified Sales Meetings | Taraj Global"
        description="Taraj Global provides B2B appointment setting services that connect sales teams with relevant decision-makers through targeted prospecting, personalized outreach, qualification, and buyer intelligence."
        keywords="B2B appointment setting, B2B appointment setting services, appointment setting services, B2B sales appointment setting, qualified sales meetings, B2B lead generation, sales appointment setting, B2B lead qualification, decision-maker appointment setting, sales qualified leads, B2B prospecting, buyer intent, B2B demand generation"
        canonical="/b2b-appointment-setting"
        ogTitle="B2B Appointment Setting Services | Qualified Sales Meetings | Taraj Global"
        ogDescription="Taraj Global provides B2B appointment setting services that connect sales teams with relevant decision-makers through targeted prospecting, personalized outreach, qualification, and buyer intelligence."
        ogType="website"
        twitterCard="summary_large_image"
        schemaJson={appointmentSchema}
      />

      <div className="min-h-screen bg-background">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — What Is Appointment Setting */}
        <WhatIsService />

        {/* Section 3 — Target Audiences */}
        <WhoIsItFor />

        {/* Section 4 — Problems Solved */}
        <ProblemsSolved />

        {/* Section 5 — 9-Step Process Workflow */}
        <AppointmentProcess />

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

export default B2bAppointmentSetting
