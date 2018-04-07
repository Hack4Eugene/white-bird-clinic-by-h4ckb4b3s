'use strict';

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
}

module.exports = routes;
