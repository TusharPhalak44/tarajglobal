import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Briefcase,
} from 'lucide-react'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const ACCEPTED_EXT = ['.pdf', '.doc', '.docx']
const MAX_SIZE_MB = 5

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ResumeUploadModal({ isOpen, onClose, jobTitle = null }) {
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const inputRef = useRef(null)

  // ── File validation ────────────────────────────────────────────────────────
  const validateFile = (f) => {
    if (!f) return 'Please select a file.'
    if (!ACCEPTED_TYPES.includes(f.type)) return 'Only PDF, DOC, and DOCX files are accepted.'
    if (f.size > MAX_SIZE_MB * 1024 * 1024) return `File size must be under ${MAX_SIZE_MB} MB.`
    return ''
  }

  const applyFile = (f) => {
    const err = validateFile(f)
    setFileError(err)
    setFile(err ? null : f)
  }

  // ── Drag & drop ────────────────────────────────────────────────────────────
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) applyFile(dropped)
  }, [])

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)

  // ── Form fields ────────────────────────────────────────────────────────────
  const handleField = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!fields.name.trim()) errs.name = 'Full name is required.'
    if (!fields.email.trim()) errs.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.'
    if (!file) errs.file = 'Please attach your resume.'
    return errs
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setFieldErrors(errs)
      if (errs.file) setFileError(errs.file)
      return
    }

    setStatus('submitting')

    // Build FormData for backend integration (POST /api/careers/apply)
    // const form = new FormData()
    // form.append('name', fields.name)
    // form.append('email', fields.email)
    // form.append('phone', fields.phone)
    // form.append('message', fields.message)
    // form.append('resume', file)
    // if (jobTitle) form.append('jobTitle', jobTitle)
    // await api.post('/careers/apply', form, { headers: { 'Content-Type': 'multipart/form-data' } })

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1800))
    setStatus('success')
  }

  // ── Reset & close ──────────────────────────────────────────────────────────
  const handleClose = () => {
    if (status === 'submitting') return
    setFile(null)
    setFileError('')
    setFields({ name: '', email: '', phone: '', message: '' })
    setFieldErrors({})
    setStatus('idle')
    onClose()
  }

  // ── Input styles helper ────────────────────────────────────────────────────
  const inputCls = (err) =>
    `w-full bg-white/5 border ${err ? 'border-red-500/60' : 'border-white/10'} rounded px-2 py-1 text-[10px] text-text-primary placeholder-white/25 outline-none focus:border-primary/60 focus:bg-white/8 transition-all duration-200`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            key="resume-modal"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="relative w-full max-w-xs max-h-[25vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 10, 18, 0.96)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,166,255,0.18)',
              boxShadow:
                '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,166,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,166,255,0.12) 0%, rgba(255,109,0,0.08) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #00A6FF, #FF6D00)' }}
              >
                <Upload className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-semibold text-base leading-tight">
                  {jobTitle ? `Apply for ${jobTitle}` : 'Send Your Resume'}
                </h2>
                {jobTitle && (
                  <p className="text-text-secondary text-xs flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3 h-3" /> {jobTitle}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                disabled={status === 'submitting'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,166,255,0.3) transparent' }}>
              <AnimatePresence mode="wait">

                {/* Success state */}
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center text-center py-14 px-8 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-text-primary font-bold text-lg mb-2">Application Submitted!</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        Thanks <span className="text-white font-medium">{fields.name}</span>! We've received your resume
                        {jobTitle ? ` for the ${jobTitle} position` : ''} and will be in touch shortly.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg, #00A6FF, #0085CC)' }}
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (

                  /* Form state */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="px-2 py-1 space-y-1"
                    noValidate
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="name"
                          value={fields.name}
                          onChange={handleField}
                          placeholder="Jane Smith"
                          className={inputCls(fieldErrors.name)}
                          disabled={status === 'submitting'}
                        />
                        {fieldErrors.name && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {fieldErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={fields.email}
                          onChange={handleField}
                          placeholder="jane@example.com"
                          className={inputCls(fieldErrors.email)}
                          disabled={status === 'submitting'}
                        />
                        {fieldErrors.email && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Phone Number <span className="text-white/25 font-normal">(optional)</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={fields.phone}
                        onChange={handleField}
                        placeholder="+91 98765 43210"
                        className={inputCls(false)}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* File upload zone */}
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Resume / CV <span className="text-red-400">*</span>
                      </label>

                      {!file ? (
                        <motion.div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onClick={() => inputRef.current?.click()}
                          animate={dragging ? { scale: 1.02 } : { scale: 1 }}
                          transition={{ duration: 0.15 }}
                          className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 px-4 cursor-pointer transition-all duration-200 text-center"
                          style={{
                            borderColor: dragging
                              ? 'rgba(0,166,255,0.7)'
                              : fileError
                              ? 'rgba(239,68,68,0.5)'
                              : 'rgba(255,255,255,0.12)',
                            background: dragging
                              ? 'rgba(0,166,255,0.07)'
                              : 'rgba(255,255,255,0.02)',
                          }}
                        >
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center mb-1"
                            style={{ background: dragging ? 'rgba(0,166,255,0.2)' : 'rgba(255,255,255,0.06)' }}
                          >
                            <Upload className={`w-5 h-5 ${dragging ? 'text-primary' : 'text-white/40'}`} />
                          </div>
                          <p className="text-sm text-text-secondary">
                            <span className="text-primary font-medium">Click to upload</span> or drag & drop
                          </p>
                          <p className="text-xs text-white/25">PDF, DOC, DOCX — max {MAX_SIZE_MB} MB</p>
                          <input
                            ref={inputRef}
                            type="file"
                            accept={ACCEPTED_EXT.join(',')}
                            className="hidden"
                            onChange={(e) => applyFile(e.target.files[0])}
                            disabled={status === 'submitting'}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 rounded-xl px-4 py-3"
                          style={{
                            background: 'rgba(0,166,255,0.08)',
                            border: '1px solid rgba(0,166,255,0.25)',
                          }}
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-text-primary font-medium truncate">{file.name}</p>
                            <p className="text-xs text-text-secondary">{formatBytes(file.size)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setFile(null); setFileError('') }}
                            className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                            disabled={status === 'submitting'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      )}

                      {fileError && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fileError}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Cover Note <span className="text-white/25 font-normal">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        value={fields.message}
                        onChange={handleField}
                        placeholder="Tell us a little about yourself and why you'd like to join Taraj Global…"
                        rows={3}
                        className={`${inputCls(false)} resize-none`}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                      disabled={status === 'submitting'}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #FF6D00, #FFA600)',
                        boxShadow: status !== 'submitting' ? '0 4px 24px rgba(255,109,0,0.3)' : 'none',
                      }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Submit Application
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[11px] text-white/20 pb-1">
                      Your information is secure and will only be used for hiring purposes.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
