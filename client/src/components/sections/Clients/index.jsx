import React from 'react'
import { motion } from 'framer-motion'
import Container from '@components/layout/Container'

const Clients = () => {
  const clients = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'InnovateTech', logo: 'IT' },
    { name: 'GlobalFinance', logo: 'GF' },
    { name: 'HealthPlus', logo: 'HP' },
    { name: 'EduWorld', logo: 'EW' },
    { name: 'TravelPro', logo: 'TP' },
    { name: 'RetailMax', logo: 'RM' },
    { name: 'BuildCorp', logo: 'BC' }
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
            Our Clients
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600">
            We are proud to partner with leading organizations across various industries.
          </p>
        </motion.div>

        {/* ClientsGrid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 hover:shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 group-hover:scale-110 transition-transform">
                    {client.logo}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {client.name}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
            <span className="font-semibold">500+ Companies Trust Us</span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Clients
