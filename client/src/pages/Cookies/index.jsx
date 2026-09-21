import React from 'react'
import { motion } from 'framer-motion'
import { Cookie, Shield, Eye, Lock, Info, CheckCircle } from 'lucide-react'
import Container from '@components/layout/Container'
import ChatBot from '@components/chatbot/ChatBot'

function Cookies() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-cta mb-6"
            >
              <Cookie className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Cookies Policy
            </h1>
            <p className="text-text-secondary text-lg">
              Last updated: January 1, 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-primary" />
                What Are Cookies?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by allowing the website to remember your preferences and understand how you use our services.
              </p>
              <p className="text-text-secondary leading-relaxed">
                This Cookies Policy explains how Taraj Global uses cookies and similar technologies on our website. By continuing to use our website, you consent to our use of cookies in accordance with this policy.
              </p>
            </motion.section>

            {/* Types of Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Essential Cookies</h3>
                  <p className="text-text-secondary leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable basic functionality such as page navigation, access to secure areas, and authentication. Without these cookies, the website cannot function properly.
                  </p>
                </div>

                <div className="border-l-2 border-cta pl-4">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Analytics Cookies</h3>
                  <p className="text-text-secondary leading-relaxed">
                    These cookies help us understand how visitors interact with our website by providing information about which pages are visited most often, how users move around the site, and if they encounter error messages. This helps us improve our website's performance.
                  </p>
                </div>

                <div className="border-l-2 border-primary pl-4">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Functionality Cookies</h3>
                  <p className="text-text-secondary leading-relaxed">
                    These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced features. They may also be used to remember changes you make to text size, fonts, and other customizable elements.
                  </p>
                </div>

                <div className="border-l-2 border-cta pl-4">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Marketing Cookies</h3>
                  <p className="text-text-secondary leading-relaxed">
                    These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* How We Use Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                How We Use Cookies
              </h2>
              <ul className="text-text-secondary space-y-2 list-disc ml-6">
                <li>To remember your preferences and settings</li>
                <li>To analyze website traffic and user behavior</li>
                <li>To improve our website's functionality and performance</li>
                <li>To provide personalized content and advertisements</li>
                <li>To authenticate users and prevent fraudulent activity</li>
                <li>To comply with legal and regulatory requirements</li>
              </ul>
            </motion.section>

            {/* Third-Party Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Cookie className="w-6 h-6 text-primary" />
                Third-Party Cookies
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We may use third-party services that place cookies on your device. These third parties include:
              </p>
              <ul className="text-text-secondary space-y-2 list-disc ml-6 mb-4">
                <li><strong className="text-text-primary">Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong className="text-text-primary">Google AdWords:</strong> For advertising and remarketing purposes</li>
                <li><strong className="text-text-primary">Social Media Platforms:</strong> For social sharing and engagement</li>
              </ul>
              <p className="text-text-secondary leading-relaxed">
                These third parties have their own privacy policies and cookie policies. We encourage you to review these policies to understand how they use your information.
              </p>
            </motion.section>

            {/* Managing Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Managing Your Cookies
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas may be restricted.
              </p>
              <div className="bg-surface rounded-xl p-4 space-y-3">
                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  How to Manage Cookies in Your Browser
                </h3>
                <ul className="text-text-secondary space-y-2 text-sm">
                  <li><strong className="text-text-primary">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong className="text-text-primary">Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong className="text-text-primary">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong className="text-text-primary">Edge:</strong> Settings → Cookies and site permissions → Manage cookies</li>
                </ul>
              </div>
            </motion.section>

            {/* Cookie Consent */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary" />
                Our Cookie Consent
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                When you first visit our website, you will see a cookie consent banner that allows you to:
              </p>
              <ul className="text-text-secondary space-y-2 list-disc ml-6">
                <li>Accept all cookies</li>
                <li>Reject all non-essential cookies</li>
                <li>Customize your cookie preferences through our Cookie Settings</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                You can change your cookie preferences at any time by visiting our Cookie Settings page or by adjusting your browser settings.
              </p>
            </motion.section>

            {/* Updates to Policy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-primary" />
                Updates to This Policy
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. You are advised to review this policy periodically for any changes. Changes to this policy are effective when they are posted on this page.
              </p>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Contact Us
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-secondary">
                  <span className="text-cta">Email:</span>
                  <span>info@tarajglobal.com</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <span className="text-cta">Phone:</span>
                  <span>+91 96655-99442</span>
                </div>
                <div className="flex items-start gap-3 text-text-secondary">
                  <span className="text-cta">Address:</span>
                  <span>The Space Business Complex, Office No. 512–516, Grant Rd, Kharadi, Pune, Maharashtra 411014</span>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </Container>
      <ChatBot />
    </div>
  )
}

export default Cookies
