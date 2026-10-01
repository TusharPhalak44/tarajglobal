import React from 'react'
import { FolderOpen, Plus } from 'lucide-react'

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No records found',
  description = 'There is currently no data to display for this view or filter criteria.',
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)] flex items-center justify-center mb-4 text-[var(--admin-text-muted)] shadow-inner">
        <Icon className="w-8 h-8 text-[var(--admin-primary)]/80" />
      </div>

      <h3 className="text-base font-semibold text-[var(--admin-text-primary)] mb-1">
        {title}
      </h3>
      
      <p className="text-base text-[var(--admin-text-muted)] max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="admin-btn admin-btn-primary shadow-lg shadow-[var(--admin-primary-soft)]"
        >
          {ActionIcon && <ActionIcon className="w-4 h-4" />}
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  )
}

export default EmptyState
