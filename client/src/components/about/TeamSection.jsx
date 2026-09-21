import React from 'react'
import { motion } from 'framer-motion'
import TeamCard from './TeamCard'
import Container from '@components/layout/Container'

const TeamSection = () => {
  const team = [
    {
      name: 'John Smith',
      designation: 'Chief Executive Officer',
      description: 'Visionary leader with 20+ years of experience in technology and business strategy.',
      avatar: 'JS'
    },
    {
      name: 'Sarah Johnson',
      designation: 'Chief Technology Officer',
      description: 'Technology expert driving innovation and technical excellence across all projects.',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      designation: 'Chief Operations Officer',
      description: 'Operations specialist ensuring efficient delivery and exceptional client experiences.',
      avatar: 'MC'
    },
    {
      name: 'Emily Davis',
      designation: 'Chief Marketing Officer',
      description: 'Marketing strategist building brand presence and driving business growth.',
      avatar: 'ED'
    },
    {
      name: 'David Wilson',
      designation: 'Head of Engineering',
      description: 'Engineering leader managing technical teams and delivering robust solutions.',
      avatar: 'DW'
    },
    {
      name: 'Lisa Anderson',
      designation: 'Head of Design',
      description: 'Design expert creating user-centric experiences and stunning interfaces.',
      avatar: 'LA'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Meet Our Leaders
          </h2>
          <p className="text-lg text-gray-600">
            Our team of experienced professionals is dedicated to delivering excellence and driving innovation.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamCard
              key={member.name}
              name={member.name}
              designation={member.designation}
              description={member.description}
              avatar={member.avatar}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TeamSection
