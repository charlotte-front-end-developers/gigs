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
 * Create CompanySchema.
 */

var CompanySchema = new models.Scchema({
	updated: {type: Date, default: Date.now},
	name: { type: String, default: ''},
	email: { type: String, default: ''}
	post: [
		{
			title: { type: String, default: ''},
			body: { type: String, default: '' },
			createDate: { type: Date, default: Date.now },
			tags: [String]
		}
	]

})