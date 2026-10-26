/**
 * World Timezone Engine
 * Comprehensive database of all 420+ worldwide IANA timezones.
 * Provides standard business abbreviations (PST, IST, EST, CST, GMT, CET, SGT, etc.),
 * live offsets, continent categories, and instant multi-token search.
 */

// Well-known corporate & business hubs with explicit standard abbreviations and meta
export const KNOWN_TIMEZONE_MAP = {
  'America/New_York': {
    abbr: 'EST',
    name: 'Eastern Time (US & Canada)',
    region: 'New York, Toronto, Miami',
    city: 'New York',
    flag: '🇺🇸',
    synonyms: 'eastern est edt nyc new york toronto ontario miami boston dc washington',
  },
  'America/Los_Angeles': {
    abbr: 'PST',
    name: 'Pacific Time (US & Canada)',
    region: 'San Francisco, Los Angeles, Seattle',
    city: 'Los Angeles',
    flag: '🇺🇸',
    synonyms: 'pacific pst pdt california sf san francisco la los angeles seattle vancouver silicon valley',
  },
  'America/Chicago': {
    abbr: 'CST',
    name: 'Central Time (US & Canada)',
    region: 'Chicago, Dallas, Houston, Austin',
    city: 'Chicago',
    flag: '🇺🇸',
    synonyms: 'central cst cdt chicago dallas texas houston austin minneapolis',
  },
  'America/Denver': {
    abbr: 'MST',
    name: 'Mountain Time (US & Canada)',
    region: 'Denver, Salt Lake City, Calgary',
    city: 'Denver',
    flag: '🇺🇸',
    synonyms: 'mountain mst mdt denver colorado salt lake utah',
  },
  'America/Phoenix': {
    abbr: 'MST',
    name: 'Mountain Standard (No DST)',
    region: 'Phoenix, Scottsdale, Arizona',
    city: 'Phoenix',
    flag: '🇺🇸',
    synonyms: 'arizona phoenix mst no dst',
  },
  'America/Anchorage': {
    abbr: 'AKST',
    name: 'Alaska Standard Time',
    region: 'Anchorage, Juneau',
    city: 'Anchorage',
    flag: '🇺🇸',
    synonyms: 'alaska akst akdt anchorage',
  },
  'Pacific/Honolulu': {
    abbr: 'HST',
    name: 'Hawaii Standard Time',
    region: 'Honolulu, Oahu, Maui',
    city: 'Honolulu',
    flag: '🇺🇸',
    synonyms: 'hawaii hst honolulu oahu',
  },
  'America/Sao_Paulo': {
    abbr: 'BRT',
    name: 'Brasilia Standard Time',
    region: 'São Paulo, Rio de Janeiro',
    city: 'São Paulo',
    flag: '🇧🇷',
    synonyms: 'brazil brasilia sao paulo rio brt',
  },
  'America/Buenos_Aires': {
    abbr: 'ART',
    name: 'Argentina Time',
    region: 'Buenos Aires, Cordoba',
    city: 'Buenos Aires',
    flag: '🇦🇷',
    synonyms: 'argentina buenos aires art',
  },
  'America/Mexico_City': {
    abbr: 'CST',
    name: 'Central Mexico Time',
    region: 'Mexico City, Guadalajara',
    city: 'Mexico City',
    flag: '🇲🇽',
    synonyms: 'mexico cdmx cst',
  },
  'Asia/Kolkata': {
    abbr: 'IST',
    name: 'India Standard Time',
    region: 'Mumbai, New Delhi, Bengaluru, Hyderabad',
    city: 'Kolkata',
    flag: '🇮🇳',
    synonyms: 'india ist kolkata calcutta mumbai bombay delhi new delhi bangalore bengaluru hyderabad chennai pune ahmedabad',
  },
  'Asia/Calcutta': {
    abbr: 'IST',
    name: 'India Standard Time',
    region: 'Mumbai, New Delhi, Kolkata',
    city: 'Calcutta',
    flag: '🇮🇳',
    synonyms: 'india ist calcutta kolkata mumbai delhi bangalore bengaluru',
  },
  'Europe/London': {
    abbr: 'GMT',
    name: 'Greenwich Mean / British Summer Time',
    region: 'London, Dublin, Edinburgh',
    city: 'London',
    flag: '🇬🇧',
    synonyms: 'uk london britain gmt bst england scotland dublin ireland',
  },
  'Europe/Dublin': {
    abbr: 'GMT',
    name: 'Irish Standard Time',
    region: 'Dublin, Cork',
    city: 'Dublin',
    flag: '🇮🇪',
    synonyms: 'ireland dublin gmt ist',
  },
  'Europe/Paris': {
    abbr: 'CET',
    name: 'Central European Time',
    region: 'Paris, Brussels, Amsterdam',
    city: 'Paris',
    flag: '🇫🇷',
    synonyms: 'france paris cet cest europe',
  },
  'Europe/Berlin': {
    abbr: 'CET',
    name: 'Central European Time (Germany)',
    region: 'Berlin, Frankfurt, Munich',
    city: 'Berlin',
    flag: '🇩🇪',
    synonyms: 'germany berlin frankfurt munich cet cest',
  },
  'Europe/Amsterdam': {
    abbr: 'CET',
    name: 'Central European Time (Netherlands)',
    region: 'Amsterdam, Rotterdam',
    city: 'Amsterdam',
    flag: '🇳🇱',
    synonyms: 'netherlands amsterdam holland cet cest',
  },
  'Europe/Zurich': {
    abbr: 'CET',
    name: 'Central European Time (Switzerland)',
    region: 'Zurich, Geneva',
    city: 'Zurich',
    flag: '🇨🇭',
    synonyms: 'switzerland zurich geneva cet',
  },
  'Europe/Madrid': {
    abbr: 'CET',
    name: 'Central European Time (Spain)',
    region: 'Madrid, Barcelona',
    city: 'Madrid',
    flag: '🇪🇸',
    synonyms: 'spain madrid barcelona cet',
  },
  'Europe/Rome': {
    abbr: 'CET',
    name: 'Central European Time (Italy)',
    region: 'Rome, Milan',
    city: 'Rome',
    flag: '🇮🇹',
    synonyms: 'italy rome milan cet',
  },
  'Europe/Athens': {
    abbr: 'EET',
    name: 'Eastern European Time',
    region: 'Athens, Bucharest, Helsinki',
    city: 'Athens',
    flag: '🇬🇷',
    synonyms: 'greece athens eet eest',
  },
  'Asia/Dubai': {
    abbr: 'GST',
    name: 'Gulf Standard Time',
    region: 'Dubai, Abu Dhabi, Doha, Muscat',
    city: 'Dubai',
    flag: '🇦🇪',
    synonyms: 'uae emirates dubai abu dhabi gst gulf doha qatar',
  },
  'Asia/Riyadh': {
    abbr: 'AST',
    name: 'Arabia Standard Time',
    region: 'Riyadh, Jeddah, Dammam',
    city: 'Riyadh',
    flag: '🇸🇦',
    synonyms: 'saudi arabia riyadh jeddah ast',
  },
  'Asia/Singapore': {
    abbr: 'SGT',
    name: 'Singapore Standard Time',
    region: 'Singapore, Kuala Lumpur',
    city: 'Singapore',
    flag: '🇸🇬',
    synonyms: 'singapore sgt malaysia kl kuala lumpur',
  },
  'Asia/Hong_Kong': {
    abbr: 'HKT',
    name: 'Hong Kong Time',
    region: 'Hong Kong, Shenzhen',
    city: 'Hong Kong',
    flag: '🇭🇰',
    synonyms: 'hong kong hkt china',
  },
  'Asia/Tokyo': {
    abbr: 'JST',
    name: 'Japan Standard Time',
    region: 'Tokyo, Osaka, Kyoto',
    city: 'Tokyo',
    flag: '🇯🇵',
    synonyms: 'japan tokyo jst osaka',
  },
  'Asia/Seoul': {
    abbr: 'KST',
    name: 'Korea Standard Time',
    region: 'Seoul, Busan',
    city: 'Seoul',
    flag: '🇰🇷',
    synonyms: 'korea seoul kst south korea',
  },
  'Asia/Shanghai': {
    abbr: 'CST',
    name: 'China Standard Time',
    region: 'Shanghai, Beijing, Shenzhen',
    city: 'Shanghai',
    flag: '🇨🇳',
    synonyms: 'china beijing shanghai cst',
  },
  'Asia/Bangkok': {
    abbr: 'ICT',
    name: 'Indochina Time',
    region: 'Bangkok, Hanoi, Ho Chi Minh',
    city: 'Bangkok',
    flag: '🇹🇭',
    synonyms: 'thailand bangkok vietnam hanoi ict',
  },
  'Asia/Jakarta': {
    abbr: 'WIB',
    name: 'Western Indonesia Time',
    region: 'Jakarta, Bali, Surabaya',
    city: 'Jakarta',
    flag: '🇮🇩',
    synonyms: 'indonesia jakarta bali wib',
  },
  'Asia/Karachi': {
    abbr: 'PKT',
    name: 'Pakistan Standard Time',
    region: 'Karachi, Islamabad, Lahore',
    city: 'Karachi',
    flag: '🇵🇰',
    synonyms: 'pakistan karachi islamabad lahore pkt',
  },
  'Asia/Dhaka': {
    abbr: 'BST',
    name: 'Bangladesh Standard Time',
    region: 'Dhaka, Chittagong',
    city: 'Dhaka',
    flag: '🇧🇩',
    synonyms: 'bangladesh dhaka bst',
  },
  'Australia/Sydney': {
    abbr: 'AEST',
    name: 'Australian Eastern Time',
    region: 'Sydney, Melbourne, Brisbane, Canberra',
    city: 'Sydney',
    flag: '🇦🇺',
    synonyms: 'australia sydney melbourne brisbane aest aedt nsw',
  },
  'Australia/Perth': {
    abbr: 'AWST',
    name: 'Australian Western Time',
    region: 'Perth',
    city: 'Perth',
    flag: '🇦🇺',
    synonyms: 'perth awst western australia',
  },
  'Pacific/Auckland': {
    abbr: 'NZST',
    name: 'New Zealand Standard Time',
    region: 'Auckland, Wellington, Christchurch',
    city: 'Auckland',
    flag: '🇳🇿',
    synonyms: 'new zealand auckland wellington nzst nzdt',
  },
  'Africa/Johannesburg': {
    abbr: 'SAST',
    name: 'South Africa Standard Time',
    region: 'Johannesburg, Cape Town, Pretoria',
    city: 'Johannesburg',
    flag: '🇿🇦',
    synonyms: 'south africa johannesburg cape town sast',
  },
  'Africa/Cairo': {
    abbr: 'EET',
    name: 'Eastern European Time (Egypt)',
    region: 'Cairo, Alexandria',
    city: 'Cairo',
    flag: '🇪🇬',
    synonyms: 'egypt cairo eet',
  },
  'Africa/Nairobi': {
    abbr: 'EAT',
    name: 'East Africa Time',
    region: 'Nairobi, Mombasa',
    city: 'Nairobi',
    flag: '🇰🇪',
    synonyms: 'kenya nairobi eat east africa',
  },
  'Africa/Lagos': {
    abbr: 'WAT',
    name: 'West Africa Time',
    region: 'Lagos, Abuja',
    city: 'Lagos',
    flag: '🇳🇬',
    synonyms: 'nigeria lagos wat west africa',
  },
}

