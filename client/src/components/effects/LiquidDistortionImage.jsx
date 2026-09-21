import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const LiquidDistortionImage = ({ src, alt, className }) => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !imageRef.current) return

    const container = containerRef.current
    const image = imageRef.current
    let isHovering = false
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let animationFrame = null
    let tl = null

    // Create SVG filter for liquid distortion
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    svg.style.position = 'absolute'
    svg.style.visibility = 'hidden'

    const defs = document.createElementNS(svgNS, 'defs')
    const filter = document.createElementNS(svgNS, 'filter')
    filter.setAttribute('id', `liquid-filter-${Math.random().toString(36).substr(2, 9)}`)
    filter.setAttribute('x', '-20%')
    filter.setAttribute('y', '-20%')
    filter.setAttribute('width', '140%')
    filter.setAttribute('height', '140%')

    const turbulence = document.createElementNS(svgNS, 'feTurbulence')
    turbulence.setAttribute('type', 'fractalNoise')
    turbulence.setAttribute('baseFrequency', '0.01')
    turbulence.setAttribute('numOctaves', '1')
    turbulence.setAttribute('result', 'noise')

    const displacement = document.createElementNS(svgNS, 'feDisplacementMap')
    displacement.setAttribute('in', 'SourceGraphic')
    displacement.setAttribute('in2', 'noise')
    displacement.setAttribute('scale', '0')
    displacement.setAttribute('xChannelSelector', 'R')
    displacement.setAttribute('yChannelSelector', 'G')

    filter.appendChild(turbulence)
    filter.appendChild(displacement)
    defs.appendChild(filter)
    svg.appendChild(defs)
    document.body.appendChild(svg)

    image.style.filter = `url(#${filter.getAttribute('id')})`

    const handleMouseMove = (e) => {
      if (!isHovering) return
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }

    const handleMouseEnter = () => {
      isHovering = true
      if (tl) tl.kill()
      
      tl = gsap.timeline()
      tl.to(displacement, {
        attr: { scale: 20 },
        duration: 0.4,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      isHovering = false
      if (tl) tl.kill()
      
      tl = gsap.timeline()
      tl.to(displacement, {
        attr: { scale: 0 },
        duration: 0.5,
        ease: 'power2.inOut'
      })
      tl.to(turbulence, {
        attr: { baseFrequency: '0.01' },
        duration: 0.3,
        ease: 'power2.inOut'
      }, '<')
    }

    const animate = () => {
      if (isHovering) {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.1
        currentY += (mouseY - currentY) * 0.1

        // Update turbulence based on mouse position
        const frequencyX = 0.01 + Math.abs(currentX) * 0.02
        const frequencyY = 0.01 + Math.abs(currentY) * 0.02
        
        gsap.set(turbulence, {
          attr: {
            baseFrequency: `${frequencyX} ${frequencyY}`
          }
        })
      }
      animationFrame = requestAnimationFrame(animate)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    animate()

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrame) cancelAnimationFrame(animationFrame)
      if (tl) tl.kill()
      if (svg.parentNode) document.body.removeChild(svg)
      image.style.filter = ''
    }
  }, [prefersReducedMotion])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-3xl">
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        className={className}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}

export default LiquidDistortionImage
