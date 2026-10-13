import React from 'react'
import { motion } from 'framer-motion'

// Exact SVG Vector Paths for Taraj Global Emblem
// Coordinate space: viewBox="0 0 936 832", Center: (390, 415.5)
const PATHS = {
  viewBox: '0 0 936 832',
  center: { x: 390, y: 415.5 },
  blueArc:
    'M 384,1 355,4 331,8 292,18 271,25 251,33 214,51 180,72 152,93 120,122 99,145 80,169 58,202 38,240 24,274 12,313 4,353 0,392 0,440 4,479 8,501 16,533 32,578 51,617 69,647 92,678 112,701 133,722 149,736 178,758 196,770 215,781 250,798 287,812 324,822 367,829 393,831 432,831 447,830 480,826 521,817 544,810 582,795 617,777 650,756 683,730 709,705 695,717 674,733 656,745 624,763 595,776 579,782 553,790 522,797 494,801 464,803 443,803 412,801 379,796 357,791 319,779 304,773 269,756 257,749 234,734 219,723 194,702 172,680 157,663 143,645 130,626 114,599 100,570 92,550 85,529 77,498 72,470 69,440 69,392 73,355 78,329 88,293 99,264 117,227 137,195 155,171 167,157 198,126 221,107 248,88 272,74 294,63 318,53 348,43 372,37 400,32 431,29 475,29 506,32 534,37 562,44 583,51 608,61 627,70 655,86 676,100 706,124 688,106 668,89 636,66 609,50 581,36 562,28 523,15 499,9 477,5 454,2 418,0 Z',
  orangeArc:
    'M 732,200 731,197 715,178 688,151 674,139 639,114 622,104 598,92 562,78 549,74 514,66 482,62 442,61 405,64 382,68 361,73 341,79 320,87 304,94 279,107 261,118 244,130 215,154 194,175 181,190 155,226 180,226 192,211 217,186 236,170 267,148 284,138 308,126 332,116 353,109 372,104 397,99 433,95 473,95 495,97 530,103 563,112 582,119 609,131 631,143 660,162 686,183 720,218 721,200 Z',
  greenArc: [
    'M 775,388 775,394 776,395 777,406 777,450 774,478 769,503 763,525 750,559 738,583 726,603 711,624 697,641 671,667 653,682 635,695 612,709 583,723 553,734 526,741 494,746 483,747 437,747 418,745 395,741 371,735 350,728 333,721 295,701 277,689 251,668 223,640 212,627 200,611 189,594 179,575 150,574 157,591 170,616 184,638 199,658 211,672 234,695 253,711 285,733 315,749 350,763 374,770 403,776 430,779 476,779 488,778 524,772 547,766 578,755 611,739 631,727 656,709 681,687 699,668 716,647 734,620 749,592 760,566 769,538 776,507 780,474 780,426 776,393 775,392 Z',
    'M 157,337 145,338 144,343 141,349 133,379 127,417 126,430 126,471 128,492 131,511 136,531 139,528 153,508 152,500 148,485 145,465 143,424 144,402 146,384 150,361 Z'
  ],
  tLetter: [
    'M 737,246 717,245 716,238 695,238 693,239 680,253 632,317 628,321 628,323 676,323 683,316 695,301 714,275 Z',
    'M 123,565 246,565 364,399 380,375 393,358 409,342 416,337 428,331 442,327 453,325 477,323 605,322 611,312 626,294 667,240 667,238 161,238 146,258 111,301 96,323 293,324 256,378 179,485 Z'
  ],
  gLetter:
    'M 316,502 328,515 338,523 363,539 389,551 404,556 420,560 438,563 460,565 515,566 677,566 678,565 697,565 697,361 492,361 487,363 480,370 454,401 446,414 444,423 447,429 456,433 463,434 597,435 597,475 595,481 485,482 461,481 436,476 427,473 413,466 402,458 392,448 387,441 383,433 381,426 376,417 334,477 323,491 318,500 Z'
}

