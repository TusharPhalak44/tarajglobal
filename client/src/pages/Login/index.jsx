import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@context/AuthContext'
import { useTheme } from '@context/ThemeContext'
import TGAnimatedLogo from '@components/layout/PremiumNavbar/TGAnimatedLogo'
import SEO from '@components/common/SEO'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { theme } = useTheme()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
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
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.'
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

  const inputCls = (field) => `
    w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200
    bg-white dark:bg-[#0c1322] border ${errors[field] ? 'border-red-500/80 ring-1 ring-red-500/30' : 'border-slate-300 dark:border-white/15'}
    text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
    focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25
  `

  const isDark = theme === 'dark'

  return (
    <>
      <SEO title="Admin Login | Taraj Global" noIndex={true} />
      <div className="w-full max-w-md mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[calc(100vh-280px)] flex flex-col justify-center">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <Link to="/" className="inline-flex items-center justify-center group">
          <TGAnimatedLogo className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]" />
        </Link>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="rounded-2xl p-8 premium-card border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0b101d]/95 backdrop-blur-xl shadow-xl shadow-black/[0.05] dark:shadow-black/40"
      >
        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to your Taraj Global account</p>
        </div>

        {/* API error */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-sm font-medium"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)', color: '#EF4444' }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {apiError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-400 pointer-events-none" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@tarajglobal.com"
                className={inputCls('email')}
                style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                disabled={loading}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />{errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-400 pointer-events-none" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`${inputCls('password')} pr-12`}
                style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all cursor-pointer z-10 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-[#00A6FF]" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />{errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={loading ? {} : { scale: 1.02 }}
            whileTap={loading ? {} : { scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white mt-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(0,166,255,0.35)',
            }}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-secondary/30">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Back to site */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-text-secondary/50 hover:text-text-secondary transition-colors"
          >
            ← Back to Taraj Global
          </Link>
        </div>
      </motion.div>
      </div>
    </>
  )
}

export default Login
