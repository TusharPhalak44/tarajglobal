import React, { useEffect, useState } from 'react'
import { cmsAPI } from '@api/cms.api'

const FALLBACK_LOGOS = [
  { id: 'mitel', client_name: 'Mitel', logo_path: '/mitel.png' },
  { id: 'vonage', client_name: 'Vonage', logo_path: '/Vonage.png' },
  { id: 'ringcentral', client_name: 'RingCentral', logo_path: '/ringcentral.png' },
  { id: 'avaya', client_name: 'AVAYA', logo_path: '/Avaya.webp' },
  { id: 'microsoft', client_name: 'Microsoft', logo_path: '/micro.png' },
  { id: 'oracle', client_name: 'Oracle', logo_path: '/ora.png' },
]

const FALLBACK_SETTINGS = {
  title_white: 'Trusted by',
  title_gradient: 'leading B2B brands',
  is_visible: true,
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''
const resolveImg = (path) => {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('//')) return path
  if (path.startsWith('/uploads/')) return `${BASE_URL}${path}`
  return path
}

export const OurClients = () => {
  const [logos, setLogos] = useState(FALLBACK_LOGOS)
  const [settings, setSettings] = useState(FALLBACK_SETTINGS)

  useEffect(() => {
    const load = async () => {
      try {
        const [clientsRes, settingsRes] = await Promise.all([
          cmsAPI.getClients(),
          cmsAPI.getClientSectionSettings(),
        ])
        const rawClients = clientsRes.data?.data || clientsRes.data || []
        if (Array.isArray(rawClients) && rawClients.length > 0) setLogos(rawClients)
        if (settingsRes.data?.data) setSettings(settingsRes.data.data)
      } catch (err) {
        console.warn('OurClients: CMS fetch failed, using defaults', err)
      }
    }
    load()
  }, [])

  if (!settings.is_visible) return null

  // Two identical halves so the -50% loop has no seam, repeated so a short list still fills the bar.
  const loop = [...logos, ...logos, ...logos, ...logos]

  return (
    <section aria-label="Our clients" className="overflow-hidden border-y border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 py-7 sm:py-8 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 px-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-secondary sm:px-8 lg:pl-12 lg:pr-0">
          {[settings.title_white, settings.title_gradient].filter(Boolean).join(' ')}
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent" />
          <ul className="animate-marquee items-center gap-14 sm:gap-20">
            {loop.map((logo, index) => (
              <li key={`${logo.id}-${index}`} aria-hidden={index >= logos.length} className="shrink-0">
                <img
                  src={resolveImg(logo.logo_path || logo.src)}
                  alt={index < logos.length ? (logo.client_name || logo.alt || logo.name || '') : ''}
                  className="h-8 w-auto max-w-[140px] object-contain sm:h-10"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default OurClients
