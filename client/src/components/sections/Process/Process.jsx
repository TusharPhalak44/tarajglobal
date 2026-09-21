import React from 'react'
import { motion } from 'framer-motion'
import ProcessHeader from './ProcessHeader'
import ProcessDiagram from './ProcessDiagram'
import Container from '@components/layout/Container'

const Process = () => {
  return (
    <section className="py-16 md:py-20 lg:py-32 relative text-text-primary">
      <Container>
        <ProcessHeader />
        <ProcessDiagram />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <button 
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cta to-accent text-text-primary rounded-lg font-semibold hover:from-cta-hover hover:to-accent transition-all focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 shadow-lg shadow-cta/20 text-sm md:text-base"
          >
            Start Your Project
          </button>
        </motion.div>
      </Container>
    </section>
  )
}

export default Process
