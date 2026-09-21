import React, { useEffect, useState } from 'react'
import { Bell, Check, Trash2, CheckCircle, Clock, AlertCircle, Info, X } from 'lucide-react'
import { adminAPI } from '@api'

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
      info: 'text-blue-400',
      success: 'text-green-400',
      warning: 'text-yellow-400',
      error: 'text-red-400'
    }
    return { Icon, color: colors[type] || 'text-primary' }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading notifications...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Notifications</h1>
          <p className="text-text-secondary">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Check className="w-5 h-5" />
            Mark All as Read
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-surface text-text-primary hover:bg-surface/80'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg transition-colors ${filter === 'unread' ? 'bg-primary text-white' : 'bg-surface text-text-primary hover:bg-surface/80'}`}
        >
          Unread
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-12 text-center">
            <Bell className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-2">No notifications</p>
            <p className="text-text-muted text-sm">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const { Icon, color } = getNotificationIcon(notification.type)
            return (
              <div
                key={notification.id}
                className={`bg-surface rounded-xl border ${!notification.is_read ? 'border-primary/50 bg-primary/5' : 'border-border'} p-6 transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${notification.is_read ? 'bg-surface' : 'bg-primary/20'}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className={`font-semibold ${!notification.is_read ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {!notification.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1.5 text-text-muted hover:text-primary rounded-lg hover:bg-surface/80 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="p-1.5 text-text-muted hover:text-error rounded-lg hover:bg-error/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm mb-3">{notification.message}</p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(notification.created_at).toLocaleString()}
                      </div>
                      {notification.link && (
                        <a href={notification.link} className="text-primary hover:underline">
                          View →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Notifications
