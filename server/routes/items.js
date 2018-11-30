const express = require('express');
const Item = require('../models/Item')
const { isLoggedIn } = require('../middlewares')
const User = require("../models/User")
const nodemailer = require("nodemailer");


const router = express.Router();

router.get('/', (req, res, next) => {
  Item.find()
  .populate('_owner', 'email') // Populate on the field 'email' and '_id' (default) ==> avoid displaying the hash password that could be a security issue
    .then(items => {
      // console.log(res.json(items))
      res.json(items);
    })
    .catch(err => next(err))
});

router.post('/', isLoggedIn, (req, res, next) => {
  let { name, description, pricePerPeriod, lng, lat } = req.body
  let _owner = req.user._id
  if (!name || !description || !pricePerPeriod || !lng || !lat) {
    next(new Error('You have to send: name, description, pricePerPeriod, lng, lat'))
  }
  Item.create({
    name,
    description,
    pricePerPeriod,
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

router.get('/:id', isLoggedIn, (req, res, next) => {
  let itemId = req.params.id
  Item.findById(itemId)
  .then(item => {
    res.json({
      success: true, 
      item
    })
  })
})

router.get("/:id/request/:userId", (req, res, next) => {
  console.log("params:", req.params)
  const {userId, id} = req.params;
  User.findOne({_id : userId})
  .then(requestingUser => {
  Item.findOne({ _id : id })
  .then(item =>{
    let ownerId = item._owner
  
  User.findOne({ _id : ownerId })
    .then(user => {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user:  process.env.GMAIL_USER,
          pass:  process.env.GMAIL_PASS
        }
      });
      transporter.sendMail({
        from: '"Luo"',
        to: user.email,
        subject: `I would like to rent the ${item.name} you mentioned on Luo.`, 
        html: `Hi!<br> I am interested in renting your ${item.name}.<br> Please contact me at: ${requestingUser.email}.<br> <img src="https://res.cloudinary.com/wildhamster26/image/upload/v1543477042/folder-name/small_face.jpg">`
      })
      
      res.json({
        success: true,
      })
      .then(info => console.log(info))
      .catch(error => console.log(error))
    })
  })
  })
    .catch(err => next(err))
})

module.exports = router;
