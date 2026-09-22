import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import './Contact.css'

const OfficeLocation = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="office-location-section relative overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-hero" />
      
      {/* Animated orange gradient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(255, 109, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(255, 166, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 166, 255, 0.05) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Decorative blur circles with brand colors */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 right-20 w-96 h-96 bg-cta/10 rounded-full blur-3xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-20 left-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl"
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(#00A6FF 1px, transparent 1px), linear-gradient(90deg, #00A6FF 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="location-wrapper"
        >
          <h2 className="section-title">Our Office</h2>
          <p className="section-subtitle">Visit us at our headquarters or get in touch online.</p>
          
          <div className="location-content">
            {/* Map Container - Left Card (Slides in from Left on scroll) */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -140 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="map-container"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.955632654321!2d73.9234!3d18.5567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c9f9f9f9f9f9%3A0x1234567890abcdef!2sThe%20Space%20Business%20Complex%2C%20Grant%20Rd%2C%20Kharadi%2C%20Pune%2C%20Maharashtra%20411014!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
                className="google-map w-full h-full transition-[filter] duration-500 dark:[filter:invert(90%)_hue-rotate(180deg)_contrast(90%)_brightness(95%)]"
              />
            </motion.div>

            {/* Location Details - Right Card (Slides in from Right on scroll) */}
            <div className="location-details">
              <motion.div
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 140 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="detail-card"
              >
                <MapPin size={24} className="detail-icon" />
                <h3>Address</h3>
                <p>The Space Business Complex</p>
                <p>Office No 512-516, Grant Rd, Kharadi</p>
                <p>Pune, Maharashtra 411014</p>
                <motion.a
                  href="https://www.google.com/maps/dir/?api=1&destination=The+Space+Business+Complex,+Office+No+512-516,+Grant+Rd,+Kharadi,+Pune,+Maharashtra+411014"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="detail-btn"
                >
                  <Navigation size={16} />
                  Get Directions
                </motion.a>
                <div className="mt-6 pt-6 border-t border-border">
                  <p>762, Fulton St</p>
                  <p>San Francisco, California 94115</p>
                  <motion.a
                    href="https://www.google.com/maps/dir/?api=1&destination=762,+Fulton+St,+San+Francisco,+California+94115"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="detail-btn"
                  >
                    <Navigation size={16} />
                    Get Directions
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default OfficeLocation
