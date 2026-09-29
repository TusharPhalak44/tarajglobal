import React, { useEffect, useState } from 'react'
import {
  Save,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  AlertCircle,
  Settings as SettingsIcon,
  Shield,
  Layers,
  Sparkles,
  Share2,
  Sliders,
  Server,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import LoadingSkeleton from '@components/admin/LoadingSkeleton'

const Settings = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [settings, setSettings] = useState({
    cms_site_name: '',
    cms_site_description: '',
    cms_contact_email: '',
    cms_contact_phone: '',
    cms_social_linkedin: '',
    cms_social_twitter: '',
    cms_social_facebook: ''
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getSettings()
      setSettings(response.data || {})
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      setMessage({ type: 'error', text: 'Failed to load system settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e?.preventDefault()
    try {
      setSaving(true)
      setMessage({ type: '', text: '' })
      await adminAPI.updateSettings(settings)
      setMessage({ type: 'success', text: 'Global configuration saved and deployed successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 4000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to save settings' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="System Configuration" subtitle="Global environment variables, site identity, and communication channels" />
        <LoadingSkeleton type="card" count={3} />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <PageHeader
        title="System Configuration"
        subtitle="Manage global brand parameters, primary endpoints, and external social nodes"
        badge="Live Configuration"
        actions={[
          {
            label: saving ? 'Deploying Changes...' : 'Save Configuration',
            icon: saving ? RefreshCw : Save,
            onClick: handleSave,
            variant: 'primary'
          }
        ]}
      />

      {message.text && (
        <div
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex gap-2 border-b border-[var(--admin-border)] overflow-x-auto pb-0.5">
        {[
          { id: 'general', label: 'General & Site Identity', icon: Globe },
          { id: 'contact', label: 'Communications & Direct Lines', icon: Mail },
          { id: 'social', label: 'Social & Brand Channels', icon: Share2 }
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
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-[var(--admin-border)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: General Settings */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 admin-card p-6 space-y-6">
              <div className="border-b border-[var(--admin-border)] pb-4">
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Site Identity & Global Meta
                </h3>
                <p className="text-xs text-text-muted mt-0.5">Defines the default application identity rendered in search engines and open graph cards</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Platform / Brand Title
                  </label>
                  <input
                    type="text"
                    value={settings.cms_site_name || ''}
                    onChange={(e) => handleChange('cms_site_name', e.target.value)}
                    placeholder="Taraj Global Solutions"
                    className="admin-input"
                  />
                  <p className="text-[11px] text-text-muted mt-1">Appended to default browser tabs and SERP snippets</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Global Site Tagline / Description
                  </label>
                  <textarea
                    value={settings.cms_site_description || ''}
                    onChange={(e) => handleChange('cms_site_description', e.target.value)}
                    rows={4}
                    placeholder="B2B Growth & Lead Generation Agency powered by revenue intelligence."
                    className="admin-textarea"
                  />
                  <p className="text-[11px] text-text-muted mt-1">Default meta description used when specific page overrides are absent</p>
                </div>
              </div>
            </div>

            {/* Quick Info Sidecard */}
            <div className="admin-card p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" /> Architecture
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                Settings stored in this node cascade into both SSR/Client page templates and automated notifications across all microservices.
              </p>
              <div className="p-3.5 rounded-xl bg-[var(--admin-bg)] border border-[var(--admin-border)] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Environment</span>
                  <span className="font-mono text-emerald-400 font-bold">PRODUCTION</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Cache Strategy</span>
                  <span className="font-mono text-primary">Live Edge Sync</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Communications */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 admin-card p-6 space-y-6">
              <div className="border-b border-[var(--admin-border)] pb-4">
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#FF6D00]" />
                  Corporate Communications Channels
                </h3>
                <p className="text-xs text-text-muted mt-0.5">Direct contact inboxes and telephone routing channels</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Official Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="email"
                      value={settings.cms_contact_email || ''}
                      onChange={(e) => handleChange('cms_contact_email', e.target.value)}
                      placeholder="info@tarajglobal.com"
                      className="admin-input pl-10 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Corporate Phone Line
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="tel"
                      value={settings.cms_contact_phone || ''}
                      onChange={(e) => handleChange('cms_contact_phone', e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="admin-input pl-10 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-card p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Lead Forwarding</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Contact submissions received through website forms will utilize these default contact credentials for acknowledgment receipts and automated confirmation threads.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Social Media Channels */}
        {activeTab === 'social' && (
          <div className="admin-card p-6 space-y-6">
            <div className="border-b border-[var(--admin-border)] pb-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Enterprise Social Network Endpoints
              </h3>
              <p className="text-xs text-text-muted mt-0.5">Corporate profiles linked across headers, footers, and syndicated articles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="w-4 h-4 text-[#00A6FF]" /> LinkedIn Organization
                </label>
                <input
                  type="url"
                  value={settings.cms_social_linkedin || ''}
                  onChange={(e) => handleChange('cms_social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/taraj-global"
                  className="admin-input font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
                  <Twitter className="w-4 h-4 text-cyan-400" /> Twitter / X Handle
                </label>
                <input
                  type="url"
                  value={settings.cms_social_twitter || ''}
                  onChange={(e) => handleChange('cms_social_twitter', e.target.value)}
                  placeholder="https://twitter.com/tarajglobal"
                  className="admin-input font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
                  <Facebook className="w-4 h-4 text-blue-500" /> Facebook Page
                </label>
                <input
                  type="url"
                  value={settings.cms_social_facebook || ''}
                  onChange={(e) => handleChange('cms_social_facebook', e.target.value)}
                  placeholder="https://facebook.com/tarajglobal"
                  className="admin-input font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
          <button
            type="submit"
            disabled={saving}
            className="admin-btn-primary flex items-center gap-2"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Deploying Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
