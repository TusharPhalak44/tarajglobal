

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Users,
  Target,
  TrendingUp,
  UserCheck,
  CreditCard,
  Cog,
  BarChart3,
  Check,
  Activity,
  Layers,
} from 'lucide-react'

import RibbonTrail from './RibbonTrail'


const ACCENT = '#397F91'

const CAPABILITIES = [
  {
    id: 'crm-client',
    eyebrow: '01 — RELATIONSHIP MANAGEMENT',
    title: 'CRM & Client Management',
    desc: 'Disconnected account records hide relationship history. Manage accounts, interactions, and client information from one workspace. ',
    points: [
      '✔ Account intelligence and verified decision-maker directories',
      '✔ Client workspaces with transparent SLA monitoring and milestones',
      '✔ Cross-team communication logs and interaction history ',
    ],
    metric: 'Full Relationship Visibility',
    image: '/demandflow-dbms.png',
    screenTitle: 'Accounts, Client Portals & Contact DBMS',
    icon: Users,
  },
  {
    id: 'lead-mgmt',
    eyebrow: '02 — PROSPECT LIFECYCLE',
    title: 'Lead Management',
    desc: 'Leads slip when intake and handoff run on spreadsheets. Track leads from acquisition and qualification through follow-up and conversion. ',
    points: [
      '✔ Automated intake with firmographic and demographic validation ',
      ' ✔ BANT, ICP, and AI-assisted intent scoring before handoff ',
      '✔ Real-time lead status telemetry and conversion-ready distribution ',
    ],
    metric: ' Leads Tracked End to End',
    image: '/demandflow-qualification.png',
    screenTitle: 'Lead QA & Qualification Control Center',
    icon: Target,
  },
  {
    id: 'sales-ops',
    eyebrow: '03 — PIPELINE VELOCITY',
    title: 'Sales Operations',
    desc: 'Outreach without pacing wastes capacity. Monitor opportunities, sales activity, pipelines, and performance.',
    points: [
      '✔ Multi-channel sequences with AI personalization and cadence pacing control ',
      '✔ Live SDR pod allocation and meeting quota pacing ',
      '✔ Conversion telemetry and pipeline forecasting',
    ],
    metric: 'Real-Time Pipeline Visibility ',
    image: '/demandflow-sequences.png',
    screenTitle: 'Email Cadence & Outreach Operations',
    icon: TrendingUp,
  },
  {
    id: 'hrms',
    eyebrow: '04 — WORKFORCE COORDINATION',
    title: 'HRMS',
    desc: 'Keep team records, attendance, and HR workflows alongside campaign operations.',
    points: [
      ' ✔ Employee profiles, roles, and organizational hierarchy ',
      '✔ Daily attendance logging and shift reconciliation ',
      '✔ Digital leave requests, records, and onboardingg',
    ],
    metric: 'Centralized Workforce Governance',
    screenTitle: 'Workforce Governance Console',
    icon: UserCheck,
    telemetryType: 'hrms',
  },
  {
    id: 'payroll',
    eyebrow: '05 — COMPENSATION ENGINE',
    title: 'Payroll',
    desc: 'Connect compensation to delivery performance.',
    points: [
      '✔ Salary computation from verified attendance',
      '✔ Incentive reconciliation linked to pipeline milestones',
      '✔ Payslips and tax compliance records',
    ],
    metric: 'Automated, Reconciled Pay Cycles',
    icon: CreditCard,
    telemetryType: 'payroll',
  },
  {
    id: 'business-ops',
    eyebrow: '06 — EXECUTION ENGINE',
    title: 'Business Operations',
    desc: 'Bring daily operational work into a connected workspace.',
    points: [
      '✔ Cross-team task routing, handoffs, and capacity planning',
      '✔ Live campaign execution tracking and asset inventory',
      '✔ Bottleneck detection with automated escalation',
    ],
    metric: 'Synchronized Execution',
    image: '/demandflow-campaigns.png',
    screenTitle: 'Campaign Operations & Pacing Board',
    icon: Cog,
  },
  {
    id: 'reports-analytics',
    eyebrow: '07 — STRATEGIC VISIBILITY',
    title: 'Reports & Analytics',
    desc: 'Late reports hide problems until they’re expensive. Turn operational data into centralized visibility and actionable insights.',
    points: [
      '✔ Executive dashboards spanning sales, operations, and workforce metrics',
      '✔ Real-time telemetry on campaign conversion and SLA delivery speed',
      '✔ Customizable exportable reports',
    ],
    metric: 'Centralized, Actionable Reporting',
    image: '/demandflow-tracking.png',
    screenTitle: 'Response Telemetry & Analytics Hub',
    icon: BarChart3,
  },
]

// Small section connector
const SectionMarker = ({ number }) => (
  <div className="flex items-center gap-2 mb-4">
    <span
      data-capability-marker
      className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/30 bg-surface text-primary text-xs font-bold transition-all duration-300 shadow-[0_0_12px_rgba(0,166,255,0.15)] relative z-20"
    >
      {number}
    </span>
    <span className="h-px w-8 bg-primary/40" />
    <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-text-secondary">
      Module
    </span>
  </div>
)

