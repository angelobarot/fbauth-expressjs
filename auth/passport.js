const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/User');
const config = require('../config');

module.exports = () => {
  passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
  }, (accessToken, refreshToken, profile, done) => {
    User.upsertFbUser(accessToken, refreshToken, profile, (err, user) => done(err, user));
  }));
};
