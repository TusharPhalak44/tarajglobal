import React, { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { cmsAPI } from '@api/cms.api'
import { LogoMarquee } from '@components/animations/LogoMarquee'

const FALLBACK_LOGOS = [
  { id: 'avaya', client_name: 'AVAYA', logo_path: '/Avaya.webp', category: 'Unified Communications', metric: '+42% Sales Pipeline' },
  { id: 'mitel', client_name: 'Mitel', logo_path: '/mitel.png', category: 'Enterprise Telecom', metric: '3.8x C-Suite Reach' },
  { id: 'ringcentral', client_name: 'RingCentral', logo_path: '/ringcentral.png', category: 'Cloud Communications', metric: '99.8% Data Accuracy' },
  { id: 'vonage', client_name: 'Vonage', logo_path: '/Vonage.png', category: 'Communications APIs', metric: '+48% Meeting Conversion' },
  { id: 'microsoft', client_name: 'Microsoft Partner', logo_path: '/micro.png', category: 'Cloud & Enterprise', metric: '14-Day Cadence Ramp' },
  { id: 'oracle', client_name: 'Oracle Partner', logo_path: '/ora.png', category: 'Database & Systems', metric: 'Full Committee ABM' },
]

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''
const resolveImg = (path) => {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('//')) return path
  if (path.startsWith('/uploads/')) return `${BASE_URL}${path}`
  return path
}

export const OurClients = () => {
  const [logos, setLogos] = useState(FALLBACK_LOGOS)
  const [isVisible, setIsVisible] = useState(true)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    const load = async () => {
      try {
        const [clientsRes, settingsRes] = await Promise.all([
          cmsAPI.getClients(),
          cmsAPI.getClientSectionSettings(),
        ])
        const rawClients = clientsRes.data?.data || clientsRes.data || []
        if (Array.isArray(rawClients) && rawClients.length > 0) setLogos(rawClients)
        if (settingsRes.data?.data) {
          setSettings(settingsRes.data.data)
          if (settingsRes.data.data.is_visible !== undefined) {
            setIsVisible(settingsRes.data.data.is_visible)
          }
        }
      } catch (err) {
        // Fallback to static verified logos
      }
    }
    load()
  }, [])

  if (!isVisible) return null

  return (
    <section
      id="trust"
      aria-label="Enterprise Client Trust Strip"
      className="relative bg-[#070B14] py-12 sm:py-14 border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* ── Ambient Radial Lighting ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[260px] rounded-full bg-[#00A6FF]/[0.06] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
        
        {/* ── Section Header (Clean Pre-header matching Hero) ───────────── */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center justify-center mb-1">
            <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              {settings.eyebrow || 'TRUSTED BY ENTERPRISE TEAMS'}
            </p>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-white leading-tight">
            {settings.title_white || 'Trusted by Global Leaders,'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
              {settings.title_gradient || 'Proven Across B2B Markets'}
            </span>
          </h2>
        </div>

        {/* ── One Single Client Scroller Only ─────────────────────────────── */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03] p-3 sm:p-4 backdrop-blur-md shadow-xl overflow-hidden">
          <LogoMarquee
            items={logos}
            speed={28}
            direction="left"
            pauseOnHover={true}
            renderItem={(logo) => (
              <div className="group relative flex items-center justify-center min-w-[165px] sm:min-w-[200px] h-[76px] sm:h-[86px] px-6 py-2.5 rounded-xl border border-white/60 bg-white/95 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(0,166,255,0.3)] hover:border-[#00A6FF] transition-all duration-300 cursor-pointer">
                <img
                  src={resolveImg(logo.logo_path || logo.src)}
                  alt={logo.client_name || 'Enterprise Client'}
                  className="h-8 sm:h-9 w-auto max-w-[130px] sm:max-w-[150px] object-contain select-none transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {logo.metric && (
                  <span className="absolute -bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono font-bold bg-[#070B14] text-[#38BDF8] border border-[#00A6FF]/40 px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap z-10">
                    {logo.metric}
                  </span>
                )}
              </div>
            )}
          />
        </div>

      </div>
    </section>
  )
}

export default OurClients
