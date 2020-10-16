const { Router } = require('express')
const config = require('../config.js')

const router = Router()

// Initialize Controller
const roomsController = require('../controllers/roomsController.js')

// Create Room
router.post('/room/create', config.isAuthenticated, roomsController.createRoom)

// Get Rooms
router.get('/rooms', config.isAuthenticated, roomsController.getRooms)

// Get Rooms On Air
router.get(
  '/rooms/on-air',
  config.isAuthenticated,
  roomsController.getRoomsOnAir
)

// Toggle on_air
// router.post(
//   '/user/toggle-on-air',
//   config.isAuthenticated,
//   usersController.login
// )

module.exports = router
