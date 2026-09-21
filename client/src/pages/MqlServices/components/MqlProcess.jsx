import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import WorkflowCanvas from './MqlProcessWorkflow/WorkflowCanvas'
import WorkflowMobileView from './MqlProcessWorkflow/WorkflowMobileView'
import { WORKFLOW_STEPS } from './MqlProcessWorkflow/workflowData'

const TOTAL_STEPS = 10 // Steps 01 to 09 + Final Goal (index 9)
const STEP_DURATION_MS = 2200 // Time spent on each step during autoplay

const MqlProcess = () => {
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
      id="mql-process"
      ref={sectionRef}
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="How Our MQL Generation Process Works"
    >
      {/* ── Ambient Background Lighting (Light & Dark) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient Radial Blue & Cyan Light Orbs */}
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

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── COMPACT SECTION HEADER & TITLE ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          {/* Eyebrow Badge */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-[#00d2ff]/30 bg-white/80 dark:bg-[#031c3d]/60 backdrop-blur-md mb-3 shadow-xs dark:shadow-[0_0_12px_rgba(0,180,255,0.15)]"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#00f0ff] shadow-xs"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-primary dark:text-[#00d2ff] uppercase">
              How Our Process Works
            </span>
          </motion.div>

          {/* Main Title: MQL LEAD GENERATION WORKFLOW */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
              <span className="text-slate-900 dark:text-white">
                MQL LEAD GENERATION{' '}
              </span>
              <span className="text-primary dark:text-[#00A6FF] dark:drop-shadow-[0_0_15px_rgba(0,166,255,0.6)]">
                WORKFLOW
              </span>
            </h2>

            {/* Subtle light bar under title */}
            <div className="relative mt-2.5 flex items-center justify-center">
              <div className="w-36 sm:w-52 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-primary dark:via-[#00d2ff] to-transparent" />
              <div className="absolute w-16 sm:w-24 h-[3px] bg-primary dark:bg-[#00f0ff] blur-[1.5px] rounded-full" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto mt-3 font-normal"
          >
            A systematic 9-stage qualification pipeline identifying, engaging, and scoring verified B2B prospects into sales-ready MQLs.
          </motion.p>
        </div>

        {/* ── COMPACT DESKTOP WORKFLOW CANVAS (Screen >= 1024px) ── */}
        <div className="hidden lg:block">
          <WorkflowCanvas
            activeStepIndex={activeStepIndex}
            onSelectStep={handleSelectStep}
            isReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* ── TABLET & MOBILE WORKFLOW VIEW (Screen < 1024px) ── */}
        <div className="block lg:hidden">
          <WorkflowMobileView
            activeStepIndex={activeStepIndex}
            onSelectStep={handleSelectStep}
            isReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  )
}

export default MqlProcess
