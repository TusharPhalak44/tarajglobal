/**
 * Audience API Service with 3-Tier Fallback Strategy
 * Tier 1: Direct cross-origin request to TGS Tech Info backend: https://tgstechinfo.net/api/audience/stats
 * Tier 2: Taraj backend server proxy: /api/audience/stats
 * Tier 3: Instant baseline snapshot + LocalStorage cache (zero layout shift, offline resilience)
 */

export const BASELINE_AUDIENCE_DATA = {
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
    { country_id: 15, country_name: "Singapore", iso_code: "SG", iso3_code: "SGP", lat: "1.352000", lon: "103.819000", contact_count: 1450207, company_count: 453565, percentage: 1.8, region: "APAC" },
    { country_id: 20, country_name: "South Korea", iso_code: "KR", iso3_code: "KOR", lat: "35.907000", lon: "127.766000", contact_count: 1100197, company_count: 344192, percentage: 1.4, region: "APAC" },
    { country_id: 28, country_name: "Switzerland", iso_code: "CH", iso3_code: "CHE", lat: "46.818000", lon: "8.227000", contact_count: 1042148, company_count: 326100, percentage: 1.3, region: "EMEA" },
    { country_id: 33, country_name: "Sweden", iso_code: "SE", iso3_code: "SWE", lat: "60.128000", lon: "18.643000", contact_count: 978354, company_count: 306173, percentage: 1.2, region: "EMEA" },
    { country_id: 5, country_name: "Colombia", iso_code: "CO", iso3_code: "COL", lat: "4.570000", lon: "-74.297000", contact_count: 931080, company_count: 291203, percentage: 1.2, region: "LATAM" },
    { country_id: 39, country_name: "United Arab Emirates", iso_code: "AE", iso3_code: "ARE", lat: "23.424000", lon: "53.847000", contact_count: 903879, company_count: 282744, percentage: 1.1, region: "EMEA" },
    { country_id: 17, country_name: "Indonesia", iso_code: "ID", iso3_code: "IDN", lat: "-0.789000", lon: "113.921000", contact_count: 850253, company_count: 266098, percentage: 1.1, region: "APAC" },
    { country_id: 27, country_name: "Austria", iso_code: "AT", iso3_code: "AUT", lat: "47.516000", lon: "14.550000", contact_count: 765644, company_count: 239671, percentage: 1.0, region: "EMEA" },
    { country_id: 40, country_name: "Saudi Arabia", iso_code: "SA", iso3_code: "SAU", lat: "23.885000", lon: "45.079000", contact_count: 723186, company_count: 226300, percentage: 0.9, region: "EMEA" },
    { country_id: 18, country_name: "Malaysia", iso_code: "MY", iso3_code: "MYS", lat: "4.210000", lon: "101.975000", contact_count: 620264, company_count: 194239, percentage: 0.8, region: "APAC" },
    { country_id: 6, country_name: "Peru", iso_code: "PE", iso3_code: "PER", lat: "-9.189000", lon: "-75.015000", contact_count: 586924, company_count: 183635, percentage: 0.7, region: "LATAM" },
    { country_id: 41, country_name: "South Africa", iso_code: "ZA", iso3_code: "ZAF", lat: "-30.559000", lon: "22.937000", contact_count: 584963, company_count: 183142, percentage: 0.7, region: "EMEA" },
    { country_id: 19, country_name: "Philippines", iso_code: "PH", iso3_code: "PHL", lat: "12.879000", lon: "121.774000", contact_count: 510388, company_count: 159983, percentage: 0.6, region: "APAC" },
    { country_id: 7, country_name: "Chile", iso_code: "CL", iso3_code: "CHL", lat: "-35.675000", lon: "-71.542000", contact_count: 475738, company_count: 148939, percentage: 0.6, region: "LATAM" },
    { country_id: 34, country_name: "Norway", iso_code: "NO", iso3_code: "NOR", lat: "60.472000", lon: "8.468000", contact_count: 446920, company_count: 140043, percentage: 0.6, region: "EMEA" },
    { country_id: 8, country_name: "Argentina", iso_code: "AR", iso3_code: "ARG", lat: "-38.416000", lon: "-63.616000", contact_count: 415059, company_count: 129960, percentage: 0.5, region: "LATAM" },
    { country_id: 35, country_name: "Denmark", iso_code: "DK", iso3_code: "DNK", lat: "56.263000", lon: "9.501000", contact_count: 404335, company_count: 126884, percentage: 0.5, region: "EMEA" },
    { country_id: 21, country_name: "New Zealand", iso_code: "NZ", iso3_code: "NZL", lat: "-40.900000", lon: "174.885000", contact_count: 320390, company_count: 100595, percentage: 0.4, region: "APAC" },
    { country_id: 36, country_name: "Finland", iso_code: "FI", iso3_code: "FIN", lat: "61.924000", lon: "25.748000", contact_count: 319210, company_count: 100157, percentage: 0.4, region: "EMEA" },
    { country_id: 9, country_name: "Costa Rica", iso_code: "CR", iso3_code: "CRI", lat: "9.748000", lon: "-83.753000", contact_count: 192409, company_count: 60470, percentage: 0.2, region: "LATAM" },
    { country_id: 22, country_name: "Vietnam", iso_code: "VN", iso3_code: "VNM", lat: "14.058000", lon: "108.277000", contact_count: 150508, company_count: 47600, percentage: 0.2, region: "APAC" },
    { country_id: 11, country_name: "Ecuador", iso_code: "EC", iso3_code: "ECU", lat: "-1.831000", lon: "-78.183000", contact_count: 131585, company_count: 41546, percentage: 0.2, region: "LATAM" },
    { country_id: 10, country_name: "Venezuela", iso_code: "VE", iso3_code: "VEN", lat: "6.423000", lon: "-66.589000", contact_count: 96330, company_count: 30616, percentage: 0.1, region: "LATAM" },
    { country_id: 12, country_name: "Bolivia", iso_code: "BO", iso3_code: "BOL", lat: "-16.290000", lon: "-63.588000", contact_count: 55931, company_count: 18211, percentage: 0.1, region: "LATAM" }
  ],
  job_level_breakdown: [
    { job_level_name: "CXO / C-Suite", percentage: 12 },
    { job_level_name: "Vice President (VP)", percentage: 14 },
    { job_level_name: "Director", percentage: 24 },
    { job_level_name: "Manager / Lead", percentage: 28 },
    { job_level_name: "Senior Practitioner", percentage: 16 },
    { job_level_name: "Entry Level", percentage: 6 }
  ],
  updated_at: new Date().toISOString()
}

