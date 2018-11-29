const express = require('express');
const Item = require('../models/Item')
const { isLoggedIn } = require('../middlewares')

const router = express.Router();

router.get('/', (req, res, next) => {
  Item.find()
  .populate('_owner', 'email') // Populate on the field 'email' and '_id' (default) ==> avoid displaying the hash password that could be a security issue
    .then(items => {
      res.json(items);
    })
    .catch(err => next(err))
});

router.post('/', isLoggedIn, (req, res, next) => {
  let { title, description, pricePerNight, lng, lat } = req.body
  let _owner = req.user._id
  if (!title || !description || !pricePerNight || !lng || !lat) {
    next(new Error('You have to send: title, description, pricePerNight, lng, lat'))
  }
  Item.create({
    title,
    description,
    pricePerNight,
    location: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    _owner
  })
    .then(item => {
      res.json({
        success: true,
        item
      });
    })
    .catch(err => next(err))
});

module.exports = router;
