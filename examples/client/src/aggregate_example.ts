import { invokeApi, submitTx } from "./aggregate/aggregate";

// Main execution flow
(async () => {
    console.log('Starting API invocation and transaction submission flow...');
    
    // Invoke the API to get the transaction CBOR
    const txCbor = await invokeApi();
  
    // If transaction CBOR is returned, submit the transaction
    if (txCbor) {
      console.log('Submitting transaction...');
      await submitTx(txCbor);
    } else {
      console.error('No transaction CBOR received, skipping transaction submission.');
    }
  
    console.log('Process completed.');
  })();
  