import React from 'react'
import { motion } from 'framer-motion'
import Container from '@components/layout/Container'
import SEO from '@components/common/SEO'

const cookieSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Cookies Policy | Taraj Global",
  "url": "https://tarajglobal.com/cookies",
  "description": "Understand how Taraj Global uses cookies and tracking technologies to improve browsing experience, analytics, and service personalization."
}

const CookiePolicyPage = () => {
  const cookieTypes = [
    {
      type: 'Necessary',
      purpose: 'Website functionality',
      required: 'Yes',
    },
    {
      type: 'Analytics',
      purpose: 'Usage statistics',
      required: 'Optional',
    },
    {
      type: 'Functional',
      purpose: 'User preferences',
      required: 'Optional',
    },
    {
      type: 'Marketing',
      purpose: 'Advertising',
      required: 'Optional',
    },
  ]

  return (
    <>
      <SEO
        title="Cookie Policy | Tracking Technologies & Consent | Taraj Global"
        description="Learn about the cookies and tracking technologies used on Taraj Global's website. Manage your cookie consent preferences and privacy settings."
        keywords="Taraj Global cookie policy, website cookies, tracking technologies, cookie preferences, GDPR cookie consent"
        canonical="/cookies"
        ogTitle="Cookie Policy | Taraj Global"
        ogDescription="Learn how we use cookies and manage your privacy preferences."
        schemaJson={cookieSchema}
      />
      <div className="min-h-screen bg-[#050505] py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cookies Policy
            </h1>
            <p className="text-lg text-text-secondary">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* What Are Cookies */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
              <p className="text-text-secondary leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. They are widely used to make websites work more efficiently and to provide information to the website owners. Cookies allow websites to remember your actions and preferences over time, enhancing your browsing experience.
              </p>
            </section>

            {/* Why We Use Cookies */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Why We Use Cookies</h2>
              <p className="text-text-secondary leading-relaxed">
                We use cookies to improve your browsing experience, analyze website traffic, personalize content, and provide relevant advertisements. Cookies help us understand how you interact with our website, enabling us to make improvements and deliver a better user experience.
              </p>
            </section>

            {/* Types of Cookies */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                We use different types of cookies for various purposes. Below is a detailed explanation of each category:
              </p>

              {/* Necessary Cookies */}
              <div className="mb-6 p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Necessary Cookies</h3>
                <p className="text-text-secondary leading-relaxed">
                  These cookies are essential for the website to function properly. They enable basic functions such as page navigation, access to secure areas, and authentication. Without these cookies, the website cannot function correctly. These cookies cannot be disabled.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="mb-6 p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                <p className="text-text-secondary leading-relaxed">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They allow us to analyze user behavior, identify trends, and improve our website's performance and content.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="mb-6 p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Functional Cookies</h3>
                <p className="text-text-secondary leading-relaxed">
                  These cookies enable enhanced functionality and personalization, such as videos, live chats, and social media integration. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Marketing Cookies</h3>
                <p className="text-text-secondary leading-relaxed">
                  These cookies are used to track visitors across websites to display relevant advertisements. They help us and our partners deliver personalized ads based on your browsing history and interests.
                </p>
              </div>
            </section>

            {/* Cookie Information Table */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-6">Cookie Information Table</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white font-semibold">Cookie Type</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Purpose</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTypes.map((cookie, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0">
                        <td className="py-3 px-4 text-text-secondary">{cookie.type}</td>
                        <td className="py-3 px-4 text-text-secondary">{cookie.purpose}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            cookie.required === 'Yes' 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-white/10 text-text-secondary'
                          }`}>
                            {cookie.required}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
              <p className="text-text-secondary leading-relaxed">
                We may use third-party services that also use cookies on our behalf. These include analytics providers, advertising networks, and social media platforms. These third parties have access to your data only to perform specific tasks on our behalf and are not authorized to use your data for any other purpose.
              </p>
            </section>

            {/* Managing Your Cookies */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Managing Your Cookies</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You can manage your cookie preferences through our cookie consent banner, which appears on your first visit. You can also change your preferences at any time by clicking "Cookie Settings" in the footer of our website.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Additionally, you can control and delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality and performance of our website.
              </p>
            </section>

            {/* Data We Collect */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Data We Collect</h2>
              <p className="text-text-secondary leading-relaxed">
                Through cookies, we may collect information such as your IP address, browser type, device information, pages visited, time spent on pages, and referral sources. This data is used to improve our services and provide a better user experience. We do not collect personally identifiable information through cookies unless you explicitly provide it.
              </p>
            </section>

            {/* Policy Updates */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Policy Updates</h2>
              <p className="text-text-secondary leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We encourage you to review this policy periodically to stay informed about how we use cookies and protect your privacy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-[#121212] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookies Policy, please contact us:
              </p>
              <div className="space-y-2 text-text-secondary">
                <p><strong className="text-white">Email:</strong> privacy@tarajglobal.com</p>
                <p><strong className="text-white">Address:</strong> Taraj Global, Pune, Maharashtra 411014, India</p>
              </div>
            </section>
          </div>
        </motion.div>
      </Container>
      </div>
    </>
  )
}

export default CookiePolicyPage
