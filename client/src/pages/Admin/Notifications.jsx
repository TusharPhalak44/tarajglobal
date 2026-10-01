import React, { useEffect, useState } from 'react'
import { 
  Bell, 
  Check, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Info, 
  X,
  Sparkles,
  CheckCheck
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Notifications = () => {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchNotifications()
  }, [filter])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getNotifications({ unread_only: filter === 'unread' })
      setNotifications(response.data?.data?.notifications || response.data?.data || response.data || [])
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await adminAPI.markNotificationRead(id)
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n))
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await adminAPI.markAllNotificationsRead()
      setNotifications(notifications.map(n => ({ ...n, is_read: true })))
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteNotification(id)
      setNotifications(notifications.filter(n => n.id !== id))
    } catch (error) {
      console.error('Failed to delete notification:', error)
    }
  }

  const getNotificationIcon = (type) => {
    const icons = {
      info: Info,
      success: CheckCircle,
      warning: AlertCircle,
      error: AlertCircle
    }
    const Icon = icons[type] || Bell
    const colors = {
      info: 'text-[#00A6FF] bg-[#00A6FF]/10 border-[#00A6FF]/20',
      success: 'text-[#72D669] bg-[#72D669]/10 border-[#72D669]/20',
      warning: 'text-[#FFA600] bg-[#FFA600]/10 border-[#FFA600]/20',
      error: 'text-[#F43F5E] bg-[#F43F5E]/10 border-[#F43F5E]/20'
    }
    return { Icon, colorClass: colors[type] || 'text-[#00A6FF] bg-[#00A6FF]/10 border-[#00A6FF]/20' }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <PageHeader
        title="Notification Feed"
        subtitle="Platform operational notices, candidate intake alerts, and lead assignment pings."
        breadcrumbs={[{ label: 'Notifications' }]}
        onRefresh={fetchNotifications}
        isRefreshing={loading}
        actions={
          unreadCount > 0 ? (
            <button
              onClick={handleMarkAllAsRead}
              className="admin-btn admin-btn-primary text-sm shadow-md shadow-[#00A6FF]/20"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Read</span>
            </button>
          ) : null
        }
      />

      {/* Filter Tabs */}
      <div className="admin-card p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
              filter === 'all'
                ? 'bg-[var(--admin-primary)] text-white'
                : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
            }`}
          >
            All Notices ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
              filter === 'unread'
                ? 'bg-[var(--admin-primary)] text-white'
                : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#FF6D00]" />
            )}
          </button>
        </div>

        <span className="text-sm text-[var(--admin-text-muted)]">
          {unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
        </span>
      </div>

      {/* Notifications List */}
      {loading ? (
        <TableSkeleton rows={5} cols={3} />
      ) : notifications.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={Bell}
            title="All notifications cleared"
            description="You have no pending unread notifications in your active queue."
          />
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const { Icon, colorClass } = getNotificationIcon(n.type)

            return (
              <div
                key={n.id}
                className={`admin-card p-4 transition-all flex items-start justify-between gap-4 ${
                  !n.is_read 
                    ? 'border-l-4 border-l-[#00A6FF] bg-[var(--admin-bg-card)]' 
                    : 'opacity-85'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-5 h-5 rounded-xl border flex items-center justify-center shrink-0 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-[var(--admin-text-primary)] truncate">
                        {n.title || n.action || 'System Notification'}
                      </h4>
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-[#00A6FF] shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-[var(--admin-text-secondary)] mt-1 leading-relaxed">
                      {n.message || n.details}
                    </p>
                    <span className="text-[12px] text-[var(--admin-text-dim)] mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(n.created_at || Date.now()).toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {!n.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(n.id)}
                      className="shrink-0 p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[#72D669] hover:bg-[#72D669]/10 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="shrink-0 p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors"
                    title="Dismiss"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Notifications
