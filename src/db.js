'use strict';

const mongoose = require('mongoose');

// Disable bufferCommands
mongoose.set('bufferCommands', false);

require('./models/service.js');
require('./models/subject.js');
require('./models/user.js');

module.exports = mongoose;
