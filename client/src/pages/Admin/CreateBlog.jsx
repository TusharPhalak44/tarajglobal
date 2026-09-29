import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  Clock,
  FileText,
  TrendingUp,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  Image,
  Layers,
  HelpCircle,
  Eye
} from 'lucide-react'
import { adminAPI } from '@api'
import FeaturedMedia from '@components/admin/FeaturedMedia'
import { analyzeSEO, getSEOStatusColor, getSEOStatusBg } from '@utils/seoAnalyzer'
import PageHeader from '@components/admin/PageHeader'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [seoAnalysis, setSeoAnalysis] = useState(null)
  const [showSeoPanel, setShowSeoPanel] = useState(true)

  const [createForm, setCreateForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: '',
    author_id: '',
    status: 'draft',
    featured_image: ''
  })

  useEffect(() => {
    fetchCategories()
    fetchAuthors()
  }, [])

  // Live SEO scoring
  useEffect(() => {
    if (createForm.title || createForm.content) {
      const analysis = analyzeSEO({
        title: createForm.title,
        slug: createForm.slug,
        content: createForm.content,
        excerpt: createForm.excerpt,
        featured_image: createForm.featured_image
      })
      setSeoAnalysis(analysis)
    }
  }, [createForm.title, createForm.slug, createForm.content, createForm.excerpt, createForm.featured_image])

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.getCategories()
      setCategories(response.data?.data || response.data || [])
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const fetchAuthors = async () => {
    try {
      const response = await adminAPI.getAuthors()
      setAuthors(response.data?.data || response.data || [])
    } catch (err) {
      console.error('Failed to fetch authors:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCreateForm(prev => {
      const updated = { ...prev, [name]: value }
      // Auto generate slug from title if slug not manually customized
      if (name === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    setError('')

    if (!createForm.title.trim()) {
      setError('Article title is mandatory.')
      return
    }
    if (!createForm.content.trim()) {
      setError('Article body content is mandatory.')
      return
    }

    setSaving(true)

    try {
      const currentSeo = analyzeSEO({
        title: createForm.title,
        slug: createForm.slug,
        content: createForm.content,
        excerpt: createForm.excerpt,
        featured_image: createForm.featured_image
      })

      const blogData = {
        title: createForm.title.trim(),
        slug: createForm.slug?.trim() || undefined,
        content: createForm.content,
        excerpt: createForm.excerpt || createForm.content.substring(0, 150),
        category_id: createForm.category_id ? parseInt(createForm.category_id, 10) : null,
        author_id: createForm.author_id ? parseInt(createForm.author_id, 10) : null,
        status: createForm.status || 'draft',
        featured_image: createForm.featured_image || null,
        seo_score: currentSeo?.score || 0,
        seo_analysis: currentSeo || null
      }

      await adminAPI.createBlog(blogData)
      alert('Article created successfully!')
      navigate('/admin/blogs')
    } catch (err) {
      console.error('Failed to create blog:', err)
      const msg = err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors.map(e => e.msg).join(', ')) ||
        err.message ||
        'Failed to create blog. Please try again.'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  const seoScore = seoAnalysis?.score || 0

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <PageHeader
        title="Author New Blog Article"
        subtitle="Compose and publish rich industry insights with integrated real-time SEO validation."
        breadcrumbs={[
          { label: 'Blogs', path: '/admin/blogs' },
          { label: 'Create Article' }
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/blogs')}
              className="admin-btn admin-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateBlog}
              disabled={saving}
              className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/25"
            >
              {saving ? <><Clock className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Article</>}
            </button>
          </div>
        }
      />

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-[var(--admin-danger-soft)] border border-[#F43F5E]/30 text-[#F43F5E] text-xs font-semibold flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleCreateBlog} className="space-y-6">
        {/* SECTION 1: Core Article Information */}
        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                1. Article Content & Metadata
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)]">Core editorial title, permalink URL slug, and summary excerpt.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Article Title <span className="text-[#F43F5E]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={createForm.title}
                onChange={handleInputChange}
                placeholder="e.g., Scaling B2B Revenue Pipelines with Precision ABM"
                className="admin-input font-medium"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider">
                  Permalink Slug
                </label>
                <span className="text-[11px] text-[var(--admin-text-muted)] font-mono">
                  /blog/{createForm.slug || 'your-slug-here'}
                </span>
              </div>
              <input
                type="text"
                name="slug"
                value={createForm.slug}
                onChange={handleInputChange}
                placeholder="scaling-b2b-revenue-pipelines"
                className="admin-input font-mono text-xs"
              />
            </div>

            {/* Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider">
                  Summary Excerpt
                </label>
                <span className="text-[11px] text-[var(--admin-text-muted)]">
                  {createForm.excerpt.length}/250 characters
                </span>
              </div>
              <textarea
                name="excerpt"
                value={createForm.excerpt}
                onChange={handleInputChange}
                rows={2}
                placeholder="A compelling 1-2 sentence summary for search engine previews and article listings..."
                className="admin-input resize-none text-xs leading-relaxed"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Full Article Content <span className="text-[#F43F5E]">*</span>
              </label>
              <textarea
                name="content"
                value={createForm.content}
                onChange={handleInputChange}
                rows={12}
                placeholder="Write or paste your article content here..."
                className="admin-input resize-y text-xs leading-relaxed font-sans"
                required
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Media Asset */}
        <div className="admin-card p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--admin-accent-soft)] text-[var(--admin-accent)] flex items-center justify-center">
              <Image className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                2. Featured Media Asset
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)]">Hero image or video displayed on blog banners and social sharing cards.</p>
            </div>
          </div>

          <FeaturedMedia
            value={createForm.featured_image}
            onChange={(url) => setCreateForm(prev => ({ ...prev, featured_image: url }))}
            disabled={saving}
          />
        </div>

        {/* SECTION 3: Categorization & Taxonomy */}
        <div className="admin-card p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                3. Taxonomy & Publishing Parameters
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)]">Assign editorial author, topic category, and publication visibility.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Topic Category
              </label>
              <select
                name="category_id"
                value={createForm.category_id}
                onChange={handleInputChange}
                className="admin-select text-xs"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Author Byline
              </label>
              <select
                name="author_id"
                value={createForm.author_id}
                onChange={handleInputChange}
                className="admin-select text-xs"
              >
                <option value="">Select Author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Publishing Status
              </label>
              <select
                name="status"
                value={createForm.status}
                onChange={handleInputChange}
                className="admin-select text-xs font-semibold"
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Live Now</option>
                <option value="archived">Archive</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 4: Live SEO Telemetry Gauge */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--admin-success-soft)] text-[var(--admin-success)] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                  4. Real-time SEO Diagnostic Engine
                </h3>
                <p className="text-xs text-[var(--admin-text-muted)]">Live readability, keyword optimization, and metadata validation.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)]">
                <TrendingUp className={`w-3.5 h-3.5 ${seoScore >= 80 ? 'text-[#72D669]' : seoScore >= 60 ? 'text-[#00A6FF]' : seoScore >= 40 ? 'text-[#FFA600]' : 'text-[#F43F5E]'
                  }`} />
                <span>SEO Score: {seoScore}/100</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Title Length
              </span>
              <span className={`text-xs font-bold ${createForm.title.length >= 30 && createForm.title.length <= 60 ? 'text-[#72D669]' : 'text-[#FFA600]'
                }`}>
                {createForm.title.length} chars {createForm.title.length >= 30 && createForm.title.length <= 60 ? '✓' : '(optimal 30-60)'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Content Word Count
              </span>
              <span className="text-xs font-bold text-[var(--admin-text-primary)]">
                {createForm.content.trim() ? createForm.content.trim().split(/\s+/).length : 0} words
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Excerpt Meta
              </span>
              <span className={`text-xs font-bold ${createForm.excerpt ? 'text-[#72D669]' : 'text-[#FFA600]'}`}>
                {createForm.excerpt ? 'Defined ✓' : 'Auto-extracted'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Featured Asset
              </span>
              <span className={`text-xs font-bold ${createForm.featured_image ? 'text-[#72D669]' : 'text-[#FFA600]'}`}>
                {createForm.featured_image ? 'Attached ✓' : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/25"
          >
            {saving ? <><Clock className="w-4 h-4 animate-spin" /> Publishing...</> : <><Save className="w-4 h-4" /> Save Article</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
