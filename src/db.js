'use strict';

const mongoose = require('mongoose');

// Disable bufferCommands
mongoose.set('bufferCommands', false);

require('./models/service.js');

module.exports =  mongoose;
