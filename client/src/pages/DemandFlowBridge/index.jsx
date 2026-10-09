import React from 'react'
import SEO from '@components/common/SEO'
import Hero from './components/Hero'
import WhatIsPlatform from './components/WhatIsPlatform'
import ConnectedEcosystem from './components/ConnectedEcosystem'
import CoreCapabilities from './components/CoreCapabilities'
import TechnologyBehindOperations from './components/TechnologyBehindOperations'
import ProductShowcase from './components/ProductShowcase'
import WhyOnePlatform from './components/WhyOnePlatform'
import FinalCTA from './components/FinalCTA'

const DemandFlowBridge = () => {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'DemandFlow Bridge',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloud / Web-based',
        description:
          "DemandFlow Bridge is Taraj Global's unified business operations platform, connecting CRM, lead management, sales, client management, HRMS, payroll, and operational workflows in one centralized ecosystem.",
        publisher: {
          '@type': 'Organization',
          name: 'Taraj Global',
          url: 'https://tarajglobal.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://tarajglobal.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'DemandFlow Bridge',
            item: 'https://tarajglobal.com/demandflow-bridge',
          },
        ],
      },
    ],
  }

  return (
    <div className="relative w-full bg-background min-h-screen selection:bg-primary/40 dark:bg-primary/20 selection:text-primary">
      <SEO
        title="DemandFlow Bridge | Unified Business Operations Platform | Taraj Global"
        description="Discover DemandFlow Bridge, Taraj Global's unified business operations platform connecting CRM, lead management, sales, client management, HRMS, payroll and operations."
        keywords="business operations platform, CRM and lead management, sales management platform, HRMS platform, client management, payroll management, business operations software, unified business platform, Taraj Global, DemandFlow Bridge"
        canonical="/demandflow-bridge"
        ogImage="/demandflow-admin.png"
        schemaJson={jsonLd}
      />

      {/* 1. HERO */}
      <Hero />

      {/* 2. WHAT IS DEMANDFLOW BRIDGE? */}
      <WhatIsPlatform />

      {/* 3. CONNECTED BUSINESS ECOSYSTEM */}
      <ConnectedEcosystem />

      {/* 4. CORE CAPABILITIES */}
      <CoreCapabilities />

      {/* 5. THE TECHNOLOGY BEHIND TARAJ GLOBAL */}
      <TechnologyBehindOperations />

      {/* 6. PRODUCT SHOWCASE */}
      <ProductShowcase />

      {/* 7. WHY ONE PLATFORM? */}
      <WhyOnePlatform />

      {/* 8. FINAL CTA */}
      <FinalCTA />
    </div>
  )
}

export default DemandFlowBridge
