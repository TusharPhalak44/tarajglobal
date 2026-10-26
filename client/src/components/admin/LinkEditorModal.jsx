import React, { useState, useEffect, useRef } from 'react'
import { Link2, X, ExternalLink, Trash2, Check } from 'lucide-react'

const LinkEditorModal = ({
  isOpen,
  onClose,
  onApply,
  onRemove,
  initialText = '',
  initialUrl = ''
}) => {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(true)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setUrl(initialUrl || '')
      setText(initialText || '')
      setOpenInNewTab(true)
      setError('')
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.select()
        }
      }, 50)
    }
  }, [isOpen, initialUrl, initialText])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e?.preventDefault()
    let cleanUrl = url.trim()
    if (!cleanUrl) {
      setError('Please enter a URL.')
      return
    }

    // Auto-prefix https:// if missing protocol, unless it's mailto, tel, anchor, or relative
    if (
      !cleanUrl.startsWith('http://') &&
      !cleanUrl.startsWith('https://') &&
      !cleanUrl.startsWith('mailto:') &&
      !cleanUrl.startsWith('tel:') &&
      !cleanUrl.startsWith('#') &&
      !cleanUrl.startsWith('/')
    ) {
      cleanUrl = 'https://' + cleanUrl
    }

    onApply({
      url: cleanUrl,
      text: text.trim(),
      openInNewTab
    })
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className="w-full max-w-md bg-[#0f172a] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#1e293b]/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00A6FF]/10 border border-[#00A6FF]/30 flex items-center justify-center text-[#00A6FF] shadow-xs">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {initialUrl ? 'Edit Hyperlink' : 'Insert Hyperlink'}
              </h3>
              <p className="text-xs text-slate-400">
                Text color: <span className="text-[#00A6FF] font-semibold">#00A6FF</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Display Text Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Display Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Taraj Global or Visit our website"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f19] border border-[#334155] text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A6FF] focus:ring-1 focus:ring-[#00A6FF] transition-all"
            />
          </div>

          {/* URL Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Link URL <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  if (error) setError('')
                }}
                placeholder="https://example.com"
                className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#0b0f19] border ${
                  error ? 'border-red-500' : 'border-[#334155]'
                } text-[#00A6FF] placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-[#00A6FF] focus:ring-1 focus:ring-[#00A6FF] transition-all`}
              />
              <ExternalLink className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          {/* Color Preview & Open in new tab */}
          <div className="p-3 rounded-xl bg-[#1e293b]/40 border border-[#334155]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]" />
              <span className="text-xs text-slate-300">
                Link Color: <strong className="text-[#00A6FF] font-mono">#00A6FF</strong>
              </span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="rounded border-[#334155] text-[#00A6FF] focus:ring-0 cursor-pointer"
              />
              <span>New tab</span>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2 gap-3">
            {initialUrl ? (
              <button
                type="button"
                onClick={() => {
                  if (onRemove) onRemove()
                  onClose()
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Link</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-[#00A6FF] text-white hover:bg-[#0090e0] hover:shadow-[0_0_15px_rgba(0,166,255,0.4)] transition-all shadow-md cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{initialUrl ? 'Update Link' : 'Add Link'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LinkEditorModal
