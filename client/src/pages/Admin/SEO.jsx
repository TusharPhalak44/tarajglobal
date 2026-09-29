import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Globe, 
  Share2, 
  Twitter, 
  Save, 
  Loader2, 
  LayoutPanelLeft, 
  FileText, 
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  HelpCircle,
  Eye,
  Layers
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'

const STATIC_PAGES = [
  { id: 'home', title: 'Home Landing Page' },
  { id: 'about', title: 'About Us' },
  { id: 'services', title: 'Services Overview' },
  { id: 'contact', title: 'Contact Us' },
  { id: 'careers', title: 'Careers' },
  { id: 'blog', title: 'Blog Listings' },
  { id: 'content-syndication', title: 'Content Syndication' },
  { id: 'bant-lead-generation', title: 'BANT Lead Generation' },
  { id: 'mql-services', title: 'MQL Services' },
  { id: 'hql-services', title: 'HQL Services' },
  { id: 'sql-services', title: 'SQL Services' },
  { id: 'b2b-appointment-setting', title: 'B2B Appointment Setting' },
  { id: 'b2b-email-marketing', title: 'B2B Email Marketing' },
  { id: 'demandflow-bridge', title: 'DemandFlow Bridge' },
  { id: 'abm', title: 'Account Based Marketing (ABM)' },
  { id: 'webinar-services', title: 'Webinar Services' },
  { id: 'lead-nurturing', title: 'Lead Nurturing' },
  { id: 'demand-generation', title: 'Demand Generation' },
  { id: 'b2b-list-building', title: 'B2B List Building' },
  { id: 'database-cleansing', title: 'Database Cleansing' },
  { id: 'privacy', title: 'Privacy Policy' },
  { id: 'terms', title: 'Terms & Conditions' },
  { id: 'cookies', title: 'Cookie Policy' }
]

