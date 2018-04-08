'use strict';

const db = require('./db.js');

// All routes in the API routing paradigm have a specific prefix
const PREFIX = '/api';
const V1 = '/v1';
var v1Prefix = PREFIX + V1;

// Get models
var Service = db.models.service;

/**
 * This function estableshes routes for the White Bird Help Book REST API
 * 
 * @param {object} app App generated from Express
 */
function routes(app) {
  // Version 1 routes
  app.get(v1Prefix + '/services', (req, res) => {
    // Request all data from the provided connection
    Service.find({}).then((adventure) => {
      res.send(adventure);
    }).catch((err) => {
      res.statusCode(500).send('Internal Server Error');
    })
  });

  app.get(v1Prefix + '/services/new', (req, res) => {
    // Get the schema keys for automatic generation of forms
    let keys = Object.keys(Service.schema.obj);
    // Serve a new collection form
    res.render('./api/new.pug', {keys: keys});
  });

  app.post(v1Prefix + '/services', (req, res) => {
    let newService = new Service(req.body);
    newService.save().then((adventure) => {
      res.send('New service accepted');
    }).catch((err) => {
      res.statusCode(500).send('Error saving new service');
    });
  });
}

module.exports = routes;
