import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  changeLabel = 'vs last month',
  accentColor = 'cyan', // 'cyan', 'orange', 'green', 'purple', 'warning'
  subtitle,
  onClick
}) => {
  const colorMap = {
    cyan: {
      border: 'hover:border-[#00A6FF]/40',
      iconBg: 'bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/20',
      glow: 'shadow-[0_0_20px_rgba(0,166,255,0.12)]',
      accentBar: 'bg-[#00A6FF]'
    },
    orange: {
      border: 'hover:border-[#FF6D00]/40',
      iconBg: 'bg-[#FF6D00]/10 text-[#FF6D00] border border-[#FF6D00]/20',
      glow: 'shadow-[0_0_20px_rgba(255,109,0,0.12)]',
      accentBar: 'bg-[#FF6D00]'
    },
    green: {
      border: 'hover:border-[#72D669]/40',
      iconBg: 'bg-[#72D669]/10 text-[#72D669] border border-[#72D669]/20',
      glow: 'shadow-[0_0_20px_rgba(114,214,105,0.12)]',
      accentBar: 'bg-[#72D669]'
    },
    purple: {
      border: 'hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.12)]',
      accentBar: 'bg-purple-500'
    },
    warning: {
      border: 'hover:border-[#FFA600]/40',
      iconBg: 'bg-[#FFA600]/10 text-[#FFA600] border border-[#FFA600]/20',
      glow: 'shadow-[0_0_20px_rgba(255,166,0,0.12)]',
      accentBar: 'bg-[#FFA600]'
    }
  }

  const currentTheme = colorMap[accentColor] || colorMap.cyan
  const isPositive = typeof change === 'number' && change > 0
  const isNegative = typeof change === 'number' && change < 0

  return (
    <div 
      onClick={onClick}
      className={`admin-card p-5 lg:p-6 transition-all duration-300 relative overflow-hidden group ${currentTheme.border} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Top subtle highlight line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${currentTheme.accentBar}`} />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-semibold text-[var(--admin-text-muted)] tracking-wider uppercase">
            {label}
          </span>
          <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[var(--admin-text-primary)] mt-1">
            {value ?? 0}
          </div>
        </div>

        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${currentTheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--admin-border-subtle)]">
        {change !== undefined && change !== null ? (
          <div className="flex items-center gap-1.5 font-medium">
            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
              isPositive ? 'text-[#72D669] bg-[#72D669]/10' :
              isNegative ? 'text-[#F43F5E] bg-[#F43F5E]/10' :
              'text-[var(--admin-text-muted)] bg-slate-500/10'
            }`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-[var(--admin-text-muted)]">{changeLabel}</span>
          </div>
        ) : subtitle ? (
          <span className="text-[var(--admin-text-muted)]">{subtitle}</span>
        ) : (
          <span className="text-[var(--admin-text-muted)]">Live Operational Metric</span>
        )}
      </div>
    </div>
  )
}

export default StatCard
