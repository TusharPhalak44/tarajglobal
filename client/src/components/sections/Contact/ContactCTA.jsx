import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import './Contact.css'

const ContactCTA = ({ onBookMeeting }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ctaRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!ctaRef.current) return
    const rect = ctaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  const handleBookMeeting = () => {
    if (onBookMeeting) {
      onBookMeeting()
    } else {
      scrollToForm()
    }
  }

  const scrollToForm = () => {
    const formSection = document.querySelector('.contact-form-section')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={ctaRef}
      className="contact-cta-section"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
      {/* Animated Background */}
      <div className="cta-background">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="cta-gradient cta-gradient-1"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="cta-gradient cta-gradient-2"
        />
      </div>

      {/* Radial Light Effect */}
      <div className="cta-radial-light" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cta-content"
        >
          <h2 className="cta-title">Ready to Start Your Next Project?</h2>
          <p className="cta-subtitle">
            Let's transform your ideas into reality. Our team is ready to help you achieve your goals.
          </p>
          <div className="cta-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookMeeting}
              className="cta-btn-primary"
            >
              <MessageSquare size={20} />
              Book a Meeting
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactCTA
