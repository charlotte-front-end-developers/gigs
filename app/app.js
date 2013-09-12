/**
 * Module dependencies.
 */

var express = require('express')
	, http = require('http')
	, path = require('path')

  , stylus = require('stylus')
  , mongoose = require('mongoose')

	, timeout = require('connect-timeout')
  , flash = require('connect-flash')
  
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy

  , User = require('./models/user')
;

var app = express();

/**
 * Configuring app.
 */

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'foobar' }));

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({ secret: 'keyboard cat' }));

  app.use(flash());
  var job = require('./routes/job');
  var page = require('./routes/page');
  // Define Routes
  app.get('/', page.home);
  app.post('/jobs/create', job.create);
	app.get('/jobs/:id', job.detail);
  app.get('/signup', signup, page.home);

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(stylus.middleware(__dirname + '/public'));
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});
/**
 * Auth Passport
 */
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/**
 * Connect To Database
 */
mongoose.connect('mongodb://localhost/test');

/**
 * Routes.
 */

require('./routes')(app);

/**
 * Start Server.
 */

http.createServer(app).listen(3000, '127.0.0.1', function() {
  console.log("Express server listening on %s:%d in %s mode", '127.0.0.1', 3000, app.settings.env);
});