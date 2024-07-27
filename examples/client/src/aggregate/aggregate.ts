import axios from 'axios';
import { apiKey, baseUrl } from '../constants';
import { AggregateResponse } from './types';

// Define the data to be sent in the POST request
const adaToWmtExample = {
  "sellCoin": {
    "policyId": "lovelace",
    "nameHex": ""
  },
  "sellAmount": 10,
  "buyCoin": {
    "policyId": "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad",
    "nameHex": "0014df105553444d"
  },
  "slippage": 2,
  "walletAddress": "addr1q87ne4esacfkywn8rw762efjvpq4ufhg2eau8etu0q2skxtpvz0ldgwfymg43uuh7pqz7ghvjhe9hkz7gnjpe8ztcmvqsy8dz7",
  "additionalFees": [
    {
      "title": "Begin",
      "description": "Wallet fee",
      "value": "2000000"
    }
  ]
};

// Function to invoke the API and log the response
async function invokeApi() {
  try {
    const apiUrl = '/api/v0/aggregate';
    const response = await axios.post(baseUrl+apiUrl, adaToWmtExample, {
      headers: {
        'authorization': `${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Response data:', JSON.stringify(response.data, null, 2));

    const aggregateResponse: AggregateResponse = response.data;

    console.log('Cbor: ' + aggregateResponse.txCbor);

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
