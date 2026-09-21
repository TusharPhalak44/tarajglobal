import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

// ─── Custom Vector Icons precisely matching reference graphic ───

function CampaignStrategyIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      {/* Document Base */}
      <rect x="9" y="8" width="22" height="28" rx="3" fill="url(#blueDoc1)" stroke="#00D2FF" strokeWidth="1.6" />
      <line x1="14" y1="14" x2="22" y2="14" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="18" x2="24" y2="18" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="22" x2="20" y2="22" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="26" x2="23" y2="26" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      {/* 3D Megaphone Accent */}
      <path d="M25 20 L35 15 L35 31 L25 26 Z" fill="#00D2FF" opacity="0.95" />
      <rect x="22" y="20" width="4" height="6" rx="1" fill="#FFFFFF" />
      <path d="M27 26 L28 31 L30 31 L29 26 Z" fill="#00A6FF" />
      <path d="M37 19 Q40 23 37 27" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <defs>
        <linearGradient id="blueDoc1" x1="9" y1="8" x2="31" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B2652" />
          <stop offset="1" stopColor="#041228" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ClientApprovalIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      <rect x="10" y="8" width="22" height="28" rx="3" fill="url(#blueDoc2)" stroke="#00D2FF" strokeWidth="1.6" />
      <line x1="15" y1="14" x2="23" y2="14" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15" y1="18" x2="25" y2="18" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15" y1="22" x2="21" y2="22" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      {/* Green Checkmark Shield Badge */}
      <circle cx="28" cy="27" r="9" fill="#06281D" stroke="#10B981" strokeWidth="1.8" />
      <path d="M24 27 L27 30 L32 24" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="blueDoc2" x1="10" y1="8" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B2652" />
          <stop offset="1" stopColor="#041228" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function IcpDataIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      {/* 3D Database Cylinders */}
      <ellipse cx="20" cy="14" rx="11" ry="4" fill="#00A6FF" fillOpacity="0.75" stroke="#00D2FF" strokeWidth="1.6" />
      <path d="M9 14 V21 C9 23.2 13.9 25 20 25 C26.1 25 31 23.2 31 21 V14" stroke="#00D2FF" strokeWidth="1.6" fill="#082046" />
      <path d="M9 21 V28 C9 30.2 13.9 32 20 32 C26.1 32 31 30.2 31 28 V21" stroke="#00D2FF" strokeWidth="1.6" fill="#051632" />
      {/* User Badge */}
      <circle cx="32" cy="30" r="7" fill="#092754" stroke="#00D2FF" strokeWidth="1.6" />
      <circle cx="32" cy="28" r="2.5" fill="#00D2FF" />
      <path d="M28 34 C28 32 30 31.5 32 31.5 C34 31.5 36 32 36 34" stroke="#00D2FF" strokeWidth="1.3" fill="none" />
    </svg>
  )
}

function ContentCreationIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      <rect x="10" y="8" width="24" height="30" rx="3.5" fill="url(#blueDoc3)" stroke="#00D2FF" strokeWidth="1.6" />
      {/* Landscape image */}
      <rect x="14" y="12" width="16" height="12" rx="1.5" fill="#0A2C60" stroke="#00D2FF" strokeWidth="1" />
      <polygon points="16,22 20,16 24,22" fill="#00D2FF" opacity="0.8" />
      <polygon points="22,22 25,18 28,22" fill="#00A6FF" opacity="0.9" />
      <circle cx="25" cy="15" r="1.5" fill="#FFFFFF" />
      {/* Lines */}
      <line x1="14" y1="28" x2="26" y2="28" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="32" x2="22" y2="32" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
      <defs>
        <linearGradient id="blueDoc3" x1="10" y1="8" x2="34" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B2652" />
          <stop offset="1" stopColor="#041228" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function EmailDistributionIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      {/* Speed lines */}
      <line x1="6" y1="19" x2="11" y2="19" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <line x1="4" y1="24" x2="9" y2="24" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <line x1="7" y1="29" x2="12" y2="29" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      {/* Envelope */}
      <rect x="13" y="14" width="26" height="18" rx="2.5" fill="url(#envGrad)" stroke="#00D2FF" strokeWidth="1.6" />
      <path d="M14 16 L26 24 L38 16" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="envGrad" x1="13" y1="14" x2="39" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A326E" />
          <stop offset="1" stopColor="#031634" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function EngagementTrackingIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      {/* Bars */}
      <rect x="10" y="26" width="5" height="11" rx="1" fill="#0A326E" stroke="#00D2FF" strokeWidth="1.2" />
      <rect x="17" y="21" width="5" height="16" rx="1" fill="#0C408D" stroke="#00D2FF" strokeWidth="1.2" />
      <rect x="24" y="15" width="5" height="22" rx="1" fill="#0E4EA9" stroke="#00D2FF" strokeWidth="1.2" />
      <rect x="31" y="9" width="5" height="28" rx="1" fill="#00A6FF" stroke="#00D2FF" strokeWidth="1.2" />
      {/* Trend Arrow */}
      <path d="M11 23 L18 18 L25 12 L32 6" stroke="#00D2FF" strokeWidth="2.2" strokeLinecap="round" />
      <polygon points="31,5 36,5 36,10" fill="#00D2FF" />
    </svg>
  )
}

function LeadCaptureIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      {/* User */}
      <circle cx="20" cy="17" r="6.5" fill="#0A3370" stroke="#00D2FF" strokeWidth="1.6" />
      <path d="M10 33 C10 26 14 24 20 24 C26 24 30 26 30 33" stroke="#00D2FF" strokeWidth="1.6" fill="#08224C" />
      {/* Plus */}
      <circle cx="32" cy="30" r="6.5" fill="#00A6FF" stroke="#00D2FF" strokeWidth="1.6" />
      <line x1="32" y1="27" x2="32" y2="33" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="30" x2="35" y2="30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function HumanVerificationIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="shrink-0">
      {/* Lens */}
      <circle cx="21" cy="19" r="11" fill="#0A2C60" stroke="#00D2FF" strokeWidth="2" />
      <circle cx="21" cy="16" r="3.5" fill="#00D2FF" />
      <path d="M16 24 C16 21 18 20.5 21 20.5 C24 20.5 26 21 26 24" stroke="#00D2FF" strokeWidth="1.5" fill="none" />
      {/* Handle */}
      <line x1="29" y1="27" x2="37" y2="35" stroke="#00D2FF" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

function PerformanceAnalyticsIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="shrink-0">
      {/* Pie Chart */}
      <circle cx="22" cy="28" r="11" fill="#082046" stroke="#00D2FF" strokeWidth="1.6" />
      <path d="M22 17 A11 11 0 0 1 33 28 L22 28 Z" fill="#00D2FF" />
      {/* Analytics Bars */}
      <rect x="36" y="30" width="3.5" height="9" rx="1" fill="#00A6FF" />
      <rect x="41" y="24" width="3.5" height="15" rx="1" fill="#00D2FF" />
      <rect x="46" y="19" width="3.5" height="20" rx="1" fill="#10B981" />
    </svg>
  )
}

function TargetGraphic() {
  return (
    <div className="relative w-24 h-24 rounded-full flex items-center justify-center">
      {/* Outer Cyan Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#00D2FF] shadow-[0_0_30px_rgba(0,210,255,0.4)]"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0,210,255,0.3)',
            '0 0 45px rgba(0,210,255,0.6)',
            '0 0 20px rgba(0,210,255,0.3)',
          ],
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Inner Circles */}
      <div className="w-20 h-20 rounded-full border border-[#00A6FF]/60 flex items-center justify-center bg-gradient-to-br from-[#0A2E6E] via-[#051A40] to-[#030E24]">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="22" stroke="#00D2FF" strokeWidth="2" opacity="0.9" />
          <circle cx="28" cy="28" r="15" stroke="#00D2FF" strokeWidth="1.8" opacity="0.95" />
          <circle cx="28" cy="28" r="9" stroke="#00D2FF" strokeWidth="2" fill="#082454" />
          <circle cx="28" cy="28" r="4" fill="#FFFFFF" />
          {/* Piercing Arrow */}
          <line x1="42" y1="14" x2="30" y2="26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="39,13 44,12 43,17" fill="#FFFFFF" />
          <polygon points="43,17 48,16 47,21" fill="#00D2FF" />
        </svg>
      </div>
    </div>
  )
}

