const express = require('express')
const bodyParser = require('body-parser')
const Memories = require('../models/memories')

const memoryRouter = express.Router()

memoryRouter.use(bodyParser.json())

memoryRouter.route('/')
.get((req, res, next) => {
   Memories.find({ userId: req.body.userId })
     .then((memories) => {
        res.status(200).send(memories)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.post((req, res, next) => {
   Memories.create(req.body)
    .then((memory) => {
       Memories.findById(memory._id)
       .then((memory) => {
          res.status(200).send({ memory: memory, success: true })
       }, (err) => next(err))
       .catch((err) => next(err))
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
   res.sendStatus(405)
})
.delete((req, res, next) => {
	Memories.deleteMany({ userId: req.body.userId })
	  .then((memories) => {
		 res.status(200).send(memories)
	  }, (err) => next(err))
	  .catch((err) => next(err))
})

memoryRouter.route('/:memoryId')
.get((req, res, next) => {
   Memories.findOne({ userId: req.body.userId, _id: req.params.memoryId })
     .then((memory) => {
        res.status(200).send(memory)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.post((req, res, next) => {
   res.sendStatus(405)
})
.put((req, res, next) => {
	Memories.updateOne({ userId: req.body.userId, _id: req.params.memoryId }, 
		{ $set: { 
			title: req.body.title,
			date: req.body.date,
			description: req.body.description
		 }})
	  .then((memory) => {
		 res.status(200).send(memory)
	  }, (err) => next(err))
	  .catch((err) => next(err))
})
.delete((req, res, next) => {
	Memories.deleteOne({ userId: req.body.userId, _id: req.params.memoryId })
	 .then((memory) => {
	   res.status(200).send(memory)
	 }, (err) => next(err))
	 .catch((err) => next(err))
})

module.exports = memoryRouter