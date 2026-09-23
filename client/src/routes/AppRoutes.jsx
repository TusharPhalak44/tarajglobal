import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout'
import AdminLayout from '@layouts/AdminLayout'
import AuthLayout from '@layouts/AuthLayout'
import AdminRoute from '@routes/AdminRoute'

// Pages
import Home from '@pages/Home'
import About from '@pages/About'
import Services from '@pages/Services'
import ServiceDetails from '@pages/ServiceDetails'
import Blog from '@pages/Blog'
import BlogDetails from '@pages/BlogDetails'
import Careers from '@pages/Careers'
import Contact from '@pages/Contact'
import ContentSyndication from '@pages/ContentSyndication'
import BantLeadGeneration from '@pages/BantLeadGeneration'
import MqlServices from '@pages/MqlServices'
import HqlServices from '@pages/HqlServices'
import SqlServices from '@pages/SqlServices'
import B2bAppointmentSetting from '@pages/B2bAppointmentSetting'
import B2bEmailMarketing from '@pages/B2bEmailMarketing'
import DemandFlowBridge from '@pages/DemandFlowBridge'
import Abm from '@pages/Abm'
import WebinarServices from '@pages/WebinarServices'
import LeadNurturing from '@pages/LeadNurturing'
import DemandGeneration from '@pages/DemandGeneration'
import B2bListBuilding from '@pages/B2bListBuilding'
import DatabaseCleansing from '@pages/DatabaseCleansing'
import Privacy from '@pages/Privacy'
import Terms from '@pages/Terms'
import CookiePolicy from '@components/cookies/CookiePolicyPage'
import Login from '@pages/Login'
import NotFound from '@pages/NotFound'

// Admin Pages
import Dashboard from '@pages/Admin/Dashboard'
import Blogs from '@pages/Admin/Blogs'
import CreateBlog from '@pages/Admin/CreateBlog'
import EditBlog from '@pages/Admin/EditBlog'
import Archives from '@pages/Admin/Archives'
import Drafts from '@pages/Admin/Drafts'
import Jobs from '@pages/Admin/Jobs'
import EditJob from '@pages/Admin/EditJob'
import Applications from '@pages/Admin/Applications'
import Media from '@pages/Admin/Media'
import Categories from '@pages/Admin/Categories'
import Authors from '@pages/Admin/Authors'
import Users from '@pages/Admin/Users'
import Profile from '@pages/Admin/Profile'
import Settings from '@pages/Admin/Settings'
import SEO from '@pages/Admin/SEO'
import SEOAnalytics from '@pages/Admin/SEOAnalytics'
import Leads from '@pages/Admin/Leads'
import AuditLogs from '@pages/Admin/AuditLogs'
import Notifications from '@pages/Admin/Notifications'
import CMSNavbar from '@pages/Admin/CMSNavbar'
import CMSFooter from '@pages/Admin/CMSFooter'
import CMSOurClients from '@pages/Admin/CMSOurClients'
import FooterManagement from '@pages/Admin/FooterManagement'
import CareerGallery from '@pages/Admin/CareerGallery/index.jsx'

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetails />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="content-syndication" element={<ContentSyndication />} />
        <Route path="bant-lead-generation" element={<BantLeadGeneration />} />
        <Route path="mql-services" element={<MqlServices />} />
        <Route path="hql-services" element={<HqlServices />} />
        <Route path="hql" element={<Navigate to="/hql-services" replace />} />
        <Route path="hql-service" element={<Navigate to="/hql-services" replace />} />
        <Route path="services/hql-services" element={<Navigate to="/hql-services" replace />} />
        <Route path="services/hql" element={<Navigate to="/hql-services" replace />} />
        <Route path="services/hql-service" element={<Navigate to="/hql-services" replace />} />
        <Route path="sql-services" element={<SqlServices />} />
        <Route path="b2b-appointment-setting" element={<B2bAppointmentSetting />} />
        <Route path="b2b-email-marketing" element={<B2bEmailMarketing />} />
        <Route path="demandflow-bridge" element={<DemandFlowBridge />} />
        <Route path="abm" element={<Abm />} />
        <Route path="content-syndication-new" element={<Navigate to="/content-syndication" replace />} />
        <Route path="webinar-services" element={<WebinarServices />} />
        <Route path="lead-nurturing" element={<LeadNurturing />} />
        <Route path="demand-generation" element={<DemandGeneration />} />
        <Route path="b2b-list-building" element={<B2bListBuilding />} />
        <Route path="database-cleansing" element={<DatabaseCleansing />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<CookiePolicy />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/create" element={<CreateBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
        <Route path="drafts" element={<Drafts />} />
        <Route path="archives" element={<Archives />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/edit/:id" element={<EditJob />} />
        <Route path="applications" element={<Applications />} />
        <Route path="media" element={<Media />} />
        <Route path="categories" element={<Categories />} />
        <Route path="authors" element={<Authors />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="seo" element={<SEO />} />
        <Route path="seo-analytics" element={<SEOAnalytics />} />
        <Route path="leads" element={<Leads />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="cms/navbar" element={<CMSNavbar />} />
        <Route path="cms/footer" element={<CMSFooter />} />
        <Route path="cms/clients" element={<CMSOurClients />} />
        <Route path="career-gallery" element={<CareerGallery />} />
        <Route path="footer" element={<FooterManagement />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
