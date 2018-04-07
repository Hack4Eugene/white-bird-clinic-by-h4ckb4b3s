'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Model for services
 */
const serviceSchema = new Schema({
  ADA_Access: {type: String},
  Completion_Status: {type: String},
  Description_of_Service: {type: String},
  Fax: {type: String},
  Hours_of_Operation: {type: String},
  Intended_Participants: {type: String},
  Languages_Spoken: {type: String},
  Last_Editor: {type: String},
  Location: {type: String},
  Main_Phone: {type: String},
  Notes: {type: String},
  Other_Name: {type: String},
  Other_Name_2: {type: String},
  Physical_Site_Address_1: {type: String},
  Physical_Site_City: {type: String},
  Physical_Site_State: {type: String},
  Physical_Site_Zip: {type: String},
  Proofed_By: {type: String},
  Service_Location_Email: {type: String},
  Service_Name: {type: String},
  Subject: {type: String},
  Subject_Subcategory: {type: String},
  Status: {type: String},
  WBCrisisLine: {type: String},
  Web_Address: {type: String}
});

// Export the model
module.exports = mongoose.model('service', serviceSchema);
