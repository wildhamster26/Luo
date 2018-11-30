const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
// const async = require("async");


// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs")
const bcryptSalt = 10

router.post("/signup", (req, res, next) => {
  const { email, password, itemId } = req.body
  const confirmationCode = randomstring.generate(30);
  const resetPasswordToken = "";
  const resetPasswordExpires = "";

  if (!email || !password) {
    res.status(401).json({ message: "Indicate email and password" })
    return
  }
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(401).json({ message: "The email already exists" })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newUser = new User({ email, password: hashPass, resetPasswordToken, resetPasswordExpires, confirmationCode })
      return newUser.save()
    })
    .then(userSaved => {
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json( userSaved );
      });
    })
    .then(() => {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user:  process.env.GMAIL_USER,
          pass:  process.env.GMAIL_PASS
        }
      });
      transporter.sendMail({
        from: '"Luo"',
        to: email, // the email entered in the form 
        subject: 'Validate your Luo account', 
        html: `Hi! :)<br> Please click <a href="${process.env.BASE_URL}/confirm/${confirmationCode}">here</a> to confirm your account.<br> <img src="https://res.cloudinary.com/wildhamster26/image/upload/v1543477042/folder-name/small_face.jpg">` //Additional alternative text: If the link doesn't work, you can go here: ${process.env.BASE_URL}auth/confirm/${confirmationCode}`
      })

      .then(info => console.log(info))
      .catch(error => console.log(error))
      res.redirect("/");
    })
    .catch(err => next(err))
})

router.post("/login", (req, res, next) => {
  const { email, password } = req.body

  // first check to see if there's a document with that email
  User.findOne({ email })
    .then(userDoc => {
      // "userDoc" will be empty if the email is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Incorrect email "))
        return
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Password is wrong"))
        return
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.encryptedPassword = undefined
        res.json(userDoc)
      })
    })
    .catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

router.get("/logout", (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

router.get('/confirm/:confirmationCode', (req,res,next)=> {
  let confirmationCode = req.params.confirmationCode
  // Find the first user where confirmationCode = req.params.confirmationCode
  User.findOneAndUpdate({confirmationCode}, {status: 'active'})
  .then(user => {
    if (user) {
      // req.login makes the user login automatically
      req.login(user, () => {
        console.log("USER HAS BEEN CONFIRMED");
        res.json(user);
      })
    }
    else {
      next("No user found");
    }
  })
})


// router.get("/forgot", (req, res, next) => {
//   res.render("auth/forgot", { "message": req.flash("error") });
// });

// router.post("/forgot", (req, res, next) => {
//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf){
//         let token = buf.toString("hex");
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       User.findOne({email: req.body.email}, function(err, user){
//         if(!user){
//           return res.render("auth/forgot", { "message":  "There is no account with that email address." });
//         }
        
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour to change password
  
//         user.save();
//         done(err, token, user);
//       });
//     },
//     function(token, user, done){
//       let transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user:  process.env.GMAIL_USER,
//           pass:  process.env.GMAIL_PASS
//         }
//       });
      
//       transporter.sendMail({
//         from: '"Luo"',
//         to: req.body.email, // the email entered in the form 
//         subject: 'Reset your password', 
//         html: `Hello! :) <br> To reset your password please click <a href="${process.env.BASE_URL}/api/reset/${token}">here</a>.`
//       })
      
//       res.render("auth/goToMail");
//     },{
//       catch(err) {
//         req.flash("error", "There is no account with that email address.");
//         return res.render("auth/forgot", { "message": req.flash("error") });
//       }
//     }
//   ])
// });

// router.get("/reset/:token", (req, res, next) => {
//   let token = req.params.token;
//   User.findOne({resetPasswordToken: token, resetPasswordExpires:{$gt:Date.now()}}, (err, user) => {
//     if(!user) {
//       req.flash("error", "Password reset token is invalid or has expired.");
//       return res.render("auth/forgot", { "message": req.flash("error") })
//     }
//     res.render("auth/reset", {token, "message": req.flash("error") });
//   })
// });

// router.post("/reset/:token", (req, res, next) => {
//   let token = req.params.token;
//   let newPassword = req.body.newPassword;
//   let confirmPassword = req.body.confirmPassword;
//   let salt = bcrypt.genSaltSync(bcryptSalt);
//   let newHashPass = bcrypt.hashSync(newPassword, salt);
//   let query = {resetPasswordToken: token, resetPasswordExpires:{$gt:Date.now()}}
//   if(newPassword === confirmPassword){
//     User.findOneAndUpdate(query, {
//       password: newHashPass
//     })
//     .then(user => {
//       return res.redirect("/auth/login");
//     })
//   } else {
//       req.flash("error", "Password and confirm passwords must match.");
//       return res.redirect(`/auth/reset/${token}`);
//     }
//   });

module.exports = router
