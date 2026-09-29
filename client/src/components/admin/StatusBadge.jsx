import React from 'react'
import { CheckCircle2, Clock, XCircle, FileText, Sparkles, Send, Flame, Eye, Archive } from 'lucide-react'

export const StatusBadge = ({ status, customLabel, size = 'sm', showDot = true }) => {
  if (!status) return null

  const s = String(status).toLowerCase().trim()
  
  const config = {
    // Content Statuses
    published: { label: 'Published', className: 'admin-badge-green', dotColor: 'bg-emerald-400' },
    draft: { label: 'Draft', className: 'admin-badge-neutral', dotColor: 'bg-slate-400' },
    archived: { label: 'Archived', className: 'admin-badge-amber', dotColor: 'bg-amber-400' },
    scheduled: { label: 'Scheduled', className: 'admin-badge-blue', dotColor: 'bg-blue-400' },

    // Lead & CRM Statuses
    new: { label: 'New Inbound', className: 'admin-badge-blue', dotColor: 'bg-blue-400' },
    contacted: { label: 'Contacted', className: 'admin-badge-orange', dotColor: 'bg-orange-400' },
    qualified: { label: 'Qualified', className: 'admin-badge-green', dotColor: 'bg-emerald-400' },
    converted: { label: 'Converted', className: 'admin-badge-green', dotColor: 'bg-emerald-400' },
    closed: { label: 'Closed', className: 'admin-badge-neutral', dotColor: 'bg-slate-500' },

    // Job & Talent Statuses
    active: { label: 'Active', className: 'admin-badge-green', dotColor: 'bg-emerald-400' },
    inactive: { label: 'Inactive', className: 'admin-badge-neutral', dotColor: 'bg-slate-500' },
    applied: { label: 'Applied', className: 'admin-badge-blue', dotColor: 'bg-blue-400' },
    screening: { label: 'Screening', className: 'admin-badge-orange', dotColor: 'bg-orange-400' },
    shortlisted: { label: 'Shortlisted', className: 'admin-badge-blue', dotColor: 'bg-blue-400' },
    interview: { label: 'Interview', className: 'admin-badge-amber', dotColor: 'bg-amber-400' },
    selected: { label: 'Selected', className: 'admin-badge-green', dotColor: 'bg-emerald-400' },
    rejected: { label: 'Rejected', className: 'admin-badge-red', dotColor: 'bg-rose-400' },

    // User Roles
    super_admin: { label: 'Super Admin', className: 'admin-badge-blue', dotColor: 'bg-blue-400' },
    admin: { label: 'Admin', className: 'admin-badge-blue', dotColor: 'bg-blue-400' },
    editor: { label: 'Editor', className: 'admin-badge-orange', dotColor: 'bg-orange-400' },
    hr_recruiter: { label: 'HR Recruiter', className: 'admin-badge-amber', dotColor: 'bg-amber-400' },
    content_manager: { label: 'Content Manager', className: 'admin-badge-blue', dotColor: 'bg-blue-400' },
    user: { label: 'User', className: 'admin-badge-neutral', dotColor: 'bg-slate-400' }
  }

  const current = config[s] || {
    label: s.replace(/_/g, ' '),
    className: 'admin-badge-neutral',
    dotColor: 'bg-slate-400'
  }

  const labelText = customLabel || current.label

  return (
    <span className={`admin-badge ${current.className} ${size === 'xs' ? 'text-[11px] py-0.5 px-2' : size === 'lg' ? 'text-sm py-1 px-3.5' : ''}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor} shrink-0`} />
      )}
      <span>{labelText}</span>
    </span>
  )
}

export default StatusBadge
