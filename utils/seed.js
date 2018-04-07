'use strict';

/**
 * This script is used to seed the Help Book database for testing purposes
 */

const db = require('../src/db.js');
const data = require('../src/data.js');

const DATA_CSV_LOCATION = '../test/assets/data_sample_services.csv';

db.connect('mongodb://localhost/white_bird').then((connection) => {
  // Process data
  
}).catch((err) => {
  console.error('Error Connecting to database for seeding');

  process.exit(1);
});
