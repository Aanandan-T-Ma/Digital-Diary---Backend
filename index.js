const express = require('express');
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/users')

const connect = mongoose.connect('mongodb://localhost:27017/diary')

connect.then((db) => {
    console.log("Correctly connected to the server")
}, (err) => console.log(err))

app.use(express.json())

app.use('/users', userRouter)

app.listen(4000)