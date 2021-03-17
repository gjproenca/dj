const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema(
  {
    room_name: { type: String, required: true, index: { unique: true } },
    owner_id: { type: mongoose.ObjectId, required: true },
    owner_name: { type: String, required: true },
    live: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Room', Room)
