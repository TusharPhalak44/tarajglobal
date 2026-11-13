import React from 'react'
import SEO from '@components/common/SEO'
import { useSEOData } from '@hooks/useSEOData'
import AboutCompany from './components/AboutCompany'
import OurTeam from './components/OurTeam'
import LivingIntelligenceGrid from './components/LivingIntelligenceGrid'
import { AboutFAQ, ABOUT_FAQS } from '@components/sections/FAQ/HomeFAQ'

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "name": "Who We Are - Taraj Global",
      "url": "https://tarajglobal.com/who-we-are",
      "description": "Learn about Taraj Global, our leadership team, and our mission to help B2B SaaS and technology companies accelerate sales pipeline through data-driven marketing.",
      "publisher": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": ABOUT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
}

function About() {
  const { seoData } = useSEOData('page', 'who-we-are', {
    title: "About TaRaj Global | Tech-Powered B2B Demand Generation Engine",
    description: "Learn about TaRaj Global's company heritage, leadership team, and mission. We combine in-house verification tools, custom CRM pipeline delivery, and account outreach across US, EMEA & APAC.",
    canonical: "/who-we-are",
    ogTitle: "About TaRaj Global | Tech-Powered B2B Demand Generation Engine",
    ogDescription: "Learn about TaRaj Global's company heritage, leadership team, and mission. We combine in-house verification tools, custom CRM pipeline delivery, and account outreach across US, EMEA & APAC.",
    schemaJson: aboutSchema
  })

  return (
    <>
      <SEO {...seoData} schemaJson={aboutSchema} />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Living Intelligence Grid Animated Background System */}
        <LivingIntelligenceGrid />

        {/* Page Sections */}
        <div className="relative z-10">
          <AboutCompany />
          <OurTeam />
          <AboutFAQ />
        </div>
      </div>
    </>
  )
}

export default About
