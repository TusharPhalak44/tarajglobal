import React from 'react'
import AboutContent from './AboutContent'
import AboutFeatures from './AboutFeatures'
import Container from '@components/layout/Container'

const About = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 relative">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <AboutContent />
          
          {/* Features */}
          <div className="mt-8">
            <AboutFeatures />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
