import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Minus,
  Compass,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  getCountryFlag,
  formatAudienceCount,
  formatFullNumber,
} from '../../../services/audienceApi'

const GEO_URL = '/world-110m.json'

// ── 1. CONTINENT LABELS (Bold Cyan Sans-Serif Matching Reference Image) ──
const CONTINENT_LABELS = [
  { name: 'NORTH AMERICA', coordinates: [-100, 48] },
  { name: 'SOUTH AMERICA', coordinates: [-58, -17] },
  { name: 'EUROPE', coordinates: [20, 54] },
  { name: 'AFRICA', coordinates: [21, 5] },
  { name: 'ASIA', coordinates: [92, 46] },
  { name: 'OCEANIA', coordinates: [136, -26] },
]

// ── 2. STRATEGIC HUBS (Exact 16 Global Hubs from User's Reference Image) ──
export const STRATEGIC_HUBS = [
  // North America
  {
    id: 'us-west',
    name: 'United States (West Coast)',
    country_name: 'United States',
    iso_code: 'US',
    coordinates: [-121, 38],
    defaultBadge: '5+',
    region: 'NORTH_AMERICA',
  },
  {
    id: 'us-east',
    name: 'United States (East Coast)',
    country_name: 'United States',
    iso_code: 'US',
    coordinates: [-75, 41],
    defaultBadge: '7+',
    region: 'NORTH_AMERICA',
  },
  // Latin America
  {
    id: 'mexico',
    name: 'Mexico',
    country_name: 'Mexico',
    iso_code: 'MX',
    coordinates: [-100, 22],
    defaultBadge: '3+',
    region: 'LATAM',
  },
  {
    id: 'colombia',
    name: 'Colombia',
    country_name: 'Colombia',
    iso_code: 'CO',
    coordinates: [-73, 5],
    defaultBadge: '1+',
    region: 'LATAM',
  },
  {
    id: 'brazil',
    name: 'Brazil',
    country_name: 'Brazil',
    iso_code: 'BR',
    coordinates: [-47, -21],
    defaultBadge: '5+',
    region: 'LATAM',
  },
  {
    id: 'argentina',
    name: 'Argentina',
    country_name: 'Argentina',
    iso_code: 'AR',
    coordinates: [-59, -35],
    defaultBadge: '2+',
    region: 'LATAM',
  },
  // Europe
  {
    id: 'uk',
    name: 'United Kingdom',
    country_name: 'United Kingdom',
    iso_code: 'GB',
    coordinates: [-1.5, 52.5],
    defaultBadge: '5+',
    region: 'EMEA',
  },
  {
    id: 'france',
    name: 'France & Western Europe',
    country_name: 'France',
    iso_code: 'FR',
    coordinates: [2.5, 46.5],
    defaultBadge: '4+',
    region: 'EMEA',
  },
  {
    id: 'germany',
    name: 'Germany & Central Europe',
    country_name: 'Germany',
    iso_code: 'DE',
    coordinates: [10.5, 51.5],
    defaultBadge: '7+',
    region: 'EMEA',
  },
  // Eastern Mediterranean & Middle East
  {
    id: 'turkey',
    name: 'Turkey & Levant',
    country_name: 'Turkey',
    iso_code: 'TR',
    coordinates: [35, 39],
    defaultBadge: '5+',
    region: 'EMEA',
  },
  {
    id: 'uae',
    name: 'United Arab Emirates & Gulf',
    country_name: 'United Arab Emirates',
    iso_code: 'AE',
    coordinates: [54, 24],
    defaultBadge: '7+',
    region: 'EMEA',
  },
  // Africa
  {
    id: 'south-africa',
    name: 'South Africa',
    country_name: 'South Africa',
    iso_code: 'ZA',
    coordinates: [28, -28],
    defaultBadge: '2+',
    region: 'EMEA',
  },
  // Asia & Pacific
  {
    id: 'india',
    name: 'India & South Asia',
    country_name: 'India',
    iso_code: 'IN',
    coordinates: [78, 21],
    defaultBadge: '8+',
    region: 'APAC',
  },
  {
    id: 'singapore',
    name: 'Singapore & ASEAN',
    country_name: 'Singapore',
    iso_code: 'SG',
    coordinates: [104, 1.5],
    defaultBadge: '6+',
    region: 'APAC',
  },
  {
    id: 'japan',
    name: 'Japan & East Asia',
    country_name: 'Japan',
    iso_code: 'JP',
    coordinates: [139, 36],
    defaultBadge: '5+',
    region: 'APAC',
  },
  {
    id: 'australia',
    name: 'Australia & Oceania',
    country_name: 'Australia',
    iso_code: 'AU',
    coordinates: [136, -30],
    defaultBadge: '4+',
    region: 'APAC',
  },
]

