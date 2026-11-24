import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const DEFAULT_META = {
  title: 'Taraj Global | B2B Lead Generation & Demand Generation Agency',
  description: 'Scale your B2B sales pipeline with Taraj Global. We deliver high-impact B2B lead generation, account-based marketing (ABM), appointment setting, and verified B2B data.',
  keywords: 'B2B lead generation, demand generation, account-based marketing, appointment setting, B2B data, BANT qualification, MQL, SQL, email marketing, content syndication',
  siteUrl: 'https://tarajglobal.com',
  defaultImage: 'https://tarajglobal.com/OnlyTG-%203.png',
  siteName: 'Taraj Global',
  twitterHandle: '@tarajglobal'
}

/**
 * Reusable SEO Component using react-helmet-async with active DOM synchronization.
 * 
 * - Supports Standard Meta tags, Canonical URLs, Robots directives, Open Graph,
 *   Twitter Cards, and JSON-LD Structured Data.
 * - Actively synchronizes the DOM <head> on client-side route changes to resolve
 *   React 19 client-side metadata accumulation and guarantee that internal pages
 *   never display stale homepage metadata.
 * - Renders <Helmet> tags for static build prerendering and SSR.
 */
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  robots,
  noIndex = false,
  schemaJson,
  isFromCMS = false
}) => {
  const fullTitle = title 
    ? (isFromCMS ? title : (title.includes('Taraj Global') || title.includes('TaRaj Global') ? title : `${title} | Taraj Global`))
    : DEFAULT_META.title

  const metaDescription = description || DEFAULT_META.description
  const metaKeywords = keywords || DEFAULT_META.keywords

  // Ensure canonical URL is always page-specific and NEVER falls back to homepage on subroutes
  const canonicalUrl = canonical 
    ? (canonical.startsWith('http://') || canonical.startsWith('https://')
        ? canonical 
        : `${DEFAULT_META.siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
    : (typeof window !== 'undefined' && window.location.pathname && window.location.pathname !== '/'
        ? `${DEFAULT_META.siteUrl}${window.location.pathname.replace(/\/+$/, '')}`
        : DEFAULT_META.siteUrl)

  const metaOgTitle = ogTitle || fullTitle
  const metaOgDescription = ogDescription || metaDescription
  const metaOgImage = ogImage 
    ? (ogImage.startsWith('http://') || ogImage.startsWith('https://')
        ? ogImage 
        : `${DEFAULT_META.siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
    : DEFAULT_META.defaultImage

  const metaTwitterTitle = twitterTitle || metaOgTitle
  const metaTwitterDescription = twitterDescription || metaOgDescription
  const metaTwitterImage = twitterImage 
    ? (twitterImage.startsWith('http://') || twitterImage.startsWith('https://')
        ? twitterImage 
        : `${DEFAULT_META.siteUrl}${twitterImage.startsWith('/') ? '' : '/'}${twitterImage}`)
    : metaOgImage

  const isNoIndex = noIndex || (robots && robots.toLowerCase().includes('noindex'))
  const robotsDirective = isNoIndex
    ? (robots && robots.includes('noindex') ? robots : 'noindex, nofollow')
    : (robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

  // Active client-side DOM synchronization to prevent stale homepage metadata
  useEffect(() => {
    if (typeof document === 'undefined') return

    // 1. Update document.title immediately
    document.title = fullTitle
    const titleTag = document.querySelector('head > title')
    if (titleTag) {
      titleTag.textContent = fullTitle
      titleTag.removeAttribute('data-prerender')
    }

    // Helper to safely set a meta tag, update in place, and purge stale duplicates
    const syncMetaTag = (attrName, attrValue, content) => {
      if (content === undefined || content === null) return
      const selector = `meta[${attrName}="${attrValue}"]`
      const matches = document.querySelectorAll(selector)
      if (matches.length > 0) {
        matches[0].setAttribute('content', content)
        matches[0].removeAttribute('data-prerender')
        // Remove duplicate tags from previous page navigations
        for (let i = 1; i < matches.length; i++) {
          matches[i].remove()
        }
      } else {
        const tag = document.createElement('meta')
        tag.setAttribute(attrName, attrValue)
        tag.setAttribute('content', content)
        document.head.appendChild(tag)
      }
    }

    // 2. Standard Meta Tags
    syncMetaTag('name', 'description', metaDescription)
    syncMetaTag('name', 'keywords', metaKeywords)
    syncMetaTag('name', 'robots', robotsDirective)

    // 3. Canonical Link Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]')
    if (isNoIndex) {
      if (canonicalTag) canonicalTag.remove()
    } else {
      if (!canonicalTag) {
        canonicalTag = document.createElement('link')
        canonicalTag.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalTag)
      }
      canonicalTag.setAttribute('href', canonicalUrl)
      canonicalTag.removeAttribute('data-prerender')
      // Remove any duplicate canonical tags
      const extraCanonicals = document.querySelectorAll('link[rel="canonical"]')
      for (let i = 1; i < extraCanonicals.length; i++) {
        extraCanonicals[i].remove()
      }
    }

    // 4. Open Graph Tags
    syncMetaTag('property', 'og:site_name', DEFAULT_META.siteName)
    syncMetaTag('property', 'og:title', metaOgTitle)
    syncMetaTag('property', 'og:description', metaOgDescription)
    syncMetaTag('property', 'og:type', ogType)
    syncMetaTag('property', 'og:url', canonicalUrl)
    syncMetaTag('property', 'og:image', metaOgImage)
    syncMetaTag('property', 'og:locale', 'en_US')

    // 5. Twitter Card Tags
    syncMetaTag('name', 'twitter:card', twitterCard)
    syncMetaTag('name', 'twitter:site', DEFAULT_META.twitterHandle)
    syncMetaTag('name', 'twitter:creator', DEFAULT_META.twitterHandle)
    syncMetaTag('name', 'twitter:title', metaTwitterTitle)
    syncMetaTag('name', 'twitter:description', metaTwitterDescription)
    syncMetaTag('name', 'twitter:image', metaTwitterImage)

    // 6. JSON-LD Structured Data Schema Tag
    let schemaTag = document.querySelector('script[data-managed="seo-schema"]')
    if (schemaJson) {
      if (!schemaTag) {
        schemaTag = document.createElement('script')
        schemaTag.setAttribute('type', 'application/ld+json')
        schemaTag.setAttribute('data-managed', 'seo-schema')
        document.head.appendChild(schemaTag)
      }
      schemaTag.textContent = typeof schemaJson === 'string' ? schemaJson : JSON.stringify(schemaJson)
    } else if (schemaTag) {
      schemaTag.remove()
    }
  }, [
    fullTitle,
    metaDescription,
    metaKeywords,
    canonicalUrl,
    metaOgTitle,
    metaOgDescription,
    metaOgImage,
    metaTwitterTitle,
    metaTwitterDescription,
    metaTwitterImage,
    robotsDirective,
    isNoIndex,
    ogType,
    twitterCard,
    schemaJson
  ])

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robotsDirective} />
      {!isNoIndex && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={DEFAULT_META.siteName} />
      <meta property="og:title" content={metaOgTitle} />
      <meta property="og:description" content={metaOgDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={DEFAULT_META.twitterHandle} />
      <meta name="twitter:creator" content={DEFAULT_META.twitterHandle} />
      <meta name="twitter:title" content={metaTwitterTitle} />
      <meta name="twitter:description" content={metaTwitterDescription} />
      <meta name="twitter:image" content={metaTwitterImage} />

      {/* Structured Data (Schema.org JSON-LD) */}
      {schemaJson && (
        <script type="application/ld+json">
          {typeof schemaJson === 'string' ? schemaJson : JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
