import React from 'react'
import { AlertTriangle, X, Loader2 } from 'lucide-react'

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be reversed.',
  confirmText = 'Delete Permanently',
  cancelText = 'Cancel',
  type = 'danger', // 'danger', 'warning', 'info'
  isLoading = false
}) => {
  if (!isOpen) return null

  const typeConfig = {
    danger: {
      iconBg: 'bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/20',
      btnClass: 'admin-btn-danger',
      glow: 'shadow-[0_0_24px_rgba(244,63,94,0.15)]'
    },
    warning: {
      iconBg: 'bg-[#FFA600]/10 text-[#FFA600] border border-[#FFA600]/20',
      btnClass: 'admin-btn-accent',
      glow: 'shadow-[0_0_24px_rgba(255,166,0,0.15)]'
    },
    info: {
      iconBg: 'bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/20',
      btnClass: 'admin-btn-primary',
      glow: 'shadow-[0_0_24px_rgba(0,166,255,0.15)]'
    }
  }[type] || {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background dark:bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0"
        onClick={!isLoading ? onClose : undefined}
      />

      <div className="relative w-full max-w-md bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-accent)] p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${typeConfig.iconBg}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="pr-6">
            <h3 className="text-lg font-bold text-[var(--admin-text-primary)]">
              {title}
            </h3>
            <p className="text-base text-[var(--admin-text-muted)] mt-1.5 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[var(--admin-border-subtle)]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="admin-btn admin-btn-secondary"
          >
            {cancelText}
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`admin-btn ${typeConfig.btnClass}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
