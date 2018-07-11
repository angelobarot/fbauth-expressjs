
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserLocalLogin = new mongoose.Schema({
  email: {
    type: String,
    minlength: 3, // minimum length of string
    trim: true,
    required: true, // On spaceces validation
  },
  password: {
    type: String,
    minlength: 3, // minimum length of string

  },
  logInToken: {
    type: String,
    require: true,
    minlength: 5,
  },
  dateTime: {
    type: String,
  },
});
const { loginToken } = require('../utils/token.utils');


UserLocalLogin.methods.generateAuthTokenPass = function gen() {
  const user = this;
  const logToken = loginToken(user);

  const matchUser = LocalLoginUser.findOne({ email: user.email }).then((data) => {
    if (data) {
      return ({ email: data.email, logInToken: logToken, dateTime: new Date().toLocaleString() });
    }
  });
  return matchUser;
};

UserLocalLogin.methods.findByEmailPassword = async (data) => {
  const result = await LocalLoginUser.findOne({ email: data.email });
  const verifyPass = bcrypt.compareSync(data.password, result.password);
  try {
    if (verifyPass) {
      return ({ success: true });
    }
  } catch (e) {
    return ({ success: false });
  }
};

UserLocalLogin.methods.findUsers = function (data) {

};

const CurrentSession = mongoose.model('logins', UserLocalLogin);
const LocalLoginUser = mongoose.model('localusers', UserLocalLogin);

module.exports = { LocalLoginUser, CurrentSession };
