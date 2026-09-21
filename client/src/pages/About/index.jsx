import React from 'react'
import SEO from '@components/common/SEO'
import AboutCompany from './components/AboutCompany'
import OurTeam from './components/OurTeam'
import LivingIntelligenceGrid from './components/LivingIntelligenceGrid'
import ChatBot from '@components/chatbot/ChatBot'

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Taraj Global",
  "url": "https://tarajglobal.com/about",
  "description": "Learn about Taraj Global, our leadership team, and our mission to help B2B SaaS and technology companies accelerate sales pipeline through data-driven marketing.",
  "publisher": {
    "@type": "Organization",
    "name": "Taraj Global",
    "url": "https://tarajglobal.com"
  }
}

function About() {
  return (
    <>
      <SEO
        title="About Taraj Global | B2B Demand Generation & Growth Partner"
        description="Learn about Taraj Global, our leadership team, and our mission to help B2B SaaS and technology companies accelerate sales pipeline through data-driven demand generation and lead qualification."
        keywords="about Taraj Global, B2B marketing agency Pune, demand generation leadership, B2B lead gen company, Hanmant Dhotre, Tushar Phalak, Abhishek Rikibe, B2B growth agency, lead generation experts"
        canonical="/about"
        ogTitle="About Taraj Global | Powering B2B Growth With Qualified Opportunities"
        ogDescription="Learn how Taraj Global helps B2B SaaS and technology companies connect with the right decision-makers and build stronger sales pipelines."
        schemaJson={aboutSchema}
      />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Living Intelligence Grid Animated Background System */}
        <LivingIntelligenceGrid />

        {/* Page Sections */}
        <div className="relative z-10">
          <AboutCompany />
          <OurTeam />
        </div>
        <ChatBot />
      </div>
    </>
  )
}

export default About
