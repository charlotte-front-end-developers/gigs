/**
 * Module dependencies.
 */

var passport = require('passport')
  , User = require('./models/user')
  , CompanyUser = require('./models/company')
  , url = require('url')
;

// var url_parts = url.parse(request.url, true);
// var query = url_parts.query;

/**
 * Routes.
 */

module.exports = function (app) {
    
  app.get('/', function (req, res) {
    res.render('index', { user : req.user, messages: req.flash('info') });
  });

  app.get('/register', function(req, res) {
    
    var url_parts = url.parse(req.url, true)
      , query = url_parts.query
    ;

    // make this look better monty
    if( query.register == 'Employers' ) {
      res.render('register-employer', { } );
    } else {
      res.render('register-employee', { });
    }

  });

  app.post('/register', function(req, res) {

    // if(  )

    User.register(new User(
      { username : req.body.username,
        emal: req.body.email,
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        phone : req.body.phone,
        title: req.body.title,
        updated: req.body.updated
      }), 
      req.body.password,  function(err, user) {
        if (err) {
          return res.render('register', { user : user });
        }
      res.redirect('/');
    });
  });

  app.get('/login', function(req, res) {
    res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    req.flash('info', 'You are logged in');
    res.redirect('/');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};