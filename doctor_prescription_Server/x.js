const fs = require('fs');
const axios = require('axios');
const util = require('util');

// Define the base URL and the type
const baseUrl = "https://www.medscape.com/api/quickreflookup/LookupService.ashx";
const type = 10417;

// Function to make a delayed request and save the result
const makeRequest = async () => {
  try {
    const response = await axios.get('https://reference.medscape.com/druginteraction.do?action=getMultiInteraction&ids=342215,999626,342819');
    const data = response.data; // Access the response data

    console.log(`Received data:`, data);
    // Here, you can process the 'data' as needed.
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Call the function
makeRequest();
