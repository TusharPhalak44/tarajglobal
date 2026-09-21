import React from 'react'
import { Play, Pause, RotateCcw, Sparkles, Activity, Gauge } from 'lucide-react'

export default function PipelineHeader({
  activeStageIndex,
  totalStages,
  isPlaying,
  playbackSpeed,
  onTogglePlay,
  onReplay,
  onToggleSpeed,
}) {
  const currentStageNum = String(activeStageIndex + 1).padStart(2, '0')
  const progressPercent = Math.round(((activeStageIndex + 1) / totalStages) * 100)

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
      <div className="max-w-3xl">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-primary">
            CONTENT SYNDICATION • EMAIL MARKETING • LEAD GENERATION
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12]">
          From Content to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#33B8FF] to-cta font-black">
            Qualified Leads
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal mt-3 max-w-2xl">
          A technology-driven and human-verified process that transforms targeted content engagement into high-quality business opportunities.
        </p>
      </div>

      {/* Futuristic Interactive Control Deck */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-surface/80 border border-border/80 backdrop-blur-xl shadow-xl shrink-0">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          className={`inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-md ${
            isPlaying
              ? 'bg-cta text-white ring-2 ring-cta/40 shadow-cta/30 scale-[1.02]'
              : 'bg-primary text-white hover:opacity-90 active:scale-95 shadow-primary/30'
          }`}
          aria-label={isPlaying ? 'Pause Workflow Animation' : 'Play Workflow Animation'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>PAUSE PIPELINE</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY PIPELINE</span>
            </>
          )}
        </button>

        {/* Replay Process Button */}
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-text-secondary hover:text-primary hover:border-primary/50 text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm"
          title="Replay Process from Stage 01"
          aria-label="Replay Process"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Replay Process</span>
        </button>

        {/* Speed Toggle (1x / 1.5x) */}
        <button
          type="button"
          onClick={onToggleSpeed}
          className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-background border border-border/80 text-text-muted hover:text-text-primary text-xs font-mono font-medium transition-colors cursor-pointer"
          title="Toggle Simulation Speed"
        >
          <Gauge className="w-3.5 h-3.5 text-primary" />
          <span>{playbackSpeed === 1500 ? '1.5x' : '1.0x'}</span>
        </button>

        {/* Live Stage Progress Indicator */}
        <div className="flex items-center gap-3 px-3 py-1.5 font-mono text-xs text-text-muted border-l border-border/60">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="flex flex-col">
            <span className="text-[9.5px] uppercase tracking-wider font-bold text-text-muted">PIPELINE STAGE</span>
            <span className="text-xs font-bold text-text-primary">
              {currentStageNum}/10 ({progressPercent}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
