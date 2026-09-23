import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

function AdminRoute({ children }) {
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

  return children
}

export default AdminRoute
