'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'default' | 'dark' | 'secondary' | 'primary';
}

export function FlowButton({
  text = "Modern Button",
  variant = "default",
  className = "",
  onClick,
  type = "button",
  ...props
}: FlowButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondaryOrDark = variant === 'dark' || variant === 'secondary';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-6 py-2.5 text-[13px] sm:text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent active:scale-[0.95] select-none ${
        isPrimary
          ? 'border-[#2563EB] dark:border-[#38BDF8] bg-[#2563EB]/[0.08] dark:bg-[#2563EB]/25 text-[#2563EB] dark:text-white hover:text-white shadow-xs hover:border-[#2563EB] dark:hover:border-[#60A5FA] hover:shadow-[0_6px_25px_rgba(37,99,235,0.35)] dark:shadow-[0_0_20px_rgba(37,99,235,0.25)] dark:hover:shadow-[0_0_30px_rgba(37,99,235,0.65)]'
          : isSecondaryOrDark
          ? 'border-slate-300 dark:border-white/35 bg-white/90 dark:bg-white/10 backdrop-blur-md text-slate-800 dark:text-white hover:text-white shadow-xs hover:shadow-[0_4px_20px_rgba(15,23,42,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.06)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.18)]'
          : 'border-slate-300 dark:border-white/30 bg-transparent text-slate-800 dark:text-white hover:text-white'
      } ${className}`}
      {...props}
    >
      {/* Left arrow (arr-2) flies in from the left on hover */}
      <ArrowRight
        className={`absolute w-3.5 h-3.5 left-[-25%] fill-none z-[9] group-hover:left-3.5 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isPrimary
            ? 'stroke-[#2563EB] dark:stroke-[#38BDF8]'
            : 'stroke-slate-800 dark:stroke-white'
        }`}
      />

      {/* Button Text shifts right on hover */}
      <span className="relative z-[1] -translate-x-2.5 group-hover:translate-x-2.5 transition-all duration-[800ms] ease-out tracking-wide">
        {text}
      </span>

      {/* Expanding Circle Background that fills the button on hover */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[350px] group-hover:h-[350px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isPrimary
            ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6]'
            : isSecondaryOrDark
            ? 'bg-slate-900 dark:bg-[#1E293B]'
            : 'bg-slate-900 dark:bg-slate-800'
        }`}
      />

      {/* Right arrow (arr-1) flies out to the right on hover */}
      <ArrowRight
        className={`absolute w-3.5 h-3.5 right-3.5 fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isPrimary
            ? 'stroke-[#2563EB] dark:stroke-[#38BDF8]'
            : 'stroke-slate-800 dark:stroke-white'
        }`}
      />
    </button>
  );
}

export default FlowButton;
