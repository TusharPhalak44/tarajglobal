import React from 'react'
import { Building2, Factory, ShoppingCart, Stethoscope, GraduationCap, Plane } from 'lucide-react'
import IndustryCard from './IndustryCard'

const IndustriesGrid = () => {
  const industries = [
    {
      icon: Building2,
      title: 'Finance & Banking',
      description: 'Secure and compliant solutions for financial institutions and banking services.',
      color: 'bg-blue-500',
      link: '/services'
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Smart manufacturing and IoT integration solutions for industrial efficiency.',
      color: 'bg-orange-500',
      link: '/services'
    },
    {
      icon: ShoppingCart,
      title: 'Retail & E-commerce',
      description: 'Digital commerce and customer experience platforms for retail businesses.',
      color: 'bg-green-500',
      link: '/services'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare',
      description: 'HIPAA-compliant healthcare technology solutions for medical providers.',
      color: 'bg-red-500',
      link: '/services'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Learning management and educational technology for institutions.',
      color: 'bg-purple-500',
      link: '/services'
    },
    {
      icon: Plane,
      title: 'Travel & Hospitality',
      description: 'Digital solutions for travel agencies and hospitality businesses.',
      color: 'bg-cyan-500',
      link: '/services'
    }
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {industries.map((industry, index) => (
        <IndustryCard
          key={industry.title}
          icon={industry.icon}
          title={industry.title}
          description={industry.description}
          color={industry.color}
          link={industry.link}
          index={index}
        />
      ))}
    </div>
  )
}

export default IndustriesGrid
