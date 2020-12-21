const express = require('express')
const bodyParser = require('body-parser')
const bcrpyt = require('bcrypt')

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
    User.find({})
      .then(async (users) => {
          var user = users.filter(user => user.userId === req.body.userId)[0]
          if(user)
            res.status(400).send("Username already exists!")
          else{
            const salt = await bcrpyt.genSalt()
            const hashedPassword = await bcrpyt.hash(req.body.password, salt)
            user = { 
                userId: req.body.userId, 
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

userRouter.post('/login', (req, res, next) => {
    User.findOne({ userId: req.body.userId })
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