const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const UserRegister = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 1, // minimum length of string
    trim: true,
    required: true,
  },
  middleName: {
    type: String,
    minlength: 1, // minimum length of string
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 1, // minimum length of string
    trim: true,
    required: true,
  },
  fullName: {
    type: String,
    minlength: 1, // minimum length of string
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
    message: 'VALUE is not a valid email',
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
});


UserRegister.pre('save', function passwordBcryp(next) {
  const reg = this;
  if (reg.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(reg.password, salt, (er, hash) => {
        reg.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


const LocalUsers = mongoose.model('localUsers', UserRegister);

module.exports = { LocalUsers };
