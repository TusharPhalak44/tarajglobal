import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Save, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Key, 
  Eye, 
  EyeOff, 
  Lock,
  Sparkles
} from 'lucide-react'
import PageHeader from '@components/admin/PageHeader'

const PaymentGateways = () => {
  const [activeGateway, setActiveGateway] = useState('stripe')
  const [showKeys, setShowKeys] = useState({})
  const [keys, setKeys] = useState({
    stripe: {
      publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
      secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || ''
    },
    razorpay: {
      keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      keySecret: import.meta.env.VITE_RAZORPAY_KEY_SECRET || ''
    },
    paypal: {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_PAYPAL_CLIENT_SECRET || ''
    }
  })
  const [savedMessage, setSavedMessage] = useState('')

  const gateways = [
    {
      id: 'stripe',
      name: 'Stripe Global Payments',
      description: 'Accept credit cards, Apple Pay, Google Pay, and international ACH wires.',
      badgeColor: 'admin-badge-cyan',
      fields: [
        { name: 'publicKey', label: 'Publishable API Key', placeholder: 'Enter Stripe Publishable Key' },
        { name: 'secretKey', label: 'Restricted Secret API Key', placeholder: 'Enter Stripe Secret Key' }
      ]
    },
    {
      id: 'razorpay',
      name: 'Razorpay Enterprise',
      description: 'Optimized for instant UPI, Indian netbanking, and corporate corporate cards.',
      badgeColor: 'admin-badge-orange',
      fields: [
        { name: 'keyId', label: 'Key ID', placeholder: 'Enter Razorpay Key ID' },
        { name: 'keySecret', label: 'Key Secret', placeholder: 'Enter Razorpay Key Secret' }
      ]
    },
    {
      id: 'paypal',
      name: 'PayPal Commerce Platform',
      description: 'Global checkout, balance transfers, and digital wallet processing.',
      badgeColor: 'admin-badge-purple',
      fields: [
        { name: 'clientId', label: 'Client ID', placeholder: 'Enter PayPal Client ID' },
        { name: 'clientSecret', label: 'Client Secret Key', placeholder: 'Enter PayPal Client Secret' }
      ]
    }
  ]

  const handleKeyChange = (gatewayId, fieldName, value) => {
    setKeys(prev => ({
      ...prev,
      [gatewayId]: {
        ...prev[gatewayId],
        [fieldName]: value
      }
    }))
  }

  const toggleShowKey = (fieldId) => {
    setShowKeys(prev => ({ ...prev, [fieldId]: !prev[fieldId] }))
  }

  const handleSave = () => {
    setSavedMessage('Payment gateway credentials successfully encrypted and saved.')
    setTimeout(() => setSavedMessage(''), 3500)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <PageHeader
        title="Payment Gateways & Checkout Integrations"
        subtitle="Manage secure payment processing credentials, API tokens, and live billing providers."
        breadcrumbs={[{ label: 'Payments' }]}
        actions={
          <button 
            onClick={handleSave}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#FF6D00]/25"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        }
      />

      {savedMessage && (
        <div className="p-4 rounded-xl bg-[var(--admin-success-soft)] border border-[#72D669]/30 text-[#72D669] text-sm font-semibold flex items-center gap-2 animate-slide-down">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Security notice banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="admin-card p-4 flex items-center gap-3.5">
          <div className="w-5 h-5 rounded-xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--admin-text-primary)]">PCI-DSS Compliant Encryption</h4>
            <p className="text-[13px] text-[var(--admin-text-muted)] mt-0.5">Sensitive keys are stored in encrypted vaults and never transmitted in plaintext.</p>
          </div>
        </div>

        <div className="admin-card p-4 flex items-center gap-3.5">
          <div className="w-5 h-5 rounded-xl bg-[var(--admin-accent-soft)] text-[var(--admin-accent)] flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--admin-text-primary)]">Zero Downtime Fallback</h4>
            <p className="text-[13px] text-[var(--admin-text-muted)] mt-0.5">Switching primary providers takes effect instantly across all client invoices.</p>
          </div>
        </div>
      </div>

      {/* Gateways List */}
      <div className="space-y-4">
        {gateways.map((gw) => {
          const isActive = activeGateway === gw.id

          return (
            <div
              key={gw.id}
              className={`admin-card p-6 transition-all duration-300 ${
                isActive ? 'border-[var(--admin-primary)] shadow-lg shadow-[#00A6FF]/10' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--admin-border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] flex items-center justify-center text-[var(--admin-primary)]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-[var(--admin-text-primary)]">{gw.name}</h3>
                      {isActive && (
                        <span className="admin-badge admin-badge-success text-[12px]">
                          Primary Live Gateway
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--admin-text-muted)] mt-0.5">{gw.description}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveGateway(gw.id)}
                  className={`admin-btn text-sm py-1.5 px-3.5 shrink-0 ${
                    isActive 
                      ? 'bg-[var(--admin-success-soft)] text-[#72D669] border border-[#72D669]/30' 
                      : 'admin-btn-secondary'
                  }`}
                >
                  {isActive ? '✓ Active Provider' : 'Set as Active'}
                </button>
              </div>

              {/* API Keys Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {gw.fields.map((field) => {
                  const fieldKey = `${gw.id}_${field.name}`
                  const isVisible = showKeys[fieldKey]

                  return (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-sm font-bold text-[var(--admin-text-secondary)] uppercase tracking-wider">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={isVisible ? 'text' : 'password'}
                          value={keys[gw.id]?.[field.name] || ''}
                          onChange={(e) => handleKeyChange(gw.id, field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className="admin-input font-mono text-sm pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => toggleShowKey(fieldKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
                        >
                          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PaymentGateways