const STORAGE_CACHE_KEY = 'taraj_audience_stats_cache'
const CACHE_MAX_AGE_MS = 10 * 60 * 1000 // 10 minutes

/**
 * Convert ISO2 Country code to Flag Emoji
 */
export function getCountryFlag(isoCode) {
  if (!isoCode || typeof isoCode !== 'string' || isoCode.length !== 2) return '🌐'
  return String.fromCodePoint(...[...isoCode.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
}

/**
 * Format numbers compactly (e.g. 80207024 -> "80.2M+", 4250000 -> "4.25M+")
 */
export function formatAudienceCount(num, decimals = 1) {
  if (num === null || num === undefined) return '0'
  const n = Number(num)
  if (isNaN(n)) return '0'
  if (n >= 1_000_000_000) {
    return `${(n / 1_000_000_000).toFixed(decimals)}B+`
  }
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(decimals)}M+`
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(decimals)}K+`
  }
  return n.toLocaleString()
}

/**
 * Formats precise number with commas (e.g. 23,499,897)
 */
export function formatFullNumber(num) {
  if (num === null || num === undefined) return '0'
  const n = Number(num)
  if (isNaN(n)) return '0'
  return n.toLocaleString()
}

/**
 * Get initial snapshot from localStorage or fallback to baseline
 */
export function getInitialAudienceData() {
  if (typeof window === 'undefined') return BASELINE_AUDIENCE_DATA
  try {
    const cached = localStorage.getItem(STORAGE_CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (parsed && parsed.data && parsed.data.matching_contacts) {
        return parsed.data
      }
    }
  } catch (err) {
    console.warn('[AudienceApi] Failed to parse local audience cache:', err)
  }
  return BASELINE_AUDIENCE_DATA
}

/**
 * 3-Tier Fetch Strategy
 */
export async function fetchAudienceStats() {
  const directUrl = 'https://tgstechinfo.net/api/audience/stats'
  const proxyUrl = '/api/audience/stats'

  // Tier 1: Direct request to TGS Tech Info backend API
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(directUrl, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    })
    clearTimeout(timeout)

    if (response.ok) {
      const json = await response.json()
      if (json && (json.data || json.matching_contacts)) {
        const payload = json.data || json
        enrichCountryData(payload)
        saveToCache(payload)
        return { data: payload, isLive: true, source: 'tgstechinfo-direct' }
      }
    }
  } catch (err) {
    // console.info('[AudienceApi] Direct endpoint unavailable, attempting Tier 2 proxy...', err.message)
  }

  // Tier 2: Taraj backend proxy
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(proxyUrl, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    })
    clearTimeout(timeout)

    if (response.ok) {
      const json = await response.json()
      if (json && (json.data || json.matching_contacts)) {
        const payload = json.data || json
        enrichCountryData(payload)
        saveToCache(payload)
        return { data: payload, isLive: true, source: 'taraj-proxy' }
      }
    }
  } catch (err) {
    // console.warn('[AudienceApi] Proxy endpoint unavailable, falling back to Tier 3 baseline...', err.message)
  }

  // Tier 3: Instant baseline snapshot from cache or memory
  const cachedData = getInitialAudienceData()
  return { data: cachedData, isLive: false, source: 'baseline-cache' }
}

function enrichCountryData(payload) {
  if (!payload || !Array.isArray(payload.country_breakdown)) return
  payload.country_breakdown.forEach(country => {
    if (!country.region) {
      // Map region code if missing
      const lat = parseFloat(country.lat)
      const lon = parseFloat(country.lon)
      if (lon < -30 && lat > 15) country.region = 'NORTH_AMERICA'
      else if (lon < -30 && lat <= 15) country.region = 'LATAM'
      else if (lon >= -30 && lon < 60) country.region = 'EMEA'
      else country.region = 'APAC'
    }
  })
}

function saveToCache(data) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    // quota exceeded or storage disabled
  }
}
