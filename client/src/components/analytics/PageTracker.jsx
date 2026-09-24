import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookies } from '../cookies/CookieContext'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

// Helper to generate or retrieve a unique session ID
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
            session_id: getSessionId()
          })
        } catch (error) {
          // Fail silently to not disrupt UX
          console.debug('Analytics tracking failed:', error)
        }
      }

      trackView()
    }
  }, [location, preferences, user])

  return null // This component doesn't render anything
}

export default PageTracker