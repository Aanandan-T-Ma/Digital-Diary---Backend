const express = require('express')
const bodyParser = require('body-parser')
const bcrpyt = require('bcrypt')
const nodemailer = require('nodemailer')

const User = require('../models/users')

const userRouter = express.Router()
userRouter.use(bodyParser.json())

userRouter.get('/', (req, res, next) => {
    User.find({})
      .then((users) => {
          res.status(200).send(users)
      }, (err) => next(err))
      .catch((err) => next(err))
})

userRouter.post('/signup', (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(async (user) => {
          if(user)
            res.status(400).send("Email already registered!")
          else{
            const salt = await bcrpyt.genSalt()
            const hashedPassword = await bcrpyt.hash(req.body.password, salt)
            const userId = req.body.email.substring(0,req.body.email.indexOf("@"))
            var otp = Math.floor((Math.random() * 1000000) + 1)
			if(otp === 1000000) otp-=217387;
			const hashedOtp = await bcrpyt.hash(otp.toString(), 10)
            user = { 
                userId: userId, 
				email: req.body.email,
				name: req.body.name,
                password: hashedPassword,
                otp: hashedOtp,
                activated: false
            }
            User.create(user)
             .then((user) => {
               User.findById(user._id)
                 .then((user) => {
					 sendEmail(req.body.email, otp)
					 res.status(200).send(user)
				 }) 
				 .catch((err) => next(err))
             }, (err) => next(err))
             .catch((err) => next(err))
          }
      }, (err) => next(err))
	  .catch((err) => next(err))
})

userRouter.post('/login', (req, res, next) => {
    User.findOne({ userId: req.body.userId })
      .then(async (user) => {
          if(user){
            if(!user.activated)
              res.status(400).send("Invalid User")
            else if(await bcrpyt.compare(req.body.password, user.password))
              res.status(200).send("Login Success")
            else
              res.status(400).send("Invalid Password")
          }
          else{
            User.findOne({ email: req.body.userId })
              .then(async (user) => {
                if(user){
                  if(!user.activated)
                    res.status(400).send("Invalid User")
                  else if(await bcrpyt.compare(req.body.password, user.password))
                    res.status(200).send("Login Success")
                  else
                    res.status(400).send("Invalid Password")
                }
                else
                  res.status(400).send("Invalid user!")
              }, (err) => next(err))
              .catch((err) => next(err))
          }
      }, (err) => next(err))
      .catch((err) => next(err))
})

userRouter.post('/otp', (req, res, next) => {
	User.findOne({ userId: req.body.userId })
	  .then(async (user) => {
		  if(await bcrpyt.compare(req.body.otp, user.otp)){
			  user.activated = true
			  user.otp = null
			  user.save()
			   .then((user) => {
				   res.status(200).send("User account activated!")
			   }, (err) => next(err))
			   .catch((err) => next(err))
		  }
		  else
		    res.status(400).send("Invalid OTP")
	  }, (err) => next(err))
      .catch((err) => next(err))
})

function sendEmail(receiver, otp){
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'aanandan.tma@gmail.com',
		  pass: 'password'
		}
	})
	const mailOptions = {
		from: 'aanandan.tma@gmail.com',
		to: receiver,
		subject: 'Digital Diary Account Activation',
		text: 'Your OTP for account activation is ' + otp
	}
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) 
		  console.log('Error: ' + error)
		else
		  console.log('Email Sent: ' + info.response)
	})
}

module.exports = userRouter