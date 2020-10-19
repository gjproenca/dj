const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema(
  {
    room_name: { type: String, required: true, index: { unique: true } },
    created_by: { type: mongoose.ObjectId, required: true },
    on_air: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Room', Room)
