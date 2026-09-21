import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { WORKFLOW_STAGES } from './workflowData'
import WorkflowStageCard from './WorkflowStageCard'
import { CurvedConnectionRight, CurvedConnectionLeft, MobileWorkflowRail } from './WorkflowSnakePath'
import { Play, Pause, RotateCcw, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

const TOTAL_STAGES = 10
const STAGE_INTERVAL_MS = 1400 // ~14s total sequential story

export default function ContentSyndicationWorkflow() {
  const [activeStage, setActiveStage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const sectionRef = useRef(null)
  const timerRef = useRef(null)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 1. Trigger when entering 25-35% of viewport
  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          setIsPlaying(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted, prefersReducedMotion])

  // 2. Sequential Storytelling Animation Loop (~14s total)
  useEffect(() => {
    if (isPlaying && !prefersReducedMotion) {
      timerRef.current = setInterval(() => {
        setActiveStage((prev) => {
          if (prev >= TOTAL_STAGES - 1) {
            setIsPlaying(false)
            setIsCompleted(true)
            return prev
          }
          return prev + 1
        })
      }, STAGE_INTERVAL_MS)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, prefersReducedMotion])

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      if (activeStage >= TOTAL_STAGES - 1) {
        setActiveStage(0)
        setIsCompleted(false)
      }
      setIsPlaying(true)
    }
  }

  const handleReplay = () => {
    setIsPlaying(false)
    setIsCompleted(false)
    setActiveStage(0)
    setTimeout(() => {
      setIsPlaying(true)
    }, 100)
  }

  const handleSelectStage = (idx) => {
    setIsPlaying(false)
    setActiveStage(idx)
    setIsCompleted(idx >= TOTAL_STAGES - 1)
  }

  // Slices for the 3 Rows:
  // Row 1: 0, 1, 2, 3 (Campaign, Content, Approval, ICP)
  // Row 2: 4, 5, 6 (Distribution, Engagement, Lead)
  // Row 3: 7, 8, 9 (Verification, Qualified, Delivery)
  const row1Stages = WORKFLOW_STAGES.slice(0, 4)
  const row2Stages = WORKFLOW_STAGES.slice(4, 7)
  const row3Stages = WORKFLOW_STAGES.slice(7, 10)

  return (
    <section
      ref={sectionRef}
      id="lead-generation-pipeline"
      className="relative py-16 sm:py-20 lg:py-24 bg-background border-t border-b border-border/70 overflow-hidden transition-colors duration-500"
      aria-label="Content Syndication through Email Marketing Lead Generation Workflow"
    >
      {/* ── Subtle Technical Background: Faint Grid & Soft Radial Glow ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(var(--primary) 1.5px, transparent 1.5px), linear-gradient(to right, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full blur-[180px] bg-primary/[0.05] dark:bg-primary/[0.08] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] rounded-full blur-[160px] bg-cta/[0.03] dark:bg-cta/[0.06] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── TOP: EYEBROW, TITLE, SUBTITLE & REPLAY CONTROL ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-3.5 shadow-xs">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              <span>CONTENT SYNDICATION • LEAD GENERATION</span>
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12]">
              From Content to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#33B8FF] to-cta font-black">
                Qualified Leads
              </span>
            </h2>

            {/* Short Supporting Text */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-2.5 font-normal">
              Watch how targeted content engagement becomes verified, qualified business opportunities.
            </p>
          </div>

          {/* Minimal Controller: Play/Pause, Replay & Status */}
          <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-surface/80 border border-border/80 backdrop-blur-xl shadow-md shrink-0">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-pointer shadow-sm ${
                isPlaying
                  ? 'bg-cta text-white ring-2 ring-cta/30 shadow-cta/20'
                  : 'bg-primary text-white hover:opacity-90 active:scale-95'
              }`}
              aria-label={isPlaying ? 'Pause Workflow' : 'Play Workflow'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY</span>
                </>
              )}
            </button>

            {/* Replay Process Button */}
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-background border border-border/80 text-text-secondary hover:text-primary hover:border-primary/50 text-xs font-mono font-medium transition-colors cursor-pointer"
              title="Replay Process"
              aria-label="Replay Process"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>

            {/* Stage Counter */}
            <div className="px-3 py-1 text-xs font-mono text-text-muted border-l border-border/60">
              <span className="text-[10px] text-text-muted uppercase block font-semibold">STAGE</span>
              <strong className="text-text-primary text-xs">
                {String(activeStage + 1).padStart(2, '0')}/10
              </strong>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            CENTER: CONNECTED 3-ROW OPERATIONAL PIPELINE (DESKTOP)
        ════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block space-y-4">
          
          {/* ── ROW 1: Stages 01 -> 02 -> 03 -> 04 (4 Cards) ── */}
          <div className="grid grid-cols-4 gap-4">
            {row1Stages.map((stage, idx) => (
              <WorkflowStageCard
                key={stage.id}
                stage={stage}
                isActive={activeStage === idx}
                isCompleted={activeStage > idx}
                onSelect={() => handleSelectStage(idx)}
                isReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

          {/* ── Curved Connection 1: Loop down to Row 2 (Right) ── */}
          <CurvedConnectionRight
            isActive={activeStage === 3}
            isPassed={activeStage >= 4}
          />

          {/* ── ROW 2: Stages 05 -> 06 -> 07 (3 Cards) ── */}
          <div className="grid grid-cols-3 gap-5 px-6">
            {row2Stages.map((stage, idx) => {
              const actualIdx = 4 + idx
              return (
                <WorkflowStageCard
                  key={stage.id}
                  stage={stage}
                  isActive={activeStage === actualIdx}
                  isCompleted={activeStage > actualIdx}
                  onSelect={() => handleSelectStage(actualIdx)}
                  isReducedMotion={prefersReducedMotion}
                />
              )
            })}
          </div>

          {/* ── Curved Connection 2: Loop down to Row 3 (Left) ── */}
          <CurvedConnectionLeft
            isActive={activeStage === 6}
            isPassed={activeStage >= 7}
          />

          {/* ── ROW 3: Stages 08 -> 09 -> 10 (3 Cards) ── */}
          <div className="grid grid-cols-3 gap-5 px-6">
            {row3Stages.map((stage, idx) => {
              const actualIdx = 7 + idx
              return (
                <WorkflowStageCard
                  key={stage.id}
                  stage={stage}
                  isActive={activeStage === actualIdx}
                  isCompleted={activeStage > actualIdx}
                  onSelect={() => handleSelectStage(actualIdx)}
                  isReducedMotion={prefersReducedMotion}
                />
              )
            })}
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            MOBILE / TABLET VERTICAL STACK (< 1024px)
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-4">
          <MobileWorkflowRail currentStep={activeStage} totalSteps={TOTAL_STAGES} />

          {WORKFLOW_STAGES.map((stage, idx) => (
            <WorkflowStageCard
              key={stage.id}
              stage={stage}
              isActive={activeStage === idx}
              isCompleted={activeStage > idx}
              onSelect={() => handleSelectStage(idx)}
              isReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* ── BOTTOM: CONCLUDING MESSAGE & SUMMARY STRIP ── */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-5 rounded-2xl bg-surface/70 border border-border/80 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary text-center sm:text-left">
            <span className="text-primary">Targeted Distribution</span>
            <span className="text-text-muted">→</span>
            <span className="text-cta">Real Engagement</span>
            <span className="text-text-muted">→</span>
            <span className="text-emerald-400">Human Verification</span>
            <span className="text-text-muted">→</span>
            <span className="text-text-primary underline decoration-primary decoration-2 underline-offset-4">
              Qualified Leads
            </span>
          </div>

          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-background border border-border/80 text-xs font-mono font-semibold text-text-secondary hover:text-primary hover:border-primary/50 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Process</span>
          </button>
        </div>

      </div>
    </section>
  )
}
