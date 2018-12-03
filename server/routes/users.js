const express = require('express');
const User = require('../models/User');
const { isLoggedIn } = require('../middlewares');
const uploadCloud = require('../configs/cloudinary');

const router = express.Router();

// Route to get a single user
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err))
});

// Route to edit a user
router.post('/:id/edit', (req, res, next) => {
  console.log("From the USER :id/edit route.")
  let { email, username} = req.body;
  console.log("email:", email)
  console.log("username:", username)
  User.findByIdAndUpdate(req.params.id, {
    username: username,
    email: email
  })
  .then(data => {	
    res.json({
      success: true,
      data
    })
  })
});

// Route to edit a user's image
router.post('/:id/image', uploadCloud.single('picture'), (req, res, next) => {
  // console.log("from the users image route - top", req.file);
  // cloudinary.v2.uploader.destroy(req.user.public_id, function(result) { console.log(result) }); 
  console.log("req.params", req.params)
  User.findByIdAndUpdate(req.params.id, 
    { 
      imgPath: req.file.url,
      public_id: req.file.public_id,
      imgName: req.file.originalname
    })
    .then(() => {
      res.json({
        success: true,
        picture: req.file.url
      })
    })
});

// Route to delete a user
router.get('/:id/delete', isLoggedIn, (req, res, next) => {
  let user = req.user._id;
  let userId = req.params.id
  User.findById(userId)
  .then(user => {
    console.log("user:", JSON.stringify(user+"jhb"));
    if(JSON.stringify(user._owner) === JSON.stringify(user)){
      User.findByIdAndRemove(userId)
      .then(
        res.json({
          success: true,
          message: "The user was deleted."
        })
      )}
    else {
      res.json({
        success: false,
        message: "User is unauthorized to delete this user."
      })}
    }
)});

module.exports = router;