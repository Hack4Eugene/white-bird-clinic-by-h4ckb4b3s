'use strict';

/**
 * This script is used to seed the Help Book database for testing purposes
 */
const async = require('async');
const passport = require('passport');

const db = require('../src/db.js');
const Data = require('../src/data.js');
const config = require('../config/config.js');

const DATA_CSV_LOCATION = __dirname + '/data_combined.csv';
const REPORT_MODULUS = 50;

/**
 * Subject information that will be tracked when we add our services
 * Each object in this array matches the pattern set in the `subject` model
 */
let subjectTracker = [];

db.connect('mongodb://localhost/white_bird').then((connection) => {
  handleUser();
}).catch((err) => {
  console.error('Error Connecting to database for seeding');

  process.exit(1);
});

function handleUser() {
  const User = db.models.user;

  if (!config.userPass) {
    // Pass over this one if there isn't a password
    console.log('No WHITE_BIRD_USER_PASS envar set - skipping `User` collection');
    return handleService();
  }

  console.log('Seeding User Collection');
  
  // Remove all existing users
  User.remove({}).then((adventure) => {
    console.log(`Removed ${adventure.n} User Elements`);

    User.register(new User({username: config.userName}), config.userPass).then((adventure) => {
      console.log(`New user created: ${config.userName}`);
      handleService();
    }).catch((err) => {
      console.error(`Error registering User ${config.userName}`);
      console.error(err);
  
      handleService();
    });
  }).catch((err) => {
    console.error(`Error Removing Users`);
    console.error(err);

    handleService();
  });
}

function handleService() {
  console.log('Seeding Service Collection');
  let Service = db.models.service;
  
  // Clear all data
  Service.remove({}).then((adventure) => {
    console.log(`Removed ${adventure.n} Service Elements`);
    // Get data
    let data = new Data(null, DATA_CSV_LOCATION, () => {
      // Data is ready!
      let saveCount = 0;
      let tasks = data.data.map((value) => {
        return function(callback) {
          // Before the new service model can be created, the subject needs to be parsed
          value.Subject = value.Subject.split('|');
          value.Subject_Subcategory = value.Subject_Subcategory.split('|');

          // We need to keep track of this subject data, so that we can add it to the subject db later
          addSubjectsToTracker(value.Subject, value.Subject_Subcategory);

          // Save the data to the database
          let newService = new Service(value);

          newService.save().then((adventure) => {
            saveCount++;        
            if (saveCount % REPORT_MODULUS === 0) {
              console.log(`Saved ${saveCount} services. ${((saveCount / data.data.length) * 100).toFixed(2)}%`)
            }

            callback(null, true);
          }).catch((err) => {
            console.error(`Error saving model to database: ${err}`);
            callback(err);
          });
        }
      });

      async.parallel(tasks, (err, res) => {
        if (err) {
          console.error('Error detected');
        }

        console.log('Finished Seeding Services');

        handleSubject();
      });
    });
  }).catch((err) => {
    console.error('Error deleting existing Service elements');
  });
}

function handleSubject() {
  console.log('Seeding Subject Collection');
  let Subject = db.models.subject;

  // Clear all data
  Subject.remove({}).then((adventure) => {
    console.log(`Removed ${adventure.n} Subject Elements`);

    // Generate saving tasks
    let saveCount = 0;
    let tasks = subjectTracker.map((trackedSubject) => {
      return function(callback) {
        let newSubject = new Subject(trackedSubject);

        newSubject.save().then((adventure) => {
          saveCount++;        
          if (saveCount % REPORT_MODULUS === 0) {
            console.log(`Saved ${saveCount} services. ${((saveCount / subjectTracker.length) * 100).toFixed(2)}%`)
          }

          callback(null, true);
        }).catch((err) => {
          console.error(`Error saving model to database: ${err}`);
          callback(err);
        });
      }
    });

    async.parallel(tasks, (err, res) => {
      if (err) {
        console.error('Error detected');
      }

      console.log('Finished Seeding Subject');

      db.disconnect().then(() => {
        console.log('Disconnected from database - process complete!')
      }).catch((err) => {
        console.error('Error Disconnecting');
        console.error(err);

        process.exit(1);
      })
    });
  }).catch((err) => {
    console.error('Error deleting existing Subject elements');
    console.error(err);
  });
}

/**
 * Takes an array of subjects and subject subcategories from the service handler
 * and adds them to the subject tracker
 * 
 * @param {String[]} subjects Subject array
 * @param {String[]} subjectSubcategories Subject_Subcategory array
 */
function addSubjectsToTracker(subjects, subjectSubcategories) {
  subjects.forEach((subject, subjectIndex) => {
    // For each subject we were given, determine if it is already in our tracker
    let subjectFound = false;
    subjectTracker.forEach((trackedSubject, trackedSubjectIndex) => {
      if (subject === trackedSubject.Subject) {
        // A matching subject was found! Determine if we need to add any subject subcatagories
        subjectFound = true;
        
        if (subjectSubcategories[subjectIndex]) {
          // There is a subcategory for this subject, does it need added to our tracker?
          if (!trackedSubject.Subject_Subcategories.includes(subjectSubcategories[subjectIndex])) {
            // The answer is yes!
            subjectTracker[trackedSubjectIndex].Subject_Subcategories.push(subjectSubcategories[subjectIndex]);
          }
        }
      }
    });

    if (!subjectFound) {
      // A matching subject was not found! Add it!
      let newSubjectRecord = {
        Subject: subject,
        Subject_Subcategories: []
      }

      // Add a subcategory if needed
      if (subjectSubcategories[subjectIndex]) {
        newSubjectRecord.Subject_Subcategories.push(subjectSubcategories[subjectIndex]);
      }

      subjectTracker.push(newSubjectRecord);
    }
  });
}
