import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingGear, ConveyorTrack, MechanicalGauge } from './MechanicalParts'
import MechanicalStationChamber from './MechanicalStationChamber'
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react'

const STATIONS = [
  { num: '01', name: 'Hopper Intake', label: 'Campaign Launch', accent: '#00A6FF' },
  { num: '02', name: 'Content Press', label: 'POC Created', accent: '#00A6FF' },
  { num: '03', name: 'Lock Gate', label: 'Client Approval', accent: '#10B981' },
  { num: '04', name: 'ICP Centrifuge', label: 'Data Collection', accent: '#00A6FF' },
  { num: '05', name: 'Dispatch Tubes', label: 'Email Distribution', accent: '#FF6D00' },
  { num: '06', name: 'Optical Telemetry', label: 'Engagement Tracking', accent: '#00A6FF' },
  { num: '07', name: 'Chassis Dock', label: 'Lead Captured', accent: '#00A6FF' },
  { num: '08', name: 'Laser Calipers', label: 'Human QA', accent: '#10B981' },
  { num: '09', name: 'Gold Embosser', label: 'Qualified Lead', accent: '#10B981' },
  { num: '10', name: 'Pneumatic Dock', label: 'Client Delivery', accent: '#00A6FF' },
]

export default function MechanicalProcessEngine({
  activeStep,
  setActiveStep,
  isPlaying,
  setIsPlaying,
  playbackSpeed,
  setPlaybackSpeed,
  onReplay,
}) {
  const handlePrev = () => {
    setIsPlaying(false)
    setActiveStep((prev) => (prev > 0 ? prev - 1 : STATIONS.length - 1))
  }

  const handleNext = () => {
    setIsPlaying(false)
    setActiveStep((prev) => (prev < STATIONS.length - 1 ? prev + 1 : 0))
  }

  const toggleSpeed = () => {
    setPlaybackSpeed((prev) => (prev === 2200 ? 1400 : 2200))
  }

  return (
    <div className="w-full space-y-8">
      {/* ── 1. OPERATOR CONTROL DECK ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface/90 border border-border/80 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Machine Status Ticker */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <RotatingGear size={36} teeth={10} speed={isPlaying ? 3 : 15} color="#00A6FF" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                MECHANICAL ENGINE STATUS
              </span>
            </div>
            <div className="text-sm font-black text-text-primary tracking-tight font-mono">
              STATION {String(activeStep + 1).padStart(2, '0')}/10: {STATIONS[activeStep].name.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Step-by-Step Operator Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Previous Step Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-background border border-border text-xs font-mono font-semibold text-text-secondary hover:text-primary hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
            aria-label="Previous Mechanical Station"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          {/* Auto-Run Conveyor (Play/Pause) */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-pointer shadow-md ${
              isPlaying
                ? 'bg-cta text-white ring-2 ring-cta/40 shadow-cta/30 scale-[1.02]'
                : 'bg-primary text-white hover:opacity-90 active:scale-95 shadow-primary/30'
            }`}
            aria-label={isPlaying ? 'Halt Conveyor' : 'Start Conveyor'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>HALT CONVEYOR</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>AUTO-RUN CONVEYOR</span>
              </>
            )}
          </button>

          {/* Next Step Button */}
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-background border border-border text-xs font-mono font-semibold text-text-secondary hover:text-primary hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
            aria-label="Next Mechanical Station"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Replay Button */}
          <button
            type="button"
            onClick={onReplay}
            className="p-2 rounded-xl bg-background border border-border text-text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
            title="Reset Engine to Station 01"
            aria-label="Reset Engine"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Button */}
          <button
            type="button"
            onClick={toggleSpeed}
            className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-background border border-border text-[11px] font-mono font-medium text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            title="Toggle Conveyor Speed"
          >
            <Gauge className="w-3.5 h-3.5 text-primary" />
            <span>{playbackSpeed === 1400 ? '1.5x' : '1.0x'}</span>
          </button>
        </div>

      </div>

      {/* ── 2. MECHANICAL ASSEMBLY CONVEYOR TRACK (MACRO VIEW) ── */}
      <div className="relative p-4 sm:p-6 rounded-2xl bg-surface/70 border border-border/80 backdrop-blur-xl shadow-xl overflow-hidden">
        
        {/* Track Title */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/50 text-xs font-mono">
          <div className="flex items-center gap-2 text-text-muted">
            <Cpu className="w-4 h-4 text-primary" />
            <span>INDUSTRIAL STEP-BY-STEP ASSEMBLY CONVEYOR</span>
          </div>
          <span className="text-primary font-bold hidden sm:inline">
            CLICK ANY STATION TO INSPECT MECHANISM
          </span>
        </div>

        {/* 10 Mechanical Stations Rail */}
        <div className="relative pb-6 pt-2 overflow-x-auto no-scrollbar">
          
          {/* Continuous Metal Conveyor Belt Base */}
          <div className="relative min-w-[760px] lg:min-w-0">
            <ConveyorTrack isActive={isPlaying} className="mb-6" />

            {/* Moving Physical Data Payload Capsule (glides along track) */}
            <motion.div
              className="absolute -top-3 z-30 pointer-events-none"
              style={{
                left: `${(activeStep / (STATIONS.length - 1)) * 94 + 1}%`,
                transition: 'left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="flex flex-col items-center">
                <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-cta text-white font-mono text-[9px] font-black shadow-[0_0_15px_rgba(0,166,255,0.8)] border border-white/40 flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>PAYLOAD IN TRANSIT</span>
                </div>
                <div className="w-2 h-2 bg-cta rotate-45 -mt-1" />
              </div>
            </motion.div>

            {/* 10 Mechanical Station Nodes */}
            <div className="grid grid-cols-10 gap-1 sm:gap-2 relative z-20">
              {STATIONS.map((st, idx) => {
                const isActive = activeStep === idx
                const isPassed = activeStep > idx

                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false)
                      setActiveStep(idx)
                    }}
                    className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all duration-300 cursor-pointer select-none group ${
                      isActive
                        ? 'bg-surface border-primary shadow-[0_0_20px_rgba(0,166,255,0.3)] ring-2 ring-primary/40 -translate-y-1'
                        : isPassed
                        ? 'bg-surface/90 border-emerald-500/40 hover:border-emerald-500/70'
                        : 'bg-surface-alt/50 border-border/70 hover:border-border hover:bg-surface/70'
                    }`}
                  >
                    {/* Rotating Mini Cog above node */}
                    <div className="mb-1">
                      <RotatingGear
                        size={22}
                        teeth={8}
                        speed={isActive && isPlaying ? 2 : 12}
                        color={isActive ? '#00A6FF' : isPassed ? '#10B981' : 'var(--border)'}
                      />
                    </div>

                    {/* Step Number Badge with LED status indicator */}
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold mb-1 transition-colors ${
                        isActive
                          ? 'bg-primary text-white shadow-md'
                          : isPassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-background border border-border text-text-muted'
                      }`}
                    >
                      {st.num}
                    </div>

                    {/* Short Station Name */}
                    <span className="font-mono text-[9px] font-bold text-text-primary leading-tight truncate w-full">
                      {st.name}
                    </span>
                    <span className="font-mono text-[8px] text-text-muted truncate w-full mt-0.5">
                      {st.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ── 3. DETAILED ACTIVE MECHANICAL STATION CHAMBER ── */}
      <MechanicalStationChamber
        stepIndex={activeStep}
        isEngineRunning={isPlaying}
      />

    </div>
  )
}
