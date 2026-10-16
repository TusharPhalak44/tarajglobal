import React, { useMemo } from 'react'

/**
 * FooterNetworkMap
 * Production-ready Global Telemetry Map background for Taraj Global:
 * - Subtle, atmospheric dotted world map spanning the entire footer width and height
 * - Non-bold, soft cyan/slate dots with gentle opacity (never competes with content)
 * - Central Logo Protection: SVG gradient mask fades out paths behind the central branding zone
 * - Left-to-Right and Right-to-Left curved fiber-optic paths (thin 1.1px strokes)
 * - Staggered, independent traveling light points (8–14s cycles)
 * - Zero JS animation overhead: 100% hardware-accelerated declarative SVG
 * - Full `prefers-reduced-motion` compliance
 */
export const FooterNetworkMap = () => {
  // ── 1. CONTINENT DOT MATRIX (Covering 1440 x 360 coordinate space) ───────
  const dots = useMemo(() => {
    const list = []
    const clusters = [
      // NORTH AMERICA
      { cx: 120, cy: 90, rx: 45, ry: 25, density: 0.65 },  // Alaska
      { cx: 240, cy: 105, rx: 95, ry: 40, density: 0.70 }, // Canada
      { cx: 270, cy: 165, rx: 85, ry: 35, density: 0.72 }, // US Central & East
      { cx: 190, cy: 170, rx: 45, ry: 30, density: 0.68 }, // US West
      { cx: 230, cy: 225, rx: 45, ry: 25, density: 0.62 }, // Mexico
      { cx: 310, cy: 245, rx: 35, ry: 18, density: 0.55 }, // Caribbean

      // SOUTH AMERICA
      { cx: 350, cy: 275, rx: 45, ry: 25, density: 0.68 }, // Northern SA
      { cx: 390, cy: 305, rx: 50, ry: 35, density: 0.65 }, // Brazil
      { cx: 360, cy: 335, rx: 30, ry: 30, density: 0.55 }, // Southern Cone

      // EUROPE
      { cx: 790, cy: 90, rx: 40, ry: 25, density: 0.72 },  // Scandinavia
      { cx: 740, cy: 130, rx: 25, ry: 20, density: 0.68 }, // UK & Ireland
      { cx: 800, cy: 145, rx: 50, ry: 28, density: 0.75 }, // Western Europe
      { cx: 855, cy: 150, rx: 45, ry: 28, density: 0.70 }, // Eastern Europe

      // AFRICA
      { cx: 800, cy: 220, rx: 60, ry: 28, density: 0.70 }, // North Africa
      { cx: 810, cy: 270, rx: 45, ry: 35, density: 0.62 }, // Central Africa
      { cx: 830, cy: 320, rx: 30, ry: 25, density: 0.55 }, // South Africa

      // ASIA & MIDDLE EAST
      { cx: 915, cy: 200, rx: 45, ry: 25, density: 0.70 }, // Middle East
      { cx: 995, cy: 125, rx: 110, ry: 40, density: 0.72 },// Russia / Central Asia
      { cx: 995, cy: 230, rx: 50, ry: 32, density: 0.74 }, // India / South Asia
      { cx: 1115, cy: 180, rx: 75, ry: 38, density: 0.74 },// China / East Asia
      { cx: 1235, cy: 160, rx: 30, ry: 24, density: 0.68 },// Japan & Korea
      { cx: 1135, cy: 255, rx: 45, ry: 26, density: 0.62 },// Southeast Asia

      // OCEANIA
      { cx: 1255, cy: 295, rx: 60, ry: 32, density: 0.70 },// Australia
      { cx: 1345, cy: 325, rx: 22, ry: 20, density: 0.52 },// New Zealand
    ]

    const step = 13
    clusters.forEach((c) => {
      for (let x = c.cx - c.rx; x <= c.cx + c.rx; x += step) {
        for (let y = c.cy - c.ry; y <= c.cy + c.ry; y += step) {
          const dx = (x - c.cx) / c.rx
          const dy = (y - c.cy) / c.ry
          if (dx * dx + dy * dy <= 1) {
            // Mask out the center branding zone with gentle feathering
            const distFromCenter = Math.abs(x - 620)
            if (distFromCenter < 75) continue // Pristine dark zone behind logo
            const fade = distFromCenter < 140 ? (distFromCenter - 75) / 65 : 1.0

            const pseudo = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
            const frac = pseudo - Math.floor(pseudo)
            if (frac < c.density) {
              list.push({
                x,
                y,
                r: frac > 0.82 ? 1.25 : 1.05,
                // Soft, non-bold, atmospheric cyber-blue opacity (0.14 - 0.26)
                opacity: (0.14 + frac * 0.12) * fade,
              })
            }
          }
        }
      }
    })

    return list
  }, [])

  // ── 2. ILLUMINATED NODES (Hub Beacons) ────────────────────────────────
  const nodes = [
    // Left Hemisphere (Americas)
    { id: 'node-w1', x: 110, y: 195, color: '#00A6FF', r: 3.2, delay: '0s' },
    { id: 'node-w2', x: 250, y: 165, color: '#FF7A00', r: 3.5, delay: '1.2s' },
    { id: 'node-w3', x: 380, y: 135, color: '#00A6FF', r: 3.5, delay: '2.4s' },
    { id: 'node-w4', x: 295, y: 250, color: '#FF7A00', r: 3.0, delay: '1.8s' },

    // Right Hemisphere (EMEA & APAC)
    { id: 'node-e1', x: 765, y: 155, color: '#00A6FF', r: 3.5, delay: '0.6s' },
    { id: 'node-e2', x: 920, y: 210, color: '#FF7A00', r: 3.2, delay: '1.8s' },
    { id: 'node-e3', x: 1085, y: 140, color: '#FF7A00', r: 3.5, delay: '2.2s' },
    { id: 'node-e4', x: 1185, y: 220, color: '#00A6FF', r: 3.2, delay: '3.0s' },
    { id: 'node-e5', x: 1305, y: 250, color: '#FF7A00', r: 3.2, delay: '1.4s' },
  ]

  // Continuous Left-to-Right path across the entire footer (smoothly masked in center)
  const pathLtoR1 = 'M 0 170 Q 140 100, 310 135 T 620 110 T 1060 140 T 1440 180'
  const pathLtoR2 = 'M 0 215 Q 180 150, 380 170 T 640 165 T 1150 160 T 1440 220'
  const pathLtoRBranch = 'M 80 195 Q 230 115, 380 135 T 620 110'

  // Continuous Right-to-Left path across the entire footer (smoothly masked in center)
  const pathRtoL1 = 'M 1440 160 Q 1260 90, 1050 130 T 720 120 T 280 150 T 0 165'
  const pathRtoL2 = 'M 1440 235 Q 1220 250, 960 185 T 700 175 T 240 190 T 0 225'
  const pathRtoLBranch = 'M 1360 195 Q 1180 135, 940 150 T 720 120'

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
      >
        <defs>
          {/* ── Soft line glow filter ── */}
          <filter id="lineSubtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ── Node ambient beacon glow filter ── */}
          <filter id="nodeBeaconGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ── Traveling photon core aura ── */}
          <filter id="photonAura" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ── Central Logo Protection Mask (Lines & Photons fade out behind logo) ── */}
          <linearGradient id="centerMaskGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="38%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#000000" />
            <stop offset="55%" stopColor="#000000" />
            <stop offset="62%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <mask id="logoZoneProtectionMask">
            <rect x="0" y="0" width="1440" height="360" fill="url(#centerMaskGrad)" />
          </mask>
        </defs>

        {/* ── 1. Full-Width Atmospheric Dotted Continents ── */}
        <g opacity="0.95">
          {dots.map((d, i) => (
            <circle
              key={`dot-${i}`}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill="#00A6FF"
              opacity={d.opacity}
            />
          ))}
        </g>

        {/* ── 2. Telemetry Network Arcs & Light Points (Protected Behind Logo) ── */}
        <g mask="url(#logoZoneProtectionMask)">
          {/* Static Thin Arcs (1.1px hair-lines) */}
          <g opacity="0.65">
            {/* Left-to-Right static paths */}
            <path
              d={pathLtoR1}
              fill="none"
              stroke="#FF7A00"
              strokeWidth="1.1"
              strokeOpacity="0.45"
              strokeLinecap="round"
              filter="url(#lineSubtleGlow)"
            />
            <path
              d={pathLtoR2}
              fill="none"
              stroke="#00A6FF"
              strokeWidth="1.1"
              strokeOpacity="0.40"
              strokeLinecap="round"
              filter="url(#lineSubtleGlow)"
            />
            <path
              d={pathLtoRBranch}
              fill="none"
              stroke="#FF7A00"
              strokeWidth="0.95"
              strokeOpacity="0.30"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />

            {/* Right-to-Left static paths */}
            <path
              d={pathRtoL1}
              fill="none"
              stroke="#00A6FF"
              strokeWidth="1.1"
              strokeOpacity="0.45"
              strokeLinecap="round"
              filter="url(#lineSubtleGlow)"
            />
            <path
              d={pathRtoL2}
              fill="none"
              stroke="#FF7A00"
              strokeWidth="1.1"
              strokeOpacity="0.40"
              strokeLinecap="round"
              filter="url(#lineSubtleGlow)"
            />
            <path
              d={pathRtoLBranch}
              fill="none"
              stroke="#00A6FF"
              strokeWidth="0.95"
              strokeOpacity="0.30"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          </g>

          {/* ── 3. Traveling Light Points (Staggered, 8–14s Independent Cycles) ── */}
          {/* Pulse L1 (Orange, Left to Right, 10s cycle) */}
          <g className="telemetry-pulse">
            <circle r="6" fill="#FF7A00" opacity="0.75" filter="url(#photonAura)">
              <animateMotion
                path={pathLtoR1}
                dur="10s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
            <circle r="2.4" fill="#FFFFFF">
              <animateMotion
                path={pathLtoR1}
                dur="10s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
          </g>

          {/* Pulse L2 (Cyan, Left to Right, 12s cycle, staggered at 3.5s) */}
          <g className="telemetry-pulse">
            <circle r="6" fill="#00A6FF" opacity="0.75" filter="url(#photonAura)">
              <animateMotion
                path={pathLtoR2}
                dur="12s"
                begin="3.5s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
            <circle r="2.4" fill="#FFFFFF">
              <animateMotion
                path={pathLtoR2}
                dur="12s"
                begin="3.5s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
          </g>

          {/* Pulse R1 (Cyan, Right to Left, 11s cycle, staggered at 1.8s) */}
          <g className="telemetry-pulse">
            <circle r="6" fill="#00A6FF" opacity="0.75" filter="url(#photonAura)">
              <animateMotion
                path={pathRtoL1}
                dur="11s"
                begin="1.8s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
            <circle r="2.4" fill="#FFFFFF">
              <animateMotion
                path={pathRtoL1}
                dur="11s"
                begin="1.8s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
          </g>

          {/* Pulse R2 (Orange, Right to Left, 13s cycle, staggered at 6.2s) */}
          <g className="telemetry-pulse">
            <circle r="6" fill="#FF7A00" opacity="0.75" filter="url(#photonAura)">
              <animateMotion
                path={pathRtoL2}
                dur="13s"
                begin="6.2s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
            <circle r="2.4" fill="#FFFFFF">
              <animateMotion
                path={pathRtoL2}
                dur="13s"
                begin="6.2s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
          </g>
        </g>

        {/* ── 4. Radiant Hub Beacons (Illuminated Regional Nodes) ── */}
        <g>
          {nodes.map((n) => (
            <g key={n.id}>
              {/* Expanding Breathing Radar Ring */}
              <circle
                cx={n.x}
                cy={n.y}
                r="3"
                fill="none"
                stroke={n.color}
                strokeWidth="0.85"
                className="telemetry-ripple"
              >
                <animate
                  attributeName="r"
                  values="3;13;20"
                  dur="3.8s"
                  begin={n.delay}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0.2;0"
                  dur="3.8s"
                  begin={n.delay}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Ambient Halo */}
              <circle
                cx={n.x}
                cy={n.y}
                r="7"
                fill={n.color}
                opacity="0.25"
                filter="url(#nodeBeaconGlow)"
              />

              {/* Solid Bead Core */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.color}
              />

              {/* Specular White Center Pinpoint */}
              <circle
                cx={n.x}
                cy={n.y}
                r="1.2"
                fill="#FFFFFF"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default FooterNetworkMap
