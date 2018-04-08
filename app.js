'use strict';
// External Modules
const express = require('express');
const bodyParser = require('body-parser');

// Custom Modules
const config = require('./config/config.js');
const routesFrontend = require('./src/routes_frontend.js');
const routesApi = require('./src/routes_api.js');
const db = require('./src/db.js');

var app = express();
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'))

// Load in the routes
routesFrontend(app);
routesApi(app);

db.connect(config.cbConnection).then((adventure) => {
  console.log('Connected to databse');
  app.listen(config.port, (err) => {
    if (err) {
      console.error('ERROR STARTING SERVER: ');
      console.error(err);
      
      process.exit(1);
    }
  
    console.log(`Server started on port ${config.port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to databse');
  process.exit(1);
});
