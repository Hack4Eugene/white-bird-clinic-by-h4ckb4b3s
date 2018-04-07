/**
 * This script handles the conversion, storage, and access to White Bird Help book data 
 */
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync');
const lodash = require('lodash');

// Master "data" object that contains White Bird Help Book data
var data = {};

class Data {
  /**
   * Constructor takes a csv string of White Bird Help Book data. Can take either a full csv
   * string or a file location
   * 
   * Note: If the csvData object is not falsey the csvFile parameter will be ignored
   * 
   * @param {string} csvData String representation of White Bird Help Book CSV Data
   * @param {string} csvFile Optional. File location of White Bird Help Book data
   * @param {function} cb Callback that will be run when the constructor finishes
   */
  constructor(csvData, csvFile = null, cb) {
    if (csvData) {
      data = Data.processCsvDataString(csvData);
      cb();
      return;
    } else if (csvFile) {
      Data.readAndProcessCSVFile(csvFile).then((dataFromProcess) => {
        data = dataFromProcess;
        cb();
        return
      }).catch((err) => {
        // If we get here there was a problem
        var error = new Error('ERROR: Error reading csv files');
        console.error(error.message);
        console.error(err);
        throw error;
      });
    } else {
      var error = new Error('ERROR: Undefined csvData AND csvFile parameters');
      console.error(error.message);
      throw error;
    }
  }

  /**
   * Master "data" object that contains White Bird Help Book data
   */
  get data() {
    return data;
  }

  /**
   * STATIC HELPERS
   */
  static readAndProcessCSVFile(fileLocation) {
    return new Promise((resolve, reject) => {
      Data.readCsvFile(fileLocation).then((csvString) => {
        // We now have a csv string to process
        var csvObject = Data.processCsvDataString(csvString);
        resolve(csvObject);
        return;
      }).catch((err) => {
        console.error('Error Reading CSV File');
        reject(err);
        return;
      });
    })
  }

  /**
   * Reads csv data from the file system
   * 
   * @param {string} fileLocation File location of the CSV file
   * 
   * @return {Promise} Promise
   */
  static readCsvFile(fileLocation) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileLocation, (err, csvData) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(csvData.toString());
      });
    });
  }

  /**
   * Processes string scvData and returns a js object
   * 
   * @param {string} csvData String representation of White Bird Help Book CSV Data
   */
  static processCsvDataString(csvData) {
    let opts = {
      columns: true
    }

    let parsed = csvParse(csvData);

    // The csv parser returns an array of arrays
    // The first element in the main array are the keys for each data item
    let keys = parsed.shift();

    return parsed.map((value) => {
      return generateObject(value);
    });

    function generateObject(vals) {
      let obj = {};

      keys.forEach((key, index) => {
        obj[key] = vals[index];
      });

      return obj;
    }
  }
}

module.exports = Data;