const DIGITAL_PIXELS = [
  { id: 'p0', d: 'M 740,282 740,332 790,332 790,282 Z', fill: '#0088FF', stroke: '#00E5FF', origin: '765px 307px', times: [0, 0.12, 0.24, 0.42, 0.58, 0.64, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.2, 1, 1.06, 1, 0] },
  { id: 'p1', d: 'M 723,203 723,240 761,240 760,202 Z', fill: '#00B4FF', stroke: '#80E8FF', origin: '742px 221px', times: [0, 0.12, 0.24, 0.42, 0.60, 0.66, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.25, 1, 0.95, 1, 0] },
  { id: 'p2', d: 'M 767,239 767,262 789,262 789,239 Z', fill: '#00F5FF', stroke: '#A6FCFF', origin: '778px 250px', times: [0, 0.12, 0.24, 0.42, 0.62, 0.68, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.3, 1, 1.08, 1, 0] },
  { id: 'p3', d: 'M 740,243 755,266 761,278 778,279 778,277 773,266 771,264 764,263 764,248 762,244 Z', fill: '#00E676', stroke: '#69F0AE', origin: '759px 261px', times: [0, 0.12, 0.24, 0.42, 0.60, 0.66, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.2, 1, 1.04, 1, 0] },
  { id: 'p4', d: 'M 849,178 849,197 868,196 868,178 Z', fill: '#00E676', stroke: '#B9F6CA', origin: '858px 187px', times: [0, 0.12, 0.24, 0.42, 0.64, 0.70, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.3, 1, 0.94, 1, 0] },
  { id: 'p5', d: 'M 859,259 859,298 899,298 899,259 Z', fill: '#FF6D00', stroke: '#FFB74D', origin: '879px 278px', times: [0, 0.12, 0.24, 0.42, 0.58, 0.65, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.22, 1, 1.05, 1, 0] },
  { id: 'p6', d: 'M 828,217 828,238 850,238 849,216 Z', fill: '#FF9100', stroke: '#FFE082', origin: '839px 227px', times: [0, 0.12, 0.24, 0.42, 0.63, 0.69, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.28, 1, 1.08, 1, 0] },
  { id: 'p7', d: 'M 783,188 783,215 810,215 810,187 Z', fill: '#FF6D00', stroke: '#FFA726', origin: '796px 201px', times: [0, 0.12, 0.24, 0.42, 0.62, 0.68, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.25, 1, 0.95, 1, 0] },
  { id: 'p8', d: 'M 826,152 826,169 843,169 843,152 Z', fill: '#FFAB00', stroke: '#FFE082', origin: '834px 160px', times: [0, 0.12, 0.24, 0.42, 0.66, 0.72, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.35, 1, 1.1, 1, 0] },
  { id: 'p9', d: 'M 794,143 794,155 806,155 806,143 Z', fill: '#00F5FF', stroke: '#E0F7FA', origin: '800px 149px', times: [0, 0.12, 0.24, 0.42, 0.68, 0.74, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.4, 1, 0.92, 1, 0] },
  { id: 'p10', d: 'M 861,138 861,148 870,148 870,138 Z', fill: '#FF5722', stroke: '#FFAB91', origin: '865px 143px', times: [0, 0.12, 0.24, 0.42, 0.70, 0.76, 0.78, 0.86, 0.92, 1], op: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0], sc: [0, 0, 0, 0, 0, 1.45, 1, 1.12, 1, 0] }
]

