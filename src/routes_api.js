'use strict';

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
  app.get(v1Prefix + '/services', (req, res) => {
    res.send('API Accessed');
  });
}

module.exports = routes;
