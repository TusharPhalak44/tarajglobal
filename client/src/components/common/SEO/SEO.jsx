import React from 'react'
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
 * Reusable SEO Component using react-helmet-async.
 * Supports standard Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data schema.
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
  noIndex = false,
  schemaJson
}) => {
  const fullTitle = title 
    ? (title.includes('Taraj Global') ? title : `${title} | Taraj Global`)
    : DEFAULT_META.title

  const metaDescription = description || DEFAULT_META.description
  const metaKeywords = keywords || DEFAULT_META.keywords
  const canonicalUrl = canonical 
    ? (canonical.startsWith('http') ? canonical : `${DEFAULT_META.siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
    : DEFAULT_META.siteUrl
  const metaOgTitle = ogTitle || fullTitle
  const metaOgDescription = ogDescription || metaDescription
  const metaOgImage = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${DEFAULT_META.siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
    : DEFAULT_META.defaultImage

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      <link rel="canonical" href={canonicalUrl} />

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
      <meta name="twitter:title" content={metaOgTitle} />
      <meta name="twitter:description" content={metaOgDescription} />
      <meta name="twitter:image" content={metaOgImage} />

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

