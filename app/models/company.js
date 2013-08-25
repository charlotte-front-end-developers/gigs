/**
 * Module dependencies.
 */

var models = require('../bin/imports/models');

/**
 * Connect db.
 */

models.db.on('error', console.error.bind(console, 'connection error:'));
models.db.once('open', function callback () {
  console.log('connection succesful');
});