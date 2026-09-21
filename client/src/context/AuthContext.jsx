import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '@api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const isAuthorizedRole = (role) => {
    if (!role) return false
    const validRoles = ['super_admin', 'admin', 'editor', 'hr_recruiter', 'content_manager', 'user']
    return validRoles.includes(role) || role !== 'guest'
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}')
        setUser(userData)
        setIsAuthenticated(true)
        setIsAdmin(isAuthorizedRole(userData.role))
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { token, refreshToken, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      setIsAuthenticated(true)
      setIsAdmin(isAuthorizedRole(user.role))

      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setIsAuthenticated(false)
      setIsAdmin(false)
    }
  }

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
