import { useState, useEffect } from 'react'
import api from '../api/axios'

/**
 * Hook to fetch dynamic SEO data for public pages.
 * - Guarantees immediate fallback to page-specific defaultData (never homepage metadata).
 * - Connects to the CMS SEO API (/api/seo/:entityType/:entityId).
 * - Merges admin-configured CMS metadata over page defaults.
 * - Handles route transitions without leaking stale metadata.
 * 
 * @param {string} entityType - The type of entity (e.g., 'page', 'blog', 'job')
 * @param {string} entityId - The ID or slug of the entity (e.g., 'home', 'contact', 'careers')
 * @param {object} defaultData - Fallback SEO data to use while loading or if not found in CMS
 * @returns {object} The merged SEO data ready to be passed to <SEO />
 */
export const useSEOData = (entityType, entityId, defaultData = {}) => {
  const [seoData, setSeoData] = useState(defaultData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Immediately reset to the current page's defaultData when entityId/entityType changes
    setSeoData(defaultData)
    setLoading(true)

    let isMounted = true

    const fetchSEO = async () => {
      try {
        const response = await api.get(`/seo/${entityType}/${entityId}`)
        if (!isMounted) return

        if (response.data?.success && response.data?.data) {
          const fetched = response.data.data
          // Merge fetched CMS metadata over default data
          setSeoData({
            ...defaultData,
            title: fetched.meta_title || defaultData.title,
            description: fetched.meta_description || defaultData.description,
            keywords: fetched.meta_keywords || defaultData.keywords,
            canonical: fetched.canonical_url || defaultData.canonical,
            ogTitle: fetched.og_title || defaultData.ogTitle || fetched.meta_title || defaultData.title,
            ogDescription: fetched.og_description || defaultData.ogDescription || fetched.meta_description || defaultData.description,
            ogImage: fetched.og_image || defaultData.ogImage,
            twitterTitle: fetched.twitter_title || fetched.og_title || defaultData.twitterTitle || defaultData.ogTitle,
            twitterDescription: fetched.twitter_description || fetched.og_description || defaultData.twitterDescription || defaultData.ogDescription,
            twitterImage: fetched.twitter_image || fetched.og_image || defaultData.twitterImage || defaultData.ogImage,
            twitterCard: defaultData.twitterCard || 'summary_large_image',
            robots: fetched.robots || defaultData.robots,
            schemaJson: fetched.structured_data || defaultData.schemaJson,
          })
        }
      } catch (error) {
        // Network or DB offline: retain clean defaultData
        if (process.env.NODE_ENV !== 'production') {
          console.debug(`[useSEOData] Using local defaults for ${entityType}/${entityId}`)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (entityType && entityId) {
      fetchSEO()
    } else {
      setLoading(false)
    }

    return () => {
      isMounted = false
    }
  }, [entityType, entityId])

  return { seoData, loading }
}

export default useSEOData
