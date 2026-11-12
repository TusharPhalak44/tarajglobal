import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  CATEGORIES_DATA,
  CATEGORY_FAQS,
  normalizeCategory,
  getCategoryFaq,
  DEFAULT_BLOG_FAQS
} from './categoryFaqs'

export { DEFAULT_BLOG_FAQS, CATEGORY_FAQS, CATEGORIES_DATA, normalizeCategory, getCategoryFaq }

export const BlogFAQ = ({
  faqs = null,
  categoryKey = null,
  selectedCategory = null,
  onCategoryChange = null,
  showCategoryTabs = true,
  eyebrow = null,
  title = null,
  highlightTitle = null,
  description = null,
  id = 'faq',
  className = '',
  isArticleInline = false
}) => {
  // Determine active category key
  const initialCatKey = normalizeCategory(categoryKey || selectedCategory) || 'thought-leadership'
  const [internalCategory, setInternalCategory] = useState(initialCatKey)
  const [openId, setOpenId] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  // Sync with incoming category prop if provided
  useEffect(() => {
    const nextKey = normalizeCategory(categoryKey || selectedCategory)
    if (nextKey && nextKey !== internalCategory) {
      setInternalCategory(nextKey)
      setOpenId(null) // reset open accordion item on category switch
    }
  }, [categoryKey, selectedCategory])

  const activeCategoryKey = normalizeCategory(categoryKey || selectedCategory) || internalCategory
  const categoryConfig = CATEGORY_FAQS[activeCategoryKey] || CATEGORY_FAQS['thought-leadership']

  // If custom FAQs are passed (e.g. parsed directly from an article), use them;
  // otherwise use the category-specific FAQs.
  const activeFaqs = Array.isArray(faqs) && faqs.length > 0
    ? faqs
    : (categoryConfig?.faqs || DEFAULT_BLOG_FAQS)

  const resolvedEyebrow = eyebrow || categoryConfig?.eyebrow || 'SOMETHING ON YOUR MIND?'
  
  const resolvedTitle = title || categoryConfig?.title || 'FREQUENTLY ASKED'
  const resolvedHighlight = highlightTitle || categoryConfig?.highlightTitle || 'QUESTIONS'
  const resolvedDesc = description !== null && description !== undefined
    ? description
    : (categoryConfig?.subtext || 'Answers about our executive perspectives on B2B revenue strategy and growth.')

  const toggle = (itemId) => {
    setOpenId((prev) => (prev === itemId ? null : itemId))
  }

  const handleTabClick = (key) => {
    setInternalCategory(key)
    setOpenId(null)
    if (onCategoryChange) {
      onCategoryChange(key)
    }
  }

  const renderFaqItem = (faq, index) => {
    const isOpen = openId === faq.id
    const displayNum = faq.num || String(index + 1).padStart(2, '0')

    return (
      <div
        key={faq.id || `faq-${index}`}
        className={`
          relative group rounded-2xl transition-all duration-300 border overflow-hidden
          hover:-translate-y-0.5
          ${isOpen
            ? 'bg-white dark:bg-[#0B1424] border-[#00A6FF] shadow-lg shadow-[#00A6FF]/15 dark:shadow-[0_10px_30px_rgba(0,166,255,0.22)] ring-1 ring-[#00A6FF]/30'
            : 'bg-white dark:bg-[#091120] border-slate-200/90 dark:border-white/10 shadow-sm hover:border-[#00A6FF]/60 dark:hover:border-[#00A6FF]/60 hover:shadow-md hover:shadow-[#00A6FF]/10 dark:hover:shadow-[0_8px_25px_rgba(0,166,255,0.14)]'
          }
        `}
      >
        {/* Top subtle hover / active accent beam */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
        />

        <button
          id={`faq-btn-${faq.id}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${faq.id}`}
          onClick={() => toggle(faq.id)}
          className="w-full flex items-start justify-between gap-3.5 p-4 sm:p-5 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-start gap-3">
            <span
              className={`font-mono text-xs font-black px-2 py-0.5 rounded-md mt-0.5 shrink-0 transition-all duration-200 ${isOpen
                ? 'bg-[#00A6FF] text-white shadow-xs shadow-[#00A6FF]/40'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-[#00A6FF]'
                }`}
            >
              {displayNum}
            </span>
            <span
              className={`text-sm sm:text-[15px] font-bold leading-snug transition-colors duration-200 ${isOpen
                ? 'text-[#00A6FF]'
                : 'text-slate-900 dark:text-white group-hover:text-[#00A6FF]'
                }`}
            >
              {faq.question}
            </span>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen
              ? 'bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/40 shadow-xs'
              : 'bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200/60 dark:border-white/5 group-hover:border-[#00A6FF]/40 group-hover:text-[#00A6FF]'
              }`}
            aria-hidden="true"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }}
              exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 font-normal pl-[44px] sm:pl-[48px] whitespace-pre-line">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white transition-colors duration-300 select-none ${isArticleInline
        ? 'py-8 sm:py-10 rounded-3xl border border-slate-200/90 dark:border-white/10 my-10 px-4 sm:px-8'
        : 'py-12 sm:py-16 lg:py-20 border-t border-b border-slate-200/80 dark:border-white/10'
        } ${className}`}
      aria-label="Frequently Asked Questions about B2B Marketing and Demand Generation"
    >
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00A6FF]/10 rounded-full blur-[160px] pointer-events-none" />
      </div>

      <div className={`relative mx-auto ${isArticleInline ? 'w-full' : 'max-w-[1320px] px-4 sm:px-6 lg:px-8'}`}>

        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-2.5"
          >
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              {resolvedEyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-slate-900 dark:text-text-primary dark:text-white">{resolvedTitle} </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">
              {resolvedHighlight}
            </span>
          </motion.h2>

          {resolvedDesc && (
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal"
            >
              {resolvedDesc}
            </motion.p>
          )}

          {/* ── CATEGORY TABS SELECTOR (WHEN BROWSING ON BLOG HUB) ── */}
          {!isArticleInline && showCategoryTabs && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {CATEGORIES_DATA.map((cat) => {
                const isSelected = activeCategoryKey === cat.key
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleTabClick(cat.key)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${isSelected
                      ? 'bg-[#00A6FF] text-white shadow-md shadow-[#00A6FF]/25 scale-105'
                      : 'bg-white dark:bg-[#11141e] text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-white/10 hover:border-[#00A6FF]/50 hover:text-[#00A6FF]'
                      }`}
                  >
                    <span>{cat.name}</span>
                    {isSelected && <CheckCircle2 size={13} className="shrink-0" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ── SINGLE COLUMN ACCORDION STACK ── */}
        <div className={`space-y-3.5 w-full mx-auto ${isArticleInline ? 'max-w-full' : 'max-w-4xl'}`}>
          {activeFaqs.map((faq, i) => renderFaqItem(faq, i))}
        </div>

      </div>
    </section>
  )
}

export default BlogFAQ