// ─── Mathematical Grid Map for Desktop ViewBox (1200 x 640) ───

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Circulating signal animation
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 9)
    }, 1400)
    return () => clearInterval(timer)
  }, [isPlaying])

  return (
    <section
      id="workflow-process-canvas"
      className="relative py-12 sm:py-16 bg-[#030712] text-white overflow-hidden select-none border-t border-b border-[#00D2FF]/20"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #061536 0%, #030818 55%, #02050E 100%)',
      }}
      aria-label="Content Syndication Through Email Marketing Workflow"
    >
      {/* Background Auras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-[#00D2FF]/[0.08] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[220px] bg-[#0066FF]/[0.06] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#00D2FF]/85 uppercase mb-2">
            CONTENT SYNDICATION THROUGH EMAIL MARKETING
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-tight">
            FROM CONTENT TO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,210,255,0.45)]">
              QUALIFIED LEADS
            </span>
          </h2>

          <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent mx-auto mt-2.5 shadow-[0_0_10px_#00D2FF]" />
        </div>

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP MATHEMATICALLY-ALIGNED SVG CANVAS (1200 x 640)
            Zero Overlapping • Clean Geometric Lines • Proportional Scaling
        ════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block relative w-full aspect-[1200/640] max-w-[1240px] mx-auto">
          
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 640"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="cyan-arr"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#00D2FF" />
              </marker>

              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ─── 13 EXACT CONNECTING PATHWAYS (Clean 90° and Straight Lines) ─── */}

            {/* 1. Content Creation (top 100,290) -> UP to y=170 -> RIGHT to Campaign Strategy (left 238,170) */}
            <path
              d="M 100 290 V 170 H 238"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 2. Content Creation (right 142,330) -> RIGHT to Email Distribution (left 238,330) */}
            <path
              d="M 142 330 H 238"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 3. Email Distribution (top 280,290) -> UP to Campaign Strategy (bottom 280,210) */}
            <path
              d="M 280 290 V 210"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 4. Campaign Strategy (right 322,170) -> RIGHT to Client Approval (left 438,170) */}
            <path
              d="M 322 170 H 438"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 5. Client Approval (right 522,170) -> RIGHT to ICP Data Collection (left 838,170) */}
            <path
              d="M 522 170 H 838"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 6. Email Distribution (right 322,330) -> RIGHT to Engagement Tracking (left 438,330) */}
            <path
              d="M 322 330 H 438"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 7. Engagement Tracking (right 522,330) -> RIGHT to Lead Capture (left 638,330) */}
            <path
              d="M 522 330 H 638"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 8. Lead Capture (right 722,330) -> RIGHT to Human Verification (left 838,330) */}
            <path
              d="M 722 330 H 838"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 9. Human Verification (top 880,290) -> UP to ICP Data Collection (bottom 880,210) */}
            <path
              d="M 880 290 V 210"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 10. Human Verification (right 922,330) -> RIGHT to Target (left 1025,330) */}
            <path
              d="M 922 330 H 1025"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 11. ICP Data Collection (right 922,170) -> RIGHT to x=1080 -> DOWN to Target (top 1080,275) */}
            <path
              d="M 922 170 H 1080 V 275"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 12. Inter-node bus between Col 4 & Col 5 (x=760, y=330) -> DOWN to y=520 -> LEFT to Performance Analytics (right 645,520) */}
            <path
              d="M 760 330 V 520 H 645"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* 13. Performance Analytics (left 515,520) -> LEFT to x=100 -> UP to Content Creation (bottom 100,370) */}
            <path
              d="M 515 520 H 100 V 370"
              fill="none"
              stroke="#00D2FF"
              strokeWidth="2"
              markerEnd="url(#cyan-arr)"
              opacity="0.9"
            />

            {/* ── Animated Traveling Light Particles along Circuits ── */}
            <motion.circle
              r="4"
              fill="#00D2FF"
              filter="url(#cyanGlow)"
              animate={{
                offsetDistance: ['0%', '100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                offsetPath: `path('M 100 290 V 170 H 238 M 322 170 H 438 M 522 170 H 838 M 922 170 H 1080 V 275 M 100 330 H 1025 M 760 330 V 520 H 645 M 515 520 H 100 V 370')`,
              }}
            />

            {/* ═════════ HTML FOREIGN OBJECTS (Exact Mathematical Centers) ═════════ */}

            {/* ── ROW 1: TEXT ABOVE, CARD BELOW ── */}

            {/* 1. Campaign Strategy (cx=280, cy=170) */}
            <foreignObject x="190" y="55" width="180" height="75">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Campaign Strategy</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Define campaign goals, audience segments, content themes and outreach strategy.
                </div>
              </div>
            </foreignObject>
            <foreignObject x="238" y="130" width="84" height="80">
              <CardBox Icon={CampaignStrategyIcon} isActive={activeStep === 1} />
            </foreignObject>

            {/* 2. Client Approval (cx=480, cy=170) */}
            <foreignObject x="390" y="55" width="180" height="75">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Client Approval</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Share POC with the client for review and approval.
                </div>
              </div>
            </foreignObject>
            <foreignObject x="438" y="130" width="84" height="80">
              <CardBox Icon={ClientApprovalIcon} isActive={activeStep === 2} />
            </foreignObject>

            {/* 3. ICP Data Collection (cx=880, cy=170) */}
            <foreignObject x="790" y="55" width="180" height="75">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">ICP Data Collection</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Collect and segment target contacts based on the Ideal Customer Profile (ICP).
                </div>
              </div>
            </foreignObject>
            <foreignObject x="838" y="130" width="84" height="80">
              <CardBox Icon={IcpDataIcon} isActive={activeStep === 3} />
            </foreignObject>

            {/* ── ROW 2: CARD ON TOP, TEXT BELOW ── */}

            {/* 4. Content Creation (cx=100, cy=330) */}
            <foreignObject x="58" y="290" width="84" height="80">
              <CardBox Icon={ContentCreationIcon} isActive={activeStep === 0} />
            </foreignObject>
            <foreignObject x="10" y="380" width="180" height="85">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Content Creation</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Create compelling content (whitepapers, articles, eBooks, case studies, etc.) aligned with campaign objectives.
                </div>
              </div>
            </foreignObject>

            {/* 5. Email Distribution (cx=280, cy=330) */}
            <foreignObject x="238" y="290" width="84" height="80">
              <CardBox Icon={EmailDistributionIcon} isActive={activeStep === 4} />
            </foreignObject>
            <foreignObject x="190" y="380" width="180" height="85">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Email Distribution</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Send targeted emails based on recipient timezones with personalized messaging.
                </div>
              </div>
            </foreignObject>

            {/* 6. Engagement Tracking (cx=480, cy=330) */}
            <foreignObject x="438" y="290" width="84" height="80">
              <CardBox Icon={EngagementTrackingIcon} isActive={activeStep === 5} />
            </foreignObject>
            <foreignObject x="390" y="380" width="180" height="85">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Engagement Tracking</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Track email opens, link clicks and asset downloads in real-time.
                </div>
              </div>
            </foreignObject>

            {/* 7. Lead Capture (cx=680, cy=330) */}
            <foreignObject x="638" y="290" width="84" height="80">
              <CardBox Icon={LeadCaptureIcon} isActive={activeStep === 6} />
            </foreignObject>
            <foreignObject x="590" y="380" width="180" height="85">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Lead Capture</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Engaged contacts are captured as leads in our system.
                </div>
              </div>
            </foreignObject>

            {/* 8. Human Verification (cx=880, cy=330) */}
            <foreignObject x="838" y="290" width="84" height="80">
              <CardBox Icon={HumanVerificationIcon} isActive={activeStep === 7} />
            </foreignObject>
            <foreignObject x="790" y="380" width="180" height="85">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Human Verification</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Our team manually verifies each lead for accuracy, relevance and campaign eligibility.
                </div>
              </div>
            </foreignObject>

            {/* 9. Qualified Lead Delivered Target (cx=1080, cy=330) */}
            <foreignObject x="1032" y="282" width="96" height="96">
              <div className="flex items-center justify-center w-full h-full">
                <TargetGraphic />
              </div>
            </foreignObject>
            <foreignObject x="990" y="390" width="180" height="85">
              <div className="text-center">
                <div className="text-[13px] font-bold text-white tracking-tight leading-snug">Qualified Lead Delivered</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[170px] mx-auto">
                  Verified and qualified leads are delivered to the client for further engagement.
                </div>
              </div>
            </foreignObject>

            {/* ── ROW 3: PERFORMANCE ANALYTICS (cx=580, cy=520) ── */}
            <foreignObject x="515" y="482" width="130" height="76">
              <CardBox Icon={PerformanceAnalyticsIcon} isWide isActive={activeStep === 8} />
            </foreignObject>
            <foreignObject x="460" y="566" width="240" height="70">
              <div className="text-center">
                <div className="text-[12.5px] font-bold text-white tracking-tight leading-snug">Performance Analytics</div>
                <div className="text-[9.5px] text-slate-300 leading-tight mt-1 max-w-[220px] mx-auto">
                  Measure campaign performance and optimize for better results.
                </div>
              </div>
            </foreignObject>

          </svg>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            RESPONSIVE MOBILE / TABLET VIEW (< 1024px)
            Clean, Uncluttered Cards with Perfect Alignment
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-4">
          {RESPONSIVE_ITEMS.map((item, idx) => {
            const Icon = item.icon
            const isTarget = item.isTarget

            if (isTarget) {
              return (
                <div
                  key={item.title}
                  className="sm:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-[#07214A] to-[#030F24] border border-[#00D2FF]/60 shadow-[0_0_20px_rgba(0,210,255,0.3)] flex items-center gap-4 text-left"
                >
                  <div className="shrink-0">
                    <TargetGraphic />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-tight">{item.title}</div>
                    <div className="text-[10px] text-slate-300 leading-snug mt-1">{item.desc}</div>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={item.title}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0B214A]/90 to-[#05132B]/95 border border-[#00D2FF]/40 shadow-md flex items-center gap-3 relative overflow-hidden"
              >
                {/* Cyan LED pin */}
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_#00D2FF]" />
                
                <div className="p-1.5 rounded-xl bg-[#081E44] border border-[#00D2FF]/30 shrink-0">
                  <Icon />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white tracking-tight">{item.title}</div>
                  <div className="text-[10px] text-slate-300 leading-tight mt-0.5">{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── FOOTER TAGLINE ── */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-10 pt-4 border-t border-[#00D2FF]/20">
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#00D2FF]" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-400 uppercase text-center">
            MORE CONTENT. BETTER CONVERSIONS. BRIGHTER OPPORTUNITIES.
          </span>
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#00D2FF]" />
        </div>

      </div>
    </section>
  )
}

/**
 * Reusable Card Box Component with Cyan Corner LED
 */
function CardBox({ Icon, isWide = false, isActive = false }) {
  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
        isWide ? 'w-[130px] h-[76px]' : 'w-[84px] h-[80px]'
      } ${
        isActive
          ? 'border-[#00D2FF] bg-gradient-to-br from-[#103E84] to-[#061E42] shadow-[0_0_24px_rgba(0,210,255,0.45)] scale-105'
          : 'border-[#00D2FF]/40 bg-gradient-to-br from-[#0B214A]/90 to-[#05132B]/95 hover:border-[#00D2FF] hover:shadow-[0_0_15px_rgba(0,210,255,0.25)]'
      }`}
    >
      {/* Cyan corner LED */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_#00D2FF]" />
      
      {/* Icon */}
      <Icon />
    </div>
  )
}

const RESPONSIVE_ITEMS = [
  {
    title: 'Content Creation',
    desc: 'Create compelling content (whitepapers, articles, eBooks, case studies, etc.) aligned with campaign objectives.',
    icon: ContentCreationIcon,
  },
  {
    title: 'Campaign Strategy',
    desc: 'Define campaign goals, audience segments, content themes and outreach strategy.',
    icon: CampaignStrategyIcon,
  },
  {
    title: 'Client Approval',
    desc: 'Share POC with the client for review and approval.',
    icon: ClientApprovalIcon,
  },
  {
    title: 'ICP Data Collection',
    desc: 'Collect and segment target contacts based on the Ideal Customer Profile (ICP).',
    icon: IcpDataIcon,
  },
  {
    title: 'Email Distribution',
    desc: 'Send targeted emails based on recipient timezones with personalized messaging.',
    icon: EmailDistributionIcon,
  },
  {
    title: 'Engagement Tracking',
    desc: 'Track email opens, link clicks and asset downloads in real-time.',
    icon: EngagementTrackingIcon,
  },
  {
    title: 'Lead Capture',
    desc: 'Engaged contacts are captured as leads in our system.',
    icon: LeadCaptureIcon,
  },
  {
    title: 'Human Verification',
    desc: 'Our team manually verifies each lead for accuracy, relevance and campaign eligibility.',
    icon: HumanVerificationIcon,
  },
  {
    title: 'Performance Analytics',
    desc: 'Measure campaign performance and optimize for better results.',
    icon: PerformanceAnalyticsIcon,
  },
  {
    title: 'Qualified Lead Delivered',
    desc: 'Verified and qualified leads are delivered to the client for further engagement.',
    isTarget: true,
  },
]
