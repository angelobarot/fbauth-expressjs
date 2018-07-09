const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

require('../auth/passport')();

const { generateToken, sendToken, verifyToken } = require('../utils/token.utils');

router.route('/auth/facebook')
  .post(passport.authenticate('facebook-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
    };

    next();
  }, generateToken, sendToken);

router.route('/users/:id')
  .get(verifyToken, (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
      const currentUser = user;
      if (err) {
        return res.status(500).send('Error on server.');
      }
      if (!user) {
        return res.status(400).send('No user found');
      }

      res.status(200).send(currentUser);
    });
  });

module.exports = router;
