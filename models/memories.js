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
        type: Number,
        required: true
    }
    },{
        timestamps: true
    }
)

var Memories = mongoose.model('Memory',memorySchema)

module.exports = Memories