import React from 'react'
import { motion } from 'framer-motion'
import WorkflowCard from './WorkflowCard'
import WorkflowTargetBadge from './WorkflowTargetBadge'
import { WORKFLOW_STEPS } from './workflowData'
import { ArrowDown, Trophy } from 'lucide-react'

export default function WorkflowMobileView({
  activeStepIndex,
  onSelectStep,
  isReducedMotion = false,
}) {
  return (
    <div className="relative py-2 space-y-4">
      {/* ── Background Vertical Flow Line ── */}
      <div className="absolute top-8 bottom-16 left-5 sm:left-7 w-1 bg-slate-200 dark:bg-gradient-to-b dark:from-[#00d2ff] dark:via-[#0088ff] dark:to-[#00f0ff] opacity-60 rounded-full">
        {/* Active Animated Glowing Segment */}
        {!isReducedMotion && (
          <motion.div
            className="w-full bg-primary dark:bg-[#00f0ff] shadow-xs dark:shadow-[0_0_10px_#00f0ff] rounded-full"
            style={{
              height: `${Math.min(100, ((activeStepIndex + 1) / 10) * 100)}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>

      {/* ── Steps 01 to 09 ── */}
      <div className="space-y-3">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex
          const isCompleted = idx < activeStepIndex

          return (
            <div key={step.id} className="relative pl-10 sm:pl-14">
              {/* Step Node Marker on the vertical line */}
              <div
                onClick={() => onSelectStep(idx)}
                className={`absolute left-3.5 sm:left-5 top-4 -translate-x-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer z-10 ${
                  isActive
                    ? 'border-primary bg-primary dark:border-[#00f0ff] dark:bg-[#00f0ff] shadow-xs dark:shadow-[0_0_10px_#00f0ff] scale-110'
                    : isCompleted
                    ? 'border-primary/80 bg-primary/20 dark:border-[#00aaff] dark:bg-[#0088ff]'
                    : 'border-slate-300 bg-white dark:border-[#0077cc]/50 dark:bg-[#021430]'
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    isActive
                      ? 'bg-white dark:bg-black'
                      : isCompleted
                      ? 'bg-primary dark:bg-white'
                      : 'bg-slate-400 dark:bg-[#0099ff]/60'
                  }`}
                />
              </div>

              {/* Step Card */}
              <WorkflowCard
                step={step}
                isActive={isActive}
                isCompleted={isCompleted}
                onClick={() => onSelectStep(idx)}
                isReducedMotion={isReducedMotion}
              />

              {/* Connecting Mini Arrow between steps */}
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="flex items-center justify-start pl-3 py-0.5 text-slate-400 dark:text-[#00a6ff]/40">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Final Outcome Badge at the end of mobile workflow ── */}
      <div className="pt-4 flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5 mb-3 text-[11px] font-mono font-bold text-primary dark:text-[#00f0ff] uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Workflow Outcome</span>
        </div>
        <WorkflowTargetBadge
          isActive={activeStepIndex >= 9}
          isCompleted={activeStepIndex >= 9}
          onClick={() => onSelectStep(9)}
          isReducedMotion={isReducedMotion}
        />
      </div>
    </div>
  )
}
