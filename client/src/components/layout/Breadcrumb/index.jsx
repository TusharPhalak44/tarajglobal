import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const breadcrumbMap = {
  about: 'About Us',
  services: 'Services',
  careers: 'Careers',
  blog: 'Blog',
  contact: 'Contact Us',
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  cookies: 'Cookie Policy',
  'sql-services': 'Sales Qualified Leads (SQL)',
  'hql-services': 'High-Quality Leads (HQL)',
  'bant-lead-generation': 'BANT Lead Generation',
  'mql-services': 'Marketing Qualified Leads (MQL)',
  'b2b-appointment-setting': 'B2B Appointment Setting',
  'b2b-email-marketing': 'B2B Email Marketing',
  abm: 'Account-Based Marketing (ABM)',
  'content-syndication': 'Content Syndication',
  'demand-generation': 'Demand Generation',
  'webinar-services': 'Webinar Services',
  'lead-nurturing': 'Lead Nurturing',
  'b2b-list-building': 'B2B List Building',
  'database-cleansing': 'Database Cleansing',
  'demandflow-bridge': 'DemandFlow Bridge',
}

const serviceSlugs = new Set([
  'sql-services', 'hql-services', 'bant-lead-generation', 'mql-services', 'b2b-appointment-setting',
  'b2b-email-marketing', 'abm', 'content-syndication', 'demand-generation', 'webinar-services',
  'lead-nurturing', 'b2b-list-building', 'database-cleansing', 'demandflow-bridge',
])

const titleCase = (slug) =>
  decodeURIComponent(slug).split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const Breadcrumb = () => {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  if (segments.length === 0 || !breadcrumbMap[segments[0]]) {
    return <div aria-hidden="true" style={{ height: 'var(--nav-offset)' }} className={segments.length === 0 ? 'hidden' : ''} />
  }

  // Service landings live at the root but belong under /services in the site hierarchy.
  const crumbs = serviceSlugs.has(segments[0])
    ? [{ to: '/services', label: 'Services' }, { to: `/${segments[0]}`, label: breadcrumbMap[segments[0]] }]
    : segments.map((seg, i) => ({
        to: `/${segments.slice(0, i + 1).join('/')}`,
        label: breadcrumbMap[seg] || titleCase(seg),
      }))

  return (
    <nav
      aria-label="Breadcrumb"
      style={{ paddingTop: 'var(--nav-offset)' }}
      className="relative z-20 bg-background/80 backdrop-blur-sm border-b border-slate-200/60 dark:border-white/[0.06]"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 py-2.5 text-xs sm:text-[13px] min-w-0">
          <li className="shrink-0">
            <Link
              to="/"
              aria-label="Home"
              className="flex items-center text-text-secondary hover:text-[#00A6FF] transition-colors"
            >
              <Home size={14} />
            </Link>
          </li>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1
            return (
              <li key={crumb.to} className={`flex items-center gap-1.5 min-w-0 ${isLast ? '' : 'shrink-0'}`}>
                <ChevronRight size={13} className="text-text-muted shrink-0" aria-hidden="true" />
                {isLast ? (
                  <span aria-current="page" className="text-text-primary font-medium truncate">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.to} className="text-text-secondary hover:text-[#00A6FF] transition-colors">
                    {crumb.label}
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
