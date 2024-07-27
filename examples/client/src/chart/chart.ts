import axios from 'axios';
import { apiKey, baseUrl } from '../constants';
import { ChartDataResponse } from './types';

// Define the data to be sent in the POST request
const adaToWmtExample = {
  "coinA": {
    "policyId": "lovelace",
    "nameHex": ""
  },
  "coinB": {
    "policyId": "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad",
    "nameHex": "0014df105553444d"
  },
  "symbol": "",
  "resolution": "60",
  "from": 1721489399,
  "to": 1722094199,
  "countback": 100
};

// Function to invoke the API and log the response
async function invokeApi() {
  try {
    const apiUrl = '/api/v0/chart/history';
    const response = await axios.post(baseUrl+apiUrl, adaToWmtExample, {
      headers: {
        'authorization': `${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Response data:', JSON.stringify(response.data, null, 2));

    const chartDataResponse: ChartDataResponse[] = response.data;

    console.log('Total prices: ' + chartDataResponse.length);
    
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
