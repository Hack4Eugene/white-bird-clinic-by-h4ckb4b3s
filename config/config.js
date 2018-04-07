/**
 * Module handles all configurations
 */
var config = {
  port: process.env.PORT || 3001,
  cbConnection: process.env.DB_CONNECTION || 'mongodb://localhost/white_bird'
}

module.exports = config;
