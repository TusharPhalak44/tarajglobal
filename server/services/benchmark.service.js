/**
 * Benchmark Email Integration Service
 * Manages marketing contact lists and automatically synchronizes
 * leads, inquiries, chatbot contacts, and job applicants with Benchmark Email.
 */

const BENCHMARK_API_BASE = 'https://clientapi.benchmarkemail.com'

/**
 * Check if Benchmark Email API is configured in the environment
 */
export const isBenchmarkConfigured = () => {
  return Boolean(process.env.BENCHMARK_API_KEY && process.env.BENCHMARK_API_KEY.trim())
}

/**
 * Make an authenticated HTTP request to Benchmark Email REST API
 */
const benchmarkRequest = async (endpoint, method = 'GET', body = null) => {
  const apiKey = (process.env.BENCHMARK_API_KEY || '').trim()
  if (!apiKey) {
    throw new Error('BENCHMARK_API_KEY is not configured in server/.env')
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${BENCHMARK_API_BASE}${cleanEndpoint}`

  const headers = {
    'AuthToken': apiKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  const options = {
    method,
    headers
  }

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    const errorMsg = data?.Response?.Errors?.[0]?.Message || `HTTP ${response.status} ${response.statusText}`
    throw new Error(`Benchmark Email API error: ${errorMsg}`)
  }

  return data
}

/**
 * Retrieve all contact lists from Benchmark Email
 */
export const getContactLists = async () => {
  try {
    const res = await benchmarkRequest('/Contact/', 'GET')
    const lists = res?.Response?.Data || []
    return {
      success: true,
      count: lists.length,
      lists: lists.map(l => ({
        id: l.ID,
        name: l.Name,
        description: l.ListDescription,
        contactCount: parseInt(l.ContactCount || '0', 10),
        createdDate: l.CreatedDate,
        modifiedDate: l.ModifiedDate,
        isMasterUnsubscribe: l.IsMasterUnsubscribe === '1'
      }))
    }
  } catch (error) {
    console.error('❌ [Benchmark] Failed to fetch contact lists:', error.message)
    return {
      success: false,
      error: error.message,
      lists: []
    }
  }
}

/**
 * Retrieve contacts from a specific list
 */
export const getListContacts = async (listId, page = 1, pageSize = 20) => {
  try {
    const res = await benchmarkRequest(`/Contact/${listId}/ContactDetails?PageNumber=${page}&PageSize=${pageSize}`, 'GET')
    return {
      success: true,
      data: res?.Response?.Data || [],
      count: res?.Response?.Count || 0
    }
  } catch (error) {
    console.error(`❌ [Benchmark] Failed to get contacts for list ${listId}:`, error.message)
    return { success: false, error: error.message, data: [] }
  }
}

/**
 * Add or update a contact in a Benchmark Email contact list
 * 
 * @param {Object} contact
 * @param {string} contact.email - Email address (required)
 * @param {string} [contact.firstName] - First Name
 * @param {string} [contact.lastName] - Last Name
 * @param {string} [contact.phone] - Phone number
 * @param {string} [contact.company] - Company name
 * @param {string|number} [contact.listId] - Target Benchmark list ID (defaults to BENCHMARK_DEFAULT_LIST_ID or 23435188)
 */
export const addContactToList = async ({ email, firstName = '', lastName = '', phone = '', company = '', listId = null }) => {
  if (!email || !email.includes('@')) {
    throw new Error('A valid email address is required for Benchmark contact sync')
  }

  const targetListId = listId || process.env.BENCHMARK_DEFAULT_LIST_ID || '23435188'

  const payload = {
    Data: {
      Email: email.trim(),
      FirstName: firstName ? String(firstName).trim() : '',
      LastName: lastName ? String(lastName).trim() : '',
      EmailPerm: '1'
    }
  }

  const res = await benchmarkRequest(`/Contact/${targetListId}/ContactDetails`, 'POST', payload)
  return res
}

/**
 * Robust, non-blocking sync for incoming website leads & forms
 * Automatically splits names, handles errors gracefully, and routes to appropriate list.
 */
export const syncLead = async (lead) => {
  if (!isBenchmarkConfigured()) {
    return { success: false, skipped: true, reason: 'BENCHMARK_API_KEY is not set' }
  }

  try {
    const email = lead.email || lead.workEmail
    if (!email || !email.includes('@')) {
      return { success: false, skipped: true, reason: 'No valid email provided' }
    }

    let firstName = lead.firstName || lead.first_name || ''
    let lastName = lead.lastName || lead.last_name || ''

    if (!firstName && lead.name) {
      const parts = String(lead.name).trim().split(/\s+/)
      firstName = parts[0] || ''
      lastName = parts.slice(1).join(' ') || ''
    }

    // Determine target list:
    // Recruitment list for careers, otherwise default general list
    let targetListId = lead.listId
    if (!targetListId) {
      if (lead.source === 'Careers Application' || lead.jobTitle) {
        targetListId = process.env.BENCHMARK_RECRUITMENT_LIST_ID || '23897400'
      } else {
        targetListId = process.env.BENCHMARK_DEFAULT_LIST_ID || '23435188'
      }
    }

    const result = await addContactToList({
      email,
      firstName,
      lastName,
      phone: lead.phone || '',
      company: lead.company || '',
      listId: targetListId
    })

    console.log(`✅ [Benchmark] Successfully synced lead (${email}) to list ${targetListId}`)
    return { success: true, listId: targetListId, result }
  } catch (error) {
    // Non-blocking: log warning and do not interrupt user submission
    console.warn(`⚠️ [Benchmark Sync Notice] Could not sync ${lead?.email} to Benchmark:`, error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Diagnostic test connection to Benchmark Email API
 */
export const testConnection = async () => {
  if (!isBenchmarkConfigured()) {
    return {
      connected: false,
      configured: false,
      message: 'BENCHMARK_API_KEY is not configured in server/.env'
    }
  }

  try {
    const listRes = await getContactLists()
    if (!listRes.success) {
      return {
        connected: false,
        configured: true,
        message: listRes.error || 'Connection failed'
      }
    }

    return {
      connected: true,
      configured: true,
      fromEmail: process.env.BENCHMARK_FROM_EMAIL || 'info@tarajglobal.com',
      defaultListId: process.env.BENCHMARK_DEFAULT_LIST_ID || '23435188',
      recruitmentListId: process.env.BENCHMARK_RECRUITMENT_LIST_ID || '23897400',
      totalLists: listRes.count,
      sampleLists: listRes.lists.slice(0, 5)
    }
  } catch (error) {
    return {
      connected: false,
      configured: true,
      message: error.message
    }
  }
}

export default {
  isBenchmarkConfigured,
  getContactLists,
  getListContacts,
  addContactToList,
  syncLead,
  testConnection
}
