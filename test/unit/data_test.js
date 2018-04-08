'use strict';
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const should = require('should');

let Data = require(path.join('..', '..', 'src', 'data.js'));

let compareJson = require(path.join('..', 'assets', 'data_sample_services.json'));

describe('Data Class Tests', () => {
  let csvString = '';

  it('should be able to retrieve csv data from the file system', (done) => {
    const fileLocation = path.join('.', 'test', 'assets', 'data_sample_services.csv');
    Data.readCsvFile(fileLocation).then((res) => {
      csvString = res;
      let compareData = fs.readFileSync(fileLocation).toString();
      csvString.should.equal(compareData);
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should be able to process csv data', (done) => {
    let processed = Data.processCsvDataString(csvString);

    // This line is helpful if the data data sample changes
    fs.writeFileSync(path.join('.', 'test', 'assets', 'data_sample.json'), JSON.stringify(processed));
    
    lodash.isEqual(processed, compareJson).should.equal(true);
    
    done();
  });
});