// Top business hubs for instant 1-click access (Zero horizontal scroll needed!)
export const POPULAR_BUSINESS_HUBS = [
  KNOWN_TIMEZONE_MAP['Asia/Kolkata'],
  KNOWN_TIMEZONE_MAP['America/New_York'],
  KNOWN_TIMEZONE_MAP['America/Los_Angeles'],
  KNOWN_TIMEZONE_MAP['America/Chicago'],
  KNOWN_TIMEZONE_MAP['Europe/London'],
  KNOWN_TIMEZONE_MAP['Europe/Paris'],
  KNOWN_TIMEZONE_MAP['Asia/Dubai'],
  KNOWN_TIMEZONE_MAP['Asia/Singapore'],
  KNOWN_TIMEZONE_MAP['Asia/Tokyo'],
  KNOWN_TIMEZONE_MAP['Australia/Sydney'],
].map((item) => {
  // Find key for item
  const key = Object.keys(KNOWN_TIMEZONE_MAP).find(
    (k) => KNOWN_TIMEZONE_MAP[k] === item
  )
  return {
    ...item,
    iana: key,
  }
})

// Region category mapping
const CATEGORY_MAP = {
  America: 'americas',
  US: 'americas',
  Canada: 'americas',
  Europe: 'europe',
  Asia: 'asia',
  Australia: 'pacific',
  Pacific: 'pacific',
  Africa: 'africa',
  Indian: 'africa',
  Atlantic: 'africa',
  Antarctica: 'other',
  UTC: 'global',
}

