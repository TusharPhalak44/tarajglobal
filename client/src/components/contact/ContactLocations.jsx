import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import Container from '@components/layout/Container'

const ContactLocations = () => {
  const locations = [
    {
      country: 'India',
      address: 'The Space Business Complex Office No 512-516, Grant Rd, Kharadi, Pune, Maharashtra 411014',
      email: 'info@tarajglobal.com',
      phone: '+91 96655-99442'
    },
    {
      country: 'United States',
      address: '762, Fulton St, San Francisco, California 94115',
      email: 'info@tarajglobal.com',
      phone: '+1 346-487-8307'
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
            Our Offices
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600">
            Visit our offices or reach out to us directly. We're here to help you.
          </p>
        </motion.div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <motion.div
              key={location.country}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * index }}
              whileHover={{ y: -8 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Country */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {location.country}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {location.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Mail us</h4>
                  <a
                    href={`mailto:${location.email}`}
                    className="text-primary hover:underline transition-colors"
                  >
                    {location.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <a
                    href={`tel:${location.phone}`}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ContactLocations
