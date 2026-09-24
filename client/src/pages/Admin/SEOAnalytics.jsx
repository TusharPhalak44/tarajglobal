import React, { useState, useEffect } from 'react'
import { adminAPI } from '@api/admin.api'
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
    Search
} from 'lucide-react'

// Helper to format dates safely
const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
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

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-border/40 rounded-md ${className}`}></div>
)

const SEOAnalytics = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [days, setDays] = useState(30)
    const [activeTab, setActiveTab] = useState('live')

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData()
    }, [days])

    if (error) {
        return (
            <div className="p-6 bg-error/10 border border-error/20 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-error mb-1">Analytics Error</h3>
                    <p className="text-sm text-error/80">{error}</p>
                </div>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-error text-white text-sm font-medium rounded-lg hover:bg-error/90 transition-all">
                    Retry Connection
                </button>
            </div>
        )
    }

    const tabs = [
        { id: 'live', label: 'Live Visitors', icon: Users },
        { id: 'overview', label: 'Overview Metrics', icon: Activity },
        { id: 'pages', label: 'Top Pages', icon: LinkIcon },
        { id: 'sources', label: 'Traffic Sources', icon: Globe }
    ]

    return (
        <div className="space-y-6 max-w-[90rem] mx-auto">
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary mb-1">Traffic Analytics</h1>
                    <p className="text-sm text-text-secondary">Analyze your website's performance and real-time visitor activity.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-surface border border-border p-1 rounded-lg shadow-sm">
                    <div className="pl-2 pr-1">
                        <Calendar className="w-4 h-4 text-text-muted" />
                    </div>
                    <select
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="bg-surface text-text-primary border-none focus:ring-0 text-sm font-medium py-1.5 pl-1 pr-8 outline-none cursor-pointer"
                    >
                        <option value={7}>Last 7 Days</option>
                        <option value={30}>Last 30 Days</option>
                        <option value={90}>Last 90 Days</option>
                    </select>
                </div>
            </div>

            {/* Unified Main Data Container */}
            <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                
                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto border-b border-border hide-scrollbar bg-background/30">
                    {tabs.map(tab => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors relative whitespace-nowrap ${
                                    isActive ? 'text-primary bg-surface' : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
                                {tab.label}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></div>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 bg-surface">
                    
                    {/* Live Visitors Tab - Professional Enterprise Table */}
                    {activeTab === 'live' && (
                        <div className="animate-in fade-in duration-200">
                            
                            {/* Table Toolbar */}
                            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface">
                                <h3 className="text-base font-semibold text-text-primary">Real-time Visitor Log</h3>
                                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Live Sync
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-background/50 border-b border-border">
                                        <tr>

                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap w-[20%]">Network / IP</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap w-[35%]">Endpoint Visited</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap w-[20%] text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {loading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <tr key={i}>

                                                    <td className="py-4 px-6"><Skeleton className="h-6 w-32" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-6 w-56" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-8 w-24 ml-auto" /></td>
                                                </tr>
                                            ))
                                        ) : data?.recent_visitors?.length > 0 ? (
                                            data.recent_visitors.map((visitor, idx) => {
                                                const timeObj = formatDate(visitor.created_at)
                                                return (
                                                    <tr key={idx} className="hover:bg-background/40 transition-colors group">

                                                        
                                                        {/* Network / IP */}
                                                        <td className="py-3 px-6">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-3.5 h-3.5 text-text-muted" />
                                                                <span className="text-sm font-mono text-text-secondary">
                                                                    {visitor.ip_address || 'Unknown'}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        
                                                        {/* Endpoint Visited */}
                                                        <td className="py-3 px-6">
                                                            <div className="flex items-center gap-2 max-w-[300px]">
                                                                <MonitorSmartphone className="w-4 h-4 text-text-muted flex-shrink-0" />
                                                                <span className="text-sm font-medium text-text-primary truncate" title={visitor.page_url}>
                                                                    {visitor.page_url === '/' ? 'Home' : visitor.page_url.replace(/^\//, '')}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        
                                                        {/* Timestamp */}
                                                        <td className="py-3 px-6 text-right">
                                                            <div className="flex flex-col items-end">
                                                                <span className="text-sm font-medium text-text-primary">
                                                                    {timeObj.time}
                                                                </span>
                                                                <span className="text-xs text-text-muted">
                                                                    {timeObj.date}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="py-12 text-center">
                                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border mb-3">
                                                        <Activity className="w-5 h-5 text-text-muted" />
                                                    </div>
                                                    <p className="text-sm font-medium text-text-primary">No live traffic data</p>
                                                    <p className="text-xs text-text-muted mt-1">Visitors will appear here when active.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Top Pages Tab - Professional Enterprise Table */}
                    {activeTab === 'pages' && (
                        <div className="animate-in fade-in duration-200">
                            
                            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface">
                                <h3 className="text-base font-semibold text-text-primary">Highest Performing Content</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-background/50 border-b border-border">
                                        <tr>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider w-16">Rank</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Page URL</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider w-[40%] hidden md:table-cell">Traffic Share</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Total Views</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {loading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <tr key={i}>
                                                    <td className="py-4 px-6"><Skeleton className="h-5 w-5" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-5 w-48" /></td>
                                                    <td className="py-4 px-6 hidden md:table-cell"><Skeleton className="h-2 w-full" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-6 w-16 ml-auto" /></td>
                                                </tr>
                                            ))
                                        ) : data?.top_pages?.length > 0 ? (
                                            data.top_pages.map((page, idx) => {
                                                const max = data.top_pages[0].views
                                                const pct = Math.max((page.views / max) * 100, 1)
                                                return (
                                                    <tr key={idx} className="hover:bg-background/40 transition-colors">
                                                        <td className="py-3 px-6">
                                                            <span className="text-sm font-medium text-text-muted">{idx + 1}</span>
                                                        </td>
                                                        <td className="py-3 px-6">
                                                            <div className="flex items-center gap-2 max-w-[400px]">
                                                                <LinkIcon className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                                                                <span className="text-sm font-medium text-text-primary truncate" title={page.page_url}>
                                                                    {page.page_url === '/' ? 'Home' : page.page_url.replace(/^\//, '')}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 hidden md:table-cell">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-full bg-border/50 rounded-full h-1.5 overflow-hidden">
                                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                                                                </div>
                                                                <span className="text-xs text-text-muted w-10 text-right">{Math.round(pct)}%</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-right">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background border border-border text-sm font-semibold text-text-primary">
                                                                {page.views.toLocaleString()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="py-12 text-center">
                                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border mb-3">
                                                        <LinkIcon className="w-5 h-5 text-text-muted" />
                                                    </div>
                                                    <p className="text-sm font-medium text-text-primary">No page views recorded</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Traffic Sources Tab - Professional Enterprise Table */}
                    {activeTab === 'sources' && (
                        <div className="animate-in fade-in duration-200">
                            
                            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface">
                                <h3 className="text-base font-semibold text-text-primary">Audience Acquisition Sources</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-background/50 border-b border-border">
                                        <tr>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider w-16">Rank</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Source Domain</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider w-[40%] hidden md:table-cell">Traffic Share</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Referrals</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {loading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <tr key={i}>
                                                    <td className="py-4 px-6"><Skeleton className="h-5 w-5" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-5 w-48" /></td>
                                                    <td className="py-4 px-6 hidden md:table-cell"><Skeleton className="h-2 w-full" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-6 w-16 ml-auto" /></td>
                                                </tr>
                                            ))
                                        ) : data?.traffic_sources?.length > 0 ? (
                                            data.traffic_sources.map((source, idx) => {
                                                const max = data.traffic_sources[0].views
                                                const pct = Math.max((source.views / max) * 100, 1)
                                                return (
                                                    <tr key={idx} className="hover:bg-background/40 transition-colors">
                                                        <td className="py-3 px-6">
                                                            <span className="text-sm font-medium text-text-muted">{idx + 1}</span>
                                                        </td>
                                                        <td className="py-3 px-6">
                                                            <div className="flex items-center gap-2 max-w-[400px]">
                                                                <Globe className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                                                                <span className="text-sm font-medium text-text-primary capitalize truncate" title={source.source}>
                                                                    {source.source.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 hidden md:table-cell">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-full bg-border/50 rounded-full h-1.5 overflow-hidden">
                                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                                                                </div>
                                                                <span className="text-xs text-text-muted w-10 text-right">{Math.round(pct)}%</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-right">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background border border-border text-sm font-semibold text-text-primary">
                                                                {source.views.toLocaleString()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="py-12 text-center">
                                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border mb-3">
                                                        <Globe className="w-5 h-5 text-text-muted" />
                                                    </div>
                                                    <p className="text-sm font-medium text-text-primary">No traffic sources identified</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Overview Metrics Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 animate-in fade-in duration-200">
                            
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Total Page Views</h3>
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Eye className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                                <div>
                                    {loading ? (
                                        <Skeleton className="h-10 w-32" />
                                    ) : (
                                        <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                                            {data?.overview?.total_views?.toLocaleString() || 0}
                                        </h2>
                                    )}
                                    <p className="text-sm text-text-muted mt-1">Total accumulated views for the selected period.</p>
                                </div>
                            </div>

                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Total Active Sessions</h3>
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                                <div>
                                    {loading ? (
                                        <Skeleton className="h-10 w-32" />
                                    ) : (
                                        <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                                            {data?.overview?.unique_visitors?.toLocaleString() || 0}
                                        </h2>
                                    )}
                                    <p className="text-sm text-text-muted mt-1">Total distinct user sessions identified in the selected period.</p>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default SEOAnalytics