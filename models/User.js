const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  photo: String,
  password: {
    type: String,
    select: false,
  },
  accountType: String,
  facebookProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.statics.upsertFbUser = function upsertFbUser(accessToken, refreshToken, profile, cb) {
  const That = this;
  return this.findOne({
    'facebookProvider.id': profile.id,
  }, (err, user) => {
    // no user was found, lets create a new one
    if (!user) {
      const newUser = new That({
        firstName: profile.name.givenName,
        middleName: profile.name.middleName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        accountType: 'facebook',
        facebookProvider: {
          id: profile.id,
          token: accessToken,
        },
      });

      newUser.save((error, savedUser) => {
        if (error) {
          return cb(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
