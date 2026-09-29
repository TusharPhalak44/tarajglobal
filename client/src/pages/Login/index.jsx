import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@context/AuthContext'
import SEO from '@components/common/SEO'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (apiError) setApiError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid corporate email.'
    if (!form.password) errs.password = 'Password is required.'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const result = await login({ email: form.email, password: form.password })
      if (result?.success) {
        navigate('/admin/dashboard')
      } else {
        setApiError(result?.message || 'Invalid email or password.')
      }
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Admin Login | Taraj Global" noIndex={true} />
      
      <div className="min-h-screen bg-[#0E0E0E] text-[#EDEDED] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm space-y-6">
          {/* Brand Header */}
          <div className="space-y-1.5 text-center">
            <div className="inline-flex w-10 h-10 rounded bg-[#1A1A1A] border border-[#262626] items-center justify-center font-bold text-base text-white mb-2">
              T
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#EDEDED]">
              Taraj Global Workspace
            </h1>
            <p className="text-xs text-[#71717A]">
              Sign in to manage publishing, CRM leads, and business operations.
            </p>
          </div>

          {/* Form Surface */}
          <div className="p-6 rounded-md bg-[#141414] border border-[#262626] space-y-4">
            {apiError && (
              <div className="p-3 rounded bg-[#1F1414] border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@tarajglobal.com"
                    className="admin-input pl-9 pr-3 text-xs w-full"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-[11px] text-[#EF4444]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="admin-input pl-9 pr-10 text-xs w-full"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#EDEDED]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-[11px] text-[#EF4444]">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-9 rounded bg-[#EDEDED] hover:bg-white text-[#0E0E0E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center">
            <Link to="/" className="text-xs text-[#71717A] hover:text-[#EDEDED] transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
