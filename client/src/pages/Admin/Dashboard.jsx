import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Briefcase, 
  Users, 
  Image, 
  Plus, 
  TrendingUp, 
  Eye, 
  Clock, 
  Building, 
  Sparkles,
  ArrowUpRight,
  Globe,
  ShieldCheck,
  BarChart3,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { adminAPI } from '@api'
import { useAuth } from '@context/AuthContext'
import StatCard from '@components/admin/StatCard'
import StatusBadge from '@components/admin/StatusBadge'
import { DashboardSkeleton } from '@components/admin/LoadingSkeleton'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [timeGreeting, setTimeGreeting] = useState('Good morning')

  useEffect(() => {
    fetchDashboardData()
    updateGreeting()
  }, [])

  const updateGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeGreeting('Good morning')
    else if (hour < 18) setTimeGreeting('Good afternoon')
    else setTimeGreeting('Good evening')
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAnalyticsDashboard()
      setData(response.data?.data || response.data || null)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  const blogTrendData = data?.blog_trend || []
  const applicationTrendData = data?.application_trend || []
  const totalPublished = blogTrendData.reduce((sum, item) => sum + (item.count || 0), 0)
  const totalAppsCount = applicationTrendData.reduce((sum, item) => sum + (item.count || 0), 0)

  // Merge trends for clean dual-curve visualization
  const dateMap = new Map()
  blogTrendData.forEach(item => {
    const key = item.date ? item.date.split('T')[0] : 'Unknown'
    dateMap.set(key, { date: key, blogs: item.count || 0, applications: 0 })
  })
  applicationTrendData.forEach(item => {
    const key = item.date ? item.date.split('T')[0] : 'Unknown'
    if (dateMap.has(key)) {
      dateMap.get(key).applications = item.count || 0
    } else {
      dateMap.set(key, { date: key, blogs: 0, applications: item.count || 0 })
    }
  })
  const chartData = Array.from(dateMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date))

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date())

  return (
    <div className="space-y-6">
      {/* 1. Welcome & Primary Action Banner */}
      <div className="admin-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-[var(--admin-bg-surface)] via-[var(--admin-bg-card)] to-[var(--admin-bg-surface)] border-[var(--admin-border-base)]">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-[var(--admin-primary-soft)] to-transparent pointer-events-none opacity-40" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--admin-primary)] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Operations & Revenue Intelligence</span>
              <span className="text-[var(--admin-text-dim)]">•</span>
              <span className="text-[var(--admin-text-secondary)]">{todayFormatted}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--admin-text-primary)] tracking-tight">
              {timeGreeting}, {user?.name || 'Administrator'}
            </h1>
            
            <p className="text-sm text-[var(--admin-text-secondary)] max-w-xl leading-relaxed">
              Platform metrics are optimal. Track your content publishing velocity, inbound enterprise leads, and talent recruitment pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => navigate('/admin/blogs/create')}
              className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/20"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </button>
            <button
              onClick={() => navigate('/admin/leads')}
              className="admin-btn admin-btn-secondary"
            >
              <Building className="w-4 h-4 text-[#FF6D00]" />
              <span>Review Leads</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={FileText}
          label="Total Content Articles"
          value={data?.blogs?.total_blogs || 0}
          change={12}
          changeLabel="published"
          accentColor="cyan"
          onClick={() => navigate('/admin/blogs')}
        />
        <StatCard
          icon={Briefcase}
          label="Active Career Openings"
          value={data?.jobs?.active_jobs || data?.jobs?.current_jobs || 0}
          change={8}
          changeLabel="active requisitions"
          accentColor="orange"
          onClick={() => navigate('/admin/jobs')}
        />
        <StatCard
          icon={Users}
          label="Candidate Applications"
          value={data?.applications?.total_applications || 0}
          change={24}
          changeLabel="in talent funnel"
          accentColor="green"
          onClick={() => navigate('/admin/applications')}
        />
        <StatCard
          icon={Image}
          label="Digital Media Assets"
          value={data?.content?.total_media || 0}
          accentColor="purple"
          subtitle="Cloud CDN active"
          onClick={() => navigate('/admin/media')}
        />
      </div>

      {/* 3. Dual Interactive Chart Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Publishing Velocity */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A6FF]/10 border border-[#00A6FF]/20 flex items-center justify-center text-[#00A6FF]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                  Content Publishing Velocity
                </h3>
                <p className="text-xs text-[var(--admin-text-muted)]">Rolling 30-day article volume</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#00A6FF]">{totalPublished}</span>
              <span className="block text-[10px] uppercase font-bold text-[var(--admin-text-muted)]">Articles</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={blogTrendData}>
                <defs>
                  <linearGradient id="modernBlogGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A6FF" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#00A6FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--admin-text-dim)" 
                  tick={{ fill: 'var(--admin-text-muted)', fontSize: 11 }}
                  tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  stroke="var(--admin-text-dim)" 
                  tick={{ fill: 'var(--admin-text-muted)', fontSize: 11 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-bg-surface)', 
                    borderColor: 'var(--admin-border-base)',
                    borderRadius: '10px',
                    color: 'var(--admin-text-primary)',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#00A6FF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  name="Articles Published"
                  stroke="#00A6FF" 
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#modernBlogGrad)"
                  dot={{ fill: '#00A6FF', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#00A6FF', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Talent Application Volume */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6D00]/10 border border-[#FF6D00]/20 flex items-center justify-center text-[#FF6D00]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                  Talent Application Volume
                </h3>
                <p className="text-xs text-[var(--admin-text-muted)]">Candidate submission tracking</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#FF6D00]">{totalAppsCount}</span>
              <span className="block text-[10px] uppercase font-bold text-[var(--admin-text-muted)]">Candidates</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTrendData}>
                <defs>
                  <linearGradient id="modernAppGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6D00" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#FF6D00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--admin-text-dim)" 
                  tick={{ fill: 'var(--admin-text-muted)', fontSize: 11 }}
                  tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  stroke="var(--admin-text-dim)" 
                  tick={{ fill: 'var(--admin-text-muted)', fontSize: 11 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-bg-surface)', 
                    borderColor: 'var(--admin-border-base)',
                    borderRadius: '10px',
                    color: 'var(--admin-text-primary)',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#FF6D00' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  name="Applications"
                  stroke="#FF6D00" 
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#modernAppGrad)"
                  dot={{ fill: '#FF6D00', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#FF6D00', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Terminal Strip */}
      <div className="admin-card p-6">
        <h3 className="text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--admin-primary)]" />
          <span>Quick Workspace Shortcuts</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            to="/admin/blogs/create"
            className="p-3.5 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] hover:border-[var(--admin-primary)] hover:bg-[var(--admin-primary-soft)] transition-all text-center group"
          >
            <FileText className="w-5 h-5 mx-auto mb-2 text-[var(--admin-primary)] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">Publish Blog</span>
          </Link>

          <Link
            to="/admin/jobs"
            className="p-3.5 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] hover:border-[#FF6D00] hover:bg-[#FF6D00]/10 transition-all text-center group"
          >
            <Briefcase className="w-5 h-5 mx-auto mb-2 text-[#FF6D00] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">Post New Job</span>
          </Link>

          <Link
            to="/admin/leads"
            className="p-3.5 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] hover:border-[#10B981] hover:bg-[#10B981]/10 transition-all text-center group"
          >
            <Building className="w-5 h-5 mx-auto mb-2 text-[#10B981] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">Inbound CRM</span>
          </Link>

          <Link
            to="/admin/media"
            className="p-3.5 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] hover:border-purple-400 hover:bg-purple-500/10 transition-all text-center group"
          >
            <Image className="w-5 h-5 mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">Upload Media</span>
          </Link>

          <Link
            to="/admin/seo"
            className="p-3.5 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] hover:border-[#F59E0B] hover:bg-[#F59E0B]/10 transition-all text-center group"
          >
            <Globe className="w-5 h-5 mx-auto mb-2 text-[#F59E0B] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">SEO Diagnostics</span>
          </Link>

          <Link
            to="/admin/users"
            className="p-3.5 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] hover:border-cyan-400 hover:bg-cyan-500/10 transition-all text-center group"
          >
            <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[var(--admin-text-primary)] block">Team & Access</span>
          </Link>
        </div>
      </div>

      {/* 5. Real-Time Activity Trail & Top Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Platform Activity */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--admin-primary-soft)] flex items-center justify-center text-[var(--admin-primary)]">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                Live Audit & Activity Trail
              </h3>
            </div>
            <Link to="/admin/audit-logs" className="text-xs font-semibold text-[var(--admin-primary)] hover:underline flex items-center gap-1">
              Full Logs <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {(!data?.recent_activity || data.recent_activity.length === 0) ? (
              <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">No recent activity logged</p>
            ) : (
              data.recent_activity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                  <span className="w-2 h-2 mt-1.5 rounded-full bg-[var(--admin-primary)] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--admin-text-primary)] leading-snug">
                      {activity.action}
                    </p>
                    <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">
                      {activity.user_name || 'System Operator'} • {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Performing Articles */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--admin-success-soft)] flex items-center justify-center text-[var(--admin-success)]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                Top Performing Articles
              </h3>
            </div>
            <Link to="/admin/blogs" className="text-xs font-semibold text-[var(--admin-success)] hover:underline flex items-center gap-1">
              Manage Content <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {(!data?.popular_blogs || data.popular_blogs.length === 0) ? (
              <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">No blog engagement data available</p>
            ) : (
              data.popular_blogs.map((blog) => (
                <div key={blog.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] hover:border-[var(--admin-border-hover)] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[var(--admin-text-primary)] truncate">
                      {blog.title}
                    </p>
                    <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5 flex items-center gap-2">
                      <span>Article #{blog.id}</span>
                      <span>•</span>
                      <span>Published Live</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--admin-success-soft)] text-[#10B981] text-xs font-bold shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{blog.view_count || 0}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