// Dashboard preview
const DashboardPreview = ({ item, index }) => {
  const Icon = item.icon

  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      <div className="rounded-2xl overflow-hidden border border-border bg-surface shadow-[0_12px_35px_rgba(30,70,90,0.09)] transition-all duration-500 hover:shadow-[0_18px_45px_rgba(30,70,90,0.13)] hover:-translate-y-1">

        {/* Minimal top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Icon size={15} />
            </div>
            <span className="text-xs font-semibold text-text-primary">
              DemandFlow Bridge™
            </span>
          </div>

          <span className="flex items-center gap-1.5 text-[10px] text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {item.title}
          </span>
        </div>

        {/* Dashboard content */}
        {item.telemetryType ? (
          <div className="p-5 sm:p-6 bg-background min-h-[210px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  {item.telemetryType === 'hrms'
                    ? 'Workforce Governance Console'
                    : 'Automated Compensation Engine'}
                </h4>
                <p className="text-[10px] text-text-secondary mt-1">
                  {item.telemetryType === 'hrms'
                    ? '148 Active Team Members Synchronized'
                    : 'Synced with Attendance & Performance'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(item.telemetryType === 'hrms'
                ? [
                  ['Daily Attendance', '98.6%', 'Shift verified'],
                  ['Departments', '6 Units', 'Direct hierarchy'],
                  ['Leave Workflows', 'Automated', '1-click approvals'],
                ]
                : [
                  ['Cycle Status', 'Reconciled', 'Zero discrepancies'],
                  ['Incentive Sync', 'Direct MQL/SQL', 'Quota verified'],
                  ['Compliance', 'Automated', 'Tax & deductions'],
                ]
              ).map(([label, value, description]) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-surface p-3"
                >
                  <p className="text-[10px] text-text-secondary">
                    {label}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-primary mt-2">
                    {value}
                  </p>
                  <p className="text-[9px] text-text-secondary mt-1">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative aspect-[16/10] bg-background overflow-hidden">
            <img
              src={item.image}
              alt={`${item.title} dashboard`}
              loading="lazy"
              className="w-full h-full object-contain object-center p-2 transition-transform duration-700 hover:scale-[1.025]"
            />
          </div>
        )}

        {/* Bottom caption */}
        <div className="px-4 py-3 border-t border-border flex items-center justify-between gap-3">
          <span className="text-[10px] sm:text-xs text-text-secondary truncate">
            {item.screenTitle || item.title}
          </span>
          <span className="text-[10px] font-semibold text-primary whitespace-nowrap">
            Module 0{index + 1}
          </span>
        </div>
      </div>
    </div>
  )
}

const CoreCapabilities = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="capabilities"
      className="relative py-14 sm:py-20 lg:py-24 bg-surface border-y border-border overflow-hidden"
      aria-label="DemandFlow Bridge Core Capabilities"
    >
      {/* 3D High-Velocity Silk Ribbon Trail connecting all 7 modules down to section border */}
      <RibbonTrail
        reducedMotion={prefersReducedMotion}
        ribbonWidth={14}
        segmentCount={640}
        animationSpeed={0.7}
      // colorStart="#00A6FF"
      // colorMid="#00D2FF"
      // colorEnd="#00D2FF"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-primary mb-4"
          >

            <span className="text-sm font-semibold tracking-[0.16em] uppercase">
              CORE CAPABILITIES

            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-tight text-text-primary mb-4"
          >
            Capabilities Built for  {' '}
            <span className="text-primary">
              High-Velocity Demand Teams
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto"
          >
            Explore each module inside DemandFlow Bridge, engineered to connect every operational layer into one command experience.

          </motion.p>
        </div>

        {/* Connected Modules */}
        <div className="relative isolate">
          <div className="relative z-10 space-y-16 sm:space-y-24 lg:space-y-28">
            {CAPABILITIES.map((item, index) => {
              const Icon = item.icon
              const reverse = index % 2 !== 0

              return (
                <div
                  key={item.id}
                  data-capability-row={index}
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                >
                  {/* Content */}
                  <motion.div
                    data-capability-content={index}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, x: reverse ? 25 : -25 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10"
                  >
                    <SectionMarker number={`0${index + 1}`} />

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-lg">
                      {item.desc}
                    </p>

                    {/* Features */}
                    <div className="mt-6 space-y-3">
                      {item.points.map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 mt-0.5 rounded-full shrink-0 bg-primary/10 flex items-center justify-center text-primary">
                            <Check size={12} strokeWidth={2.5} />
                          </div>

                          <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Impact */}
                    <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
                      <Activity
                        size={15}
                        className="text-primary shrink-0"
                      />
                      <span className="text-xs text-text-secondary">
                        Impact:
                      </span>
                      <span className="text-xs font-semibold text-text-primary">
                        {item.metric}
                      </span>
                    </div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 22, scale: 0.98 }
                    }
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10"
                  >
                    <DashboardPreview
                      item={item}
                      index={index}
                    />
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreCapabilities
