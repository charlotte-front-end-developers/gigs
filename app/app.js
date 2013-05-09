var express = require('express');
var timeout = require('connect-timeout');
var stylus = require('stylus');
var path = require('path');

var User;

function createApp(){
	
	var app = express();
	var ArticleProvider = require('./article-provider').ArticleProvider;
	var UserProvider = require('./user-provider').UserProvider;
	var timeouts = timeout({ throwError: true, time: 10000});
	var staticFiles = express.static(path.join(__dirname, 'public'));
	
	/*User.remove({}, function(err) { 
	   console.log('collection removed') 
	});*/
		
	var stylusMiddleware = stylus.middleware({
		src: path.join(__dirname, 'views'),
		dest: path.join(__dirname, 'public'),
		debug: true,
		compile: compileStylus,
		force: true
	});
	
	app
		.set('view engine', 'jade')
		.set('views', path.join(__dirname, 'views'))
		.use(timeouts)
		.use(stylusMiddleware)
		.use(staticFiles)
		.use(express.bodyParser())
		.use(express.methodOverride())
		.use(express.cookieParser())
		.use(express.session({
			secret: 'foobar'
		}));	

	return app;
}

function startApp(){
	var user = require('./user');
	var app = createApp();
	app.get('/', showHomepage);
	app.all('/u/:id/:op?', user.load);
	app.get('/logout', user.logout);
	app.post('/login', user.login, showHomepage);
	app.get('/jobs', user.checkLoggedIn, listJobs);
	app.get('/signup', signup);
	app.post('/signup', user.checkIfExists, user.register);
	app.get('/users', user.checkLoggedIn, user.list);
	app.get('/u/:id', user.view);
	app.listen(3000);
}

function compileStylus(str, path){
	return stylus(str)
		.set('compress', true)
		.set('filename', path);
}

function showHomepage(req, res, next){
	console.log('foo', req.session.user);
	if (req.session.user) {
		res.render('home.jade',
			{ locals: {
					title: 'Home Page'
			}
		});
	}
	else {
		res.render('login.jade', 
			{ locals: {
	            title: 'Node Test'
	        }
		});
	}
}

function signup(req, res, next){
	res.render('signup.jade');
}


function listJobs(req, res, next){
	res.send('Here are the jobs');
}



function showUserProfile(req, res, next){
	res.send('hello');
}

startApp();