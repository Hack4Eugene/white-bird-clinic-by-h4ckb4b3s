'use strict';

const async = require('async');

const Data = require('../src/data.js');

let servicesData = {};
let subjectsData = {};

function run() {
  // Initialize data
  let tasks = [
    function(cb) {
      servicesData = new Data(null, __dirname + '/../test/assets/data_sample_services.csv', (err, res) => {
        if (err) handleError(err);

        cb(null, true);
      });
    },
    function(cb) {
      subjectsData = new Data(null, __dirname + '/../test/assets/data_sample_subjects.csv', (err, res) => {
        if (err) handleError(err);

        cb(null, true);
      });
    }
  ]

  async.parallel(tasks, (err, res) => {
    compareData();
  });
}

function compareData() {
  subjectsData.data.forEach((subjectValue) => {
    let foundServiceMatch = false;
    servicesData.data.forEach((serviceValue) => {
      
      // Find service data that matches the subject value
      if (subjectValue['Service_Providers::Main_Phone'] == serviceValue['Main_Phone']) {
        foundServiceMatch = true;
      }
    });

    if (!foundServiceMatch) {
      servicesData.data.forEach((serviceValue) => {
      
        // Find service data that matches the subject value
        if (subjectValue['Service_Providers::Service_Name'] == serviceValue['Service_Name']) {
          foundServiceMatch = true;
        }
      });
    }

    if (!foundServiceMatch) {
      console.log(subjectValue);
      console.log('Not found');
    }
  });
}

run();

// Handle error by logging and quiting
function handleError(err) {
  console.error(err);

  process.exit(1);
}
