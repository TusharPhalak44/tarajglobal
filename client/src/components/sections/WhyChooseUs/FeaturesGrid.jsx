import React from 'react'
import { motion } from 'framer-motion'
import { Target, Database, ArrowUpRight, Layers, TrendingUp, BarChart3 } from 'lucide-react'
import FeatureCard from './FeatureCard'

const FeaturesGrid = () => {
  const benefits = [
    {
      title: 'ICP-Focused Targeting',
      description: 'Identify and reach companies and decision-makers aligned with your ideal customer profile.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
      icon: Target,
      bgImage: '/light 3.png',
      darkBgImage: '/dark 3.png'
    },
    {
      title: 'Verified B2B Data',
      description: 'Use researched and validated B2B data to support accurate targeting, audience segmentation, and personalized outreach.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      icon: Database,
      bgImage: '/light 3.png',
      darkBgImage: '/dark 3.png'
    },
    {
      title: 'Intent-Led Qualification',
      description: 'Prioritize prospects based on relevant business needs, qualification criteria, and buying signals.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
      icon: ArrowUpRight,
      bgImage: '/light 3.png',
      darkBgImage: '/dark 3.png'
    },
    {
      title: 'Multi-Channel Engagement',
      description: 'Engage target audiences through email, content, account-based marketing, appointment setting, and other relevant channels.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      icon: Layers,
      bgImage: '/light 3.png',
      darkBgImage: '/dark 3.png'
    },
    {
      title: 'Scalable Campaign Execution',
      description: 'Build repeatable B2B campaigns that can expand across markets, industries, accounts, and audience segments.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
      icon: TrendingUp,
      bgImage: '/light 3.png',
      darkBgImage: '/dark 3.png'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
      {benefits.map((benefit, index) => (
        <FeatureCard
          key={benefit.title}
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
          index={index}
          bgImage={benefit.bgImage || '/card bg.png'}
          darkBgImage={benefit.darkBgImage || '/Untitled design 3.png'}
        />
      ))}
    </div>
  )
}

export default FeaturesGrid
