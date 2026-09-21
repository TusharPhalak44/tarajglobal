import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Target,
  TrendingUp,
  UserCheck,
  CreditCard,
  Cog,
  BarChart3,
  Check,
  ShieldCheck,
  Zap,
  Activity,
  CalendarCheck,
  Clock,
  Layers,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const CAPABILITIES = [
  {
    id: 'crm-client',
    eyebrow: '01 — RELATIONSHIP MANAGEMENT',
    title: 'CRM & Client Management',
    desc: 'Manage relationships, accounts, interactions and client information from one centralized workspace.',
    points: [
      'Centralized account intelligence and verified decision-maker directories',
      'Unified client workspaces with transparent SLA monitoring and milestones',
      'Cross-functional communication logs and interaction history',
    ],
    metric: '100% Relationship Transparency',
    image: '/demandflow-dbms.png',
    screenTitle: 'Accounts, Client Portals & Contact DBMS',
    icon: Users,
    color: '#00A6FF',
    reverse: false,
  },
  {
    id: 'lead-mgmt',
    eyebrow: '02 — PROSPECT LIFECYCLE',
    title: 'Lead Management',
    desc: 'Track leads from acquisition and qualification through follow-up and conversion.',
    points: [
      'Automated intake with multi-tier demographic & firmographic validation',
      'Rigorous BANT and ICP qualification criteria scoring before handoff',
      'Real-time lead status telemetry and conversion-ready distribution',
    ],
    metric: 'Zero Lead Leakage Across Funnel',
    image: '/demandflow-qualification.png',
    screenTitle: 'Lead QA & Qualification Control Center',
    icon: Target,
    color: '#00D2FF',
    reverse: true,
  },
  {
    id: 'sales-ops',
    eyebrow: '03 — PIPELINE VELOCITY',
    title: 'Sales Operations',
    desc: 'Monitor opportunities, sales activities, pipelines and performance.',
    points: [
      'Multi-channel outreach sequences with cadence pacing control',
      'Live SDR pod allocation and meeting quota pacing analytics',
      'Comprehensive conversion telemetry and pipeline forecasting',
    ],
    metric: 'Real-Time Pipeline Visibility',
    image: '/demandflow-sequences.png',
    screenTitle: 'Email Cadence & Outreach Operations',
    icon: TrendingUp,
    color: '#FF6D00',
    reverse: false,
  },
  {
    id: 'hrms',
    eyebrow: '04 — WORKFORCE COORDINATION',
    title: 'HRMS',
    desc: 'Centralize employee information, attendance and HR workflows.',
    points: [
      'Centralized employee profiles, roles, and organizational hierarchy',
      'Automated daily attendance logging and shift schedule reconciliation',
      'Digital leave requests, document records, and internal onboarding',
    ],
    metric: 'Centralized Workforce Governance',
    isTelemetryCard: true,
    telemetryType: 'hrms',
    icon: UserCheck,
    color: '#9333EA',
    reverse: true,
  },
  {
    id: 'payroll',
    eyebrow: '05 — COMPENSATION ENGINE',
    title: 'Payroll',
    desc: 'Manage payroll-related processes and employee compensation workflows.',
    points: [
      'Automated salary computation based on verified attendance records',
      'Performance incentive reconciliation linked to pipeline milestones',
      'Comprehensive payslip generation and tax compliance records',
    ],
    metric: 'Accurate, Automated Pay Cycles',
    isTelemetryCard: true,
    telemetryType: 'payroll',
    icon: CreditCard,
    color: '#EAB308',
    reverse: false,
  },
  {
    id: 'business-ops',
    eyebrow: '06 — EXECUTION ENGINE',
    title: 'Business Operations',
    desc: 'Bring day-to-day operational activities into a connected digital workspace.',
    points: [
      'Cross-departmental task routing, handoffs, and resource capacity planning',
      'Live campaign execution tracking and asset inventory management',
      'Operational bottleneck detection with automated escalation protocols',
    ],
    metric: 'Synchronized Operational Execution',
    image: '/demandflow-campaigns.png',
    screenTitle: 'Campaign Operations & Pacing Board',
    icon: Cog,
    color: '#3B82F6',
    reverse: true,
  },
  {
    id: 'reports-analytics',
    eyebrow: '07 — STRATEGIC VISIBILITY',
    title: 'Reports & Analytics',
    desc: 'Turn operational data into centralized visibility and actionable insights.',
    points: [
      'Unified executive dashboards spanning sales, operations, and workforce metrics',
      'Real-time telemetry on campaign conversion rates and SLA delivery speed',
      'Customizable exportable reports for stakeholders and department leads',
    ],
    metric: 'Actionable Intelligence in 1 Click',
    image: '/demandflow-tracking.png',
    screenTitle: 'Response Telemetry & Analytics Hub',
    icon: BarChart3,
    color: '#10B981',
    reverse: false,
  },
]

