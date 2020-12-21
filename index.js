const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/users')
const memoryRouter = require('./routes/memoryRouter')

const connect = mongoose.connect('mongodb://localhost:27017/diary')

connect.then((db) => {
    console.log("Correctly connected to the server")
}, (err) => console.log(err))

app.use(express.json())

app.use('/users', userRouter)
app.use('/memories', memoryRouter)

app.listen(4000)