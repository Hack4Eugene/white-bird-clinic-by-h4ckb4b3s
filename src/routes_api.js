'use strict';

const db = require('./db.js');
const ApiService = require('./services/api_service.js');

// All routes in the API routing paradigm have a specific prefix
const PREFIX = '/api';
const V1 = '/v1';
var v1Prefix = PREFIX + V1;

/**
 * This function estableshes routes for the White Bird Help Book REST API
 * 
 * @param {object} app App generated from Express
 */
function routes(app) {
  // Version 1 routes
  app.get(v1Prefix + '/:collection', (req, res) => {
    // Get the collection
    let collection = req.params.collection;

    // Get any queries
    let queries = req.query;

    // If there are queries we need to use the query function
    if (Object.keys(queries)) {
      ApiService.findWithQuery(collection, queries).then((adventure) => {
        return res.send(adventure);
      }).catch((err) => {
        if (!err.message || !err.code) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return
        }
  
        return res.status(err.code).send(err.message);
      });
    } else {
      // Request all data from the provided collection
      ApiService.findAll(collection).then((adventure) => {
        return res.send(adventure);
      }).catch((err) => {
        if (!err.message || !err.code) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return
        }

        res.status(err.code).send(err.message);
      });
    }
  });

  app.get(v1Prefix + '/:collection/:id', (req, res) => {
    // Get the params
    let collection = req.params.collection;
    let id = req.params.id;

    ApiService.findOneById(collection, id).then((adventure) => {
      res.send(adventure);
    }).catch((err) => {
      if (!err.message || !err.code) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return
      }

      res.status(err.code).send(err.message);
    });
  });
}

module.exports = routes;
