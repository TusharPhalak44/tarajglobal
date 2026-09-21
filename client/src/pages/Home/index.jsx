import React from 'react'
import SEO from '@components/common/SEO'
import CursorSpotlight from '@components/effects/CursorSpotlight'
import DynamicScrollBackground from '@components/effects/DynamicScrollBackground'
import Hero from '@components/sections/Hero'
import GetToKnowUs from '@components/sections/GetToKnowUs/GetToKnowUs'
import OurClients from '@components/sections/OurClients'
import Testimonials from '@components/sections/Testimonials/Testimonials'
import WhyChooseUs from '@components/sections/WhyChooseUs/WhyChooseUs'
import Services from '@components/sections/Services/Services'
import Stats from '@components/sections/Stats'
import HowWeWork from '@components/sections/HowWeWork'


const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tarajglobal.com/#organization",
      "name": "Taraj Global",
      "url": "https://tarajglobal.com",
      "logo": "https://tarajglobal.com/logo.png",
      "description": "B2B Demand Generation, Lead Generation, ABM, and Technology Marketing partner for SaaS and enterprise companies.",
      "telephone": "+91-96655-99442",
      "email": "info@tarajglobal.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Space Business Complex, Office No 512-516, Grant Rd, Kharadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411014",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.linkedin.com/company/tarajglobal"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://tarajglobal.com/#website",
      "url": "https://tarajglobal.com",
      "name": "Taraj Global",
      "publisher": {
        "@id": "https://tarajglobal.com/#organization"
      }
    }
  ]
}

function Home() {
  return (
    <>
      <SEO
        title="B2B Lead Generation & Demand Generation Agency | Taraj Global"
        description="Scale your sales pipeline with Taraj Global. We deliver high-impact B2B lead generation, account-based marketing (ABM), appointment setting, and verified B2B data for SaaS and technology companies."
        keywords="B2B lead generation, demand generation agency, B2B sales pipeline, SaaS lead generation, qualified B2B leads, account-based marketing agency, B2B appointment setting, intent-based marketing, sales qualified leads, verified B2B intelligence"
        canonical="/"
        ogTitle="Taraj Global | Powering Smarter B2B Pipeline Growth"
        ogDescription="Accelerate pipeline velocity with verified B2B data, demand generation campaigns, and targeted decision-maker outreach."
        schemaJson={homeSchema}
      />

      <div className="relative min-h-screen">
        {/* Dynamic Scroll-Linked Zoom In & Out Kinetic Background */}
        <DynamicScrollBackground />

        {/* Interactive Cursor Spotlight & Top Scroll Progress Bar */}
        <CursorSpotlight />

        {/* Home Page Content Sections */}
        <div className="relative z-10">
          <Hero />
          <GetToKnowUs />
          <Services />
          <Stats />
          <OurClients />
          <Testimonials />
          <WhyChooseUs />
          <HowWeWork />
        </div>
      </div>
    </>
  )
}

export default Home
