import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from './TestimonialCard'

const TestimonialsGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  const testimonials = [
    {
      company: 'TechCorp',
      rating: 5,
      testimonial: 'Taraj Global helped us connect with highly relevant B2B prospects and strengthen our sales pipeline. Their targeted lead generation approach delivered quality opportunities for our sales team.',
      companyLogo: '/techcrop.jpg'
    },
    {
      company: 'InnovateTech',
      rating: 5,
      testimonial: 'Working with Taraj Global improved our ability to reach the right decision-makers. Their B2B demand generation strategy helped us create more relevant opportunities and improve our outreach.',
      companyLogo: '/innovatetech.jpg'
    },
    {
      company: 'GlobalFinance',
      rating: 5,
      testimonial: 'Taraj Global provided a targeted B2B lead generation strategy that helped us identify relevant prospects and create new business opportunities. Their team was professional and results-focused.',
      companyLogo: '/globalfinance.jpg'
    },
    {
      company: 'HealthPlus',
      rating: 5,
      testimonial: 'We were impressed with the quality of the B2B data and targeted outreach. Taraj Global helped us reach prospects that closely matched our ideal customer profile and sales objectives.',
      companyLogo: '/healthplus.jpg'
    },
    {
      company: 'RetailMax',
      rating: 5,
      testimonial: 'Taraj Global helped us build a stronger B2B sales pipeline through targeted prospecting and lead generation. Their structured approach made it easier for our team to engage with relevant business prospects.',
      companyLogo: '/retailmax.jpg'
    },
    {
      company: 'EduWorld',
      rating: 5,
      testimonial: 'Their B2B lead generation services helped us reach the right audience and improve our sales outreach. The Taraj Global team was responsive, knowledgeable, and focused on delivering relevant opportunities.',
      companyLogo: '/eduworld.jpg'
    }
  ]

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden relative px-16">
        {/* Left Navigation Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-surface border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/20"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="w-7 h-7 text-text-primary hover:text-primary transition-colors" />
        </button>

        <motion.div
          className="flex gap-8"
          animate={{
            x: `-${currentIndex * (100 / cardsPerView)}%`
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
            mass: 0.8
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.company}
              className="flex-shrink-0"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <TestimonialCard
                company={testimonial.company}
                rating={testimonial.rating}
                testimonial={testimonial.testimonial}
                companyLogo={testimonial.companyLogo}
                index={index}
              />
            </div>
          ))}
        </motion.div>

        {/* Right Navigation Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-surface border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/20"
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-7 h-7 text-text-primary hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: Math.ceil(testimonials.length / cardsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index * cardsPerView)}
            className={`h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / cardsPerView) === index
                ? 'bg-gradient-to-r from-primary to-cta w-8 shadow-lg shadow-primary/30'
                : 'bg-border hover:bg-primary/40 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialsGrid
