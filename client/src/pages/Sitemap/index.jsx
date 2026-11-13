import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Building,
  Target,
  Layers,
  Mail,
  Database,
  ShieldCheck,
  Search,
  ExternalLink,
  ArrowUpRight,
  Code2,
  X,
  Compass
} from 'lucide-react'
import SEO from '@components/common/SEO'
import { useSEOData } from '@hooks/useSEOData'
import { PRIMARY_PAGES, SERVICES_MENU_DATA, LEGAL_PAGES } from '@/constants/siteNavigation'

const DIRECTORY_SECTIONS = [
  {
    id: 'primary',
    title: 'Company & Corporate',
    accent: '#00A6FF',
    links: PRIMARY_PAGES,
  },
  ...SERVICES_MENU_DATA.map((cat) => ({
    id: cat.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: cat.title,
    accent: cat.accent,
    links: cat.items,
  })),
  {
    id: 'legal',
    title: 'Legal & Policies',
    accent: '#F59E0B',
    links: LEGAL_PAGES,
  },
]

const sitemapSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HTML Sitemap | TaRaj Global',
  url: 'https://tarajglobal.com/sitemap',
  description: 'Complete directory of all pages, B2B lead generation services, legal policies, and XML sitemaps for TaRaj Global.',
}

export default function Sitemap() {
  const [search, setSearch] = useState('')

  const { seoData } = useSEOData('page', 'sitemap', {
    title: 'HTML Sitemap | Complete Site Directory & Services | Taraj Global',
    description: 'Explore the complete Taraj Global website directory. Access all B2B demand generation services, lead qualification solutions, company pages, and XML sitemap.',
    keywords: 'Taraj Global sitemap, B2B services directory, demand generation site index, B2B lead generation pages, Taraj Global XML sitemap',
    canonical: '/sitemap',
    ogTitle: 'HTML Sitemap | Complete Site Directory & Services | Taraj Global',
    ogDescription: 'Explore the complete Taraj Global website directory. Access all B2B demand generation services, lead qualification solutions, company pages, and XML sitemap.',
    schemaJson: sitemapSchema,
  })

  // Total pages count
  const totalPagesCount = useMemo(() => {
    return DIRECTORY_SECTIONS.reduce((acc, sec) => acc + sec.links.length, 0)
  }, [])

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return DIRECTORY_SECTIONS

    return DIRECTORY_SECTIONS.map((section) => {
      const matchingLinks = section.links.filter((link) => {
        return (
          link.name.toLowerCase().includes(q) ||
          (link.desc && link.desc.toLowerCase().includes(q)) ||
          link.path.toLowerCase().includes(q)
        )
      })

      if (matchingLinks.length === 0) return null

      return {
        ...section,
        links: matchingLinks,
      }
    }).filter(Boolean)
  }, [search])

  return (
    <>
      <SEO {...seoData} schemaJson={sitemapSchema} />

      <main className="min-h-screen bg-background text-text-primary transition-colors duration-300 pt-28 sm:pt-32 pb-24 font-sans">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ── HEADER (Clean, Minimalist, Direct) ───────────────── */}
          <header className="pb-8 mb-10 border-b border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-2">
                  <Compass size={13} />
                  <span>Site Architecture</span>
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-text-primary">
                  Sitemap
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  A structured architectural index of all public solutions, demand programs, data services, and corporate resources.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2.5 self-start sm:self-end shrink-0">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border hover:border-primary/50 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors shadow-sm"
                  title="Raw XML feed for search engines"
                >
                  <Code2 size={13} className="text-primary" />
                  <span>XML Sitemap</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>
              </div>
            </div>

            {/* Quick Filter Search Input */}
            <div className="mt-6 max-w-sm">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter pages by name or path..."
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-lg border border-border bg-surface/60 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:bg-surface transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    aria-label="Clear filter"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* ── DIRECTORY COLUMNS (Clean Tree / List Layout) ──────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredSections.map((section) => (
              <section key={section.id} className="space-y-2">
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: section.accent }}
                      aria-hidden="true"
                    />
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-primary font-heading">
                      {section.title}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted">
                    {section.links.length}
                  </span>
                </div>

                {/* Clean Link List (No heavy cards) */}
                <ul className="space-y-0.5 pt-1">
                  {section.links.map((link) => {
                    const isExternal = Boolean(link.isExternal || link.path.startsWith('http'))
                    const LinkComponent = isExternal ? 'a' : Link
                    const linkProps = isExternal
                      ? { href: link.path, target: '_blank', rel: 'noopener noreferrer' }
                      : { to: link.path }

                    return (
                      <li key={link.path}>
                        <LinkComponent
                          {...linkProps}
                          className="group block py-2 px-2.5 rounded-lg -mx-2.5 hover:bg-surface/70 transition-colors duration-150"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-medium text-text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-border-light group-hover:bg-primary transition-colors shrink-0" />
                              <span>{link.name}</span>
                            </span>

                            {isExternal ? (
                              <ExternalLink
                                size={12}
                                className="text-text-muted opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0"
                              />
                            ) : (
                              <ArrowUpRight
                                size={13}
                                className="text-text-muted opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary transition-all duration-150 shrink-0"
                              />
                            )}
                          </div>

                          {link.desc && (
                            <p className="text-[11px] sm:text-xs text-text-secondary pl-3 mt-0.5 line-clamp-1 group-hover:text-text-primary/75 transition-colors">
                              {link.desc}
                            </p>
                          )}
                        </LinkComponent>
                      </li>
                    )
                  })}
                </ul>

              </section>
            ))}
          </div>

          {/* Empty Search Result */}
          {filteredSections.length === 0 && (
            <div className="py-14 text-center rounded-xl border border-dashed border-border text-text-secondary max-w-sm mx-auto">
              <p className="text-sm font-semibold text-text-primary">No pages match "{search}"</p>
              <button
                onClick={() => setSearch('')}
                className="mt-3 text-xs text-primary font-semibold hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* ── FOOTER STATS & CRAWLER NOTE ──────────────────────── */}
          <footer className="mt-16 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
            <span>
              Total indexable routes: <strong className="text-text-primary font-mono">{totalPagesCount}</strong>
            </span>
            <span>
              Search engine XML feed:&nbsp;
              <a
                href="/sitemap.xml"
                className="text-primary hover:underline font-mono"
              >
                https://tarajglobal.com/sitemap.xml
              </a>
            </span>
          </footer>

        </div>

      </main>
    </>
  )
}
