import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Container from '@components/layout/Container'
import ContactCard from './ContactCard'

const ContactCards = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      information: '123 Business Avenue, Tech Park, New York, NY 10001'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      information: '+1 (555) 123-4567\n+1 (555) 987-6543'
    },
    {
      icon: Mail,
      title: 'Email Address',
      information: 'contact@globalcorp.com\nsupport@globalcorp.com'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      information: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: Closed'
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
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Contact Information
          </h2>
          <p className="text-lg text-gray-600">
            Reach out to us through any of these channels. We're here to help you with your inquiries.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <ContactCard
              key={info.title}
              icon={info.icon}
              title={info.title}
              information={info.information}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ContactCards
