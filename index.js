const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/users')
const memoryRouter = require('./routes/memoryRouter')
const eventRouter = require('./routes/eventRouter')

const connect = mongoose.connect('mongodb://localhost:27017/diary')

connect.then((db) => {
    console.log("Correctly connected to the server")
}, (err) => console.log(err))

app.use(express.json())

app.use('/users', userRouter)
app.use('/memories', memoryRouter)
app.use('/events', eventRouter)

app.listen(4000)