/**
 * Module dependencies.
 */

var models = require('../bin/imports/models')
	, passport = require('passport')
	, passportLocalMongoose = require('passport-local-mongoose');

/**
 * Connect db.
 */

models.db.on('error', console.error.bind(console, 'connection error:'));
models.db.once('open', function callback () {
  console.log('connection succesful');
});


/**
 * Create UserSchema.
 */ // Monty come through here and correct UserSchema types

var UserSchema = new models.Schema({
	firstName: { type: String, default: '' },
	lastName: { type: String, default: '' },
	phone: { type: String, default: '' },
	streetAddress: { type: String, default: '' },
	username: { type: String, default: '' },
	password: { type: String, default: '' },
	zipCode: { type: String, default: '' },
	city: { type: String, default: '' },
	state: { type: String, default: ''},
	createDate: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.path('password').validate(function (password) {
  if(password === this.password) {
  	return true;
  } else {
  	return false;
  }
}, 'Incorrect Password');

var User = models.mongoose.model('User', UserSchema);
module.exports = models.mongoose.model('User', User);
