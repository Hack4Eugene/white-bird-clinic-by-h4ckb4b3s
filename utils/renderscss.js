'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');
const lodash = require('lodash');
const sass = require('sass');

const dir = __dirname + '/../public/stylesheets/';

/**
 * This node script will automatically render all of the `.scss` files in
 * "public" vhost directories
 */

fs.readdir(dir, (err, results) => {
  if (err) return handleError(err);

  // Add the full directory to the files
  results = results.map((result) => {
    return dir + result;
  })

  // Make sure we are using a flat array
  results = lodash.flatten(results);

  // We now have all of the files in all of the `stylesheets` directory, we
  // need to get rid of everything that doesn't end with ".scss"
  results = results.filter((value) => {
    return value.endsWith('.scss');
  });

  // All that's left is to render everything
  renderEverything(results);
});

function renderEverything(files) {
  // Create an array of scss render functions that will render everything out
  let renderFunctions = files.map((value) => {
    // Generate the '.css' filename
    let cssValue = value.split('.scss')[0] + '.css';

    return function(cb) {
      console.log(`Rendering file: ${value}`);
      sass.render({
        file: value
      }, (err, rendered) => {
        if (err) return handleError(err);

        // Now write the css file
        fs.writeFile(cssValue, rendered.css, (err, writeResponse) => {
          if (err) return handleError(err);

          console.log(`Render complete: ${cssValue}`);

          cb(null, true);
        });
      });
    };
  });

  // Render everything!
  async.parallel(renderFunctions, (err, res) => {
    if (err) return handleError(err);

    console.log('Finished Rendering .scss');
  });
}

/**
 * Helper function handles errors by sending them to stderr
 * and exiting the process
 *
 * @param {object} err The error
 */
function handleError(err) {
  console.error(err);

  process.exit(1);
}
