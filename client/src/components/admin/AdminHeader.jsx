import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Menu, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  ExternalLink,
  Shield
} from 'lucide-react'
import { useAuth } from '@context/AuthContext'
import { mediaUrl } from '@utils/media'

export const AdminHeader = ({ onToggleSidebar, onOpenCommandPalette, sidebarCollapsed }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isUserRole = user?.role === 'user' || location.pathname.startsWith('/user')
  const basePath = isUserRole ? '/user' : '/admin'

  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('/blogs/create')) return 'Create Article'
    if (path.includes('/blogs/edit')) return 'Edit Article'
    if (path.includes('/blogs')) return isUserRole ? 'My Articles' : 'Blog Publishing'
    if (path.includes('/drafts')) return isUserRole ? 'My Drafts' : 'Drafts'
    if (path.includes('/archives')) return 'Archives'
    if (path.includes('/categories')) return 'Content Categories'
    if (path.includes('/authors')) return 'Authors'
    if (path.includes('/media')) return 'Media Vault'
    if (path.includes('/jobs')) return 'Career Positions'
    if (path.includes('/applications')) return 'Candidate Matrix'
    if (path.includes('/leads')) return 'Inbound Leads'
    if (path.includes('/seo-analytics')) return 'SEO Analytics'
    if (path.includes('/seo')) return 'SEO Engine'
    if (path.includes('/users')) return 'Team & Access'
    if (path.includes('/audit-logs')) return 'Audit Trail'
    if (path.includes('/profile')) return 'My Profile'
    if (path.includes('/settings')) return 'Settings'
    if (path.includes('/cms/clients')) return 'Client Logos CMS'
    if (path.includes('/career-gallery')) return 'Culture Gallery'
    return isUserRole ? 'User Portal' : 'Command Overview'
  }

  const handleLogout = async () => {
    await logout()
    navigate('/loginadmin')
  }

  return (
    <header className="h-[64px] sticky top-0 z-30 bg-[var(--admin-bg-surface)] border-b border-[var(--admin-border-base)] px-4 sm:px-6 flex items-center justify-between gap-4 shadow-sm transition-colors duration-200">
      {/* Left: Mobile Menu + Section Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-1 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-accent)] hover:bg-[var(--admin-bg-elevated)] transition-colors lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-base sm:text-base font-bold text-[var(--admin-text-primary)] tracking-tight truncate">
            {getPageTitle()}
          </span>
        </div>
      </div>

      {/* Center: Command Trigger Search (⌘ K) */}
      <div className="flex-1 max-w-sm mx-2 sm:mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)] text-sm text-[var(--admin-text-muted)] hover:border-[var(--admin-border-hover)] hover:text-[var(--admin-text-accent)] hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="w-4 h-4 text-[var(--admin-text-muted)] shrink-0" />
            <span className="truncate">Search commands, pages, content...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[12px] font-mono bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-md text-[var(--admin-text-muted)] shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* View Live Site */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] border border-transparent hover:border-[var(--admin-border-base)] transition-all"
          title="Open live website in new tab"
        >
          <span>Live Site</span>
          <ExternalLink className="w-4 h-4 text-[var(--admin-text-muted)]" />
        </a>

        {/* Profile Dropdown Trigger */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-[var(--admin-bg-elevated)] border border-transparent hover:border-[var(--admin-border-base)] transition-all"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00A6FF] to-[#0066CC] p-[1px] shadow-sm overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar.startsWith('http') ? user.avatar : mediaUrl(user.avatar)}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover rounded-[7px]"
                />
              ) : (
                <div className="w-full h-full rounded-[7px] bg-[var(--admin-bg-surface)] flex items-center justify-center font-bold text-sm text-[var(--admin-primary)]">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
            </div>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-[var(--admin-bg-card)] border border-[var(--admin-border-base)] rounded-xl shadow-xl p-2 z-50 animate-fade-in text-sm admin-card-hover">
              <Link
                to={`${basePath}/profile`}
                onClick={() => setProfileDropdownOpen(false)}
                className="block p-2.5 rounded-lg hover:bg-[var(--admin-bg-elevated)] transition-colors mb-1.5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-[var(--admin-primary)]" />
                  <span className="font-bold text-[var(--admin-text-primary)] truncate">{user?.name || (isUserRole ? 'User' : 'Administrator')}</span>
                </div>
                <p className="text-[13px] text-[var(--admin-text-muted)] truncate">{user?.email || ''}</p>
              </Link>

              <div className="border-t border-[var(--admin-border-subtle)] pt-1.5 space-y-1">
                <Link
                  to={`${basePath}/profile`}
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] rounded-lg transition-colors font-medium"
                >
                  <User className="w-4 h-4 text-[var(--admin-primary)]" />
                  <span>Profile & Security</span>
                </Link>

                {!isUserRole && (
                  <Link
                    to="/admin/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] rounded-lg transition-colors font-medium"
                  >
                    <Settings className="w-4 h-4 text-[var(--admin-text-muted)]" />
                    <span>Settings</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] rounded-lg transition-colors font-medium text-left mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