// Normalized cycle timings for 6.4-second continuous sequence:
// 1. 0.00 -> 0.12: Letter 'T' becomes visible first
// 2. 0.12 -> 0.24: Letter 'G' becomes visible slightly after (T stays visible)
// 3. 0.24 -> 0.42: Blue Arc becomes visible (T & G stay visible)
// 4. 0.42 -> 0.60: Orange Arc becomes visible (T, G, Blue stay visible)
// 5. 0.60 -> 0.78: Green Arc & Digital Telemetry Pixels burst & assemble (All elements stay visible)
// 6. 0.78 -> 0.92: Full logo assembly in complete brilliant unity with active pixel shimmer!
// 7. 0.92 -> 1.00: Smooth transition to loop continuously
const CYCLE_DURATION = 6.4
const CYCLE_TIMES = [0, 0.12, 0.24, 0.42, 0.60, 0.78, 0.92, 1]

/**
 * TGAnimatedLogo - Ultra-sharp animated SVG emblem for Taraj Global.
 * 
 * Sequential Flow:
 * 1. First 'T' is visible
 * 2. Then slightly after, 'G' becomes visible
 * 3. Then Blue Arc becomes visible
 * 4. Then Orange Arc becomes visible
 * 5. Then Green Arc & Data Pixels materialize with staggered burst animation
 * 6. Complete emblem shines together with live pixel pulse and loops continuously
 * 
 * Vector Sharpness:
 * - Pure SVG geometric precision (no blurry raster filters)
 * - Fine contour strokes on paths to eliminate subpixel anti-aliasing fuzziness
 * - Ultra-vibrant high-contrast linear gradients & crisp-edge data pixels
 */
