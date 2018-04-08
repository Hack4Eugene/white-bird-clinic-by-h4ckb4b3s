'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Model for collection containing references to all Subjects and Subject_Subcategories
 */
const subjectSchema = new Schema({
  Subject: {type: String},
  Subject_Subcategories: {type: [String]}
});

// Export the model
module.exports = mongoose.model('subject', subjectSchema);