// ── 3. CURVED DASHED FLIGHT ARCS (Exact Network Trajectory from Reference) ──
const FLIGHT_NETWORK_ARCS = [
  // Pacific Entry into North America
  { id: 'arc-pac-usw', from: [-160, 24], to: [-121, 38] },
  // North America Coast to Coast
  { id: 'arc-usw-use', from: [-121, 38], to: [-75, 41] },
  // Transatlantic Arc into Europe
  { id: 'arc-use-uk', from: [-75, 41], to: [-1.5, 52.5] },
  // UK to Germany
  { id: 'arc-uk-de', from: [-1.5, 52.5], to: [10.5, 51.5] },
  // UK to France
  { id: 'arc-uk-fr', from: [-1.5, 52.5], to: [2.5, 46.5] },
  // Central Europe to Eastern Mediterranean
  { id: 'arc-de-tr', from: [10.5, 51.5], to: [35, 39] },
  // Eastern Mediterranean to UAE / Gulf Hub
  { id: 'arc-tr-ae', from: [35, 39], to: [54, 24] },
  // UAE to South Africa
  { id: 'arc-ae-za', from: [54, 24], to: [28, -28] },
  // UAE to India
  { id: 'arc-ae-in', from: [54, 24], to: [78, 21] },
  // India to Singapore / ASEAN
  { id: 'arc-in-sg', from: [78, 21], to: [104, 1.5] },
  // Singapore to Japan
  { id: 'arc-sg-jp', from: [104, 1.5], to: [139, 36] },
  // Singapore to Australia
  { id: 'arc-sg-au', from: [104, 1.5], to: [136, -30] },
  // Japan out to Pacific
  { id: 'arc-jp-pac', from: [139, 36], to: [175, 24] },

  // Americas Downward Branch (Mexico -> Colombia -> Brazil -> Argentina)
  { id: 'arc-use-mx', from: [-75, 41], to: [-100, 22] },
  { id: 'arc-mx-co', from: [-100, 22], to: [-73, 5] },
  { id: 'arc-co-br', from: [-73, 5], to: [-47, -21] },
  { id: 'arc-br-ar', from: [-47, -21], to: [-59, -35] },
]

// Camera position presets
export const REGION_CAMERA_PRESETS = {
  GLOBAL: { coordinates: [10, 16], zoom: 1 },
  NORTH_AMERICA: { coordinates: [-96, 42], zoom: 2.5 },
  LATAM: { coordinates: [-64, -18], zoom: 2.3 },
  EMEA: { coordinates: [18, 42], zoom: 2.7 },
  APAC: { coordinates: [105, 14], zoom: 2.2 },
}

