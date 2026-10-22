import { Outlet, useLocation } from 'react-router-dom'
import PremiumNavbar from '@components/layout/PremiumNavbar'
import Footer from '@components/layout/Footer'
import Breadcrumb from '@components/layout/Breadcrumb'
// import ChatBot from '@components/chatbot/ChatBot' // Temporarily disabled
import { ScrollProgress } from '@components/animations'
import { GrowthMeter, NextFix, RecoveryTracker } from '@components/recovery/Recovery'
import { FIXES } from '@context/RecoveryContext'

function MainLayout() {
  const { pathname } = useLocation()
  const isAboutPage = pathname === '/about' || pathname === '/who-we-are'
  const showNextFix = !isAboutPage && (Boolean(FIXES[pathname]) || pathname === '/services')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <PremiumNavbar />
      <RecoveryTracker />
      <main className="flex-1">
        <Breadcrumb />
        <Outlet />
        {showNextFix && <NextFix />}
      </main>
      <Footer />
      {/* ChatBot temporarily disabled */}
      {/* <ChatBot /> */}
    </div>
  )
}

export default MainLayout
