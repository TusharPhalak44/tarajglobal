import React, { useEffect, useState, useRef } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Sliders,
  Sparkles,
  Link2,
  Laptop,
  Tablet,
  Smartphone,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
  Menu
} from 'lucide-react'
import { adminAPI } from '@api'

const CMSNavbar = () => {
  const [loading, setLoading] = useState(true)
  const [navbarItems, setNavbarItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [showItemModal, setShowItemModal] = useState(false)
  const [savingItem, setSavingItem] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Active tab: 'settings' | 'header' | 'navbar' | 'preview'
  const [activeTab, setActiveTab] = useState('settings')

  // Live preview device simulation: 'desktop' | 'tablet' | 'mobile'
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [previewServicesOpen, setPreviewServicesOpen] = useState(false)
  const [previewMobileMenuOpen, setPreviewMobileMenuOpen] = useState(false)

  // Logo & Header settings state
  const [logoUrl, setLogoUrl] = useState('')
  const [logoText, setLogoText] = useState('Taraj Global')
  const [logoAlt, setLogoAlt] = useState('Taraj Global - B2B Growth & Lead Generation Agency')
  const [headerVisible, setHeaderVisible] = useState(true)
  const [logoPreview, setLogoPreview] = useState('')
  const [logoSaving, setLogoSaving] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      await Promise.all([fetchNavbarItems(), fetchLogoSettings()])
    } catch (error) {
      console.error('Error fetching CMS data:', error)
      showMessage('error', 'Failed to load Header & Navbar data')
    } finally {
      setLoading(false)
    }
  }

  const fetchLogoSettings = async () => {
    try {
      const response = await adminAPI.getLogo()
      const data = response.data?.data || response.data || {}
      setLogoUrl(data.logo_url || '/middle.png')
      setLogoPreview(data.logo_url || '/middle.png')
      setLogoText(data.logo_text || 'Taraj Global')
      setLogoAlt(data.logo_alt || 'Taraj Global - B2B Growth & Lead Generation Agency')
      setHeaderVisible(data.header_visible !== false)
    } catch (error) {
      console.error('Failed to fetch logo settings:', error)
    }
  }

  const fetchNavbarItems = async () => {
    try {
      const response = await adminAPI.getNavbarItems()
      const items = Array.isArray(response.data?.data)
        ? response.data.data
        : (Array.isArray(response.data) ? response.data : [])
      setNavbarItems(items)
    } catch (error) {
      console.error('Failed to fetch navbar items:', error)
      setNavbarItems([])
      showMessage('error', 'Failed to load navbar items')
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select a valid image file (PNG, JPG, WEBP, SVG)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'Image size should be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setLogoUrl(reader.result)
      setLogoPreview(reader.result)
      showMessage('success', 'Image selected! Click "Save Header & Logo" to apply.')
    }
    reader.readAsDataURL(file)
  }

  const handleSaveLogoSettings = async (e) => {
    e?.preventDefault()
    try {
      setLogoSaving(true)
      const res = await adminAPI.updateLogo({
        logo_url: logoUrl,
        logo_text: logoText,
        logo_alt: logoAlt,
        header_visible: headerVisible
      })
      const data = res.data?.data || res.data || {}
      if (data.logo_url) {
        setLogoUrl(data.logo_url)
        setLogoPreview(data.logo_url)
      }
      notifyNavbarUpdated()
      showMessage('success', 'Header branding & logo updated successfully! Changes reflect on the website.')
    } catch (error) {
      console.error('Failed to save logo:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save logo settings')
    } finally {
      setLogoSaving(false)
    }
  }

  // Cross-component and cross-tab sync notifier
  const notifyNavbarUpdated = () => {
    try {
      localStorage.setItem('taraj_cms_navbar_updated', Date.now().toString())
      window.dispatchEvent(new CustomEvent('taraj_navbar_updated'))
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel('taraj_cms_channel')
        bc.postMessage({ type: 'NAVBAR_UPDATED' })
        bc.close()
      }
    } catch (_) {}
  }

  const handleResetDefaultLogo = () => {
    setLogoUrl('/middle.png')
    setLogoPreview('/middle.png')
    setLogoText('Taraj Global')
    setLogoAlt('Taraj Global - B2B Growth & Lead Generation Agency')
    showMessage('success', 'Logo reset to default template. Click "Save Header & Logo" to apply.')
  }

  // Modal openers
  const handleAddItem = (section = 'navbar') => {
    const safeItems = Array.isArray(navbarItems) ? navbarItems : []
    const sectionItems = safeItems.filter(item => item.section === section)
    setEditingItem({
      section,
      label: '',
      url: '',
      parent_id: null,
      display_order: sectionItems.length + 1,
      is_active: true
    })
    setShowItemModal(true)
  }

  const handleEditItem = (item) => {
    setEditingItem({
      ...item,
      section: item.section || 'navbar',
      is_active: item.is_active === 1 || item.is_active === true
    })
    setShowItemModal(true)
  }

  const handleToggleItemActive = async (item) => {
    try {
      const updatedStatus = !(item.is_active === 1 || item.is_active === true)
      await adminAPI.updateNavbarItem(item.id, {
        section: item.section,
        label: item.label,
        url: item.url,
        parent_id: item.parent_id || null,
        display_order: item.display_order,
        is_active: updatedStatus
      })
      notifyNavbarUpdated()
      showMessage('success', `Item "${item.label}" ${updatedStatus ? 'activated' : 'deactivated'}`)
      fetchNavbarItems()
    } catch (error) {
      console.error('Failed to toggle item status:', error)
      showMessage('error', 'Failed to change item status')
    }
  }

  const handleSaveItem = async (e) => {
    e.preventDefault()
    if (!editingItem.label || !editingItem.url) {
      showMessage('error', 'Label and URL are required')
      return
    }

    try {
      setSavingItem(true)
      const payload = {
        section: editingItem.section || 'navbar',
        label: editingItem.label.trim(),
        url: editingItem.url.trim(),
        parent_id: editingItem.parent_id || null,
        display_order: Number(editingItem.display_order) || 0,
        is_active: editingItem.is_active
      }

      if (editingItem.id) {
        await adminAPI.updateNavbarItem(editingItem.id, payload)
        showMessage('success', `"${payload.label}" updated successfully`)
      } else {
        await adminAPI.createNavbarItem(payload)
        showMessage('success', `"${payload.label}" added to ${payload.section}`)
      }

      setShowItemModal(false)
      setEditingItem(null)
      notifyNavbarUpdated()
      fetchNavbarItems()
    } catch (error) {
      console.error('Failed to save item:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save item')
    } finally {
      setSavingItem(false)
    }
  }

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.label}"?`)) return

    try {
      await adminAPI.deleteNavbarItem(item.id)
      notifyNavbarUpdated()
      showMessage('success', `Item "${item.label}" removed successfully`)
      fetchNavbarItems()
    } catch (error) {
      console.error('Failed to delete item:', error)
      showMessage('error', error.response?.data?.message || 'Failed to delete item')
    }
  }

  const safeNavbarItems = Array.isArray(navbarItems) ? navbarItems : []
  const headerItems = safeNavbarItems.filter(item => item.section === 'header')
  const navItems = safeNavbarItems.filter(item => item.section === 'navbar' || (!item.section && item.section !== 'header'))

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-text-muted gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <p className="font-medium text-sm">Loading Header & Navbar CMS configuration...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Alert */}
      {message.text && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border shadow-lg transition-all animate-in fade-in slide-in-from-top-2 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Header & Navbar Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              Live CMS
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            Dynamically customize company logo, top announcement bar, and primary navigation menus.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-surface border border-border hover:bg-border/30 text-text-primary transition-all"
            title="Reload from database"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Quick Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Main Nav Items</div>
            <div className="text-xl font-bold text-text-primary mt-1">{navItems.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
            <Link2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Header Bar Items</div>
            <div className="text-xl font-bold text-text-primary mt-1">{headerItems.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Sliders className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Logo Branding</div>
            <div className="text-sm font-bold text-text-primary mt-1.5 truncate max-w-[120px]">
              {logoText || 'Taraj Global'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Announcement Bar</div>
            <div className="text-sm font-bold text-text-primary mt-1.5">
              {headerVisible ? (
                <span className="text-emerald-400">Enabled</span>
              ) : (
                <span className="text-slate-400">Disabled</span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Globe className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto pb-0.5">
        {[
          { id: 'settings', label: 'Logo & Branding', icon: ImageIcon },
          { id: 'header', label: 'Top Header Bar', icon: Sliders },
          { id: 'navbar', label: 'Main Navbar Menu', icon: Link2 },
          { id: 'preview', label: 'Live Preview', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                isActive
                  ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.id === 'preview' && (
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      {/* ==================== TAB 1: LOGO & BRANDING ==================== */}
      {activeTab === 'settings' && (
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-gradient-to-r from-surface to-background flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary">Company Logo & Branding</h2>
                <p className="text-xs text-text-secondary">
                  Upload image file or set URL for website logo, brand title, and header display options.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetDefaultLogo}
                className="text-xs text-text-muted hover:text-text-primary px-3 py-1.5 rounded-lg border border-border hover:bg-background transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveLogoSettings} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Live Logo Preview Box */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-background rounded-xl border border-border text-center space-y-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
                  Current Logo Preview
                </span>

                <div className="w-full h-32 rounded-xl bg-slate-900/40 border border-border/80 flex items-center justify-center p-4 relative overflow-hidden group">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt={logoAlt || 'Preview'}
                      className="max-h-20 max-w-full object-contain transition-transform group-hover:scale-105 drop-shadow-md"
                      onError={() => {
                        showMessage('error', 'Unable to load image from current URL')
                      }}
                    />
                  ) : (
                    <span className="text-xs text-text-muted font-mono">No logo specified</span>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm font-semibold text-text-primary">{logoText || 'Taraj Global'}</p>
                  <p className="text-xs text-text-muted truncate max-w-xs mt-0.5">{logoUrl || '/middle.png'}</p>
                </div>

                {/* Upload Button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-surface hover:bg-surface/80 border border-border rounded-xl text-sm font-medium text-text-primary transition-all shadow-xs hover:border-primary/50"
                >
                  <Upload className="w-4 h-4 text-primary" />
                  Upload New Image from Device
                </button>
              </div>

              {/* Inputs */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Logo URL / Path
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => {
                        setLogoUrl(e.target.value)
                        setLogoPreview(e.target.value)
                      }}
                      placeholder="/middle.png or https://example.com/logo.png"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    You can type an image path (e.g. <code className="text-primary">/middle.png</code>, <code className="text-primary">/OnlyTG- 3.png</code>), a CDN URL, or use the upload button on the left.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                      Brand Name / Logo Text
                    </label>
                    <input
                      type="text"
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                      placeholder="Taraj Global"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                      Logo Alt Text (SEO)
                    </label>
                    <input
                      type="text"
                      value={logoAlt}
                      onChange={(e) => setLogoAlt(e.target.value)}
                      placeholder="Taraj Global - B2B Growth Agency"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Top Header Bar Visibility Toggle */}
                <div className="p-4 rounded-xl bg-background border border-border flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-primary">Top Announcement & Header Bar</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${headerVisible ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                        {headerVisible ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Show top announcement / contact bar above the navbar when active header items exist.
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={headerVisible}
                      onChange={(e) => setHeaderVisible(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    disabled={logoSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 shadow-md hover:shadow-primary/25 cursor-pointer text-sm"
                  >
                    {logoSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving Logo & Header...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Header & Logo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ==================== TAB 2: TOP HEADER ITEMS ==================== */}
      {activeTab === 'header' && (
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-surface to-background">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-text-primary">Top Header Navigation & Announcement Items</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                  {headerItems.length} {headerItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Contact info, announcements, phone numbers, or quick links displayed in the top header bar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAddItem('header')}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-sm shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Header Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-background/50 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <th className="px-6 py-3.5">Content / Label</th>
                  <th className="px-6 py-3.5">Target Link / URL</th>
                  <th className="px-6 py-3.5">Order</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {headerItems.map((item) => {
                  const isActive = item.is_active === 1 || item.is_active === true
                  return (
                    <tr key={item.id} className="hover:bg-background/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-text-primary text-sm flex items-center gap-2">
                          {item.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                          <Link2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate max-w-xs">{item.url}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-text-muted">
                        #{item.display_order}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggleItemActive(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                              : 'bg-slate-500/15 text-slate-400 border border-slate-500/30 hover:bg-slate-500/25'
                          }`}
                          title="Click to toggle status"
                        >
                          {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditItem(item)}
                            className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                            title="Edit Header Item"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item)}
                            className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Header Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {headerItems.length === 0 && (
              <div className="py-12 px-4 text-center">
                <p className="text-sm text-text-muted">No top header items configured yet.</p>
                <button
                  type="button"
                  onClick={() => handleAddItem('header')}
                  className="mt-3 text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add your first header item (e.g. Email, Phone, Announcement)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 3: MAIN NAVBAR ITEMS ==================== */}
      {activeTab === 'navbar' && (
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-surface to-background">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-text-primary">Main Navbar Menu Items</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                  {navItems.length} {navItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Primary navigation menu links displayed in the center of the desktop and mobile navigation bar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAddItem('navbar')}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-sm shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Navbar Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-background/50 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <th className="px-6 py-3.5">Menu Label</th>
                  <th className="px-6 py-3.5">Route / Link URL</th>
                  <th className="px-6 py-3.5">Display Order</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {navItems.map((item) => {
                  const isActive = item.is_active === 1 || item.is_active === true
                  return (
                    <tr key={item.id} className="hover:bg-background/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-text-primary text-sm flex items-center gap-2">
                          {item.label}
                          {item.url === '/services' && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-sky-500/10 text-[#00A6FF] rounded border border-sky-500/20 font-mono">
                              MegaMenu
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                          <Link2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{item.url}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-text-muted">
                        #{item.display_order}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggleItemActive(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                              : 'bg-slate-500/15 text-slate-400 border border-slate-500/30 hover:bg-slate-500/25'
                          }`}
                          title="Click to toggle status"
                        >
                          {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditItem(item)}
                            className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                            title="Edit Navbar Item"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item)}
                            className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Navbar Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {navItems.length === 0 && (
              <div className="py-12 px-4 text-center">
                <p className="text-sm text-text-muted">No navbar items found.</p>
                <button
                  type="button"
                  onClick={() => handleAddItem('navbar')}
                  className="mt-3 text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add a navbar item
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 4: LIVE PREVIEW ==================== */}
      {activeTab === 'preview' && (
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-6 shadow-sm">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Website Header & Navbar Interactive Preview</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Simulates exactly how your brand logo, announcement bar, and navigation menus look on the live site.
              </p>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="flex items-center bg-background border border-border p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Desktop View"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    previewDevice === 'tablet'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline px-2 py-1"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Preview Viewport Frame */}
          <div className="bg-[#030712] p-4 sm:p-8 rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
            {/* Ambient Backlight Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              <div className="absolute top-0 left-1/4 w-80 h-32 bg-[#00A6FF]/10 rounded-full blur-3xl" />
              <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#FF6D00]/10 rounded-full blur-3xl" />
            </div>

            <div
              className={`transition-all duration-300 mx-auto relative z-10 ${
                previewDevice === 'desktop'
                  ? 'w-full max-w-[1300px]'
                  : previewDevice === 'tablet'
                  ? 'max-w-[768px]'
                  : 'max-w-[380px]'
              }`}
            >
              {/* Simulated Device Frame Header if tablet/mobile */}
              {previewDevice !== 'desktop' && (
                <div className="bg-slate-900 border border-white/10 rounded-t-2xl py-2 px-4 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{previewDevice === 'tablet' ? 'iPad Pro (768px)' : 'iPhone 15 (380px)'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              )}

              <div className="rounded-2xl border border-white/15 overflow-hidden shadow-2xl bg-[#070B14]">
                {/* ── Simulated Top Announcement Header ───────────────────────── */}
                {headerVisible && headerItems.length > 0 && (
                  <div className="bg-[#050811] text-slate-300 border-b border-white/10 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3 font-medium">
                      {headerItems.filter(h => h.is_active && (h.url?.startsWith('tel:') || h.url?.startsWith('mailto:'))).map(h => (
                        <span key={h.id} className="inline-flex items-center gap-1.5 text-[11px] text-slate-300">
                          {h.url?.startsWith('tel:') ? <Phone size={11} className="text-[#00A6FF]" /> : <Mail size={11} className="text-[#00A6FF]" />}
                          {h.label}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-[11px]">
                      {headerItems.filter(h => h.is_active && !h.url?.startsWith('tel:') && !h.url?.startsWith('mailto:')).map(h => (
                        <span key={h.id} className="inline-flex items-center gap-1 hover:text-[#00A6FF] transition-colors cursor-pointer text-slate-200">
                          {h.label}
                          <ArrowRight size={10} className="text-[#00A6FF]" />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Simulated Main Navbar Bar ──────────────────────────────── */}
                <div className="h-[76px] px-4 sm:px-6 bg-[#070B14]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-3 relative">
                  {/* Left: Emblem & Brand Logo */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#00A6FF]/40 bg-[#00A6FF]/10 flex items-center justify-center relative shadow-sm group">
                      <img
                        src="/circle.png"
                        alt="Emblem"
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>

                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt={logoAlt || logoText}
                        className="h-9 w-auto max-w-[130px] sm:max-w-[170px] object-contain"
                      />
                    )}
                  </div>

                  {/* Center: Desktop Navigation Items */}
                  {previewDevice !== 'mobile' ? (
                    <nav className="flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md">
                      {navItems.filter(item => item.is_active).map((item) => {
                        const isServices = item.url === '/services' || item.label?.toLowerCase().includes('service')

                        return (
                          <div key={item.id} className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                if (isServices) setPreviewServicesOpen(!previewServicesOpen)
                              }}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isServices && previewServicesOpen
                                  ? 'text-[#00A6FF] bg-white/10'
                                  : 'text-slate-200 hover:text-[#00A6FF] hover:bg-white/5'
                              }`}
                            >
                              <span>{item.label}</span>
                              {isServices && (
                                <ChevronDown
                                  size={12}
                                  className={`transition-transform duration-200 ${previewServicesOpen ? 'rotate-180 text-[#00A6FF]' : 'text-slate-400'}`}
                                />
                              )}
                            </button>

                            {/* Simulated Services Mega Dropdown */}
                            {isServices && previewServicesOpen && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#0a0f1d] border border-white/15 rounded-2xl p-4 shadow-2xl space-y-2 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A6FF] border-b border-white/10 pb-1.5">
                                  Our Core Capabilities
                                </div>
                                <div className="space-y-1 text-xs text-slate-300">
                                  <div className="p-1.5 rounded-lg hover:bg-white/5 hover:text-[#00A6FF] cursor-pointer transition-colors">
                                    • B2B Demand Generation
                                  </div>
                                  <div className="p-1.5 rounded-lg hover:bg-white/5 hover:text-[#00A6FF] cursor-pointer transition-colors">
                                    • MQL & HQL Marketing
                                  </div>
                                  <div className="p-1.5 rounded-lg hover:bg-white/5 hover:text-[#00A6FF] cursor-pointer transition-colors">
                                    • Account-Based Marketing (ABM)
                                  </div>
                                  <div className="p-1.5 rounded-lg hover:bg-white/5 hover:text-[#00A6FF] cursor-pointer transition-colors">
                                    • Appointment Setting
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </nav>
                  ) : (
                    // Mobile Hamburger Trigger
                    <button
                      type="button"
                      onClick={() => setPreviewMobileMenuOpen(!previewMobileMenuOpen)}
                      className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                    >
                      {previewMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                  )}

                  {/* Right Action Button */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#00A6FF] to-[#0077B5] hover:opacity-95 transition-all shadow-md shadow-[#00A6FF]/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Let's Talk</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Mobile Drawer Simulation (when opened on mobile) */}
                {previewDevice === 'mobile' && previewMobileMenuOpen && (
                  <div className="bg-[#0a0f1d] border-b border-white/10 p-5 space-y-3 animate-in fade-in">
                    <div className="text-[11px] font-mono uppercase text-slate-500">Navigation Menu</div>
                    <div className="space-y-1">
                      {navItems.filter(i => i.is_active).map(item => (
                        <div
                          key={item.id}
                          className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-[#00A6FF] cursor-pointer transition-colors"
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Simulated Hero Backdrop Below Navbar ───────────────────── */}
                <div className="p-8 sm:p-12 text-center relative overflow-hidden bg-radial from-slate-900 via-[#070B14] to-[#030712]">
                  <div className="max-w-xl mx-auto space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/20">
                      <Sparkles size={12} /> Real-Time Preview Simulation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Full-Funnel Enterprise B2B Pipeline Growth
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      This simulated hero section demonstrates how your navigation header floats gracefully over dynamic page content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ADD / EDIT ITEM (HEADER OR NAVBAR) ──────────────────── */}
      {showItemModal && editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-surface to-background">
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  {editingItem.id
                    ? `Edit ${editingItem.section === 'header' ? 'Header' : 'Navbar'} Item`
                    : `Add New ${editingItem.section === 'header' ? 'Header' : 'Navbar'} Item`}
                </h3>
                <p className="text-xs text-text-secondary">
                  Configure the label, link target, and ordering for this item.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowItemModal(false)
                  setEditingItem(null)
                }}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                  Section *
                </label>
                <select
                  value={editingItem.section || 'navbar'}
                  onChange={(e) => setEditingItem({ ...editingItem, section: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  disabled={savingItem}
                >
                  <option value="navbar">Navbar (Main Navigation Menu)</option>
                  <option value="header">Header (Top Bar Announcement / Contact Info)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                  Label / Display Text *
                </label>
                <input
                  type="text"
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  placeholder={editingItem.section === 'header' ? 'e.g. info@tarajglobal.com or 🚀 Now Hiring' : 'e.g. Case Studies'}
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                  disabled={savingItem}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                  URL / Target Link *
                </label>
                <input
                  type="text"
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  placeholder={editingItem.section === 'header' ? 'mailto:info@tarajglobal.com or /contact' : '/case-studies'}
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors font-mono"
                  disabled={savingItem}
                />
                <p className="text-[11px] text-text-muted mt-1">
                  Use relative paths (e.g. <code className="text-primary">/about</code>), mailto/tel (e.g. <code className="text-primary">mailto:info@tarajglobal.com</code>, <code className="text-primary">tel:+1234567890</code>), or full URLs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingItem.display_order ?? 0}
                    onChange={(e) => setEditingItem({ ...editingItem, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors font-mono"
                    disabled={savingItem}
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-2.5 bg-background rounded-xl border border-border cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.is_active}
                      onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary"
                      disabled={savingItem}
                    />
                    <span className="text-sm font-medium text-text-primary">Active Status</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowItemModal(false)
                    setEditingItem(null)
                  }}
                  className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background transition-colors cursor-pointer"
                  disabled={savingItem}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 shadow-md cursor-pointer"
                >
                  {savingItem ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingItem.id ? 'Save Changes' : 'Add Item'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CMSNavbar
