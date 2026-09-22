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
    'M 316,502 328,515 338,523 363,539 389,551 404,556 420,560 438,563 460,565 515,566 677,566 678,565 697,565 697,361 492,361 487,363 480,370 454,401 446,414 444,423 447,429 456,433 463,434 597,435 597,475 595,481 485,482 461,481 436,476 427,473 413,466 402,458 392,448 387,441 383,433 381,426 376,417 334,477 323,491 318,500 Z',
  pixelPaths: [
    'M 740,282 740,332 790,332 790,282 Z',
    'M 859,259 859,298 899,298 899,259 Z',
    'M 740,243 755,266 761,278 778,279 778,277 773,266 771,264 764,263 764,248 762,244 Z',
    'M 767,239 767,262 789,262 789,239 Z',
    'M 828,217 828,238 850,238 849,216 Z',
    'M 723,203 723,240 761,240 760,202 Z',
    'M 783,188 783,215 810,215 810,187 Z',
    'M 849,178 849,197 868,196 868,178 Z',
    'M 826,152 826,169 843,169 843,152 Z',
    'M 794,143 794,155 806,155 806,143 Z',
    'M 861,138 861,148 870,148 870,138 Z'
  ]
}

// Normalized cycle timings for 5.8-second continuous sequence:
// 0.0s -> 1.3s: Blue slowly-slowly becomes visible
// 1.3s -> 2.6s: Orange/Red slowly-slowly becomes visible (Blue stays visible)
// 2.6s -> 3.9s: Green slowly-slowly becomes visible (Blue & Orange stay visible)
// 3.9s -> 5.2s: All 3 are fully visible together in complete brilliance!
// 5.2s -> 5.8s: Smooth gentle breath-out to restart the sequence continuously
const CYCLE_DURATION = 5.8
const CYCLE_TIMES = [0, 0.224, 0.448, 0.672, 0.897, 1]

/**
 * TGAnimatedLogo - Ultra-premium animated SVG emblem for Taraj Global.
 * 
 * User Requirement:
 * - "blue, green, red half circle i want there svg animation which slowly slowly visible
 *    and this is continusely visible and one by one it will show"
 * 
 * Behavior:
 * 1. Shows ONE BY ONE:
 *    - Blue half-circle slowly-slowly appears first.
 *    - Orange/Red half-circle slowly-slowly appears second (while Blue stays visible).
 *    - Green half-circle slowly-slowly appears third (while Blue & Orange stay visible).
 *    - Full logo with data pixels shines together!
 * 2. Continuously visible & looping:
 *    - Each half-circle STAYS visible as the next one appears.
 *    - Smoothly loops continuously (repeat: Infinity).
 * 3. Center TG Monogram:
 *    - Solid, crisp, permanently visible at 100% opacity at all times.
 *    - Strictly NO 360° spinning/rotation.
 */
