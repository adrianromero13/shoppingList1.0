const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { secret } = require('../config');
const User = require('../models/User');

// Setup options for Jwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET || secret,
};

// strategy for authenticating users on requests
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // fetches user info minus the password
    const user = await User.findById(payload.sub).select('-password');
    if (!user) {
      return done(null, false); // causes request to fail if user not exists
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// use email for localstrategy
const localOptions = { usernameField: 'email' }; // username is default...instead look for 'email'
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }); // look for the user's email for comparison
    if (!user) { return done(null, false); } // if no email found, fail request
    const isMatch = await user.comparePassword(password);
    // if it does find email, but the password does not match, then fail
    if (!isMatch) { return done(null, false); }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
