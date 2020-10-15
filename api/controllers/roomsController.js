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
        // FIXME: fix promise reject error
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('Room Name already in use')
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

// // Get User
// module.exports.user = (req, res) => {
//   const token = req.headers.authorization
//   if (token) {
//     // verifies secret and checks if the token is expired
//     jwt.verify(
//       token.replace(/^Bearer\s/, ''),
//       config.authSecret,
//       (error, decoded) => {
//         if (error) {
//           return res.status(401).json({ message: 'unauthorized' })
//         } else {
//           return res.json({ user: decoded })
//         }
//       }
//     )
//   } else {
//     return res.status(401).json({ message: 'unauthorized' })
//   }
// }
