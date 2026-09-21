import React from 'react'
import { WORKFLOW_PHASES } from './workflowData'

export default function WorkflowProgress({ activePhaseId, onSelectPhase }) {
  return (
    <div className="flex items-center justify-center w-full mb-10 overflow-x-auto no-scrollbar py-2">
      <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl bg-surface/80 border border-border/80 backdrop-blur-xl shadow-md">
        {WORKFLOW_PHASES.map((phase, idx) => {
          const isActive = activePhaseId === phase.id
          const isPassed = WORKFLOW_PHASES.findIndex((p) => p.id === activePhaseId) > idx

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => onSelectPhase(phase.id, phase.activeIndex)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-300 cursor-pointer select-none ${
                isActive
                  ? 'bg-primary text-white font-bold shadow-md shadow-primary/25 scale-[1.03]'
                  : isPassed
                  ? 'text-emerald-500 hover:text-emerald-400 font-semibold bg-emerald-500/10'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-alt/60'
              }`}
              aria-label={`Jump to Phase ${phase.num}: ${phase.name}`}
            >
              <span className={`text-[10px] ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                {phase.num}
              </span>
              <span className="hidden xs:inline">—</span>
              <span className="text-[11px] uppercase tracking-wider">{phase.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
