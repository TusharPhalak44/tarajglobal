import { useState, useEffect } from 'react'
import api from '../api/axios'

/**
 * Hook to fetch dynamic SEO data for public pages.
 * @param {string} entityType - The type of entity (e.g., 'page', 'blog', 'job')
 * @param {string} entityId - The ID or slug of the entity (e.g., 'home', 'about')
 * @param {object} defaultData - Fallback SEO data to use while loading or if not found in CMS
 * @returns {object} The merged SEO data ready to be passed to <SEO />
 */
export const useSEOData = (entityType, entityId, defaultData = {}) => {
  const [seoData, setSeoData] = useState(defaultData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const response = await api.get(`/seo/${entityType}/${entityId}`)
        if (response.data?.success && response.data?.data) {
          const fetched = response.data.data
          // Merge fetched data over the default data (only for fields that have values)
          setSeoData({
            title: fetched.meta_title || defaultData.title,
            description: fetched.meta_description || defaultData.description,
            keywords: fetched.meta_keywords || defaultData.keywords,
            canonical: fetched.canonical_url || defaultData.canonical,
            ogTitle: fetched.og_title || defaultData.ogTitle,
            ogDescription: fetched.og_description || defaultData.ogDescription,
            ogImage: fetched.og_image || defaultData.ogImage,
            twitterCard: defaultData.twitterCard, // Usually constant
          })
        }
      } catch (error) {
        console.error(`Failed to fetch SEO for ${entityType}/${entityId}:`, error)
      } finally {
        setLoading(false)
      }
    }

    if (entityType && entityId) {
      fetchSEO()
    } else {
      setLoading(false)
    }
  }, [entityType, entityId]) // Re-run if entity changes

  return { seoData, loading }
}
