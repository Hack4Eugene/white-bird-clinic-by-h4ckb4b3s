'use strict';

/**
 * This script is used to seed the Help Book database for testing purposes
 */

const db = require('../src/db.js');
const Data = require('../src/data.js');

const DATA_CSV_LOCATION = __dirname + '/../test/assets/data_sample_services.csv';

db.connect('mongodb://localhost/white_bird').then((connection) => {
  // Get data
  var data = new Data(null, DATA_CSV_LOCATION, () => {
    // Data is ready!
    data.data.forEach((value) => {
      // Add the data to the database with upserts
      
    });
  });
}).catch((err) => {
  console.error('Error Connecting to database for seeding');

  process.exit(1);
});
