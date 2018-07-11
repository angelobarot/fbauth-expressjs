const express = require('express');
const { LocalUsers } = require('../models/LocalRegister');

const router = express.Router();

/* post users listing. */
router.post('/register', (req, res) => {
  const reg = new LocalUsers({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    fullName: `${req.body.firstName} ${req.body.lastName}`,
    email: req.body.email,
    password: req.body.password,
    dateCreated: new Date().toLocaleString(),
  });
  reg.save().then((data) => {
    res.send(data);
  }, (e) => {
    res.status(400).send(e.message);
  });
});

module.exports = router;
