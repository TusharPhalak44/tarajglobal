import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout'
import AdminLayout from '@layouts/AdminLayout'
import AuthLayout from '@layouts/AuthLayout'
import AdminRoute, { RequireAdminOnly, UserRoute } from '@routes/AdminRoute'

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
const FullFunnelDemand = lazy(() => import('@pages/FullFunnelDemand'))
const AccountBasedExperience = lazy(() => import('@pages/AccountBasedExperience'))
const Privacy = lazy(() => import('@pages/Privacy'))
const Terms = lazy(() => import('@pages/Terms'))
const CookiePolicy = lazy(() => import('@components/cookies/CookiePolicyPage'))
const Sitemap = lazy(() => import('@pages/Sitemap'))
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
        {/* Core Pages */}
        <Route index element={<Home />} />
        <Route path="who-we-are" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetails />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />

        {/* 16 Core Service Pages */}
        <Route path="sql-services" element={<SqlServices />} />
        <Route path="mql-services" element={<MqlServices />} />
        <Route path="hql-services" element={<HqlServices />} />
        <Route path="bant-lead-generation" element={<BantLeadGeneration />} />
        <Route path="b2b-appointment-setting" element={<B2bAppointmentSetting />} />
        <Route path="b2b-email-marketing" element={<B2bEmailMarketing />} />
        <Route path="abm" element={<Abm />} />
        <Route path="content-syndication" element={<ContentSyndication />} />
        <Route path="demand-generation" element={<DemandGeneration />} />
        <Route path="full-funnel-demand" element={<FullFunnelDemand />} />
        <Route path="account-based-experience" element={<AccountBasedExperience />} />
        <Route path="webinar-services" element={<WebinarServices />} />
        <Route path="lead-nurturing" element={<LeadNurturing />} />
        <Route path="b2b-list-building" element={<B2bListBuilding />} />
        <Route path="database-cleansing" element={<DatabaseCleansing />} />
        <Route path="demandflow-bridge" element={<DemandFlowBridge />} />

        {/* Legal & System Pages */}
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<CookiePolicy />} />
        <Route path="sitemap" element={<Sitemap />} />

        {/* --- LEGACY & ALIAS URL REDIRECTS (301 Permanent Navigation) --- */}

        {/* Home Aliases */}
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="index" element={<Navigate to="/" replace />} />
        <Route path="index.html" element={<Navigate to="/" replace />} />

        {/* Company / About Us Aliases */}
        <Route path="about" element={<Navigate to="/who-we-are" replace />} />
        <Route path="about-us" element={<Navigate to="/who-we-are" replace />} />
        <Route path="aboutus" element={<Navigate to="/who-we-are" replace />} />
        <Route path="about_us" element={<Navigate to="/who-we-are" replace />} />
        <Route path="who_we_are" element={<Navigate to="/who-we-are" replace />} />
        <Route path="whoweare" element={<Navigate to="/who-we-are" replace />} />
        <Route path="company" element={<Navigate to="/who-we-are" replace />} />
        <Route path="our-team" element={<Navigate to="/who-we-are" replace />} />
        <Route path="team" element={<Navigate to="/who-we-are" replace />} />
        <Route path="leadership" element={<Navigate to="/who-we-are" replace />} />

        {/* Careers & Job Aliases */}
        <Route path="career" element={<Navigate to="/careers" replace />} />
        <Route path="jobs" element={<Navigate to="/careers" replace />} />
        <Route path="job" element={<Navigate to="/careers" replace />} />
        <Route path="work-with-us" element={<Navigate to="/careers" replace />} />
        <Route path="hiring" element={<Navigate to="/careers" replace />} />
        <Route path="openings" element={<Navigate to="/careers" replace />} />

        {/* Blog & Editorial Aliases */}
        <Route path="blogs" element={<Navigate to="/blog" replace />} />
        <Route path="articles" element={<Navigate to="/blog" replace />} />
        <Route path="insights" element={<Navigate to="/blog" replace />} />
        <Route path="news" element={<Navigate to="/blog" replace />} />

        {/* Contact, Inquiries & Auth Form Aliases */}
        <Route path="contact-us" element={<Navigate to="/contact" replace />} />
        <Route path="contactus" element={<Navigate to="/contact" replace />} />
        <Route path="contact_us" element={<Navigate to="/contact" replace />} />
        <Route path="get-in-touch" element={<Navigate to="/contact" replace />} />
        <Route path="schedule-call" element={<Navigate to="/contact" replace />} />
        <Route path="register" element={<Navigate to="/contact" replace />} />
        <Route path="signup" element={<Navigate to="/contact" replace />} />
        <Route path="sign-up" element={<Navigate to="/contact" replace />} />
        <Route path="forgot-password" element={<Navigate to="/contact" replace />} />

        {/* Legal & Policy Aliases */}
        <Route path="privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route path="privacypolicy" element={<Navigate to="/privacy" replace />} />
        <Route path="privacy_policy" element={<Navigate to="/privacy" replace />} />
        <Route path="terms-and-conditions" element={<Navigate to="/terms" replace />} />
        <Route path="terms-of-service" element={<Navigate to="/terms" replace />} />
        <Route path="termsofservice" element={<Navigate to="/terms" replace />} />
        <Route path="terms-conditions" element={<Navigate to="/terms" replace />} />
        <Route path="terms-condition" element={<Navigate to="/terms" replace />} />
        <Route path="terms_and_conditions" element={<Navigate to="/terms" replace />} />
        <Route path="cookie-policy" element={<Navigate to="/cookies" replace />} />
        <Route path="cookie-settings" element={<Navigate to="/cookies" replace />} />
        <Route path="cookie-preference" element={<Navigate to="/cookies" replace />} />
        <Route path="cookie_policy" element={<Navigate to="/cookies" replace />} />

        {/* Services Directory & General Solution Aliases */}
        <Route path="industries" element={<Navigate to="/services" replace />} />
        <Route path="industry" element={<Navigate to="/services" replace />} />
        <Route path="solutions" element={<Navigate to="/services" replace />} />
        <Route path="our-services" element={<Navigate to="/services" replace />} />
        <Route path="all-services" element={<Navigate to="/services" replace />} />
        <Route path="b2b-lead-generation" element={<Navigate to="/services" replace />} />
        <Route path="lead-generation" element={<Navigate to="/services" replace />} />

        {/* 1. SQL Service Aliases */}
        <Route path="sql" element={<Navigate to="/sql-services" replace />} />
        <Route path="sales-qualified" element={<Navigate to="/sql-services" replace />} />
        <Route path="sales-qualified-leads" element={<Navigate to="/sql-services" replace />} />
        <Route path="lead-qualification" element={<Navigate to="/sql-services" replace />} />

        {/* 2. MQL Service Aliases */}
        <Route path="mql" element={<Navigate to="/mql-services" replace />} />
        <Route path="marketing-qualified" element={<Navigate to="/mql-services" replace />} />
        <Route path="marketing-qualified-leads" element={<Navigate to="/mql-services" replace />} />

        {/* 3. HQL Service Aliases */}
        <Route path="hql" element={<Navigate to="/hql-services" replace />} />
        <Route path="hql-service" element={<Navigate to="/hql-services" replace />} />
        <Route path="high-quality-leads" element={<Navigate to="/hql-services" replace />} />
        <Route path="high-quality-lead" element={<Navigate to="/hql-services" replace />} />

        {/* 4. BANT Lead Generation Aliases */}
        <Route path="bant" element={<Navigate to="/bant-lead-generation" replace />} />
        <Route path="bant-services" element={<Navigate to="/bant-lead-generation" replace />} />
        <Route path="bant-leads" element={<Navigate to="/bant-lead-generation" replace />} />
        <Route path="bant-lead-gen" element={<Navigate to="/bant-lead-generation" replace />} />

        {/* 5. B2B Appointment Setting Aliases */}
        <Route path="appointment-setting" element={<Navigate to="/b2b-appointment-setting" replace />} />
        <Route path="appointment-generation" element={<Navigate to="/b2b-appointment-setting" replace />} />
        <Route path="b2b-appointment" element={<Navigate to="/b2b-appointment-setting" replace />} />
        <Route path="appointment" element={<Navigate to="/b2b-appointment-setting" replace />} />

        {/* 6. B2B Email Marketing Aliases */}
        <Route path="email-marketing" element={<Navigate to="/b2b-email-marketing" replace />} />
        <Route path="b2b-email" element={<Navigate to="/b2b-email-marketing" replace />} />
        <Route path="b2b-email-marketinig" element={<Navigate to="/b2b-email-marketing" replace />} />

        {/* 7. ABM Aliases */}
        <Route path="account-based-marketing" element={<Navigate to="/abm" replace />} />
        <Route path="account-based" element={<Navigate to="/abm" replace />} />

        {/* 8. Content Syndication Aliases */}
        <Route path="content-syndication-new" element={<Navigate to="/content-syndication" replace />} />
        <Route path="syndication" element={<Navigate to="/content-syndication" replace />} />
        <Route path="b2b-content-syndication" element={<Navigate to="/content-syndication" replace />} />

        {/* 9. Demand Generation Aliases */}
        <Route path="demand-gen" element={<Navigate to="/demand-generation" replace />} />
        <Route path="b2b-demand-generation" element={<Navigate to="/demand-generation" replace />} />

        {/* 10. Full-Funnel Demand Aliases */}
        <Route path="fullfunnel" element={<Navigate to="/full-funnel-demand" replace />} />
        <Route path="full-funnel" element={<Navigate to="/full-funnel-demand" replace />} />
        <Route path="ffd" element={<Navigate to="/full-funnel-demand" replace />} />

        {/* 11. Account-Based Experience Aliases */}
        <Route path="abx" element={<Navigate to="/account-based-experience" replace />} />
        <Route path="account-experience" element={<Navigate to="/account-based-experience" replace />} />

        {/* 12. Webinar Services Aliases */}
        <Route path="webinar" element={<Navigate to="/webinar-services" replace />} />
        <Route path="webinars" element={<Navigate to="/webinar-services" replace />} />
        <Route path="webinar-registration" element={<Navigate to="/webinar-services" replace />} />

        {/* 13. Lead Nurturing Aliases */}
        <Route path="nurturing" element={<Navigate to="/lead-nurturing" replace />} />
        <Route path="lead-nurture" element={<Navigate to="/lead-nurturing" replace />} />
        <Route path="b2b-lead-nurturing" element={<Navigate to="/lead-nurturing" replace />} />

        {/* 14. B2B List Building Aliases */}
        <Route path="prospect-data-enrichment" element={<Navigate to="/b2b-list-building" replace />} />
        <Route path="list-building" element={<Navigate to="/b2b-list-building" replace />} />
        <Route path="data-enrichment" element={<Navigate to="/b2b-list-building" replace />} />
        <Route path="database" element={<Navigate to="/b2b-list-building" replace />} />

        {/* 15. Database Cleansing Aliases */}
        <Route path="cleansing" element={<Navigate to="/database-cleansing" replace />} />
        <Route path="data-cleansing" element={<Navigate to="/database-cleansing" replace />} />
        <Route path="database-cleanse" element={<Navigate to="/database-cleansing" replace />} />

        {/* 16. DemandFlow Bridge Aliases */}
        <Route path="demandflow" element={<Navigate to="/demandflow-bridge" replace />} />
        <Route path="demand-flow" element={<Navigate to="/demandflow-bridge" replace />} />
        <Route path="demand-flow-bridge" element={<Navigate to="/demandflow-bridge" replace />} />

        {/* Nested Legacy /services/* direct routes */}
        <Route path="services/sql-services" element={<Navigate to="/sql-services" replace />} />
        <Route path="services/mql-services" element={<Navigate to="/mql-services" replace />} />
        <Route path="services/hql-services" element={<Navigate to="/hql-services" replace />} />
        <Route path="services/hql" element={<Navigate to="/hql-services" replace />} />
        <Route path="services/hql-service" element={<Navigate to="/hql-services" replace />} />
        <Route path="services/bant-lead-generation" element={<Navigate to="/bant-lead-generation" replace />} />
        <Route path="services/b2b-appointment-setting" element={<Navigate to="/b2b-appointment-setting" replace />} />
        <Route path="services/b2b-email-marketing" element={<Navigate to="/b2b-email-marketing" replace />} />
        <Route path="services/abm" element={<Navigate to="/abm" replace />} />
        <Route path="services/content-syndication" element={<Navigate to="/content-syndication" replace />} />
        <Route path="services/demand-generation" element={<Navigate to="/demand-generation" replace />} />
        <Route path="services/full-funnel-demand" element={<Navigate to="/full-funnel-demand" replace />} />
        <Route path="services/account-based-experience" element={<Navigate to="/account-based-experience" replace />} />
        <Route path="services/webinar-services" element={<Navigate to="/webinar-services" replace />} />
        <Route path="services/lead-nurturing" element={<Navigate to="/lead-nurturing" replace />} />
        <Route path="services/b2b-list-building" element={<Navigate to="/b2b-list-building" replace />} />
        <Route path="services/database-cleansing" element={<Navigate to="/database-cleansing" replace />} />
        <Route path="services/demandflow-bridge" element={<Navigate to="/demandflow-bridge" replace />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

            {/* Auth / Admin Login Route */}
      <Route element={<AuthLayout />}>
        <Route path="/loginadmin" element={<Login />} />
        <Route path="/login" element={<Navigate to="/loginadmin" replace />} />
        <Route path="/signin" element={<Navigate to="/loginadmin" replace />} />
        <Route path="/sign-in" element={<Navigate to="/loginadmin" replace />} />
        <Route path="/admin/login" element={<Navigate to="/loginadmin" replace />} />
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

      {/* User Routes */}
      <Route path="/user" element={<UserRoute><AdminLayout /></UserRoute>}>
        <Route index element={<Navigate to="/user/blogs" replace />} />
        <Route path="dashboard" element={<Navigate to="/user/blogs" replace />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/create" element={<CreateBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
        <Route path="drafts" element={<Drafts />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/user/blogs" replace />} />
      </Route>
    </Routes>
    </Suspense>
  )
}

export default AppRoutes
