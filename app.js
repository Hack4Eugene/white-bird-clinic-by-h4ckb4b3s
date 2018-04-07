'use strict';
// External Modules
const express = require('express');

// Custom Modules
const config = require('./config/config.js');
const routesFrontend = require('./src/routes_frontend.js');
const routesApi = require('./src/routes_api.js');

var app = express();
app.set('view engine', 'pug')

// Load in the routes
routesFrontend(app);
routesApi(app);

app.listen(config.port, (err) => {
  if (err) {
    console.error('ERROR STARTING SERVER: ');
    console.error(err);
    
    process.exit(1);
  }

  console.log(`Server started on port ${config.port}`);
});