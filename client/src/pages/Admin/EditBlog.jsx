import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  X,
  Clock,
  FileText,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  Image,
  Layers,
  Eye
} from 'lucide-react'
import { adminAPI } from '@api'
import FeaturedMedia from '@components/admin/FeaturedMedia'
import { analyzeSEO } from '@utils/seoAnalyzer'
import PageHeader from '@components/admin/PageHeader'
import { DashboardSkeleton } from '@components/admin/LoadingSkeleton'

const EditBlog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [seoAnalysis, setSeoAnalysis] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    category_id: '',
    author_id: '',
    featured_image: ''
  })
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    fetchBlog()
    fetchCategories()
    fetchAuthors()
  }, [id])

  // Live SEO scoring
  useEffect(() => {
    if (editForm.title || editForm.content) {
      const analysis = analyzeSEO(editForm)
      setSeoAnalysis(analysis)
    }
  }, [editForm.title, editForm.slug, editForm.content, editForm.excerpt, editForm.featured_image])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getBlogById(id)
      const blogData = response.data.data || response.data
      const initialForm = {
        title: blogData.title || '',
        slug: blogData.slug || '',
        content: blogData.content || '',
        excerpt: blogData.excerpt || '',
        status: blogData.status || 'draft',
        category_id: blogData.category_id || '',
        author_id: blogData.author_id || '',
        featured_image: blogData.featured_image || blogData.image || ''
      }
      setEditForm(initialForm)
      setSeoAnalysis(analyzeSEO(initialForm))
    } catch (err) {
      console.error('Failed to fetch blog:', err)
      setError('Failed to load blog data.')
    } finally {
      setLoading(false)
    }
  }

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
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdateBlog = async (e) => {
    e.preventDefault()
    setError('')

    if (!editForm.title.trim()) {
      setError('Title is required.')
      return
    }
    if (!editForm.content.trim()) {
      setError('Content is required.')
      return
    }

    setSaving(true)

    try {
      const currentSeo = analyzeSEO(editForm)
      const updateData = {
        title: editForm.title.trim(),
        slug: editForm.slug?.trim() || undefined,
        content: editForm.content,
        excerpt: editForm.excerpt || editForm.content.substring(0, 150),
        category_id: editForm.category_id ? parseInt(editForm.category_id, 10) : null,
        author_id: editForm.author_id ? parseInt(editForm.author_id, 10) : null,
        status: editForm.status || 'draft',
        featured_image: editForm.featured_image || null,
        seo_score: currentSeo?.score || 0,
        seo_analysis: currentSeo || null
      }

      await adminAPI.updateBlog(id, updateData)
      alert('Article updated successfully!')
      navigate('/admin/blogs')
    } catch (err) {
      console.error('Failed to update blog:', err)
      const msg = err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors.map(e => e.msg).join(', ')) ||
        err.message ||
        'Failed to update blog. Please try again.'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  const seoScore = seoAnalysis?.score || 0

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <PageHeader
        title="Edit Blog Article"
        subtitle={`Updating article #${id}: ${editForm.title}`}
        breadcrumbs={[
          { label: 'Blogs', path: '/admin/blogs' },
          { label: `Edit #${id}` }
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.open(`/blog/${editForm.slug || id}?preview=true`, '_blank')}
              className="admin-btn admin-btn-secondary"
            >
              <Eye className="w-4 h-4 text-[#00A6FF]" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={handleUpdateBlog}
              disabled={saving}
              className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/25"
            >
              {saving ? <><Clock className="w-4 h-4 animate-spin" /> Updating...</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>
        }
      />

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

      <form onSubmit={handleUpdateBlog} className="space-y-6">
        {/* SECTION 1: Core Info */}
        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                1. Editorial Content & Slug
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)]">Core headline, search slug, and excerpt.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Article Title <span className="text-[#F43F5E]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="admin-input font-medium"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider">
                  Permalink Slug
                </label>
                <span className="text-[11px] text-[var(--admin-text-muted)] font-mono">
                  /blog/{editForm.slug || id}
                </span>
              </div>
              <input
                type="text"
                name="slug"
                value={editForm.slug}
                onChange={handleInputChange}
                className="admin-input font-mono text-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider">
                  Summary Excerpt
                </label>
                <span className="text-[11px] text-[var(--admin-text-muted)]">
                  {editForm.excerpt.length}/250 characters
                </span>
              </div>
              <textarea
                name="excerpt"
                value={editForm.excerpt}
                onChange={handleInputChange}
                rows={2}
                className="admin-input resize-none text-xs leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Full Article Content <span className="text-[#F43F5E]">*</span>
              </label>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleInputChange}
                rows={14}
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
              <p className="text-xs text-[var(--admin-text-muted)]">Hero image or video asset for this article.</p>
            </div>
          </div>

          <FeaturedMedia
            value={editForm.featured_image}
            onChange={(url) => setEditForm(prev => ({ ...prev, featured_image: url }))}
            disabled={saving}
          />
        </div>

        {/* SECTION 3: Taxonomy & Status */}
        <div className="admin-card p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                3. Taxonomy & Status Settings
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)]">Category, author byline, and publication visibility.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Topic Category
              </label>
              <select
                name="category_id"
                value={editForm.category_id}
                onChange={handleInputChange}
                className="admin-select text-xs"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Author Byline
              </label>
              <select
                name="author_id"
                value={editForm.author_id}
                onChange={handleInputChange}
                className="admin-select text-xs"
              >
                <option value="">Select Author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Publishing Status
              </label>
              <select
                name="status"
                value={editForm.status}
                onChange={handleInputChange}
                className="admin-select text-xs font-semibold"
              >
                <option value="draft">Draft</option>
                <option value="published">Published Live</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 4: Live SEO Engine */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--admin-success-soft)] text-[var(--admin-success)] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                  4. Real-time SEO Scoring & Diagnostics
                </h3>
                <p className="text-xs text-[var(--admin-text-muted)]">Live metadata audit.</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)]">
              <TrendingUp className={`w-3.5 h-3.5 ${seoScore >= 80 ? 'text-[#72D669]' : seoScore >= 60 ? 'text-[#00A6FF]' : seoScore >= 40 ? 'text-[#FFA600]' : 'text-[#F43F5E]'
                }`} />
              <span>SEO Score: {seoScore}/100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Title Length
              </span>
              <span className={`text-xs font-bold ${editForm.title.length >= 30 && editForm.title.length <= 60 ? 'text-[#72D669]' : 'text-[#FFA600]'
                }`}>
                {editForm.title.length} chars
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Word Count
              </span>
              <span className="text-xs font-bold text-[var(--admin-text-primary)]">
                {editForm.content.trim() ? editForm.content.trim().split(/\s+/).length : 0} words
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Excerpt
              </span>
              <span className={`text-xs font-bold ${editForm.excerpt ? 'text-[#72D669]' : 'text-[#FFA600]'}`}>
                {editForm.excerpt ? 'Defined ✓' : 'Auto-extracted'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">
                Featured Asset
              </span>
              <span className={`text-xs font-bold ${editForm.featured_image ? 'text-[#72D669]' : 'text-[#FFA600]'}`}>
                {editForm.featured_image ? 'Attached ✓' : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
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
            {saving ? <><Clock className="w-4 h-4 animate-spin" /> Updating...</> : <><Save className="w-4 h-4" /> Update Article</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBlog
