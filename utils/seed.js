'use strict';

/**
 * This script is used to seed the Help Book database for testing purposes
 */
const async = require('async');

const db = require('../src/db.js');
const Data = require('../src/data.js');

const DATA_CSV_LOCATION = __dirname + '/../test/assets/data_sample_services.csv';
const REPORT_MODULUS = 50;

db.connect('mongodb://localhost/white_bird').then((connection) => {
  var Service = db.models.service;
  
  // Clear all data
  Service.remove({}).then((adventure) => {
    console.log(`Removed ${adventure.n} Elements`);
    // Get data
    var data = new Data(null, DATA_CSV_LOCATION, () => {
      // Data is ready!
      var saveCount = 0;
      var tasks = data.data.map((value) => {
        return function(callback) {
          // Save the data to the database
          var newService = new Service(value);

          newService.save().then((adventure) => {
            saveCount++;        
            if (saveCount % REPORT_MODULUS === 0) {
              console.log(`Saved ${saveCount} services. ${((saveCount / data.data.length) * 100).toFixed(2)}%`)
            }

            callback(null, true);
          }).catch((err) => {
            console.error(`Error saving model to database: ${err}`);
            callback(err);
          });
        }
      });

      async.parallel(tasks, (err, res) => {
        if (err) {
          console.error('Error detected');
        }

        console.log('Finished Seeding!');

        db.disconnect((err) => {
          console.log('Databse Disconnected - process finished')
        });
      });
    });
  }).catch((err) => {
    console.error('Error deleting existing elements');
  });  
}).catch((err) => {
  console.error('Error Connecting to database for seeding');

  process.exit(1);
});
