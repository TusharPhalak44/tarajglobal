import React, { useEffect, useState } from 'react'
import { Search, Globe, Share2, Twitter, Save, Loader2, LayoutPanelLeft, FileText, Briefcase } from 'lucide-react'
import { adminAPI } from '@api'

const SEO = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedType, setSelectedType] = useState('page')
  const [selectedId, setSelectedId] = useState('')
  const [seoData, setSeoData] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [activeTab, setActiveTab] = useState('basic')

  const STATIC_PAGES = [
    { id: 'home', title: 'Home Page' },
    { id: 'about', title: 'About Us' },
    { id: 'services', title: 'Services Overview' },
    { id: 'contact', title: 'Contact Us' },
    { id: 'careers', title: 'Careers' },
    { id: 'blog', title: 'Blog Overview' },
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
      setSeoData(response.data?.data || response.data || null)
    } catch (error) {
      console.error('Failed to fetch SEO data:', error)
      setSeoData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!selectedId) return

    try {
      setSaving(true)
      await adminAPI.saveSEO(selectedType, selectedId, seoData || {})
    } catch (error) {
      console.error('Failed to save SEO data:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field, value) => {
    setSeoData({ ...seoData, [field]: value })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">SEO Management</h1>
          <p className="text-text-secondary">Optimize how your pages appear on search engines and social media.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Entity Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="p-5 border-b border-border bg-background/50">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Select Content
              </h3>
              <p className="text-sm text-text-muted mt-1">Choose a page or post to edit its SEO.</p>
            </div>

            <div className="p-5 space-y-5">
              {/* Content Type Selector (Pills) */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-3">Content Type</label>
                <div className="flex bg-background border border-border p-1 rounded-xl">
                  <button
                    onClick={() => { setSelectedType('page'); setSelectedId(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-lg transition-all ${selectedType === 'page' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-surface'}`}
                  >
                    <LayoutPanelLeft className="w-4 h-4" /> Pages
                  </button>
                  <button
                    onClick={() => { setSelectedType('blog'); setSelectedId(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-lg transition-all ${selectedType === 'blog' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-surface'}`}
                  >
                    <FileText className="w-4 h-4" /> Blogs
                  </button>
                  <button
                    onClick={() => { setSelectedType('job'); setSelectedId(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-lg transition-all ${selectedType === 'job' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-surface'}`}
                  >
                    <Briefcase className="w-4 h-4" /> Jobs
                  </button>
                </div>
              </div>

              {/* Item Selector */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-3">
                  Select {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                >
                  <option value="" disabled>Choose a {selectedType}...</option>
                  {selectedType === 'page' ? (
                    STATIC_PAGES.map((page) => (
                      <option key={page.id} value={page.id}>{page.title}</option>
                    ))
                  ) : selectedType === 'blog' ? (
                    blogs.map((blog) => (
                      <option key={blog.id} value={blog.id}>{blog.title}</option>
                    ))
                  ) : (
                    <option value="" disabled>Coming soon...</option>
                  )}
                </select>
              </div>

              {selectedId && (
                <button
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {saving ? 'Saving Changes...' : 'Save SEO Data'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: SEO Form & Previews */}
        <div className="lg:col-span-8">
          {!selectedId ? (
            <div className="bg-surface rounded-2xl border border-border p-16 text-center shadow-sm h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center border border-border shadow-inner mb-6">
                <Globe className="w-10 h-10 text-primary/40" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">No Content Selected</h3>
              <p className="text-text-muted max-w-sm mx-auto">Please select a page, blog post, or job from the left sidebar to start managing its SEO metadata.</p>
            </div>
          ) : loading ? (
            <div className="bg-surface rounded-2xl border border-border p-16 text-center shadow-sm h-full flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
              <p className="text-text-secondary font-medium">Fetching SEO data...</p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Google Search Preview */}
              <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="bg-background/50 px-5 py-3 border-b border-border flex items-center gap-2">
                  <Search className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Search Engine Preview</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col max-w-[600px]">
                    <span className="text-[#202124] text-[14px] leading-[1.3] font-normal font-sans flex items-center gap-1">
                      {seoData?.canonical_url || 'https://tarajglobal.com'} <span className="text-[#5f6368] text-[12px]">▼</span>
                    </span>
                    <span className="text-[#1a0dab] text-[20px] leading-[1.3] font-medium font-sans mt-1 hover:underline cursor-pointer truncate">
                      {seoData?.meta_title || 'Your Page Title | Taraj Global'}
                    </span>
                    <span className="text-[#4d5156] text-[14px] leading-[1.58] font-sans mt-1 line-clamp-2">
                      {seoData?.meta_description || 'Provide a compelling description that encourages users to click. Keep it under 160 characters for best results on search engines.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editor Tabs */}
              <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="flex items-center border-b border-border bg-background/50 px-2 pt-2">
                  <button
                    onClick={() => setActiveTab('basic')}
                    className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'basic' ? 'border-primary text-primary bg-surface' : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-background'}`}
                  >
                    <Globe className="w-4 h-4" /> Basic SEO
                  </button>
                  <button
                    onClick={() => setActiveTab('social')}
                    className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'social' ? 'border-primary text-primary bg-surface' : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-background'}`}
                  >
                    <Share2 className="w-4 h-4" /> Social Media Tags
                  </button>
                </div>

                <div className="p-6">
                  {/* Basic SEO Tab */}
                  {activeTab === 'basic' && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-semibold text-text-primary">Meta Title</label>
                          <span className={`text-xs font-medium ${(seoData?.meta_title?.length || 0) > 60 ? 'text-red-500' : 'text-text-muted'}`}>
                            {(seoData?.meta_title || '').length} / 60
                          </span>
                        </div>
                        <input
                          type="text"
                          value={seoData?.meta_title || ''}
                          onChange={(e) => handleChange('meta_title', e.target.value)}
                          placeholder="e.g. B2B Lead Generation Services | Taraj Global"
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-semibold text-text-primary">Meta Description</label>
                          <span className={`text-xs font-medium ${(seoData?.meta_description?.length || 0) > 160 ? 'text-red-500' : 'text-text-muted'}`}>
                            {(seoData?.meta_description || '').length} / 160
                          </span>
                        </div>
                        <textarea
                          value={seoData?.meta_description || ''}
                          onChange={(e) => handleChange('meta_description', e.target.value)}
                          placeholder="Write a brief, engaging summary of this page..."
                          rows={3}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">Target Keywords</label>
                        <input
                          type="text"
                          value={seoData?.meta_keywords || ''}
                          onChange={(e) => handleChange('meta_keywords', e.target.value)}
                          placeholder="e.g. b2b marketing, lead generation, abm (comma separated)"
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <p className="text-xs text-text-muted mt-2">Keywords are less important today, but still help define page topic.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-border">
                        <div>
                          <label className="block text-sm font-semibold text-text-primary mb-2">Canonical URL</label>
                          <input
                            type="url"
                            value={seoData?.canonical_url || ''}
                            onChange={(e) => handleChange('canonical_url', e.target.value)}
                            placeholder="https://tarajglobal.com/page-slug"
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-text-primary mb-2">Robots Tag</label>
                          <input
                            type="text"
                            value={seoData?.robots || ''}
                            onChange={(e) => handleChange('robots', e.target.value)}
                            placeholder="index, follow"
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-all text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Social Media Tab */}
                  {activeTab === 'social' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

                      {/* Facebook / LinkedIn (Open Graph) */}
                      <div>
                        <h4 className="text-sm font-bold text-[#1877F2] uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Share2 className="w-4 h-4" /> Facebook & LinkedIn (Open Graph)
                        </h4>
                        <div className="space-y-4 bg-background/50 p-5 rounded-xl border border-border">
                          <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">OG Title</label>
                            <input
                              type="text"
                              value={seoData?.og_title || ''}
                              onChange={(e) => handleChange('og_title', e.target.value)}
                              placeholder="Title for social sharing (leave empty to use Meta Title)"
                              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-[#1877F2]/50 transition-all text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">OG Description</label>
                            <textarea
                              value={seoData?.og_description || ''}
                              onChange={(e) => handleChange('og_description', e.target.value)}
                              placeholder="Description for social sharing (leave empty to use Meta Description)"
                              rows={2}
                              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-[#1877F2]/50 transition-all resize-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">OG Image URL</label>
                            <input
                              type="url"
                              value={seoData?.og_image || ''}
                              onChange={(e) => handleChange('og_image', e.target.value)}
                              placeholder="https://tarajglobal.com/social-banner.jpg"
                              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-[#1877F2]/50 transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Twitter */}
                      <div>
                        <h4 className="text-sm font-bold text-[#1DA1F2] uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Twitter className="w-4 h-4" /> Twitter Card
                        </h4>
                        <div className="space-y-4 bg-background/50 p-5 rounded-xl border border-border">
                          <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">Twitter Title</label>
                            <input
                              type="text"
                              value={seoData?.twitter_title || ''}
                              onChange={(e) => handleChange('twitter_title', e.target.value)}
                              placeholder="Title for Twitter (leave empty to use OG Title)"
                              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-[#1DA1F2]/50 transition-all text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">Twitter Description</label>
                            <textarea
                              value={seoData?.twitter_description || ''}
                              onChange={(e) => handleChange('twitter_description', e.target.value)}
                              placeholder="Description for Twitter (leave empty to use OG Description)"
                              rows={2}
                              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-[#1DA1F2]/50 transition-all resize-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-primary mb-2">Twitter Image URL</label>
                            <input
                              type="url"
                              value={seoData?.twitter_image || ''}
                              onChange={(e) => handleChange('twitter_image', e.target.value)}
                              placeholder="https://tarajglobal.com/twitter-banner.jpg"
                              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-[#1DA1F2]/50 transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SEO