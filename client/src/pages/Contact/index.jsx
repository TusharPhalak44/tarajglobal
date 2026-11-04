import React, { useState } from 'react'
import SEO from '@components/common/SEO'
import ContactHero from '@components/sections/Contact/ContactHero'
import GetInTouch from '@components/sections/Contact/GetInTouch'
import ContactForm from '@components/sections/Contact/ContactForm'
import OfficeLocation from '@components/sections/Contact/OfficeLocation'
import MeetingBooking from '@components/sections/Contact/MeetingBooking'

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://tarajglobal.com/contact#webpage",
      "url": "https://tarajglobal.com/contact",
      "name": "Contact Taraj Global | B2B Growth Strategy Consultation",
      "description": "Get in touch with Taraj Global for B2B demand generation, lead qualification, and pipeline acceleration consultations."
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://tarajglobal.com/#organization",
      "name": "Taraj Global Solutions Pvt Ltd",
      "url": "https://tarajglobal.com",
      "logo": "https://tarajglobal.com/OnlyTG-%203.png",
      "telephone": "+91-96655-99442",
      "email": "info@tarajglobal.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411014",
        "addressCountry": "IN"
      }
    }
  ]
}

function Contact() {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <>
      <SEO
        title="Contact TaRaj Global | Book a B2B Strategy Call"
        description="Talk to TaRaj Global about B2B appointment setting, lead generation, content syndication, and ABM. Book a strategy call or send us a message."
        keywords="contact Taraj Global, B2B lead generation consultation, demand generation agency contact, Pune B2B marketing agency, book B2B sales meeting"
        canonical="/contact"
        ogTitle="Contact TaRaj Global | Book a B2B Strategy Call"
        ogDescription="Talk to TaRaj Global about B2B appointment setting, lead generation, content syndication, and ABM. Book a strategy call or send us a message."
        schemaJson={contactSchema}
      />
      <div className="min-h-screen bg-background">
        <ContactHero onBookMeeting={() => setShowBooking(true)} />
        <GetInTouch onBookMeeting={() => setShowBooking(true)} />
        <ContactForm />
        <OfficeLocation />
        <MeetingBooking isOpen={showBooking} onClose={() => setShowBooking(false)} />
      </div>
    </>
  )
}

export default Contact
