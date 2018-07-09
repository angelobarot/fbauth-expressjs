const jwt = require('jsonwebtoken');
const config = require('../config');

const createToken = user => jwt.sign(
  {
    id: user._id,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    email: user.email,
  }, config.secret,
  {
    expiresIn: 60 * 320,
  },
);

module.exports = {
  generateToken: (req, res, next) => {
    req.token = createToken(req.user);
    return next();
  },
  sendToken: (req, res) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
  verifyToken: (req, res, next) => {
    const token = req.headers['x-auth-token'];
    jwt.verify(token, config.secret, (err) => {
      if (err) {
        return res.status(401).send('Unauthorized');
      }
      next();
    });
  },
};
