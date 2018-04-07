'use strict';

function routes(app) {
  app.get('/', (req, res) => {
    res.redirect('/index');
  });
  
  app.get('/index', (req, res) => {
    res.render('index');
  });  
}

module.exports = routes;
