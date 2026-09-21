import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Briefcase, Mail, BookOpen, ArrowLeft } from 'lucide-react'
import SEO from '@components/common/SEO'
import Container from '@components/layout/Container'
import ChatBot from '@components/chatbot/ChatBot'

function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Taraj Global"
        description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        noIndex={true}
      />
      <div className="min-h-screen bg-background flex items-center justify-center py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* 404 Code Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent select-none">
                404
              </span>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                Page Not Found
              </h1>
              <p className="text-text-secondary text-base md:text-lg max-w-md mx-auto">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
              </p>
            </motion.div>

            {/* Helpful Navigation Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              <Link
                to="/"
                className="p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center gap-2 group"
              >
                <Home className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-text-primary">Home</span>
              </Link>

              <Link
                to="/services"
                className="p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center gap-2 group"
              >
                <Briefcase className="w-6 h-6 text-cta group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-text-primary">Services</span>
              </Link>

              <Link
                to="/blog"
                className="p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center gap-2 group"
              >
                <BookOpen className="w-6 h-6 text-[#00A6FF] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-text-primary">Blog</span>
              </Link>

              <Link
                to="/contact"
                className="p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center gap-2 group"
              >
                <Mail className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-text-primary">Contact</span>
              </Link>
            </motion.div>

            {/* Return Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-4"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Homepage
              </Link>
            </motion.div>
          </div>
        </Container>
        <ChatBot />
      </div>
    </>
  )
}

export default NotFound
