import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@components/layout/Container'
import Accordion from './Accordion'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How soon will you respond?',
      answer: 'We typically respond to all inquiries within 24 hours. For urgent matters, please mention it in your message or call our support line directly.'
    },
    {
      question: 'How can I request a quotation?',
      answer: 'You can request a quotation by filling out our contact form with your project details. Our team will review your requirements and provide a detailed quote within 2-3 business days.'
    },
    {
      question: 'Can I schedule a meeting?',
      answer: 'Absolutely! After receiving your inquiry, our team will reach out to schedule a meeting at your convenience. We offer both in-person and virtual meeting options.'
    },
    {
      question: 'Do you provide support?',
      answer: 'Yes, we provide comprehensive support for all our services. Our support team is available 24/7 to assist you with any questions or issues you may have.'
    },
    {
      question: 'Can I become your partner?',
      answer: 'We\'re always looking to expand our partner network. If you\'re interested in partnership opportunities, please contact our business development team through the contact form.'
    }
  ]

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
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
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services and processes.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default FAQ
