import React from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

export function FlowButton({
  text = 'Modern Button',
  variant = 'default',
  className = '',
  onClick,
  type = 'button',
  isLoading = false,
  disabled = false,
  ...props
}) {
  const isPrimary = variant === 'primary'
  const isSecondaryOrDark = variant === 'dark' || variant === 'secondary'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-6 py-2.5 text-[13px] sm:text-sm font-semibold transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] select-none ${
        disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-transparent active:scale-[0.95]'
      } ${
        isPrimary
          ? 'border-[#FF6D00] bg-[#FF6D00] text-white hover:text-white shadow-[0_8px_22px_rgba(255,109,0,0.38)] hover:bg-[#e86200] hover:border-[#e86200]'
          : isSecondaryOrDark
          ? 'border-slate-400 dark:border-white/55 bg-white/80 dark:bg-white/[0.06] backdrop-blur-md text-slate-900 dark:text-white hover:text-white shadow-xs hover:border-[#FF6D00] dark:hover:border-[#FF6D00]'
          : 'border-slate-300 dark:border-white/30 bg-transparent text-slate-800 dark:text-white hover:text-white'
      } ${className}`}
      {...props}
    >
      {/* Left arrow flies in from the left on hover */}
      {!isLoading && (
        <ArrowRight
          className={`absolute w-3.5 h-3.5 left-[-25%] fill-none z-[9] group-hover:left-3.5 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isPrimary
              ? 'stroke-white'
              : 'stroke-slate-800 dark:stroke-white'
          }`}
        />
      )}

      {/* Button Text shifts right on hover */}
      <span className="relative z-[1] -translate-x-2.5 group-hover:translate-x-2.5 transition-all duration-[800ms] ease-out tracking-wide flex items-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {text}
      </span>

      {/* Expanding Circle Background that fills the button on hover */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[350px] group-hover:h-[350px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isPrimary
            ? 'bg-[#FF6D00]'
            : isSecondaryOrDark
            ? 'bg-slate-900 dark:bg-[#1E293B]'
            : 'bg-slate-900 dark:bg-slate-800'
        }`}
      />

      {/* Right arrow flies out to the right on hover */}
      {!isLoading && (
        <ArrowRight
          className={`absolute w-3.5 h-3.5 right-3.5 fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isPrimary
              ? 'stroke-white'
              : 'stroke-slate-800 dark:stroke-white'
          }`}
        />
      )}
    </button>
  )
}

export default FlowButton
