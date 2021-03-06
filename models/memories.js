const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Memory',memorySchema)