import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Container from '@components/layout/Container'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      designation: 'Senior Software Engineer',
      review: 'Working here has been an incredible journey. The company truly invests in employee growth and provides amazing opportunities to learn and advance. The work culture is collaborative and supportive.',
      rating: 5,
      image: null // Placeholder for employee image
    },
    {
      name: 'Michael Chen',
      designation: 'Product Manager',
      review: 'I joined the team 3 years ago and have grown both professionally and personally. The leadership team is approachable and genuinely cares about employee well-being. Best decision I ever made.',
      rating: 5,
      image: null
    },
    {
      name: 'Emily Rodriguez',
      designation: 'UX Designer',
      review: 'The creative freedom and resources available here are unmatched. I\'ve had the opportunity to work on exciting projects with talented people from around the world. The work-life balance is excellent.',
      rating: 5,
      image: null
    },
    {
      name: 'David Kim',
      designation: 'Data Analyst',
      review: 'The training programs and mentorship opportunities have helped me accelerate my career. The company values innovation and encourages employees to bring new ideas to the table.',
      rating: 5,
      image: null
    }
  ]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection
      if (newIndex < 0) return testimonials.length - 1
      if (newIndex >= testimonials.length) return 0
      return newIndex
    })
  }

  const nextSlide = () => paginate(1)
  const prevSlide = () => paginate(-1)

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            What Our Employees Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from our team members about their experience working with us.
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Employee Image Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Quote className="text-primary" size={24} />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    "{testimonials[currentIndex].review}"
                  </p>

                  {/* Name & Designation */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-primary font-medium">
                      {testimonials[currentIndex].designation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
