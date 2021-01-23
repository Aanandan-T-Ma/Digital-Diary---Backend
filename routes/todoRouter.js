const express = require('express')
const bodyParser = require('body-parser')
const Tasks = require('../models/tasks')

const todoRouter = express.Router()

todoRouter.use(bodyParser.json())

todoRouter.post('/all', (req, res, next) => {
   Tasks.find({ userId: req.body.userId })
     .then((tasks) => {
        res.status(200).send(tasks)
     }, (err) => next(err))
     .catch((err) => next(err))
})

todoRouter.route('/')
.get((req, res, next) => {
   Tasks.find({ userId: req.body.userId })
     .then((tasks) => {
        res.status(200).send(tasks)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.post((req, res, next) => {
   Tasks.create(req.body)
    .then((task) => {
       Tasks.findById(task._id)
       .then((task) => {
          res.status(200).send({ task: task, success: true })
       }, (err) => next(err))
       .catch((err) => next(err))
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
   res.sendStatus(405)
})
.delete((req, res, next) => {
	Tasks.deleteMany({ userId: req.body.userId })
	  .then((tasks) => {
		 res.status(200).send(tasks)
	  }, (err) => next(err))
	  .catch((err) => next(err))
})

todoRouter.route('/:taskId')
.get((req, res, next) => {
   Tasks.findOne({ userId: req.body.userId, _id: req.params.taskId })
     .then((task) => {
        if(task) 
          res.status(200).send(task)
        else
          res.sendStatus(404)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.post((req, res, next) => {
   res.sendStatus(405)
})
.put((req, res, next) => {
	Tasks.updateOne({ userId: req.body.userId, _id: req.params.taskId }, 
		{ $set: { done: req.body.done }})
	  .then((task) => {
		 res.status(200).send(task)
	  }, (err) => next(err))
	  .catch((err) => next(err))
})
.delete((req, res, next) => {
	Tasks.deleteOne({ userId: req.body.userId, _id: req.params.taskId })
	 .then((task) => {
	   res.status(200).send(task)
	 }, (err) => next(err))
	 .catch((err) => next(err))
})

module.exports = todoRouter