import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookies } from '../cookies/CookieContext'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

// Generate or retrieve a simple session ID for the user's active session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('tg_analytics_session')
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15)
    sessionStorage.setItem('tg_analytics_session', sessionId)
  }
  return sessionId
}

const PageTracker = () => {
  const location = useLocation()
  const { preferences } = useCookies()
  const { user } = useAuth()

  useEffect(() => {
    // Only track if the user has accepted the 'analytics' cookie preference
    if (preferences && preferences.analytics) {
      const trackView = async () => {
        try {
          await api.post('/analytics/track', {
            page_url: window.location.pathname + window.location.search,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            session_id: getSessionId(),
            user_email: user?.email || null
          })
        } catch (error) {
          // Fail silently - we don't want analytics errors to disrupt the user experience
          console.debug('Analytics tracking failed silently')
        }
      }

      trackView()
    }
  }, [location.pathname, location.search, preferences.analytics])

  // This component doesn't render anything visually
  return null
}

export default PageTracker
