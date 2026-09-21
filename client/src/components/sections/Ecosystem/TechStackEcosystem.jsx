import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Zap,
  CheckCircle2,
  Database,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Activity,
  Workflow
} from 'lucide-react'

const integrations = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'Enterprise CRM',
    syncType: 'Real-Time Bi-Directional',
    badge: 'Certified Partner',
    color: '#00A1E0',
    stats: '50k+ Contacts Synced/mo',
    features: ['Custom Lead Object Mapping', 'Opportunity Stage Auto-Trigger', 'Zero Duplicate Protection'],
    glow: 'rgba(0, 161, 224, 0.35)',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Revenue Operations',
    syncType: 'Instant Deal & Contact Push',
    badge: 'Native App',
    color: '#FF7A59',
    stats: '< 150ms Webhook Latency',
    features: ['Lifecycle Stage Automation', 'Custom Property Sync', 'Meeting Activity Logging'],
    glow: 'rgba(255, 122, 89, 0.35)',
  },
  {
    id: 'marketo',
    name: 'Marketo Engage',
    category: 'Marketing Automation',
    syncType: 'Lead Scoring & Attribution',
    badge: 'Adobe Cloud',
    color: '#5C4C9F',
    stats: 'Multi-Touch Attribution',
    features: ['Smart List Triggering', 'MQL Score Threshold Sync', 'Campaign Performance Feed'],
    glow: 'rgba(92, 76, 159, 0.35)',
  },
  {
    id: 'outreach',
    name: 'Outreach.io',
    category: 'Sales Execution',
    syncType: 'Sequence Auto-Enrollment',
    badge: 'High Velocity',
    color: '#5925DC',
    stats: 'Instant Cadence Routing',
    features: ['Verified Prospect Injection', 'Opt-out Auto Sync', 'Rep Mailbox Distribution'],
    glow: 'rgba(89, 37, 220, 0.35)',
  },
  {
    id: 'salesloft',
    name: 'Salesloft',
    category: 'Cadence Engine',
    syncType: 'Decision-Maker Routing',
    badge: 'Live Sync',
    color: '#1E6BFF',
    stats: 'Tier-1 Account Cadence',
    features: ['Buying Committee Grouping', 'Live Disposition Feedback', 'Call Recording Integration'],
    glow: 'rgba(30, 107, 255, 0.35)',
  },
  {
    id: 'apollo',
    name: 'Apollo.io',
    category: 'Intent Intelligence',
    syncType: 'Firmographic Enrichment',
    badge: 'Deep Intel',
    color: '#FFB800',
    stats: 'Triple-Verified Telemetry',
    features: ['Direct-Dial Verification', 'Funding & Tech Stack Signals', 'Job Change Alerts'],
    glow: 'rgba(255, 184, 0, 0.35)',
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'Pipeline Management',
    syncType: 'SQL Stage Auto-Creation',
    badge: 'Direct Push',
    color: '#00C853',
    stats: 'Deal Value Calculation',
    features: ['Instant Deal Generation', 'Rotational Rep Assignment', 'Activity Scheduling'],
    glow: 'rgba(0, 200, 83, 0.35)',
  },
  {
    id: 'slack',
    name: 'Slack Connect',
    category: 'Team Notifications',
    syncType: 'Instant Calendar Booking Bot',
    badge: 'Real-Time Alert',
    color: '#E01E5A',
    stats: 'Instant Rep Notification',
    features: ['Live SQL Alert Channel', 'Meeting Context Summary', 'One-Click CRM Deep Link'],
    glow: 'rgba(224, 30, 90, 0.35)',
  },
]

