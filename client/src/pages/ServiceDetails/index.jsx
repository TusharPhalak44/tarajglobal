import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SEO from '@components/common/SEO'
import Container from '@components/layout/Container'
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Target } from 'lucide-react'
import ChatBot from '@components/chatbot/ChatBot'

const serviceRedirects = {
  'sql-services': '/sql-services',
  'sales-qualified': '/sql-services',
  'bant-lead-generation': '/bant-lead-generation',
  'bant-services': '/bant-lead-generation',
  'bant-leads': '/bant-lead-generation',
  'mql-services': '/mql-services',
  'marketing-qualified': '/mql-services',
  'b2b-appointment-setting': '/b2b-appointment-setting',
  'appointment-setting': '/b2b-appointment-setting',
  'b2b-email-marketing': '/b2b-email-marketing',
  'email-marketing': '/b2b-email-marketing',
  'abm': '/abm',
  'account-based': '/abm',
  'content-syndication': '/content-syndication',
  'demand-generation': '/demand-generation',
  'webinar-services': '/webinar-services',
  'webinar-registration': '/webinar-services',
  'lead-nurturing': '/lead-nurturing',
  'b2b-list-building': '/b2b-list-building',
  'database-cleansing': '/database-cleansing',
  'hql-services': '/hql-services',
  'hql': '/hql-services',
  'hql-service': '/hql-services',
  'high-quality-leads': '/hql-services',
  'high-quality-lead': '/hql-services',
  'appointment-generation': '/b2b-appointment-setting',
  'b2b-lead-generation': '/services',
  'lead-generation': '/services',
  'database': '/b2b-list-building'
}

function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id && serviceRedirects[id.toLowerCase()]) {
      navigate(serviceRedirects[id.toLowerCase()], { replace: true })
    }
  }, [id, navigate])

  const formattedName = id
    ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'B2B Solution'

  return (
    <>
      <SEO
        title={`${formattedName} | B2B Demand Generation Solutions | Taraj Global`}
        description={`Explore ${formattedName} from Taraj Global. We deliver verified B2B data, sales qualification, and pipeline acceleration for high-growth tech companies.`}
        canonical={`/services/${id || ''}`}
      />

      <div className="min-h-screen bg-background py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Services
            </Link>

            <div className="bg-surface rounded-3xl border border-border p-8 md:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <span>Enterprise Service</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
                {formattedName}
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed">
                Accelerate your enterprise sales pipeline with Taraj Global's bespoke {formattedName} framework. We connect your team with verified decision-makers, confirmed budget holders, and in-market buyer intent.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-background/60 border border-border space-y-2">
                  <Target className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-text-primary text-sm">Targeted ICP</h3>
                  <p className="text-xs text-text-secondary">Precision segmentation of your ideal buyers.</p>
                </div>

                <div className="p-4 rounded-xl bg-background/60 border border-border space-y-2">
                  <ShieldCheck className="w-6 h-6 text-green-400" />
                  <h3 className="font-semibold text-text-primary text-sm">Verified Data</h3>
                  <p className="text-xs text-text-secondary">98%+ accuracy across all contact records.</p>
                </div>

                <div className="p-4 rounded-xl bg-background/60 border border-border space-y-2">
                  <TrendingUp className="w-6 h-6 text-cta" />
                  <h3 className="font-semibold text-text-primary text-sm">Predictable ROI</h3>
                  <p className="text-xs text-text-secondary">Accelerated deal velocity and higher win rates.</p>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-3.5 bg-background border border-border text-text-primary hover:border-primary/50 rounded-xl font-semibold transition-all duration-300"
                >
                  View All 12 Services
                </Link>
              </div>
            </div>
          </div>
        </Container>
        <ChatBot />
      </div>
    </>
  )
}

export default ServiceDetails
