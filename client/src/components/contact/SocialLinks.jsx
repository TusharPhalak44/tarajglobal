import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Facebook, Instagram, Twitter, Youtube, Github } from 'lucide-react'
import Container from '@components/layout/Container'

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com',
      color: 'hover:bg-blue-500'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      color: 'hover:bg-pink-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com',
      color: 'hover:bg-sky-500'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com',
      color: 'hover:bg-red-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
      color: 'hover:bg-gray-800'
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
            Connect With Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Follow Us on Social Media
          </h2>
          <p className="text-lg text-gray-600">
            Stay connected with us on social platforms for updates, news, and more.
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center transition-colors duration-300 ${social.color} hover:text-white text-gray-600`}
                aria-label={`Follow us on ${social.name}`}
              >
                <Icon size={24} />
              </motion.a>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default SocialLinks
