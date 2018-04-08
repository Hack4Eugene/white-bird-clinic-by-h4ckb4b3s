'use strict';

const fs = require('fs');
const async = require('async');
const lodash = require('lodash');
const csvStringify = require('csv-stringify');

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
  servicesData.data.forEach((service, serviceIndex) => {
    // Initialise Subject items
    servicesData.data[serviceIndex].Subject = '';
    servicesData.data[serviceIndex].Subject_Subcategory = '';

    // For each service, go through the subject array and search for matching subjects
    subjectsData.data.forEach((subject) => {
      if (subject['Service_Providers::Service_Name'] == service['Service_Name']) {
        // We found a match! Add the found subject to the service
        servicesData.data[serviceIndex].Subject += '|' + subject.Subject;
        servicesData.data[serviceIndex].Subject_Subcategory += '|' + subject.Subject_Subcategory;
      }
    });

    // Remove the first character from each Subject (it is guranteed to be a pipe)
    servicesData.data[serviceIndex].Subject = servicesData.data[serviceIndex].Subject.slice(1);
    servicesData.data[serviceIndex].Subject_Subcategory = servicesData.data[serviceIndex].Subject_Subcategory.slice(1);
  });

  writeCsv();
}

function writeCsv() {
  // Convert the data into a 'csv-able' form
  let csvAble = [];

  // First add the fields
  csvAble.push(servicesData.fields);

  // Generate a table marking the index for each field (object key order is not guranteed)
  let assignmentTable = {};
  csvAble[0].forEach((key, index) => {
    assignmentTable[key] = index;
  });

  // Generate the remaining csvAble array!
  servicesData.data.forEach((item) => {
    let newArr = [];
    lodash.forEach(assignmentTable, (index, key) => {
      newArr[index] = item[key];
    });

    csvAble.push(newArr);
  });

  // Finally we can actually stringify our csv!
  csvStringify(csvAble, (err, out) => {
    if (err) handleError(err);

    fs.writeFileSync('data_combined.csv', out);

    console.log('DONE');
  });
}

run();

// Handle error by logging and quiting
function handleError(err) {
  console.error(err);

  process.exit(1);
}
