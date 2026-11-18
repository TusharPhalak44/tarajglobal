import React, { useState, useEffect } from 'react'
import {
  Scale,
  Shield,
  FileText,
  Clock,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ExternalLink,
  BookOpen,
  Users,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Eye
} from 'lucide-react'
import Container from '@components/layout/Container'
import SEO from '@components/common/SEO'
import useSEOData from '@/hooks/useSEOData'
import { Link } from 'react-router-dom'

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service | Taraj Global",
  "url": "https://tarajglobal.com/terms",
  "description": "Comprehensive Terms of Service and legal agreements governing the use of Taraj Global's website, lead generation, and B2B marketing services.",
  "publisher": {
    "@type": "Organization",
    "name": "Taraj Global",
    "url": "https://tarajglobal.com",
    "logo": "https://tarajglobal.com/OnlyTG-%203.png"
  }
}

const TOC_SECTIONS = [
  { id: 'about-our-website', label: '1. About Our Website' },
  { id: 'eligibility', label: '2. Eligibility' },
  { id: 'acceptable-use', label: '3. Acceptable Use' },
  { id: 'intellectual-property', label: '4. Intellectual Property' },
  { id: 'third-party-content', label: '5. Third-Party Content' },
  { id: 'user-submitted-information', label: '6. User-Submitted Information' },
  { id: 'lead-generation-inquiries', label: '7. Lead Generation and Business Inquiries' },
  { id: 'downloadable-resources', label: '8. Downloadable Resources' },
  { id: 'webinars-events', label: '9. Webinars and Events' },
  { id: 'newsletters-marketing', label: '10. Newsletters and Marketing Communications' },
  { id: 'accuracy-of-information', label: '11. Accuracy of Information' },
  { id: 'no-professional-advice', label: '12. No Professional Advice' },
  { id: 'third-party-services-links', label: '13. Third-Party Services and Links' },
  { id: 'website-availability', label: '14. Website Availability' },
  { id: 'disclaimer-warranties', label: '15. Disclaimer of Warranties' },
  { id: 'limitation-of-liability', label: '16. Limitation of Liability' },
  { id: 'indemnification', label: '17. Indemnification' },
  { id: 'privacy', label: '18. Privacy' },
  { id: 'cookies', label: '19. Cookies' },
  { id: 'changes-to-terms', label: '20. Changes to These Terms' },
  { id: 'governing-law', label: '21. Governing Law' },
  { id: 'severability', label: '22. Severability' },
  { id: 'entire-agreement', label: '23. Entire Agreement' },
  { id: 'contact-us', label: '24. Contact Us' },
]

