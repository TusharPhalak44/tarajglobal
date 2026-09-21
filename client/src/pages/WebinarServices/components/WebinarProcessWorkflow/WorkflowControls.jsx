import React from 'react'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react'

export default function WorkflowControls({
  isPlaying,
  currentStepIndex,
  totalSteps,
  currentStepData,
  onTogglePlay,
  onReplay,
  onNext,
  onPrev,
  onSelectStep,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl bg-white/95 dark:bg-[#03152d]/80 border border-slate-200/90 dark:border-[#0099ff]/30 backdrop-blur-md shadow-xs dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="flex items-center gap-2.5 text-left">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 dark:bg-[#0088ff]/20 border border-primary/30 dark:border-[#00d2ff]/40 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-primary dark:text-[#00f0ff] shrink-0">
          {currentStepIndex >= 9 ? '★' : String(currentStepIndex + 1).padStart(2, '0')}
        </div>
        <div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#00a6ff]">
            {currentStepIndex >= 9 ? 'Final Outcome' : `Active Step`}
          </div>
          <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
            {currentStepData ? currentStepData.title : 'Qualified Webinar Pipeline'}
            {currentStepIndex >= 9 && (
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-primary/10 dark:bg-[#00f0ff]/15 border border-primary/30 dark:border-[#00f0ff]/40 text-[8px] font-mono text-primary dark:text-[#00f0ff] animate-pulse">
                Goal Hit
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCurrent = idx === currentStepIndex
          const isPassed = idx < currentStepIndex
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectStep(idx)}
              className={`group relative transition-all duration-300 rounded-full cursor-pointer ${
                isCurrent
                  ? 'w-6 h-2 bg-primary dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#0088ff] shadow-xs dark:shadow-[0_0_8px_#00d2ff]'
                  : isPassed
                  ? 'w-2 h-2 bg-primary/60 dark:bg-[#0088ff]'
                  : 'w-2 h-2 bg-slate-200 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
              }`}
              title={`Step ${idx + 1}`}
              aria-label={`Jump to Step ${idx + 1}`}
            />
          )
        })}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentStepIndex <= 0}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#021430] border border-slate-200 dark:border-[#0077cc]/40 text-slate-600 dark:text-[#94a3b8] hover:text-primary dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          title="Previous Step"
          aria-label="Previous Step"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all duration-300 cursor-pointer shadow-xs ${
            isPlaying
              ? 'bg-primary dark:bg-gradient-to-r dark:from-[#00aaff] dark:to-[#0077ee] text-white shadow-primary/20 dark:shadow-[0_0_15px_rgba(0,166,255,0.4)]'
              : 'bg-slate-900 text-white dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#0099ff] dark:text-slate-950 hover:opacity-90'
          }`}
          aria-label={isPlaying ? 'Pause Workflow Animation' : 'Play Workflow Animation'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 fill-current" />
              <span>PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>AUTOPLAY</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={currentStepIndex >= totalSteps - 1}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#021430] border border-slate-200 dark:border-[#0077cc]/40 text-slate-600 dark:text-[#94a3b8] hover:text-primary dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          title="Next Step"
          aria-label="Next Step"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#021430] border border-slate-200 dark:border-[#0077cc]/40 text-[11px] font-mono font-medium text-slate-600 dark:text-[#94a3b8] hover:text-primary dark:hover:text-[#00f0ff] transition-colors cursor-pointer"
          title="Replay Workflow"
          aria-label="Replay Workflow"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden md:inline">Restart</span>
        </button>
      </div>
    </div>
  )
}
