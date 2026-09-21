import React from 'react'
import { motion } from 'framer-motion'
import Container from '@components/layout/Container'

const OurStory = () => {
  const milestones = [
    {
      year: '2021',
      title: 'Founded',
      description: 'TaRaj Global Solutions Private Limited was incorporated on 12 May 2021 in Pune, Maharashtra. The company was registered for software publishing, consultancy and related technology services.'
    },
    {
      year: '2021–2022',
      title: 'Foundation & Growth',
      description: 'TaRaj Global established its operations and developed its capabilities in B2B lead generation, demand generation, digital marketing and technology-focused business services. The company began building its client-focused delivery model.'
    },
    {
      year: '2022–2023',
      title: 'Major Client Partnerships',
      description: 'TaRaj Global expanded its client portfolio and worked with recognized global technology brands. Its official website features client relationships/testimonials associated with Avaya, Microsoft, Mitel, Cisco, Oracle and RingCentral.'
    },
    {
      year: '2023–2024',
      title: 'International Projects',
      description: 'With clients and business relationships across different markets, TaRaj Global strengthened its global B2B demand-generation capabilities. The company describes itself as serving business firms globally and delivering performance-driven lead-generation solutions.'
    },
    {
      year: '2024–2025',
      title: 'Expansion & Expertise',
      description: 'TaRaj Global expanded its service portfolio across Sales Qualified Leads, BANT Leads, Marketing Qualified Leads, Appointment Setting, Demand Generation, List Building and Database Cleansing. Its website also describes capabilities including content marketing, ABM, intent and install-based targeting.'
    },
    {
      year: '2026',
      title: 'Future Goals',
      description: 'TaRaj Global\'s next phase is focused on expanding its global presence, strengthening technology-driven demand generation, building long-term client partnerships, and delivering measurable business growth through data-driven and performance-focused solutions.'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            A Journey of Innovation and Growth
          </h2>
          <p className="text-lg text-gray-600">
            From humble beginnings to becoming a trusted industry leader, our journey has been defined by innovation, dedication, and a relentless pursuit of excellence.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />

          <div className="space-y-12 lg:space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Timeline Dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10" />

                {/* Content */}
                <div className={`lg:pr-12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:pl-12 lg:ml-auto'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <span className="text-3xl font-bold text-primary mb-2 block">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Empty column for spacing */}
                <div className="hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default OurStory