export const AudienceMap = ({
  audienceData,
  activeRegion = 'GLOBAL',
  onSelectRegion,
}) => {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(REGION_CAMERA_PRESETS.GLOBAL)
  const [hoveredMarket, setHoveredMarket] = useState(null)
  const [selectedMarket, setSelectedMarket] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const hoverTimeoutRef = useRef(null)

  // Camera sync on active region change
  useEffect(() => {
    const target = REGION_CAMERA_PRESETS[activeRegion] || REGION_CAMERA_PRESETS.GLOBAL
    setPosition(target)
  }, [activeRegion])

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Cleanup hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  // Fast country lookup dictionary
  const countryMap = useMemo(() => {
    const map = new Map()
    if (!audienceData?.country_breakdown) return map

    audienceData.country_breakdown.forEach((country) => {
      if (country.iso_code) map.set(country.iso_code.toUpperCase(), country)
      if (country.iso3_code) map.set(country.iso3_code.toUpperCase(), country)
      if (country.country_name) map.set(country.country_name.toLowerCase(), country)
    })
    return map
  }, [audienceData])

  // Match TopoJSON geometry to country data
  const findCountryByGeo = useCallback(
    (geo) => {
      if (!geo) return null
      const geoName = (geo.properties?.name || '').toLowerCase()
      const geoId = String(geo.id || '')

      if (countryMap.has(geoName)) return countryMap.get(geoName)

      if (geoName.includes('united states') || geoId === '840') return countryMap.get('US')
      if (geoName.includes('united kingdom') || geoId === '826') return countryMap.get('GB')
      if (geoName.includes('korea') || geoId === '410') return countryMap.get('KR')
      if (geoName.includes('emirates') || geoId === '784') return countryMap.get('AE')
      if (geoName.includes('congo')) return countryMap.get('CD')

      return null
    },
    [countryMap]
  )

  // Debounced hover handlers
  const handleMarketHover = useCallback((market) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    if (market) {
      setHoveredMarket(market)
    }
  }, [])

  const handleMarketLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMarket(null)
    }, 120)
  }, [])

  // Map Navigation Controls
  const handleZoomIn = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(pos.zoom * 1.35, 6.5),
    }))
  }

  const handleZoomOut = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.max(pos.zoom / 1.35, 0.9),
    }))
  }

  const handleReset = () => {
    setPosition(REGION_CAMERA_PRESETS.GLOBAL)
    if (onSelectRegion) onSelectRegion('GLOBAL')
  }

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => { })
    } else {
      document.exitFullscreen?.().catch(() => { })
    }
  }

  const handleMoveEnd = (newPos) => {
    setPosition(newPos)
  }

  // Active hubs filtered by active region
  const visibleHubs = useMemo(() => {
    if (activeRegion === 'GLOBAL') return STRATEGIC_HUBS
    return STRATEGIC_HUBS.filter((h) => h.region === activeRegion)
  }, [activeRegion])

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#142338] transition-all select-none flex flex-col ${isFullscreen ? 'h-screen w-screen rounded-none' : 'h-[520px] sm:h-[580px] lg:h-[640px]'
        }`}
      style={{
        background:
          'radial-gradient(ellipse 90% 75% at 55% 50%, #061122 0%, #030814 60%, #010307 100%)',
        boxShadow:
          '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 166, 255, 0.04) inset',
      }}
    >
      {/* Laser Top Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#00A6FF]/70 via-[#38BDF8] to-[#FF6D00]/70 shrink-0" />

      {/* ── 1. DOCKED TELEMETRY HUD BAR ── */}
      <div className="relative z-20 w-full px-4 sm:px-6 py-2.5 border-b border-white/[0.06] bg-[#02050D]/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">

        {/* Left: Telemetry Status */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-200">
            NETWORK TELEMETRY
          </span>

          <span className="h-3 w-px bg-white/15" />

          <span className="text-[11px] font-mono text-[#00A6FF]">
            16 GLOBAL HUBS
          </span>

          <span className="h-3 w-px bg-white/15 hidden md:inline-block" />

          <span className="text-[11px] font-mono text-slate-400 hidden md:inline-block">
            {activeRegion.replace('_', ' ')} VIEW
          </span>
        </div>

        {/* Right: Live Telemetry Readout */}
        <div className="flex items-center gap-3 self-start sm:self-auto min-h-[22px]">
          {hoveredMarket ? (
            <motion.div
              key={hoveredMarket.id || hoveredMarket.iso_code}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              className="flex items-center gap-2 text-xs"
            >
              <span className="text-sm leading-none">
                {getCountryFlag(hoveredMarket.iso_code)}
              </span>
              <span className="font-bold text-white tracking-tight">
                {hoveredMarket.name || hoveredMarket.country_name}
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-slate-300">
                Contacts:{' '}
                <strong className="text-[#00A6FF] font-mono font-bold">
                  {formatFullNumber(hoveredMarket.contact_count)}
                </strong>
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden sm:inline">
                Accounts:{' '}
                <strong className="text-[#38BDF8] font-mono font-bold">
                  {formatFullNumber(hoveredMarket.company_count)}
                </strong>
              </span>
              {hoveredMarket.percentage && (
                <>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">
                    {hoveredMarket.percentage}% SHARE
                  </span>
                </>
              )}
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-[#00A6FF] font-mono text-[11px]">HOVER ANY HUB</span>
              <span className="text-white/20">•</span>
              <span>80.2M+ Decision Makers Synchronized</span>
            </div>
          )}
        </div>

      </div>

      {/* ── 2. MAP CANVAS WRAPPER ── */}
      <div className="relative flex-1 w-full h-full overflow-hidden">

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 130,
            center: [12, 18],
          }}
          width={980}
          height={520}
          className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            minZoom={0.9}
            maxZoom={6.5}
          >
            {/* 1. Country Vector Geographies */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = findCountryByGeo(geo)
                  const isHovered =
                    hoveredMarket &&
                    (hoveredMarket.iso_code === country?.iso_code ||
                      hoveredMarket.country_name === country?.country_name)
                  const isSelected =
                    selectedMarket &&
                    (selectedMarket.iso_code === country?.iso_code ||
                      selectedMarket.country_name === country?.country_name)
                  const isMappedMarket = !!country

                  // Reference aesthetic: deep rich midnight navy landmass with crisp thin boundaries
                  const zoomSqrt = Math.sqrt(position.zoom || 1)
                  let fill = '#0A1424'
                  let stroke = '#14243B'
                  let strokeWidth = Math.max(0.28, 0.55 / zoomSqrt)

                  if (isMappedMarket) {
                    fill = '#0D192C'
                    stroke = '#1B3150'
                    strokeWidth = Math.max(0.35, 0.7 / zoomSqrt)
                  }

                  if (isHovered || isSelected) {
                    fill = '#142B4C'
                    stroke = '#00A6FF'
                    strokeWidth = Math.max(0.6, 1.1 / zoomSqrt)
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (country) handleMarketHover(country)
                      }}
                      onMouseLeave={handleMarketLeave}
                      onClick={() => {
                        if (country) setSelectedMarket(country)
                      }}
                      style={{
                        default: {
                          fill,
                          stroke,
                          strokeWidth,
                          outline: 'none',
                          cursor: country ? 'pointer' : 'default',
                        },
                        hover: {
                          fill: country ? '#163156' : '#101C30',
                          stroke: country ? '#00A6FF' : '#1F3452',
                          strokeWidth: country ? Math.max(0.6, 1.1 / zoomSqrt) : Math.max(0.3, 0.55 / zoomSqrt),
                          outline: 'none',
                        },
                        pressed: {
                          fill: country ? '#0E233F' : '#0A1424',
                          outline: 'none',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {/* 2. Bold Cyan Continent Labels (Only Visible in Global Overview Zoom <= 1.6) */}
            {position.zoom <= 1.6 &&
              CONTINENT_LABELS.map((item) => (
                <Marker key={item.name} coordinates={item.coordinates}>
                  <text
                    textAnchor="middle"
                    fill="#00A6FF"
                    fontSize={10.5}
                    fontWeight={800}
                    letterSpacing="0.22em"
                    className="select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(0,166,255,0.4)]"
                    style={{
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    }}
                  >
                    {item.name}
                  </text>
                </Marker>
              ))}

            {/* 3. Curved Dashed Cyan Flight Arcs (Dynamic Stroke & Dash Proportional to Zoom) */}
            {FLIGHT_NETWORK_ARCS.map((arc) => (
              <Line
                key={arc.id}
                from={arc.from}
                to={arc.to}
                stroke="#00A6FF"
                strokeWidth={Math.max(0.65, 1.25 / position.zoom)}
                strokeOpacity={0.65}
                strokeDasharray={`${4 / position.zoom} ${6 / position.zoom}`}
                strokeLinecap="round"
                className="pointer-events-none"
              />
            ))}

            {/* 4. Strategic Global Hubs with Zoom-Responsive Scaling */}
            {visibleHubs.map((hub) => {
              const countryData = countryMap.get(hub.iso_code) || {
                country_name: hub.country_name,
                iso_code: hub.iso_code,
                region: hub.region,
                contact_count: 5000000,
                company_count: 1500000,
              }

              // Use exact badge rating or dynamic tier from live sync
              let badgeText = hub.defaultBadge
              if (
                countryData?.contact_count &&
                hub.id !== 'us-west' &&
                hub.id !== 'us-east'
              ) {
                const millions = Math.floor(countryData.contact_count / 1_000_000)
                if (millions >= 1) {
                  badgeText = `${millions}+`
                }
              }

              const isHovered =
                hoveredMarket &&
                (hoveredMarket.id === hub.id ||
                  hoveredMarket.iso_code === hub.iso_code)
              const isSelected =
                selectedMarket &&
                (selectedMarket.id === hub.id ||
                  selectedMarket.iso_code === hub.iso_code)

              const marketPayload = {
                ...countryData,
                displayName: hub.name,
                id: hub.id,
              }

              // Zoom-independent scale factor: keeps markers clean, compact, and separated when zoomed in
              const zoomScale = (1 / position.zoom) * (isHovered || isSelected ? 1.15 : 1)

              return (
                <Marker
                  key={hub.id}
                  coordinates={hub.coordinates}
                  onMouseEnter={() => handleMarketHover(marketPayload)}
                  onMouseLeave={handleMarketLeave}
                  onClick={() => setSelectedMarket(marketPayload)}
                  className="cursor-pointer"
                >
                  <g
                    transform={`scale(${zoomScale})`}
                    style={{ transition: 'transform 0.18s ease-out' }}
                  >
                    {/* 1. Sleek Compact Outer Cyan Aura */}
                    <circle
                      r={isHovered || isSelected ? 16 : 13}
                      fill="rgba(0, 166, 255, 0.12)"
                      stroke="rgba(0, 166, 255, 0.35)"
                      strokeWidth={0.75}
                      className="transition-all duration-300"
                    />

                    {/* 2. Middle Vibrant Radar Ring */}
                    <circle
                      r={isHovered || isSelected ? 8.5 : 6.8}
                      fill={
                        isHovered || isSelected
                          ? 'rgba(0, 166, 255, 0.45)'
                          : 'rgba(0, 166, 255, 0.28)'
                      }
                      stroke="#00A6FF"
                      strokeWidth={1.2}
                      className="transition-all duration-300"
                    />

                    {/* 3. Core Cyan Pinpoint Beacon */}
                    <circle
                      r={2.2}
                      fill="#00A6FF"
                      className="transition-all duration-300"
                    />

                    {/* 4. Sleek Offset Black Badge with Crisp White Border */}
                    <circle
                      cx={0}
                      cy={-8}
                      r={5.5}
                      fill="#000000"
                      stroke="#FFFFFF"
                      strokeWidth={1.2}
                      className="drop-shadow-sm"
                    />

                    {/* 5. Pure White Badge Text (e.g. 5+, 7+, 8+) */}
                    <text
                      x={0}
                      y={-8}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#FFFFFF"
                      fontSize={6.5}
                      fontWeight={800}
                      fontFamily="Inter, system-ui, -apple-system, sans-serif"
                      className="select-none pointer-events-none"
                    >
                      {badgeText}
                    </text>

                    {/* 6. Clean Country Label (Appears when Zoomed In for Precision Inspection) */}
                    {position.zoom > 1.8 && (
                      <text
                        x={0}
                        y={14}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#CBD5E1"
                        fontSize={8}
                        fontWeight={700}
                        letterSpacing="0.04em"
                        className="select-none pointer-events-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                        style={{
                          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                        }}
                      >
                        {hub.name || hub.country_name}
                      </text>
                    )}
                  </g>
                </Marker>
              )
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* ── 3. FLOATING MAP CONTROLS (Bottom Right) ── */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 shadow-2xl">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg bg-[#050B16]/90 border border-white/10 hover:border-[#00A6FF]/60 text-slate-200 hover:text-white flex items-center justify-center hover:bg-[#0D1829] transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus size={15} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg bg-[#050B16]/90 border border-white/10 hover:border-[#00A6FF]/60 text-slate-200 hover:text-white flex items-center justify-center hover:bg-[#0D1829] transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus size={15} />
          </button>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg bg-[#050B16]/90 border border-white/10 hover:border-[#00A6FF]/60 text-[#00A6FF] flex items-center justify-center hover:bg-[#0D1829] transition-colors cursor-pointer"
            title="Reset Global View"
            aria-label="Reset View"
          >
            <Compass size={15} />
          </button>
          <button
            onClick={handleToggleFullscreen}
            className="w-8 h-8 rounded-lg bg-[#050B16]/90 border border-white/10 hover:border-[#00A6FF]/60 text-slate-200 hover:text-white flex items-center justify-center hover:bg-[#0D1829] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>

        {/* ── 4. CLICKABLE COUNTRY / HUB INSPECTION MODAL CARD ── */}
        <AnimatePresence>
          {selectedMarket && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[350px] z-30 rounded-2xl bg-[#060D1A]/95 border border-[#00A6FF]/40 p-5 shadow-2xl backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">
                    {getCountryFlag(selectedMarket.iso_code)}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {selectedMarket.displayName || selectedMarket.country_name}
                    </h4>
                    <span className="text-[10px] font-mono tracking-wider text-[#00A6FF] uppercase">
                      {selectedMarket.region?.replace('_', ' ') || 'GLOBAL MARKET'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMarket(null)}
                  className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close market inspection"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-[10px] text-slate-400 block mb-0.5">
                    Verified Contacts
                  </span>
                  <span className="text-base font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] to-[#38BDF8]">
                    {formatFullNumber(selectedMarket.contact_count)}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-[10px] text-slate-400 block mb-0.5">
                    Target Accounts
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    {formatFullNumber(selectedMarket.company_count)}
                  </span>
                </div>
              </div>

              {/* Regional Share Bar */}
              {selectedMarket.percentage && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Global Network Share</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {selectedMarket.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00A6FF] to-[#38BDF8]"
                      style={{
                        width: `${Math.min(selectedMarket.percentage * 3, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                to={`/contact?country=${encodeURIComponent(
                  selectedMarket.country_name || selectedMarket.displayName
                )}`}
                className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#00A6FF] to-[#0077EE] hover:from-[#33B8FF] hover:to-[#0066DD] transition-all shadow-md hover:shadow-[0_0_18px_rgba(0,166,255,0.4)]"
              >
                <span>Target {selectedMarket.country_name} Decision Makers</span>
                <ExternalLink size={12} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default AudienceMap
