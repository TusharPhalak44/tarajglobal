import React, { useEffect, useState, useRef } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  AlertCircle,
  GripVertical,
  Eye,
  EyeOff,
  Building2,
  MapPin,
  Phone,
  Mail,
  Link as LinkIcon,
  Settings,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  Globe,
  Share2,
  Sparkles,
  ArrowUpRight,
  Sliders,
  Layers,
  Clock
} from 'lucide-react'
import { adminAPI } from '@api'

const FooterManagement = () => {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [activeTab, setActiveTab] = useState('settings')

  // Cross-component & cross-tab sync notifier
  const notifyFooterUpdated = () => {
    try {
      localStorage.setItem('taraj_cms_footer_updated', Date.now().toString())
      window.dispatchEvent(new CustomEvent('taraj_footer_updated'))
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel('taraj_cms_channel')
        bc.postMessage({ type: 'FOOTER_UPDATED' })
        bc.close()
      }
    } catch (_) {}
  }

  // ==================== STATE ====================
  // Settings
  const [settings, setSettings] = useState({
    company_name: 'TaRaj Global',
    company_description: '',
    short_description: '',
    logo_url: '/OnlyTG- 3.png',
    is_logo_visible: true,
    is_description_visible: true,
    copyright_text: 'Copyright © {year} Taraj Global Solutions Private Limited. All rights reserved.'
  })
  const [savingSettings, setSavingSettings] = useState(false)
  const fileInputRef = useRef(null)

  // Sections
  const [sections, setSections] = useState([])
  const [editingSection, setEditingSection] = useState(null)
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [savingSection, setSavingSection] = useState(false)

  // Links
  const [links, setLinks] = useState([])
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('all')
  const [editingLink, setEditingLink] = useState(null)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [savingLink, setSavingLink] = useState(false)

  // Offices
  const [offices, setOffices] = useState([])
  const [editingOffice, setEditingOffice] = useState(null)
  const [showOfficeModal, setShowOfficeModal] = useState(false)
  const [savingOffice, setSavingOffice] = useState(false)

  // Contact Items
  const [contactItems, setContactItems] = useState([])
  const [editingContact, setEditingContact] = useState(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [savingContact, setSavingContact] = useState(false)

  // Social Links
  const [socialLinks, setSocialLinks] = useState([])
  const [editingSocial, setEditingSocial] = useState(null)
  const [showSocialModal, setShowSocialModal] = useState(false)
  const [savingSocial, setSavingSocial] = useState(false)

  // Quick Clocks for Preview
  const [previewTime, setPreviewTime] = useState({ ist: '', pst: '' })
  useEffect(() => {
    const update = () => {
      try {
        const now = new Date()
        setPreviewTime({
          ist: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }),
          pst: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: true })
        })
      } catch {
        setPreviewTime({ ist: 'IST Active', pst: 'PST Active' })
      }
    }
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      const [settingsRes, sectionsRes, linksRes, officesRes, contactRes, socialRes] = await Promise.all([
        adminAPI.getFooterSettings(),
        adminAPI.getFooterSections(),
        adminAPI.getFooterLinks(),
        adminAPI.getFooterOffices(),
        adminAPI.getFooterContactItems(),
        adminAPI.getFooterSocialLinks()
      ])

      if (settingsRes.data) {
        const s = settingsRes.data?.data || settingsRes.data
        setSettings({
          company_name: s.company_name || 'TaRaj Global',
          company_description: s.company_description || '',
          short_description: s.short_description || '',
          logo_url: s.logo_url || '/OnlyTG- 3.png',
          is_logo_visible: s.is_logo_visible !== 0 && s.is_logo_visible !== false,
          is_description_visible: s.is_description_visible !== 0 && s.is_description_visible !== false,
          copyright_text: s.copyright_text || 'Copyright © {year} Taraj Global Solutions Private Limited. All rights reserved.'
        })
      }

      const secData = sectionsRes.data?.data || sectionsRes.data
      setSections(Array.isArray(secData) ? secData : [])

      const lnkData = linksRes.data?.data || linksRes.data
      setLinks(Array.isArray(lnkData) ? lnkData : [])

      const offData = officesRes.data?.data || officesRes.data
      setOffices(Array.isArray(offData) ? offData : [])

      const conData = contactRes.data?.data || contactRes.data
      setContactItems(Array.isArray(conData) ? conData : [])

      const socData = socialRes.data?.data || socialRes.data
      setSocialLinks(Array.isArray(socData) ? socData : [])
    } catch (error) {
      console.error('Failed to fetch footer data:', error)
      showMessage('error', 'Failed to load footer CMS data: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  // ==================== LOGO / FILE UPLOAD HANDLERS ====================
  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select an image file (PNG, SVG, JPG, WEBP)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'File size must be under 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setSettings((prev) => ({ ...prev, logo_url: reader.result }))
      showMessage('success', 'Logo image loaded! Click "Save Footer Settings" to apply to the website.')
    }
    reader.readAsDataURL(file)
  }

  const handleResetDefaultLogo = () => {
    setSettings((prev) => ({ ...prev, logo_url: '/OnlyTG- 3.png' }))
    showMessage('success', 'Reset to default logo template. Click "Save Footer Settings" to apply.')
  }

  // ==================== SETTINGS HANDLERS ====================
  const handleSaveSettings = async () => {
    try {
      setSavingSettings(true)
      await adminAPI.updateFooterSettings({
        ...settings,
        is_logo_visible: settings.is_logo_visible ? 1 : 0,
        is_description_visible: settings.is_description_visible ? 1 : 0
      })
      notifyFooterUpdated()
      showMessage('success', 'Footer settings saved! Public website footer updated successfully.')
    } catch (error) {
      console.error('Failed to save footer settings:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save settings')
    } finally {
      setSavingSettings(false)
    }
  }

  // ==================== SECTIONS HANDLERS ====================
  const handleAddSection = () => {
    setEditingSection({
      title: '',
      section_type: 'links',
      is_visible: true,
      sort_order: sections.length + 1
    })
    setShowSectionModal(true)
  }

  const handleEditSection = (section) => {
    setEditingSection({
      ...section,
      is_visible: section.is_visible === 1 || section.is_visible === true
    })
    setShowSectionModal(true)
  }

  const handleSaveSection = async () => {
    if (!editingSection.title?.trim()) {
      showMessage('error', 'Section title is required')
      return
    }

    try {
      setSavingSection(true)
      const payload = {
        title: editingSection.title.trim(),
        section_type: editingSection.section_type || 'links',
        is_visible: editingSection.is_visible ? 1 : 0,
        sort_order: Number(editingSection.sort_order) || 0
      }

      if (editingSection.id) {
        await adminAPI.updateFooterSection(editingSection.id, payload)
        showMessage('success', `Section "${payload.title}" updated successfully`)
      } else {
        await adminAPI.createFooterSection(payload)
        showMessage('success', `Section "${payload.title}" created successfully`)
      }

      setShowSectionModal(false)
      setEditingSection(null)
      notifyFooterUpdated()
      await fetchAllData()
    } catch (error) {
      console.error('Failed to save section:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save section')
    } finally {
      setSavingSection(false)
    }
  }

  const handleDeleteSection = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete section "${title}"? Any links assigned to this section will also be removed.`)) return

    try {
      await adminAPI.deleteFooterSection(id)
      notifyFooterUpdated()
      showMessage('success', `Section "${title}" deleted successfully`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to delete section:', error)
      showMessage('error', error.response?.data?.message || 'Failed to delete section')
    }
  }

  const handleToggleSectionVisibility = async (section) => {
    try {
      const newStatus = !(section.is_visible === 1 || section.is_visible === true)
      await adminAPI.updateFooterSection(section.id, {
        ...section,
        is_visible: newStatus
      })
      notifyFooterUpdated()
      showMessage('success', `Section "${section.title}" ${newStatus ? 'is now visible' : 'is now hidden'}`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
      showMessage('error', 'Failed to change section visibility')
    }
  }

  const handleMoveSection = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= sections.length) return

    const newSections = [...sections]
    const temp = newSections[index]
    newSections[index] = newSections[targetIndex]
    newSections[targetIndex] = temp

    const reorderPayload = newSections.map((s, idx) => ({ id: s.id, sort_order: idx + 1 }))
    setSections(newSections)

    try {
      await adminAPI.reorderFooterSections({ items: reorderPayload })
      notifyFooterUpdated()
      showMessage('success', 'Sections reordered successfully')
    } catch (error) {
      console.error('Failed to reorder sections:', error)
      fetchAllData()
    }
  }

  // ==================== LINKS HANDLERS ====================
  const handleAddLink = (presetSectionId = null) => {
    const targetSectionId = presetSectionId || sections[0]?.id || null
    setEditingLink({
      section_id: targetSectionId,
      label: '',
      url: '',
      link_type: 'internal',
      target: '_self',
      custom_action: '',
      is_visible: true,
      sort_order: links.length + 1
    })
    setShowLinkModal(true)
  }

  const handleEditLink = (link) => {
    setEditingLink({
      ...link,
      is_visible: link.is_visible === 1 || link.is_visible === true
    })
    setShowLinkModal(true)
  }

  const handleSaveLink = async () => {
    if (!editingLink.section_id) {
      showMessage('error', 'Please select a section for this link')
      return
    }
    if (!editingLink.label?.trim()) {
      showMessage('error', 'Link label is required')
      return
    }
    if (!editingLink.url?.trim() && editingLink.link_type !== 'custom_action') {
      showMessage('error', 'Link URL is required')
      return
    }

    try {
      setSavingLink(true)
      const payload = {
        section_id: Number(editingLink.section_id),
        label: editingLink.label.trim(),
        url: editingLink.url?.trim() || '',
        link_type: editingLink.link_type || 'internal',
        target: editingLink.target || '_self',
        custom_action: editingLink.custom_action || null,
        is_visible: editingLink.is_visible ? 1 : 0,
        sort_order: Number(editingLink.sort_order) || 0
      }

      if (editingLink.id) {
        await adminAPI.updateFooterLink(editingLink.id, payload)
        showMessage('success', `Link "${payload.label}" updated successfully`)
      } else {
        await adminAPI.createFooterLink(payload)
        showMessage('success', `Link "${payload.label}" added to footer`)
      }

      setShowLinkModal(false)
      setEditingLink(null)
      notifyFooterUpdated()
      await fetchAllData()
    } catch (error) {
      console.error('Failed to save link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save link')
    } finally {
      setSavingLink(false)
    }
  }

  const handleDeleteLink = async (id, label) => {
    if (!window.confirm(`Are you sure you want to delete link "${label}"?`)) return

    try {
      await adminAPI.deleteFooterLink(id)
      notifyFooterUpdated()
      showMessage('success', `Link "${label}" deleted successfully`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to delete link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to delete link')
    }
  }

  const handleToggleLinkVisibility = async (link) => {
    try {
      const newStatus = !(link.is_visible === 1 || link.is_visible === true)
      await adminAPI.updateFooterLink(link.id, {
        ...link,
        is_visible: newStatus
      })
      notifyFooterUpdated()
      showMessage('success', `Link "${link.label}" ${newStatus ? 'is now visible' : 'is now hidden'}`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
      showMessage('error', 'Failed to change link status')
    }
  }

  const handleMoveLink = async (sectionLinks, index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= sectionLinks.length) return

    const reordered = [...sectionLinks]
    const temp = reordered[index]
    reordered[index] = reordered[targetIndex]
    reordered[targetIndex] = temp

    const reorderPayload = reordered.map((l, idx) => ({ id: l.id, sort_order: idx + 1 }))

    try {
      await adminAPI.reorderFooterLinks({ items: reorderPayload })
      notifyFooterUpdated()
      showMessage('success', 'Links reordered successfully')
      fetchAllData()
    } catch (error) {
      console.error('Failed to reorder links:', error)
      fetchAllData()
    }
  }

  // ==================== OFFICES HANDLERS ====================
  const handleAddOffice = () => {
    setEditingOffice({
      name: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      map_url: '',
      phone: '',
      email: 'info@tarajglobal.com',
      icon: 'MapPin',
      is_visible: true,
      sort_order: offices.length + 1
    })
    setShowOfficeModal(true)
  }

  const handleEditOffice = (office) => {
    setEditingOffice({
      ...office,
      is_visible: office.is_visible === 1 || office.is_visible === true
    })
    setShowOfficeModal(true)
  }

  const handleSaveOffice = async () => {
    if (!editingOffice.name?.trim()) {
      showMessage('error', 'Office name is required')
      return
    }

    try {
      setSavingOffice(true)
      const payload = {
        ...editingOffice,
        is_visible: editingOffice.is_visible ? 1 : 0,
        sort_order: Number(editingOffice.sort_order) || 0
      }

      if (editingOffice.id) {
        await adminAPI.updateFooterOffice(editingOffice.id, payload)
        showMessage('success', `Office "${payload.name}" updated successfully`)
      } else {
        await adminAPI.createFooterOffice(payload)
        showMessage('success', `Office "${payload.name}" created successfully`)
      }

      setShowOfficeModal(false)
      setEditingOffice(null)
      notifyFooterUpdated()
      await fetchAllData()
    } catch (error) {
      console.error('Failed to save office:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save office')
    } finally {
      setSavingOffice(false)
    }
  }

  const handleDeleteOffice = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete office "${name}"?`)) return

    try {
      await adminAPI.deleteFooterOffice(id)
      notifyFooterUpdated()
      showMessage('success', `Office "${name}" deleted`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to delete office:', error)
      showMessage('error', error.response?.data?.message || 'Failed to delete office')
    }
  }

  const handleToggleOfficeVisibility = async (office) => {
    try {
      const newStatus = !(office.is_visible === 1 || office.is_visible === true)
      await adminAPI.updateFooterOffice(office.id, {
        ...office,
        is_visible: newStatus
      })
      notifyFooterUpdated()
      showMessage('success', `Office "${office.name}" ${newStatus ? 'is now visible' : 'is now hidden'}`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
      showMessage('error', 'Failed to change office status')
    }
  }

  // ==================== SOCIAL LINKS HANDLERS ====================
  const handleAddSocial = () => {
    setEditingSocial({
      platform: 'LinkedIn',
      icon: 'bi-linkedin',
      url: '',
      is_visible: true,
      sort_order: socialLinks.length + 1
    })
    setShowSocialModal(true)
  }

  const handleEditSocial = (social) => {
    setEditingSocial({
      ...social,
      is_visible: social.is_visible === 1 || social.is_visible === true
    })
    setShowSocialModal(true)
  }

  const handleSaveSocial = async () => {
    if (!editingSocial.platform?.trim() || !editingSocial.url?.trim()) {
      showMessage('error', 'Platform and URL are required')
      return
    }

    try {
      setSavingSocial(true)
      const payload = {
        platform: editingSocial.platform.trim(),
        icon: editingSocial.icon || 'bi-globe',
        url: editingSocial.url.trim(),
        is_visible: editingSocial.is_visible ? 1 : 0,
        sort_order: Number(editingSocial.sort_order) || 0
      }

      if (editingSocial.id) {
        await adminAPI.updateFooterSocialLink(editingSocial.id, payload)
        showMessage('success', `Social link for ${payload.platform} updated`)
      } else {
        await adminAPI.createFooterSocialLink(payload)
        showMessage('success', `Social link for ${payload.platform} created`)
      }

      setShowSocialModal(false)
      setEditingSocial(null)
      notifyFooterUpdated()
      await fetchAllData()
    } catch (error) {
      console.error('Failed to save social link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save social link')
    } finally {
      setSavingSocial(false)
    }
  }

  const handleDeleteSocial = async (id, platform) => {
    if (!window.confirm(`Delete social link for ${platform}?`)) return

    try {
      await adminAPI.deleteFooterSocialLink(id)
      notifyFooterUpdated()
      showMessage('success', `Social link for ${platform} deleted`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to delete social link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to delete social link')
    }
  }

  const handleToggleSocialVisibility = async (social) => {
    try {
      const newStatus = !(social.is_visible === 1 || social.is_visible === true)
      await adminAPI.updateFooterSocialLink(social.id, {
        ...social,
        is_visible: newStatus
      })
      notifyFooterUpdated()
      showMessage('success', `Social link for ${social.platform} ${newStatus ? 'is now visible' : 'is now hidden'}`)
      fetchAllData()
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
      showMessage('error', 'Failed to change social status')
    }
  }

  // Filtered links
  const filteredLinks = selectedSectionFilter === 'all'
    ? links
    : links.filter((l) => String(l.section_id) === String(selectedSectionFilter))

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-text-muted">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading Footer CMS configurations...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {message.text && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border shadow-lg transition-all animate-in fade-in slide-in-from-top-2 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Footer Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              Live CMS
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            Manage your public website footer's branding, columns, navigation links, offices, and copyright text in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAllData}
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
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Quick Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Footer Sections</div>
            <div className="text-xl font-bold text-text-primary mt-1">{sections.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Settings className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Total Links</div>
            <div className="text-xl font-bold text-text-primary mt-1">{links.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
            <LinkIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Global Hubs</div>
            <div className="text-xl font-bold text-text-primary mt-1">{offices.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-text-muted">Social Profiles</div>
            <div className="text-xl font-bold text-text-primary mt-1">{socialLinks.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
            <Share2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto pb-0.5">
        {[
          { id: 'settings', label: 'Company & Branding', icon: Building2 },
          { id: 'sections', label: 'Footer Sections', icon: Settings },
          { id: 'links', label: 'Footer Links', icon: LinkIcon },
          { id: 'offices', label: 'Office Hubs', icon: MapPin },
          { id: 'social', label: 'Social Media', icon: Share2 },
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
            </button>
          )
        })}
      </div>

      {/* ==================== TAB 1: COMPANY & BRANDING ==================== */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface rounded-2xl border border-border p-6 space-y-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-bold text-text-primary">Footer Branding & Information</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Set your footer logo, company bio, and copyright information.
              </p>
            </div>

            {/* Logo Manager */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Footer Logo Image
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-border bg-background">
                <div className="h-16 w-36 rounded-lg bg-slate-900 border border-border flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                  {settings.logo_url ? (
                    <img
                      src={settings.logo_url}
                      alt="Footer Logo"
                      className="h-12 w-auto max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-500">No logo</span>
                  )}
                </div>

                <div className="space-y-2 w-full">
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefaultLogo}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface border border-border text-text-secondary text-xs font-semibold hover:text-text-primary hover:bg-border/20 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to Default</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={settings.logo_url || ''}
                    onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                    placeholder="Or enter image URL: /OnlyTG- 3.png"
                    className="w-full px-3 py-1.5 text-xs bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={settings.company_name || ''}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                placeholder="TaRaj Global"
              />
            </div>

            {/* Company Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Company Description (Full Bio)
              </label>
              <textarea
                value={settings.company_description || ''}
                onChange={(e) => setSettings({ ...settings, company_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary leading-relaxed"
                placeholder="Enterprise demand generation partner description..."
              />
            </div>

            {/* Copyright Text */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Copyright Text
              </label>
              <input
                type="text"
                value={settings.copyright_text || ''}
                onChange={(e) => setSettings({ ...settings, copyright_text: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                placeholder="Copyright © {year} Taraj Global Solutions Private Limited. All rights reserved."
              />
              <p className="text-[11px] text-text-muted mt-1">
                Tip: <code className="font-mono text-primary bg-primary/10 px-1 py-0.5 rounded">{'{year}'}</code> automatically renders as {new Date().getFullYear()}.
              </p>
            </div>

            {/* Visibility Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-background cursor-pointer hover:border-primary/50 transition-all">
                <input
                  type="checkbox"
                  checked={settings.is_logo_visible}
                  onChange={(e) => setSettings({ ...settings, is_logo_visible: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-text-primary block">Display Logo in Footer</span>
                  <span className="text-[11px] text-text-muted">Turn on to show brand logo on public footer</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-background cursor-pointer hover:border-primary/50 transition-all">
                <input
                  type="checkbox"
                  checked={settings.is_description_visible}
                  onChange={(e) => setSettings({ ...settings, is_description_visible: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-text-primary block">Display Description</span>
                  <span className="text-[11px] text-text-muted">Turn on to show company bio in Column 1</span>
                </div>
              </label>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-border flex justify-end">
              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 disabled:opacity-50"
              >
                {savingSettings ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Footer Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Mini Preview Card */}
          <div className="space-y-4">
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Column 1 Live Preview</span>
              </h3>

              <div className="p-4 rounded-xl bg-[#070B14] border border-white/10 text-white space-y-4">
                {settings.is_logo_visible && (
                  <img
                    src={settings.logo_url || '/OnlyTG- 3.png'}
                    alt="Preview"
                    className="h-10 w-auto object-contain"
                  />
                )}
                {settings.is_description_visible && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {settings.company_description || 'No description entered.'}
                  </p>
                )}
                <div className="text-[11px] text-slate-500 pt-2 border-t border-white/10">
                  {settings.copyright_text?.replace('{year}', new Date().getFullYear())}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: SECTIONS ==================== */}
      {activeTab === 'sections' && (
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Footer Navigation Sections</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Manage the column categories in your website footer (e.g., Lead Gen, Demand & ABM, Company, Legal).
              </p>
            </div>
            <button
              onClick={handleAddSection}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Section</span>
            </button>
          </div>

          <div className="space-y-3">
            {sections.map((section, idx) => {
              const sectionLinks = links.filter((l) => l.section_id === section.id)
              const isVisible = section.is_visible === 1 || section.is_visible === true

              return (
                <div
                  key={section.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isVisible ? 'bg-background border-border hover:border-primary/40' : 'bg-background/40 border-border/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        onClick={() => handleMoveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface disabled:opacity-20"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveSection(idx, 'down')}
                        disabled={idx === sections.length - 1}
                        className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface disabled:opacity-20"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text-primary text-sm">{section.title}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-border/40 text-text-muted">
                          {section.section_type || 'links'}
                        </span>
                        <span className="text-xs text-text-muted font-mono">
                          ({sectionLinks.length} {sectionLinks.length === 1 ? 'link' : 'links'})
                        </span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">
                        Column position: #{idx + 1} • Sort Order: {section.sort_order}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleToggleSectionVisibility(section)}
                      className={`p-2 rounded-lg border transition-all ${
                        isVisible
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                          : 'border-border text-text-muted bg-surface hover:text-text-primary'
                      }`}
                      title={isVisible ? 'Click to hide section' : 'Click to show section'}
                    >
                      {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleEditSection(section)}
                      className="p-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-all"
                      title="Edit Section"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteSection(section.id, section.title)}
                      className="p-2 rounded-lg border border-rose-500/30 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                      title="Delete Section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}

            {sections.length === 0 && (
              <div className="text-center py-12 text-text-muted border border-dashed border-border rounded-xl">
                <Settings className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No sections found. Add one above to get started.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 3: LINKS ==================== */}
      {activeTab === 'links' && (
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Footer Navigation Links</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Add, edit, reorder, or toggle links under each section of your footer.
              </p>
            </div>

            <button
              onClick={() => handleAddLink(selectedSectionFilter !== 'all' ? selectedSectionFilter : null)}
              disabled={sections.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 disabled:opacity-50 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Link</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setSelectedSectionFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedSectionFilter === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-background border border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              All Sections ({links.length})
            </button>
            {sections.map((sec) => {
              const secLinksCount = links.filter((l) => l.section_id === sec.id).length
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionFilter(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    String(selectedSectionFilter) === String(sec.id)
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-background border border-border text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {sec.title} ({secLinksCount})
                </button>
              )
            })}
          </div>

          {/* Links List grouped by section */}
          <div className="space-y-6">
            {(selectedSectionFilter === 'all' ? sections : sections.filter((s) => String(s.id) === String(selectedSectionFilter))).map((sec) => {
              const secLinks = links.filter((l) => l.section_id === sec.id)

              return (
                <div key={sec.id} className="rounded-xl border border-border bg-background/50 overflow-hidden">
                  <div className="p-3.5 bg-background border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-text-primary">{sec.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {secLinks.length} items
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddLink(sec.id)}
                      className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3 h-3" />
                      Add to {sec.title}
                    </button>
                  </div>

                  <div className="divide-y divide-border">
                    {secLinks.map((link, lIdx) => {
                      const isVisible = link.is_visible === 1 || link.is_visible === true

                      return (
                        <div
                          key={link.id}
                          className={`p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                            isVisible ? 'hover:bg-surface/50' : 'opacity-50 bg-surface/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center gap-0.5">
                              <button
                                onClick={() => handleMoveLink(secLinks, lIdx, 'up')}
                                disabled={lIdx === 0}
                                className="p-0.5 rounded text-text-muted hover:text-text-primary hover:bg-surface disabled:opacity-20"
                                title="Move Up"
                              >
                                <ChevronUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveLink(secLinks, lIdx, 'down')}
                                disabled={lIdx === secLinks.length - 1}
                                className="p-0.5 rounded text-text-muted hover:text-text-primary hover:bg-surface disabled:opacity-20"
                                title="Move Down"
                              >
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-text-primary">{link.label}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-text-muted">
                                  {link.link_type}
                                </span>
                                {link.target === '_blank' && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-cyan-400">
                                    new tab
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-text-muted font-mono mt-0.5">
                                {link.url || (link.link_type === 'custom_action' ? `Action: ${link.custom_action}` : '-')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => handleToggleLinkVisibility(link)}
                              className={`p-1.5 rounded-lg border transition-all ${
                                isVisible
                                  ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                                  : 'border-border text-text-muted bg-surface hover:text-text-primary'
                              }`}
                              title={isVisible ? 'Hide Link' : 'Show Link'}
                            >
                              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            </button>

                            <button
                              onClick={() => handleEditLink(link)}
                              className="p-1.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-all"
                              title="Edit Link"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteLink(link.id, link.label)}
                              className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                              title="Delete Link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    {secLinks.length === 0 && (
                      <div className="p-6 text-center text-xs text-text-muted">
                        No links in this section yet. Click "Add to {sec.title}" above.
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 4: OFFICES ==================== */}
      {activeTab === 'offices' && (
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Office Locations & Hubs</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Displayed under "Global Hubs" in Column 5 of the website footer, featuring live timezone clocks.
              </p>
            </div>
            <button
              onClick={handleAddOffice}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Office</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offices.map((office) => {
              const isVisible = office.is_visible === 1 || office.is_visible === true
              const isPST = `${office.name} ${office.city} ${office.country}`.toLowerCase().includes('francisco') ||
                `${office.name} ${office.city} ${office.country}`.toLowerCase().includes('usa')

              return (
                <div
                  key={office.id}
                  className={`p-5 rounded-2xl border space-y-3 transition-all ${
                    isVisible ? 'bg-background border-border hover:border-primary/50' : 'bg-background/40 border-border/40 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPST ? 'bg-amber-500/10 text-amber-500' : 'bg-cyan-500/10 text-cyan-500'}`}>
                        {office.icon === 'Building2' ? <Building2 className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-text-primary">{office.name}</h3>
                        <p className="text-xs text-text-muted">{office.city}, {office.country}</p>
                      </div>
                    </div>

                    <span className={`text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-md ${
                      isPST ? 'text-amber-400 bg-amber-500/10' : 'text-cyan-400 bg-cyan-500/10'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {isPST ? previewTime.pst || 'PST' : previewTime.ist || 'IST'}
                    </span>
                  </div>

                  <div className="text-xs text-text-secondary leading-relaxed bg-surface/60 p-3 rounded-xl border border-border/40">
                    <p>{office.address_line_1}</p>
                    {office.address_line_2 && <p>{office.address_line_2}</p>}
                    <p>{[office.city, office.state, office.postal_code].filter(Boolean).join(', ')}</p>
                  </div>

                  <div className="flex flex-col gap-1 text-xs font-mono">
                    {office.phone && (
                      <span className="text-primary flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> {office.phone}
                      </span>
                    )}
                    {office.email && (
                      <span className="text-text-muted flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> {office.email}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
                    <button
                      onClick={() => handleToggleOfficeVisibility(office)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isVisible
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                          : 'border-border text-text-muted bg-surface'
                      }`}
                      title={isVisible ? 'Hide Office' : 'Show Office'}
                    >
                      {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleEditOffice(office)}
                      className="p-1.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-surface"
                      title="Edit Office"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteOffice(office.id, office.name)}
                      className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
                      title="Delete Office"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 5: SOCIAL ==================== */}
      {activeTab === 'social' && (
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Social Media Profiles</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Displayed in Column 1 under the company bio in the website footer.
              </p>
            </div>
            <button
              onClick={handleAddSocial}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Social Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((social) => {
              const isVisible = social.is_visible === 1 || social.is_visible === true

              return (
                <div
                  key={social.id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isVisible ? 'bg-background border-border hover:border-primary/40' : 'bg-background/40 border-border/40 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary flex-shrink-0">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-sm text-text-primary">{social.platform}</h4>
                      <p className="text-xs text-text-muted truncate">{social.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleToggleSocialVisibility(social)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isVisible
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                          : 'border-border text-text-muted bg-surface'
                      }`}
                      title={isVisible ? 'Hide' : 'Show'}
                    >
                      {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleEditSocial(social)}
                      className="p-1.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-surface"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSocial(social.id, social.platform)}
                      className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 6: LIVE PREVIEW ==================== */}
      {activeTab === 'preview' && (
        <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Website Footer Interactive Preview</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Simulated appearance of how your footer looks to visitors on the live site.
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Open Full Website <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#070B14] p-8 text-white space-y-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Column 1 */}
              <div className="md:col-span-3 space-y-4">
                {settings.is_logo_visible && (
                  <img
                    src={settings.logo_url || '/OnlyTG- 3.png'}
                    alt="Preview"
                    className="h-10 w-auto object-contain"
                  />
                )}
                {settings.is_description_visible && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {settings.company_description}
                  </p>
                )}
                <div className="flex items-center gap-2 pt-2">
                  {socialLinks.filter((s) => s.is_visible).map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all text-xs"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Link Columns */}
              {sections.filter((s) => s.is_visible && s.title?.toLowerCase() !== 'legal').slice(0, 3).map((sec, idx) => {
                const secLinks = links.filter((l) => l.section_id === sec.id && (l.is_visible === 1 || l.is_visible === true))
                const isAmber = idx === 1

                return (
                  <div key={sec.id} className="md:col-span-2 space-y-3">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isAmber ? 'text-[#FF6D00]' : 'text-[#00A6FF]'}`}>
                      {sec.title}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {secLinks.map((l) => (
                        <li key={l.id} className="hover:text-white transition-colors cursor-pointer">
                          {l.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}

              {/* Hubs Column */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  Global Hubs
                </h4>
                <div className="space-y-2">
                  {offices.filter((o) => o.is_visible).map((o) => (
                    <div key={o.id} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs space-y-1">
                      <div className="font-bold flex items-center justify-between">
                        <span>{o.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{o.city}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{o.address_line_1}</p>
                      {o.phone && <p className="text-[11px] font-mono text-primary">{o.phone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-white/10 pt-4 text-xs text-slate-500 text-center flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>{settings.copyright_text?.replace('{year}', new Date().getFullYear())}</span>
              <span>Taraj Global CMS Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: SECTION ==================== */}
      {showSectionModal && editingSection && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-base text-text-primary">
                {editingSection.id ? 'Edit Footer Section' : 'Add New Footer Section'}
              </h3>
              <button
                onClick={() => { setShowSectionModal(false); setEditingSection(null) }}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-border/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Section Title *
                </label>
                <input
                  type="text"
                  value={editingSection.title || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  placeholder="e.g., Lead Gen, Solutions, Resources"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Section Type
                </label>
                <select
                  value={editingSection.section_type || 'links'}
                  onChange={(e) => setEditingSection({ ...editingSection, section_type: e.target.value })}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                >
                  <option value="links">Links Column</option>
                  <option value="contact">Contact Information</option>
                  <option value="offices">Offices Hubs</option>
                  <option value="custom">Custom Content</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingSection.sort_order ?? 0}
                    onChange={(e) => setEditingSection({ ...editingSection, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSection.is_visible}
                      onChange={(e) => setEditingSection({ ...editingSection, is_visible: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-text-primary">Visible on Footer</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => { setShowSectionModal(false); setEditingSection(null) }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-text-secondary hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSection}
                  disabled={savingSection}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 disabled:opacity-50"
                >
                  {savingSection ? 'Saving...' : 'Save Section'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: LINK ==================== */}
      {showLinkModal && editingLink && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-base text-text-primary">
                {editingLink.id ? 'Edit Footer Link' : 'Add Footer Link'}
              </h3>
              <button
                onClick={() => { setShowLinkModal(false); setEditingLink(null) }}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-border/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Belongs to Section *
                </label>
                <select
                  value={editingLink.section_id || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, section_id: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                >
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Link Label *
                </label>
                <input
                  type="text"
                  value={editingLink.label || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, label: e.target.value })}
                  placeholder="e.g., MQL Services, About Us"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  URL or Route *
                </label>
                <input
                  type="text"
                  value={editingLink.url || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  placeholder="/mql-services or https://..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Link Type
                  </label>
                  <select
                    value={editingLink.link_type || 'internal'}
                    onChange={(e) => setEditingLink({ ...editingLink, link_type: e.target.value })}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="internal">Internal Route</option>
                    <option value="external">External Link</option>
                    <option value="custom_action">Action (Cookies etc.)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Target
                  </label>
                  <select
                    value={editingLink.target || '_self'}
                    onChange={(e) => setEditingLink({ ...editingLink, target: e.target.value })}
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="_self">Same Tab (_self)</option>
                    <option value="_blank">New Tab (_blank)</option>
                  </select>
                </div>
              </div>

              {editingLink.link_type === 'custom_action' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Custom Action Identifier
                  </label>
                  <input
                    type="text"
                    value={editingLink.custom_action || ''}
                    onChange={(e) => setEditingLink({ ...editingLink, custom_action: e.target.value })}
                    placeholder="openCookiePreferences"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="link_is_vis"
                  checked={editingLink.is_visible}
                  onChange={(e) => setEditingLink({ ...editingLink, is_visible: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                />
                <label htmlFor="link_is_vis" className="text-xs font-medium text-text-primary cursor-pointer">
                  Visible on Footer
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => { setShowLinkModal(false); setEditingLink(null) }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-text-secondary hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveLink}
                  disabled={savingLink}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 disabled:opacity-50"
                >
                  {savingLink ? 'Saving...' : 'Save Link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: OFFICE ==================== */}
      {showOfficeModal && editingOffice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-base text-text-primary">
                {editingOffice.id ? 'Edit Office Location' : 'Add Office Location'}
              </h3>
              <button
                onClick={() => { setShowOfficeModal(false); setEditingOffice(null) }}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-border/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Office Name *
                </label>
                <input
                  type="text"
                  value={editingOffice.name || ''}
                  onChange={(e) => setEditingOffice({ ...editingOffice, name: e.target.value })}
                  placeholder="e.g., India Office, USA Office"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={editingOffice.address_line_1 || ''}
                  onChange={(e) => setEditingOffice({ ...editingOffice, address_line_1: e.target.value })}
                  placeholder="Building / Complex / Street"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={editingOffice.address_line_2 || ''}
                  onChange={(e) => setEditingOffice({ ...editingOffice, address_line_2: e.target.value })}
                  placeholder="Suite, unit, floor"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={editingOffice.city || ''}
                    onChange={(e) => setEditingOffice({ ...editingOffice, city: e.target.value })}
                    placeholder="Pune, San Francisco"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    value={editingOffice.country || ''}
                    onChange={(e) => setEditingOffice({ ...editingOffice, country: e.target.value })}
                    placeholder="India, USA"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={editingOffice.state || ''}
                    onChange={(e) => setEditingOffice({ ...editingOffice, state: e.target.value })}
                    placeholder="Maharashtra, California"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={editingOffice.postal_code || ''}
                    onChange={(e) => setEditingOffice({ ...editingOffice, postal_code: e.target.value })}
                    placeholder="411014, 94115"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editingOffice.phone || ''}
                    onChange={(e) => setEditingOffice({ ...editingOffice, phone: e.target.value })}
                    placeholder="+91 96655-99442"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingOffice.email || ''}
                    onChange={(e) => setEditingOffice({ ...editingOffice, email: e.target.value })}
                    placeholder="info@tarajglobal.com"
                    className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Google Maps URL
                </label>
                <input
                  type="text"
                  value={editingOffice.map_url || ''}
                  onChange={(e) => setEditingOffice({ ...editingOffice, map_url: e.target.value })}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="office_vis_check"
                  checked={editingOffice.is_visible}
                  onChange={(e) => setEditingOffice({ ...editingOffice, is_visible: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                />
                <label htmlFor="office_vis_check" className="text-xs font-medium text-text-primary cursor-pointer">
                  Visible under Global Hubs
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => { setShowOfficeModal(false); setEditingOffice(null) }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-text-secondary hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveOffice}
                  disabled={savingOffice}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 disabled:opacity-50"
                >
                  {savingOffice ? 'Saving...' : 'Save Office'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: SOCIAL ==================== */}
      {showSocialModal && editingSocial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-base text-text-primary">
                {editingSocial.id ? 'Edit Social Profile' : 'Add Social Profile'}
              </h3>
              <button
                onClick={() => { setShowSocialModal(false); setEditingSocial(null) }}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-border/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Platform Name *
                </label>
                <input
                  type="text"
                  value={editingSocial.platform || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                  placeholder="LinkedIn, Twitter, YouTube, Instagram"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Profile URL *
                </label>
                <input
                  type="text"
                  value={editingSocial.url || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  placeholder="https://www.linkedin.com/company/..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="social_vis_check"
                  checked={editingSocial.is_visible}
                  onChange={(e) => setEditingSocial({ ...editingSocial, is_visible: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                />
                <label htmlFor="social_vis_check" className="text-xs font-medium text-text-primary cursor-pointer">
                  Visible on Footer
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => { setShowSocialModal(false); setEditingSocial(null) }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-text-secondary hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSocial}
                  disabled={savingSocial}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 disabled:opacity-50"
                >
                  {savingSocial ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FooterManagement
