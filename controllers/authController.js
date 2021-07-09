const { isEmail, isLength } = require('validator');
const jwt = require('jwt-simple');
const { User } = require('../models');
const { secret } = require('../config');

// function to create token for user auth
function tokenForUser(user) {
  // create timestamp
  const timeStamp = new Date().getTime();
  // add timestamp and secret to token
  return jwt.encode({ sub: user._id, iat: timeStamp }, process.env.SECRET || secret);
}

module.exports = {
  // signup event
  signUp: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    // handle case in which email and/or password not found in req
    if (!email || !password) {
      return res.status(422).json({ error: 'You must provide email and password' });
    }
    // check if email is an actual email before checking database
    if (!isEmail(email)) {
      return res.status(403).json({ error: 'You must provide a valid email address' });
    }
    // check if password meets criteria before checking database
    if (!isLength(password, { min: 6 })) {
      return res.status(403).json({ error: 'Your password must be at least 6 characters long' });
    }

    try {
      // check with database if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) { return res.status(403).json({ error: 'User already exists' }); }
      // if user doesn't exist yet, then send info to USER model to create new user
      const user = await new User({
        firstName,
        lastName,
        email,
        password,
      }).save();
      return res.json({ token: tokenForUser(user) });
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  // sign in method
  signIn: (req, res) => res.json({ token: tokenForUser(req.user) }),
};
