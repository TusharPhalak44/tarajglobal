import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  Image, 
  FolderOpen, 
  User, 
  Bell, 
  Settings, 
  LogOut,
  X,
  ChevronRight,
  ChevronLeft,
  Globe,
  Building,
  Activity,
  FileEdit,
  Archive,
  LayoutTemplate,
  Footprints,
  Users as UsersIcon,
  BarChart2,
  CreditCard,
  Sparkles
} from 'lucide-react'
import { useAuth } from '@context/AuthContext'
import TGSAdminLogo from './TGSAdminLogo'

export const AdminSidebar = ({ 
  isOpen, 
  onClose, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const navSections = [
    {
      group: 'OVERVIEW',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
      ]
    },
    {
      group: 'CONTENT',
      items: [
        { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
        { icon: FileEdit, label: 'Drafts', path: '/admin/drafts' },
        { icon: Archive, label: 'Archives', path: '/admin/archives' },
        { icon: FolderOpen, label: 'Categories', path: '/admin/categories' },
        { icon: User, label: 'Authors', path: '/admin/authors' },
        { icon: Image, label: 'Media Vault', path: '/admin/media' },
        { icon: LayoutTemplate, label: 'Navbar CMS', path: '/admin/cms/navbar' },
        { icon: Footprints, label: 'Footer CMS', path: '/admin/footer' },
        { icon: UsersIcon, label: 'Client Logos', path: '/admin/cms/clients' },
        { icon: Image, label: 'Culture Gallery', path: '/admin/career-gallery' },
      ]
    },
    {
      group: 'BUSINESS',
      items: [
        { icon: Building, label: 'Inbound Leads', path: '/admin/leads' },
        { icon: Briefcase, label: 'Career Positions', path: '/admin/jobs' },
        { icon: Users, label: 'Candidates', path: '/admin/applications' },
        { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
      ]
    },
    {
      group: 'SYSTEM',
      items: [
        { icon: Globe, label: 'SEO Metadata', path: '/admin/seo' },
        { icon: BarChart2, label: 'SEO Analytics', path: '/admin/seo-analytics' },
        { icon: Users, label: 'Team & RBAC', path: '/admin/users' },
        { icon: Activity, label: 'Audit Trail', path: '/admin/audit-logs' },
        { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
        { icon: User, label: 'Admin Profile', path: '/admin/profile' },
      ]
    }
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/loginadmin')
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background dark:bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:static flex flex-col bg-[var(--admin-bg-surface)] border-r border-[var(--admin-border-base)] transition-all duration-200 ${
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-[255px]'
        } ${
          isOpen ? 'translate-x-0 w-[275px]' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with Unique Bespoke Logo */}
        <div className="h-[68px] flex-none px-3.5 flex items-center justify-between border-b border-[var(--admin-border-base)]">
          <Link 
            to="/admin/dashboard" 
            className="flex items-center gap-3 group min-w-0"
            onClick={onClose}
          >
            {/* Unique Command Center Logo Insignia */}
            <TGSAdminLogo size={38} className="shrink-0 group-hover:scale-105 transition-transform" />

            {(!isCollapsed || isOpen) && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black tracking-tight text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] transition-colors truncate">
                    TARAj GLOBAL
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[var(--admin-text-muted)] tracking-wider uppercase">
                  <span className="text-[var(--admin-primary)]">TGS</span>
                  <span className="text-[var(--admin-text-dim)]">•</span>
                  <span>COMMAND CENTER</span>
                </div>
              </div>
            )}
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] transition-colors ml-1"
            title={isCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation items */}
        <nav 
          className="flex-1 overflow-y-auto px-3 py-4 space-y-5 admin-scrollbar"
          data-lenis-prevent="true"
        >
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {(!isCollapsed || isOpen) ? (
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-[var(--admin-text-muted)] uppercase">
                  {section.group}
                </div>
              ) : (
                <div className="w-full h-px bg-[var(--admin-border-subtle)] my-2" />
              )}

              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || 
                  (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path + '/'))

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    title={isCollapsed && !isOpen ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] font-bold shadow-xs'
                        : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[var(--admin-primary)]' : 'text-[var(--admin-text-muted)]'
                    }`} />

                    {(!isCollapsed || isOpen) && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}

                    {isActive && (!isCollapsed || isOpen) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--admin-primary)] shrink-0" />
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer User Profile */}
        <div className="flex-none p-3 border-t border-[var(--admin-border-base)]">
          {(!isCollapsed || isOpen) ? (
            <div className="p-2.5 rounded-xl bg-[var(--admin-bg-card)] border border-[var(--admin-border-subtle)] flex items-center justify-between gap-2 shadow-xs admin-card-hover">
              <Link 
                to="/admin/profile" 
                onClick={onClose}
                className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A6FF] to-[#0077CC] p-[1px] shrink-0 overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000${user.avatar}`}
                      alt={user.name || 'Admin'}
                      className="w-full h-full object-cover rounded-[7px]"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[7px] bg-[var(--admin-bg-surface)] flex items-center justify-center font-bold text-xs text-[#00A6FF]">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--admin-text-primary)] truncate">
                    {user?.name || 'Administrator'}
                  </p>
                  <p className="text-[10px] text-[var(--admin-text-muted)] truncate capitalize">
                    {user?.role?.replace('_', ' ') || 'Super Admin'}
                  </p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-[var(--admin-text-muted)] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors shrink-0"
                title="Sign out session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Link
                to="/admin/profile"
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A6FF] to-[#0077CC] p-[1px] flex items-center justify-center overflow-hidden"
                title="Admin Profile"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000${user.avatar}`}
                    alt={user.name || 'Admin'}
                    className="w-full h-full object-cover rounded-[9px]"
                  />
                ) : (
                  <div className="w-full h-full rounded-[9px] bg-[var(--admin-bg-surface)] flex items-center justify-center font-bold text-xs text-[#00A6FF]">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--admin-text-muted)] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                title="Sign out session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
