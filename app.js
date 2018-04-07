'use strict';
// External Modules
const express = require('express');

// Custom Modules
const config = require('./config/config.js');

var app = express();
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.redirect('/index');
});

app.get('/index', (req, res) => {
  res.render('index');
});


app.listen(config.port, (err) => {
  if (err) {
    console.error('ERROR STARTING SERVER: ');
    console.error(err);
    
    process.exit(1);
  }

  console.log(`Server started on port ${config.port}`);
});