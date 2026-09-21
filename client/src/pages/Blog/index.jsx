import React from 'react'
import SEO from '@components/common/SEO'
import BlogListings from '@components/blog/BlogListings'
import ChatBot from '@components/chatbot/ChatBot'

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Taraj Global B2B Marketing Blog",
  "url": "https://tarajglobal.com/blog",
  "description": "Expert insights, demand generation frameworks, ABM playbooks, and B2B sales development best practices.",
  "publisher": {
    "@type": "Organization",
    "name": "Taraj Global",
    "url": "https://tarajglobal.com",
    "logo": "https://tarajglobal.com/OnlyTG-%203.png"
  }
}

function Blog() {
  return (
    <>
      <SEO
        title="B2B Marketing & Demand Generation Blog | Insights & Strategies | Taraj Global"
        description="Explore actionable B2B marketing insights, sales qualification strategies, ABM frameworks, and lead generation trends to scale your enterprise sales pipeline."
        keywords="B2B marketing blog, demand generation articles, B2B lead generation insights, account-based marketing guide, sales qualified leads best practices, B2B cold outreach strategies, B2B sales pipeline growth"
        canonical="/blog"
        ogTitle="B2B Marketing & Demand Generation Insights | Taraj Global"
        ogDescription="Actionable playbooks and research for B2B marketers, SDR leaders, and sales executives."
        schemaJson={blogSchema}
      />
      <div className="min-h-screen bg-background">
        <BlogListings />
        <ChatBot />
      </div>
    </>
  )
}

export default Blog

