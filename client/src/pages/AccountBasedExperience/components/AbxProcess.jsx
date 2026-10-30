import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import WorkflowCanvas from './AbxProcessWorkflow/WorkflowCanvas'
import WorkflowMobileView from './AbxProcessWorkflow/WorkflowMobileView'
import { WORKFLOW_STEPS } from './AbxProcessWorkflow/workflowData'

const TOTAL_STEPS = 10 // Steps 01 to 09 + Final Goal (index 9)
const STEP_DURATION_MS = 2200 // Time spent on each step during autoplay

const AbxProcess = () => {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const timerRef = useRef(null)

  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // 1. Trigger autoplay when section enters viewport
  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          setIsPlaying(true)
        }
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted, prefersReducedMotion])

  // 2. Sequential Step-by-Step Storytelling Loop
  useEffect(() => {
    if (isPlaying && !prefersReducedMotion) {
      const duration = activeStepIndex === 9 ? 3200 : STEP_DURATION_MS
      timerRef.current = setTimeout(() => {
        setActiveStepIndex((prev) => (prev + 1) % TOTAL_STEPS)
      }, duration)
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, activeStepIndex, prefersReducedMotion])

  const handleSelectStep = (idx) => {
    setActiveStepIndex(idx)
  }

  return (
    <section
      id="abx-process"
      ref={sectionRef}
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="How Our Account Based Experience (ABX) Process Works"
    >
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[350px] rounded-full blur-[140px] opacity-20 pointer-events-none"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.15, 0.25, 0.15],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, #0284c7 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] rounded-full blur-[140px] opacity-20 pointer-events-none"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1.1, 0.95, 1.1],
                  opacity: [0.18, 0.28, 0.18],
                }
          }
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ background: 'radial-gradient(circle, #00d2ff 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── SECTION HEADER & TITLE ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center mb-3"
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              How Our Process Works
            </span>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
              <span>Account Based Experience </span>
              <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
                Workflow
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
          >
            A continuous 9-step engineered orchestration connecting marketing aircover, executive touches, and sales follow-up into a unified enterprise experience.
          </motion.p>
        </div>

        {/* ── DESKTOP VIEW (Screen >= 768px) ── */}
        <div className="hidden md:block">
          <WorkflowCanvas
            activeStepIndex={activeStepIndex}
            onSelectStep={handleSelectStep}
            isReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* ── MOBILE VERTICAL ACCORDION (< 768px) ── */}
        <div className="block md:hidden">
          <WorkflowMobileView
            activeStepIndex={activeStepIndex}
            onSelectStep={handleSelectStep}
          />
        </div>
      </div>
    </section>
  )
}

export default AbxProcess

