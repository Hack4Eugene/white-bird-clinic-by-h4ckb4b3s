'use strict';

// Error if the session secret is not set - it MUST be set!
if (!process.env.SESSION_SECRET) {
  console.error('FATAL ERROR: SESSION_SECRET envar not set');

  process.exit(1);
}

/**
 * Module handles all configurations
 */
var config = {
  port: process.env.PORT || 3001,

  // Connection string for our database
  cbConnection: process.env.DB_CONNECTION || 'mongodb://localhost/white_bird',

  // Auth
  sessionSecret: process.env.SESSION_SECRET,
  userName: process.env.WHITE_BIRD_USER || 'WhiteBirdUser',
  userPass: process.env.WHITE_BIRD_USER_PASS
}

module.exports = config;
