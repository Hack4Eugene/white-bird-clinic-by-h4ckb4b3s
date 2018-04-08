'use strict';

const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String},
  encrypted_password: {type: String}
});

// This feels like cheating
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
