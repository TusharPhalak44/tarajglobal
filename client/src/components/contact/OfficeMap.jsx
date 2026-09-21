import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import Container from '@components/layout/Container'

const OfficeMap = () => {
  const openDirections = () => {
    window.open('https://maps.google.com/?q=123+Business+Avenue+Tech+Park+New+York+NY+10001', '_blank')
  }

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
            Visit Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Our Office Location
          </h2>
          <p className="text-lg text-gray-600">
            Find us at our headquarters. We'd be happy to meet you in person.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl border border-gray-100"
        >
          <div className="relative h-96 md:h-[500px] bg-gray-200">
            {/* Placeholder for Google Maps - Replace with actual Google Maps embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919364!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
              className="w-full h-full transition-[filter] duration-500 dark:[filter:invert(90%)_hue-rotate(180deg)_contrast(90%)_brightness(95%)]"
            />
          </div>

          {/* Map Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    GlobalCorp Headquarters
                  </h3>
                  <p className="text-sm text-gray-600">
                    123 Business Avenue, Tech Park<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openDirections}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm"
                >
                  <Navigation size={18} />
                  Get Directions
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.google.com/?q=123+Business+Avenue+Tech+Park+New+York+NY+10001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-sm"
                >
                  <ExternalLink size={18} />
                  Open in Maps
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default OfficeMap