// Compute live UTC offset string (e.g. "UTC+05:30", "UTC-05:00")
export const getLiveUtcOffset = (iana, date = new Date()) => {
  try {
    const f = new Intl.DateTimeFormat('en-US', {
      timeZone: iana,
      timeZoneName: 'longOffset',
    })
    const part = f.formatToParts(date).find((p) => p.type === 'timeZoneName')
    if (part?.value) {
      return part.value.replace('GMT', 'UTC')
    }
  } catch {
    // fallback
  }
  return 'UTC'
}

// Compute live clock formatted string (e.g. "07:15 PM")
export const getLiveClock = (iana, date = new Date()) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: iana,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  } catch {
    return ''
  }
}

// Cached full database of all 420+ timezones
let cachedAllWorldTimezones = null

export const getAllWorldTimezones = () => {
  if (cachedAllWorldTimezones) return cachedAllWorldTimezones

  const rawZones =
    typeof Intl !== 'undefined' && Intl.supportedValuesOf
      ? Intl.supportedValuesOf('timeZone')
      : [
          'America/New_York',
          'America/Los_Angeles',
          'America/Chicago',
          'America/Denver',
          'Asia/Kolkata',
          'Europe/London',
          'Europe/Paris',
          'Asia/Dubai',
          'Asia/Singapore',
          'Asia/Tokyo',
          'Australia/Sydney',
        ]

  // Ensure Asia/Kolkata and UTC are explicitly included
  const allUnique = Array.from(new Set(['Asia/Kolkata', ...rawZones, 'UTC']))

  cachedAllWorldTimezones = allUnique.map((iana) => {
    const known = KNOWN_TIMEZONE_MAP[iana]
    const parts = iana.split('/')
    const prefix = parts[0] || 'Global'
    const rawCity = (parts[parts.length - 1] || iana).replace(/_/g, ' ')
    const category = CATEGORY_MAP[prefix] || 'other'
    const utc = getLiveUtcOffset(iana)

    // Abbreviation fallback
    let abbr = known?.abbr
    if (!abbr) {
      if (iana === 'UTC') {
        abbr = 'UTC'
      } else {
        // Try getting short timeZoneName
        try {
          const f = new Intl.DateTimeFormat('en-US', {
            timeZone: iana,
            timeZoneName: 'short',
          })
          const p = f.formatToParts(new Date()).find((x) => x.type === 'timeZoneName')
          const shortName = p?.value
          // If shortName is like "GMT+5:30", use UTC+5:30
          abbr = shortName && !shortName.startsWith('GMT') ? shortName : utc
        } catch {
          abbr = utc
        }
      }
    }

    const name = known?.name || `${prefix} - ${rawCity}`
    const region = known?.region || rawCity
    const city = known?.city || rawCity
    const flag =
      known?.flag ||
      (category === 'americas'
        ? '🌎'
        : category === 'europe'
        ? '🌍'
        : category === 'asia'
        ? '🌏'
        : category === 'pacific'
        ? '🌊'
        : '🌐')

    const searchTokens = `${iana} ${abbr} ${name} ${region} ${city} ${utc} ${
      known?.synonyms || ''
    }`.toLowerCase()

    return {
      iana,
      abbr,
      name,
      region,
      city,
      continent: prefix,
      category,
      utc,
      flag,
      searchTokens,
    }
  })

  return cachedAllWorldTimezones
}

