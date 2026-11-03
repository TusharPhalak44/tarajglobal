import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import NotFound from '@pages/NotFound'

const serviceRedirects = {
  // SQL
  'sql-services': '/sql-services',
  'sales-qualified': '/sql-services',
  'sales-qualified-leads': '/sql-services',
  'sql': '/sql-services',
  'lead-qualification': '/sql-services',

  // MQL
  'mql-services': '/mql-services',
  'marketing-qualified': '/mql-services',
  'marketing-qualified-leads': '/mql-services',
  'mql': '/mql-services',

  // HQL
  'hql-services': '/hql-services',
  'hql': '/hql-services',
  'hql-service': '/hql-services',
  'high-quality-leads': '/hql-services',
  'high-quality-lead': '/hql-services',

  // BANT
  'bant-lead-generation': '/bant-lead-generation',
  'bant-services': '/bant-lead-generation',
  'bant-leads': '/bant-lead-generation',
  'bant-lead-gen': '/bant-lead-generation',
  'bant': '/bant-lead-generation',

  // Appointment Setting
  'b2b-appointment-setting': '/b2b-appointment-setting',
  'appointment-setting': '/b2b-appointment-setting',
  'appointment-generation': '/b2b-appointment-setting',
  'b2b-appointment': '/b2b-appointment-setting',
  'appointment': '/b2b-appointment-setting',

  // Email Marketing
  'b2b-email-marketing': '/b2b-email-marketing',
  'email-marketing': '/b2b-email-marketing',
  'b2b-email': '/b2b-email-marketing',
  'b2b-email-marketinig': '/b2b-email-marketing',

  // ABM
  'abm': '/abm',
  'account-based': '/abm',
  'account-based-marketing': '/abm',

  // Content Syndication
  'content-syndication': '/content-syndication',
  'content-syndication-new': '/content-syndication',
  'syndication': '/content-syndication',
  'b2b-content-syndication': '/content-syndication',

  // Demand Generation
  'demand-generation': '/demand-generation',
  'demand-gen': '/demand-generation',
  'b2b-demand-generation': '/demand-generation',

  // Full-Funnel Demand
  'full-funnel-demand': '/full-funnel-demand',
  'fullfunnel': '/full-funnel-demand',
  'full-funnel': '/full-funnel-demand',
  'ffd': '/full-funnel-demand',

  // Account Based Experience (ABX)
  'account-based-experience': '/account-based-experience',
  'abx': '/account-based-experience',
  'account-experience': '/account-based-experience',

  // Webinar Services
  'webinar-services': '/webinar-services',
  'webinar': '/webinar-services',
  'webinars': '/webinar-services',
  'webinar-registration': '/webinar-services',

  // Lead Nurturing
  'lead-nurturing': '/lead-nurturing',
  'lead-nurture': '/lead-nurturing',
  'nurturing': '/lead-nurturing',
  'b2b-lead-nurturing': '/lead-nurturing',

  // B2B List Building
  'b2b-list-building': '/b2b-list-building',
  'list-building': '/b2b-list-building',
  'data-enrichment': '/b2b-list-building',
  'prospect-data-enrichment': '/b2b-list-building',
  'database': '/b2b-list-building',

  // Database Cleansing
  'database-cleansing': '/database-cleansing',
  'cleansing': '/database-cleansing',
  'data-cleansing': '/database-cleansing',
  'database-cleanse': '/database-cleansing',

  // DemandFlow Bridge
  'demandflow-bridge': '/demandflow-bridge',
  'demandflow': '/demandflow-bridge',
  'demand-flow': '/demandflow-bridge',
  'demand-flow-bridge': '/demandflow-bridge',

  // General Services Fallbacks
  'b2b-lead-generation': '/services',
  'lead-generation': '/services',
  'solutions': '/services',
  'industries': '/services',
  'industry': '/services',
  'our-services': '/services',
  'all-services': '/services',
}

function ServiceDetails() {
  const { id } = useParams()
  const target = id && serviceRedirects[id.toLowerCase()]

  if (target) return <Navigate to={target} replace />
  return <NotFound />
}

export default ServiceDetails
