import React, { useState, useEffect } from 'react'
import { adminAPI } from '@api/admin.api'
import { BarChart2, Eye, Users, Globe, Link as LinkIcon, Calendar, Clock } from 'lucide-react'

// Helper to format dates safely
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  } catch (e) {
    return dateString
  }
}

const SEOAnalytics = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [days, setDays] = useState(30)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await adminAPI.getTrafficAnalytics({ days })
        if (response.data.success) {
          setData(response.data.data)
        } else {
          setError(response.data.message || 'Failed to fetch analytics data')
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [days])

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg border border-error/20 flex items-center gap-3">
        <div className="flex-1">
          <h3 className="font-semibold">Error Loading Analytics</h3>
          <p className="text-sm opacity-90">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-error text-white rounded hover:bg-error/90 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-primary" />
            SEO & Traffic Analytics
          </h1>
          <p className="text-text-muted mt-1">Monitor your website's traffic performance</p>
        </div>

        <div className="flex items-center gap-2 bg-surface border border-border p-1 rounded-lg">
          <Calendar className="w-5 h-5 text-text-muted ml-2" />
          <select 
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))}
            className="bg-transparent border-none text-text-primary focus:ring-0 text-sm cursor-pointer py-2 pr-8"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Views */}
        <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider">Total Page Views</p>
              <h3 className="text-4xl font-bold text-text-primary mt-1 tracking-tight">
                {data?.overview?.total_views?.toLocaleString() || 0}
              </h3>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 text-primary/5">
            <BarChart2 className="w-32 h-32" />
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-cta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-cta/10 flex items-center justify-center border border-cta/20 shadow-inner">
              <Users className="w-7 h-7 text-cta" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider">Unique Visitors</p>
              <h3 className="text-4xl font-bold text-text-primary mt-1 tracking-tight">
                {data?.overview?.unique_visitors?.toLocaleString() || 0}
              </h3>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 text-cta/5">
            <Users className="w-32 h-32" />
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Pages */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border bg-background/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <LinkIcon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-text-primary">Top Performing Pages</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Page URL</th>
                  <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right w-24">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {data?.top_pages?.length > 0 ? (
                  data.top_pages.map((page, idx) => {
                    const maxViews = data.top_pages[0].views;
                    const widthPercent = Math.max((page.views / maxViews) * 100, 2);
                    return (
                      <tr key={idx} className="hover:bg-background/30 transition-colors group">
                        <td className="p-4 relative">
                          <div className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all duration-500" style={{ width: `${widthPercent}%` }}></div>
                          <div className="text-sm font-medium text-text-primary truncate max-w-[250px] sm:max-w-[350px] flex items-center gap-2">
                            <span className="text-text-muted font-normal text-xs">{idx + 1}.</span> {page.page_url}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold bg-primary/10 text-primary rounded-lg border border-primary/20">
                            {page.views.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="p-12 text-center text-text-muted text-sm">
                      <Globe className="w-8 h-8 mx-auto mb-3 text-border" />
                      No page views recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border bg-background/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cta/10 rounded-lg">
                <Globe className="w-4 h-4 text-cta" />
              </div>
              <h3 className="font-bold text-text-primary">Traffic Sources</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Source URL</th>
                  <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right w-24">Visits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {data?.traffic_sources?.length > 0 ? (
                  data.traffic_sources.map((source, idx) => {
                    const maxVisits = data.traffic_sources[0].views;
                    const widthPercent = Math.max((source.views / maxVisits) * 100, 2);
                    return (
                      <tr key={idx} className="hover:bg-background/30 transition-colors">
                        <td className="p-4 relative">
                          <div className="absolute bottom-0 left-0 h-1 bg-cta/20 transition-all duration-500" style={{ width: `${widthPercent}%` }}></div>
                          <div className="text-sm font-medium text-text-primary flex items-center gap-2">
                             <span className="text-text-muted font-normal text-xs">{idx + 1}.</span> {source.source}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold bg-cta/10 text-cta rounded-lg border border-cta/20">
                            {source.views.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="p-12 text-center text-text-muted text-sm">
                      <Globe className="w-8 h-8 mx-auto mb-3 text-border" />
                      No traffic sources recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden mt-6 shadow-sm">
        <div className="p-5 border-b border-border bg-background/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-info/10 rounded-lg">
              <Clock className="w-4 h-4 text-info" />
            </div>
            <h3 className="font-bold text-text-primary">Live Visitor Log</h3>
          </div>
          <span className="text-xs font-semibold text-info bg-info/10 border border-info/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-info animate-pulse"></span>
            Last 10 Visits
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">IP Address</th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">User Identity</th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Page Visited</th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Time of Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data?.recent_visitors?.length > 0 ? (
                data.recent_visitors.map((visitor, idx) => (
                  <tr key={idx} className="hover:bg-background/30 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm font-medium text-text-primary bg-background border border-border px-2.5 py-1 rounded-md">
                        {visitor.ip_address || 'Unknown'}
                      </span>
                    </td>
                    <td className="p-4">
                      {visitor.user_email ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-cta/10 flex items-center justify-center text-cta text-xs font-bold">
                            {visitor.user_email.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold text-cta">{visitor.user_email}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-text-muted italic flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-text-secondary">
                            <Users className="w-3 h-3" />
                          </div>
                          Anonymous
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                        {visitor.page_url}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-medium text-text-secondary">
                        {formatDate(visitor.created_at)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-text-muted text-sm">
                    <Clock className="w-8 h-8 mx-auto mb-3 text-border" />
                    No recent visitors recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default SEOAnalytics
