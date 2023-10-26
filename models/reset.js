const mongoose = require('mongoose')

const resetSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

module.exports = mongoose.model('Reset', resetSchema)