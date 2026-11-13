import React from 'react'
import SEO from '@components/common/SEO'
import { useSEOData } from '@hooks/useSEOData'

// Components matching the exact reference image design blueprint
import ReferenceHero from './components/reference/ReferenceHero'
import ReferenceObjective from './components/reference/ReferenceObjective'
import ReferenceCoreServices from './components/reference/ReferenceCoreServices'
import ReferenceImpactIndustries from './components/reference/ReferenceImpactIndustries'
import ReferenceFinalCTA from './components/reference/ReferenceFinalCTA'
import { SERVICES_MENU_DATA } from '@/constants/siteNavigation'

const SERVICE_LIST = SERVICES_MENU_DATA.flatMap((cat) =>
  cat.items
    .filter((item) => !item.isExternal)
    .map((item) => [item.name, item.path])
)

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
  const { seoData } = useSEOData('page', 'services', {
    title: "Strategic Data-Driven B2B Services | TaRaj Global",
    description: "Discover TaRaj Global's data-driven B2B services: Lead Generation, Channels & Programs, Demand & ABM/ABX, and Data Operations across US, EMEA, and APAC markets.",
    keywords: "B2B services, B2B lead generation, B2B demand generation, B2B appointment setting, account-based marketing, B2B email marketing, MQL services, BANT lead generation, content syndication, lead nurturing, B2B list building, database cleansing",
    canonical: "/services",
    ogTitle: "Taraj Global | Strategic Data-Driven B2B Services ",
    ogDescription: "Discover TaRaj Global's data-driven B2B services: Lead Generation, Channels & Programs, Demand & ABM/ABX, and Data Operations across US, EMEA, and APAC markets.",
    schemaJson: servicesSchema
  })

  return (
    <>
      <SEO {...seoData} schemaJson={servicesSchema} />

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
