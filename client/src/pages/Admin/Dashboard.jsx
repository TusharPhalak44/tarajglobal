import React, { useEffect, useState } from 'react'
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  Image, 
  FolderOpen, 
  User,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { adminAPI } from '@api'

const StatCard = ({ icon: Icon, label, value, change, color }) => (
  <div className="bg-surface rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {change && (
        <span className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-error'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <p className="text-text-secondary text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold text-text-primary">{value}</p>
  </div>
)

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAnalyticsDashboard()
      console.log('Dashboard response:', response.data)
      setData(response.data?.data || response.data || null)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-muted">Loading dashboard...</div>
      </div>
    )
  }

  const blogTrendData = data?.blog_trend || []
  const applicationTrendData = data?.application_trend || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
        <p className="text-text-secondary">Welcome back! Here's what's happening with your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FileText}
          label="Total Blogs"
          value={data?.blogs?.total_blogs || 0}
          change={12}
          color="bg-primary"
        />
        <StatCard 
          icon={Briefcase}
          label="Active Jobs"
          value={data?.jobs?.active_jobs || 0}
          change={8}
          color="bg-cta"
        />
        <StatCard 
          icon={Users}
          label="Applications"
          value={data?.applications?.total_applications || 0}
          change={24}
          color="bg-success"
        />
        <StatCard 
          icon={Image}
          label="Media Files"
          value={data?.content?.total_media || 0}
          color="bg-info"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blog Stats */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Blog Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Published</p>
              <p className="text-2xl font-bold text-text-primary">{data?.blogs?.published_blogs || 0}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Drafts</p>
              <p className="text-2xl font-bold text-text-primary">{data?.blogs?.draft_blogs || 0}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-text-primary">{data?.blogs?.scheduled_blogs || 0}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Total Views</p>
              <p className="text-2xl font-bold text-text-primary">{data?.blogs?.total_views || 0}</p>
            </div>
          </div>
        </div>

        {/* Job Stats */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cta" />
            Job Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Total Jobs</p>
              <p className="text-2xl font-bold text-text-primary">{data?.jobs?.total_jobs || 0}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Draft</p>
              <p className="text-2xl font-bold text-text-primary">{data?.jobs?.draft_jobs || 0}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Current</p>
              <p className="text-2xl font-bold text-text-primary">{data?.jobs?.current_jobs || 0}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">New Applications</p>
              <p className="text-2xl font-bold text-text-primary">{data?.applications?.new_applications || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blog Trends */}
        <div className="bg-gradient-to-br from-surface to-surface/50 rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Blog Publishing Trend</h3>
                <p className="text-xs text-text-muted">Last 30 days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{blogTrendData.reduce((sum, item) => sum + (item.count || 0), 0)}</p>
              <p className="text-xs text-text-muted">Total Published</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={blogTrendData}>
              <defs>
                <linearGradient id="colorBlog" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A6FF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00A6FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B" 
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="#64748B" 
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                itemStyle={{ color: '#E2E8F0' }}
                labelStyle={{ color: '#94A3B8' }}
                formatter={(value) => [value, 'Blogs']}
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#00A6FF" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorBlog)"
                dot={{ fill: '#00A6FF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#00A6FF', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Application Trends */}
        <div className="bg-gradient-to-br from-surface to-surface/50 rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cta/20 rounded-lg">
                <Users className="w-5 h-5 text-cta" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Application Trend</h3>
                <p className="text-xs text-text-muted">Last 30 days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-cta">{applicationTrendData.reduce((sum, item) => sum + (item.count || 0), 0)}</p>
              <p className="text-xs text-text-muted">Total Applications</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={applicationTrendData}>
              <defs>
                <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6D00" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#FF6D00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B" 
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="#64748B" 
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                itemStyle={{ color: '#E2E8F0' }}
                labelStyle={{ color: '#94A3B8' }}
                formatter={(value) => [value, 'Applications']}
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#FF6D00" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorApp)"
                dot={{ fill: '#FF6D00', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#FF6D00', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Popular Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-info" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {data?.recent_activity?.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">{activity.action}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {activity.user_name} • {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Blogs */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Popular Blogs
          </h3>
          <div className="space-y-3">
            {data?.popular_blogs?.map((blog) => (
              <div key={blog.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{blog.title}</p>
                  <p className="text-xs text-text-muted">{blog.view_count} views</p>
                </div>
                <span className="text-success text-sm font-medium">{blog.view_count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