export const TechStackEcosystem = () => {
  const [activePlatform, setActivePlatform] = useState(integrations[0])

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-label="Tech Stack Ecosystem">
      {/* ── Background Ambient Energy Mesh ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-primary/10 dark:bg-[#00A6FF]/12 blur-[160px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cta/10 dark:bg-[#FF6D00]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="relative text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="flex items-center justify-center gap-2 mb-3.5">
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary/70 dark:text-[#00E5FF]/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                Frictionless Ecosystem
              </span>
            </div>

            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-cta/70 dark:text-orange-400/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight leading-[1.16] overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              Connected to Your{' '}
              <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
                Revenue Stack
              </span>
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Zero manual export friction. Verified B2B leads, qualified accounts, and scheduled meetings flow directly into your sales workflow in real time.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-[#00E5FF] to-cta mx-auto rounded-full mt-6" />
        </div>

        {/* ── BENTO SYNAPSE MATRIX: 3D Holographic Cockpit ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: Interactive Live Telemetry Console (Span 5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 rounded-3xl p-7 sm:p-8 bg-surface/90 dark:bg-[#090D18]/90 border border-border/80 dark:border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-xl"
          >
            {/* Dynamic Ambient Platform Aura */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 transition-colors duration-500 pointer-events-none"
              style={{ backgroundColor: activePlatform.color }}
            />

            <div>
              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-border/70 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Relay Active
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold">
                  <ShieldCheck size={13} />
                  <span>256-Bit SSL</span>
                </div>
              </div>

              {/* Central Active Platform Showcase */}
              <div className="my-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePlatform.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-white text-base shadow-lg"
                        style={{
                          backgroundColor: activePlatform.color,
                          boxShadow: `0 8px 20px -4px ${activePlatform.glow}`,
                        }}
                      >
                        {activePlatform.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                          {activePlatform.category}
                        </span>
                        <h3 className="text-xl font-extrabold text-text-primary tracking-tight">
                          {activePlatform.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {activePlatform.syncType}. Automated payload injection designed to eliminate SDR administrative overhead and maximize talk time.
                    </p>

                    {/* Telemetry Feature Badges */}
                    <div className="space-y-2.5 pt-2">
                      {activePlatform.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-text-primary font-medium">
                          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Engine Specs Strip */}
            <div className="pt-5 border-t border-border/70 dark:border-white/10 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-text-muted uppercase">Sync Metric</span>
                <div className="font-mono font-bold text-primary dark:text-[#00E5FF]">
                  {activePlatform.stats}
                </div>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-[10px] font-mono text-text-muted uppercase">Data Accuracy</span>
                <div className="font-mono font-bold text-emerald-500">99.8% SLA</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Interactive Platform Constellation Grid (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {integrations.map((item, idx) => {
              const isSelected = activePlatform.id === item.id

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActivePlatform(item)}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? 'bg-surface dark:bg-[#0B0F19] border-primary shadow-[0_12px_30px_-8px_rgba(0,102,204,0.25)] dark:shadow-[0_10px_25px_-5px_rgba(0,166,255,0.35)] dark:border-[#00E5FF]'
                      : 'bg-surface/80 dark:bg-white/5 border-border/75 dark:border-white/10 hover:border-primary/40 dark:hover:shadow-[0_6px_15px_-4px_rgba(0,166,255,0.2)]'
                  }`}
                >
                  {/* Active Indicator Top Accent Bar */}
                  {isSelected && (
                    <div
                      className="absolute top-0 inset-x-0 h-1"
                      style={{ backgroundColor: item.color }}
                    />
                  )}

                  {/* Top Row: Icon + Name + Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-xs shadow-sm flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-text-primary tracking-tight leading-snug">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-text-muted">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider flex-shrink-0">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Row: Sync Type & Arrow */}
                  <div className="pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-text-secondary">
                    <span className="font-medium truncate pr-2">{item.syncType}</span>
                    <ArrowUpRight
                      size={14}
                      className={`flex-shrink-0 transition-transform duration-200 ${
                        isSelected ? 'text-primary dark:text-[#00E5FF] translate-x-0.5 -translate-y-0.5' : 'text-text-muted'
                      }`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default TechStackEcosystem
