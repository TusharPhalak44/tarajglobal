import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, RefreshCw } from 'lucide-react'

export const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  badge,
  onRefresh,
  isRefreshing = false
}) => {
  const renderBadge = () => {
    if (!badge) return null
    if (typeof badge === 'string') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border border-[var(--admin-primary)]/20 shrink-0">
          {badge}
        </span>
      )
    }
    return <div className="shrink-0">{badge}</div>
  }

  const renderActions = () => {
    if (!actions) return null

    // If actions is an array of configuration objects
    if (Array.isArray(actions) && actions.length > 0 && typeof actions[0] === 'object' && !React.isValidElement(actions[0])) {
      return (
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {actions.map((act, idx) => {
            const Icon = act.icon
            const isPrimary = act.variant === 'primary' || !act.variant
            const isSecondary = act.variant === 'secondary'
            const isDanger = act.variant === 'danger'

            let btnClass = 'admin-btn-primary'
            if (isSecondary) btnClass = 'admin-btn-secondary'
            if (isDanger) btnClass = 'admin-btn-secondary text-rose-400 hover:border-rose-500/50'

            const content = (
              <>
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                <span>{act.label}</span>
              </>
            )

            if (act.to) {
              return (
                <Link key={idx} to={act.to} className={`${btnClass} text-xs flex items-center gap-2`}>
                  {content}
                </Link>
              )
            }

            if (act.href) {
              return (
                <a
                  key={idx}
                  href={act.href}
                  target={act.target || '_blank'}
                  rel="noopener noreferrer"
                  className={`${btnClass} text-xs flex items-center gap-2`}
                >
                  {content}
                </a>
              )
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={act.onClick}
                disabled={act.disabled}
                className={`${btnClass} text-xs flex items-center gap-2`}
              >
                {content}
              </button>
            )
          })}
        </div>
      )
    }

    // Direct React elements / JSX
    return (
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        {actions}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
      <div>
        {/* Breadcrumb path */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-[var(--admin-text-muted)] mb-2">
            <Link to="/admin/dashboard" className="hover:text-[var(--admin-primary)] transition-colors">
              Command Center
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--admin-text-dim)] shrink-0" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-[var(--admin-primary)] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--admin-text-secondary)] font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Title & Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[var(--admin-text-primary)]">
            {title}
          </h1>
          {renderBadge()}
          {onRefresh && (
            <button 
              onClick={onRefresh}
              disabled={isRefreshing}
              className="admin-btn-icon text-[var(--admin-text-muted)] hover:text-[var(--admin-primary)] hover:bg-[var(--admin-primary-soft)]"
              title="Refresh dataset"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[var(--admin-primary)]' : ''}`} />
            </button>
          )}
        </div>

        {subtitle && (
          <p className="text-sm text-[var(--admin-text-secondary)] mt-1 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {renderActions()}
    </div>
  )
}

export default PageHeader