const CoreCapabilities = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="capabilities"
      className="relative py-16 sm:py-20 lg:py-24 bg-surface border-t border-b border-border transition-colors duration-300"
      aria-label="DemandFlow Bridge Core Capabilities"
    >
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-3.5 backdrop-blur-md"
          >
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Deep-Dive Modules
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-4"
          >
            Core Capabilities Built for{' '}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              High-Velocity Business
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Explore each specialized module inside DemandFlow Bridge, engineered to connect every operational layer into one cohesive command experience.
          </motion.p>
        </div>

        {/* Alternating Feature Rows */}
        <div className="space-y-16 sm:space-y-24">
          {CAPABILITIES.map((item, idx) => {
            const Icon = item.icon

            return (
              <div
                key={item.id}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  item.reverse ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text Description Column (5 cols) */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-5 space-y-4 ${
                    item.reverse ? 'lg:col-start-8' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}35`,
                      }}
                    >
                      {item.eyebrow}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                    {item.desc}
                  </p>

                  {/* Bullet Checklist */}
                  <div className="space-y-2.5 pt-2">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                            border: `1px solid ${item.color}35`,
                          }}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </div>
                        <span className="text-xs sm:text-sm text-text-primary font-medium leading-snug">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Operational Metric Tag */}
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-text-secondary">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span>Impact: </span>
                    <strong className="text-text-primary font-bold">{item.metric}</strong>
                  </div>
                </motion.div>

                {/* Visual Viewport Column (7 cols) */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-7 ${
                    item.reverse ? 'lg:col-start-1' : ''
                  }`}
                >
                  {/* Browser/Application Frame */}
                  <div className="rounded-2xl overflow-hidden border border-border bg-[#0B1424] shadow-xl dark:shadow-[0_16px_40px_rgba(0,166,255,0.12)] group transition-all duration-300 hover:border-primary/50">
                    
                    {/* Frame Top Header */}
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-white/10 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>DemandFlow Bridge™</span>
                        <span className="text-slate-500 hidden sm:inline">• {item.title}</span>
                      </div>

                      <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        LIVE
                      </span>
                    </div>

                    {/* Content Viewport */}
                    {item.isTelemetryCard ? (
                      /* Dedicated Rich Telemetry Visual for HRMS or Payroll */
                      <div className="p-6 sm:p-8 bg-slate-950 text-white min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
                        {item.telemetryType === 'hrms' ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                                  <UserCheck className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white">Workforce Governance Console</div>
                                  <div className="text-xs text-slate-400 font-mono">148 Active Team Members Synchronized</div>
                                </div>
                              </div>
                              <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                                HRMS LIVE
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                                <div className="text-[10.5px] font-mono text-slate-400">Daily Attendance</div>
                                <div className="text-lg font-black text-emerald-400 mt-1">98.6%</div>
                                <div className="text-[10px] text-slate-400">Shift verified</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                                <div className="text-[10.5px] font-mono text-slate-400">Departments</div>
                                <div className="text-lg font-black text-white mt-1">6 Units</div>
                                <div className="text-[10px] text-slate-400">Direct hierarchy</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 col-span-2 sm:col-span-1">
                                <div className="text-[10.5px] font-mono text-slate-400">Leave Workflows</div>
                                <div className="text-lg font-black text-primary mt-1">Automated</div>
                                <div className="text-[10px] text-slate-400">1-click approvals</div>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between text-xs font-mono text-slate-300">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>Role-Based Access Control</span>
                              </div>
                              <span className="text-slate-500">Enterprise Encrypted</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                                  <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white">Automated Compensation Engine</div>
                                  <div className="text-xs text-slate-400 font-mono">Synced with Attendance & Performance</div>
                                </div>
                              </div>
                              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                PAYROLL ENGINE
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                                <div className="text-[10.5px] font-mono text-slate-400">Cycle Status</div>
                                <div className="text-lg font-black text-emerald-400 mt-1">Reconciled</div>
                                <div className="text-[10px] text-slate-400">Zero discrepancies</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                                <div className="text-[10.5px] font-mono text-slate-400">Incentive Sync</div>
                                <div className="text-lg font-black text-amber-400 mt-1">Direct MQL/SQL</div>
                                <div className="text-[10px] text-slate-400">Quota verified</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 col-span-2 sm:col-span-1">
                                <div className="text-[10.5px] font-mono text-slate-400">Compliance</div>
                                <div className="text-lg font-black text-primary mt-1">Automated</div>
                                <div className="text-[10px] text-slate-400">Tax & deductions</div>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between text-xs font-mono text-slate-300">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>Bank Batch File Export</span>
                              </div>
                              <span className="text-slate-500">100% Audit Ready</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* High-Resolution Application Screenshot */
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                        <img
                          src={item.image}
                          alt={`${item.title} Dashboard Screen in DemandFlow Bridge`}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                        
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
                          <span className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                            {item.screenTitle}
                          </span>
                          <span className="text-primary font-bold">
                            DemandFlow Bridge™
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default CoreCapabilities
