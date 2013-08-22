var express = require('express');
var timeout = require('connect-timeout');
var stylus = require('stylus');
var path = require('path');

var User;

function createApp() {
  
  var app = express();
  var timeouts = timeout({ throwError: true, time: 10000});
  var staticFiles = express.static(path.join(__dirname, 'public'));
  
  var stylusMiddleware = stylus.middleware({
    src: path.join(__dirname, 'styl'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    compile: compileStylus,
    force: true
  });

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'foobar' }));
  });

  return app;
}

function startApp(){
  var user = require('./routes/user');
  var job = require('./routes/job');
  var page = require('./routes/page');
  var app = createApp();

  // Define Routes
  app.get('/', page.home);
  app.all('/u/:id/:op?', user.load);
  app.get('/logout', user.logout);
  app.post('/login', user.login, page.home);
  app.get('/jobs', job.list);
	app.get('/jobs/create', job.new_job);
  app.post('/jobs/create', job.create);
	app.get('/jobs/:id', job.detail);
  app.get('/signup', signup, page.home);
  app.post('/signup', user.checkIfExists, user.register);
  app.get('/users', user.checkLoggedIn, user.list);
  app.get('/users/:id', user.view);
  app.listen(3000);
}

// Compile stylus to CSS
function compileStylus(str, path){
  return stylus(str)
    .set('compress', true)
    .set('filename', path);
}

function signup(req, res, next){
  res.render('signup.jade',
      { locals: {
          title: 'Register'
      }
    });
}

startApp();
