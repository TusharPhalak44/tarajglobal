import React from 'react'
import SEO from '@components/common/SEO'

// Components matching the exact reference image design blueprint
import ReferenceHero from './components/reference/ReferenceHero'
import ReferenceObjective from './components/reference/ReferenceObjective'
import ReferenceCoreServices from './components/reference/ReferenceCoreServices'
import ReferenceImpactIndustries from './components/reference/ReferenceImpactIndustries'
import ReferenceFinalCTA from './components/reference/ReferenceFinalCTA'

const SERVICE_LIST = [
  ['Sales Qualified Leads (SQL) Services', '/sql-services'],
  ['BANT Lead Generation Services', '/bant-lead-generation'],
  ['Marketing Qualified Leads (MQL) Services', '/mql-services'],
  ['High-Quality Leads (HQL) Services', '/hql-services'],
  ['B2B Appointment Setting Services', '/b2b-appointment-setting'],
  ['B2B Email Marketing Services', '/b2b-email-marketing'],
  ['Account-Based Marketing (ABM) Services', '/abm'],
  ['Content Syndication Services', '/content-syndication'],
  ['Demand Generation Services', '/demand-generation'],
  ['B2B Webinar Services', '/webinar-services'],
  ['Lead Nurturing Services', '/lead-nurturing'],
  ['B2B List Building Services', '/b2b-list-building'],
  ['Database Cleansing Services', '/database-cleansing'],
]

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "B2B Lead Generation & Demand Generation Services",
  "itemListElement": SERVICE_LIST.map(([name, path], index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": name,
      "url": `https://tarajglobal.com${path}`,
      "provider": { "@type": "Organization", "name": "Taraj Global", "url": "https://tarajglobal.com" },
    },
  })),
}

function Services() {
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

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-text-primary dark:text-white selection:bg-[#FF6D00]/30 selection:text-[#FF6D00] overflow-x-hidden font-sans transition-colors duration-300">
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

      </div>
    </>
  )
}

export default Services
