import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import NotFound from '@pages/NotFound'

const serviceRedirects = {
  'sql-services': '/sql-services',
  'sales-qualified': '/sql-services',
  'bant-lead-generation': '/bant-lead-generation',
  'bant-services': '/bant-lead-generation',
  'bant-leads': '/bant-lead-generation',
  'sql': '/sql-services',
  'mql': '/mql-services',
  'bant': '/bant-lead-generation',
  'mql-services': '/mql-services',
  'marketing-qualified': '/mql-services',
  'b2b-appointment-setting': '/b2b-appointment-setting',
  'appointment-setting': '/b2b-appointment-setting',
  'appointment-generation': '/b2b-appointment-setting',
  'b2b-email-marketing': '/b2b-email-marketing',
  'email-marketing': '/b2b-email-marketing',
  'abm': '/abm',
  'account-based': '/abm',
  'account-based-marketing': '/abm',
  'content-syndication': '/content-syndication',
  'demand-generation': '/demand-generation',
  'webinar-services': '/webinar-services',
  'webinar-registration': '/webinar-services',
  'lead-nurturing': '/lead-nurturing',
  'b2b-list-building': '/b2b-list-building',
  'database': '/b2b-list-building',
  'database-cleansing': '/database-cleansing',
  'hql-services': '/hql-services',
  'hql': '/hql-services',
  'hql-service': '/hql-services',
  'high-quality-leads': '/hql-services',
  'high-quality-lead': '/hql-services',
  'demandflow-bridge': '/demandflow-bridge',
  'demandflow': '/demandflow-bridge',
  'b2b-lead-generation': '/services',
  'lead-generation': '/services',
}

function ServiceDetails() {
  const { id } = useParams()
  const target = id && serviceRedirects[id.toLowerCase()]

  if (target) return <Navigate to={target} replace />
  return <NotFound />
}

export default ServiceDetails
