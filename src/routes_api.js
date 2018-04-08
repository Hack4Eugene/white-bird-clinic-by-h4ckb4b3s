'use strict';

const db = require('./db.js');
const ApiService = require('./services/api_service.js');

// All routes in the API routing paradigm have a specific prefix
const PREFIX = '/api';
const V0 = '/v0';
var v0 = PREFIX + V0;

/**
 * This function estableshes routes for the White Bird Help Book REST API
 * 
 * @param {object} app App generated from Express
 */
function routes(app) {
  // Version 0 routes
  /**
   * Route for the base "collection" path. If this route is called with a query string,
   * the system will validate and do that query. If there is no query string (no queries
   * are defined) the system will respond with _all_ items in the collection
   * 
   * Without a query string, this _can_ take some time
   * 
   * TODO: Add pagination for all queries
   */
  app.get(v0 + '/:collection', (req, res) => {
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

  /**
   * Get's a single item from the collection with the specified id
   */
  app.get(v0 + '/:collection/:id', (req, res) => {
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
