import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SEO from '@components/common/SEO'
import AdminHeader from '@components/admin/AdminHeader'
import AdminSidebar from '@components/admin/AdminSidebar'
import AdminCommandPalette from '@components/admin/AdminCommandPalette'

const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tgs_admin_sidebar_collapsed') === 'true'
    }
    return false
  })
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const location = useLocation()

  // Auto-close mobile sidebar on route navigation
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname])

  // Save desktop collapse preference
  const toggleDesktopCollapse = () => {
    setDesktopCollapsed(prev => {
      const next = !prev
      localStorage.setItem('tgs_admin_sidebar_collapsed', String(next))
      return next
    })
  }

  // Global keydown listener for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <SEO title="TGS Command Center | Taraj Global" noIndex={true} />

      <div className="admin-layout-root flex h-screen overflow-hidden bg-[var(--admin-bg-base)]">
        {/* Left Sidebar */}
        <AdminSidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          isCollapsed={desktopCollapsed}
          onToggleCollapse={toggleDesktopCollapse}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
          {/* Top Header */}
          <AdminHeader
            onToggleSidebar={() => setMobileSidebarOpen(prev => !prev)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            sidebarCollapsed={desktopCollapsed}
          />

          {/* Page View with Futuristic Tech Grid */}
          <main 
            className="flex-1 overflow-y-auto admin-tech-grid admin-scrollbar p-4 sm:p-6 lg:p-8"
            data-lenis-prevent="true"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Global Command Palette */}
        <AdminCommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
      </div>
    </>
  )
}

export default AdminLayout
