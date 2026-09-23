import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import './Contact.css'

const ContactCards = () => {
  const cards = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+91 96655-99442',
      subInfo: 'Available 24/7 for emergencies',
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'info@tarajglobal.com',
      subInfo: '',
    },
    {
      icon: MapPin,
      title: 'Visit Office',
      info: 'The Space Business Complex Office No 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014',
      subInfo: '',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: '5:30 PM - 2:30 AM',
      subInfo: 'Sat - Sun: Closed',
    },
  ]

  return (
    <section className="contact-cards-section relative overflow-hidden">
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
        <div className="cards-grid">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="contact-card premium-card"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="card-icon"
                >
                  <Icon size={40} />
                </motion.div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-info">{card.info}</p>
                <p className="card-subinfo">{card.subInfo}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ContactCards
