import React, { useState } from 'react'
import SEO from '@components/common/SEO'
import ContactHero from '@components/sections/Contact/ContactHero'
import GetInTouch from '@components/sections/Contact/GetInTouch'
import ContactForm from '@components/sections/Contact/ContactForm'
import OfficeLocation from '@components/sections/Contact/OfficeLocation'
import MeetingBooking from '@components/sections/Contact/MeetingBooking'
import ChatBot from '@components/chatbot/ChatBot'

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
        title="Contact Us | Book a Discovery Call | Taraj Global"
        description="Ready to scale your B2B sales pipeline? Contact Taraj Global today to discuss your lead generation, ABM, and demand generation requirements. Schedule a strategy meeting."
        keywords="contact Taraj Global, B2B lead generation consultation, demand generation agency contact, Pune B2B marketing agency, book B2B sales meeting"
        canonical="/contact"
        ogTitle="Contact Taraj Global | Let's Build Your Revenue Engine"
        ogDescription="Connect with our B2B growth strategists to discuss qualified lead generation and pipeline acceleration."
        schemaJson={contactSchema}
      />
      <div className="min-h-screen bg-background">
        <ContactHero onBookMeeting={() => setShowBooking(true)} />
        <GetInTouch onBookMeeting={() => setShowBooking(true)} />
        <ContactForm />
        <OfficeLocation />
        <MeetingBooking isOpen={showBooking} onClose={() => setShowBooking(false)} />
        <ChatBot />
      </div>
    </>
  )
}

export default Contact
