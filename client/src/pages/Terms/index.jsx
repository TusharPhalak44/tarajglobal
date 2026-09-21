import React from 'react'
import ChatBot from '@components/chatbot/ChatBot'
import SEO from '@components/common/SEO'

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms & Conditions | Taraj Global",
  "url": "https://tarajglobal.com/terms",
  "description": "Terms of Service and legal agreements governing the use of Taraj Global's website, marketing services, and digital solutions."
}

function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions | Service Agreement | Taraj Global"
        description="Review the Terms & Conditions governing Taraj Global's demand generation and lead generation services, intellectual property, and client engagements."
        keywords="Taraj Global terms, terms and conditions, B2B marketing terms of service, lead generation agreement"
        canonical="/terms"
        ogTitle="Terms & Conditions | Taraj Global"
        ogDescription="Read the terms and conditions governing the use of Taraj Global's services."
        schemaJson={termsSchema}
      />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-cta to-accent px-6 py-8">
            <h1 className="text-3xl font-bold text-text-primary">Terms & Conditions</h1>
            <p className="text-text-primary/80 mt-2">Last Updated: January 2025</p>
          </div>

          <div className="px-6 py-8 space-y-8">
            {/* Introduction */}
            <section className="text-text-secondary">
              <p className="text-lg">
                Welcome to Taraj Global. These Terms & Conditions govern your use of our website, services, and products. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </section>

            {/* Table of Contents */}
            <nav className="border-b border-border pb-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#acceptance" className="text-primary hover:text-cta transition-colors">1. Acceptance of Terms</a></li>
                <li><a href="#services" className="text-primary hover:text-cta transition-colors">2. Description of Services</a></li>
                <li><a href="#user-accounts" className="text-primary hover:text-cta transition-colors">3. User Accounts</a></li>
                <li><a href="#user-conduct" className="text-primary hover:text-cta transition-colors">4. User Conduct</a></li>
                <li><a href="#intellectual-property" className="text-primary hover:text-cta transition-colors">5. Intellectual Property</a></li>
                <li><a href="#payment" className="text-primary hover:text-cta transition-colors">6. Payment & Billing</a></li>
                <li><a href="#cancellation" className="text-primary hover:text-cta transition-colors">7. Cancellation & Refunds</a></li>
                <li><a href="#limitation" className="text-primary hover:text-cta transition-colors">8. Limitation of Liability</a></li>
                <li><a href="#termination" className="text-primary hover:text-cta transition-colors">9. Termination</a></li>
                <li><a href="#governing-law" className="text-primary hover:text-cta transition-colors">10. Governing Law</a></li>
                <li><a href="#contact" className="text-primary hover:text-cta transition-colors">11. Contact Information</a></li>
              </ul>
            </nav>

            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">1. Acceptance of Terms</h2>
              <div className="text-text-secondary space-y-3">
                <p>By accessing and using Taraj Global's website, services, and products, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.</p>
                <p>We reserve the right to modify these terms at any time. Your continued use of our services after any changes constitutes acceptance of the updated terms.</p>
              </div>
            </section>

            {/* 2. Description of Services */}
            <section id="services" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">2. Description of Services</h2>
              <div className="text-text-secondary space-y-3">
                <p>Taraj Global provides [describe your services here - e.g., digital marketing solutions, web development services, consulting, etc.]. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.</p>
                <p>We do not guarantee that our services will be uninterrupted, secure, or error-free. We may also impose limits on certain features or restrict access to parts or all of our services without notice.</p>
              </div>
            </section>

            {/* 3. User Accounts */}
            <section id="user-accounts" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">3. User Accounts</h2>
              <div className="text-text-secondary space-y-3">
                <p>To access certain features of our services, you may be required to create an account. You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                  <li>Providing accurate, current, and complete information</li>
                </ul>
                <p>You agree not to share your account credentials with any third party. You are solely responsible for any damage resulting from your failure to maintain account security.</p>
              </div>
            </section>

            {/* 4. User Conduct */}
            <section id="user-conduct" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">4. User Conduct</h2>
              <div className="text-text-secondary space-y-3">
                <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the services for any illegal purpose or to solicit others to perform unlawful acts</li>
                  <li>Violate any international, federal, provincial, or local regulations or laws</li>
                  <li>Infringe upon or violate our intellectual property rights or those of others</li>
                  <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>Submit false or misleading information</li>
                  <li>Upload viruses or malicious code that could damage our services or others' systems</li>
                  <li>Attempt to gain unauthorized access to our systems, networks, or data</li>
                  <li>Interfere with or disrupt our services or servers</li>
                  <li>Use our services to distribute spam or unsolicited communications</li>
                </ul>
              </div>
            </section>

            {/* 5. Intellectual Property */}
            <section id="intellectual-property" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">5. Intellectual Property</h2>
              <div className="text-text-secondary space-y-3">
                <p>All content, features, and functionality of the Taraj Global website, including but not limited to text, graphics, logos, designs, software, and code, are the exclusive property of Taraj Global and are protected by international copyright, trademark, and other intellectual property laws.</p>
                <p>You may not reproduce, distribute, modify, create derivative works, publicly display, or perform any content from our services without our prior written consent.</p>
                <p>Any feedback, suggestions, or ideas you provide to us regarding our services become our property and may be used without restriction or compensation.</p>
              </div>
            </section>

            {/* 6. Payment & Billing */}
            <section id="payment" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">6. Payment & Billing</h2>
              <div className="text-text-secondary space-y-3">
                <p>For paid services, you agree to provide accurate, current, and complete billing information. You agree to pay all charges incurred under your account at the prices in effect when incurred.</p>
                <p>We reserve the right to change our prices at any time. Any price changes will apply to new purchases only. We may offer free trials or promotional rates at our discretion.</p>
                <p>Payment is due upon receipt of invoice unless otherwise agreed in writing. Late payments may incur interest charges or service suspension.</p>
              </div>
            </section>

            {/* 7. Cancellation & Refunds */}
            <section id="cancellation" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">7. Cancellation & Refunds</h2>
              <div className="text-text-secondary space-y-3">
                <p>You may cancel your subscription or service at any time by following the cancellation procedure outlined in your account settings or by contacting our support team.</p>
                <p>Refunds will be processed according to our refund policy:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Services not yet rendered may be eligible for full refund</li>
                  <li>Partial refunds may be available for services in progress</li>
                  <li>Completed services are generally non-refundable</li>
                  <li>Refund requests must be made within 30 days of service delivery</li>
                </ul>
              </div>
            </section>

            {/* 8. Limitation of Liability */}
            <section id="limitation" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">8. Limitation of Liability</h2>
              <div className="text-text-secondary space-y-3">
                <p>To the maximum extent permitted by law, Taraj Global shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses.</p>
                <p>Our total liability to you for all claims shall not exceed the amount you paid to us in the twelve (12) months preceding the claim. Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so the above exclusions may not apply to you.</p>
              </div>
            </section>

            {/* 9. Termination */}
            <section id="termination" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">9. Termination</h2>
              <div className="text-text-secondary space-y-3">
                <p>We reserve the right to terminate or suspend your account and access to our services at any time, without prior notice, for any reason, including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Breach of these Terms & Conditions</li>
                  <li>Violation of applicable laws or regulations</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Extended period of account inactivity</li>
                </ul>
                <p>Upon termination, your right to use our services will immediately cease. All provisions of these Terms shall survive termination, including ownership provisions, warranty disclaimers, and limitations of liability.</p>
              </div>
            </section>

            {/* 10. Governing Law */}
            <section id="governing-law" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">10. Governing Law</h2>
              <div className="text-text-secondary space-y-3">
                <p>These Terms & Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
                <p>Any disputes arising from these terms or your use of our services shall be resolved exclusively in the courts of [Your Jurisdiction]. You agree to submit to the personal jurisdiction of these courts.</p>
              </div>
            </section>

            {/* 11. Contact Information */}
            <section id="contact" className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b-2 border-cta pb-2">11. Contact Information</h2>
              <div className="text-text-secondary space-y-3">
                <p>If you have any questions about these Terms & Conditions, please contact us:</p>
                <div className="bg-background border border-border p-4 rounded-lg space-y-2">
                  <p><strong className="text-text-primary">Email:</strong> info@tarajglobal.com</p>
                  <p><strong className="text-text-primary">Phone:</strong> +91 96655-99442</p>
                  <p><strong className="text-text-primary">Address:</strong> The Space Business Complex, Office No. 512–516, Grant Rd, Kharady, Pune, Maharashtra 411014</p>
                </div>
              </div>
            </section>

            {/* Agreement Statement */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
              <p className="text-text-primary font-medium">
                By using Taraj Global services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
    </>
  )
}

export default Terms
