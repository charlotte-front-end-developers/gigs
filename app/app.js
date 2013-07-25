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
  var user = require('./routes/user');
  var job = require('./routes/job');
  var page = require('./routes/page');
  var app = createApp();
  app.get('/', page.home);
  app.all('/u/:id/:op?', user.load);
  app.get('/logout', user.logout);
  app.post('/login', user.login, page.home);
  app.get('/jobs', job.list);
	app.get('/jobs/new', job.new_job);
	app.get('/jobs/:id', job.detail);
  app.get('/signup', signup, page.home);
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

function signup(req, res, next){
  res.render('signup.jade',
      { locals: {
          title: 'Register'
      }
    });
}

startApp();
