import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import {
  Users,
  Building2,
  Globe,
  Award,
  Radio,
  CheckCircle2,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  fetchAudienceStats,
  getInitialAudienceData,
  formatAudienceCount,
  formatFullNumber,
} from '../../../services/audienceApi'
import AudienceMap from './AudienceMap'

export const AudienceIntelligence = () => {
  // Instant baseline state (zero layout shift)
  const [audienceData, setAudienceData] = useState(() => getInitialAudienceData())
  const [activeRegion, setActiveRegion] = useState('GLOBAL')
  const [isLive, setIsLive] = useState(false)
  const [syncSource, setSyncSource] = useState('initializing')

  // Real-time synchronization on mount
  useEffect(() => {
    let isMounted = true

    const syncTelemetry = async () => {
      try {
        const result = await fetchAudienceStats()
        if (isMounted && result?.data) {
          setAudienceData(result.data)
          setIsLive(result.isLive)
          setSyncSource(result.source)
        }
      } catch (err) {
        console.warn('[AudienceIntelligence] Telemetry sync error:', err)
      }
    }

    syncTelemetry()

    // Periodically re-sync telemetry every 5 minutes in background
    const interval = setInterval(syncTelemetry, 5 * 60 * 1000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // Calculate dynamic counts
  const totalContacts = audienceData?.matching_contacts || 80207024
  const totalCompanies = audienceData?.matching_companies || 25077972
  const totalMillions = parseFloat((totalContacts / 1_000_000).toFixed(1))
  const totalCompaniesMillions = parseFloat((totalCompanies / 1_000_000).toFixed(1))

  // Regional counts lookup
  const regionCounts = {
    GLOBAL: formatAudienceCount(totalContacts),
    NORTH_AMERICA: formatAudienceCount(
      audienceData?.region_breakdown?.find((r) => r.region_code === 'NORTH_AMERICA')
        ?.contact_count || 26499872
    ),
    LATAM: formatAudienceCount(
      audienceData?.region_breakdown?.find((r) => r.region_code === 'LATAM')
        ?.contact_count || 8501108
    ),
    EMEA: formatAudienceCount(
      audienceData?.region_breakdown?.find((r) => r.region_code === 'EMEA')
        ?.contact_count || 25303686
    ),
    APAC: formatAudienceCount(
      audienceData?.region_breakdown?.find((r) => r.region_code === 'APAC')
        ?.contact_count || 19902358
    ),
  }

  // Filter pills
  const filterPills = [
    { key: 'GLOBAL', label: '🌍 Global', count: regionCounts.GLOBAL },
    { key: 'NORTH_AMERICA', label: 'NA', count: regionCounts.NORTH_AMERICA },
    { key: 'LATAM', label: 'LATAM', count: regionCounts.LATAM },
    { key: 'EMEA', label: 'EMEA', count: regionCounts.EMEA },
    { key: 'APAC', label: 'APAC', count: regionCounts.APAC },
  ]

  // 4 Live Metric Cards
  const metricCards = [
    {
      id: 'metric-contacts',
      title: 'Verified Business Professionals',
      endNumber: totalMillions,
      decimals: 1,
      suffix: 'M+',
      subtitle: 'Direct-dial phone & verified email reach',
      icon: Users,
      gradient: 'from-[#00A6FF] to-[#38BDF8]',
      iconColor: 'text-[#00A6FF]',
    },
    {
      id: 'metric-companies',
      title: 'Enterprise Target Accounts',
      endNumber: totalCompaniesMillions,
      decimals: 1,
      suffix: 'M+',
      subtitle: 'Active buying committees across 11 key verticals',
      icon: Building2,
      gradient: 'from-[#38BDF8] to-[#00A6FF]',
      iconColor: 'text-[#38BDF8]',
    },
    {
      id: 'metric-countries',
      title: 'Countries & Territories',
      endNumber: 195,
      decimals: 0,
      suffix: '+',
      subtitle: '37 high-density priority markets mapped',
      icon: Globe,
      gradient: 'from-[#FF6D00] to-[#FFA600]',
      iconColor: 'text-[#FF6D00]',
    },
    {
      id: 'metric-authority',
      title: 'CXO & VP Authority',
      endNumber: 82,
      decimals: 0,
      suffix: '%',
      subtitle: 'Decision-makers holding direct budget signing power',
      icon: Award,
      gradient: 'from-[#10B981] to-[#34D399]',
      iconColor: 'text-emerald-400',
    },
  ]

  return (
    <section
      id="reach"
      className="relative bg-[#050505] text-white py-16 sm:py-20 lg:py-24 border-t border-white/[0.08] overflow-hidden"
      aria-labelledby="audience-intelligence-heading"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00A6FF]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#FF6D00]/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Pre-header Eyebrow (Clean, Editorial, Global Font - Same as Other Sections) */}
        <div className="mb-2.5 sm:mb-3">
          <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
            GLOBAL AUDIENCE INTELLIGENCE
          </p>
        </div>

        {/* ── HEADLINE & INTRO ─────────────────────────────────────────── */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2
            id="audience-intelligence-heading"
            className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] leading-[1.15] text-white"
          >
            Connect with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
              <CountUp
                end={totalMillions}
                decimals={1}
                duration={2.5}
                preserveValue
              />
              M+
            </span>{' '}
            Decision Makers Worldwide
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            Real-time B2B geographic intelligence powering high-intent pipeline growth across 195+ countries. Continuously refreshed and verified through our multi-pass data validation engine.
          </p>
        </div>

        {/* ── 4 LIVE METRIC CARDS WITH COUNTUP ─────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {metricCards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl bg-[#0C111C]/90 border border-white/[0.08] hover:border-[#00A6FF]/40 p-4 sm:p-5 transition-all shadow-xl backdrop-blur-md group overflow-hidden"
              >
                {/* Micro corner highlight */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00A6FF]/5 blur-2xl rounded-full group-hover:bg-[#00A6FF]/12 transition-all pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    <Icon size={18} className={card.iconColor} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Live Telemetry
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-white mb-1">
                  <CountUp
                    end={card.endNumber}
                    decimals={card.decimals}
                    duration={2.2}
                    preserveValue
                  />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] to-[#38BDF8]">
                    {card.suffix}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white mb-1 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {card.subtitle}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* ── QUICK REGIONAL FILTER PILLS ──────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
              Focus Region:
            </span>
            {filterPills.map((pill) => {
              const isActive = activeRegion === pill.key
              return (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => setActiveRegion(pill.key)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 border select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00A6FF] to-[#0077EE] text-white border-transparent shadow-[0_4px_18px_rgba(0,166,255,0.4)]'
                      : 'bg-[#0C111C]/80 hover:bg-[#141C2A] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white font-bold' : 'bg-white/5 text-[#38BDF8]'
                    }`}
                  >
                    {pill.count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Interactive Zoom & Pan Enabled</span>
          </div>
        </div>

        {/* ── INTERACTIVE VECTOR MAP CONTAINER ─────────────────────────── */}
        <AudienceMap
          audienceData={audienceData}
          activeRegion={activeRegion}
          onSelectRegion={setActiveRegion}
        />

        {/* ── BOTTOM ACTIONS FOOTER ────────────────────────────────────── */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2 text-center sm:text-left">
            <Zap size={14} className="text-[#FF6D00] shrink-0" />
            <span>
              Direct target access: Filter by industry vertical, employee size, job seniorities, and tech stack in our CRM.
            </span>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF6D00] to-[#FFA600] hover:from-[#FF8533] hover:to-[#FFB733] transition-all shadow-[0_4px_20px_rgba(255,109,0,0.35)] shrink-0 w-full sm:w-auto justify-center"
          >
            <span>Request Custom Audience Breakdown</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  )
}

export default AudienceIntelligence
