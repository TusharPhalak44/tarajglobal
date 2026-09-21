import React, { useEffect } from 'react'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'

// Components matching the exact reference image design blueprint
import ReferenceHero from './components/reference/ReferenceHero'
import ReferenceObjective from './components/reference/ReferenceObjective'
import ReferenceCoreServices from './components/reference/ReferenceCoreServices'
import ReferenceImpactIndustries from './components/reference/ReferenceImpactIndustries'
import ReferenceFinalCTA from './components/reference/ReferenceFinalCTA'

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "B2B Lead Generation & Demand Generation Services",
  "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "Sales Qualified Leads (SQL) Services",
      "url": "https://tarajglobal.com/sql-services"
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "BANT Lead Generation Services",
      "url": "https://tarajglobal.com/bant-lead-generation"
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "Marketing Qualified Leads (MQL) Services",
      "url": "https://tarajglobal.com/mql-services"
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "B2B Appointment Setting Services",
      "url": "https://tarajglobal.com/b2b-appointment-setting"
    },
    {
      "@type": "Service",
      "position": 5,
      "name": "B2B Email Marketing Services",
      "url": "https://tarajglobal.com/b2b-email-marketing"
    },
    {
      "@type": "Service",
      "position": 6,
      "name": "Account-Based Marketing (ABM) Services",
      "url": "https://tarajglobal.com/abm"
    },
    {
      "@type": "Service",
      "position": 7,
      "name": "Content Syndication Services",
      "url": "https://tarajglobal.com/content-syndication"
    },
    {
      "@type": "Service",
      "position": 8,
      "name": "Demand Generation Services",
      "url": "https://tarajglobal.com/demand-generation"
    },
    {
      "@type": "Service",
      "position": 9,
      "name": "B2B Webinar Services",
      "url": "https://tarajglobal.com/webinar-services"
    },
    {
      "@type": "Service",
      "position": 10,
      "name": "Lead Nurturing Services",
      "url": "https://tarajglobal.com/lead-nurturing"
    },
    {
      "@type": "Service",
      "position": 11,
      "name": "B2B List Building Services",
      "url": "https://tarajglobal.com/b2b-list-building"
    },
    {
      "@type": "Service",
      "position": 12,
      "name": "Database Cleansing Services",
      "url": "https://tarajglobal.com/database-cleansing"
    }
  ]
}

function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="Strategic B2B Services for Sustainable Growth | Taraj Global"
        description="We help businesses find the right accounts, engage the right people and create real opportunities. Our data-driven B2B services are designed to build a stronger pipeline and fuel long-term growth."
        keywords="B2B services, B2B lead generation, B2B demand generation, B2B appointment setting, account-based marketing, B2B email marketing, MQL services, BANT lead generation, content syndication, lead nurturing, B2B list building, database cleansing"
        canonical="/services"
        ogTitle="Taraj Global | Strategic B2B Services for Sustainable Growth"
        ogDescription="We help businesses find the right accounts, engage the right people and create real opportunities. Our data-driven B2B services are designed to build a stronger pipeline and fuel long-term growth."
        schemaJson={servicesSchema}
      />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-white selection:bg-[#FF6D00]/30 selection:text-[#FF6D00] overflow-x-hidden font-sans transition-colors duration-300">
        {/* Section 01: Hero Section */}
        <ReferenceHero />

        {/* Section 02: Choose Your Growth Objective */}
        <ReferenceObjective />

        {/* Section 03: Our Core Services */}
        <ReferenceCoreServices />

        {/* Section 04: The Split Impact + Industries We Serve */}
        <ReferenceImpactIndustries />

        {/* Section 06: Final CTA */}
        <ReferenceFinalCTA />

        {/* Interactive Chatbot */}
        <ChatBot />
      </div>
    </>
  )
}

export default Services
