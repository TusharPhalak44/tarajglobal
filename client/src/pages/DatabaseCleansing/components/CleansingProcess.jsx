import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import WorkflowCanvas from './CleansingProcessWorkflow/WorkflowCanvas'
import WorkflowMobileView from './CleansingProcessWorkflow/WorkflowMobileView'
import { WORKFLOW_STEPS } from './CleansingProcessWorkflow/workflowData'

const TOTAL_STEPS = 10 // Steps 01 to 09 + Final Goal (index 9)
const STEP_DURATION_MS = 2200 // Time spent on each step during autoplay

const CleansingProcess = () => {
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
      timerRef.current = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % TOTAL_STEPS)
      }, STEP_DURATION_MS)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, prefersReducedMotion])

  const handleSelectStep = (idx) => {
    setActiveStepIndex(idx)
  }

  return (
    <section
      id="cleansing-process"
      ref={sectionRef}
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="How Our Database Cleansing Process Works"
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

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
            <span className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              End-to-End Methodology
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-slate-900 dark:text-white">How Our </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">
              Cleansing Process
            </span>{' '}
            <span className="text-slate-900 dark:text-white">Works</span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
          >
            A 9-step automated and human-verified framework that scrubs, deduplicates, and restores your CRM into a pristine high-performance revenue engine.
          </motion.p>
        </div>

        {/* ── DESKTOP WORKFLOW CANVAS (>= 1024px) ── */}
        <div className="hidden lg:block relative py-2">
          <WorkflowCanvas
            activeStepIndex={activeStepIndex}
            onSelectStep={handleSelectStep}
            isReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* ── MOBILE / TABLET WORKFLOW (< 1024px) ── */}
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

export default CleansingProcess
