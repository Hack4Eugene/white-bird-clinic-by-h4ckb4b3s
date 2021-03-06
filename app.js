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
const isLoggedIn = require('./src/middleware/isLoggedIn.js');

var app = express();
app.set('view engine', 'pug')

// Auth
app.use(expressSession({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'))

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', { 
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.use(isLoggedIn);

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
