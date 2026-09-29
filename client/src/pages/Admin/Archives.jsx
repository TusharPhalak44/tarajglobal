import React, { useEffect, useState, useMemo } from 'react'
import { 
  Search, 
  MoreVertical, 
  Trash2, 
  Eye, 
  Archive, 
  FileText, 
  Calendar, 
  X, 
  CheckCircle, 
  RefreshCw, 
  Briefcase,
  RotateCcw
} from 'lucide-react'
import { adminAPI } from '@api'
import { analyzeSEO } from '@utils/seoAnalyzer'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Archives = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState('blogs')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)

  const fetchArchivedBlogs = async () => {
    try {
      const response = await adminAPI.getBlogs({ status: 'archived', page: 1, limit: 100 })
      const blogsData = response.data.data?.blogs || response.data.blogs || []
      setBlogs(blogsData)
    } catch (error) {
      console.error('Failed to fetch archived blogs:', error)
      setBlogs([])
    }
  }

  const fetchArchivedJobs = async () => {
    try {
      const response = await adminAPI.getJobs({ status: 'archived', page: 1, limit: 100 })
      const jobsData = response.data.data?.jobs || response.data.jobs || []
      setJobs(jobsData)
    } catch (error) {
      console.error('Failed to fetch archived jobs:', error)
      setJobs([])
    }
  }

  const loadArchives = async (isInitial = false) => {
    if (isInitial) setLoading(true)
    else setRefreshing(true)
    await Promise.all([fetchArchivedBlogs(), fetchArchivedJobs()])
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    loadArchives(true)
  }, [])

  const filteredItems = useMemo(() => {
    const list = activeTab === 'blogs' ? blogs : jobs
    if (!searchTerm.trim()) return list

    const q = searchTerm.toLowerCase()
    return list.filter(item => 
      (item.title || '').toLowerCase().includes(q) ||
      (item.excerpt || item.description || '').toLowerCase().includes(q) ||
      (item.category_name || item.department || '').toLowerCase().includes(q)
    )
  }, [activeTab, blogs, jobs, searchTerm])

  const handleRestoreToDraft = async (item) => {
    setActiveDropdown(null)
    try {
      if (activeTab === 'blogs') {
        const seoResult = analyzeSEO({
          title: item.title,
          slug: item.slug,
          content: item.content,
          excerpt: item.excerpt,
          featured_image: item.featured_image || item.image
        })
        await adminAPI.updateBlog(item.id, { 
          status: 'draft',
          seo_score: seoResult.score,
          seo_analysis: seoResult
        })
      } else {
        await adminAPI.updateJob(item.id, { status: 'draft' })
      }
      await loadArchives(false)
      alert(`"${item.title}" restored to Drafts!`)
    } catch (error) {
      console.error('Failed to restore archive:', error)
      alert(`Failed to restore: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleRestoreToLive = async (item) => {
    setActiveDropdown(null)
    try {
      if (activeTab === 'blogs') {
        const seoResult = analyzeSEO({
          title: item.title,
          slug: item.slug,
          content: item.content,
          excerpt: item.excerpt,
          featured_image: item.featured_image || item.image
        })
        await adminAPI.updateBlog(item.id, { 
          status: 'published',
          seo_score: seoResult.score,
          seo_analysis: seoResult
        })
      } else {
        await adminAPI.updateJob(item.id, { status: 'active' })
      }
      await loadArchives(false)
      alert(`"${item.title}" restored to Live Published state!`)
    } catch (error) {
      console.error('Failed to publish archive:', error)
      alert(`Failed to publish: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleDelete = async (item) => {
    setActiveDropdown(null)
    if (window.confirm(`Permanently delete "${item.title}"? This action cannot be reversed.`)) {
      try {
        if (activeTab === 'blogs') {
          await adminAPI.deleteBlog(item.id)
        } else {
          await adminAPI.deleteJob(item.id)
        }
        await loadArchives(false)
        alert('Item permanently deleted.')
      } catch (error) {
        console.error('Failed to delete item:', error)
        alert(`Failed to delete: ${error.response?.data?.message || error.message}`)
      }
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Archived Records Repository"
        subtitle="Historical content articles and expired career positions preserved in archive storage."
        breadcrumbs={[{ label: 'Archives' }]}
        onRefresh={() => loadArchives(false)}
        isRefreshing={refreshing}
      />

      {/* Tabs & Search */}
      <div className="admin-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--admin-bg-elevated)] rounded-xl border border-[var(--admin-border-subtle)] w-full md:w-auto">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'blogs'
                ? 'bg-[var(--admin-primary)] text-white shadow-sm'
                : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Archived Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'jobs'
                ? 'bg-[var(--admin-primary)] text-white shadow-sm'
                : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Archived Careers ({jobs.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder={`Search archived ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10 pr-9 text-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Table View */}
      {loading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : filteredItems.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={Archive}
            title={`No archived ${activeTab} found`}
            description={searchTerm ? "No matching records found in archive." : `There are no archived ${activeTab} in cold storage.`}
          />
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="admin-table-wrapper admin-scrollbar">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title & Description</th>
                  <th>Category / Department</th>
                  <th>Status</th>
                  <th>Archive Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => {
                  const Icon = activeTab === 'jobs' ? Briefcase : FileText

                  return (
                    <tr key={item.id} className="group">
                      <td>
                        <div className="flex items-center gap-3 min-w-[240px] max-w-md">
                          <div className="w-10 h-10 rounded-lg bg-[var(--admin-warning-soft)] border border-[#FFA600]/20 flex items-center justify-center shrink-0 text-[#FFA600]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-xs sm:text-sm text-[var(--admin-text-primary)] truncate group-hover:text-[var(--admin-primary)] transition-colors">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-[var(--admin-text-muted)] truncate mt-0.5">
                              {item.excerpt || item.description || 'Archived historical entry'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-xs text-[var(--admin-text-secondary)] font-medium">
                        {item.category_name || item.department || '-'}
                      </td>
                      <td>
                        <StatusBadge status="archived" />
                      </td>
                      <td className="text-xs text-[var(--admin-text-muted)]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(item.updated_at || item.created_at || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === item.id ? null : item.id)
                            }}
                            className="p-1.5 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeDropdown === item.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setActiveDropdown(null)}
                              />
                              <div className={`absolute right-0 ${
                                index >= Math.max(1, filteredItems.length - 2) && filteredItems.length > 2
                                  ? 'bottom-full mb-2' 
                                  : 'top-full mt-2'
                              } w-48 bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-xl shadow-2xl z-50 p-1 divide-y divide-[var(--admin-border-subtle)] animate-slide-down`}>
                                <div className="py-1">
                                  <button
                                    onClick={() => handleRestoreToDraft(item)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#FFA600] hover:bg-[#FFA600]/10 rounded-lg transition-colors"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5 text-[#FFA600]" />
                                    <span>Restore to Draft</span>
                                  </button>
                                  <button
                                    onClick={() => handleRestoreToLive(item)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#72D669] hover:bg-[#72D669]/10 rounded-lg transition-colors"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5 text-[#72D669]" />
                                    <span>Restore to Live</span>
                                  </button>
                                </div>
                                <div className="pt-1">
                                  <button
                                    onClick={() => handleDelete(item)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#F43F5E] hover:bg-[#F43F5E]/10 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Permanently</span>
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Archives
