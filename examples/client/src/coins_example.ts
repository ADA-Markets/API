import { invokeApi } from "./coins/coins";

// Main execution flow
(async () => {
    console.log('Starting Coins API invocation');
    
    // Invoke the API to get the available coins
    const coins = await invokeApi();

  
    console.log('Process completed.');
  })();
  