import React from 'react'
import WorkflowCard from './WorkflowCard'
import WorkflowTargetBadge from './WorkflowTargetBadge'
import WorkflowSvgConnectors from './WorkflowSvgConnectors'
import { WORKFLOW_STEPS } from './workflowData'

export default function WorkflowCanvas({
  activeStepIndex,
  onSelectStep,
  isReducedMotion = false,
}) {
  const step01 = WORKFLOW_STEPS.find((s) => s.id === '01')
  const step02 = WORKFLOW_STEPS.find((s) => s.id === '02')
  const step03 = WORKFLOW_STEPS.find((s) => s.id === '03')
  const step04 = WORKFLOW_STEPS.find((s) => s.id === '04')
  const step05 = WORKFLOW_STEPS.find((s) => s.id === '05')
  const step06 = WORKFLOW_STEPS.find((s) => s.id === '06')
  const step07 = WORKFLOW_STEPS.find((s) => s.id === '07')
  const step08 = WORKFLOW_STEPS.find((s) => s.id === '08')
  const step09 = WORKFLOW_STEPS.find((s) => s.id === '09')

  return (
    <div className="relative w-full max-w-[1300px] mx-auto">
      {/* ── Flow Canvas ── */}
      <div
        className="relative w-full aspect-[1400/520] min-h-[440px] lg:min-h-[480px] rounded-2xl p-3 overflow-visible bg-transparent"
      >
        {/* Ambient Subtle Pulsing Light Orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-[100px] bg-primary/10 dark:bg-[#0099ff]/15 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[120px] bg-sky-400/10 dark:bg-[#00e5ff]/15 pointer-events-none" />

        {/* ── SVG Connector Lines & Animated Light Photons ── */}
        <WorkflowSvgConnectors
          activeStepIndex={activeStepIndex}
          isReducedMotion={isReducedMotion}
        />

        {/* ── CARD 01: ICP & Asset Selection (Top Row, Left) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '27.14%',
            top: '2.88%',
            width: '14.28%',
            height: '24.03%',
          }}
        >
          <WorkflowCard
            step={step01}
            isActive={activeStepIndex === 0}
            isCompleted={activeStepIndex > 0}
            onClick={() => onSelectStep(0)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── CARD 02: Syndication Strategy (Top Row, Right) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '52.85%',
            top: '2.88%',
            width: '14.28%',
            height: '24.03%',
          }}
        >
          <WorkflowCard
            step={step02}
            isActive={activeStepIndex === 1}
            isCompleted={activeStepIndex > 1}
            onClick={() => onSelectStep(1)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── CARD 03: Publisher Mapping (Middle Row, Col 1) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '1.42%',
            top: '37.5%',
            width: '14.28%',
            height: '25.0%',
          }}
        >
          <WorkflowCard
            step={step03}
            isActive={activeStepIndex === 2}
            isCompleted={activeStepIndex > 2}
            onClick={() => onSelectStep(2)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── CARD 04: Asset Gating (Middle Row, Col 2) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '18.57%',
            top: '37.5%',
            width: '14.28%',
            height: '25.0%',
          }}
        >
          <WorkflowCard
            step={step04}
            isActive={activeStepIndex === 3}
            isCompleted={activeStepIndex > 3}
            onClick={() => onSelectStep(3)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── CARD 05: Personalization (Middle Row, Col 3) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '35.71%',
            top: '37.5%',
            width: '14.28%',
            height: '25.0%',
          }}
        >
          <WorkflowCard
            step={step05}
            isActive={activeStepIndex === 4}
            isCompleted={activeStepIndex > 4}
            onClick={() => onSelectStep(4)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── CARD 06: Content Distribution (Middle Row, Col 4) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '52.85%',
            top: '37.5%',
            width: '14.28%',
            height: '25.0%',
          }}
        >
          <WorkflowCard
            step={step06}
            isActive={activeStepIndex === 5}
            isCompleted={activeStepIndex > 5}
            onClick={() => onSelectStep(5)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── CARD 07: Reader Tracking (Middle Row, Col 5) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '70.00%',
            top: '37.5%',
            width: '14.28%',
            height: '25.0%',
          }}
        >
          <WorkflowCard
            step={step07}
            isActive={activeStepIndex === 6}
            isCompleted={activeStepIndex > 6}
            onClick={() => onSelectStep(6)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── FINAL TARGET: QUALIFIED B2B LEADS (Middle Row, Col 6) ── */}
        <div
          className="absolute z-20 flex items-center justify-center"
          style={{
            left: '84.5%',
            top: '33.5%',
            width: '14.5%',
            height: '33.0%',
          }}
        >
          <WorkflowTargetBadge
            isActive={activeStepIndex >= 9}
            isCompleted={activeStepIndex >= 9}
            onClick={() => onSelectStep(9)}
            isReducedMotion={isReducedMotion}
          />
        </div>

        {/* ── CARD 08: Lead Qualification (Bottom Row, Left of 09) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '37.85%',
            top: '72.11%',
            width: '14.28%',
            height: '25.0%',
          }}
        >
          <WorkflowCard
            step={step08}
            isActive={activeStepIndex === 7}
            isCompleted={activeStepIndex > 7}
            onClick={() => onSelectStep(7)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>

        {/* ── CARD 09: Validation & Delivery (Bottom Row, Below 07) ── */}
        <div
          className="absolute z-10"
          style={{
            left: '70.00%',
            top: '72.11%',
            width: '14.28%',
            height: '25.0%',
          }}
        >
          <WorkflowCard
            step={step09}
            isActive={activeStepIndex === 8}
            isCompleted={activeStepIndex > 8}
            onClick={() => onSelectStep(8)}
            isReducedMotion={isReducedMotion}
            className="h-full"
          />
        </div>
      </div>
    </div>
  )
}
