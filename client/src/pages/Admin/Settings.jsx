import React, { useEffect, useState } from 'react'
import { Save, Globe, Mail, Phone, Linkedin, Twitter, Facebook, CheckCircle, AlertCircle } from 'lucide-react'
import { adminAPI } from '@api'

const Settings = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
      setMessage({ type: 'error', text: 'Failed to load settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setMessage({ type: '', text: '' })
      await adminAPI.updateSettings(settings)
      setMessage({ type: 'success', text: 'Settings saved successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to save settings' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
          <p className="text-text-secondary">Manage website settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-error/10 border border-error/30 text-error'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Site Name</label>
              <input
                type="text"
                value={settings.cms_site_name}
                onChange={(e) => handleChange('cms_site_name', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Site Description</label>
              <textarea
                value={settings.cms_site_description}
                onChange={(e) => handleChange('cms_site_description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cta" />
            Contact Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.cms_contact_email}
                onChange={(e) => handleChange('cms_contact_email', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Contact Phone</label>
              <input
                type="tel"
                value={settings.cms_contact_phone}
                onChange={(e) => handleChange('cms_contact_phone', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Social Settings */}
        <div className="bg-surface rounded-xl border border-border p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-info" />
            Social Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </label>
              <input
                type="url"
                value={settings.cms_social_linkedin}
                onChange={(e) => handleChange('cms_social_linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </label>
              <input
                type="url"
                value={settings.cms_social_twitter}
                onChange={(e) => handleChange('cms_social_twitter', e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </label>
              <input
                type="url"
                value={settings.cms_social_facebook}
                onChange={(e) => handleChange('cms_social_facebook', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