function Terms() {
  const [activeSection, setActiveSection] = useState('about-our-website')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180

      for (const section of TOC_SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(id)
      setMobileTocOpen(false)
    }
  }

  const { seoData } = useSEOData('page', 'terms', {
    title: "Terms of Service | Service Agreement | Taraj Global",
    description: "Read the complete Terms of Service governing the use of Taraj Global's website, B2B demand generation, lead qualification, and digital solutions.",
    keywords: "Taraj Global terms, terms and conditions, terms of service, B2B marketing service agreement, lead generation terms",
    canonical: "/terms",
    ogTitle: "Terms of Service | Taraj Global",
    ogDescription: "Read the comprehensive Terms of Service and legal agreement for Taraj Global.",
    schemaJson: termsSchema,
  })

  return (
    <>
      <SEO {...seoData} schemaJson={termsSchema} />

      <div className="min-h-screen bg-background pt-8 sm:pt-10 pb-20 select-text">
        <Container>
          {/* ══ Header / Hero Area ══════════════════════════════════════════ */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <div className="mb-4">
  <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
    Legal Service Agreement
  </span>
</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
              Terms of Service
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-text-secondary font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cta" />
                <strong>Effective Date:</strong> January 1, 2026
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span>
                <strong>Last Updated:</strong> October 2026
              </span>
            </div>
          </div>

          {/* ══ Main Content Grid (Sidebar TOC + Main Content) ════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ── Desktop Sticky Table of Contents (Span 4) ───────────────── */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-surface/90 backdrop-blur-md rounded-2xl border border-border p-5 sm:p-6 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border text-text-primary font-bold text-sm tracking-wide font-mono">
                <FileText className="w-4 h-4 text-primary" />
                <span>Table of Contents</span>
              </div>
              <nav aria-label="Terms of Service Table of Contents">
                <ul className="space-y-1 text-xs">
                  {TOC_SECTIONS.map((section) => {
                    const isActive = activeSection === section.id
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors duration-150 cursor-pointer ${isActive
                              ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary pl-2'
                              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                            }`}
                        >
                          {section.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="mt-6 pt-4 border-t border-border/80">
                <div className="p-3.5 rounded-xl bg-primary/25 dark:bg-primary/5 border border-primary/15 text-xs text-text-secondary">
                  <div className="font-semibold text-text-primary mb-1 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-primary" />
                    <span>Legal Inquiries</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2.5">
                    Questions regarding these terms or commercial service contracts?
                  </p>
                  <a
                    href="mailto:info@tarajglobal.com"
                    className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline text-xs"
                  >
                    <span>Contact Legal Team</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* ── Mobile Collapsible Table of Contents ────────────────────── */}
            <div className="block lg:hidden col-span-1 bg-surface border border-border rounded-xl p-4 shadow-sm">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-text-primary cursor-pointer"
                aria-expanded={mobileTocOpen}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Quick Navigation (24 Sections)</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileTocOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileTocOpen && (
                <ul className="mt-3 pt-3 border-t border-border space-y-1 text-xs max-h-72 overflow-y-auto">
                  {TOC_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left py-1.5 px-2 rounded transition-colors ${activeSection === section.id
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-text-secondary hover:text-primary hover:bg-surface-elevated'
                          }`}
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Main Terms Content Body (Span 8) ─────────────────────────── */}
            <div className="lg:col-span-8 space-y-6 text-text-secondary leading-relaxed text-sm sm:text-base">

              {/* 1. About Our Website */}
              <section
                id="about-our-website"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    1. About these Terms
                  </h2>
                </div>
                <p className="mb-4">
               <strong>Taraj Global Solutions Private Limited</strong> (“Taraj Global”, “we”, “us”) is a B2B demand generation and lead generation agency based in Pune, India. These Terms of Service (“Terms”) govern your access to and use of <strong>https://tarajglobal.com</strong> and its related pages (the “Website”), including its content, downloadable resources, webinars, forms and tools.

                </p>
                <p>
                 By accessing or using the Website, you agree to these Terms. If you do not agree, please do not use the Website. Where you submit a form, register for content or book a meeting, we may also ask you to confirm your agreement by ticking a box or clicking a button.

                </p><br />
                 <h2 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
                  What these Terms do not cover           
                  </h2>
                  <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-text-secondary leading-relaxed marker:text-primary">
          <li>
            <strong className="font-bold text-text-primary">Paid services:</strong>{" "}
            Our campaign and agency services are governed by a signed master services
            agreement (MSA) and statement of work (SOW). If these Terms conflict with an
            MSA or SOW, the MSA or SOW prevails for those services (see Section 6).
          </li>
        
          <li>
            <strong className="font-bold text-text-primary">Personal data and cookies:</strong>{" "}
            We handle personal data under our [Privacy Policy link] and use cookies as
            described in our{" "}
            <a href="/cookies" className="text-primary font-medium hover:underline">
              Cookie Policy
            </a>.
          </li>
        
          <li>
            <strong className="font-bold text-text-primary">Client pages and campaigns:</strong>{" "}
            If you register on a client’s page or receive a message we send on a
            client’s behalf, the client’s own terms and privacy notice may also apply.
          </li>
       </ul>
              </section>

              {/* 2. Eligibility */}
              <section
                id="eligibility"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    2.  Who may use the Website

                  </h2>
                </div>
                <p className="mb-4">
                  The Website is for business use by adults. By using it, you confirm that:

                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base marker:text-primary">
                  <li>You are at least 18 years old, or the age of majority where you live if that is higher.</li>
                  <li>You have the legal capacity to enter into these Terms.</li>
                  <li>If you use the Website for a company or other organisation, you have the authority to bind it, and “you” includes that organisation.</li>
                  <li>You are using the Website for business purposes and not as a consumer.
</li>
                </ul>
              </section>

              {/* 3. Acceptable Use */}
              <section
                id="acceptable-use"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    3. Acceptable Use
                  </h2>
                </div>
                <p className="mb-4">
                  You agree to use the Website lawfully and in line with these Terms. You must not:

                </p>
                <ul className="list-disc pl-5 space-y-2.5 text-sm sm:text-base marker:text-primary">
                  <li>Break any applicable law, including data protection, anti-spam and telemarketing laws.</li>
                  <li>Upload or transmit viruses, malware or any other harmful or destructive material.</li>
                  <li>Try to gain unauthorised access to the Website, our servers or connected systems, or probe, scan or test their security without our written permission.</li>
                  <li>Use bots, spiders, scrapers or data-mining tools to extract content or contact details from the Website, or use our content to build, enrich or sell a contact database or a competing product.</li>
                  <li>Submit false, misleading or spam enquiries, or use our contact details or forms to send unsolicited messages.</li>
                  <li>Submit personal data about another person unless you are entitled to share it.</li>
                  <li>Impersonate us, our staff, another user or any other person or organisation.</li>
                  <li>Interfere with, overload or impair anyone’s use of the Website.</li>
                  <li>Bypass access controls on gated content, or share your access links or credentials with others.</li>
                  <p className="mb-4">
                 We may investigate suspected breaches, remove content, and suspend or block access without notice.
                </p>
                </ul>
              </section>

              {/* 4. Intellectual Property */}
              <section
                id="intellectual-property"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    4. Intellectual Property
                  </h2>
                </div>
                <h2>Our content</h2><br />
                <p className="mb-4">
                 The Website and everything on it, including text, graphics, images, video, audio, software, code, logos, trademarks and design, is owned by Taraj Global, our licensors or other providers, and is protected by copyright, trademark, trade secret and other laws.

                </p>
                <p className="mb-4">
               We grant you a limited, revocable, non-exclusive, non-transferable licence to access and view the Website for your internal business evaluation of our services. You must not:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base marker:text-primary">
                  <li>Copy, modify, distribute, display, perform, publish, license, sell or create derivative works from anything on the Website without our prior written permission.</li>
                  <li>Remove or change any copyright, trademark or other ownership notice.</li>
                  <li>Use the “Taraj Global” name, logo or other marks without our written permission.</li>
                </ul><br />
                <h2>Infringement notices</h2><br />
                <p className= "mb4">
                  If you believe content on the Website infringes your intellectual property rights, email <strong>info@tarajglobal.com</strong> with: a description of your work; where the material appears on the Website; your contact details; a statement that you believe in good faith that the use is not authorised; and a statement that your notice is accurate and that you are the rights holder or authorised to act for them. We will review it and respond promptly.
                </p>
              </section>

              {/* 5. Third-Party Content */}
              <section
                id="third-party-content"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    5. Your submissions and feedback
                  </h2>
                </div>
              <ul className=" pl-5 space-y-3 text-sm sm:text-base text-text-secondary leading-relaxed marker:text-primary">
  <li>
    <strong className="font-bold text-text-primary">Forms and messages:</strong>{" "}
    We handle personal data you submit through forms, chat or email under our
    Privacy Policy. The licence below does not apply to that personal data.
  </li>

  <li>
    <strong className="font-bold text-text-primary">Feedback:</strong>{" "}
    Suggestions, ideas and comments about the Website or our services (“Feedback”)
    are not confidential or proprietary, unless we agree otherwise in writing.
    You keep ownership of your Feedback, and you grant us a worldwide, perpetual,
    irrevocable, royalty-free, non-exclusive licence to use, copy, modify,
    publish and otherwise exploit it for any purpose, without payment. We will
    not name you publicly as its source without your permission.
  </li>

  <li>
    <strong className="font-bold text-text-primary">What you submit:</strong>{" "}
    You confirm that the information you give us is accurate, current and
    complete, and that you are authorised to give it. Please do not submit
    sensitive data such as health information, government ID numbers or
    payment card details.
  </li>
</ul>
              </section>

              {/* 6. User-Submitted Information */}
              <section
                id="user-submitted-information"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    6. Enquiries, meetings and our services
                  </h2>
                </div>
               <ul className="pl-5 space-y-3 text-sm sm:text-base text-text-secondary leading-relaxed marker:text-primary">
                <li>
                  <strong className="font-bold text-text-primary">An enquiry is not a contract:</strong>{" "}
                  Submitting an enquiry, booking a strategy call or asking for a proposal does
                  not create a binding agreement, guarantee that we will accept the work, or
                  commit either party to buy or supply anything. A binding engagement exists
                  only when authorised representatives of both parties sign an MSA, SOW or
                  order form.
                </li>
              
                <li>
                  <strong className="font-bold text-text-primary">Proposals and estimates:</strong>{" "}
                  Pricing, volumes, timelines and projections we share before signing are
                  estimates. They are valid for the period stated and are subject to contract.
                </li>
              
                <li>
                  <strong className="font-bold text-text-primary">Campaign terms:</strong>{" "}
                  The meaning of each lead type (such as MQL, HQL, BANT or SQL), delivery
                  volumes, quality criteria, acceptance and replacement, compliance
                  responsibilities and data ownership are set in the MSA or SOW, not on the
                  Website.
                </li>
              
                <li>
                  <strong className="font-bold text-text-primary">Information you share with us:</strong>{" "}
                  We use commercially sensitive information you share in an enquiry only to
                  assess and respond to your request, and we protect it with the same care we
                  give our own. If you need stricter terms, ask us for a non-disclosure
                  agreement before you share it.
                </li>
              </ul>
              </section>

              {/* 7. Lead Generation and Business Inquiries */}
              <section
                id="lead-generation-inquiries"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    7. Results and Website content
                  </h2>
                </div>
               <p>
                <strong className="font-bold text-text-primary">No guarantee of results:</strong>{" "}
                Case studies, metrics, benchmarks, testimonials and performance figures on the
                Website show results achieved for particular clients in particular circumstances.
                They are examples, not promises. Results depend on factors such as the target
                market, offer, data, creative and the client’s follow-up. Any commitment must
                be in a signed MSA or SOW.
              </p>
              
              <p>
                <strong className="font-bold text-text-primary">Third-party content:</strong>{" "}
                The Website may include content, data, statistics, articles, case studies or
                opinions from third parties. Those statements are the responsibility of the
                people who made them and do not necessarily reflect our views. We do not
                warrant that third-party content is accurate, complete or useful.
              </p>
              
              <p>
                <strong className="font-bold text-text-primary">Accuracy:</strong>{" "}
                We work to keep the Website accurate and up to date, but it may contain errors,
                omissions or outdated information. We may correct or update it at any time
                without notice.
              </p>
              
              <p>
                <strong className="font-bold text-text-primary">No professional advice:</strong>{" "}
                Content on the Website is general information for business and marketing
                purposes. It is not legal, financial, tax, investment or compliance advice,
                including any information about GDPR, CCPA, CAN-SPAM, TCPA or similar laws.
                Please take advice from a qualified professional before you act on it.
              </p>
              </section>

              {/* 8. Downloadable Resources */}
              <section
                id="downloadable-resources"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    8. Downloadable Resources
                  </h2>
                </div>
                <p>
                   <strong className="font-bold text-text-primary">Licence:</strong>{" "}
                   We may offer whitepapers, e-books, research reports, templates, guides and
                   similar resources. We grant you a limited, revocable, non-exclusive,
                   non-transferable licence to download and use them for your own internal
                   business reference.
                 </p>
                 
                 <p>
                   <strong className="font-bold text-text-primary">Restrictions:</strong>{" "}
                   You must not resell, redistribute, sub-license, repackage or publicly
                   republish any resource, or remove its ownership notices, without our
                   written consent.
                 </p>
                 
                 <p>
                   <strong className="font-bold text-text-primary">Registration details:</strong>{" "}
                   A resource may require your business contact details. We use them under
                   our Privacy Policy. If a resource is sponsored or co-branded, we tell you
                   at registration that your details will be shared with the sponsor or
                   partner, and the sponsor’s privacy notice applies to its own use.
                 </p>
                 
                 <p>
                   <strong className="font-bold text-text-primary">Templates and tools:</strong>{" "}
                   Templates and tools are provided as they are. You are responsible for
                   checking that they suit your legal and business requirements.
                 </p>
              </section>

              {/* 9. Webinars and Events */}
              <section
                id="webinars-events"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    9. Webinars and Events
                  </h2>
                </div>
                <p>
                    <strong className="font-bold text-text-primary">Registration:</strong>{" "}
                    We may host or co-host webinars, virtual summits and industry events.
                    Registration is subject to availability and our acceptance. If an event
                    is paid, the refund terms are shown at registration.
                  </p>
                  
                  <p>
                    <strong className="font-bold text-text-primary">Changes:</strong>{" "}
                    We may change schedules, cancel events, replace speakers or cancel a
                    registration. If we cancel an event, we will offer a new date or a place
                    at a comparable session where we can.
                  </p>
                  
                  <p>
                    <strong className="font-bold text-text-primary">Recordings and materials:</strong>{" "}
                    Event recordings and presentation materials belong to Taraj Global or
                    the co-host. We may record events, and we tell you at the start if we do.
                    Recordings may include your name, voice, image, questions and chat
                    messages, and we may use them to promote our services and offer on-demand
                    access. You must not record or redistribute an event without our permission.
                  </p>
                  
                  <p>
                    <strong className="font-bold text-text-primary">Co-hosts and sponsors:</strong>{" "}
                    We may share registration details with co-hosts or sponsors as disclosed
                    at registration and in our Privacy Policy.
                  </p>
              </section>

              {/* 10. Newsletters and Marketing Communications */}
              <section
                id="newsletters-marketing"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    10.  Marketing communications
                  </h2>
                </div>
                <p>
                    <strong className="font-bold text-text-primary">Newsletters and updates:</strong>{" "}
                    If you subscribe to our newsletter or give us your business email address
                    for marketing, we may send you emails about our services, industry insights
                    and events. Where the law requires consent, such as under the GDPR, UK PECR
                    or Canada’s CASL, we rely on the consent you give. Where the law allows us
                    to contact business professionals about relevant offers without prior
                    consent, we may do so. Every marketing message identifies us and includes
                    an unsubscribe option.
                  </p>
                  
                  <p>
                    <strong className="font-bold text-text-primary">Opting out:</strong>{" "}
                    You can opt out at any time by clicking “Unsubscribe” in any email or by
                    writing to{" "}
                    <a
                      href="mailto:privacy@tarajglobal.com"
                      className="text-primary font-medium hover:underline"
                    >
                      info@tarajglobal.com
                    </a>
                    . We act on opt-outs promptly and keep a suppression record so we do not
                    contact you again. We may still send service messages about your enquiry
                    or contract.
                  </p>
              </section>

              {/* 11. Accuracy of Information */}
              <section
                id="accuracy-of-information"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    11.  Third-party services and links

                  </h2>
                </div>
                <p>
                 The Website may link to or use third-party websites, platforms and services, such as meeting schedulers, webinar platforms, analytics tools and client pages. We do not own or control them and are not responsible for their content, terms, privacy practices or availability. A link is not an endorsement or an affiliation. Your use of any third-party service is at your own risk and is subject to that service’s terms.
                </p>
              </section>

              {/* 12. No Professional Advice */}
              <section
                id="no-professional-advice"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-cta/30 dark:bg-cta/10 flex items-center justify-center shrink-0 text-cta">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    12. Availability of the Website
                  </h2>
                </div>
                <p>
                  We aim to keep the Website available, but we do not guarantee that it will be uninterrupted, secure or error-free. We may suspend, change, restrict or withdraw all or part of the Website at any time for business, technical, security or operational reasons, with or without notice. We may also suspend or end your access if you breach these Terms or we reasonably suspect misuse.

                </p>
              </section>

              {/* 13. Third-Party Services and Links */}
              <section
                id="third-party-services-links"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    13.  Disclaimer of warranties

                  </h2>
                </div>
                <p className="mb-4">
                  The Website and all content, resources and services on it are provided “as is” and “as available”, without warranties of any kind, express or implied. To the fullest extent the law allows, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, title, non-infringement and accuracy, and any warranty that the Website is free of viruses or malware.
                </p>
                <p>
                   This section applies to the Website only. The only warranties for paid services are those in the signed MSA or SOW.
              
                </p>
              </section>

              {/* 14. Website Availability */}
              <section
                id="website-availability"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    14.  Limitation of liability

                  </h2>
                </div>
                <p className="mb-4">
                  To the maximum extent the law allows, Taraj Global, its affiliates, directors, officers, employees, agents, suppliers and licensors are not liable for any indirect, incidental, special, exemplary or consequential loss. This includes loss of profits, revenue, data, goodwill or business, and applies even if we were told the loss was possible. It covers loss arising from your use of, or inability to use, the Website.
                </p>
                <p className="mb-4">Our total liability for all claims relating to these Terms or the Website is limited to one hundred United States dollars (US$100) or the equivalent in your local currency.</p>
                <p className="mb-4">Nothing in these Terms limits or excludes liability that cannot be limited or excluded by law, including liability for fraud or fraudulent misrepresentation, death or personal injury caused by negligence, or wilful misconduct.</p>
                <p className="mb-4">Liability for paid services is governed by the MSA or SOW and not by this section.</p>
              </section>

              {/* 15. Disclaimer of Warranties */}
              <section
                id="disclaimer-warranties"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-cta/30 dark:bg-cta/10 flex items-center justify-center shrink-0 text-cta">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    15.Indemnification
                  </h2>
                </div>
                
                <p>
                You agree to defend, indemnify and hold harmless Taraj Global, its affiliates, licensors and service providers, and their officers, directors, employees, contractors, agents and successors, from any third-party claim, and any resulting loss, liability, damages, costs and expenses (including reasonable legal fees), arising from:
                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                   <li>
                     Your breach of these Terms.
                   </li>
                   <li>
                     Your misuse of the Website.
                   </li>
                   <li>
                     Content or personal data you submitted without the right to do so.
                   </li>
                   <li>
                     Your infringement of a third party’s intellectual property or other rights.
                   </li>
                 </ul>
                </p>
                <p>We will tell you promptly about any claim and give you reasonable help at your cost. You may not settle a claim in a way that admits fault for us or imposes obligations on us without our written consent.</p>
              </section>

              {/* 16. Limitation of Liability */}
              <section
                id="limitation-of-liability"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    16. Privacy and cookies
                  </h2>
                </div>
                <p className="mb-4">
                      Our{" "}
                      <a
                        href="https://tarajglobal.com/privacy"
                        className="text-primary font-medium hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>{" "}
                      explains how we collect, use, share and protect personal data, including
                      the data of business contacts, and how you can use your rights to access,
                      correct, delete or opt out. Our{" "}
                      <a
                        href="/cookies"
                        className="text-primary font-medium hover:underline"
                      >
                        Cookie Policy
                      </a>{" "}
                      explains how we use cookies and tracking technologies and how you can
                      manage your choices. Please read both alongside these Terms.
                    </p>
                  <p>If you give us personal data about other people, for example a contact list for a campaign, you must have the right to do so, and the MSA or SOW and any data processing terms with us apply.</p>
                
              </section>

              {/* 17. Indemnification */}
              <section
                id="indemnification"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    17. Changes to these Terms

                  </h2>
                </div>
                <p className="mb-4">
                 We may update these Terms from time to time. We will post the new version on this page with a new “Last updated” date. For material changes, we will also give notice before they take effect where practical, such as by a banner on the Website or an email to registered users. If you keep using the Website after the changes take effect, you accept them. If you do not agree, please stop using the Website. Earlier versions are available on request.

                </p>
                <p>Changes to these Terms do not change any signed MSA or SOW. Those can be changed only as they provide.
</p>
              </section>

              {/* 18. Privacy */}
              <section
                id="privacy"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    18. Governing law and disputes
                  </h2>
                </div>
                <ul className=" pl-6 space-y-3 marker:text-primary">
                   <li >
                     <strong className="font-bold text-text-primary">Governing law:</strong>{" "}
                     These Terms, and any dispute arising from them or the Website, are
                     governed by the laws of India, without regard to conflict-of-law rules.
                   </li>
                 
                   <li>
                     <strong className="font-bold text-text-primary">Talk first:</strong>{" "}
                     Before starting formal proceedings, a party will send the other a
                     written notice describing the dispute, and both will try in good faith
                     to settle it within 30 days.
                   </li>
                 
                   <li>
                     <strong className="font-bold text-text-primary">Courts:</strong>{" "}
                     Subject to that step, the courts at Pune, Maharashtra, India have
                     exclusive jurisdiction, and each party submits to them. Either party
                     may seek urgent interim relief from any competent court to protect
                     its intellectual property or confidential information.
                   </li>

  <li>
    <strong className="font-bold text-text-primary">Paid services:</strong>{" "}
    For paid services, the dispute terms in the MSA or SOW apply.
  </li>
</ul>
              </section>

              {/* 19. Cookies */}
              <section
                id="cookies"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    19. General terms
                  </h2>
                </div>
                <ul className=" pl-6 space-y-3 marker:text-primary">
                  <li>
                    <strong className="font-bold text-text-primary">Entire agreement:</strong>{" "}
                    These Terms, with our Privacy Policy and Cookie Policy, are the entire
                    agreement between you and us about the Website. They replace earlier
                    understandings about the Website and do not affect any signed MSA or SOW.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">Order of precedence:</strong>{" "}
                    For paid services, the MSA or SOW prevails over these Terms.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">Severability:</strong>{" "}
                    If a court or tribunal finds a provision invalid or unenforceable, it is
                    limited or removed to the minimum extent needed, and the rest of the
                    Terms stay in force.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">No waiver:</strong>{" "}
                    A failure or delay in enforcing a right is not a waiver. A waiver must
                    be in writing.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">Assignment:</strong>{" "}
                    You may not assign these Terms without our written consent. We may
                    assign them to an affiliate or to a successor to our business.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">No third-party rights or partnership:</strong>{" "}
                    These Terms give no rights to anyone else, and they do not create a
                    partnership, agency or employment relationship.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">Events beyond our control:</strong>{" "}
                    We are not liable for a delay or failure caused by events beyond our
                    reasonable control.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">Notices:</strong>{" "}
                    We may give you notice by posting it on the Website or emailing the
                    address you gave us. You may give us notice at the contact details in
                    Section 20. Electronic communications satisfy any requirement for writing.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">Survival:</strong>{" "}
                    Sections that by their nature should continue after your use ends,
                    including those on intellectual property, Feedback, disclaimers,
                    liability, indemnification and governing law, continue.
                  </li>
                
                  <li >
                    <strong className="font-bold text-text-primary">Language:</strong>{" "}
                    These Terms are in English. If they are translated, the English
                    version prevails.
                  </li>
                </ul>
              </section>

             

              {/* 20. Contact Us */}
              <section
                id="contact-us"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    20. Contact Us
                  </h2>
                </div>
                <p className="mb-6">
                  For questions about these Terms or to send a legal notice, contact us:
                </p>

                {/* Contact Details Table */}
                <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-1/3 sm:w-1/4 border-r border-border">
                          Item
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs">
                          Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border">
                          Company
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary leading-relaxed">
                          Taraj Global Solutions Private Limited, CIN [CIN]; registered office [address]
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border">
                          Operating address
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary leading-relaxed">
                          The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014, India
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border">
                          General enquiries
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary leading-relaxed">
                          <a href="mailto:info@tarajglobal.com" className="text-primary hover:underline font-medium">info@tarajglobal.com</a>
                          {" · "}
                          <a href="tel:+919665599442" className="text-primary hover:underline font-medium">+91-96655-99442</a>
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border">
                          Legal notices
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary leading-relaxed">
                          <a href="mailto:info@tarajglobal.com" className="text-primary hover:underline font-medium">info@tarajglobal.com</a>
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border">
                          Privacy and data requests
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary leading-relaxed">
                          <a href="mailto:info@tarajglobal.com" className="text-primary hover:underline font-medium">info@tarajglobal.com</a>
                          {"; see our "}
                          <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
                          {" for our Grievance Officer"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </div>
                <p>
                  Our data practices are described in our{" "}
                  <a
                    href="https://tarajglobal.com/privacy"
                    className="text-primary font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>.
                </p>
              </section>

            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Terms
