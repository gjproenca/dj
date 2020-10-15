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

// // Login
// module.exports.login = [
//   // validation rules
//   validator.body('email', 'Please enter Email').isLength({ min: 1 }),
//   validator.body('password', 'Please enter Password').isLength({ min: 1 }),

//   (req, res) => {
//     // throw validation errors
//     const errors = validator.validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.mapped() })
//     }

//     // validate email and password are correct
//     User.findOne({ email: req.body.email }, (error, user) => {
//       if (error) {
//         return res.status(500).json({
//           message: 'Error logging in',
//           error,
//         })
//       }

//       if (user === null) {
//         return res.status(500).json({
//           message: 'Email not found',
//         })
//       }

//       // compare submitted password with password inside db
//       return bcrypt.compare(
//         req.body.password,
//         user.password,
//         (error, isMatched) => {
//           if (error) {
//             return res.status(500).json({
//               message: 'Error logging in',
//               error,
//             })
//           }

//           if (isMatched === true) {
//             return res.json({
//               user: {
//                 _id: user._id,
//                 email: user.email,
//                 full_name: user.full_name,
//               },
//               token: jwt.sign(
//                 { _id: user._id, email: user.email, full_name: user.full_name },
//                 config.authSecret
//               ), // generate JWT token here
//             })
//           } else {
//             return res.status(500).json({
//               message: 'Invalid Email or Password',
//             })
//           }
//         }
//       )
//     })
//   },
// ]

// Get Rooms
module.exports.getRooms = async (req, res) => {
  // TODO: add status codes to response and add authentication to endpoint
  try {
    const rooms = await Room.find({})
    return res.json({ rooms })
  } catch (error) {
    return res.json({ error })
  }
}

// Get Rooms On Air
module.exports.getRoomsOnAir = async (req, res) => {
  // TODO: add status codes to response and add authentication to endpoint
  try {
    const rooms = await Room.find({ on_air: true })
    return res.json({ rooms })
  } catch (error) {
    return res.json({ error })
  }
}
