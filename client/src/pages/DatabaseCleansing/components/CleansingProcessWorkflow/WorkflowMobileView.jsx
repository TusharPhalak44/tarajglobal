import React from 'react'
import { motion } from 'framer-motion'
import WorkflowCard from '@pages/B2bEmailMarketing/components/EmailProcessWorkflow/WorkflowCard'
import WorkflowTargetBadge from '@pages/B2bEmailMarketing/components/EmailProcessWorkflow/WorkflowTargetBadge'
import { WORKFLOW_STEPS, TARGET_GOAL } from './workflowData'

export default function WorkflowMobileView({
  activeStepIndex,
  onSelectStep,
  isReducedMotion = false,
}) {
  return (
    <div className="flex flex-col gap-3 py-2">
      {WORKFLOW_STEPS.map((step, idx) => {
        const isActive = activeStepIndex === idx
        const isCompleted = activeStepIndex > idx

        return (
          <div key={step.id} className="w-full">
            <WorkflowCard
              step={step}
              isActive={isActive}
              isCompleted={isCompleted}
              onClick={() => onSelectStep(idx)}
              isReducedMotion={isReducedMotion}
              className="w-full min-h-[100px]"
            />
          </div>
        )
      })}

      <div className="w-full pt-2">
        <WorkflowTargetBadge
          targetGoal={TARGET_GOAL}
          isActive={activeStepIndex === 9}
          isReducedMotion={isReducedMotion}
          className="w-full min-h-[110px]"
          titleLine1="PRISTINE"
          titleLine2="CRM DATA"
        />
      </div>
    </div>
  )
}
