const express = require('express')
const bodyParser = require('body-parser')
const Memories = require('../models/memories')

const memoryRouter = express.Router()

memoryRouter.use(bodyParser.json())

memoryRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 403
    res.end("Not logged in!")
})

memoryRouter.route('/:userId')
.get()
.post((req, res, next) => {
    
})

module.exports = memoryRouter