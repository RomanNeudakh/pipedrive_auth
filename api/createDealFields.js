import API_PATHS from '../contants/apiPath.js'

async function createDealField(dealFieldBody) {
  const apiKey = process.env.API_KEY;
    try {
      const response = await fetch(`${API_PATHS.apiBaseURL}/dealFields?api_token=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dealFieldBody),
      });
      const result = await response.json();
      return result.data.key
    } catch (error) {
      console.error('Error creating deal field:', error);
    }
}

export default createDealField;