import React, { useEffect, useState } from 'react'
import { Search, Globe, Share2, Twitter, Save, Loader2 } from 'lucide-react'
import { adminAPI } from '@api'

const SEO = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedType, setSelectedType] = useState('blog')
  const [selectedId, setSelectedId] = useState('')
  const [seoData, setSeoData] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchBlogs()
  }, [])

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">SEO Management</h1>
          <p className="text-text-secondary">Manage SEO metadata for your content</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entity Selector */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Select Content</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Content Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="blog">Blog Post</option>
                <option value="job">Job Posting</option>
                <option value="page">Page</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="">Select {selectedType}...</option>
                {blogs.map((blog) => (
                  <option key={blog.id} value={blog.id}>{blog.title}</option>
                ))}
              </select>
            </div>

            {selectedId && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {saving ? 'Saving...' : 'Save SEO Data'}
              </button>
            )}
          </div>
        </div>

        {/* SEO Form */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedId ? (
            <div className="bg-surface rounded-xl border border-border p-12 text-center">
              <Globe className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary mb-2">Select content to manage SEO</p>
              <p className="text-text-muted text-sm">Choose a {selectedType} from the sidebar to edit its SEO metadata</p>
            </div>
          ) : loading ? (
            <div className="bg-surface rounded-xl border border-border p-12 text-center">
              <Loader2 className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
              <p className="text-text-muted">Loading SEO data...</p>
            </div>
          ) : (
            <>
              {/* Basic SEO */}
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Basic SEO
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={seoData?.meta_title || ''}
                      onChange={(e) => handleChange('meta_title', e.target.value)}
                      placeholder="Page title for search engines"
                      maxLength={60}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                    <p className="text-xs text-text-muted mt-1">{(seoData?.meta_title || '').length}/60 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Meta Description</label>
                    <textarea
                      value={seoData?.meta_description || ''}
                      onChange={(e) => handleChange('meta_description', e.target.value)}
                      placeholder="Page description for search engines"
                      rows={3}
                      maxLength={160}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
                    />
                    <p className="text-xs text-text-muted mt-1">{(seoData?.meta_description || '').length}/160 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={seoData?.meta_keywords || ''}
                      onChange={(e) => handleChange('meta_keywords', e.target.value)}
                      placeholder="Comma-separated keywords"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Canonical URL</label>
                    <input
                      type="url"
                      value={seoData?.canonical_url || ''}
                      onChange={(e) => handleChange('canonical_url', e.target.value)}
                      placeholder="https://example.com/canonical-url"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Robots Meta Tag</label>
                    <input
                      type="text"
                      value={seoData?.robots || ''}
                      onChange={(e) => handleChange('robots', e.target.value)}
                      placeholder="index, follow"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Open Graph */}
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-cta" />
                  Open Graph (Facebook/LinkedIn)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">OG Title</label>
                    <input
                      type="text"
                      value={seoData?.og_title || ''}
                      onChange={(e) => handleChange('og_title', e.target.value)}
                      placeholder="Title for social sharing"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">OG Description</label>
                    <textarea
                      value={seoData?.og_description || ''}
                      onChange={(e) => handleChange('og_description', e.target.value)}
                      placeholder="Description for social sharing"
                      rows={2}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">OG Image URL</label>
                    <input
                      type="url"
                      value={seoData?.og_image || ''}
                      onChange={(e) => handleChange('og_image', e.target.value)}
                      placeholder="https://example.com/og-image.jpg"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Twitter Card */}
              <div className="bg-surface rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Twitter className="w-5 h-5 text-info" />
                  Twitter Card
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Twitter Title</label>
                    <input
                      type="text"
                      value={seoData?.twitter_title || ''}
                      onChange={(e) => handleChange('twitter_title', e.target.value)}
                      placeholder="Title for Twitter sharing"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Twitter Description</label>
                    <textarea
                      value={seoData?.twitter_description || ''}
                      onChange={(e) => handleChange('twitter_description', e.target.value)}
                      placeholder="Description for Twitter sharing"
                      rows={2}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Twitter Image URL</label>
                    <input
                      type="url"
                      value={seoData?.twitter_image || ''}
                      onChange={(e) => handleChange('twitter_image', e.target.value)}
                      placeholder="https://example.com/twitter-image.jpg"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SEO