const TGAnimatedLogo = ({ logoUrl = '/circle.png', alt = 'Taraj Global Logo', className = '' }) => {
  // If user uploaded a completely custom external image (e.g. client banner), display directly
  const isCustomUploaded =
    logoUrl &&
    !logoUrl.includes('circle.png') &&
    !logoUrl.includes('OnlyTG') &&
    !logoUrl.includes('middle.png') &&
    !logoUrl.includes('logo img.png') &&
    !logoUrl.includes('tg_') &&
    (logoUrl.startsWith('http') || logoUrl.startsWith('/uploads'))

  if (isCustomUploaded) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 select-none w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] md:w-[66px] md:h-[66px] ${className}`}>
        <img
          src={logoUrl}
          alt={alt}
          className="w-full h-full object-contain border-0 outline-none ring-0"
        />
      </div>
    )
  }

  return (
    <motion.div
      className={`relative flex items-center justify-center shrink-0 select-none group cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-0 w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] md:w-[66px] md:h-[66px] ${className}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 16 }}
    >
      {/* ── 1. AMBIENT RADIAL ENERGY AURA (CONTINUOUS SOFT BREATHING) ───────── */}
      <svg
        className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none -z-10"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <radialGradient id="tgAuraGlow" cx="47%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.28" />
            <stop offset="45%" stopColor="#FF7A00" stopOpacity="0.14" />
            <stop offset="75%" stopColor="#22C55E" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00A6FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="47"
          cy="50"
          r="46"
          fill="url(#tgAuraGlow)"
          animate={{
            opacity: [0.3, 0.65, 0.3],
            scale: [0.94, 1.05, 0.94]
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>

      {/* ── 2. MAIN SVG LOGO CANVAS ────────────────────────────────────────── */}
      <svg
        viewBox={PATHS.viewBox}
        className="w-full h-full object-contain overflow-visible drop-shadow-[0_2px_8px_rgba(0,166,255,0.22)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vibrant Neon Glow Filters for each color */}
          <filter id="tgBlueGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#00A6FF" floodOpacity="0.75" />
          </filter>

          <filter id="tgOrangeGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF7A00" floodOpacity="0.7" />
          </filter>

          <filter id="tgGreenGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22C55E" floodOpacity="0.65" />
          </filter>

          <filter id="tgMonogramGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="1" stdDeviation="5" floodColor="#00A6FF" floodOpacity="0.38" />
          </filter>

          {/* Linear Gradients for Arc Vibrancy */}
          <linearGradient id="blueArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#00A6FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>

          <linearGradient id="orangeArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="50%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF3D00" />
          </linearGradient>

          <linearGradient id="greenArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>

          {/* Gradients for T and G Monogram */}
          <linearGradient id="tGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="60%" stopColor="#FF8500" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>

          <linearGradient id="gGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00EAFF" />
            <stop offset="55%" stopColor="#00A6FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>


        </defs>

        {/* ── 3. BLUE HALF-CIRCLE ARC: SHOWS 1ST (ONE BY ONE) & STAYS VISIBLE ── */}
        <motion.g
          id="tg-blue-half-circle"
          style={{ originX: '390px', originY: '415.5px' }}
          animate={{
            opacity: [0, 1, 1, 1, 1, 0],
            scale: [0.94, 1.015, 1, 1, 1, 0.94]
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
            fillRule="evenodd"
            filter="url(#tgBlueGlow)"
          />
        </motion.g>

        {/* ── 4. ORANGE/RED TOP HALF-CIRCLE: SHOWS 2ND (ONE BY ONE) & STAYS VISIBLE ── */}
        <motion.g
          id="tg-orange-half-circle"
          style={{ originX: '450px', originY: '415.5px' }}
          animate={{
            opacity: [0, 0, 1, 1, 1, 0],
            scale: [0.94, 0.94, 1.018, 1, 1, 0.94]
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
            fillRule="evenodd"
            filter="url(#tgOrangeGlow)"
          />
        </motion.g>

        {/* ── 5. GREEN BOTTOM HALF-CIRCLE: SHOWS 3RD (ONE BY ONE) & STAYS VISIBLE ── */}
        <motion.g
          id="tg-green-half-circle"
          style={{ originX: '450px', originY: '440px' }}
          animate={{
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0.94, 0.94, 0.94, 1.018, 1, 0.94]
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
              fillRule="evenodd"
              filter="url(#tgGreenGlow)"
            />
          ))}
        </motion.g>

        {/* ── 6. TOP-RIGHT DIGITAL TELEMETRY PIXELS: JOINS WITH GREEN ────────── */}
        <motion.g
          id="tg-digital-squares"
          style={{ originX: '800px', originY: '230px' }}
          animate={{
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0.85, 0.85, 0.85, 1.1, 1, 0.85]
          }}
          transition={{
            duration: CYCLE_DURATION,
            times: CYCLE_TIMES,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {PATHS.pixelPaths.map((p, idx) => {
            const fill = idx % 3 === 0 ? '#00A6FF' : idx % 3 === 1 ? '#FF7A00' : '#22C55E'
            return (
              <path
                key={idx}
                d={p}
                fill={fill}
                fillRule="evenodd"
              />
            )
          })}
        </motion.g>

        {/* ── 7. CENTER "TG" MONOGRAM (SOLID, CRISP & PERMANENT HEADER LOGO) ── */}
        <motion.g
          id="tg-monogram"
          style={{ originX: '430px', originY: '420px' }}
          filter="url(#tgMonogramGlow)"
          animate={{
            y: [0, -2, 0]
          }}
          transition={{
            duration: 3.6,

            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Orange "T" with Metallic Gradient */}
          {PATHS.tLetter.map((p, i) => (
            <path
              key={`t-${i}`}
              d={p}
              fill="url(#tGradient)"
              fillRule="evenodd"
            />
          ))}

          {/* Cyan "G" with Metallic Gradient */}
          <path
            d={PATHS.gLetter}
            fill="url(#gGradient)"
            fillRule="evenodd"
          />
        </motion.g>
      </svg>
    </motion.div>
  )
}

export default TGAnimatedLogo
