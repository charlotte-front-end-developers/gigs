/**
 * Module dependencies.
 */

var models = require('../bin/imports/models')
	, passport = require('passport')
	, passportLocalMongoose = require('passport-local-mongoose')
;

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

var CompanySchema = new models.Schema({
	updated: { type: Date, default: Date.now },
	username: { type: String, default: ''},
	name: { type: String, default: ''},
	email: { type: String, default: ''},
	post: [
		{
			title: { type: String, default: ''},
			body: { type: String, default: '' },
			createDate: { type: Date, default: Date.now },
			tags: [String]
		}
	]
});

CompanySchema.plugin(passportLocalMongoose);
var CompanyUser = models.mongoose.model('CompanyUser', CompanySchema);
module.exports = models.mongoose.model('CompanyUser', CompanyUser);




