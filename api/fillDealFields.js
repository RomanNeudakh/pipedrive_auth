import API_PATHS from '../contants/apiPath.js';
import dealFields from '../contants/dealFields.js';

async function updateDeal(receivedData, dealId) {
    const apiKey = process.env.API_KEY;
    const body = {};
    for (const field of dealFields) {
        if (receivedData[field.name]) { 
            body[field.key] = receivedData[field.name];
        }
    }
    try {
        const response = await fetch(`${API_PATHS.apiBaseURL}/deals/${dealId}?api_token=${apiKey}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        console.log('Deal updated successfully:', result);
    } catch (error) {
        console.error('Error updating deal:', error);
    }
}

export default updateDeal;