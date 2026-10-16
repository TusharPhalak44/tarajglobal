import express from 'express'

const router = express.Router()

let memoryCache = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

router.get('/stats', async (req, res) => {
  const now = Date.now()
  if (memoryCache && (now - cacheTimestamp < CACHE_TTL_MS)) {
    return res.json(memoryCache)
  }

  const primaryUrl = process.env.TGS_AUDIENCE_API_URL || 'https://tgstechinfo.net/api/audience/stats'
  const devUrl = 'http://localhost:5000/api/audience/stats'

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4500)

    let response
    try {
      response = await fetch(primaryUrl, {
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      })
    } catch (primaryErr) {
      if (process.env.NODE_ENV !== 'production') {
        response = await fetch(devUrl, {
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        })
      } else {
        throw primaryErr
      }
    } finally {
      clearTimeout(timeoutId)
    }

    if (!response || !response.ok) {
      throw new Error(`Upstream returned ${response ? response.status : 'no response'}`)
    }

    const data = await response.json()
    memoryCache = data
    cacheTimestamp = now
    return res.json(data)
  } catch (error) {
    if (memoryCache) {
      return res.json(memoryCache)
    }

    // Comprehensive Fallback Audience Data Snapshot
    const fallbackData = {
      success: true,
      cached: true,
      fallback: true,
      data: {
        matching_contacts: 80207024,
        matching_companies: 25077972,
        matching_countries_count: 37,
        matching_industries_count: 11,
        region_breakdown: [
          { region_id: 2, region_name: "North America", region_code: "NORTH_AMERICA", contact_count: 26499872, company_count: 8281759, percentage: 33 },
          { region_id: 4, region_name: "EMEA", region_code: "EMEA", contact_count: 25303686, company_count: 7912882, percentage: 31.5 },
          { region_id: 5, region_name: "APAC", region_code: "APAC", contact_count: 19902358, company_count: 6223341, percentage: 24.8 },
          { region_id: 3, region_name: "LATAM", region_code: "LATAM", contact_count: 8501108, company_count: 2659990, percentage: 10.6 }
        ],
        country_breakdown: [
          { country_id: 1, country_name: "United States", iso_code: "US", iso3_code: "USA", lat: "37.090000", lon: "-95.712000", contact_count: 23499897, company_count: 7343909, percentage: 29.3, region: "NORTH_AMERICA" },
          { country_id: 13, country_name: "India", iso_code: "IN", iso3_code: "IND", lat: "20.593000", lon: "78.962000", contact_count: 9799922, company_count: 3062657, percentage: 12.2, region: "APAC" },
          { country_id: 24, country_name: "United Kingdom", iso_code: "GB", iso3_code: "GBR", lat: "55.378000", lon: "-3.435000", contact_count: 5740371, company_count: 1794119, percentage: 7.2, region: "EMEA" },
          { country_id: 26, country_name: "Germany", iso_code: "DE", iso3_code: "DEU", lat: "51.165000", lon: "10.451000", contact_count: 4890024, company_count: 1528357, percentage: 6.1, region: "EMEA" },
          { country_id: 29, country_name: "France", iso_code: "FR", iso3_code: "FRA", lat: "46.227000", lon: "2.213000", contact_count: 3508067, company_count: 1096518, percentage: 4.4, region: "EMEA" },
          { country_id: 3, country_name: "Brazil", iso_code: "BR", iso3_code: "BRA", lat: "-14.235000", lon: "-51.925000", contact_count: 3136969, company_count: 980475, percentage: 3.9, region: "LATAM" },
          { country_id: 2, country_name: "Canada", iso_code: "CA", iso3_code: "CAN", lat: "56.130000", lon: "-106.346000", contact_count: 2999975, company_count: 937850, percentage: 3.7, region: "NORTH_AMERICA" },
          { country_id: 14, country_name: "Australia", iso_code: "AU", iso3_code: "AUS", lat: "-25.274000", lon: "133.775000", contact_count: 2900154, company_count: 906566, percentage: 3.6, region: "APAC" },
          { country_id: 4, country_name: "Mexico", iso_code: "MX", iso3_code: "MEX", lat: "23.634000", lon: "-102.552000", contact_count: 2479083, company_count: 774935, percentage: 3.1, region: "LATAM" },
          { country_id: 16, country_name: "Japan", iso_code: "JP", iso3_code: "JPN", lat: "36.204000", lon: "138.252000", contact_count: 2200075, company_count: 687846, percentage: 2.7, region: "APAC" },
          { country_id: 30, country_name: "Netherlands", iso_code: "NL", iso3_code: "NLD", lat: "52.132000", lon: "5.291000", contact_count: 1913575, company_count: 598382, percentage: 2.4, region: "EMEA" },
          { country_id: 32, country_name: "Italy", iso_code: "IT", iso3_code: "ITA", lat: "41.871000", lon: "12.567000", contact_count: 1594645, company_count: 498843, percentage: 2.0, region: "EMEA" },
          { country_id: 31, country_name: "Spain", iso_code: "ES", iso3_code: "ESP", lat: "40.463000", lon: "-3.749000", contact_count: 1488365, company_count: 465449, percentage: 1.9, region: "EMEA" },
          { country_id: 15, country_name: "Singapore", iso_code: "SG", iso3_code: "SGP", lat: "1.352000", lon: "103.819000", contact_count: 1450207, company_count: 453565, percentage: 1.8, region: "APAC" }
        ],
        job_level_breakdown: [
          { job_level_name: "CXO / C-Suite", percentage: 12 },
          { job_level_name: "Vice President (VP)", percentage: 14 },
          { job_level_name: "Director", percentage: 24 },
          { job_level_name: "Manager / Lead", percentage: 28 },
          { job_level_name: "Senior Practitioner", percentage: 16 },
          { job_level_name: "Entry Level", percentage: 6 }
        ]
      }
    }
    return res.json(fallbackData)
  }
})

export default router
