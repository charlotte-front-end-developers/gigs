/**
 * Module dependencies.
 */

var passport = require('passport')
  , User = require('./models/user')
;


/**
 * Routes.
 */

module.exports = function (app) {
    
  app.get('/', function (req, res) {
    res.render('index', { user : req.user, messages: req.flash('info') });
  });

  app.get('/register', function(req, res) {
    res.render('register', { } );
  });

  app.post('/register', function(req, res) {
    User.register(new User(
      { username : req.body.username,
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        phone : req.body.phone,
        streetAddress : req.body.address,
        city : req.body.city,
        zipCode : req.body.zipcode,
        state : req.body.state
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