import axios from 'axios';
import { apiKey, baseUrl, BLOCKFROST_KEY, FEE_WALLET_ADDRESS, WALLET_ADDRESS, WALLET_SEED } from '../constants';
import { AggregateRequest, AggregateResponse } from './types';
import { Blockfrost, Lucid } from '@lucid-evolution/lucid';


// Define the data to be sent in the POST request for swapping ADA to WMT
const adaToWmtExample = {
  "sellCoin": {
    "policyId": "lovelace", // ADA, represented as "lovelace"
    "nameHex": "",          // Empty as ADA doesn't require a nameHex
  },
  "sellAmount": 10,         // Sell 10 ADA
  "buyCoin": {
    "policyId": "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad", // WMT policy ID
    "nameHex": "0014df105553444d", // WMT nameHex
  },
  "slippage": 2,            // Acceptable slippage in percentage
  "walletAddress": WALLET_ADDRESS, // Your wallet address
  "additionalFees": [       // Example additional fees
    {
      "title": "Test",
      "description": "Wallet fee",
      "value": "2000000",   // Fee value (in lovelace)
      "walletAddress": FEE_WALLET_ADDRESS // Fee recipient wallet address
    },
  ],
  "buildTx": true           // Flag to build the transaction
};

// Function to invoke the API and log the response
export async function invokeApi(): Promise<string | undefined> {
  try {
    const apiUrl = '/api/v0/aggregate'; // API endpoint for aggregation

    // Log request details
    console.log('Invoking API with request data:', adaToWmtExample);

    // Make POST request to the aggregate API
    const response = await axios.post(baseUrl + apiUrl, adaToWmtExample, {
      headers: {
        'authorization': `${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // Log the response data
    console.log('API response:', JSON.stringify(response.data, null, 2));

    // Parse the response and log the transaction CBOR
    const aggregateResponse: AggregateResponse = response.data;
    console.log('Transaction CBOR:', aggregateResponse.txCbor);

    return aggregateResponse.txCbor; // Return the CBOR of the built transaction

  } catch (error) {
    // Handle and log the error
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
  return undefined; // Return undefined in case of an error
}

// Function to submit the transaction to the Cardano network
export async function submitTx(txCbor: string) {
  // Log the CBOR of the transaction to be submitted
  console.log('Submitting transaction with CBOR:', txCbor);

  // Create Blockfrost provider
  const datProvider = new Blockfrost('https://cardano-mainnet.blockfrost.io/api/v0', BLOCKFROST_KEY);
  const lucid = await Lucid(datProvider, 'Mainnet'); // Initialize Lucid

  // Log wallet loading process
  console.log('Loading wallet from seed...');
  lucid.selectWallet.fromSeed(WALLET_SEED); // Replace with actual seed

  // Read in the transaction from CBOR
  const tx = lucid.fromTx(txCbor);

  // Log transaction signing process
  console.log('Signing transaction...');
  const txSigned = await tx.sign.withWallet().complete();
  const txSignedCbor = txSigned.toCBOR();
  console.log('Submitting transaction with CBOR:', txSignedCbor);

  // Log submission process &&   // Log the submitted transaction
  console.log('Submitting transaction to the blockchain...');
 const submittedTx = await txSigned.submit();
 console.log('Transaction submitted successfully. TX ID:', submittedTx);
}