const SEO = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedType, setSelectedType] = useState('page')
  const [selectedId, setSelectedId] = useState('home')
  const [seoData, setSeoData] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [activeTab, setActiveTab] = useState('basic')
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (selectedType === 'blog') {
      fetchBlogs()
    }
  }, [selectedType])

  const fetchBlogs = async () => {
    try {
      const response = await adminAPI.getBlogs({ limit: 100, status: 'published' })
      setBlogs(response.data?.data?.blogs || response.data?.blogs || [])
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      setBlogs([])
    }
  }

  useEffect(() => {
    if (selectedId) {
      fetchSEOData()
    } else {
      setSeoData(null)
    }
  }, [selectedType, selectedId])

  const fetchSEOData = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getSEO(selectedType, selectedId)
      setSeoData(response.data?.data || response.data || {
        meta_title: '',
        meta_description: '',
        keywords: '',
        canonical_url: '',
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_title: '',
        twitter_description: '',
        twitter_image: ''
      })
    } catch (error) {
      console.error('Failed to fetch SEO data:', error)
      setSeoData({
        meta_title: '',
        meta_description: '',
        keywords: '',
        canonical_url: '',
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_title: '',
        twitter_description: '',
        twitter_image: ''
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!selectedId) return

    try {
      setSaving(true)
      await adminAPI.saveSEO(selectedType, selectedId, seoData || {})
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to save SEO data:', error)
      alert(`Failed to save SEO metadata: ${error.response?.data?.message || error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field, value) => {
    setSeoData(prev => ({ ...prev, [field]: value }))
  }

  const currentTitle = seoData?.meta_title || (selectedType === 'page' ? STATIC_PAGES.find(p => p.id === selectedId)?.title : selectedId) || 'Taraj Global Solutions'
  const currentDesc = seoData?.meta_description || 'High-performance B2B demand generation and pipeline acceleration solutions.'

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="SEO Metadata & OpenGraph Engine"
        subtitle="Configure search engine indexing rules, social metadata tags, and preview live SERP snippets."
        breadcrumbs={[{ label: 'SEO Metadata' }]}
        actions={
          <button
            onClick={handleSave}
            disabled={saving || !selectedId}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/25"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving Tags...</> : <><Save className="w-4 h-4" /> Save Metadata</>}
          </button>
        }
      />

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-[var(--admin-success-soft)] border border-[#72D669]/30 text-[#72D669] text-xs font-semibold flex items-center gap-2 animate-slide-down">
          <CheckCircle2 className="w-4 h-4" />
          <span>SEO Metadata successfully saved and published!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Content Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="admin-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4 text-[var(--admin-primary)]" />
              <span>Target Content</span>
            </h3>

            {/* Content Type Selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[var(--admin-bg-elevated)] rounded-xl border border-[var(--admin-border-subtle)]">
              <button
                onClick={() => { setSelectedType('page'); setSelectedId('home'); }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  selectedType === 'page' ? 'bg-[var(--admin-primary)] text-white' : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <LayoutPanelLeft className="w-3.5 h-3.5" />
                <span>Pages</span>
              </button>
              <button
                onClick={() => { setSelectedType('blog'); setSelectedId(blogs[0]?.id || ''); }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  selectedType === 'blog' ? 'bg-[var(--admin-primary)] text-white' : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Blogs</span>
              </button>
              <button
                onClick={() => { setSelectedType('job'); setSelectedId(''); }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  selectedType === 'job' ? 'bg-[var(--admin-primary)] text-white' : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Jobs</span>
              </button>
            </div>

            {/* Target Select Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider mb-1.5">
                Select Route / Item
              </label>
              {selectedType === 'page' && (
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="admin-select text-xs font-medium"
                >
                  {STATIC_PAGES.map((p) => (
                    <option key={p.id} value={p.id}>{p.title} (/{p.id === 'home' ? '' : p.id})</option>
                  ))}
                </select>
              )}

              {selectedType === 'blog' && (
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="admin-select text-xs font-medium"
                >
                  <option value="">Select a blog post...</option>
                  {blogs.map((b) => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
              )}

              {selectedType === 'job' && (
                <input
                  type="text"
                  placeholder="Enter Job ID..."
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="admin-input text-xs"
                />
              )}
            </div>
          </div>

          {/* Live Search Engine Preview Snippet */}
          <div className="admin-card p-5 space-y-3">
            <h4 className="text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#72D669]" />
              <span>Google SERP Preview</span>
            </h4>

            <div className="p-4 rounded-xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-white/10 space-y-1 text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-[#202124] dark:text-[#bdc1c6] truncate">
                <span className="font-medium">tarajglobal.com</span>
                <span className="text-[10px]">›</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">
                  {selectedType === 'page' ? (selectedId === 'home' ? '' : selectedId) : selectedType}
                </span>
              </div>
              <h5 className="text-sm font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight truncate">
                {currentTitle} | Taraj Global Solutions
              </h5>
              <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2 leading-relaxed">
                {currentDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: SEO Editor Tabs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="admin-card overflow-hidden">
            {/* Tab Bar */}
            <div className="flex items-center border-b border-[var(--admin-border-subtle)] bg-[var(--admin-bg-elevated)] px-4">
              <button
                onClick={() => setActiveTab('basic')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'basic'
                    ? 'border-[#00A6FF] text-[#00A6FF]'
                    : 'border-transparent text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Search Engine Meta</span>
              </button>

              <button
                onClick={() => setActiveTab('og')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'og'
                    ? 'border-[#00A6FF] text-[#00A6FF]'
                    : 'border-transparent text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Open Graph (FB / LinkedIn)</span>
              </button>

              <button
                onClick={() => setActiveTab('twitter')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'twitter'
                    ? 'border-[#00A6FF] text-[#00A6FF]'
                    : 'border-transparent text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter Card</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider">
                        Meta Title Tag
                      </label>
                      <span className={`text-[11px] font-mono ${
                        (seoData?.meta_title?.length || 0) > 60 ? 'text-[#FFA600]' : 'text-[var(--admin-text-muted)]'
                      }`}>
                        {seoData?.meta_title?.length || 0}/60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={seoData?.meta_title || ''}
                      onChange={(e) => handleChange('meta_title', e.target.value)}
                      placeholder="e.g., Enterprise B2B Lead Generation & ABM Pipeline Services"
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider">
                        Meta Description Tag
                      </label>
                      <span className={`text-[11px] font-mono ${
                        (seoData?.meta_description?.length || 0) > 160 ? 'text-[#FFA600]' : 'text-[var(--admin-text-muted)]'
                      }`}>
                        {seoData?.meta_description?.length || 0}/160 chars
                      </span>
                    </div>
                    <textarea
                      value={seoData?.meta_description || ''}
                      onChange={(e) => handleChange('meta_description', e.target.value)}
                      rows={3}
                      placeholder="e.g., Accelerate qualified revenue pipeline with high-conversion MQL, SQL, and ABM campaign syndication from Taraj Global Solutions."
                      className="admin-input resize-none text-xs leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                        Target Keywords
                      </label>
                      <input
                        type="text"
                        value={seoData?.keywords || ''}
                        onChange={(e) => handleChange('keywords', e.target.value)}
                        placeholder="b2b lead gen, abm, demand generation"
                        className="admin-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                        Canonical URL
                      </label>
                      <input
                        type="url"
                        value={seoData?.canonical_url || ''}
                        onChange={(e) => handleChange('canonical_url', e.target.value)}
                        placeholder="https://tarajglobal.com/..."
                        className="admin-input text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'og' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                      OpenGraph Title (og:title)
                    </label>
                    <input
                      type="text"
                      value={seoData?.og_title || ''}
                      onChange={(e) => handleChange('og_title', e.target.value)}
                      placeholder="Title for social media embeds"
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                      OpenGraph Description (og:description)
                    </label>
                    <textarea
                      value={seoData?.og_description || ''}
                      onChange={(e) => handleChange('og_description', e.target.value)}
                      rows={3}
                      placeholder="Social share summary description..."
                      className="admin-input resize-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                      OpenGraph Banner Image URL (og:image)
                    </label>
                    <input
                      type="url"
                      value={seoData?.og_image || ''}
                      onChange={(e) => handleChange('og_image', e.target.value)}
                      placeholder="https://tarajglobal.com/assets/og-image.jpg"
                      className="admin-input text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'twitter' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                      Twitter Card Title
                    </label>
                    <input
                      type="text"
                      value={seoData?.twitter_title || ''}
                      onChange={(e) => handleChange('twitter_title', e.target.value)}
                      placeholder="Twitter card headline"
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                      Twitter Card Description
                    </label>
                    <textarea
                      value={seoData?.twitter_description || ''}
                      onChange={(e) => handleChange('twitter_description', e.target.value)}
                      rows={3}
                      placeholder="Twitter card summary..."
                      className="admin-input resize-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                      Twitter Card Image URL
                    </label>
                    <input
                      type="url"
                      value={seoData?.twitter_image || ''}
                      onChange={(e) => handleChange('twitter_image', e.target.value)}
                      placeholder="https://..."
                      className="admin-input text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Save Bar */}
            <div className="p-4 bg-[var(--admin-bg-surface)] border-t border-[var(--admin-border-subtle)] flex items-center justify-end">
              <button
                onClick={handleSave}
                disabled={saving || !selectedId}
                className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/25"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save SEO Configuration</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SEO