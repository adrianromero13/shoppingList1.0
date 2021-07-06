const passport = require('passport');

// passport looks for jwt
const requireAuth = passport.authenticate('jwt', { session: false });
// passport looks for 'local' strategies
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = {
  requireAuth,
  requireSignIn,
};
