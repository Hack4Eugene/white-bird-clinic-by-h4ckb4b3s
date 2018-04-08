'use strict';
const config = require('../../config/config.js');

function isLoggedIn(req, res, next) {
  if (req.url === '/login') {
    return next();
  }

  if(req.isAuthenticated() || config.nodeEnv !== 'production') {
    return next();
  }

  res.redirect('/login');
}

module.exports = isLoggedIn;
