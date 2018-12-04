const express = require('express');
const Item = require('../models/Item')
const { isLoggedIn } = require('../middlewares')
const uploadCloud = require('../configs/cloudinary')
const User = require("../models/User")
const Request = require("../models/Request")
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
  console.log("from the add item route - top")
  let { name, description, categories, pricePerPeriod, lng, lat } = req.body
  let _owner = req.user._id
  if (!name || !description || !categories || !pricePerPeriod || !lng || !lat) {
    next(new Error('You have to send: name, description, categories, pricePerPeriod, lng, lat'))
  }
  Item.create({
    name,
    description,
    categories,
    pricePerPeriod,
    location: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    _owner
  })
  .then(item => {
    console.log("Created item");
    res.json({
      success: true,
      item
    });
  })
  .catch(err => next(err))
});

router.post('/:id/image', uploadCloud.single('picture'), (req, res, next) => {
  // console.log("from the items image route - top", req.file);
  // cloudinary.v2.uploader.destroy(req.user.public_id, function(result) { console.log(result) }); 
  Item.findByIdAndUpdate(req.params.id, 
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

router.post('/:id/edit', uploadCloud.single('photo'), (req, res, next) => {
  let { name, description, categories, pricePerPeriod, period, lng, lat } = req.body;
  console.log("From the top of the edit item route:", categories)
  Item.findByIdAndUpdate(req.params.id, {
    name,
    description,
    categories,
    pricePerPeriod,
    period,
    location: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    })
    .then(data => {	
    console.log("From the end of the edit item route:", data)
      res.json({
        success: true, 
        data
      })
    })
});

router.get('/:id/delete', isLoggedIn, (req, res, next) => {
  let user = req.user._id;
  let itemId = req.params.id
  Item.findById(itemId)
  .then(item => {
    console.log("Item owner:", JSON.stringify(item._owner) );
    console.log("user:", JSON.stringify(user+"jhb"));
    if(JSON.stringify(item._owner) === JSON.stringify(user)){
      Item.findByIdAndRemove(itemId)
      .then(
        res.json({
          success: true,
          message: "The item was deleted."
        })
      )}
    else {
      res.json({
        success: false,
        message: "User is unauthorized to delete this item."
      })}
    }
)});
    

router.post("/:id/request/:borrowerId", (req, res, next) => {
  const pickedDays = req.body
  const {borrowerId, id} = req.params;
  let requestedDates = []
  let _owner
  let requestId
  let acceptLink
  let declineLink
  let requestedDatesList = "<ul>"

  for (let i = 0; i < pickedDays.length; i++) {
    requestedDates.push(new Date(pickedDays[i]))
    requestedDatesList += "<li>" + pickedDays[i].substring(0, 10) + "</li>"
    if (i === pickedDays.length-1) {
      requestedDatesList += "</ul>"
    }
  }

  Item.findById(id)
    .then(item => {
      _owner = item._owner
      Request.create({
        _owner: _owner,
        _borrower: borrowerId,
        _item: id,
        requestedDates: requestedDates
      })
      .then(data => {	
        requestId = data._id
        acceptLink = `items/request/${requestId}/accept`
        declineLink = `items/request/${requestId}/decline`
        User.findOne({_id : borrowerId})
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
                    })
                    transporter.sendMail({
                      from: '"Luo"',
                      to: user.email,
                      subject: `Luo rent request for your ${item.name}.`, 
                      html: `Hi there!<br><br> I am interested in renting the ${item.name} you published on Luo the following dates:<br>${requestedDatesList}Please click on the link below to accept my request.<br><br><a href="${process.env.BASE_URL}/${acceptLink}">Accept request</a><br><br>Additionally, you can contact me at ${requestingUser.email}.<br><br>Have a good day!<br><img height="50px" src="https://res.cloudinary.com/wildhamster26/image/upload/v1543477042/folder-name/small_face.jpg">`
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
  })
})

router.get("/request/:requestId/accept", (req, res, next) => {
  const requestId = req.params.requestId
  Request.findByIdAndUpdate(requestId, 
    {
      status: "accepted"
    })
    .then(data => {
      data.requestedDates.forEach(date => {
        let borrowerDatePair = {
          _byUserId: data._borrower,
          date: date
        }
        Item.findByIdAndUpdate(data._item,
          {
            $push: { reservedDates: borrowerDatePair }
        })
        .then(res => {console.log('SUCCESSSSSSSSS')})
      })
    })
})

module.exports = router;
