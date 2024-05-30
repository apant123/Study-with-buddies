const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    courses: {
        type: String,
        required: true
    },
    courseTotal: {
        type: Number,
        required: true
    },
    groupOpen: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    groupTime: {
        type: String,
        required: true
    },
    usersAssociated: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    groupDate: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Group', groupSchema)