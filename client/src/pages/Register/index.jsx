import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  AlertCircle,
  Loader2,
  Camera,
  Upload,
  Linkedin,
  Twitter,
  Shield,
  FileText,
  CheckCircle2
} from 'lucide-react'
import { useAuth } from '@context/AuthContext'
import SEO from '@components/common/SEO'

function Register() {
  const navigate = useNavigate()
  const { register, isAuthenticated, user } = useAuth()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (isAuthenticated && user) {
      if (user.role === 'user') {
        navigate('/user/blogs', { replace: true })
      } else {
        navigate('/admin/dashboard', { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    bio: '',
    linkedin_url: '',
    twitter_url: ''
  })

  const [avatarPreview, setAvatarPreview] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (apiError) setApiError('')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, avatar: 'Please select a valid image file (PNG, JPG, WebP).' }))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, avatar: 'Image size must be less than 5MB.' }))
      return
    }

    setErrors(prev => ({ ...prev, avatar: '' }))
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required.'
    if (!form.email.trim()) errs.email = 'Corporate email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    
    if (!form.password) errs.password = 'Password is required.'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'

    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
    }

    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setApiError('')

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        bio: form.bio.trim(),
        linkedin_url: form.linkedin_url.trim(),
        twitter_url: form.twitter_url.trim(),
        avatar: avatarPreview || null
      }

      const result = await register(payload)
      if (result?.success) {
        const registeredUser = result.user || JSON.parse(localStorage.getItem('user') || '{}')
        if (registeredUser?.role === 'user') {
          navigate('/user/blogs', { replace: true })
        } else {
          navigate('/admin/dashboard', { replace: true })
        }
      } else {
        setApiError(result?.message || 'Registration failed. Please check your details.')
      }
    } catch (err) {
      setApiError(err?.response?.data?.message || err?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Register Account | Taraj Global" noIndex={true} />

      <div className="min-h-screen bg-surface dark:bg-[#0E0E0E] text-[#EDEDED] flex items-center justify-center p-4 sm:p-6 py-12">
        <div className="w-full max-w-lg space-y-6">
          {/* Brand Header */}
          <div className="space-y-1.5 text-center">
            <div className="inline-flex w-10 h-10 rounded bg-surface dark:bg-[#1A1A1A] border border-[#262626] items-center justify-center font-bold text-base text-text-primary dark:text-white mb-2">
              T
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#EDEDED]">
              Create Workspace Account
            </h1>
            <p className="text-xs sm:text-sm text-[#71717A]">
              Register your profile with author details, bio, and social links to manage or author blogs.
            </p>
          </div>

          {/* Form Card */}
          <div className="p-6 sm:p-7 rounded-xl bg-surface dark:bg-[#141414] border border-[#262626] shadow-xl space-y-5">
            {apiError && (
              <div className="p-3.5 rounded-lg bg-surface dark:bg-[#1F1414] border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Image Upload & Preview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1AA] mb-2">
                  Profile Photo (Author Avatar)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface dark:bg-[#1A1A1A] border border-[#262626] flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-6 h-6 text-[#71717A]" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <input
                      type="file"
                      id="registerAvatarInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                      disabled={loading}
                    />
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="registerAvatarInput"
                        className="h-8 px-3 rounded bg-surface dark:bg-[#202020] hover:bg-[#2A2A2A] text-xs font-semibold text-[#EDEDED] border border-[#333] cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#00A6FF]" />
                        <span>{avatarPreview ? 'Change Photo' : 'Upload Avatar'}</span>
                      </label>
                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={() => setAvatarPreview('')}
                          className="text-xs text-[#EF4444] hover:underline px-1"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-[#71717A]">
                      Appears on your author card below blogs (PNG, JPG, WebP)
                    </p>
                    {errors.avatar && (
                      <p className="text-[11px] text-[#EF4444]">{errors.avatar}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Jessica Chen"
                      className="admin-input pl-9 pr-3 text-xs w-full"
                      disabled={loading}
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-[#EF4444]">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@tarajglobal.com"
                      className="admin-input pl-9 pr-3 text-xs w-full"
                      disabled={loading}
                      required
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-[#EF4444]">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  Account Type / Role
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="admin-select pl-9 text-xs w-full"
                    disabled={loading}
                  >
                    <option value="admin">Administrator (Full Workspace & Publishing)</option>
                    <option value="user">Content Creator / Author (Blog Writer)</option>
                  </select>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      className="admin-input pl-9 pr-9 text-xs w-full"
                      disabled={loading}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#EDEDED]"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-[11px] text-[#EF4444]">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      className="admin-input pl-9 pr-9 text-xs w-full"
                      disabled={loading}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#EDEDED]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-[11px] text-[#EF4444]">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Author Bio */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-[#A1A1AA]">
                    Author Biography / Bio
                  </label>
                  <span className="text-[11px] text-[#00A6FF] font-mono">
                    Shown below your blogs
                  </span>
                </div>
                <textarea
                  name="bio"
                  rows={3}
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Share your professional background, expertise, and role at Taraj Global..."
                  className="admin-input p-2.5 text-xs w-full leading-relaxed"
                  disabled={loading}
                />
              </div>

              {/* LinkedIn & Twitter Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0077B5]" />
                    <input
                      name="linkedin_url"
                      type="url"
                      value={form.linkedin_url}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="admin-input pl-9 pr-3 text-xs w-full font-mono"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    Twitter / X Profile URL
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                    <input
                      name="twitter_url"
                      type="url"
                      value={form.twitter_url}
                      onChange={handleChange}
                      placeholder="https://x.com/username"
                      className="admin-input pl-9 pr-3 text-xs w-full font-mono"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded bg-[#EDEDED] hover:bg-white text-[#0E0E0E] text-xs font-bold flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-50 shadow-md cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating account & author profile...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 border-t border-[#262626] text-center">
              <p className="text-xs text-[#71717A]">
                Already registered?{' '}
                <Link to="/loginadmin" className="text-[#00A6FF] font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
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

export default Register
