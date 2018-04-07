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
	app.get('/listing', (req, res) => {
	  db.models.service.find().exec(function(data) {
	  	res.status(200).json({
	  		status: 'success',
	  		data: data,
	  		message: "Retrieved all listings from subjects"
	  	});
	  }).catch(function(err) {
	  	console.log("error", err);
	  })
	  res.render('listing', JSON.parse(response.body));
	});

	// call to listing: lid should request all data and return category 
	// specific information
	app.get('/listing/:id', (req, res) => {
	  let category = req.params.id;
	  db.models.service({category}).then(function(data) {
	  	res.status(200).json({
	  		status: 'success',
	  		data: data,
	  		message: "Retrieved category  from subjects"
	  	});
	  }).catch(function(err) {
	  	console.log('error'. err);
	  })
	  res.render('listing', JSON.parse(response.body));
	});
}


module.exports = routes;
