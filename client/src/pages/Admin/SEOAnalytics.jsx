import React, { useState, useEffect, useMemo } from 'react'
import { 
  Eye, 
  Users, 
  Globe, 
  Link as LinkIcon, 
  Calendar,
  Activity,
  MonitorSmartphone,
  MapPin,
  ArrowUpRight,
  Clock,
  Search,
  TrendingUp,
  Sparkles,
  Layers,
  Compass,
  MousePointerClick,
  Target,
  Tag,
  Filter,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { adminAPI } from '@api/admin.api'
import PageHeader from '@components/admin/PageHeader'
import StatCard from '@components/admin/StatCard'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const formatDate = (dateString) => {
  if (!dateString) return { date: 'Unknown', time: '' }
  try {
    const date = new Date(dateString)
    return {
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date),
      time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date)
    }
  } catch (e) {
    return { date: dateString, time: '' }
  }
}

const SEOAnalytics = () => {
  const [data, setData] = useState(null)
  const [ctaData, setCtaData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [days, setDays] = useState(30)
  const [activeTab, setActiveTab] = useState('cta')

  // CTA Filters
  const [ctaSearch, setCtaSearch] = useState('')
  const [selectedSection, setSelectedSection] = useState('all')

  const fetchTrafficData = async () => {
    try {
      setLoading(true)
      const [trafficRes, ctaRes] = await Promise.allSettled([
        adminAPI.getTrafficAnalytics({ days }),
        adminAPI.getCtaClicks({ days })
      ])

      if (trafficRes.status === 'fulfilled' && trafficRes.value.data.success) {
        setData(trafficRes.value.data.data)
      } else if (trafficRes.status === 'rejected') {
        setError(trafficRes.reason?.response?.data?.message || trafficRes.reason?.message || 'Failed to fetch traffic')
      }

      if (ctaRes.status === 'fulfilled' && ctaRes.value.data.success) {
        setCtaData(ctaRes.value.data.data)
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrafficData()
  }, [days])

  // Filtered CTA clicks
  const filteredCtaClicks = useMemo(() => {
    if (!ctaData?.recentClicks) return []
    return ctaData.recentClicks.filter((click) => {
      const matchesSearch =
        !ctaSearch ||
        click.cta_text?.toLowerCase().includes(ctaSearch.toLowerCase()) ||
        click.section_name?.toLowerCase().includes(ctaSearch.toLowerCase()) ||
        click.page_url?.toLowerCase().includes(ctaSearch.toLowerCase()) ||
        click.utm_content?.toLowerCase().includes(ctaSearch.toLowerCase()) ||
        click.utm_campaign?.toLowerCase().includes(ctaSearch.toLowerCase())

      const matchesSection =
        selectedSection === 'all' ||
        click.section_id === selectedSection ||
        click.section_name === selectedSection

      return matchesSearch && matchesSection
    })
  }, [ctaData, ctaSearch, selectedSection])

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-[var(--admin-danger-soft)] border border-[#F43F5E]/30 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#F43F5E] mb-1">Analytics Telemetry Error</h3>
          <p className="text-sm text-[#F43F5E]/80">{error}</p>
        </div>
        <button onClick={() => window.location.reload()} className="admin-btn admin-btn-danger text-sm">
          Retry Stream
        </button>
      </div>
    )
  }

  const tabs = [
    { 
      id: 'cta', 
      label: 'CTA Click Attribution', 
      icon: MousePointerClick, 
      badge: ctaData?.totalClicks !== undefined ? `${ctaData.totalClicks} clicks` : null 
    },
    { id: 'live', label: 'Realtime Visitors', icon: Users },
    { id: 'pages', label: 'Top Performing URLs', icon: LinkIcon },
    { id: 'sources', label: 'Referral Sources', icon: Globe }
  ]

  const topSectionLeader = ctaData?.topSections?.[0]?.section_name || 'N/A'
  const topPageLeader = ctaData?.topPages?.[0]?.page_url || 'N/A'

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="SEO & Visitor Traffic Telemetry"
        subtitle="Real-time website traffic intelligence, page views distribution, and granular CTA button UTM attribution."
        breadcrumbs={[{ label: 'SEO Analytics' }]}
        onRefresh={fetchTrafficData}
        isRefreshing={loading}
        actions={
          <div className="flex items-center gap-2 bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)] px-3 py-1.5 rounded-xl shadow-xs">
            <Calendar className="w-4 h-4 text-[var(--admin-text-muted)] shrink-0" />
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="bg-transparent text-sm font-bold text-[var(--admin-text-primary)] outline-none cursor-pointer"
            >
              <option value={7}>Last 7 Days</option>
              <option value={30}>Last 30 Days</option>
              <option value={90}>Last 90 Days</option>
            </select>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={MousePointerClick}
          label="Total CTA Clicks"
          value={ctaData?.totalClicks || 0}
          accentColor="cyan"
          subtitle={`Across all pages (${days}d)`}
        />
        <StatCard
          icon={Users}
          label="CTA Click Visitors"
          value={ctaData?.uniqueVisitors || 0}
          accentColor="orange"
          subtitle="Distinct visitor clickers"
        />
        <StatCard
          icon={Target}
          label="Top Converting Section"
          value={topSectionLeader}
          accentColor="green"
          subtitle={ctaData?.topSections?.[0] ? `${ctaData.topSections[0].clicks} clicks recorded` : 'No data yet'}
        />
        <StatCard
          icon={Globe}
          label="Top Converting Route"
          value={topPageLeader}
          accentColor="purple"
          subtitle={ctaData?.topPages?.[0] ? `${ctaData.topPages[0].clicks} CTA clicks` : 'No data yet'}
        />
      </div>

      {/* Tab Navigation */}
      <div className="admin-card overflow-hidden">
        <div className="flex items-center border-b border-[var(--admin-border-subtle)] bg-[var(--admin-bg-elevated)] px-4 overflow-visible admin-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2.5 whitespace-nowrap ${
                  isActive
                    ? 'border-[#00A6FF] text-[#00A6FF]'
                    : 'border-transparent text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/30'
                      : 'bg-[var(--admin-bg-base)] text-[var(--admin-text-muted)] border border-[var(--admin-border-subtle)]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {loading ? (
            <TableSkeleton rows={5} cols={5} />
          ) : activeTab === 'cta' ? (
            <div className="space-y-6">
              {/* Top Sections & Buttons Summary Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Clicked Sections */}
                <div className="p-5 rounded-2xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#00A6FF]" />
                      <h4 className="text-sm font-bold text-[var(--admin-text-primary)]">
                        Clicks by Page Section
                      </h4>
                    </div>
                    <span className="text-xs text-[var(--admin-text-muted)]">
                      {ctaData?.topSections?.length || 0} active sections
                    </span>
                  </div>

                  {(!ctaData?.topSections || ctaData.topSections.length === 0) ? (
                    <p className="text-sm text-[var(--admin-text-muted)] py-4 text-center">
                      No section click distribution recorded yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {ctaData.topSections.slice(0, 6).map((sec, idx) => {
                        const total = ctaData.totalClicks || 1
                        const pct = Math.round((sec.clicks / total) * 100)
                        return (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-[var(--admin-text-primary)] truncate max-w-[240px]">
                                {sec.section_name}
                              </span>
                              <span className="font-mono text-[var(--admin-text-secondary)]">
                                {sec.clicks} clicks ({pct}%)
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-[var(--admin-bg-base)] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#00A6FF] to-[#72D669]"
                                style={{ width: `${Math.min(100, Math.max(4, pct))}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Top Clicked Buttons */}
                <div className="p-5 rounded-2xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MousePointerClick className="w-4 h-4 text-[#FF6D00]" />
                      <h4 className="text-sm font-bold text-[var(--admin-text-primary)]">
                        Most Clicked CTA Buttons
                      </h4>
                    </div>
                    <span className="text-xs text-[var(--admin-text-muted)]">
                      {ctaData?.topButtons?.length || 0} tracked CTAs
                    </span>
                  </div>

                  {(!ctaData?.topButtons || ctaData.topButtons.length === 0) ? (
                    <p className="text-sm text-[var(--admin-text-muted)] py-4 text-center">
                      No button click records captured yet.
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {ctaData.topButtons.slice(0, 5).map((btn, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--admin-bg-base)] border border-[var(--admin-border-subtle)]"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-[#FF6D00]/15 text-[#FF6D00] text-[11px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-[var(--admin-text-primary)] truncate">
                              {btn.cta_text}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#FF6D00] shrink-0 ml-2">
                            {btn.clicks} hits
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Filters Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[var(--admin-text-muted)] shrink-0 ml-2" />
                  <input
                    type="text"
                    value={ctaSearch}
                    onChange={(e) => setCtaSearch(e.target.value)}
                    placeholder="Search by CTA text, section, route, or UTM content..."
                    className="w-full bg-transparent text-xs text-[var(--admin-text-primary)] placeholder-[var(--admin-text-muted)] outline-none py-1"
                  />
                  {ctaSearch && (
                    <button
                      onClick={() => setCtaSearch('')}
                      className="text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] mr-2"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Filter className="w-4 h-4 text-[var(--admin-text-muted)] shrink-0" />
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="bg-[var(--admin-bg-base)] border border-[var(--admin-border-base)] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[var(--admin-text-primary)] outline-none cursor-pointer"
                  >
                    <option value="all">All Page Sections</option>
                    {ctaData?.topSections?.map((sec, i) => (
                      <option key={i} value={sec.section_id || sec.section_name}>
                        {sec.section_name} ({sec.clicks})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Real-time Click Telemetry Table */}
              {filteredCtaClicks.length === 0 ? (
                <EmptyState
                  icon={MousePointerClick}
                  title="No CTA clicks recorded matching filters"
                  description="When users click any CTA button across the website, real-time records displaying the page, section, button label, and UTM parameters will populate here."
                />
              ) : (
                <div className="admin-table-wrapper admin-scrollbar">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Origin Page & Route</th>
                        <th>Specific Section</th>
                        <th>CTA Button Clicked</th>
                        <th>UTM Attribution Tags</th>
                        <th>Target Action</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCtaClicks.map((click, idx) => {
                        const { date, time } = formatDate(click.created_at)

                        return (
                          <tr key={click.id || idx} className="group">
                            {/* Page URL */}
                            <td>
                              <div className="flex flex-col">
                                <span className="font-mono text-xs font-bold text-[var(--admin-primary)]">
                                  {click.page_url || '/'}
                                </span>
                                {click.page_title && (
                                  <span className="text-[11px] text-[var(--admin-text-muted)] truncate max-w-xs">
                                    {click.page_title}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Specific Section */}
                            <td>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/20">
                                <Target className="w-3 h-3 shrink-0" />
                                {click.section_name || click.section_id || 'General Section'}
                              </span>
                            </td>

                            {/* CTA Button Text */}
                            <td>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00] shrink-0" />
                                <span className="font-semibold text-xs text-[var(--admin-text-primary)]">
                                  {click.cta_text || 'CTA Button'}
                                </span>
                              </div>
                            </td>

                            {/* UTM Attribution Tags */}
                            <td>
                              <div className="flex flex-wrap gap-1 max-w-xs font-mono text-[10.5px]">
                                {click.utm_campaign && (
                                  <span className="px-1.5 py-0.5 rounded bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-[#00A6FF]">
                                    cmp: {click.utm_campaign}
                                  </span>
                                )}
                                {click.utm_content && (
                                  <span className="px-1.5 py-0.5 rounded bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-[#72D669]">
                                    cnt: {click.utm_content}
                                  </span>
                                )}
                                {click.utm_source && (
                                  <span className="px-1.5 py-0.5 rounded bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-[var(--admin-text-secondary)]">
                                    src: {click.utm_source}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Target Destination */}
                            <td className="text-xs text-[var(--admin-text-secondary)]">
                              <span className="font-mono text-[11px] truncate max-w-[140px] block" title={click.destination_url}>
                                {click.destination_url || 'Modal Action'}
                              </span>
                            </td>

                            {/* Timestamp */}
                            <td className="text-xs text-[var(--admin-text-secondary)] whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[var(--admin-text-dim)]" />
                                <span>{date} {time}</span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : activeTab === 'live' ? (
            <div>
              {(!data?.recentTraffic || data.recentTraffic.length === 0) ? (
                <EmptyState
                  icon={Users}
                  title="No active visitor sessions recorded"
                  description="Real-time visitor logs will stream into this console as users interact with the live website."
                />
              ) : (
                <div className="admin-table-wrapper admin-scrollbar">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Accessed Route</th>
                        <th>User Agent / Device</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentTraffic.map((session, idx) => {
                        const { date, time } = formatDate(session.created_at)

                        return (
                          <tr key={session.id || idx} className="group">
                            <td>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#72D669] shrink-0" />
                                <span className="font-mono text-sm font-bold text-[var(--admin-text-primary)] truncate max-w-md">
                                  {session.path || session.url || '/'}
                                </span>
                              </div>
                            </td>
                            <td className="text-sm text-[var(--admin-text-muted)] truncate max-w-sm">
                              {session.user_agent || 'Standard Desktop Browser'}
                            </td>
                            <td className="text-sm text-[var(--admin-text-secondary)]">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[var(--admin-text-dim)]" />
                                <span>{date} {time}</span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : activeTab === 'pages' ? (
            <div>
              {(!data?.topPages || data.topPages.length === 0) ? (
                <EmptyState
                  icon={LinkIcon}
                  title="No page view analytics available"
                  description="Page rankings will accumulate as incoming traffic lands on your marketing services and blogs."
                />
              ) : (
                <div className="admin-table-wrapper admin-scrollbar">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Target Page Route</th>
                        <th>View Count</th>
                        <th>Traffic Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topPages.map((page, idx) => {
                        const count = Number(page.views || page.count || 0)
                        const total = Number(data.totalPageViews || 1)
                        const percentage = Math.round((count / total) * 100)

                        return (
                          <tr key={idx} className="group">
                            <td>
                              <span className="font-mono text-sm font-bold text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] transition-colors">
                                {page.path || page.url}
                              </span>
                            </td>
                            <td className="text-sm font-bold text-[var(--admin-text-primary)]">
                              {count} views
                            </td>
                            <td>
                              <div className="flex items-center gap-3 w-48">
                                <div className="flex-1 bg-[var(--admin-bg-elevated)] rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="bg-gradient-to-r from-[#00A6FF] to-[#0088DB] h-full rounded-full"
                                    style={{ width: `${Math.min(100, Math.max(5, percentage))}%` }}
                                  />
                                </div>
                                <span className="text-sm font-mono text-[var(--admin-text-muted)] shrink-0">
                                  {percentage}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div>
              {(!data?.sources || data.sources.length === 0) ? (
                <EmptyState
                  icon={Globe}
                  title="No traffic source referrals recorded"
                  description="Direct, organic search, and social referral sources will be mapped here."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.sources.map((src, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] flex items-center justify-center font-bold">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--admin-text-primary)]">{src.source || 'Direct Search'}</p>
                          <p className="text-[13px] text-[var(--admin-text-muted)]">{src.count || 0} visits</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[var(--admin-primary)]">{src.percentage || ''}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SEOAnalytics