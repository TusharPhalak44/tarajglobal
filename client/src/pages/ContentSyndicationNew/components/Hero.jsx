import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  const handleGetConsultation = () => {
    navigate('/contact')
  }

  const handleExploreProcess = () => {
    const ctaSection = document.querySelector('section:last-of-type')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-50" style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 166, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 109, 0, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(114, 214, 105, 0.1) 0%, transparent 60%)
          `
        }} />
      </div>

      {/* Animated decorative circles */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-cta/10 blur-3xl pointer-events-none"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border mb-6 w-fit"
            >
              <motion.div 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm text-text-secondary">Content Syndication</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight"
            >
              Content Syndication Services for
              <br />
              <motion.span 
                className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% auto' }}
              >
                B2B Lead Generation
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-text-secondary mb-8 leading-relaxed max-w-lg"
            >
              Taraj Global's Content Syndication Services help B2B businesses expand the reach of their content and connect with relevant audiences across trusted digital channels. We distribute valuable assets such as whitepapers, eBooks, research reports, webinars, case studies, and thought-leadership content to professionals who match your target market and ideal customer profile.
            </motion.p>

            {/* Additional Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-lg text-text-secondary leading-relaxed mb-4">
                Our B2B Content Syndication approach combines audience targeting, publisher networks, strategic content distribution, lead capture, and campaign optimization to generate meaningful engagement and qualified B2B leads. By placing your content in front of relevant professionals, we help increase brand visibility while creating opportunities to connect with potential buyers.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                From audience identification and content distribution to lead capture and performance tracking, Taraj Global manages the complete content syndication process. Our campaign insights help you understand content performance, identify engaged prospects, optimize distribution, and turn content engagement into actionable B2B sales opportunities.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetConsultation}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-cta text-white rounded-xl font-semibold text-lg transition-all shadow-lg w-fit cursor-pointer"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80"
              alt="Content Syndication"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
