'use strict';
// External Modules
const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

// Custom Modules
const config = require('./config/config.js');
const routesFrontend = require('./src/routes_frontend.js');
const routesApi = require('./src/routes_api.js');
const db = require('./src/db.js');

const User = db.models.user;

// Auth
const passport = require('passport');
const localStrategy = require('passport-local');

var app = express();
app.set('view engine', 'pug')

// Auth
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
