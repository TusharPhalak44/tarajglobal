import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

/**
 * BUTTON 01 — Minimal Arrow Button
 * Clean typography with subtle translate arrow on hover
 */
export const MinimalArrowButton = ({
  to,
  onClick,
  children = 'START A CONVERSATION',
  className = '',
  accent = false,
}) => {
  const content = (
    <span
      className={`group inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
        accent
          ? 'text-primary hover:text-primary-hover'
          : 'text-text-primary hover:text-primary'
      } ${className}`}
    >
      <span>{children}</span>
      <span className="relative inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5">
        <ArrowRight className="w-4 h-4 transition-transform duration-300" />
      </span>
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none">
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
    >
      {content}
    </button>
  )
}

/**
 * BUTTON 02 — Underlined Text Button
 * High-end gallery link with animated underline expand and arrow shift
 */
export const UnderlineTextButton = ({
  to,
  onClick,
  children = 'EXPLORE SERVICE',
  className = '',
  active = false,
}) => {
  const content = (
    <span
      className={`group relative inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
        active ? 'text-primary' : 'text-text-primary hover:text-primary'
      } ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      {/* Animated underline */}
      <span
        className={`absolute left-0 -bottom-1 h-[1.5px] bg-primary transition-all duration-300 ease-out ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none">
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
    >
      {content}
    </button>
  )
}

/**
 * BUTTON 03 — Large Circular CTA
 * Magnetic feel, circle scale, arrow rotation, outer ring expansion
 */
export const CircularGalleryCTA = ({
  to = '/contact',
  onClick,
  title = 'START A CONVERSATION',
  subtext = 'BUILD PIPELINE',
  className = '',
}) => {
  const innerContent = (
    <div
      className={`group relative inline-flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full border border-border/60 bg-surface/80 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-primary hover:scale-105 select-none ${className}`}
      data-cursor-label="OPEN"
    >
      {/* Animated pulsing outer ring */}
      <div className="absolute -inset-2 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 pointer-events-none" />
      <div className="absolute -inset-4 rounded-full border border-dashed border-primary/15 opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-115 animate-spin-slow pointer-events-none" />

      {/* Center glowing backdrop */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="relative z-10 w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-2 transition-transform duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-black">
        <ArrowUpRight className="w-5 h-5 transition-transform duration-300" />
      </div>

      {/* Text labels */}
      <div className="relative z-10 text-center px-3">
        <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-text-primary transition-colors duration-300 group-hover:text-primary">
          {title}
        </span>
        {subtext && (
          <span className="block text-[9px] font-mono tracking-widest text-text-muted mt-0.5 opacity-80 group-hover:opacity-100">
            {subtext}
          </span>
        )}
      </div>
    </div>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none">
        {innerContent}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-transparent border-0 p-0 cursor-pointer focus:outline-none inline-block"
    >
      {innerContent}
    </button>
  )
}
