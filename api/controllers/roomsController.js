const validator = require('express-validator')
// const mongoose = require('mongoose')
const Room = require('../models/Room.js')

// Create Room
module.exports.createRoom = [
  // validation rules
  validator
    .body('room_name', 'Please enter the Room Name')
    .isLength({ min: 1 }),
  validator
    .body('created_by', 'Please enter Created By (ObjectId)')
    .isLength({ min: 1 }),
  validator.body('room_name').custom((value) => {
    return Room.findOne({ room_name: value }).then((room) => {
      if (room !== null) {
        return Promise.reject(new Error('Room name exists'))
      }
    })
  }),

  (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // initialize record
    const room = new Room({
      room_name: req.body.room_name,
      created_by: req.body.created_by,
      live: req.body.live,
    })

    // save record
    room.save((error, room) => {
      if (error) {
        return res.status(500).json({
          message: 'Error saving record',
          error,
        })
      }
      return res.json({
        message: 'Record saved',
        _id: room._id,
      })
    })
  },
]

// Read Room
module.exports.readRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ room_name: req.body.room_name }).orFail()
    return res.status(200).json({ room })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Read Rooms
module.exports.readRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).orFail(new Error('No rooms found!'))
    return res.status(200).json({ rooms })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Read Rooms On Air
module.exports.readRoomsOnAir = async (req, res) => {
  try {
    const rooms = await Room.find({ live: true }).orFail(
      new Error('No rooms live!')
    )
    return res.status(200).json({ rooms })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