/**
 * Filter timezones by search query and category tab with smart relevance ranking
 */
export const filterTimezones = (query = '', category = 'all') => {
  const all = getAllWorldTimezones()
  const q = query.trim().toLowerCase()

  const matched = all.filter((tz) => {
    // Category match
    if (category !== 'all' && tz.category !== category) {
      return false
    }

    if (!q) return true
    return tz.searchTokens.includes(q)
  })

  if (!q) {
    // If no query, sort popular hubs first, then alphabetical by name
    return matched.sort((a, b) => {
      const aIsHub = Boolean(KNOWN_TIMEZONE_MAP[a.iana])
      const bIsHub = Boolean(KNOWN_TIMEZONE_MAP[b.iana])
      if (aIsHub && !bIsHub) return -1
      if (!aIsHub && bIsHub) return 1
      return a.name.localeCompare(b.name)
    })
  }

  // Relevance ranking when search query is present
  const score = (tz) => {
    let s = 0
    const abbr = tz.abbr.toLowerCase()
    const city = tz.city.toLowerCase()
    const name = tz.name.toLowerCase()
    const iana = tz.iana.toLowerCase()
    const isHub = Boolean(KNOWN_TIMEZONE_MAP[tz.iana])

    if (isHub) s += 200
    if (abbr === q) s += 300
    else if (abbr.startsWith(q)) s += 150
    if (city === q) s += 250
    else if (city.startsWith(q)) s += 120
    if (iana.includes(q)) s += 100
    if (name.includes(q)) s += 80

    return s
  }

  return matched.sort((a, b) => score(b) - score(a))
}
