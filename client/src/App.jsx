import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { CookieProvider } from './components/cookies/CookieContext'
import CookieBanner from './components/cookies/CookieBanner'
import CookieModal from './components/cookies/CookieModal'
import { SmoothScrollProvider } from './components/animations/SmoothScrollProvider'
import ScrollToTop from './components/common/ScrollToTop'
import PageTracker from './components/analytics/PageTracker'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <CookieProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <PageTracker />
              <SmoothScrollProvider>
                <AppRoutes />
                <CookieBanner />
                <CookieModal />
              </SmoothScrollProvider>
            </BrowserRouter>
          </CookieProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
