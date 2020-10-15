const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema(
  {
    room_name: { index: { unique: true }, type: String, required: true },
    on_air: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Room', Room)
