import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Globe, Mail, Phone } from 'lucide-react'
import Container from '@components/layout/Container'
import ChatBot from '@components/chatbot/ChatBot'
import SEO from '@components/common/SEO'

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy | Taraj Global",
  "url": "https://tarajglobal.com/privacy",
  "description": "Learn about how Taraj Global collects, manages, safeguards, and protects your personal data in compliance with global standards."
}

function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Data Protection & Compliance | Taraj Global"
        description="Learn how Taraj Global collects, processes, and protects your personal data. Read our comprehensive Privacy Policy covering GDPR, CCPA, and enterprise compliance."
        keywords="Taraj Global privacy policy, B2B data protection, GDPR compliance, CCPA compliance, enterprise privacy policy"
        canonical="/privacy"
        ogTitle="Privacy Policy | Taraj Global"
        ogDescription="Read our privacy commitments and data governance framework."
        schemaJson={privacySchema}
      />
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
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Privacy Policy
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
                <Eye className="w-6 h-6 text-primary" />
                Introduction
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Taraj Global ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website tarajglobal.com and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you to any changes by updating the "Last updated" date of this Privacy Policy and notifying you via email or through a notice on our website. Your continued use of the Site following the posting of changes constitutes your acceptance of such changes.
              </p>
            </motion.section>

            {/* Information We Collect */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-text-primary mb-3">Personal Information</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                We may collect personal identification information from you in various ways, including when you register on our site, subscribe to our newsletter, respond to a survey, fill out a form, use our services, or communicate with us. This may include:
              </p>
              <ul className="text-text-secondary space-y-2 mb-6 list-disc ml-6">
                <li>Name and email address</li>
                <li>Phone number</li>
                <li>Company name and job title</li>
                <li>Address, State, Province, ZIP/Postal Code, City</li>
                <li>Account credentials (username, password)</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">Automatically Collected Information</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                When you visit our Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you navigate the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
              </p>
            </motion.section>

            {/* How We Use Your Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                How We Use Your Information
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="text-text-secondary space-y-2 list-disc ml-6">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, security alerts, and support messages</li>
                <li>Respond to comments, questions, and customer service requests</li>
                <li>Send user surveys and conduct marketing research</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and fraud</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </motion.section>

            {/* Information Sharing */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#00A6FF]" />
                Information Sharing
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We only share information with your consent, to comply with laws, to provide you with services, or to protect our rights. We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="text-text-secondary space-y-2 list-disc ml-6">
                <li><strong className="text-text-primary">Service Providers:</strong> We may employ third-party companies to perform services on our behalf, including data analysis, email delivery, hosting services, and customer service.</li>
                <li><strong className="text-text-primary">Business Transfers:</strong> We may share or transfer your information in connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
                <li><strong className="text-text-primary">Legal Requirements:</strong> We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, or threats to the safety of any person.</li>
              </ul>
            </motion.section>

            {/* Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Cookies and Tracking Technologies
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We use cookies for the following purposes:
              </p>
              <ul className="text-text-secondary space-y-2 list-disc ml-6">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the operation of our Site</li>
                <li><strong className="text-white">Analytics Cookies:</strong> To understand how visitors use our Site</li>
                <li><strong className="text-white">Functionality Cookies:</strong> To remember your preferences</li>
                <li><strong className="text-white">Advertising Cookies:</strong> To serve relevant advertisements</li>
              </ul>
            </motion.section>

            {/* Data Security */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Data Security
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our efforts, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our security measures include:
              </p>
              <ul className="text-text-secondary space-y-2 list-disc ml-6">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure password storage using industry-standard hashing</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication systems</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </motion.section>

            {/* Your Rights */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Your Privacy Rights
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="text-text-secondary space-y-2 list-disc ml-6">
                <li><strong className="text-text-primary">Right to Access:</strong> Request access to your personal information</li>
                <li><strong className="text-text-primary">Right to Correction:</strong> Request correction of inaccurate information</li>
                <li><strong className="text-text-primary">Right to Deletion:</strong> Request deletion of your personal information</li>
                <li><strong className="text-text-primary">Right to Portability:</strong> Receive a copy of your data in a structured format</li>
                <li><strong className="text-text-primary">Right to Object:</strong> Object to processing of your personal information</li>
                <li><strong className="text-text-primary">Right to Restrict:</strong> Request restriction of processing</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                To exercise these rights, please contact us at info@tarajglobal.com.
              </p>
            </motion.section>

            {/* Third-Party Services */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#00A6FF]" />
                Third-Party Services
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Our Site may contain links to third-party websites and services. We are not responsible for the privacy practices of such third parties. We encourage you to be aware when you leave our Site and to read the privacy statements of each third-party website that you visit.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We may use third-party services including but not limited to Google Analytics, cloud hosting providers, email marketing services, and payment processors. These services have their own privacy policies governing the use of information they collect.
              </p>
            </motion.section>

            {/* International Data Transfers */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#00A6FF]" />
                International Data Transfers
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.
              </p>
            </motion.section>

            {/* Children's Privacy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Children's Privacy
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Our Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our servers.
              </p>
            </motion.section>

            {/* Changes to Policy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Changes to This Privacy Policy
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Contact Us
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Mail className="w-5 h-5 text-cta" />
                  <span>info@tarajglobal.com</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Phone className="w-5 h-5 text-cta" />
                  <span>+91 96655-99442</span>
                </div>
                <div className="flex items-start gap-3 text-text-secondary">
                  <Globe className="w-5 h-5 text-cta mt-1" />
                  <span>The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014</span>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </Container>
      <ChatBot />
    </div>
    </>
  )
}

export default Privacy
