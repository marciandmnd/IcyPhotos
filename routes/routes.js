const photos = require('./photos');

module.exports = function(app, passport) {

  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('passport/login.ejs', { title: 'Log in', message: req.flash('loginMessage') }); 
  });

  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('passport/signup.ejs', { title: 'Sign up', message: req.flash('signupMessage') });
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  app.get('/', photos.list);

};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
