const express = require('express');
// const { LocalUsers } = require('../models/LocalRegister');
const expressGraphQL = require('express-graphql');
const schema = require('../schema/schemagql');
// const gql = require('graphql-tag');
//
const router = express.Router();

/* post users listing. */
router.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));


module.exports = router;
