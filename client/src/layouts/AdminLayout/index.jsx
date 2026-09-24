import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import SEO from '@components/common/SEO'
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
  Menu,
  X,
  ChevronRight,
  Globe,
  Building,
  Activity,
  FileEdit,
  Archive,
  LayoutTemplate,
  Footprints,
  Users as UsersIcon,
  Calendar
} from 'lucide-react'
import { useAuth } from '@context/AuthContext'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  })
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Auto-close sidebar on route change on mobile devices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [location.pathname])

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
    { icon: FileEdit, label: 'Drafts', path: '/admin/drafts' },
    { icon: Archive, label: 'Archives', path: '/admin/archives' },
    { icon: Briefcase, label: 'Jobs', path: '/admin/jobs' },
    { icon: Users, label: 'Applications', path: '/admin/applications' },
    { icon: Image, label: 'Media Library', path: '/admin/media' },
    { icon: FolderOpen, label: 'Categories', path: '/admin/categories' },
    { icon: User, label: 'Authors', path: '/admin/authors' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: LayoutTemplate, label: 'Header & Navbar', path: '/admin/cms/navbar' },
    { icon: Footprints, label: 'Footer Management', path: '/admin/footer' },
    { icon: Image, label: 'Career Gallery', path: '/admin/career-gallery' },
    { icon: UsersIcon, label: 'Our Clients', path: '/admin/cms/clients' },
    { icon: Globe, label: 'SEO', path: '/admin/seo' },
    { icon: Building, label: 'Leads', path: '/admin/leads' },
    { icon: Calendar, label: 'Meetings', path: '/admin/meetings' },
    { icon: Activity, label: 'Audit Logs', path: '/admin/audit-logs' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/loginadmin')
  }

  return (
    <>
      <SEO title="Admin Control Center | Taraj Global" noIndex={true} />
      <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-cta flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-text-primary">TaRaj Admin</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-primary rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-text-secondary hover:bg-surface/80 hover:text-text-primary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => navigate('/admin/profile')}
              className="flex items-center gap-3 w-full mb-4 p-2 min-h-[44px] rounded-lg hover:bg-surface/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {user?.role || 'Admin'}
                </p>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 min-h-[44px] text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-surface border-b border-border px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-primary rounded-lg transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              {/* Notifications */}
              <button 
                className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-cta rounded-full"></span>
              </button>

              {/* Profile */}
              <button
                onClick={() => navigate('/admin/profile')}
                className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-border hover:bg-surface/80 rounded-lg p-1.5 sm:p-2 min-h-[44px] transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-text-primary">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-text-muted">
                    {user?.role || 'Admin'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      </div>
    </>
  )
}

export default AdminLayout
