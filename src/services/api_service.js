'use strict';

/**
 * Service file handles all JSON API request processing
 */
const lodash = require('lodash');

const db = require('../db.js');

/**
 * Models used - each model object is associated with the exact collection name
 * used to interact with it
 */
const models = {
  services: db.models.service,
  subjects: db.models.subject
}

class ApiService {
  // No construction - all methods are static
  constructor() {}

  /**
   * Finds _all_ records associated with a given collection
   * 
   * @param {String} collection The collection to search
   * 
   * @return {Promise} Promise
   */
  static findAll(collection) {
    return new Promise((resolve, reject) => {
      if (!checkModelExists(collection)) {
        return reject(generateRejection('Collection not found', 404));
      }
      
      models[collection].find({}).then((adventure) => {
        return resolve(adventure);
      }).catch((err) => {
        return reject(generateRejection('Error querying database', 500));
      });
    });
  }

  /**
   * Searches a given collection for a record with the given ID
   * 
   * @param {String} collection Collection to search
   * @param {String} id Record ID
   * 
   * @return {Promise} Promise
   */
  static findOneById(collection, id) {
    return new Promise((resolve, reject) => {
      if (!checkModelExists(collection)) {
        return reject(generateRejection('Collection not found', 404));
      }

      models[collection].findById(id).then((adventure) => {
        return resolve(adventure);
      }).catch((err) => {
        console.log(err);
        return reject(generateRejection('Error querying database', 500));
      });
    });
  }

  /**
   * Finds all records that match the given query in the given collection
   * 
   * @param {String} collection The collection being searched
   * @param {Object} query The query being used to search as a JS object
   */
  static findWithQuery(collection, query) {
    return new Promise((resolve, reject) => {
      if (!checkModelExists(collection)) {
        return reject(generateRejection('Collection not found', 404));
      }

      if (!validateQuery(collection, query)) {
        return reject(generateRejection('Invalid Query', 400));
      };

      models[collection].find(query).then((adventure) => {
        return resolve(adventure);
      }).catch((err) => {
        console.log(err);
        return reject(generateRejection('Error querying database', 500));
      });
    });
  }
}

module.exports = ApiService;

/**
 * Takes a collection string and returns a flag identifying if the provided collection is
 * in our model object
 * 
 * @param {string} collection The collection being used
 * 
 * @returns {boolean} True if passing, false if failing
 */
function checkModelExists(collection) {
  if (models[collection]) {
    return true;
  } else {
    return false;
  }
}

/**
 * Validates that all of the keys in a provided query are in the provided collection
 * 
 * @param {String} collection Collection that is being queried
 * @param {Object} query The full Query, as a JS object
 * 
 * @return {boolean} True if passing - false otherwise
 */
function validateQuery(collection, query) {
  let validKeys = Object.keys(models[collection].schema.obj);

  // Add the 'id' key
  validKeys.push('id');

  let queryKeys = Object.keys(query);

  // Compare the keys in the query with the known valid keys
  let foundInvalid = false;
  lodash.forEach(queryKeys, (key) => {
    if (!validKeys.includes(key)) {
      foundInvalid = true;
      return false; // Break
    }
  });

  // Return the inverse of foundInvalid
  return !foundInvalid;
}

/**
 * Helper generates a consistantly formatted error object
 * 
 * @param {String} message Error message
 * @param {String} code HTTP Code associated with the error
 * 
 * @return {object} Custom Error object
 */
function generateRejection(message, code) {
  return {
    message: message,
    code: code
  }
}
