const express = require('express')
const bodyParser = require('body-parser')
const bcrpyt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()
userRouter.use(bodyParser.json())

userRouter.route('/') 
.get((req, res, next) => {
    User.find({})
      .then((users) => {
          res.status(200).send(users)
      }, (err) => next(err))
      .catch((err) => next(err))
})

userRouter.route('/signup')
.post((req, res, next) => {
    User.find({})
      .then(async (users) => {
          var user = users.filter(user => user.username === req.body.username)[0]
          if(user)
            res.status(400).send("Username already exists!")
          else{
            const salt = await bcrpyt.genSalt()
            const hashedPassword = await bcrpyt.hash(req.body.password, salt)
            console.log(salt + "\n" + hashedPassword)
            user = { 
                username: req.body.username, 
                password: hashedPassword
            }
            User.create(user)
             .then((user) => {
               User.findById(user._id)
                 .then((user) => {
                     res.status(200).send(user);
                 }); 
             }, (err) => next(err))
             .catch((err) => next(err))
          }
      }, (err) => next(err))
      .catch((err) => next(err))
})

userRouter.route('/login')
.post((req, res, next) => {
    User.findOne({ username: req.body.username })
      .then(async (user) => {
          if(user){
            if(await bcrpyt.compare(req.body.password, user.password))
              res.status(200).send("Login Success")
            else
              res.status(400).send("Invalid Password")
          }
          else
            res.status(400).send("Invalid user!")
      }, (err) => next(err))
      .catch((err) => next(err))
})

module.exports = userRouter