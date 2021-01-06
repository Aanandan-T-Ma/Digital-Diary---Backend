const express = require('express')
const bodyParser = require('body-parser')
const Events = require('../models/events')

const eventRouter = express.Router()

eventRouter.use(bodyParser.json())

eventRouter.post('/all', (req, res, next) => {
   Events.find({ userId: req.body.userId })
     .then((events) => {
        res.status(200).send(events)
     }, (err) => next(err))
     .catch((err) => next(err))
})

eventRouter.route('/')
.get((req, res, next) => {
   Events.find({ userId: req.body.userId })
     .then((events) => {
        res.status(200).send(events)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.post((req, res, next) => {
   Events.create(req.body)
    .then((event) => {
       Events.findById(event._id)
       .then((event) => {
          res.status(200).send({ event: event, success: true })
       }, (err) => next(err))
       .catch((err) => next(err))
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
   res.sendStatus(405)
})
.delete((req, res, next) => {
	Events.deleteMany({ userId: req.body.userId })
	  .then((events) => {
		 res.status(200).send(events)
	  }, (err) => next(err))
	  .catch((err) => next(err))
})

eventRouter.route('/:eventId')
.get((req, res, next) => {
   Events.findOne({ userId: req.body.userId, _id: req.params.eventId })
     .then((event) => {
        res.status(200).send(event)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.post((req, res, next) => {
   res.sendStatus(405)
})
.put((req, res, next) => {
	Events.updateOne({ userId: req.body.userId, _id: req.params.eventId }, 
		{ $set: { 
			title: req.body.title,
			date: req.body.date,
			description: req.body.description
		 }})
	  .then((event) => {
		 res.status(200).send(event)
	  }, (err) => next(err))
	  .catch((err) => next(err))
})
.delete((req, res, next) => {
	Events.deleteOne({ userId: req.body.userId, _id: req.params.eventId })
	 .then((event) => {
	   res.status(200).send(event)
	 }, (err) => next(err))
	 .catch((err) => next(err))
})

module.exports = eventRouter