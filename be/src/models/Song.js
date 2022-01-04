const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owned: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Song', SongSchema)