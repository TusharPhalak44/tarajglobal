import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

const LEADERSHIP_MEMBERS = [
  {
    id: 'hanmant',
    name: 'Hanmant Dhotre',
    position: 'Vision, leadership & business direction',
    introduction:
      'Hanmant Dhotre leads TaRaj Global with a clear vision to help businesses build stronger and more predictable B2B growth. As Founder and CEO, he focuses on innovation, data-driven strategies, and delivering meaningful business outcomes. His leadership continues to shape TaRaj Global as a trusted partner for organizations looking to create better opportunities and sustainable growth.',
    image: '/Hanmant-Dhotre.webp',
    social: {
      linkedin: 'https://www.linkedin.com/in/hanmant-dhotre-3799b425/',
      email: 'hanmant.dhotre@tarajglobal.com',
    },
  },
  {
    id: 'tushar',
    name: 'Tushar Phalak',
    position: 'Growth, marketing & demand generation',
    introduction:
      'Tushar Phalak drives TaRaj Global’s growth and marketing strategy, with a strong focus on B2B demand generation, digital marketing, and scalable growth initiatives. He combines data-driven thinking with market-focused strategies to strengthen the brand, expand opportunities, and build marketing systems that deliver measurable business impact.',
    image: '/Tushar-Phalak-1.webp',
    social: {
      linkedin: 'https://www.linkedin.com/in/tushar-phalak-b44088101/',
      email: 'tushar@tarajglobal.com',
    },
  },
  {
    id: 'abhishek',
    name: 'Abhishek Rikibe',
    position: 'Client success, relationships & partnerships',
    introduction:
      'Abhishek Rikibe leads Client Success and Partnerships at TaRaj Global, focusing on building trusted relationships and creating long-term business value. He works closely with clients to understand their goals, connect their needs with effective solutions, and foster strong collaboration that supports sustainable growth and lasting partnerships.',
    image: '/Abhishek-Rikibe.webp',
    social: {
      linkedin: 'https://www.linkedin.com/in/abhishek-rikibe-834196231/',
      email: 'abhishek@tarajglobal.com',
    },
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   LINE-BY-LINE BIO SCROLL REVEAL COMPONENT
   Dynamically and responsively measures rendered line wraps and reveals
   each line progressively upon scroll entrance.
───────────────────────────────────────────────────────────────────────────── */
const LineByLineBio = ({ text, className, isProfileInView }) => {
  const containerRef = useRef(null)
  const [lines, setLines] = useState([])
  const prefersReducedMotion = useReducedMotion()

  const calculateLines = () => {
    if (!containerRef.current) return
    const wordElements = containerRef.current.querySelectorAll('.measure-word')
    if (!wordElements || wordElements.length === 0) return

    const groupedLines = []
    let currentLineY = null
    let currentLineWords = []

    wordElements.forEach((el) => {
      const top = el.offsetTop
      if (currentLineY === null) {
        currentLineY = top
        currentLineWords.push(el.textContent.trim())
      } else if (Math.abs(top - currentLineY) <= 8) {
        currentLineWords.push(el.textContent.trim())
      } else {
        if (currentLineWords.length > 0) {
          groupedLines.push(currentLineWords.join(' '))
        }
        currentLineY = top
        currentLineWords = [el.textContent.trim()]
      }
    })

    if (currentLineWords.length > 0) {
      groupedLines.push(currentLineWords.join(' '))
    }

    if (groupedLines.length > 0) {
      setLines(groupedLines)
    }
  }

  useEffect(() => {
    // Initial calculation
    calculateLines()

    // Recalculate once web fonts have loaded
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(calculateLines)
    }

    // Observe container resize for true responsive line wrapping across devices
    let resizeObserver
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateLines()
      })
      resizeObserver.observe(containerRef.current)
    }

    const handleResize = () => calculateLines()
    window.addEventListener('resize', handleResize)

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [text])

  if (prefersReducedMotion) {
    return <p className={className}>{text}</p>
  }

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      {/* Invisible measurement layer to compute actual word line-breaks across breakpoints */}
      <p
        className="invisible absolute top-0 left-0 right-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {text.split(' ').map((word, i) => (
          <span key={i} className="measure-word inline">
            {word}{' '}
          </span>
        ))}
      </p>

      {/* Rendered Line-by-Line Staggered Scroll Animation */}
      {lines.length > 0 ? (
        <div className="space-y-1">
          {lines.map((line, idx) => (
            <motion.div
              key={`${idx}-${line.slice(0, 10)}`}
              initial={{ opacity: 0, y: 10 }}
              animate={isProfileInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.42,
                delay: 0.18 + idx * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block leading-relaxed"
            >
              {line}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isProfileInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="leading-relaxed"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   LEADER PROFILE ROW (Independent Scroll Observer & Responsive Zig-Zag)
───────────────────────────────────────────────────────────────────────────── */
const LeaderRow = ({ member, index, isEven, prefersReducedMotion }) => {
  const rowRef = useRef(null)
  const isRowInView = useInView(rowRef, { once: true, amount: 0.25 })

  const profileVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const isSecondRow = index === 1

  return (
    <motion.div
      ref={rowRef}
      variants={prefersReducedMotion ? {} : profileVariants}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isRowInView ? 'visible' : 'hidden'}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={prefersReducedMotion ? {} : { y: -3 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full lg:max-w-[1080px] lg:mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 rounded-3xl p-4 sm:p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30"
      >
        {/* ── PORTRAIT COLUMN (Ordered 2 on Desktop for Row 2) ──────────────── */}
        <div
          className={`relative flex-shrink-0 flex flex-col items-center ${
            isSecondRow ? 'order-1 lg:order-2' : ''
          }`}
        >
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 rounded-full bg-primary/20 blur-3xl pointer-events-none"
            style={{ transform: 'scale(1.2)' }}
          />

          {/* Floating container with subtle idle motion */}
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Accent ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg, var(--primary), var(--cta), var(--primary))`,
                padding: '3px',
                borderRadius: '50%',
                filter: 'blur(0.5px)',
              }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </div>

            {/* Main portrait with hover scale micro-animation */}
            <motion.div
              variants={prefersReducedMotion ? {} : imageVariants}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-76 lg:h-76 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 cursor-pointer"
              style={{
                boxShadow:
                  '0 20px 40px -12px rgba(var(--primary-rgb), 0.22), 0 0 0 4px rgba(var(--primary-rgb), 0.1)',
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ objectPosition: 'center 25%' }}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none'
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'flex'
                  }
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-primary/10"
                style={{ display: 'none' }}
              >
                <span className="text-5xl">👤</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links with Hover Scale */}
          <div className="flex gap-3.5 mt-5 relative z-10">
            <motion.a
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm min-w-[44px] min-h-[44px]"
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin className="w-4.5 h-4.5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={`mailto:${member.social.email}`}
              className="w-11 h-11 rounded-full bg-cta/10 border-2 border-cta/30 flex items-center justify-center text-cta hover:bg-cta hover:text-white hover:border-cta transition-all duration-300 shadow-sm min-w-[44px] min-h-[44px]"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-4.5 h-4.5" />
            </motion.a>
          </div>
        </div>

        {/* ── CONTENT COLUMN ──────────────────────────────────────────────── */}
        <div
          className={`flex-1 text-center lg:text-left ${
            isSecondRow ? 'order-2 lg:order-1' : ''
          }`}
        >
          {/* Name */}
          <motion.h3
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={isRowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-1.5 sm:mb-2 tracking-tight"
          >
            {member.name}
          </motion.h3>

          {/* Position */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={isRowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.14 }}
            className="text-base sm:text-lg md:text-xl font-semibold bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent mb-3 sm:mb-4"
          >
            {member.position}
          </motion.p>

          {/* Line-by-Line Bio Scroll Reveal */}
          <LineByLineBio
            text={member.introduction}
            isProfileInView={isRowInView}
            className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 font-normal [text-wrap:pretty]"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN OUR TEAM COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export const OurTeam = () => {
  const prefersReducedMotion = useReducedMotion()

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      id="leadership"
      aria-label="Meet Our Leaders"
      className="relative pt-9 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-background"
    >
      {/* Background with alternating subtle geometric zones */}
      <div className="absolute inset-0 bg-background pointer-events-none select-none">
        {/* Zone 1 - Behind Leader 1 (left side) */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-[45%] opacity-[0.03]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, transparent 70%)',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
          }}
        />

        {/* Zone 2 - Behind Leader 2 (right side) */}
        <motion.div
          className="absolute top-[35%] right-0 w-1/2 h-[45%] opacity-[0.03]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'linear-gradient(225deg, var(--cta) 0%, transparent 70%)',
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        />

        {/* Zone 3 - Behind Leader 3 (left side) */}
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-[45%] opacity-[0.03]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, transparent 70%)',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
          }}
        />

        {/* Subtle curved accent shapes */}
        <div
          className="absolute top-[15%] left-[10%] w-[450px] h-[450px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          }}
        />

        <div
          className="absolute bottom-[15%] right-[10%] w-[380px] h-[380px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--cta) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── SECTION HEADING ───────────────────────────────────────────── */}
        <motion.div
          variants={prefersReducedMotion ? {} : headingVariants}
          initial={prefersReducedMotion ? {} : 'hidden'}
          whileInView={prefersReducedMotion ? {} : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-10 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3 tracking-tight">
            MEET OUR{' '}
            <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
              LEADERS
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
        </motion.div>

        {/* ── LEADERSHIP PROFILES (ZIG-ZAG WITH LINE-BY-LINE BIO REVEAL) ── */}
        <div className="space-y-12 sm:space-y-14 lg:space-y-16">
          {LEADERSHIP_MEMBERS.map((member, index) => {
            const isEven = index % 2 === 0
            return (
              <LeaderRow
                key={member.id}
                member={member}
                index={index}
                isEven={isEven}
                prefersReducedMotion={prefersReducedMotion}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurTeam
