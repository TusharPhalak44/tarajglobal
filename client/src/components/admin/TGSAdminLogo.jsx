import React from 'react'

/**
 * TGSAdminLogo - Unique, Bespoke Command Center Emblem for Admin Panel.
 * Distinct from public website logo: Futuristic Geometric Prism Insignia combining T, G & Energy Core.
 */
export const TGSAdminLogo = ({ size = 38, className = '' }) => {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 group select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Pulsing Aura Glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#00A6FF]/30 via-[#FF6D00]/20 to-[#10B981]/25 blur-md opacity-60 group-hover:opacity-100 group-hover:scale-115 transition-all duration-300 pointer-events-none" />

      {/* Main Vector Insignia Canvas */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(0,166,255,0.3)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="tgsBadgeBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#0B0F17" />
          </linearGradient>

          <linearGradient id="tgsBorderGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00A6FF" />
            <stop offset="50%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#FF6D00" />
          </linearGradient>

          <linearGradient id="tgsNeonBlue" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="60%" stopColor="#00A6FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>

          <linearGradient id="tgsNeonOrange" x1="50" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="50%" stopColor="#FF6D00" />
            <stop offset="100%" stopColor="#FF3D00" />
          </linearGradient>

          <filter id="tgsGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Squircle Chamfer Shield */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="24"
          fill="url(#tgsBadgeBg)"
          stroke="url(#tgsBorderGrad)"
          strokeWidth="3.5"
        />

        {/* High-Tech Grid Accent Lines (Subtle) */}
        <path
          d="M 22,50 L 78,50 M 50,22 L 50,78"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Outer Geometric Hex Ring Arc */}
        <path
          d="M 50,18 L 78,34 L 78,66 L 50,82 L 22,66 L 22,34 Z"
          stroke="url(#tgsNeonBlue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="40 10 25 15"
          className="opacity-70"
        />

        {/* Central Interlocking 'T' Monogram with Kinetic Power Cut */}
        {/* Top Horizontal Bar of 'T' */}
        <path
          d="M 28,32 L 72,32 L 67,41 L 33,41 Z"
          fill="url(#tgsNeonBlue)"
          filter="url(#tgsGlow)"
        />

        {/* Vertical Stem of 'T' Merged with Isometric 'G' Energy Loop */}
        <path
          d="M 45,39 L 55,39 L 55,58 L 68,58 L 68,67 L 45,67 Z"
          fill="url(#tgsNeonBlue)"
        />

        {/* Dynamic Orange Energy Apex Corner & Pulse Node */}
        <path
          d="M 57,48 L 72,48 L 72,67 L 57,67 Z"
          fill="url(#tgsNeonOrange)"
          opacity="0.9"
        />

        {/* Central Core Satellite Node */}
        <circle
          cx="64.5"
          cy="57.5"
          r="2.5"
          fill="#FFFFFF"
          className="animate-pulse"
        />

        {/* Precision Laser Corner Accents */}
        <path d="M 12,24 L 12,12 L 24,12" stroke="#00A6FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M 88,24 L 88,12 L 76,12" stroke="#00A6FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M 12,76 L 12,88 L 24,88" stroke="#00A6FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M 88,76 L 88,88 L 76,88" stroke="#FF6D00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default TGSAdminLogo
