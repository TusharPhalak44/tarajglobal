import { Outlet } from 'react-router-dom'
import PremiumNavbar from '@components/layout/PremiumNavbar'
import Footer from '@components/layout/Footer'
import Breadcrumb from '@components/layout/Breadcrumb'
import ChatBot from '@components/chatbot/ChatBot'
import { ScrollProgress } from '@components/animations'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <PremiumNavbar />
      <main className="flex-1">
        <Breadcrumb />
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default MainLayout
