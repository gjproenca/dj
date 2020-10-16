const validator = require('express-validator')
const Room = require('../models/Room.js')

// Create Room
module.exports.createRoom = [
  // validation rules
  validator
    .body('room_name', 'Please enter the Room Name')
    .isLength({ min: 1 }),
  validator.body('email').custom((value) => {
    return Room.findOne({ room_name: value }).then((room) => {
      if (room !== null) {
        return Promise.reject(new Error('Room Name already in use'))
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
      on_air: req.body.on_air,
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

// Get Rooms
module.exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
    return res.status(200).json({ rooms })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

// Get Rooms On Air
module.exports.getRoomsOnAir = async (req, res) => {
  try {
    const rooms = await Room.find({ on_air: true })
    return res.status(200).json({ rooms })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
