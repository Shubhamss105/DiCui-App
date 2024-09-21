import { BASE_URL } from './config.js';

const apiCall = async (endpoint, method, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json', // Ensure we are asking for JSON responses
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Check for non-JSON responses (like HTML errors)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Received non-JSON response');
    }

    if (!response.ok) {
      // Extract error message from response, if available
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default apiCall;
