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
 */ 
var UserSchema = new models.Schema({
	updated: {type: Date, default: Date.now},
	firstName: { type: String, default: '' },
	lastName: { type: String, default: '' },
	title: { type: String, default: ''},
	phone: { type: Number, default: '' },
	username: { type: String, default: '' },
	email: { type: String, default: ''},
	createDate: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);
var User = models.mongoose.model('User', UserSchema);
module.exports = models.mongoose.model('User', User);
