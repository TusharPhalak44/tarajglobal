import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout'
import AdminLayout from '@layouts/AdminLayout'
import AuthLayout from '@layouts/AuthLayout'
import AdminRoute, { RequireAdminOnly } from '@routes/AdminRoute'

// Pages - Lazy Loaded for performance
const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Services = lazy(() => import('@pages/Services'))
const ServiceDetails = lazy(() => import('@pages/ServiceDetails'))
const Blog = lazy(() => import('@pages/Blog'))
const BlogDetails = lazy(() => import('@pages/BlogDetails'))
const Careers = lazy(() => import('@pages/Careers'))
const Contact = lazy(() => import('@pages/Contact'))
const ContentSyndication = lazy(() => import('@pages/ContentSyndication'))
const BantLeadGeneration = lazy(() => import('@pages/BantLeadGeneration'))
const MqlServices = lazy(() => import('@pages/MqlServices'))
const HqlServices = lazy(() => import('@pages/HqlServices'))
const SqlServices = lazy(() => import('@pages/SqlServices'))
const B2bAppointmentSetting = lazy(() => import('@pages/B2bAppointmentSetting'))
const B2bEmailMarketing = lazy(() => import('@pages/B2bEmailMarketing'))
const DemandFlowBridge = lazy(() => import('@pages/DemandFlowBridge'))
const Abm = lazy(() => import('@pages/Abm'))
const WebinarServices = lazy(() => import('@pages/WebinarServices'))
const LeadNurturing = lazy(() => import('@pages/LeadNurturing'))
const DemandGeneration = lazy(() => import('@pages/DemandGeneration'))
const B2bListBuilding = lazy(() => import('@pages/B2bListBuilding'))
const DatabaseCleansing = lazy(() => import('@pages/DatabaseCleansing'))
const Privacy = lazy(() => import('@pages/Privacy'))
const Terms = lazy(() => import('@pages/Terms'))
const CookiePolicy = lazy(() => import('@components/cookies/CookiePolicyPage'))
const Login = lazy(() => import('@pages/Login'))
const NotFound = lazy(() => import('@pages/NotFound'))

// Admin Pages - Lazy Loaded
const Dashboard = lazy(() => import('@pages/Admin/Dashboard'))
const LiveChat = lazy(() => import('@pages/Admin/LiveChat'))
const Blogs = lazy(() => import('@pages/Admin/Blogs'))
const CreateBlog = lazy(() => import('@pages/Admin/CreateBlog'))
const EditBlog = lazy(() => import('@pages/Admin/EditBlog'))
const Archives = lazy(() => import('@pages/Admin/Archives'))
const Drafts = lazy(() => import('@pages/Admin/Drafts'))
const Jobs = lazy(() => import('@pages/Admin/Jobs'))
const EditJob = lazy(() => import('@pages/Admin/EditJob'))
const Applications = lazy(() => import('@pages/Admin/Applications'))
const Media = lazy(() => import('@pages/Admin/Media'))
const Categories = lazy(() => import('@pages/Admin/Categories'))
const Authors = lazy(() => import('@pages/Admin/Authors'))
const Users = lazy(() => import('@pages/Admin/Users'))
const Profile = lazy(() => import('@pages/Admin/Profile'))
const Settings = lazy(() => import('@pages/Admin/Settings'))
const SEO = lazy(() => import('@pages/Admin/SEO'))
const SEOAnalytics = lazy(() => import('@pages/Admin/SEOAnalytics'))
const Leads = lazy(() => import('@pages/Admin/Leads'))
const AuditLogs = lazy(() => import('@pages/Admin/AuditLogs'))
const Notifications = lazy(() => import('@pages/Admin/Notifications'))
const CMSNavbar = lazy(() => import('@pages/Admin/CMSNavbar'))
const CMSOurClients = lazy(() => import('@pages/Admin/CMSOurClients'))
const FooterManagement = lazy(() => import('@pages/Admin/FooterManagement'))
const CareerGallery = lazy(() => import('@pages/Admin/CareerGallery/index.jsx'))
const PaymentGateways = lazy(() => import('@pages/Admin/PaymentGateways'))

// Loading Fallback Component
const PageLoader = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-border border-t-[#00A6FF] rounded-full animate-spin mb-4"></div>
    <div className="text-text-secondary text-sm font-medium animate-pulse tracking-widest">LOADING...</div>
  </div>
)

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
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
        <Route path="b2b-email-marketinig" element={<Navigate to="/b2b-email-marketing" replace />} />
        <Route path="industries" element={<Navigate to="/services" replace />} />
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
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth / Admin Login Route */}
      <Route element={<AuthLayout />}>
        <Route path="/loginadmin" element={<Login />} />
        <Route path="/login" element={<Navigate to="/loginadmin" replace />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<RequireAdminOnly><Dashboard /></RequireAdminOnly>} />
        <Route path="dashboard" element={<RequireAdminOnly><Dashboard /></RequireAdminOnly>} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/create" element={<CreateBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
        <Route path="drafts" element={<Drafts />} />
        <Route path="archives" element={<RequireAdminOnly><Archives /></RequireAdminOnly>} />
        <Route path="jobs" element={<RequireAdminOnly><Jobs /></RequireAdminOnly>} />
        <Route path="jobs/edit/:id" element={<RequireAdminOnly><EditJob /></RequireAdminOnly>} />
        <Route path="applications" element={<RequireAdminOnly><Applications /></RequireAdminOnly>} />
        <Route path="media" element={<RequireAdminOnly><Media /></RequireAdminOnly>} />
        <Route path="categories" element={<RequireAdminOnly><Categories /></RequireAdminOnly>} />
        <Route path="authors" element={<RequireAdminOnly><Authors /></RequireAdminOnly>} />
        <Route path="users" element={<RequireAdminOnly><Users /></RequireAdminOnly>} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<RequireAdminOnly><Settings /></RequireAdminOnly>} />
        <Route path="seo" element={<RequireAdminOnly><SEO /></RequireAdminOnly>} />
        <Route path="seo-analytics" element={<RequireAdminOnly><SEOAnalytics /></RequireAdminOnly>} />
        <Route path="leads" element={<RequireAdminOnly><Leads /></RequireAdminOnly>} />
        <Route path="chat" element={<RequireAdminOnly><LiveChat /></RequireAdminOnly>} />
        <Route path="audit-logs" element={<RequireAdminOnly><AuditLogs /></RequireAdminOnly>} />
        <Route path="notifications" element={<RequireAdminOnly><Notifications /></RequireAdminOnly>} />
        <Route path="cms/navbar" element={<RequireAdminOnly><CMSNavbar /></RequireAdminOnly>} />
        <Route path="cms/footer" element={<Navigate to="/admin/footer" replace />} />
        <Route path="cms/clients" element={<RequireAdminOnly><CMSOurClients /></RequireAdminOnly>} />
        <Route path="career-gallery" element={<RequireAdminOnly><CareerGallery /></RequireAdminOnly>} />
        <Route path="footer" element={<RequireAdminOnly><FooterManagement /></RequireAdminOnly>} />
        <Route path="payments" element={<RequireAdminOnly><PaymentGateways /></RequireAdminOnly>} />
      </Route>
    </Routes>
    </Suspense>
  )
}

export default AppRoutes
