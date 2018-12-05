const express = require('express');
const Request = require('../models/Request');

const router = express.Router();

router.get('/', (req, res, next) => {
  Request.find()
    .then(requests => {
      res.json(requests);
    })
    .catch(err => next(err))
});

module.exports = router;