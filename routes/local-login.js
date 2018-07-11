const express = require('express');
const { LocalLoginUser, CurrentSession } = require('../models/LocalLogin');
const _ = require('lodash');

const router = express.Router();

/* post users listing. */
router.post('/locallogin', async (req, res) => {
  const user = new LocalLoginUser(req.body);
  const empass = await user.findByEmailPassword(req.body);
  const newData = await user.generateAuthTokenPass();

  if (empass) {
    if (newData.logInToken) {
      const data = new CurrentSession(newData);

      data.save().then((doc) => {
        const newDoc = _.pick(doc, ['logInToken', 'email', 'dateTime']);
        res.status(200).send(newDoc);
      }).catch((e) => {
        res.status(400).send(e);
      });
    }
  } else {
    res.status(401).send({ error: 'Invalid Email/Password' });
  }
});

module.exports = router;
