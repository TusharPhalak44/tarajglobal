import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const services = [
  {
    id: 1,
    title: 'Lead Generation',
    description: 'Generate high-quality B2B leads through targeted campaigns. Identify and engage decision-makers, build your sales pipeline.',
    primaryButton: 'Learn More',
    link: '/services',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80'
  },
  {
    id: 2,
    title: 'Account-Based Marketing',
    description: 'Target high-value accounts with personalized campaigns. Align marketing and sales efforts to engage key accounts.',
    primaryButton: 'Explore ABM',
    link: '/abm',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80'
  },
  {
    id: 3,
    title: 'Content Syndication',
    description: 'Distribute your content to generate qualified leads. Reach targeted audiences through premium channels.',
    primaryButton: 'Get Started',
    link: '/content-syndication',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'
  },
  {
    id: 4,
    title: 'Email Marketing',
    description: 'Execute B2B email campaigns that convert. Build targeted lists, personalize outreach, automate follow-ups.',
    primaryButton: 'View Solutions',
    link: '/b2b-email-marketing',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80'
  },
  {
    id: 5,
    title: 'Demand Generation',
    description: 'Create demand for your products and services. Build brand awareness, engage prospects across channels.',
    primaryButton: 'Generate Demand',
    link: '/demand-generation',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
  },
]

const AIAgentCarousel = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const cards = cardRefs.current

    if (!section || !viewport || cards.length === 0) return

    const viewportWidth = viewport.offsetWidth
    const viewportHeight = viewport.offsetHeight

    // Define concrete path checkpoints for LARGE inverted-U arch
    // P0: LOWER-RIGHT corner (start/hidden) - FAR outside viewport
    const p0 = { x: viewportWidth * 0.8, y: viewportHeight * 0.6 }
    // P1: RIGHT SIDE, moved upward (clear upward movement)
    const p1 = { x: viewportWidth * 0.6, y: viewportHeight * 0.2 }
    // P2: TOP-RIGHT (upper right of arch)
    const p2 = { x: viewportWidth * 0.3, y: -viewportHeight * 0.3 }
    // P3: TOP-CENTER (highest point) - VERY HIGH
    const p3 = { x: 0, y: -viewportHeight * 0.5 }
    // P4: TOP-LEFT (upper left of arch)
    const p4 = { x: -viewportWidth * 0.3, y: -viewportHeight * 0.3 }
    // P5: LEFT SIDE, moving downward
    const p5 = { x: -viewportWidth * 0.6, y: viewportHeight * 0.2 }
    // P6: BOTTOM-LEFT corner (end/hidden) - FAR outside viewport
    const p6 = { x: -viewportWidth * 0.8, y: viewportHeight * 0.6 }

    // Create SVG path for LARGE inverted-U arch with dramatic upward/downward segments
    const path = `M ${p0.x} ${p0.y} 
                 C ${viewportWidth * 0.75} ${viewportHeight * 0.4}, 
                   ${viewportWidth * 0.65} ${viewportHeight * 0.3}, 
                   ${p1.x} ${p1.y}
                 S ${viewportWidth * 0.45} ${-viewportHeight * 0.25}, 
                   ${p2.x} ${p2.y}
                 S ${viewportWidth * 0.15} ${-viewportHeight * 0.45}, 
                   ${p3.x} ${p3.y}
                 S ${-viewportWidth * 0.15} ${-viewportHeight * 0.45}, 
                   ${p4.x} ${p4.y}
                 S ${-viewportWidth * 0.45} ${-viewportHeight * 0.25}, 
                   ${p5.x} ${p5.y}
                 S ${-viewportWidth * 0.75} ${viewportHeight * 0.4}, 
                   ${p6.x} ${p6.y}`

    // Set section height for scroll distance
    gsap.set(section, { height: window.innerHeight * 3 })

    // Create scroll-driven animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Animate each card along the curved path
    cards.forEach((card, index) => {
      const delay = index * 0.12
      
      // Set initial position (hidden at lower-right)
      gsap.set(card, {
        scale: 0.5,
        opacity: 0,
        rotation: -10,
      })

      // Animate along the path
      tl.to(card, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        scale: (progress) => {
          // Scale up in middle (top of curve), scale down at ends
          return 0.5 + (Math.sin(progress * Math.PI) * 0.5)
        },
        opacity: (progress) => {
          // Fade in at start, fade out at end
          // Cards visible during middle 80% of journey
          if (progress < 0.1) return progress * 10
          if (progress > 0.9) return (1 - progress) * 10
          return 1
        },
        ease: 'none',
      }, delay)
    })

    // Cleanup
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <section className="relative w-full py-[60px] overflow-hidden">
      {/* Animated gradient background with brand colors */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00A6FF]/20 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF6D00]/15 blur-[80px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-[60px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4">
            Our Expertise
          </h2>
        </motion.div>

        {/* Cards viewport */}
        <div 
          ref={viewportRef}
          className="relative overflow-hidden h-[70vh]"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              ref={(el) => (cardRefs.current[index] = el)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute flex-shrink-0 w-[350px] md:w-[400px] will-change-transform"
              style={{ top: '50%', left: '50%' }}
            >
              <div className={`rounded-2xl overflow-hidden shadow-xl ${isDark ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'bg-white shadow-lg'}`}>
                {/* Card Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                  <Link to={service.link}>
                    <button className={`w-full py-3 px-4 rounded-full font-semibold transition-all ${
                      isDark 
                        ? 'bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] text-white hover:shadow-lg hover:shadow-[#00A6FF]/20' 
                        : 'bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] text-white hover:shadow-lg'
                    }`}>
                      {service.primaryButton}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AIAgentCarousel
