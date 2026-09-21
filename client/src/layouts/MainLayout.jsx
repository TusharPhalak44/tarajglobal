import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import PremiumNavbar from '@components/layout/PremiumNavbar'
import Footer from '@components/layout/Footer'
import Breadcrumb from '@components/layout/Breadcrumb'
import ChatBot from '@components/chatbot/ChatBot'
import { ScrollProgress } from '@components/animations'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <PremiumNavbar />
      <main className="flex-1">
        <Breadcrumb />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default MainLayout
