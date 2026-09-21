import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from './components/Hero'
import WhatIsPlatform from './components/WhatIsPlatform'
import ConnectedEcosystem from './components/ConnectedEcosystem'
import CoreCapabilities from './components/CoreCapabilities'
import TechnologyBehindOperations from './components/TechnologyBehindOperations'
import ProductShowcase from './components/ProductShowcase'
import WhyOnePlatform from './components/WhyOnePlatform'
import FinalCTA from './components/FinalCTA'

const DemandFlowBridge = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    <div className="relative w-full bg-background min-h-screen selection:bg-primary/20 selection:text-primary">
      <Helmet>
        {/* Basic SEO */}
        <title>DemandFlow Bridge | Unified Business Operations Platform | Taraj Global</title>
        <meta
          name="description"
          content="Discover DemandFlow Bridge, Taraj Global's unified business operations platform connecting CRM, lead management, sales, client management, HRMS, payroll and operations."
        />
        <link rel="canonical" href="https://tarajglobal.com/demandflow-bridge" />
        <meta
          name="keywords"
          content="business operations platform, CRM and lead management, sales management platform, HRMS platform, client management, payroll management, business operations software, unified business platform, Taraj Global, DemandFlow Bridge"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tarajglobal.com/demandflow-bridge" />
        <meta
          property="og:title"
          content="DemandFlow Bridge | Unified Business Operations Platform | Taraj Global"
        />
        <meta
          property="og:description"
          content="Discover DemandFlow Bridge, Taraj Global's unified business operations platform connecting CRM, lead management, sales, client management, HRMS, payroll and operations."
        />
        <meta property="og:image" content="https://tarajglobal.com/demandflow-admin.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="DemandFlow Bridge | Unified Business Operations Platform | Taraj Global"
        />
        <meta
          name="twitter:description"
          content="Discover DemandFlow Bridge, Taraj Global's unified business operations platform connecting CRM, lead management, sales, client management, HRMS, payroll and operations."
        />
        <meta name="twitter:image" content="https://tarajglobal.com/demandflow-admin.png" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

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
