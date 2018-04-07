'use strict';

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
}


module.exports = routes;
