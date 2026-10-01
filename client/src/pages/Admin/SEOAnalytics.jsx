import React, { useState, useEffect } from 'react'
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
  Compass
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [days, setDays] = useState(30)
  const [activeTab, setActiveTab] = useState('live')

  const fetchTrafficData = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getTrafficAnalytics({ days })
      if (response.data.success) {
        setData(response.data.data)
      } else {
        setError(response.data.message || 'Failed to fetch')
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
    { id: 'live', label: 'Realtime Visitors', icon: Users },
    { id: 'pages', label: 'Top Performing URLs', icon: LinkIcon },
    { id: 'sources', label: 'Referral Sources', icon: Globe }
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="SEO & Visitor Traffic Telemetry"
        subtitle="Real-time website traffic intelligence, page views distribution, and referral channel acquisition."
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
          icon={Eye}
          label="Total Page Views"
          value={data?.totalPageViews || 0}
          accentColor="cyan"
          subtitle={`Over last ${days} days`}
        />
        <StatCard
          icon={Users}
          label="Unique Visitors"
          value={data?.uniqueVisitors || 0}
          accentColor="orange"
          subtitle="Distinct IP sessions"
        />
        <StatCard
          icon={Activity}
          label="Active Live Sessions"
          value={data?.recentTraffic?.length || 0}
          accentColor="green"
          subtitle="Real-time web activity"
        />
        <StatCard
          icon={Globe}
          label="Tracked URLs"
          value={data?.topPages?.length || 0}
          accentColor="purple"
          subtitle="Indexed routes"
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
                className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'border-[#00A6FF] text-[#00A6FF]'
                    : 'border-transparent text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {loading ? (
            <TableSkeleton rows={5} cols={4} />
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
                                <span className="w-2 h-2 rounded-full bg-[#72D669] shrink-0 animate-ping" />
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