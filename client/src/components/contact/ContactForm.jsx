import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, User, Mail, Phone, FileText, MessageSquare } from 'lucide-react'
import Container from '@components/layout/Container'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    // Expected API: POST /api/contact
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <section className="py-20 lg:py-32 bg-background">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Write to us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-text-secondary">
            Send Us a Message. Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-surface rounded-2xl shadow-xl border border-border/30 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 bg-surface ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-border focus:ring-primary focus:border-primary'
                    }`}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 bg-surface ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-border focus:ring-primary focus:border-primary'
                    }`}
                  />
                </div>
              </div>

              {/* Phone & Subject */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 bg-surface ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-border focus:ring-primary focus:border-primary'
                    }`}
                  />
                </div>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 bg-surface ${
                      errors.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-border focus:ring-primary focus:border-primary'
                    }`}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-text-muted" size={20} />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Message"
                  rows={5}
                  required
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 bg-surface ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-border focus:ring-primary focus:border-primary'
                  }`}
                />
              </div>

              {/* Submit Status */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-green-700 font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-cta to-accent text-text-primary rounded-lg font-semibold hover:from-cta-hover hover:to-accent transition-all focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg shadow-cta/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  'Submit'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default ContactForm
