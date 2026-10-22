import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

export function AdminRoute({ children }) {
  const { isAuthenticated, user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-muted">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated || (!isAdmin && !user?.role)) {
    return <Navigate to="/loginadmin" replace />
  }

  // Regular user should not access /admin/* routes -> redirect to /user/blogs
  if (user?.role === 'user') {
    return <Navigate to="/user/blogs" replace />
  }

  return children
}

export function UserRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-muted">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/loginadmin" replace />
  }

  return children
}

export function RequireAdminOnly({ children }) {
  const { user } = useAuth()
  if (user?.role === 'user') {
    return <Navigate to="/user/blogs" replace />
  }
  return children
}

export default AdminRoute

