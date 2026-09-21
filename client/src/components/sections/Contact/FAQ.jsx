import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import './Contact.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How quickly do you respond?',
      answer: 'We typically respond to all inquiries within 24 hours. For urgent matters, please call our emergency contact line. Our team monitors all communication channels during business hours.',
    },
    {
      question: 'Do you work internationally?',
      answer: 'Yes, we work with clients globally. Our team is experienced in remote collaboration and can accommodate different time zones. We have successfully delivered projects for clients in over 30 countries.',
    },
    {
      question: 'What industries do you serve?',
      answer: 'We serve a wide range of industries including technology, healthcare, finance, e-commerce, education, manufacturing, and more. Our expertise allows us to adapt to various business needs and requirements.',
    },
    {
      question: 'How do projects begin?',
      answer: 'Projects typically begin with a discovery call to understand your needs, followed by a detailed proposal and timeline. Once agreed, we kick off with a planning session and begin development with regular check-ins.',
    },
    {
      question: 'Can I request a quotation?',
      answer: 'Absolutely! You can request a free quotation by filling out our contact form or scheduling a consultation. We provide detailed estimates based on your project requirements and timeline.',
    },
    {
      question: 'Do you provide support after delivery?',
      answer: 'Yes, we offer comprehensive post-delivery support including maintenance packages, bug fixes, and feature enhancements. We believe in building long-term relationships with our clients.',
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="faq-wrapper"
        >
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions about our services.</p>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="faq-question"
                  whileHover={{ x: 4 }}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-icon"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="faq-answer"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
