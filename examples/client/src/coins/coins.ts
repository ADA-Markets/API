import axios from 'axios';
import { apiKey, baseUrl } from '../constants';
import { CoinsResponse } from './types';


// Function to invoke the API and log the response
async function invokeApi() {
  try {

    const apiUrl = '/api/v0/coins/all'
    const response = await axios.get(baseUrl + apiUrl, {
      headers: {
        'Authorization': `${apiKey}` // Add Authorization header
      }
    });

    console.log('Response data:', response.data);

    const coinsResponse: CoinsResponse[] = response.data;

    console.log('Total coins: ' + coinsResponse.length);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Call the function
invokeApi();
