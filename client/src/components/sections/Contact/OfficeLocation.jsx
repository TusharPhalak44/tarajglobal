import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock, ExternalLink, Globe, Building2, Compass } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import './Contact.css'

const OfficeLocation = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeOffice, setActiveOffice] = useState('pune')

  const offices = {
    pune: {
      id: 'pune',
      tag: 'HQ',
      title: 'The Space Business Complex',
      subtitle: 'India Headquarters',
      city: 'Pune, Maharashtra',
      country: 'India',
      address: 'The Space Business Complex, Office No 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014',
      phone: '+91 96655-99442',
      phoneRaw: '+919665599442',
      email: 'sales@tarajglobal.com',
      hours: 'Mon – Fri: 5:00 PM – 2:00 AM IST',
      color: '#00A6FF',
      icon: Building2,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.955632654321!2d73.9234!3d18.5567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c9f9f9f9f9f9%3A0x1234567890abcdef!2sThe%20Space%20Business%20Complex%2C%20Grant%20Rd%2C%20Kharadi%2C%20Pune%2C%20Maharashtra%20411014!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=The+Space+Business+Complex,+Office+No+512+to+517,+Grant+Rd,+Kharadi,+Pune,+Maharashtra+411014',
    },
    us: {
      id: 'us',
      tag: 'US BRANCH',
      title: 'San Francisco Innovation Hub',
      subtitle: 'United States Office',
      city: 'San Francisco, California',
      country: 'United States',
      address: '762, Fulton St, San Francisco, California 94115',
      phone: '+1 346-487-8307',
      phoneRaw: '+13464878307',
      email: 'sales@tarajglobal.com',
      hours: 'Mon – Fri: 9:00 AM – 6:00 PM EST',
      color: '#A855F7',
      icon: Globe,
      mapUrl: 'https://maps.google.com/maps?q=762+Fulton+St,+San+Francisco,+California+94115&t=&z=15&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=762,+Fulton+St,+San+Francisco,+California+94115',
    },
  }

  const current = offices[activeOffice]

  return (
    <section className="office-location-section relative overflow-hidden py-20 sm:py-24">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-hero" />

      {/* Animated gradient glows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 25% 35%, rgba(0, 166, 255, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.10) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 109, 0, 0.06) 0%, transparent 60%)
          `
        }}
      />

      {/* Decorative blur circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00A6FF 1px, transparent 1px), linear-gradient(90deg, #00A6FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Our Global Offices
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.24] text-text-primary dark:text-white whitespace-normal lg:whitespace-nowrap mb-4">
            <span className="inline-block mr-3">
              Visit Us in Pune or
            </span>
            <span className="inline-block bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent pb-1 sm:pb-1.5">
              Reach Us Online
            </span>
          </h2>

          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Meet our team at our Pune headquarters, or connect with our North America and global representatives from anywhere.
          </p>

          {/* Quick interactive switcher tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl flex items-center gap-1 shadow-lg">
              <button
                type="button"
                onClick={() => setActiveOffice('pune')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  activeOffice === 'pune'
                    ? 'bg-[#00A6FF] text-white shadow-[0_0_20px_rgba(0,166,255,0.4)]'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 size={15} />
                <span>Pune (HQ)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveOffice('us')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  activeOffice === 'us'
                    ? 'bg-[#A855F7] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <Globe size={15} />
                <span>San Francisco (US)</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2-Column Main Section: Interactive Map on Left, Sleek Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Display Column (Left) */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <div
              className="relative w-full h-[440px] sm:h-[480px] lg:h-full min-h-[440px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.5)] bg-[#101018] flex flex-col"
            >
              {/* Floating Top Badge: Active City & Status */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center gap-2.5 shadow-xl">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: current.color }}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-semibold">
                    {current.tag}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {current.city}
                  </span>
                </div>
              </div>

              {/* Floating Directions Button */}
              <a
                href={current.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-10 px-3.5 py-2 rounded-2xl bg-black/75 hover:bg-black backdrop-blur-md border border-white/15 flex items-center gap-2 shadow-xl transition-all hover:scale-105 group text-white text-xs font-medium"
              >
                <Navigation size={13} style={{ color: current.color }} />
                <span className="hidden sm:inline">Directions</span>
                <ExternalLink size={12} className="text-text-tertiary group-hover:text-white transition-colors" />
              </a>

              {/* Google Map Embed */}
              <iframe
                key={activeOffice}
                src={current.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${current.title} Location Map`}
                className="w-full flex-1 transition-[filter] duration-500 dark:[filter:invert(90%)_hue-rotate(180deg)_contrast(90%)_brightness(95%)]"
              />

              {/* Bottom strip on map showing address at a glance */}
              <div className="p-3.5 px-4 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-2 truncate">
                  <MapPin size={14} style={{ color: current.color }} className="flex-shrink-0" />
                  <span className="truncate">{current.address}</span>
                </div>
                <span className="text-[11px] font-semibold text-text-tertiary whitespace-nowrap ml-2">
                  Interactive Map
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cards Column (Right) */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-5 justify-between"
          >
            {/* Office 1: Pune HQ Card */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setActiveOffice('pune')}
              className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col gap-4 border ${
                activeOffice === 'pune'
                  ? 'border-[#00A6FF]/60 shadow-[0_0_30px_rgba(0,166,255,0.18)] bg-white/[0.04]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]'
              }`}
              style={{
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Card Header: Icon, Name, Tag */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(0,166,255,0.12)',
                      border: '1px solid rgba(0,166,255,0.3)',
                    }}
                  >
                    <Building2 size={20} className="text-[#00A6FF]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                      The Space Business Complex
                    </h3>
                    <p className="text-xs text-text-tertiary">India Headquarters · Pune</p>
                  </div>
                </div>

                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border"
                  style={{
                    background: 'rgba(0,166,255,0.12)',
                    color: '#00A6FF',
                    borderColor: 'rgba(0,166,255,0.3)',
                  }}
                >
                  HQ
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <MapPin size={15} className="flex-shrink-0 mt-0.5 text-[#72D669]" />
                <span>Office No 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014</span>
              </div>

              {/* Footer: Working Hours & Directions Link */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-text-tertiary">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-text-tertiary" />
                  <span>Mon–Fri · 5:00 PM – 2:00 AM IST</span>
                </div>

                <a
                  href={offices.pune.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A6FF] hover:underline"
                >
                  <Navigation size={12} />
                  <span>Get Directions</span>
                </a>
              </div>
            </motion.div>

            {/* Office 2: US Office Card */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setActiveOffice('us')}
              className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col gap-4 border ${
                activeOffice === 'us'
                  ? 'border-[#A855F7]/60 shadow-[0_0_30px_rgba(168,85,247,0.18)] bg-white/[0.04]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]'
              }`}
              style={{
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Card Header: Icon, Name, Tag */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(168,85,247,0.12)',
                      border: '1px solid rgba(168,85,247,0.3)',
                    }}
                  >
                    <Globe size={20} className="text-[#A855F7]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                      San Francisco Hub
                    </h3>
                    <p className="text-xs text-text-tertiary">United States Office · California</p>
                  </div>
                </div>

                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border"
                  style={{
                    background: 'rgba(168,85,247,0.12)',
                    color: '#A855F7',
                    borderColor: 'rgba(168,85,247,0.3)',
                  }}
                >
                  US BRANCH
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <MapPin size={15} className="flex-shrink-0 mt-0.5 text-[#A855F7]" />
                <span>762, Fulton St, San Francisco, California 94115</span>
              </div>

              {/* Footer: Working Hours & Directions Link */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-text-tertiary">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-text-tertiary" />
                  <span>Mon–Fri · 9:00 AM – 6:00 PM EST</span>
                </div>

                <a
                  href={offices.us.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#A855F7] hover:underline"
                >
                  <Navigation size={12} />
                  <span>Get Directions</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OfficeLocation
