/**
 * Models dependencies.
 */
var mongoose 			= require('mongoose')
	, crypto			  = require('crypto')
	, _ 						= require('underscore')
	, Schema				= mongoose.Schema
	, db 						= mongoose.connection
;

exports.mongoose = mongoose;
exports.crypto = crypto;
exports._ = _;
exports.Schema = Schema;
exports.db = db;