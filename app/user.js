var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
	console.log('Connected to Database');
});

var userSchema = mongoose.Schema({
	userID: Number,
	username: String,
	password: String
});
	
User = mongoose.model('Users', userSchema);

exports.load = function(req, res, next){
	
	var id = req.params.id;
	req.user = User.findOne({ 'username' : id});
	
	req.user.select('username');
	req.user.exec(function(err, userQuery){
		if (err) { 
			res.send('query error');
		}
		else {
			if (req.user) {
				next();
			}
			else {
				res.send('no such user');
			}		
		}
	});
}

exports.login = function(req, res, next){
	var query = User.findOne({ 'username': req.body.username});
	query.select('password username');
	query.exec(function (err, userQry){
		if (err) { 
			res.send('query error');
		}
		else {
			if (userQry) {
				if (req.body.password === userQry.password) {
					req.session.user = userQry.username;
					next();
				}
				else {
					res.render('login.jade',
						{ locals: {
							message: 'Incorrect password.'	
						}
					});
				}
			}
			else {
				res.render('login.jade',
				{ locals: {
					message: 'Username not found.'	
				}
			});
			}
		}
	});
};

exports.logout = function(req, res, next) {
	req.session.destroy();
	res.render('login.jade',
		{ locals: {
			message: 'You have been logged out.'	
		}
	});
}

exports.checkLoggedIn = function(req, res, next){	
	if (req.session.user) {
		next();
	}
	else {
		res.render('login.jade',
			{ locals: {
				message: 'You must be logged in to view this page.'	
			}
		});
	}
}

exports.checkIfExists = function (req, res, next){
	var newUser = req.body;
	User.findOne({ 'username' : newUser.username}, 'username', function (err, user){
		if (err) {
			console.log('error finding registered user');
		}
		else {
			if (user) {
				res.render('signup.jade',
					{ locals: {
						message: 'A user by this username already exists.'	
					}
				});
			}
			else {
				next();
			}
		}
	});
}

exports.register = function(req, res, next){
	var newUser = req.body;
	
	var user = new User({
		username: newUser.username,
		password: newUser.password
	});
	
	user.save(function (err, user){
		if (err) {
			console.log('error');
		}
		else console.log('saved!');
	});
	res.send('registration success');
}

exports.list = function (req, res, next){
	User.find(function (err, users){
		res.render('users.jade', {
			locals: {
				users: users
			}
		});
	});
}

exports.view = function(req, res, next){
	console.log(req.user.username);
  res.render('users/view', {
    title: 'Viewing user ' + req.user.username,
    user: req.user
  });
};

