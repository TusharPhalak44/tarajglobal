import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Target,
  Zap,
  TrendingUp,
  Database,
  Search,
  CheckCircle2,
  Mail,
  Calendar,
  Layers,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

const SOLUTIONS_COLUMNS = [
  {
    title: 'Lead Generation',
    accent: '#00A6FF',
    items: [
      {
        name: 'Email Marketing',
        path: '/b2b-email-marketing',
        desc: 'Cold outbound and multi-touch nurture cadences',
        icon: Mail,
      },
      {
        name: 'MQL Services',
        path: '/mql-services',
        desc: 'High-volume engaged marketing prospects',
        icon: TrendingUp,
      },
      {
        name: 'HQL Services',
        path: '/hql-services',
        desc: 'High-quality leads with verified intent and interest',
        icon: ShieldCheck,
      },
      {
        name: 'BANT Services',
        path: '/bant-lead-generation',
        desc: 'Budget, Authority, Need & Timeline qualified',
        icon: CheckCircle2,
      },
      {
        name: 'SQL Services',
        path: '/sql-services',
        desc: 'Sales-ready leads matched with active intent',
        icon: Target,
      },
      {
        name: 'Appointment Generation',
        path: '/b2b-appointment-setting',
        desc: 'Direct confirmed meetings on sales calendars',
        icon: Calendar,
      },
    ],
  },
  {
    title: 'Demand & ABM',
    accent: '#FF6D00',
    items: [
      {
        name: 'Lead Nurturing',
        path: '/lead-nurturing',
        desc: 'Multi-stage account engagement cadences',
        icon: TrendingUp,
      },
      {
        name: 'Content Syndication',
        path: '/content-syndication',
        desc: 'Distribute whitepapers to targeted buying groups',
        icon: FileSpreadsheet,
      },
      {
        name: 'Account-Based Marketing',
        path: '/abm',
        desc: 'Targeted multi-tier key account penetration',
        icon: Layers,
      },
      {
        name: 'Webinar Services',
        path: '/webinar-services',
        desc: 'Qualified executive webinar attendees',
        icon: Sparkles,
      },
      {
        name: 'Demand Generation',
        path: '/demand-generation',
        desc: 'Full-funnel pipeline and velocity growth',
        icon: Zap,
      },
    ],
  },
  {
    title: 'Data & Operations',
    accent: '#10B981',
    items: [
      {
        name: 'B2B List Building',
        path: '/b2b-list-building',
        desc: 'Custom human-verified decision-maker lists',
        icon: Search,
      },
      {
        name: 'Database Cleansing',
        path: '/database-cleansing',
        desc: 'Data hygiene, enrichment and deduplication',
        icon: Database,
      },
    ],
  },
]

export const MegaMenu = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[860px] max-w-[95vw] bg-white/95 dark:bg-[#0C1220]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 z-50 overflow-hidden"
      role="menu"
      aria-label="Solutions Submenu"
    >
      {/* Top Ambient Glow Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00A6FF]/60 to-transparent" />

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SOLUTIONS_COLUMNS.map((col) => (
          <div key={col.title} className="space-y-3">
            {/* Column Header */}
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: col.accent, boxShadow: `0 0 6px ${col.accent}` }}
              />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                {col.title}
              </span>
            </div>

            {/* Column Items */}
            <div className="space-y-1">
              {col.items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all group"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${col.accent}15`,
                        color: col.accent,
                        border: `1px solid ${col.accent}30`
                      }}
                    >
                      <Icon size={14} />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#00A6FF] dark:group-hover:text-[#00A6FF] transition-colors leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar: Quick View All + SLA */}
      <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs bg-slate-50/70 dark:bg-white/[0.02] -mx-6 -mb-6 px-6 py-3">
        <Link
          to="/services"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 font-bold text-[#00A6FF] hover:underline"
        >
          <span>Explore All Growth Solutions</span>
          <ArrowRight size={13} />
        </Link>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:flex">
          <span className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-500" />
            99.8% Data Accuracy SLA
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-[#FF6D00] font-semibold">
            48–72h Rapid Outbound
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default MegaMenu
