import React from 'react'

export const Skeleton = ({ className = '', variant = 'text', width, height }) => {
  const styles = {}
  if (width) styles.width = width
  if (height) styles.height = height

  const variantClass = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-xl',
    button: 'h-10 rounded-lg',
    card: 'h-36 rounded-2xl'
  }[variant] || 'rounded'

  return (
    <div 
      className={`admin-skeleton ${variantClass} ${className}`}
      style={styles}
    />
  )
}

export const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="space-y-4">
      {/* Header filter skeleton */}
      <div className="flex items-center justify-between gap-4 py-2">
        <Skeleton className="w-64 h-10" />
        <div className="flex gap-2">
          <Skeleton className="w-28 h-10" />
          <Skeleton className="w-28 h-10" />
        </div>
      </div>

      {/* Table rows skeleton */}
      <div className="admin-card overflow-hidden">
        <div className="p-4 border-b border-[var(--admin-border-subtle)] flex items-center justify-between">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
        <div className="p-4 space-y-4">
          {Array.from({ length: rows }).map((_, rIdx) => (
            <div key={rIdx} className="flex items-center gap-4 py-2">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
              <Skeleton className="flex-1 h-5" />
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-16 h-5" />
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="w-56 h-8 mb-2" />
          <Skeleton className="w-80 h-4" />
        </div>
        <Skeleton className="w-32 h-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} variant="card" className="h-32" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton variant="card" className="h-80" />
        <Skeleton variant="card" className="h-80" />
      </div>
    </div>
  )
}

export default Skeleton
