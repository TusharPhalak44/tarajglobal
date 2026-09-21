import React, { useState, useEffect, useRef } from 'react'
import PipelineHeader from './PipelineHeader'
import PipelineSummary from './PipelineSummary'
import { RowConnector, RowTransitionBus, MobileVerticalRail } from './PipelineSVGPath'

import CampaignStage from './stages/CampaignStage'
import ContentStage from './stages/ContentStage'
import ApprovalStage from './stages/ApprovalStage'
import ICPStage from './stages/ICPStage'
import EmailStage from './stages/EmailStage'
import EngagementStage from './stages/EngagementStage'
import LeadCaptureStage from './stages/LeadCaptureStage'
import VerificationStage from './stages/VerificationStage'
import QualificationStage from './stages/QualificationStage'
import ClientDeliveryStage from './stages/ClientDeliveryStage'

import MechanicalProcessEngine from './MechanicalProcessEngine'
import { Cog, Network } from 'lucide-react'

const TOTAL_STAGES = 10
const DEFAULT_STAGE_DURATION = 1600 // ~16s total pipeline run

export default function ContentSyndicationFlow() {
  const [viewMode, setViewMode] = useState('mechanical') // 'mechanical' | 'network'
  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_STAGE_DURATION)
  const [isCompleted, setIsCompleted] = useState(false)

  const sectionRef = useRef(null)
  const timerRef = useRef(null)

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 1. Viewport Intersection Observer: starts animation when 25-35% in view
  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoTriggered) {
          setHasAutoTriggered(true)
          setIsPlaying(true)
        }
      },
      { threshold: 0.28 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAutoTriggered, prefersReducedMotion])

  // 2. Continuous Animation Simulation Engine
  useEffect(() => {
    if (isPlaying && !prefersReducedMotion) {
      timerRef.current = setInterval(() => {
        setActiveStageIndex((prev) => {
          if (prev >= TOTAL_STAGES - 1) {
            setIsPlaying(false)
            setIsCompleted(true)
            return prev
          }
          return prev + 1
        })
      }, playbackSpeed)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, playbackSpeed, prefersReducedMotion])

  // Controls
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      if (activeStageIndex >= TOTAL_STAGES - 1) {
        setActiveStageIndex(0)
        setIsCompleted(false)
      }
      setIsPlaying(true)
    }
  }

  const handleReplay = () => {
    setIsPlaying(false)
    setIsCompleted(false)
    setActiveStageIndex(0)
    setTimeout(() => {
      setIsPlaying(true)
    }, 150)
  }

  const toggleSpeed = () => {
    setPlaybackSpeed((prev) => (prev === DEFAULT_STAGE_DURATION ? 1000 : DEFAULT_STAGE_DURATION))
  }

  const handleSelectStage = (idx) => {
    setIsPlaying(false)
    setActiveStageIndex(idx)
    if (idx >= TOTAL_STAGES - 1) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="content-syndication-pipeline"
      className="relative py-20 lg:py-28 bg-background border-t border-b border-border/70 transition-colors duration-500 overflow-hidden"
      aria-label="Content Syndication through Email Marketing Lead Generation Process"
    >
      {/* ── Background Cybernetic Circuit Grid & Soft Auras ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(var(--primary) 1.5px, transparent 1.5px), linear-gradient(to right, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[220px] bg-primary/[0.04] dark:bg-primary/[0.08] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[450px] rounded-full blur-[200px] bg-cta/[0.03] dark:bg-cta/[0.06] pointer-events-none" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── SECTION HEADER & CONTROL DECK ── */}
        <PipelineHeader
          activeStageIndex={activeStageIndex}
          totalStages={TOTAL_STAGES}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          onTogglePlay={togglePlay}
          onReplay={handleReplay}
          onToggleSpeed={toggleSpeed}
        />

        {/* ── VIEW MODE SWITCHER TABS ── */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-surface/80 border border-border/80 backdrop-blur-xl shadow-lg">
            <button
              type="button"
              onClick={() => setViewMode('mechanical')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-pointer ${
                viewMode === 'mechanical'
                  ? 'bg-gradient-to-r from-primary to-cta text-white shadow-md shadow-primary/20 scale-[1.02]'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Cog className={`w-4 h-4 ${viewMode === 'mechanical' ? 'animate-spin' : ''}`} />
              <span>⚙️ MECHANICAL PROCESS ENGINE</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('network')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-pointer ${
                viewMode === 'network'
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>📊 3-ROW CONTROL GRID</span>
            </button>
          </div>
        </div>

        {/* ── MECHANICAL ENGINE VIEW (STEP-BY-STEP MACHINERY) ── */}
        {viewMode === 'mechanical' ? (
          <MechanicalProcessEngine
            activeStep={activeStageIndex}
            setActiveStep={setActiveStageIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            onReplay={handleReplay}
          />
        ) : (
          <>
            {/* ════════════════════════════════════════════════════════════════
                DESKTOP OPERATIONAL PIPELINE (3-ROW CONNECTED ARCHITECTURE)
                Row 1: Stages 01 to 05
                Row 2: Stage 06 (Full-width Centerpiece)
                Row 3: Stages 07 to 10
            ════════════════════════════════════════════════════════════════ */}
            <div className="hidden lg:block space-y-4">
          
          {/* ── ROW 1: Stages 01 -> 02 -> 03 -> 04 -> 05 ── */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-4 relative z-10">
              <CampaignStage
                isActive={activeStageIndex === 0}
                isCompleted={activeStageIndex > 0}
                onSelect={() => handleSelectStage(0)}
              />
              <ContentStage
                isActive={activeStageIndex === 1}
                isCompleted={activeStageIndex > 1}
                onSelect={() => handleSelectStage(1)}
              />
              <ApprovalStage
                isActive={activeStageIndex === 2}
                isCompleted={activeStageIndex > 2}
                onSelect={() => handleSelectStage(2)}
              />
              <ICPStage
                isActive={activeStageIndex === 3}
                isCompleted={activeStageIndex > 3}
                onSelect={() => handleSelectStage(3)}
              />
              <EmailStage
                isActive={activeStageIndex === 4}
                isCompleted={activeStageIndex > 4}
                onSelect={() => handleSelectStage(4)}
              />
            </div>
          </div>

          {/* ── TRANSITION CONDUIT 1: Row 1 down to Central Hub (Row 2) ── */}
          <RowTransitionBus
            title="WAVE DISPATCHED"
            subtext="ENTERING LIVE ENGAGEMENT TELEMETRY"
            direction="down"
            isActive={activeStageIndex === 4}
            isPassed={activeStageIndex >= 5}
            accentColor="#FF6D00"
          />

          {/* ── ROW 2: Stage 06 (Full-Width Central Hub) ── */}
          <div className="relative z-10">
            <EngagementStage
              isActive={activeStageIndex === 5}
              isCompleted={activeStageIndex > 5}
              onSelect={() => handleSelectStage(5)}
            />
          </div>

          {/* ── TRANSITION CONDUIT 2: Central Hub down to Row 3 (Conversion & Delivery) ── */}
          <RowTransitionBus
            title="INTENT DETECTED"
            subtext="ENTERING HUMAN QA & CRM DISPATCH"
            direction="down"
            isActive={activeStageIndex === 5}
            isPassed={activeStageIndex >= 6}
            accentColor="#10B981"
          />

          {/* ── ROW 3: Stages 07 -> 08 -> 09 -> 10 ── */}
          <div className="relative">
            <div className="grid grid-cols-4 gap-5 relative z-10">
              <LeadCaptureStage
                isActive={activeStageIndex === 6}
                isCompleted={activeStageIndex > 6}
                onSelect={() => handleSelectStage(6)}
              />
              <VerificationStage
                isActive={activeStageIndex === 7}
                isCompleted={activeStageIndex > 7}
                onSelect={() => handleSelectStage(7)}
              />
              <QualificationStage
                isActive={activeStageIndex === 8}
                isCompleted={activeStageIndex > 8}
                onSelect={() => handleSelectStage(8)}
              />
              <ClientDeliveryStage
                isActive={activeStageIndex === 9}
                isCompleted={activeStageIndex === 9 && isCompleted}
                onSelect={() => handleSelectStage(9)}
                onReplay={handleReplay}
              />
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            MOBILE & TABLET VERTICAL ANIMATED PIPELINE (< 1024px)
            Stages 01 ↓ ... ↓ 10 connected with vertical glowing rail
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden relative space-y-6 pl-4 sm:pl-8">
          <MobileVerticalRail
            activeStageIndex={activeStageIndex}
            totalStages={TOTAL_STAGES}
          />

          <div className="space-y-4">
            <CampaignStage
              isActive={activeStageIndex === 0}
              isCompleted={activeStageIndex > 0}
              onSelect={() => handleSelectStage(0)}
            />
            <ContentStage
              isActive={activeStageIndex === 1}
              isCompleted={activeStageIndex > 1}
              onSelect={() => handleSelectStage(1)}
            />
            <ApprovalStage
              isActive={activeStageIndex === 2}
              isCompleted={activeStageIndex > 2}
              onSelect={() => handleSelectStage(2)}
            />
            <ICPStage
              isActive={activeStageIndex === 3}
              isCompleted={activeStageIndex > 3}
              onSelect={() => handleSelectStage(3)}
            />
            <EmailStage
              isActive={activeStageIndex === 4}
              isCompleted={activeStageIndex > 4}
              onSelect={() => handleSelectStage(4)}
            />
            <EngagementStage
              isActive={activeStageIndex === 5}
              isCompleted={activeStageIndex > 5}
              onSelect={() => handleSelectStage(5)}
            />
            <LeadCaptureStage
              isActive={activeStageIndex === 6}
              isCompleted={activeStageIndex > 6}
              onSelect={() => handleSelectStage(6)}
            />
            <VerificationStage
              isActive={activeStageIndex === 7}
              isCompleted={activeStageIndex > 7}
              onSelect={() => handleSelectStage(7)}
            />
            <QualificationStage
              isActive={activeStageIndex === 8}
              isCompleted={activeStageIndex > 8}
              onSelect={() => handleSelectStage(8)}
            />
            <ClientDeliveryStage
              isActive={activeStageIndex === 9}
              isCompleted={activeStageIndex === 9 && isCompleted}
              onSelect={() => handleSelectStage(9)}
              onReplay={handleReplay}
            />
          </div>
        </div>
          </>
        )}

        {/* ── FINAL SECTION MESSAGE & ACTION ── */}
        <PipelineSummary />

      </div>
    </section>
  )
}
