import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const breadcrumbMap = {
    about: 'About Us',
    services: 'Services',
    industries: 'Industries',
    careers: 'Careers',
    blog: 'Blog',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    cookies: 'Cookie Policy',
    'sql-services': 'Sales Qualified Leads (SQL)',
    'bant-lead-generation': 'BANT Lead Generation',
    'mql-services': 'Marketing Qualified Leads (MQL)',
    'b2b-appointment-setting': 'B2B Appointment Setting',
    'b2b-email-marketing': 'B2B Email Marketing',
    abm: 'Account-Based Marketing (ABM)',
    'content-syndication': 'Content Syndication',
    'content-syndication-new': 'Content Syndication',
    'demand-generation': 'Demand Generation',
    'webinar-services': 'Webinar Services',
    'lead-nurturing': 'Lead Nurturing',
    'b2b-list-building': 'B2B List Building',
    'database-cleansing': 'Database Cleansing',
    dashboard: 'Dashboard',
    login: 'Login',
  }

  const getBreadcrumbName = (path) => {
    return breadcrumbMap[path] || path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  if (pathnames.length === 0) {
    return null
  }

  return (
    <nav className="bg-surface py-4" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-text-secondary hover:text-primary transition-colors flex items-center"
            >
              <Home size={16} />
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = index === pathnames.length - 1

            return (
              <li key={name} className="flex items-center">
                <ChevronRight size={16} className="text-text-muted mx-2" />
                {isLast ? (
                  <span className="text-text-primary font-medium">
                    {getBreadcrumbName(name)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {getBreadcrumbName(name)}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumb
