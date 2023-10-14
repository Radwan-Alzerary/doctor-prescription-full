const csvtojson = require('csvtojson');
const fs = require('fs');

// Specify the input CSV file and output JSON file
const csvFilePath = 'drugdataset.csv';
const jsonFilePath = 'pharmacydataset.json';

// Convert CSV to JSON
csvtojson()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    // Write the JSON data to a file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
    console.log(`CSV data converted to JSON and saved to ${jsonFilePath}`);
  })
  .catch((err) => {
    console.error('Error converting CSV to JSON:', err);
  });