const TGAnimatedLogo = ({ alt = 'Taraj Global Logo', className = '' }) => {
  return (
    <motion.div
      className={`relative flex items-center justify-center shrink-0 select-none group cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-0 w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] md:w-[70px] md:h-[70px] ${className}`}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased'
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
    >
      {/* ── 1. AMBIENT RADIAL ENERGY AURA (SUBTLE BACKGROUND DEPTH) ─────────── */}
      <svg
        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none -z-10"
        viewBox="0 0 100 100"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <radialGradient id="tgAuraGlow" cx="47%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#FF7A00" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#22C55E" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#00A6FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="47"
          cy="50"
          r="46"
          fill="url(#tgAuraGlow)"
          animate={{
            opacity: [0.3, 0.55, 0.3],
            scale: [0.95, 1.04, 0.95]
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>

      {/* ── 2. MAIN SVG LOGO CANVAS (MAXIMUM VECTOR SHARPNESS & CLARITY) ─────── */}
      <svg
        viewBox={PATHS.viewBox}
        className="w-full h-full object-contain overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="crisp-edges"
      >
        <defs>
          {/* High-Contrast Vivid Linear Gradients for Razor-Sharp Clarity */}
          <linearGradient id="blueArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F7FF" />
            <stop offset="35%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#0050FF" />
          </linearGradient>

          <linearGradient id="orangeArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD000" />
            <stop offset="45%" stopColor="#FF7700" />
            <stop offset="100%" stopColor="#FF2200" />
          </linearGradient>

          <linearGradient id="greenArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E676" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#128A3E" />
          </linearGradient>

          {/* Gradients for T and G Monogram with Deep Vivid Saturation */}
          <linearGradient id="tGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE000" />
            <stop offset="48%" stopColor="#FF7700" />
            <stop offset="100%" stopColor="#FF2A00" />
          </linearGradient>

          <linearGradient id="gGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="48%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#0055FF" />
          </linearGradient>
        </defs>

        {/* ── 3. LETTER 'T': SHOWS 1ST (ONE BY ONE) & STAYS VISIBLE ──────────── */}
        <motion.g
          id="tg-letter-t"
          style={{ originX: '380px', originY: '380px' }}
          animate={{
            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
            scale: [0.92, 1.025, 1, 1, 1, 1, 1, 0.92]
          }}
          transition={{
            duration: CYCLE_DURATION,
            times: CYCLE_TIMES,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {PATHS.tLetter.map((p, i) => (
            <path
              key={`t-${i}`}
              d={p}
              fill="url(#tGradient)"
              stroke="#FF8800"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fillRule="evenodd"
            />
          ))}
        </motion.g>

        {/* ── 4. LETTER 'G': SHOWS 2ND (SLIGHTLY AFTER T) & STAYS VISIBLE ─────── */}
        <motion.g
          id="tg-letter-g"
          style={{ originX: '480px', originY: '450px' }}
          animate={{
            opacity: [0, 0, 1, 1, 1, 1, 1, 0],
            scale: [0.92, 0.92, 1.025, 1, 1, 1, 1, 0.92]
          }}
          transition={{
            duration: CYCLE_DURATION,
            times: CYCLE_TIMES,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <path
            d={PATHS.gLetter}
            fill="url(#gGradient)"
            stroke="#00D4FF"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fillRule="evenodd"
          />
        </motion.g>

        {/* ── 5. BLUE ARC: SHOWS 3RD & STAYS VISIBLE ──────────────────────────── */}
        <motion.g
          id="tg-blue-arc"
          style={{ originX: '390px', originY: '415.5px' }}
          animate={{
            opacity: [0, 0, 0, 1, 1, 1, 1, 0],
            scale: [0.94, 0.94, 0.94, 1.018, 1, 1, 1, 0.94]
          }}
          transition={{
            duration: CYCLE_DURATION,
            times: CYCLE_TIMES,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <path
            d={PATHS.blueArc}
            fill="url(#blueArcGradient)"
            stroke="#00C8FF"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fillRule="evenodd"
          />
        </motion.g>

        {/* ── 6. ORANGE ARC: SHOWS 4TH & STAYS VISIBLE ────────────────────────── */}
        <motion.g
          id="tg-orange-arc"
          style={{ originX: '450px', originY: '415.5px' }}
          animate={{
            opacity: [0, 0, 0, 0, 1, 1, 1, 0],
            scale: [0.94, 0.94, 0.94, 0.94, 1.018, 1, 1, 0.94]
          }}
          transition={{
            duration: CYCLE_DURATION,
            times: CYCLE_TIMES,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <path
            d={PATHS.orangeArc}
            fill="url(#orangeArcGradient)"
            stroke="#FF8800"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fillRule="evenodd"
          />
        </motion.g>

        {/* ── 7. GREEN ARC: SHOWS 5TH & STAYS VISIBLE ─────────────────────────── */}
        <motion.g
          id="tg-green-arc"
          style={{ originX: '450px', originY: '440px' }}
          animate={{
            opacity: [0, 0, 0, 0, 0, 1, 1, 0],
            scale: [0.94, 0.94, 0.94, 0.94, 0.94, 1.018, 1, 0.94]
          }}
          transition={{
            duration: CYCLE_DURATION,
            times: CYCLE_TIMES,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {PATHS.greenArc.map((pathStr, i) => (
            <path
              key={`anim-g-${i}`}
              d={pathStr}
              fill="url(#greenArcGradient)"
              stroke="#00E676"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fillRule="evenodd"
            />
          ))}
        </motion.g>

        {/* ── 8. DIGITAL TELEMETRY PIXELS: INDIVIDUAL STAGGERED BURST & SHIMMER ── */}
        <g id="tg-digital-pixel-cluster" shapeRendering="geometricPrecision">
          {DIGITAL_PIXELS.map((pixel) => (
            <motion.path
              key={pixel.id}
              d={pixel.d}
              fill={pixel.fill}
              stroke={pixel.stroke}
              strokeWidth="1.5"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              fillRule="evenodd"
              shapeRendering="geometricPrecision"
              style={{
                transformOrigin: pixel.origin
              }}
              animate={{
                opacity: pixel.op,
                scale: pixel.sc
              }}
              transition={{
                duration: CYCLE_DURATION,
                times: pixel.times,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </g>
      </svg>
    </motion.div>
  )
}

export default TGAnimatedLogo
