const { Router } = require('express')
const config = require('../config.js')

const router = Router()

// Initialize Controller
const roomsController = require('../controllers/roomsController.js')

// Create Room
router.post('/room/create', config.isAuthenticated, roomsController.createRoom)

// Read Room
router.get('/room', config.isAuthenticated, roomsController.readRoom)

// Read Rooms
router.get('/rooms', config.isAuthenticated, roomsController.readRooms)

// Read Rooms On Air
router.get(
  '/rooms/on-air',
  config.isAuthenticated,
  roomsController.readRoomsOnAir
)

module.exports = router
