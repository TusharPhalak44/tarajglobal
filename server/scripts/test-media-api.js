/**
 * Test media API endpoint
 */

import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/media'

async function testMediaAPI() {
  try {
    console.log('Testing media API endpoint:', API_URL)
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    })
    console.log('API Response status:', response.status)
    console.log('API Response data:', JSON.stringify(response.data, null, 2))
  } catch (error) {
    console.error('API Error:', error.message)
    if (error.response) {
      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    }
  }
}

testMediaAPI()
