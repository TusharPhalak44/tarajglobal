import React from 'react'
import SEO from '@components/common/SEO'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhyChoose from './components/WhyChoose'
import CTA from './components/CTA'
import ChatBot from '@components/chatbot/ChatBot'

const contentSyndicationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "B2B Content Syndication Services",
  "provider": {
    "@type": "Organization",
    "name": "Taraj Global",
    "url": "https://tarajglobal.com"
  },
  "description": "Distribute your B2B whitepapers, ebooks, and research reports to engage verified decision-makers across global B2B networks.",
  "url": "https://tarajglobal.com/content-syndication"
}

const ContentSyndicationNew = () => {
  return (
    <>
      <SEO
        title="B2B Content Syndication Services | Lead Generation at Scale | Taraj Global"
        description="Distribute your whitepapers, ebooks, and case studies to active enterprise buyers. Taraj Global syndicates your content to verified B2B decision-makers."
        keywords="B2B content syndication, content syndication lead generation, whitepaper syndication, B2B content distribution, cost per lead content syndication, content marketing leads, verified reader leads, tech content syndication"
        canonical="/content-syndication"
        ogTitle="B2B Content Syndication Services | Taraj Global"
        ogDescription="Syndicate your high-value B2B content to targeted enterprise decision-makers and generate qualified leads."
        schemaJson={contentSyndicationSchema}
      />
      <div className="min-h-screen bg-background">
        <Hero />
        <HowItWorks />
        <WhyChoose />
        <CTA />
        <ChatBot />
      </div>
    </>
  )
}

export default ContentSyndicationNew
