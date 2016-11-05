const passport = require('passport');
const User = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const path = require('path');
const fs = require('fs');

// Setting up options and configure for local Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
// Verify login credentials, and call done with user object, otherwise call done with false

  User.findOne({ email: email }, function(err, user) {

    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // verifying password by hashingg and comparing with user data
    user.verifyPassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      // if passwords match call Passport's done function with userobject
      return done(null, user);
    });
  });
});


// Setting up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf8')).jwtSecret,
};


// Creating JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // Check if a user exist in DB, then call done with that User object
  User.findById(payload.sub, function(err, user) {

    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      // If user doesn't exist, call done without user object
      done(null, false);
    }
  });
});

// Confiture passport to use the strategy

passport.use(jwtLogin);
passport.use(localLogin);
