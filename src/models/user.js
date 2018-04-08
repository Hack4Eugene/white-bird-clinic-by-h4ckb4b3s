'use strict';

const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
});

// This feels like cheating
// This automatically applies all of passport's wonferful workings
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
