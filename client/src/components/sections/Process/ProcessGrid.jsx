import React from 'react'
import { Search, Code, Rocket } from 'lucide-react'
import ProcessCard from './ProcessCard'

const ProcessGrid = () => {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: 'Discovery',
      description: 'We analyze your business needs, challenges, and goals to create a comprehensive understanding of your requirements.',
      details: ['Requirements Analysis', 'Stakeholder Interviews', 'Technical Assessment']
    },
    {
      step: 2,
      icon: Code,
      title: 'Development',
      description: 'Our expert team builds your solution using industry best practices and cutting-edge technologies.',
      details: ['Architecture Design', 'Agile Development', 'Quality Assurance']
    },
    {
      step: 3,
      icon: Rocket,
      title: 'Deployment',
      description: 'We ensure smooth deployment and provide ongoing support to maximize your investment.',
      details: ['Testing & Validation', 'Go-Live Support', 'Post-Launch Monitoring']
    }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-8 relative">
      {/* Connecting Line */}
      <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-primary to-primary opacity-30" />

      {steps.map((step, index) => (
        <ProcessCard
          key={step.title}
          step={step.step}
          icon={step.icon}
          title={step.title}
          description={step.description}
          details={step.details}
          index={index}
        />
      ))}
    </div>
  )
}

export default ProcessGrid
