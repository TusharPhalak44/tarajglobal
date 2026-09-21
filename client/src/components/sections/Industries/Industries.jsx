import React from 'react'
import { motion } from 'framer-motion'
import IndustriesHeader from './IndustriesHeader'
import IndustriesGrid from './IndustriesGrid'
import Container from '@components/layout/Container'

const Industries = () => {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <IndustriesHeader />
        <IndustriesGrid />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            View All Industries
          </button>
        </motion.div>
      </Container>
    </section>
  )
}

export default Industries
