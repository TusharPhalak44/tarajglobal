import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  Image, 
  FolderOpen, 
  User, 
  Settings, 
  Building, 
  Globe, 
  BarChart2, 
  Activity, 
  Bell, 
  CreditCard,
  Layers,
  ArrowRight,
  X,
  Command
} from 'lucide-react'

export const AdminCommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const commands = [
    { label: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard, category: 'Overview' },
    { label: 'Blog Posts & CMS', path: '/admin/blogs', icon: FileText, category: 'Content' },
    { label: 'Create New Blog Post', path: '/admin/blogs/create', icon: FileText, category: 'Quick Action' },
    { label: 'Draft Articles', path: '/admin/drafts', icon: FileText, category: 'Content' },
    { label: 'Archived Content', path: '/admin/archives', icon: FolderOpen, category: 'Content' },
    { label: 'Job Openings', path: '/admin/jobs', icon: Briefcase, category: 'Careers' },
    { label: 'Job Applications', path: '/admin/applications', icon: Users, category: 'Careers' },
    { label: 'Inbound Leads & CRM', path: '/admin/leads', icon: Building, category: 'Revenue' },
    { label: 'Digital Media Library', path: '/admin/media', icon: Image, category: 'Media' },
    { label: 'Categories Manager', path: '/admin/categories', icon: FolderOpen, category: 'Content' },
    { label: 'Blog Authors', path: '/admin/authors', icon: User, category: 'Content' },
    { label: 'Team & RBAC Users', path: '/admin/users', icon: Users, category: 'System' },
    { label: 'SEO Metadata Center', path: '/admin/seo', icon: Globe, category: 'SEO & Growth' },
    { label: 'SEO Performance Analytics', path: '/admin/seo-analytics', icon: BarChart2, category: 'SEO & Growth' },
    { label: 'Audit & Activity Logs', path: '/admin/audit-logs', icon: Activity, category: 'System' },
    { label: 'Notification Center', path: '/admin/notifications', icon: Bell, category: 'System' },
    { label: 'Payment Gateways', path: '/admin/payments', icon: CreditCard, category: 'System' },
    { label: 'Header & Navbar CMS', path: '/admin/cms/navbar', icon: Layers, category: 'CMS' },
    { label: 'Footer Architecture CMS', path: '/admin/footer', icon: Layers, category: 'CMS' },
    { label: 'Client Logos Manager', path: '/admin/cms/clients', icon: Building, category: 'CMS' },
    { label: 'Career Gallery Showcase', path: '/admin/career-gallery', icon: Image, category: 'CMS' },
    { label: 'System Settings', path: '/admin/settings', icon: Settings, category: 'System' },
  ]

  const filteredCommands = commands.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1))
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault()
        navigate(filteredCommands[selectedIndex].path)
        onClose()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, navigate, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-down">
        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--admin-border-subtle)] bg-[var(--admin-bg-card)]">
          <Search className="w-5 h-5 text-[var(--admin-primary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search commands, pages, content, settings... (ESC to exit)"
            className="flex-1 bg-transparent text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)] outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--admin-text-dim)] px-2 py-0.5 rounded border border-[var(--admin-border-subtle)]">
            ESC
          </span>
        </div>

        {/* Command list */}
        <div className="max-h-[380px] overflow-y-auto p-2 admin-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--admin-text-muted)]">
              No matching commands or pages found for "{query}"
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const Icon = item.icon
              const isSelected = idx === selectedIndex

              return (
                <div
                  key={item.path}
                  onClick={() => {
                    navigate(item.path)
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border border-[var(--admin-border-active)]'
                      : 'text-[var(--admin-text-secondary)] hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-text-primary)] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[var(--admin-primary)] text-white' : 'bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[var(--admin-text-dim)] uppercase tracking-wider">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[var(--admin-primary)]" />}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--admin-border-subtle)] bg-[var(--admin-bg-base)] text-[11px] text-[var(--admin-text-dim)]">
          <div className="flex items-center gap-3">
            <span>Navigate <kbd className="px-1.5 py-0.5 rounded bg-[var(--admin-bg-card)] border border-[var(--admin-border-subtle)] text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[var(--admin-bg-card)] border border-[var(--admin-border-subtle)] text-[10px]">↓</kbd></span>
            <span>Select <kbd className="px-1.5 py-0.5 rounded bg-[var(--admin-bg-card)] border border-[var(--admin-border-subtle)] text-[10px]">↵</kbd></span>
          </div>
          <span>TGS Operations Engine</span>
        </div>
      </div>
    </div>
  )
}

export default AdminCommandPalette
