'use strict';
const db = require('./db.js');
/**
 * This function estableshes routes for the White Bird Help Book Frontend
 * 
 * @param {object} app App generated from Express
 */
function routes(app) {
  app.get('/', (req, res) => {
    res.redirect('/index');
  });
  
  app.get('/index', (req, res) => {
    res.render('index');
  });  
  app.get('/services', (req, res) => {
	  res.render('services');
	});

	app.get('/category', (req, res) => {
	  res.render('category');
	});

	app.get('/alphabetical', (req, res) => {
	  res.render('alpha');
	});

	app.get('/common', (req, res) => {
	  res.render('common');
	});

	app.get('/emergency', (req, res) => {
	  res.render('emergency');
	});


	// call to listings should make an api request to reutrn 
	// all service listings which should then be indexed alphabetically 
	app.get('/listings', (req, res) => {
	  var Service = db.models.service;
	  Service.find().then((adventure) => {
	  	let records = adventure;
	  	console.log("records", records);
	  	res.render('listings', {"record": records});
	  });
	});

	// call to listing: lid should request all data and return category 
	// specific information
	app.get('/listing/:id', (req, res) => {
	  let id = req.params.id;
	  console.log("id", id);
	  var Service = db.models.service;
	  Service.findOne({'_id': id }).then((adventure) => {
	  	let record = adventure;
	  	console.log("record", record);
	  	res.render('listing', {"record": record});
	  });
	});
}


module.exports = routes;
