import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Mail, Phone, Clock, Globe, Linkedin, Twitter, Instagram, Github } from 'lucide-react'
import './Contact.css'

const BusinessInfo = () => {
  const socialLinks = [
    { icon: Linkedin, name: 'LinkedIn', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' },
    { icon: Instagram, name: 'Instagram', href: '#' },
    { icon: Github, name: 'GitHub', href: '#' },
  ]

  return (
    <section className="business-info-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="info-wrapper"
        >
          <h2 className="section-title">Business Information</h2>
          <p className="section-subtitle">Official company details and contact information.</p>
          
          <div className="info-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="info-card"
            >
              <Building2 size={24} className="info-icon" />
              <h3>Company Name</h3>
              <p>Taraj Global Technologies</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="info-card"
            >
              <Globe size={24} className="info-icon" />
              <h3>GST Number</h3>
              <p>29ABCDE1234F1Z5</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="info-card"
            >
              <Mail size={24} className="info-icon" />
              <h3>Business Email</h3>
              <p>business@tarajglobal.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="info-card"
            >
              <Mail size={24} className="info-icon" />
              <h3>Support Email</h3>
              <p>support@tarajglobal.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="info-card"
            >
              <Mail size={24} className="info-icon" />
              <h3>Sales Email</h3>
              <p>sales@tarajglobal.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="info-card"
            >
              <Phone size={24} className="info-icon" />
              <h3>Office Phone</h3>
              <p>+1 (555) 123-4567</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="info-card"
            >
              <Phone size={24} className="info-icon" />
              <h3>Emergency Contact</h3>
              <p>+1 (555) 999-8888</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="info-card"
            >
              <Clock size={24} className="info-icon" />
              <h3>Business Hours</h3>
              <p>Mon-Fri: 9AM-6PM PST</p>
            </motion.div>
          </div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="social-links"
          >
            <h3>Follow Us</h3>
            <div className="social-icons">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="social-icon"
                    aria-label={social.name}
                  >
                    <Icon size={24} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BusinessInfo
