'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Model for services
 */
const serviceSchema = new Schema({
  ADA_Access: {type: 'string'},
  Completion_Status: {type: 'string'},
  Description_of_Service: {type: 'string'},
  Fax: {type: 'string'},
  Hours_of_Operation: {type: 'string'},
  Intended_Participants: {type: 'string'},
  Languages_Spoken: {type: 'string'},
  Last_Editor: {type: 'string'},
  Location: {type: 'string'},
  Main_Phone: {type: 'string'},
  Notes: {type: 'string'},
  Other_Name: {type: 'string'},
  Other_Name_2: {type: 'string'},
  Physical_Site_Address_1: {type: 'string'},
  Physical_Site_City: {type: 'string'},
  Physical_Site_State: {type: 'string'},
  Physical_Site_Zip: {type: 'string'},
  Proofed_By: {type: 'string'},
  Service_Location_Email: {type: 'string'},
  Service_Name: {type: 'string'},
  Subject: {type: 'string'},
  Subject_Subcategory: {type: 'string'},
  Status: {type: 'string'},
  WBCrisisLine: {type: 'string'},
  Web_Address: {type: 'string'}
});

// Export the model
module.exports = mongoose.model('service', serviceSchema);
